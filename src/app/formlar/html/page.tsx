"use client";

import React, { useState, useEffect } from 'react';

type TranslationType = {
    pageTitle: string;
    headerTitle: string;
    headerSubtitle: string;
    website: string;
    patientName: string;
    checkupTitle: string;
    checkupSubtitle: string;
    checkupOptions: string[];
    checkupOther: string;
    checkupNote: string;
    tableRecommendation: string;
    tableFrequency: string;
    tableDuration: string;
    massage: string;
    massageFrequency: string;
    massageDurations: string[];
    retainer: string;
    retainerSubtitle: string;
    retainerSizes: string[];
    retainerFrequency: string;
    retainerNote: string;
    retainerDurations: string[];
    taping: string;
    tapingSubtitle: string;
    tapingFrequency: string;
    tapingNote1: string;
    tapingNote2: string;
    tapingDurations: string[];
    microporeTitle: string;
    microporeNote: string;
    retainerBrand: string;
    retainerInstruction: string;
    reminderTitle: string;
    reminderWash: string;
    reminderWashNote: string;
    reminderSmoking: string;
    footerLine1: string;
    footerAssistant: string;
    footerLine2: string;
};

const translations: { tr: TranslationType; en: TranslationType; es: TranslationType } = {
    tr: {
        pageTitle: "po kontrol öneri formu",
        headerTitle: "Op. Dr. İbrahim YAĞCI",
        headerSubtitle: "Ameliyat Sonrası Öneriler",
        website: "r.ibrahimyagci.com",
        patientName: "Hasta Adı",
        checkupTitle: "KONTROL",
        checkupSubtitle: "(Seçenekler, rutin kontrol süreleridir.)",
        checkupOptions: ['1. Hafta', '2. Hafta', '6. Hafta', '3. Ay', '6. Ay', '1. Yıl', '2. Yıl'],
        checkupOther: "Diğer:",
        checkupNote: "Rutin kontrol zamanında fiziken kontrole gelemeyen hastalar, fotoğraf+video ileterek uzaktan kontrol sağlamalıdır. Kontrol zamanlarının takip sorumluluğu hastaya aittir.",
        tableRecommendation: "Öneri",
        tableFrequency: "Sıklık / Kullanım",
        tableDuration: "Süre",
        massage: "Masaj",
        massageFrequency: "5 x 2+1 dk / gün",
        massageDurations: ['3 Ay', 'Sürekli'],
        retainer: "Nostril Retainer",
        retainerSubtitle: "(Burun deliği şekillendirici)",
        retainerSizes: ['No: 7', 'No: 8'],
        retainerFrequency: "24 Saat / gün",
        retainerNote: "Önerilen süre sonunda, yine aynı süre ile ve günde 6-12 saat olacak şekilde kullanılmaya devam edilecek.",
        retainerDurations: ['1 Ay', '2 Ay', '3 Ay', '6 Ay'],
        taping: "Bantlama",
        tapingSubtitle: "(Taping)",
        tapingFrequency: "Gece + Gündüz",
        tapingNote1: "İlk 14 gün burun ve bant ıslanmamalıdır..",
        tapingNote2: "14. günden sonra bandı 2-3 günde 1 yenileyiniz.",
        tapingDurations: ['1 Ay', '2 Ay', '3 Ay'],
        microporeTitle: "3M Micropore",
        microporeNote: "Minimum 1 ay süre ile bantlama yapmanız gerekmektedir.<br />4 adet temin ediniz.",
        retainerBrand: "(ERCEFEN marka)",
        retainerInstruction: "1 adet ürün yeterlidir. (Size hediye edildi.)<br />Yedek temin etmek isterseniz aynı marka- numara satın alabilirsiniz.",
        reminderTitle: "Hatırlatma:",
        reminderWash: "Burun yıkama ve nemlendirme:",
        reminderWashNote: "Ameliyat sonrası minimum 1 ay kullanılmalıdır.",
        reminderSmoking: "Sigara 3 ay süre ile YASAKTIR.",
        footerLine1: "Op. Dr. İbrahim YAĞCI",
        footerAssistant: "Hekim asistanı Ezgi: +90 (551) 199 9963",
        footerLine2: "Ameliyat süreci ile ilgili tüm sorularınız için:"
    },
    en: {
        pageTitle: "PO Follow-up Recommendations",
        headerTitle: "Op. Dr. Ibrahim YAGCI",
        headerSubtitle: "Post-Operative Recommendations",
        website: "rhinoplasty.ibrahimyagci.com",
        patientName: "Patient Name",
        checkupTitle: "FOLLOW-UP",
        checkupSubtitle: "(Options reflect routine check-up periods.)",
        checkupOptions: ['Week 1', 'Week 2', 'Week 6', 'Month 3', 'Month 6', '1 Year', '2 Years'],
        checkupOther: "Other:",
        checkupNote: "Patients who cannot physically come for a routine check-up must provide remote follow-up by sending photos+videos. Responsibility for tracking check-up times belongs to the patient.",
        tableRecommendation: "Recommendation",
        tableFrequency: "Frequency / Usage",
        tableDuration: "Duration",
        massage: "Massage",
        massageFrequency: "5 x 2+1 min / day",
        massageDurations: ['3 Months', 'Continuous'],
        retainer: "Nostril Retainer",
        retainerSubtitle: "(Nostril shaper)",
        retainerSizes: ['No: 7', 'No: 8'],
        retainerFrequency: "24 Hours / day",
        retainerNote: "At the end of the recommended period, continue using for the same duration, 6-12 hours per day.",
        retainerDurations: ['1 Month', '2 Months', '3 Months', '6 Months'],
        taping: "Taping",
        tapingSubtitle: "(Taping)",
        tapingFrequency: "Day + Night",
        tapingNote1: "The nose and tape should not get wet for the first 14 days.",
        tapingNote2: "After day 14, renew the tape every 2-3 days.",
        tapingDurations: ['1 Month', '2 Months', '3 Months'],
        microporeTitle: "3M Micropore",
        microporeNote: "Minimum 1 month of taping is required.<br />1 piece has been given as a gift.",
        retainerBrand: "(ERCEFEN brand)",
        retainerInstruction: "1 piece is sufficient. (Given to you as a gift.)<br />If you wish to obtain a spare, you can buy the same brand and size.",
        reminderTitle: "Reminder:",
        reminderWash: "Nasal wash and moisturizing:",
        reminderWashNote: "Must be used for minimum 1 month post-operatively.",
        reminderSmoking: "Smoking is FORBIDDEN for 3 months.",
        footerLine1: "Op. Dr. Ibrahim YAGCI",
        footerAssistant: "Doctor's assistant Ezgi: +90 (551) 199 9963",
        footerLine2: "For all questions regarding the surgery process:"
    },
    es: {
        pageTitle: "Recomendaciones de Seguimiento Postoperatorio",
        headerTitle: "Op. Dr. Ibrahim YAGCI",
        headerSubtitle: "Recomendaciones Postoperatorias",
        website: "rhinoplasty.ibrahimyagci.com",
        patientName: "Nombre del Paciente",
        checkupTitle: "CONTROL",
        checkupSubtitle: "(Las opciones reflejan los períodos de control rutinario.)",
        checkupOptions: ['Semana 1', 'Semana 2', 'Semana 6', 'Mes 3', 'Mes 6', '1 Año', '2 Años'],
        checkupOther: "Otro:",
        checkupNote: "Los pacientes que no puedan acudir físicamente a un control rutinario deben proporcionar un seguimiento remoto enviando fotos y vídeos. La responsabilidad de seguir los tiempos de control pertenece al paciente.",
        tableRecommendation: "Recomendación",
        tableFrequency: "Frecuencia / Uso",
        tableDuration: "Duración",
        massage: "Masaje",
        massageFrequency: "5 x 2+1 min / día",
        massageDurations: ['3 Meses', 'Continuo'],
        retainer: "Nostril Retainer",
        retainerSubtitle: "(Modelador de orificios nasales)",
        retainerSizes: ['No: 7', 'No: 8'],
        retainerFrequency: "24 Horas / día",
        retainerNote: "Al final del período recomendado, continúe usando durante el mismo tiempo, de 6 a 12 horas al día.",
        retainerDurations: ['1 Mes', '2 Meses', '3 Meses', '6 Meses'],
        taping: "Vendaje nasal",
        tapingSubtitle: "(Taping)",
        tapingFrequency: "Día + Noche",
        tapingNote1: "La nariz y el vendaje no deben mojarse durante los primeros 14 días.",
        tapingNote2: "Después del día 14, renueve el vendaje cada 2-3 días.",
        tapingDurations: ['1 Mes', '2 Meses', '3 Meses'],
        microporeTitle: "3M Micropore",
        microporeNote: "Se requiere un mínimo de 1 mes de vendaje.<br />Se le ha entregado 1 pieza como regalo.",
        retainerBrand: "(Marca ERCEFEN)",
        retainerInstruction: "1 pieza es suficiente. (Se le entrega como regalo).<br />Si desea obtener un repuesto, puede comprar la misma marca y tamaño.",
        reminderTitle: "Recordatorio:",
        reminderWash: "Lavado nasal e hidratación:",
        reminderWashNote: "Debe usarse durante un mínimo de 1 mes después de la operación.",
        reminderSmoking: "Fumar está PROHIBIDO durante 3 meses.",
        footerLine1: "Op. Dr. Ibrahim YAGCI",
        footerAssistant: "Asistente médico Ezgi: +90 (551) 199 9963",
        footerLine2: "Para todas las preguntas sobre el proceso de cirugía:"
    }
};

