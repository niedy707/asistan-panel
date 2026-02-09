"use client";

import React, { useState } from "react";
import { ArrowRight, FileText, ClipboardList, Pill, ChevronLeft, BarChart3, Plane, Printer, FileEdit } from "lucide-react";

/** 
 * modern-ucus-raporu component for printing and live preview
 */
const FlightReportPrintable = ({ data, isPreview = false }: { data: { name: string, surgeryDate: string, flightDate: string }, isPreview?: boolean }) => {
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "....................";
    try {
      return new Date(dateStr).toLocaleDateString('tr-TR');
    } catch {
      return dateStr;
    }
  };

  const containerClasses = isPreview
    ? "w-full mt-8 p-8 bg-white text-slate-900 rounded-3xl shadow-2xl border border-white/20 overflow-hidden font-sans scale-[0.9] origin-top mb-12"
    : "hidden print:block p-16 bg-white text-black font-sans text-[11pt] leading-relaxed max-w-[21cm] mx-auto";

  return (
    <div className={containerClasses} id={isPreview ? "preview-report" : "printable-report"}>
      {/* Header */}
      <div className="flex flex-col items-center text-center border-b-2 border-slate-900 pb-8 mb-10">
        <h1 className="text-3xl font-black uppercase tracking-tighter text-slate-900 mb-1">
          Op. Dr. İbrahim YAĞCI
        </h1>
        <div className="flex flex-col gap-0.5 mt-2">
          <p className="text-[10pt] font-bold text-slate-700 uppercase tracking-widest">
            Kulak Burun Boğaz ve Baş Boyun Cerrahisi Uzmanı
          </p>
          <p className="text-[9pt] italic text-slate-500 font-medium">
            Otorhinolaryngology - Head and Neck Surgeon
          </p>
        </div>
      </div>

      {/* Report Title */}
      <div className="text-center mb-12">
        <div className="inline-block px-8 py-2 border-2 border-slate-900 rounded-lg">
          <h2 className="text-xl font-black uppercase text-slate-950">
            UÇUŞA ELVERİŞLİLİK RAPORU
          </h2>
          <div className="h-px bg-slate-400 w-full my-1"></div>
          <h2 className="text-lg font-bold uppercase text-slate-700">
            FLIGHT FITNESS CERTIFICATE
          </h2>
        </div>
      </div>

      {/* Content Section */}
      <div className="space-y-10">
        <div className="relative">
          <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-4 border-b border-slate-100 pb-2">
            Hasta Bilgileri / Patient Information
          </h3>
          <div className="space-y-6">
            <p className="text-[12pt] leading-normal text-slate-800">
              Tarafımıza başvuran <strong>{data.name || "................................................"}</strong>'ın yapılan fiziki muayenesinde, uçak ile seyahat etmesine engel teşkil edecek tıbbi bir bulguya rastlanmamıştır.
            </p>
            <p className="text-[11pt] leading-normal text-slate-600 italic border-l-4 border-slate-200 pl-4">
              We hereby certify that <strong>{data.name || "................................................"}</strong> has been medically examined and is found to be fit for air travel.
            </p>
          </div>
        </div>

        {/* Vital Info Grid */}
        <div className="grid grid-cols-2 gap-0 border border-slate-900 divide-x divide-slate-900 rounded-lg overflow-hidden">
          <div className="p-4 bg-slate-50/50">
            <p className="text-[8pt] font-black text-slate-500 uppercase mb-1">Ameliyat Tarihi / Surgery Date</p>
            <p className="text-xl font-bold text-slate-900">{formatDate(data.surgeryDate)}</p>
          </div>
          <div className="p-4 bg-slate-50/50">
            <p className="text-[8pt] font-black text-slate-500 uppercase mb-1">Uçuş Tarihi / Flight Date</p>
            <p className="text-xl font-bold text-slate-900">{formatDate(data.flightDate)}</p>
          </div>
        </div>

        {/* Conclusion Statement */}
        <div className="bg-slate-900 p-6 rounded-xl text-white shadow-lg">
          <p className="text-[12pt] font-medium leading-relaxed">
            <span className="text-emerald-400 font-black tracking-wider uppercase mr-2">[ONAY/APPROVED]</span>
            <strong>{formatDate(data.flightDate)}</strong> tarihi itibarı ile hastanın uçuş yapmasında sakınca yoktur.
          </p>
          <div className="h-px bg-white/20 w-full my-3"></div>
          <p className="text-[10pt] text-slate-300 italic">
            As of <strong>{formatDate(data.flightDate)}</strong>, there is no medical contraindication for the patient to travel by air.
          </p>
        </div>
      </div>

      {/* Signature & Date Footer */}
      <div className="mt-24 flex justify-between items-end">
        <div className="space-y-4">
          <div className="px-4 py-2 bg-slate-50 rounded italic text-slate-400 text-sm">
            Rapor Tarihi / Report Date: <span className="text-slate-900 font-bold ml-2">{new Date().toLocaleDateString('tr-TR')}</span>
          </div>
        </div>

        <div className="text-center relative">
          {/* Decorative Stamp Element */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-40 h-40 border-4 border-blue-900/10 rounded-full flex items-center justify-center -rotate-12 pointer-events-none">
            <div className="border border-blue-900/5 w-full h-full rounded-full m-1"></div>
          </div>

          <div className="relative z-10 text-blue-900">
            <div className="font-black text-[13pt] leading-tight mb-1">Op. Dr. İbrahim YAĞCI</div>
            <div className="text-[10pt] font-bold uppercase tracking-widest">KBB ve B.B.C Uzmanı</div>
            <div className="text-[9pt] font-medium">Diploma Tescil No: 182657</div>
          </div>
          <div className="mt-6 border-t border-slate-200 pt-2 text-[8pt] font-black text-slate-400 uppercase tracking-widest">
            Kaşe - İmza / Stamp - Signature
          </div>
        </div>
      </div>

      <div className="mt-16 text-center text-[8pt] text-slate-300 italic border-t border-slate-50 pt-4">
        This document is an official medical statement issued via the digital assistant portal.
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
      { name: "Hasta Bilgilendirme (pdf)", path: "https://www.ibrahimyagci.com/_files/ugd/bc99bb_d1ac4338b4f74882bb5a73997dd2a957.pdf" },
      { name: "Hast. Bilgilendirme (print)", path: "https://www.ibrahimyagci.com/_files/ugd/bc99bb_1f1b252813894b4e9bbbbe23f53fc90f.pdf" },
      { name: "Postop bilgilendirme fişi", path: "https://www.ibrahimyagci.com/_files/ugd/bc99bb_a11ebea7f07d4f0f968897b6f0b21c2c.pdf" },
      { name: "Rinoplasti Ameliyatı Bilgilendirme (Dahili)", path: "/documents/bilgilendirme/Rinoplasti Ameliyatı Bilgilendirme  online metin.pdf" }
    ]
  },
  {
    id: "onamlar",
    title: "Onamlar",
    icon: <ClipboardList className="w-8 h-8" />,
    color: "bg-emerald-700/80",
    docs: [
      { name: "Rinoplasti (Türkçe)", path: "https://www.ibrahimyagci.com/_files/ugd/bc99bb_d46035a5987e490ab1aacea811ab8bca.pdf" },
      { name: "Rinoplasti (İng)", path: "https://www.ibrahimyagci.com/_files/ugd/bc99bb_45f487fa44844cf19e68029bc40a965a.pdf" },
      { name: "Görsel İçerik Onam Formu", path: "https://www.ibrahimyagci.com/_files/ugd/bc99bb_695473bf67e74d69b1f886ff3fb06e50.pdf" },
      { name: "Revizyon Rinoplasti (Türkçe)", path: "https://www.ibrahimyagci.com/_files/ugd/bc99bb_909ed95a53d947a4ad593ebc1748b6f9.pdf" },
      { name: "Revizyon Rinoplasti (İng)", path: "https://www.ibrahimyagci.com/_files/ugd/bc99bb_1c69cdd05170490e9610e70430dd18b2.pdf" },
      { name: "Kostal kıkırdak raft (Türkçe)", path: "https://www.ibrahimyagci.com/_files/ugd/bc99bb_6302964bb8ad4c049b8f914deca5513a.pdf" },
      { name: "Kosta (İng)", path: "https://www.ibrahimyagci.com/_files/ugd/bc99bb_02bbabe6f1754566ae4342f847e2a51d.pdf" }
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
      { name: "Ameliyat raporu formu", path: "https://www.ibrahimyagci.com/_files/ugd/bc99bb_113aae742f024773a8b44b09afb229ee.pdf" }
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

  // Flight Report State
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
                        ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl active:scale-95 ring-2 ring-emerald-400/20"
                        : "bg-slate-800 text-slate-500 cursor-not-allowed"
                      }`}
                  >
                    <Printer className="w-6 h-6" />
                    Belgeyi Yazdır
                  </button>

                  {!isFlightDataValid && (
                    <p className="text-[10pt] text-center text-blue-400/60 bg-blue-500/5 py-3 rounded-lg border border-blue-500/10 italic">
                      Lütfen tüm alanları doldurun.
                    </p>
                  )}
                </div>

                {/* Live Preview Section */}
                <div className="w-full pt-4">
                  <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4 ml-4">
                    Belge Önizleme / Document Preview
                  </h4>
                  <div className="relative">
                    <FlightReportPrintable data={flightData} isPreview={true} />
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none"></div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {selectedCategory.docs?.length > 0 ? (
                  selectedCategory.docs.map((doc: any, idx: number) => (
                    <a
                      key={idx}
                      href={doc.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full p-5 bg-slate-900/80 hover:bg-slate-800 border border-slate-800/50 rounded-2xl transition-all hover:translate-x-2 flex items-center justify-between"
                    >
                      <span className="text-slate-200 font-medium">{doc.name}</span>
                      <FileText className="w-5 h-5 text-emerald-500" />
                    </a>
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
