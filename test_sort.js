const priority = {
    'anestezi': 1,
    'kan transfüzyonu': 2,
    'rinoplasti': 3,
    'kosta': 4,
    'revizyon rinoplasti': 5,
    'septoplasti': 6,
    'otoplasti': 7,
    'yüz germe': 8,
    'görsel içerik': 20
};

const sortedKeys = Object.keys(priority).sort((a, b) => b.length - a.length);

const getWeight = (name) => {
    const normalized = name.normalize('NFC').toLowerCase().trim();
    for (const key of sortedKeys) {
        const normalizedKey = key.normalize('NFC');
        if (normalized.includes(normalizedKey)) {
            return priority[key];
        }
    }
    return 100;
};

const items = [
    { name: "Anestezi" },
    { name: "Kan Transfu\u0308zyonu" },
    { name: "Rinoplasti" },
    { name: "Kosta kartilaj graft" },
    { name: "Revizyon Rinoplasti" },
    { name: "Septoplasti (SMR)" },
    { name: "Otoplasti" },
    { name: "Go\u0308rsel ic\u0327erik kaydetme ve is\u0327leme onam formu" },
    { name: "Kas\u0327 kald\u0131rma" },
    { name: "Yu\u0308z&Boyun germe" }
];

items.sort((a, b) => {
    const weightA = getWeight(a.name);
    const weightB = getWeight(b.name);
    console.log(\`Comparing \${a.name} (\${weightA}) and \${b.name} (\${weightB})\`);
    if (weightA !== weightB) return weightA - weightB;
    return a.name.localeCompare(b.name, 'tr');
});

console.log("Sorted:", items.map(i => i.name));
