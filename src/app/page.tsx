"use client";

import React, { useState } from "react";
import { ArrowRight, FileText, ClipboardList, Pill, ChevronLeft, BarChart3, Plane, Printer, FileEdit, Languages, ExternalLink } from "lucide-react";

/** 
 * modern-ucus-raporu component for printing and live preview
 * ENFORCES A4 FORMAT
 */
const FlightReportPrintable = ({ data, isPreview = false }: { data: { name: string, surgeryDate: string, flightDate: string }, isPreview?: boolean }) => {
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "....................";
    try {
      const parts = dateStr.split('-');
      if (parts.length === 3) return `${parts[2]}.${parts[1]}.${parts[0]}`;
      return new Date(dateStr).toLocaleDateString('tr-TR');
    } catch {
      return dateStr;
    }
  };

  const containerClasses = isPreview
    ? "w-full mt-8 p-8 bg-white text-slate-900 rounded-3xl shadow-2xl border border-white/20 overflow-hidden font-sans scale-[0.85] origin-top mb-12"
    : "hidden print:block bg-white text-black font-sans leading-relaxed w-[210mm] h-[297mm] p-[20mm] mx-auto";

  return (
    <div className={containerClasses} id={isPreview ? "preview-report" : "printable-report"}>
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
          #printable-report {
            display: block !important;
            width: 210mm;
            height: 297mm;
            box-sizing: border-box;
          }
        }
      `}</style>

      <div className="h-full flex flex-col border-[0.5pt] border-slate-100 p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-bl-full -z-10 opacity-50"></div>

        <div className="flex justify-between items-start border-b-4 border-slate-900 pb-8 mb-12">
          <div className="text-left">
            <h1 className="text-4xl font-black uppercase tracking-tighter text-slate-950 leading-none mb-2">
              Op. Dr. İbrahim YAĞCI
            </h1>
            <p className="text-[11pt] font-extrabold text-slate-700 uppercase tracking-[0.15em]">
              Kulak Burun Boğaz ve Baş Boyun Cerrahisi Uzmanı
            </p>
            <p className="text-[10pt] italic text-slate-500 font-semibold mt-1">
              Otorhinolaryngology - Head and Neck Surgeon
            </p>
          </div>
          <div className="bg-slate-900 text-white p-4 rounded-xl text-center min-w-[120px]">
            <p className="text-[8pt] font-black uppercase tracking-widest opacity-60 mb-1">DOKÜMAN / DOC</p>
            <p className="text-xl font-bold">FFC-2025</p>
          </div>
        </div>

        <div className="text-center mb-16">
          <h2 className="text-2xl font-black uppercase text-slate-900 tracking-tight">
            UÇUŞA ELVERİŞLİLİK RAPORU
          </h2>
          <div className="flex items-center justify-center gap-4 my-2">
            <div className="h-[2pt] bg-slate-200 flex-1"></div>
            <h2 className="text-lg font-bold uppercase text-slate-500 italic">
              FLIGHT FITNESS CERTIFICATE
            </h2>
            <div className="h-[2pt] bg-slate-200 flex-1"></div>
          </div>
        </div>

        <div className="flex-1 space-y-12">
          <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 relative">
            <div className="absolute -top-3 left-6 bg-slate-900 text-white text-[8pt] font-black px-4 py-1 rounded-full uppercase tracking-widest">
              HASTA BİLGİLERİ / PATIENT INFO
            </div>
            <div className="grid grid-cols-1 gap-6">
              <div className="flex items-end gap-3 pb-2 border-b border-slate-300">
                <span className="text-slate-500 font-bold uppercase text-xs w-32 shrink-0">İsim / Name:</span>
                <span className="text-xl font-black text-slate-900 tracking-tight">{data.name || "................................................"}</span>
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div className="flex items-end gap-3 pb-2 border-b border-slate-300">
                  <span className="text-slate-500 font-bold uppercase text-xs shrink-0">Ameliyat / Surgery:</span>
                  <span className="text-lg font-black text-slate-900">{formatDate(data.surgeryDate)}</span>
                </div>
                <div className="flex items-end gap-3 pb-2 border-b border-slate-300">
                  <span className="text-slate-500 font-bold uppercase text-xs shrink-0">Uçuş / Flight:</span>
                  <span className="text-lg font-black text-slate-900">{formatDate(data.flightDate)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8 px-4">
            <div className="relative">
              <p className="text-[13pt] leading-relaxed text-slate-900 text-justify">
                Sayın <strong>{data.name || "..................."}</strong>'ın yapılan fiziki muayenesi ve tıbbi değerlendirmesi sonucunda, uçak ile seyahat etmesine engel teşkil edecek herhangi bir klinik bulguya rastlanmamıştır.
              </p>
              <p className="text-[11pt] leading-relaxed text-slate-500 italic mt-4 text-justify border-l-4 border-slate-200 pl-6">
                Following the clinical examination and medical evaluation of <strong>{data.name || "..................."}</strong>, no medical contraindications have been found to prevent air travel.
              </p>
            </div>

            <div className="mt-12 p-8 bg-slate-950 rounded-3xl text-white shadow-2xl transform">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-emerald-500 p-2 rounded-lg">
                  <Plane className="w-6 h-6 text-slate-950" />
                </div>
                <h4 className="text-lg font-black uppercase tracking-wider text-emerald-400">TIBBİ ONAY / MEDICAL CLEARANCE</h4>
              </div>
              <p className="text-[14pt] font-bold leading-snug">
                <span className="opacity-60 font-medium text-lg">Hastanın</span> <strong>{formatDate(data.flightDate)}</strong> <span className="opacity-60 font-medium text-sm">tarihi itibarı ile uçuş yapmasında sakınca yoktur.</span>
              </p>
              <div className="h-px bg-white/10 my-4"></div>
              <p className="text-[11pt] italic text-slate-400">
                As of <strong>{formatDate(data.flightDate)}</strong>, the patient is medically cleared for flight. No pathological findings were detected.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t-2 border-slate-100 pt-12 flex justify-between items-end">
          <div className="space-y-1">
            <p className="text-[9pt] font-black text-slate-400 uppercase tracking-widest">Rapor Tarihi / Report Date</p>
            <p className="text-lg font-bold text-slate-900">{new Date().toLocaleDateString('tr-TR')}</p>
            <div className="mt-8 text-[7pt] text-slate-300 max-w-[200px] leading-tight font-medium uppercase tracking-[0.1em]">
              Bu belge Op. Dr. İbrahim Yağcı asistan paneli tarafından dijital olarak doğrulanmıştır.
            </div>
          </div>

          <div className="text-right flex flex-col items-center min-w-[250px] relative">
            <div className="absolute -top-16 right-0 w-48 h-48 opacity-5 pointer-events-none">
              <Languages className="w-full h-full text-slate-900" />
            </div>

            <div className="z-10 text-center">
              <div className="text-blue-900 font-black text-xl mb-1">Op. Dr. İbrahim YAĞCI</div>
              <div className="text-blue-800 font-bold text-sm uppercase tracking-widest mb-0.5">KBB ve B.B.C Uzmanı</div>
              <div className="text-blue-800 text-xs font-semibold">Diploma Tescil No: 182657</div>

              <div className="mt-8 border-t border-slate-200 pt-2">
                <p className="text-[8pt] font-black text-slate-400 uppercase tracking-[0.3em]">KAŞE - İMZA / STAMP</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CATEGORIES = [
  {
    id: "bilgilendirme",
    title: "Hasta Bilgilendirme",
    icon: <FileText className="w-8 h-8" />,
    color: "bg-emerald-700/80",
    docs: [
      { name: "Hasta Bilgilendirme", iconType: "pdf", path: "https://www.ibrahimyagci.com/_files/ugd/bc99bb_d1ac4338b4f74882bb5a73997dd2a957.pdf" },
      { name: "Hasta Bilgilendirme (Print)", iconType: "print", path: "https://www.ibrahimyagci.com/_files/ugd/bc99bb_1f1b252813894b4e9bbbbe23f53fc90f.pdf" },
      { name: "Postop Bilgilendirme Fişi (Print)", iconType: "print", path: "https://www.ibrahimyagci.com/_files/ugd/bc99bb_a11ebea7f07d4f0f968897b6f0b21c2c.pdf" }
    ]
  },
  {
    id: "onamlar",
    title: "Onamlar",
    icon: <ClipboardList className="w-8 h-8" />,
    color: "bg-emerald-700/80",
    docs: [
      {
        name: "Rinoplasti",
        langs: [
          { label: "Türkçe", path: "https://www.ibrahimyagci.com/_files/ugd/bc99bb_d46035a5987e490ab1aacea811ab8bca.pdf" },
          { label: "İngilizce", path: "https://www.ibrahimyagci.com/_files/ugd/bc99bb_45f487fa44844cf19e68029bc40a965a.pdf" }
        ]
      },
      {
        name: "Revizyon Rinoplasti",
        langs: [
          { label: "Türkçe", path: "https://www.ibrahimyagci.com/_files/ugd/bc99bb_909ed95a53d947a4ad593ebc1748b6f9.pdf" },
          { label: "İngilizce", path: "https://www.ibrahimyagci.com/_files/ugd/bc99bb_1c69cdd05170490e9610e70430dd18b2.pdf" }
        ]
      },
      {
        name: "Kostal Kıkırdak (Kosta)",
        langs: [
          { label: "Türkçe", path: "https://www.ibrahimyagci.com/_files/ugd/bc99bb_6302964bb8ad4c049b8f914deca5513a.pdf" },
          { label: "İngilizce", path: "https://www.ibrahimyagci.com/_files/ugd/bc99bb_02bbabe6f1754566ae4342f847e2a51d.pdf" }
        ]
      },
      { name: "Görsel İçerik Onam Formu", path: "https://www.ibrahimyagci.com/_files/ugd/bc99bb_695473bf67e74d69b1f886ff3fb06e50.pdf" }
    ]
  },
  {
    id: "receteler",
    title: "Reçeteler",
    icon: <Pill className="w-8 h-8" />,
    color: "bg-emerald-700/80",
    docs: [
      { name: "Reçete rino | [TR] Cefaks + Cipro", path: "/documents/receteler/reçete rino | [TR] Cefaks + Cipro .pdf" },
      { name: "Reçete rino | 2025 CEFAKS", path: "/documents/receteler/reçete rino | 2025 CEFAKS.pdf" },
      { name: "Reçete rino | 2025 CİPRO", path: "/documents/receteler/reçete rino | 2025 CİPRO.pdf" },
      { name: "Reçete rino | [EN] Cipro + Cefaks", path: "/documents/receteler/reçete rino | [EN] Cipro + Cefaks.pdf" },
      { name: "Reçete rino | [ESP] Cipro + Cefaks", path: "/documents/receteler/reçete rino | [ESP] Cipro + Cefaks.pdf" },
      { name: "Reçete rino | 2025 CEFAKS Fransızca", path: "/documents/receteler/reçete rino | 2025 CEFAKS Fransızca.pdf" },
      { name: "Reçete rino | 2025 ingilizce", path: "/documents/receteler/reçete rino | 2025 ingilizce.pdf" }
    ]
  },
  {
    id: "formlar",
    title: "Formlar",
    icon: <FileEdit className="w-8 h-8" />,
    color: "bg-amber-700/80",
    docs: [
      { name: "Ameliyat Raporu Formu", path: "https://www.ibrahimyagci.com/_files/ugd/bc99bb_113aae742f024773a8b44b09afb229ee.pdf" }
    ]
  },
  {
    id: "raporlar",
    title: "Raporlar",
    icon: <BarChart3 className="w-8 h-8" />,
    color: "bg-blue-700/80",
    subItems: [
      { id: "flight-report", title: "Uçuş Raporu", icon: <Plane className="w-6 h-6" /> }
    ]
  }
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<any | null>(null);
  const [activeSubItem, setActiveSubItem] = useState<string | null>(null);
  const [hoveredDoc, setHoveredDoc] = useState<string | null>(null);

  const [flightData, setFlightData] = useState({ name: "", surgeryDate: "", flightDate: "" });
  const isFlightDataValid = flightData.name.length > 2 && flightData.surgeryDate && flightData.flightDate;

  const handlePrint = () => {
    window.print();
  };

  return (
    <main className="min-h-screen p-4 md:p-8 flex flex-col items-center max-w-[430px] mx-auto bg-slate-950 text-slate-100 print:bg-white print:p-0 print:m-0 print:max-w-none">
      <div className="print:hidden w-full flex flex-col items-center">
        <header className="w-full text-center mb-12 mt-8">
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
            Op. Dr. İbrahim YAĞCI
          </h1>
          <p className="text-slate-400 font-medium">Asistan Paneli</p>
        </header>

        {!selectedCategory ? (
          <div className="w-full space-y-6">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat)}
                className={`${cat.color} flex items-center justify-between w-full p-6 text-xl font-semibold transition-all rounded-[2rem] border border-white/10 hover:scale-[1.02] active:scale-[0.98] shadow-lg group`}
              >
                <span className="flex items-center gap-4">
                  {cat.icon}
                  {cat.title}
                </span>
                <ArrowRight className="w-6 h-6 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </button>
            ))}
          </div>
        ) : (
          <div className="w-full space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <button
              onClick={() => {
                setSelectedCategory(null);
                setActiveSubItem(null);
              }}
              className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              Geri Dön
            </button>

            <h2 className="text-2xl font-bold mb-6 text-white border-l-4 border-emerald-500 pl-4">
              {selectedCategory.title}
            </h2>

            {selectedCategory.id === "raporlar" && !activeSubItem ? (
              <div className="space-y-4">
                {selectedCategory.subItems.map((item: any) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSubItem(item.id)}
                    className="w-full p-6 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-3xl flex items-center justify-between transition-all group"
                  >
                    <span className="flex items-center gap-4 text-xl font-medium">
                      {item.icon}
                      {item.title}
                    </span>
                    <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            ) : activeSubItem === "flight-report" ? (
              <div className="space-y-6">
                <div className="glass-card p-6 border-blue-500/30 space-y-4 shadow-2xl">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">Hasta İsmi</label>
                      <input
                        type="text"
                        placeholder="Örn: Agustin Enrique Maiso"
                        className="w-full bg-slate-800 border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-white placeholder:text-slate-600"
                        value={flightData.name}
                        onChange={(e) => setFlightData({ ...flightData, name: e.target.value })}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-400 mb-2">Ameliyat Tarihi</label>
                        <input
                          type="date"
                          className="w-full bg-slate-800 border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none text-white"
                          value={flightData.surgeryDate}
                          onChange={(e) => setFlightData({ ...flightData, surgeryDate: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-400 mb-2">Uçuş Tarihi</label>
                        <input
                          type="date"
                          className="w-full bg-slate-800 border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none text-white"
                          value={flightData.flightDate}
                          onChange={(e) => setFlightData({ ...flightData, flightDate: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    disabled={!isFlightDataValid}
                    onClick={handlePrint}
                    className={`w-full py-5 rounded-2xl flex items-center justify-center gap-3 font-bold text-lg transition-all ${isFlightDataValid
                        ? "bg-blue-600 hover:bg-blue-500 text-white shadow-xl active:scale-95 ring-2 ring-blue-400/20"
                        : "bg-slate-800 text-slate-500 cursor-not-allowed"
                      }`}
                  >
                    <Printer className="w-6 h-6" />
                    Belgeyi Yazdır (A4)
                  </button>

                  {!isFlightDataValid && (
                    <p className="text-[10pt] text-center text-blue-400/60 bg-blue-500/5 py-3 rounded-lg border border-blue-500/10 italic">
                      Lütfen tüm alanları doldurun.
                    </p>
                  )}
                </div>

                <div className="w-full pt-4">
                  <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4 ml-4">
                    Belge Önizleme (A4) / Document Preview
                  </h4>
                  <div className="relative">
                    <FlightReportPrintable data={flightData} isPreview={true} />
                    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none"></div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {selectedCategory.docs?.length > 0 ? (
                  selectedCategory.docs.map((doc: any, idx: number) => (
                    <div
                      key={idx}
                      className="relative"
                      onMouseEnter={() => doc.langs && setHoveredDoc(doc.name)}
                      onMouseLeave={() => setHoveredDoc(null)}
                    >
                      {doc.langs ? (
                        <div className="flex flex-col gap-2">
                          <div className={`w-full p-5 bg-slate-900 border transition-all duration-300 rounded-2xl flex items-center justify-between ${hoveredDoc === doc.name ? 'border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.2)]' : 'border-slate-800'}`}>
                            <span className="text-slate-100 font-bold text-lg">{doc.name}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-[9pt] font-black uppercase tracking-widest text-emerald-500/60">DİL SEÇİN</span>
                              <Languages className="w-5 h-5 text-emerald-500 animate-pulse" />
                            </div>
                          </div>

                          <div className={`grid grid-cols-2 gap-3 transition-all duration-300 ${hoveredDoc === doc.name ? 'opacity-100 translate-y-0 max-h-40' : 'opacity-0 -translate-y-2 max-h-0 pointer-events-none overflow-hidden'}`}>
                            {doc.langs.map((l: any, i: number) => (
                              <a
                                key={i}
                                href={l.path}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 p-4 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-sm font-black text-white transition-all shadow-lg active:scale-95 border border-emerald-400/30"
                              >
                                {l.label}
                                <ExternalLink className="w-4 h-4 opacity-50" />
                              </a>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <a
                          href={doc.path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group block w-full p-5 bg-slate-900/80 hover:bg-slate-800 border border-slate-800/50 rounded-2xl transition-all hover:scale-[1.02] flex items-center justify-between"
                        >
                          <span className="text-slate-200 font-medium">{doc.name}</span>
                          {doc.iconType === "print" ? (
                            <Printer className="w-6 h-6 text-emerald-500 group-hover:animate-bounce" />
                          ) : (
                            <FileText className="w-6 h-6 text-emerald-500" />
                          )}
                        </a>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 text-slate-500 glass-card">
                    Henüz belge yüklenmemiş.
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        <footer className="mt-auto py-8 text-center text-slate-600 text-sm">
          &copy; {new Date().getFullYear()} Dr. İbrahim YAĞCI
        </footer>
      </div>

      <FlightReportPrintable data={flightData} />
    </main>
  );
}
