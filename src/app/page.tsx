"use client";

import React, { useState } from "react";
import { ArrowRight, FileText, ClipboardList, Pill, ChevronLeft, BarChart3, Plane, Printer } from "lucide-react";

/** 
 * modern-ucus-raporu component for printing
 */
const FlightReportPrintable = ({ data }: { data: { name: string, surgeryDate: string, flightDate: string } }) => {
  return (
    <div id="printable-report" className="hidden print:block p-12 bg-white text-black font-serif text-[12pt] leading-relaxed">
      <div className="text-center mb-10 border-b-2 border-black pb-6">
        <h1 className="text-2xl font-bold uppercase tracking-widest mb-1">Op. Dr. İbrahim YAĞCI</h1>
        <p className="text-sm italic">Kulak Burun Boğaz ve Baş Boyun Cerrahisi Uzmanı</p>
        <p className="text-sm italic">Otorhinolaryngology - Head and Neck Surgeon</p>
      </div>

      <div className="text-center mb-10">
        <h2 className="text-xl font-bold underline decoration-1 underline-offset-4 mb-1">UÇUŞA ELVERİŞLİLİK RAPORU</h2>
        <h2 className="text-xl font-bold underline decoration-1 underline-offset-4">FLIGHT FITNESS CERTIFICATE</h2>
      </div>

      <div className="space-y-8 mt-12">
        <section>
          <h3 className="font-bold border-b border-gray-300 mb-4 uppercase text-sm tracking-wider">HASTA İLE İLGİLİ BİLGİLER / INFORMATION ABOUT THE PATIENT</h3>
          <p className="mb-4">
            Tarafımıza başvuran <strong>{data.name}</strong>'ın yapılan harici fiziki muayenesinde, uçak ile seyahat etmesine engel belirgin patoloji saptanmamıştır.
          </p>
          <p>
            We hereby certify <strong>{data.name}</strong> who was examined at our clinic with his / her physical signs existing, is medically fit to fly.
          </p>
        </section>

        <section className="grid grid-cols-2 gap-8 border-t border-gray-200 pt-6">
          <div>
            <p className="font-bold text-sm uppercase mb-1">Ameliyat Tarihi / Surgery Date</p>
            <p className="text-lg">{data.surgeryDate}</p>
          </div>
          <div>
            <p className="font-bold text-sm uppercase mb-1">Uçuş Tarihi / Flight Date</p>
            <p className="text-lg">{data.flightDate}</p>
          </div>
        </section>

        <section className="mt-8 p-4 bg-gray-50 border border-gray-200 rounded">
          <p className="font-medium italic">
            <strong>{data.flightDate}</strong> tarihi itibarı ile hastanın uçuş yapmasında sakınca yoktur.
          </p>
          <p className="font-medium italic mt-2">
            As of <strong>{data.flightDate}</strong>, there is no medical contraindication for the patient to fly.
          </p>
        </section>
      </div>

      <div className="mt-24 flex justify-between items-end">
        <div className="text-center">
          <div className="w-48 h-24 border-b border-gray-400 mb-2 flex items-center justify-center italic text-gray-400">Tarih / Date</div>
          <p className="text-sm font-bold">{new Date().toLocaleDateString('tr-TR')}</p>
        </div>
        <div className="text-center">
          <div className="w-64 h-32 relative mb-2 flex flex-col items-center justify-center">
            <div className="font-bold text-blue-900 leading-tight">Op. Dr. İbrahim YAĞCI</div>
            <div className="text-[10pt] text-blue-800">KBB Uzmanı</div>
            <div className="text-[10pt] text-blue-800">Dip. Tes. No: 182657</div>
          </div>
          <p className="text-sm font-bold uppercase">KAŞE - İMZA / STAMP - SIGNATURE</p>
        </div>
      </div>

      <footer className="fixed bottom-12 left-0 right-0 text-center text-[9pt] text-gray-400 border-t border-gray-100 pt-4 px-12 italic">
        Bu belge dijital olarak Op. Dr. İbrahim YAĞCI asistan paneli üzerinden oluşturulmuştur.
      </footer>
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
      { name: "Rinoplasti Ameliyatı Bilgilendirme", path: "/documents/bilgilendirme/Rinoplasti Ameliyatı Bilgilendirme  online metin.pdf" }
    ]
  },
  {
    id: "onamlar",
    title: "Onamlar",
    icon: <ClipboardList className="w-8 h-8" />,
    color: "bg-emerald-700/80",
    docs: []
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
    <main className="min-h-screen p-4 md:p-8 flex flex-col items-center max-w-[430px] mx-auto bg-slate-950 text-slate-100 print:bg-white print:p-0 print:m-0">
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
              <div className="space-y-6 glass-card p-6 border-blue-500/30">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Hasta İsmi</label>
                    <input
                      type="text"
                      placeholder="Örn: Agustin Enrique Maiso"
                      className="w-full bg-slate-800 border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      value={flightData.name}
                      onChange={(e) => setFlightData({ ...flightData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Ameliyat Tarihi</label>
                    <input
                      type="date"
                      className="w-full bg-slate-800 border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                      value={flightData.surgeryDate}
                      onChange={(e) => setFlightData({ ...flightData, surgeryDate: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Uçuş Tarihi</label>
                    <input
                      type="date"
                      className="w-full bg-slate-800 border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                      value={flightData.flightDate}
                      onChange={(e) => setFlightData({ ...flightData, flightDate: e.target.value })}
                    />
                  </div>
                </div>

                <button
                  disabled={!isFlightDataValid}
                  onClick={handlePrint}
                  className={`w-full py-4 rounded-2xl flex items-center justify-center gap-3 font-bold transition-all ${isFlightDataValid
                      ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg active:scale-95"
                      : "bg-slate-800 text-slate-500 cursor-not-allowed"
                    }`}
                >
                  <Printer className="w-6 h-6" />
                  Belgeyi Yazdır
                </button>

                {!isFlightDataValid && (
                  <p className="text-xs text-center text-amber-500/80 italic">
                    Lütfen tüm alanları doldurun (İsim, Ameliyat ve Uçuş Tarihi).
                  </p>
                )}
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

      {activeSubItem === "flight-report" && <FlightReportPrintable data={flightData} />}
    </main>
  );
}
