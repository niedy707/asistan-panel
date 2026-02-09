import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'src', 'data', 'patients.json');
const SOURCE_API = process.env.MESAI_API_URL || 'http://localhost:3010/api/calendar';

export interface Patient {
    name: string;
    surgeryDate: string;
    category?: string;
}

export async function getLocalPatients(): Promise<Patient[]> {
    try {
        if (fs.existsSync(DATA_FILE)) {
            const data = fs.readFileSync(DATA_FILE, 'utf-8');
            return JSON.parse(data);
        }
    } catch (error) {
        console.error('Error reading local patient data:', error);
    }
    return [];
}

export async function syncPatients(): Promise<{ success: boolean; count: number; error?: string }> {
    try {
        console.log(`Syncing patients from ${SOURCE_API}...`);
        const res = await fetch(SOURCE_API, { next: { revalidate: 0 } });

        if (!res.ok) {
            throw new Error(`Failed to fetch from Mesai API: ${res.status} ${res.statusText}`);
        }

        const events = await res.json();

        if (!Array.isArray(events)) {
            throw new Error('Invalid data format from API');
        }

        // Filter and map to simple patient objects
        const patientsMap = new Map<string, string>();

        events.forEach((e: any) => {
            if (e.category === 'surgery') {
                // Extract name
                let name = e.title ? e.title.split('/')[0].trim() : '';

                // Name Cleaning Logic (Ported from panel project)
                // 1. Remove "Otoplasti", "Revizyon", "Kosta", "Upper Blef" etc.
                name = name.replace(/otoplasti/gi, '');
                name = name.replace(/OTOPLASTİ/g, '');
                name = name.replace(/revizyon/gi, '');
                name = name.replace(/REVİZYON/g, '');
                name = name.replace(/rev rino/gi, '');
                name = name.replace(/rev RİNO/g, '');
                name = name.replace(/upper blef/gi, '');
                name = name.replace(/upper blepharoplasty/gi, '');
                name = name.replace(/rino/gi, '');
                name = name.replace(/RİNO/g, '');
                name = name.replace(/kostal[ıi]?/gi, '');
                name = name.replace(/kosta/gi, '');
                name = name.replace(/ortak vaka/gi, '');
                name = name.replace(/ortak/gi, '');
                name = name.replace(/(^|\s)iy(\s|$)/gi, ' ');
                name = name.replace(/(^|\s)İY(\s|$)/g, ' ');

                // 2. Remove "Yaş" and numbers
                name = name.replace(/ya[şs]\s*:?\s*\d+/gi, '');

                // 3. Remove parentheses content
                name = name.replace(/\([^)]*\)/g, '');

                // 4. Cleanup (Time, Emojis, Special Chars)
                name = name.replace(/🔪/g, '');
                name = name.replace(/\d{1,2}[:.]\d{2}/g, ''); // Remove time 12:00
                name = name.replace(/[^\w\sğüşıöçĞÜŞİÖÇ]/g, ' '); // Keep only letters and spaces

                name = name.trim();
                name = name.replace(/\s+/g, ' '); // Collapse multiple spaces

                if (name.length < 3) return; // Skip if name is too short after cleaning

                // Title Case Normalization
                const formattedName = name.toLocaleLowerCase('tr-TR').split(' ').map(word =>
                    word.charAt(0).toLocaleUpperCase('tr-TR') + word.slice(1)
                ).join(' ');

                const datePart = e.start.split('T')[0];

                // Deduplicate: Keep unique names, latest date if multiple
                const existingDate = patientsMap.get(formattedName);
                if (!existingDate || new Date(datePart) > new Date(existingDate)) {
                    patientsMap.set(formattedName, datePart);
                }
            }
        });

        const patients: Patient[] = Array.from(patientsMap.entries())
            .map(([name, surgeryDate]) => ({ name, surgeryDate }))
            .sort((a, b) => new Date(b.surgeryDate).getTime() - new Date(a.surgeryDate).getTime()); // Newest first

        // Ensure directory exists
        const dir = path.dirname(DATA_FILE);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        fs.writeFileSync(DATA_FILE, JSON.stringify(patients, null, 2), 'utf-8');
        console.log(`Synced ${patients.length} patients to ${DATA_FILE}`);

        return { success: true, count: patients.length };
    } catch (error: any) {
        console.error('Sync failed:', error);
        return { success: false, count: 0, error: error.message };
    }
}
