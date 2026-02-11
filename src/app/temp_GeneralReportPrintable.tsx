/**
 * General Medical Report / Letter Component
 * Reuses the layout from FlightReportPrintable
 */
const GeneralReportPrintable = ({ data, isPreview = false }: { data: { name: string, date: string, title: string, content: string }, isPreview?: boolean }) => {
    const formatDate = (dateStr: string) => {
        if (!dateStr) return "....................";
        try {
            if (dateStr.includes('.')) return dateStr;
            const parts = dateStr.split('-');
            if (parts.length === 3) return `${parts[2]}.${parts[1]}.${parts[0]}`;
            return new Date(dateStr).toLocaleDateString('tr-TR');
        } catch {
            return dateStr;
        }
    };

    const containerClasses = isPreview
        ? "w-full mt-8 p-8 bg-white text-slate-900 rounded-3xl shadow-2xl border border-white/20 font-sans aspect-[210/297] mb-12 overflow-y-auto"
        : "hidden print:block bg-white text-black font-sans leading-relaxed w-[210mm] h-[297mm] p-[10mm] mx-auto";

    return (
        <div className={containerClasses} id={isPreview ? "preview-general-report" : "printable-general-report"}>
            <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,900;1,900&display=swap');
        
        @media print {
          @page {
            size: A4;
            margin: 0;
          }
          body {
            margin: 0;
            padding: 0;
          }
          #printable-general-report {
            display: block !important;
            width: 210mm;
            height: 297mm;
            box-sizing: border-box;
          }
        }
      `}</style>

            <div className="h-full flex flex-col border-[0.5pt] border-slate-100 p-8 relative overflow-hidden">
                {/* Background Element */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-bl-full -z-10 opacity-50"></div>

                {/* Header */}
                <div className="flex justify-between items-start border-b-2 border-slate-900 pb-4 mb-8">
                    <div className="text-left">
                        <h1 className="text-4xl font-black text-slate-950 leading-none mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                            Op. Dr. İbrahim YAĞCI
                        </h1>
                        <p className="text-[11pt] font-extrabold text-slate-700 uppercase tracking-wide">
                            Kulak Burun Boğaz Uzmanı & Rinoplasti
                        </p>
                        <p className="text-[10pt] italic text-slate-500 font-semibold mt-1">
                            Otorhinolaryngology & Rhinoplasty Surgeon
                        </p>
                    </div>
                    <div className="text-right pt-2">
                        <p className="text-[9pt] font-black text-slate-400 uppercase tracking-widest">Tarih / Date</p>
                        <p className="text-lg font-bold text-slate-900">{formatDate(data.date)}</p>
                    </div>
                </div>

                {/* Title */}
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-black uppercase text-slate-900 tracking-tight">
                        {data.title || "TIBBİ RAPOR / MEDICAL REPORT"}
                    </h2>
                    <div className="w-1/3 h-[1pt] bg-slate-200 mx-auto mt-2"></div>
                </div>

                {/* Patient Info Block */}
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 relative mb-8">
                    <div className="absolute -top-3 left-6 bg-slate-900 text-white text-[8pt] font-black px-4 py-1 rounded-full uppercase tracking-widest">
                        HASTA BİLGİLERİ / PATIENT INFO
                    </div>
                    <div className="flex items-end gap-3 pb-2 border-b border-slate-300">
                        <span className="text-slate-500 font-bold uppercase text-xs w-32 shrink-0">İsim / Name:</span>
                        <span className="text-xl font-black text-slate-900 tracking-tight">{data.name || "................................................"}</span>
                    </div>
                </div>

                {/* Content Body */}
                <div className="flex-1 space-y-6">
                    <div className="whitespace-pre-wrap text-[12pt] leading-relaxed text-slate-900 text-justify font-medium">
                        {data.content || "......................................................................................................................................."}
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-auto pt-8">
                    {/* Signature Section */}
                    <div className="flex justify-between items-end mb-8 px-4">
                        <div className="space-y-1"></div>
                        <div className="text-right flex flex-col items-center min-w-[250px] relative">
                            <div className="text-center">
                                <div className="text-blue-900 font-black text-xl mb-1">Op. Dr. İbrahim YAĞCI</div>
                                <div className="text-blue-800 font-bold text-sm uppercase tracking-widest mb-0.5">KBB ve B.B.C Uzmanı</div>
                                <div className="text-blue-800 text-xs font-semibold">Diploma Tescil No: 182657</div>
                                <div className="mt-8 border-t border-slate-200 pt-2">
                                    <p className="text-[8pt] font-black text-slate-400 uppercase tracking-[0.3em]">KAŞE - İMZA / STAMP</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer Line & Content */}
                    <div className="border-t-4 border-slate-900 pt-6 flex justify-between items-start">
                        <div>
                            <p className="text-[8pt] font-black text-slate-400 uppercase tracking-widest mb-1">Hastane Adresi / Hospital Address</p>
                            <p className="text-sm font-bold text-slate-800 max-w-[300px] leading-snug">BHT Klinik Tema Hastanesi</p>
                            <p className="text-[10px] text-slate-500 font-medium mt-1">Atakent, 4. Cd. No:36, 34307 Küçükçekmece/İstanbul</p>
                        </div>

                        <div className="text-right">
                            <p className="text-[8pt] font-black text-slate-400 uppercase tracking-widest mb-2">İletişim / Contact</p>
                            <div className="space-y-1">
                                <p className="text-sm font-bold text-slate-800 flex items-center justify-end gap-2">
                                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Hekim Asistanı Ezgi:</span>
                                    <span className="text-blue-600">+90 (551) 199 9963</span>
                                </p>
                                <p className="text-sm font-bold text-slate-800 flex items-center justify-end gap-2">
                                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Doktor / Doctor:</span>
                                    <span className="text-blue-600">+90 (555) 551 1578</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