export default function PostOpRecommendations() {
    const [lang, setLang] = useState<'tr' | 'en' | 'es'>('tr');
    const t = translations[lang];

    useEffect(() => {
        document.title = t.pageTitle;
    }, [t.pageTitle]);

    const [patientName, setPatientName] = useState('');
    const [massageDuration, setMassageDuration] = useState<string[]>([]);
    const [retainerSize, setRetainerSize] = useState<string[]>([]);
    const [retainerDuration, setRetainerDuration] = useState<string[]>([]);
    const [tapingDuration, setTapingDuration] = useState<string[]>([]);

    const toggleSelection = (state: string[], setState: React.Dispatch<React.SetStateAction<string[]>>, value: string) => {
        if (state.includes(value)) {
            setState(state.filter(item => item !== value));
        } else {
            setState([...state, value]);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center p-8 print:p-0 print:bg-white relative">
            <style jsx global>{`
                @media print {
                    @page {
                        size: A4;
                        margin: 0;
                    }
                    body {
                        margin: 0;
                        padding: 0;
                        print-color-adjust: exact;
                        -webkit-print-color-adjust: exact;
                    }
                }
            `}</style>

            {/* Language Switcher - Floating Top Right */}
            <div className="fixed top-6 right-6 flex gap-2 print:hidden z-50">
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
                    onClick={() => setLang('es')}
                    className={`px-4 py-2 rounded-xl font-bold transition-all shadow-sm ${lang === 'es' ? 'bg-slate-900 text-white scale-105' : 'bg-white text-slate-600 hover:bg-slate-50'}`}
                >
                    ES
                </button>
            </div>

            {/* A4 Container: 210mm x 270mm - Shorter than A4 to force single page and reduce gap */}
            <div className="w-[210mm] h-[270mm] bg-white p-[8mm] shadow-xl print:shadow-none print:w-[210mm] print:h-[270mm] print:mx-auto flex flex-col relative text-xs leading-snug font-sans text-slate-900 overflow-hidden">

                {/* Top Content Group */}
                <div className="flex-1 flex flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b-2 border-slate-900 pb-3 mb-3">
                        {/* Logo Left */}
                        <img src="/logo-header.png?v=3" alt="Logo" className="w-[120px] h-[120px] object-contain" />

                        {/* Title Center */}
                        <div className="flex-1 text-center px-4">
                            <h1 className="font-black text-3xl text-slate-900 mb-1">{t.headerTitle}</h1>
                            <p className="font-bold text-lg text-slate-600 tracking-[0.2em]">{t.headerSubtitle}</p>
                        </div>

                        {/* QR Code Right */}
                        <div className="flex flex-col items-center justify-center w-[120px]">
                            <img
                                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://${t.website}`}
                                alt="QR Code"
                                className="w-[100px] h-[100px] mb-1"
                            />
                            <span className="text-[9px] text-slate-500 text-center leading-tight font-bold">{t.website}</span>
                        </div>
                    </div>

                    {/* Patient Info */}
                    <div className="flex flex-col gap-2 mb-4 border-2 border-slate-200 rounded-lg p-2.5 bg-slate-50/50">
                        <div className="w-full">
                            <label className="block text-[10px] font-bold uppercase text-slate-500 mb-0.5 tracking-wider">{t.patientName}</label>
                            <input
                                type="text"
                                value={patientName}
                                onChange={(e) => setPatientName(e.target.value)}
                                className="w-full bg-transparent border-b-2 border-slate-300 focus:border-slate-800 outline-none font-bold text-sm py-0.5 text-slate-800 placeholder-slate-300"
                                placeholder="................................................................................................................................"
                            />
                        </div>
                        {/* Control Section */}
                        <div className="mt-1">
                            <label className="block text-[10px] font-bold uppercase text-slate-900 mb-1 tracking-wider">
                                {t.checkupTitle} <span className="text-slate-400 font-medium normal-case tracking-normal">{t.checkupSubtitle}</span>
                            </label>
                            <div className="grid grid-cols-4 gap-y-1 gap-x-2 text-[12px] font-bold">
                                {t.checkupOptions.map(opt => (
                                    <label key={opt} className="flex items-center gap-1.5 cursor-pointer group">
                                        <div className="w-3.5 h-3.5 rounded border-2 border-slate-400 bg-white group-hover:border-slate-600 transition-colors shrink-0"></div>
                                        {opt}
                                    </label>
                                ))}
                                <label className="flex items-center gap-1.5 cursor-pointer w-full group">
                                    <div className="w-3.5 h-3.5 rounded border-2 border-slate-400 bg-white shrink-0 group-hover:border-slate-600 transition-colors"></div>
                                    <span className="whitespace-nowrap">{t.checkupOther}</span>
                                    <div className="border-b-2 border-slate-400 w-full h-3"></div>
                                </label>
                            </div>
                            <div className="mt-2 text-[10px] text-slate-800 bg-slate-50 p-2 rounded border border-slate-300 leading-tight font-bold">
                                {t.checkupNote}
                            </div>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="w-full border-2 border-slate-900 shadow-sm mb-6">
                        {/* Header Row */}
                        <div className="grid grid-cols-12 bg-slate-100 border-b-2 border-slate-900 font-black text-center py-2 text-xs">
                            <div className="col-span-3 border-r-2 border-slate-900 px-2 text-left pl-3">{t.tableRecommendation}</div>
                            <div className="col-span-7 border-r-2 border-slate-900 px-2">{t.tableFrequency}</div>
                            <div className="col-span-2 px-2">{t.tableDuration}</div>
                        </div>

                        {/* Masaj Row */}
                        <div className="grid grid-cols-12 border-b-2 border-slate-900 min-h-[80px]">
                            <div className="col-span-3 border-r-2 border-slate-900 p-2 flex items-center justify-start pl-3 font-bold text-xl bg-yellow-50/50">
                                {t.massage}
                            </div>
                            <div className="col-span-7 border-r-2 border-slate-900 p-2 flex flex-col justify-center items-center text-center">
                                <span className="font-black text-3xl text-slate-800">{t.massageFrequency}</span>
                            </div>
                            <div className="col-span-2 p-2 flex flex-col justify-center gap-1.5 text-[10px] font-medium pl-3">
                                {t.massageDurations.map(opt => (
                                    <label key={opt} className="flex items-center gap-1.5 cursor-pointer hover:bg-slate-100 p-0.5 rounded -ml-1">
                                        <input
                                            type="checkbox"
                                            checked={massageDuration.includes(opt)}
                                            onChange={() => toggleSelection(massageDuration, setMassageDuration, opt)}
                                            className="w-3.5 h-3.5 accent-slate-900"
                                        />
                                        {opt}
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Retainer Row */}
                        <div className="grid grid-cols-12 border-b-2 border-slate-900 min-h-[140px]">
                            <div className="col-span-3 border-r-2 border-slate-900 p-2 flex flex-col justify-center pl-3 bg-blue-50/50">
                                <span className="font-bold text-xl leading-none text-slate-900">{t.retainer}</span>
                                <span className="text-[10px] text-slate-500 font-medium leading-tight mt-1 mb-2">{t.retainerSubtitle}</span>
                                <div className="flex flex-col gap-1 w-full pr-1">
                                    {t.retainerSizes.map(opt => (
                                        <label key={opt} className="flex items-center gap-1.5 cursor-pointer text-[10px] font-bold bg-white/80 px-2 py-1 rounded border border-slate-200 shadow-sm hover:bg-white transition-colors">
                                            <input
                                                type="checkbox"
                                                checked={retainerSize.includes(opt)}
                                                onChange={() => toggleSelection(retainerSize, setRetainerSize, opt)}
                                                className="w-3.5 h-3.5 accent-blue-600"
                                            />
                                            {opt}
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div className="col-span-7 border-r-2 border-slate-900 p-2 flex flex-col justify-center items-center text-center">
                                <div className="font-black text-3xl mb-1 text-slate-800">{t.retainerFrequency}</div>
                                <div className="text-[11px] leading-tight px-4 text-slate-600 bg-slate-50 py-2 rounded-lg border border-slate-100 mx-4">
                                    {t.retainerNote}
                                </div>
                            </div>
                            <div className="col-span-2 p-2 flex flex-col justify-center gap-1.5 text-[10px] font-medium pl-3">
                                {t.retainerDurations.map(opt => (
                                    <label key={opt} className="flex items-center gap-1.5 cursor-pointer hover:bg-slate-100 p-0.5 rounded -ml-1">
                                        <input
                                            type="checkbox"
                                            checked={retainerDuration.includes(opt)}
                                            onChange={() => toggleSelection(retainerDuration, setRetainerDuration, opt)}
                                            className="w-3.5 h-3.5 accent-slate-900"
                                        />
                                        {opt}
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Bantlama Row */}
                        <div className="grid grid-cols-12 min-h-[110px]">
                            <div className="col-span-3 border-r-2 border-slate-900 p-2 flex flex-col justify-center pl-3 font-bold bg-green-50/50">
                                <span className="text-xl text-slate-900">{t.taping}</span>
                                <span className="text-[10px] font-normal mt-0.5 text-slate-500 uppercase tracking-widest">{t.tapingSubtitle}</span>
                            </div>
                            <div className="col-span-7 border-r-2 border-slate-900 p-2 flex flex-col justify-center items-center text-center gap-1">
                                <div className="font-bold text-lg">{t.tapingFrequency}</div>
                                <div className="text-[10px] italic text-slate-500 leading-tight">{t.tapingNote1}</div>
                                <div className="text-[11px] font-bold bg-amber-50 text-amber-900 px-3 py-1 rounded border border-amber-100 mt-1">
                                    {t.tapingNote2}
                                </div>
                            </div>
                            <div className="col-span-2 p-2 flex flex-col justify-center gap-1.5 text-[10px] font-medium pl-3">
                                {t.tapingDurations.map(opt => (
                                    <label key={opt} className="flex items-center gap-1.5 cursor-pointer hover:bg-slate-100 p-0.5 rounded -ml-1">
                                        <input
                                            type="checkbox"
                                            checked={tapingDuration.includes(opt)}
                                            onChange={() => toggleSelection(tapingDuration, setTapingDuration, opt)}
                                            className="w-3.5 h-3.5 accent-slate-900"
                                        />
                                        {opt}
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Visuals and Notes Section */}
                    <div className="flex items-start gap-8 mt-2 pl-1">
                        {/* Visuals Stack (Left) */}
                        <div className="flex flex-col gap-2 shrink-0">
                            {/* 1. Micropore */}
                            <div className="flex items-center gap-3">
                                <div className="bg-white p-2 rounded-xl border border-slate-100 shadow-sm relative group shrink-0">
                                    <div className="absolute inset-0 bg-slate-50 rounded-xl -z-10 translate-y-1 translate-x-1"></div>
                                    <img src="/image2.png" alt="3M Micropore" className="w-[72px] h-[72px] object-contain" />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <span className="font-black text-sm text-slate-900 leading-none">{t.microporeTitle}</span>
                                    <span className="text-[11px] font-bold text-red-600 max-w-[220px] leading-tight mt-1" dangerouslySetInnerHTML={{ __html: t.microporeNote }} />
                                </div>
                            </div>

                            {/* 2. Nostril Retainer */}
                            <div className="flex items-center gap-3">
                                <div className="bg-white p-2 rounded-xl border border-slate-100 shadow-sm relative group shrink-0">
                                    <div className="absolute inset-0 bg-slate-50 rounded-xl -z-10 translate-y-1 translate-x-1"></div>
                                    <img src="/image1.png" alt="Nostril Retainer" className="w-[72px] h-[72px] object-contain" />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <span className="font-black text-sm text-slate-900 leading-none">{t.retainer}</span>
                                    <span className="text-[10px] text-slate-500 font-bold mt-1">{t.retainerBrand}</span>
                                    <span className="text-[10px] text-slate-600 font-semibold leading-tight mt-1 max-w-[240px]" dangerouslySetInnerHTML={{ __html: t.retainerInstruction }} />
                                </div>
                            </div>
                        </div>

                        {/* Middle/Right Notes Section */}
                        <div className="flex-1 flex flex-col gap-3 pt-1">
                            <div className="bg-amber-50/40 p-3.5 rounded-2xl border-2 border-amber-100/50">
                                <h3 className="font-black text-xs text-amber-900 mb-2.5 uppercase tracking-[0.1em] flex items-center gap-2">
                                    <div className="w-1.5 h-4 bg-amber-500 rounded-full"></div>
                                    {t.reminderTitle}
                                </h3>
                                <div className="space-y-2.5">
                                    <div className="flex items-start gap-2">
                                        <span className="text-sm shrink-0 mt-0.5">ℹ️</span>
                                        <p className="text-[10px] font-bold text-slate-800 leading-tight">
                                            <span className="text-slate-900">{t.reminderWash}</span> {t.reminderWashNote}
                                        </p>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="text-sm shrink-0 mt-0.5">ℹ️</span>
                                        <p className="text-[10px] font-bold text-slate-800 leading-tight">
                                            <span className="text-red-600 font-black">{t.reminderSmoking}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Note */}
                <div className="absolute bottom-0 left-0 w-full px-[8mm] pb-[10mm] print:pb-0">
                    <div className="border-t-2 border-slate-900 pt-3 text-center bg-white">
                        {/* Line 1 */}
                        <div className="flex items-center justify-center gap-6 text-sm font-bold text-slate-900 whitespace-nowrap">
                            <span>{t.footerLine1}</span>
                            <span className="text-slate-300">|</span>
                            <div className="flex items-center gap-1.5">
                                <img src="/instagram_icon.png" alt="IG" className="w-5 h-5 object-contain" />
                                <span>@dribrahimyagci</span>
                            </div>
                            <span className="text-slate-300">|</span>
                            <span>{t.footerAssistant}</span>
                        </div>
                        {/* Line 2 */}
                        <div className="text-xl italic font-serif mt-1 text-slate-800 whitespace-nowrap">
                            {t.footerLine2} <span className="font-black text-slate-900">{t.website}</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

