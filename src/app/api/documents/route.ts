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
                const procedureMap: Record<string, { name: string, langs: { label: string, flag: string, path: string }[] }> = {};

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

                        const flag = {
                            TR: "🇹🇷", EN: "🇬🇧", DE: "🇩🇪", ES: "🇪🇸",
                            RU: "🇷🇺", FR: "🇫🇷", IT: "🇮🇹", RO: "🇷🇴",
                            MD: "🇲🇩", HU: "🇭🇺", PL: "🇵🇱", AR: "🇸🇦"
                        }[langCode] || "🌐";

                        if (!procedureMap[procedure]) {
                            procedureMap[procedure] = { name: procedure, langs: [] };
                        }
                        procedureMap[procedure].langs.push({
                            label: langLabel,
                            flag: flag,
                            path: `/documents/onamlar/${file}`
                        });
                    } else {
                        // Fallback: cleaning "onam | " and ".pdf"
                        let fallbackName = file.replace(/\.pdf$/i, '');
                        fallbackName = fallbackName.replace(/^onam\s*[|]?\s*/i, '').trim();
                        fallbackName = fallbackName.replace(/^[|\s]+|[|\s]+$/g, '').trim();
                        results[cat].push({ name: fallbackName, path: `/documents/onamlar/${file}` });
                    }
                });

                // Merge procedure map into results
                const structuredOnams = Object.values(procedureMap);

                // Define custom display names for specific procedures
                const displayNames: Record<string, string> = {
                    'kaş kaldırma': 'Kaş Kaldırma (Temporal Lift / Badem Göz)',
                    'otoplasti': 'Otoplasti (Kepçe Kulak)',
                    'kosta kartilaj graft': 'Kosta Kartilaj Graft (Kaburga Kıkırdağı)',
                    'kosta': 'Kosta Kartilaj Graft (Kaburga Kıkırdağı)',
                    'görsel içerik kaydetme ve işleme onam formu': 'Görsel İçerik İşleme Onamı',
                    'görsel içerik': 'Görsel İçerik İşleme Onamı'
                };

                // Set sort priority (weights)
                const priority: Record<string, number> = {
                    'anestezi': 1,
                    'kan transfüzyonu': 2,
                    'rinoplasti': 3,
                    'kosta': 4,
                    'revizyon rinoplasti': 5,
                    'septoplasti': 6,
                    'smr': 6,
                    'otoplasti': 7,
                    'yüz germe': 8,
                    'yüz&boyun germe': 8,
                    'kaş kaldırma': 9,
                    'görsel içerik': 20
                };

                const sortedKeys = Object.keys(priority).sort((a, b) => b.length - a.length);

                const getWeight = (name: string) => {
                    const normalized = name.normalize('NFC').toLowerCase().trim();
                    for (const key of sortedKeys) {
                        if (normalized.includes(key.normalize('NFC'))) {
                            return priority[key];
                        }
                    }
                    return 100;
                };

                const getDisplayName = (name: string) => {
                    const normalized = name.normalize('NFC').toLowerCase().trim();
                    for (const [key, displayName] of Object.entries(displayNames)) {
                        if (normalized.includes(key.normalize('NFC'))) {
                            return displayName;
                        }
                    }
                    return name;
                };

                // Merge and sort
                results[cat] = [...results[cat], ...structuredOnams].map(doc => ({
                    ...doc,
                    name: getDisplayName(String(doc.name || ''))
                })).sort((a, b) => {
                    const nameA = String(a.name || '');
                    const nameB = String(b.name || '');
                    const weightA = getWeight(nameA);
                    const weightB = getWeight(nameB);
                    if (weightA !== weightB) return weightA - weightB;
                    return nameA.localeCompare(nameB, 'tr');
                });
            } else {
                // General category
                results[cat] = files.map(file => ({
                    name: file.replace('.pdf', ''),
                    path: `/documents/${cat}/${file}`
                }));
            }
        }

        return NextResponse.json(results);
    } catch (error: any) {
        console.error('Error listing documents:', error);
        return NextResponse.json({ error: 'Failed to list documents', message: error.message }, { status: 500 });
    }
}
