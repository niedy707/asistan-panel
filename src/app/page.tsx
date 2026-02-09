"use client";

import React, { useState } from "react";
import { ArrowRight, FileText, ClipboardList, Pill, ChevronLeft } from "lucide-react";

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
  }
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<typeof CATEGORIES[0] | null>(null);

  return (
    <main className="min-h-screen p-4 md:p-8 flex flex-col items-center max-w-[430px] mx-auto bg-slate-950 text-slate-100">
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
            onClick={() => setSelectedCategory(null)}
            className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Geri Dön
          </button>

          <h2 className="text-2xl font-bold mb-6 text-white border-l-4 border-emerald-500 pl-4">
            {selectedCategory.title}
          </h2>

          <div className="space-y-3">
            {selectedCategory.docs.length > 0 ? (
              selectedCategory.docs.map((doc, idx) => (
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
        </div>
      )}

      <footer className="mt-auto py-8 text-center text-slate-600 text-sm">
        &copy; {new Date().getFullYear()} Dr. İbrahim YAĞCI
      </footer>
    </main>
  );
}
