import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
    try {
        const docsDir = path.join(process.cwd(), 'public', 'documents');

        // Check if directory exists
        if (!fs.existsSync(docsDir)) {
            return NextResponse.json({
                onamlar: [],
                receteler: [],
                formlar: [],
                bilgilendirme: []
            });
        }

        const categories = ['onamlar', 'receteler', 'formlar', 'bilgilendirme'];
        const results: Record<string, any[]> = {};

        for (const cat of categories) {
            const catPath = path.join(docsDir, cat);
            if (!fs.existsSync(catPath)) {
                results[cat] = [];
                continue;
            }

            const files = fs.readdirSync(catPath).filter(f => f.endsWith('.pdf'));
            results[cat] = [];

            if (cat === 'onamlar') {
                // Special parsing for naming convention: "onam [Procedure] [Lang].pdf"
                const procedureMap: Record<string, { name: string, langs: { label: string, path: string }[] }> = {};

                files.forEach(file => {
                    // updated regex to match "onam [|] [Procedure] [Lang].pdf"
                    // supports optional pipe and ENG code
                    const match = file.match(/^onam\s*[|]?\s*(.+?)\s+(TR|EN|ENG|DE|ES|RU|FR|IT|RO|MD|HU|PL|AR)\.pdf$/i);
                    if (match) {
                        let procedure = match[1].trim();
                        // Strip leading/trailing | if still present
                        procedure = procedure.replace(/^[|\s]+|[|\s]+$/g, '');

                        const langCodeRaw = match[2].toUpperCase();
                        const langCode = langCodeRaw === 'ENG' ? 'EN' : langCodeRaw;

                        const langLabel = {
                            TR: 'Türkçe', EN: 'İngilizce', DE: 'Almanca', ES: 'İspanyolca',
                            RU: 'Rusça', FR: 'Fransızca', IT: 'İtalyanca', RO: 'Romence',
                            MD: 'Moldovca', HU: 'Macarca', PL: 'Lehçe', AR: 'Arapça'
                        }[langCode] || langCode;

                        if (!procedureMap[procedure]) {
                            procedureMap[procedure] = { name: procedure, langs: [] };
                        }
                        procedureMap[procedure].langs.push({
                            label: langLabel,
                            path: `/documents/onamlar/${file}`
                        });
                    } else {
                        // Fallback for files that don't match the convention exactly
                        results[cat].push({ name: file.replace('.pdf', ''), path: `/documents/onamlar/${file}` });
                    }
                });

                // Merge procedure map into results
                const structuredOnams = Object.values(procedureMap);
                results[cat] = [...results[cat], ...structuredOnams];
            } else {
                // General category
                results[cat] = files.map(file => ({
                    name: file.replace('.pdf', ''),
                    path: `/documents/${cat}/${file}`
                }));
            }
        }

        return NextResponse.json(results);
    } catch (error) {
        console.error('Error listing documents:', error);
        return NextResponse.json({ error: 'Failed to list documents' }, { status: 500 });
    }
}
