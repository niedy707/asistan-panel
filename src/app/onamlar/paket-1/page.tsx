"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function Paket1Content() {
    const searchParams = useSearchParams();
    const langParam = searchParams.get('lang') as 'tr' | 'en' | null;
    const autoPrint = searchParams.get('autoprint') === 'true';
    const [lang, setLang] = useState<'tr' | 'en'>(langParam || 'tr');

    // Update language when URL parameter changes
    useEffect(() => {
        if (langParam) {
            setLang(langParam);
        }
    }, [langParam]);

    // Auto-print when autoprint parameter is true
    useEffect(() => {
        if (autoPrint) {
            // Wait for PDFs to load before printing
            const timer = setTimeout(() => {
                window.print();
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [autoPrint]);

    const pdfPaths = {
        tr: {
            anestezi: '/documents/onamlar/onam | Anestezi TR.pdf',
            kan: '/documents/onamlar/onam | Kan Transfüzyonu TR.pdf',
            gorsel: '/documents/onamlar/onam | Görsel içerik kaydetme ve işleme onam formu.pdf'
        },
        en: {
            anestezi: '/documents/onamlar/onam | Anestezi EN.pdf',
            kan: '/documents/onamlar/onam | Kan Transfüzyonu EN.pdf',
            gorsel: '/documents/onamlar/onam | Görsel içerik kaydetme ve işleme onam formu.pdf'
        }
    };

    const forms = [
        { key: 'anestezi', title: lang === 'tr' ? 'Anestezi Onamı' : 'Anesthesia Consent' },
        { key: 'kan', title: lang === 'tr' ? 'Kan Transfüzyonu Onamı' : 'Blood Transfusion Consent' },
        { key: 'gorsel', title: lang === 'tr' ? 'Görsel İçerik Onamı' : 'Visual Content Consent' }
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center p-8 print:p-0 print:bg-white">
            <style jsx global>{`
                @media print {
                    @page {
                        size: A4;
                        margin: 0;
                    }
                    body {
                        margin: 0;
                        padding: 0;
                    }
                    .page-break {
                        page-break-after: always;
                        break-after: page;
                    }
                    .print-hidden {
                        display: none !important;
                    }
                }
            `}</style>

            {/* Controls - Hidden when printing */}
            <div className="fixed top-6 right-6 flex gap-2 print-hidden z-50">
                <button
                    onClick={() => setLang('tr')}
                    className={`px-4 py-2 rounded-xl font-bold transition-all shadow-sm ${lang === 'tr' ? 'bg-slate-900 text-white scale-105' : 'bg-white text-slate-600 hover:bg-slate-50'}`}
                >
                    TR
                </button>
                <button
                    onClick={() => setLang('en')}
                    className={`px-4 py-2 rounded-xl font-bold transition-all shadow-sm ${lang === 'en' ? 'bg-slate-900 text-white scale-105' : 'bg-white text-slate-600 hover:bg-slate-50'}`}
                >
                    EN
                </button>
                <button
                    onClick={() => window.print()}
                    className="px-6 py-2 bg-emerald-600 text-white rounded-xl font-bold transition-all shadow-lg hover:scale-105 active:scale-95 flex items-center gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
                    Yazdır / Print
                </button>
            </div>

            {/* Title */}
            <div className="w-full max-w-5xl mb-6 print-hidden">
                <h1 className="text-3xl font-black text-slate-900 mb-2">
                    {lang === 'tr' ? 'Paket-1: Rutin Onam Formları' : 'Package-1: Routine Consent Forms'}
                </h1>
                <p className="text-slate-600 font-medium">
                    {lang === 'tr'
                        ? 'Anestezi + Kan Transfüzyonu + Görsel İçerik Onamları'
                        : 'Anesthesia + Blood Transfusion + Visual Content Consents'}
                </p>
            </div>

            {/* Combined Forms Container */}
            <div className="w-full max-w-5xl space-y-8 print:space-y-0">
                {forms.map((form, index) => (
                    <div key={form.key} className={`bg-white shadow-xl rounded-2xl overflow-hidden print:shadow-none print:rounded-none ${index < forms.length - 1 ? 'page-break' : ''}`}>
                        {/* Form Title - Hidden in print */}
                        <div className="bg-emerald-600 text-white p-4 print-hidden">
                            <h2 className="text-xl font-bold">{form.title}</h2>
                        </div>

                        {/* PDF Embed */}
                        <div className="w-full">
                            <iframe
                                src={pdfPaths[lang][form.key as keyof typeof pdfPaths.tr]}
                                className="w-full h-[1200px] print:h-auto"
                                title={form.title}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function Paket1() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="text-xl font-bold text-slate-600 animate-pulse">Yükleniyor...</div>
            </div>
        }>
            <Paket1Content />
        </Suspense>
    );
}
