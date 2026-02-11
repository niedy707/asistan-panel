"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { ArrowRight, FileText, ClipboardList, Pill, ChevronLeft, BarChart3, Plane, Printer, FileEdit, Languages, ExternalLink, Search, User, Home as HomeIcon, Calendar, AlertTriangle, X, Globe, MessageCircle, Mail, Folder } from "lucide-react";
import { postOpContent } from "@/lib/postOpContent";

/** 
 * modern-ucus-raporu component for printing and live preview
 * ENFORCES A4 FORMAT
 */
const FlightReportPrintable = ({ data, isPreview = false }: { data: { name: string, surgeryDate: string, flightDate: string }, isPreview?: boolean }) => {
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
    ? "w-full mt-8 p-8 bg-white text-slate-900 rounded-3xl shadow-2xl border border-white/20 font-sans aspect-[210/297] mb-12"
    : "hidden print:block bg-white text-black font-sans leading-relaxed w-[210mm] h-[297mm] p-[10mm] mx-auto";

  return (
    <div className={containerClasses} id={isPreview ? "preview-report" : "printable-report"}>
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

        <div className="flex justify-between items-start border-b-2 border-slate-900 pb-4 mb-6">
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
            <p className="text-[9pt] font-black text-slate-400 uppercase tracking-widest">Rapor Tarihi / Report Date</p>
            <p className="text-lg font-bold text-slate-900">{new Date().toLocaleDateString('tr-TR')}</p>
          </div>
        </div>



        <div className="text-center mb-8">
          <h2 className="text-2xl font-black uppercase text-slate-900 tracking-tight">
            UÇUŞA UYGUNLUK RAPORU
          </h2>
          <div className="flex items-center justify-center gap-4 my-1">
            <div className="h-[1pt] bg-slate-200 flex-1"></div>
            <h2 className="text-lg font-bold uppercase text-slate-500 italic">
              AIRWORTHINESS REPORT
            </h2>
            <div className="h-[1pt] bg-slate-200 flex-1"></div>
          </div>
        </div>

        <div className="flex-1 space-y-6">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 relative">
            <div className="absolute -top-3 left-6 bg-slate-900 text-white text-[8pt] font-black px-4 py-1 rounded-full uppercase tracking-widest">
              HASTA BİLGİLERİ / PATIENT INFO
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-end gap-3 pb-2 border-b border-slate-300">
                <span className="text-slate-500 font-bold uppercase text-xs w-32 shrink-0">İsim / Name:</span>
                <span className="text-xl font-black text-slate-900 tracking-tight">{data.name || "................................................"}</span>
              </div>
              <div className="flex items-end gap-3 pb-2 border-b border-slate-300">
                <span className="text-slate-500 font-bold uppercase text-xs w-32 shrink-0">Yapılan ameliyat:</span>
                <span className="text-lg font-black text-slate-900">Rinoplasti <span className="text-slate-400 font-bold ml-2 italic">/ Surgery performed: Rhinoplasty</span></span>
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

          <div className="space-y-6 px-4">
            <div className="relative">
              <p className="text-[13pt] leading-relaxed text-slate-900 text-justify">
                Üstte ismi ve hastaya uygulanan tedavi bilgileri bulunan hastanın yapılan kontrol muayenesi ve tıbbi değerlendirmesi sonucunda, uçak ile seyahat etmesine engel olabilecek tıbbi bir durum yoktur. Hasta uçuş yapabilir, oturarak yolculuk yapabilir.
              </p>
              <p className="text-[11pt] leading-relaxed text-slate-500 italic mt-4 text-justify border-l-4 border-slate-200 pl-6">
                Following the control examination and medical evaluation of <strong>{data.name || "..................."}</strong>, no medical contraindications have been found to prevent air travel. The patient is cleared for flight and seated travel.
              </p>
            </div>

            <div className="mt-8 p-8 bg-white rounded-3xl text-slate-900 shadow-2xl border border-slate-100">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-blue-100 p-3 rounded-2xl">
                  <Plane className="w-6 h-6 text-blue-800" />
                </div>
                <h4 className="text-xl font-black uppercase tracking-wider text-blue-900">TIBBİ ONAY / MEDICAL CLEARANCE</h4>
              </div>
              <p className="text-[16pt] font-bold leading-snug text-slate-900">
                <span className="opacity-60 font-medium text-lg">Hastanın</span> <strong>{formatDate(data.flightDate)}</strong> <span className="opacity-60 font-medium text-sm">tarihi itibarı ile uçuş yapmasında sakınca yoktur.</span>
              </p>
              <div className="h-px bg-slate-100 my-4"></div>
              <p className="text-[12pt] italic text-slate-500">
                As of <strong>{formatDate(data.flightDate)}</strong>, the patient is medically cleared for flight. No pathological findings were detected.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-auto">
          {/* Signature Section */}
          <div className="flex justify-between items-end mb-8 px-4">
            <div className="space-y-1">
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
          <div className="flex items-center justify-center gap-4 my-1">
            <div className="h-[1pt] bg-slate-200 flex-1"></div>
          </div>
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
                <div className="z-10 relative">
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

const PostOpInfoPrintable = ({ lang, isPreview = false }: { lang: string, isPreview?: boolean }) => {
  const customLangs: Record<string, string> = {
    tr: "TÜRKÇE", en: "İNGİLİZCE", de: "ALMANCA", es: "İSPANYOLCA",
    ru: "RUSÇA", fr: "FRANSIZCA", it: "İTALYANCA", ro: "ROMENCE",
    md: "MOLDOVCA", hu: "MACARCA", pl: "LEHÇE", ar: "ARAPÇA"
  };

  const data = postOpContent[lang];
  if (!data) return <div>Content not found for {lang}</div>;

  const containerClasses = "w-full bg-white text-slate-900 font-sans leading-relaxed h-full mx-auto";

  return (
    <div className={containerClasses} id={isPreview ? "preview-postop" : "printable-postop"}>
      <style jsx global>{`
        @media print {
          @page { margin: 10mm; size: A4; }
          body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
          .no-print { display: none !important; }
        }
        .modern-green-box {
          background-color: #f0fdf4;
          border: 1px solid #bbf7d0;
          border-radius: 0.75rem;
          padding: 1.5rem;
          margin: 1.5rem 0;
          break-inside: avoid;
          page-break-inside: avoid;
          break-before: column;
          -webkit-column-break-before: always;
        }
        .modern-green-box ul {
          list-style-type: none;
          padding: 0;
          margin: 0;
        }
        .modern-green-box li {
          margin-bottom: 1rem;
          padding-left: 1rem;
          border-left: 3px solid #22c55e;
        }
        .drug-tag {
          display: inline-block;
          background-color: #e0f2fe;
          color: #0369a1;
          padding: 0.1rem 0.4rem;
          border-radius: 0.3rem;
          font-weight: 600;
          font-size: 0.9em;
          margin-left: 0.5rem;
        }
      `}</style>

      <div className="p-8 md:p-12 max-w-[210mm] mx-auto bg-white min-h-screen">
        <div className="flex items-center justify-between border-b-2 border-slate-100 pb-6 mb-8">
          <div className="flex items-center gap-4 text-left">
            <img src="/rinoplasti_logo.png" alt="Logo" className="w-20 h-20 object-contain" />
            <div>
              <div className="text-blue-900 font-black text-2xl">Op. Dr. İbrahim YAĞCI</div>
              <div className="text-sm text-slate-500 font-bold uppercase tracking-widest">Rinoplasti & KBB</div>
            </div>
          </div>
          <div>
            <span className="inline-block px-3 py-1 bg-slate-100 rounded-full text-slate-600 text-sm font-bold uppercase tracking-wider">
              {customLangs[lang] || lang.toUpperCase()}
            </span>
          </div>
        </div>

        <div className="columns-1 md:columns-2 print:columns-2 gap-8 space-y-0 block">
          {data.content.map((section, idx) => (
            <div key={idx} className="mb-6 break-inside-avoid page-break-inside-avoid inline-block w-full">
              {section.title && !section.title.includes("9.") && (
                <h2 className="text-xl font-bold text-slate-800 border-l-4 border-blue-500 pl-4 mb-2">
                  <span dangerouslySetInnerHTML={{ __html: section.title }} />
                </h2>
              )}

              {section.text && (
                <div
                  className="prose prose-slate max-w-none text-justify text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: section.text }}
                />
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-slate-100 flex justify-between items-center text-xs text-slate-400 font-medium">
          <div>
            <p>Rhinoplasty Clinic</p>
            <p>İstanbul, Türkiye</p>
          </div>
          <div>
            www.ibrahimyagci.com
          </div>
        </div>
      </div>
    </div>
  );
};

/** 
 * Passport/ID Renewal Medical Report component
 */
const IDReportPrintable = ({ data, isPreview = false }: { data: any, isPreview?: boolean }) => {
  const containerClasses = isPreview
    ? "w-full mt-8 p-12 bg-white text-slate-900 rounded-3xl shadow-2xl border border-white/20 font-sans aspect-[210/297] mb-12 overflow-y-auto"
    : "hidden print:block bg-white text-black font-sans leading-relaxed w-[210mm] h-[297mm] p-[20mm] mx-auto";

  const formatDateTR = (dateStr: string) => {
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

  return (
    <div className={containerClasses} id={isPreview ? "preview-id-report" : "printable-id-report"}>
      <div className="h-full flex flex-col">
        <div className="space-y-4 mb-4">
          <p className="font-bold text-base">Hasta Adı Soyadı: <span className="underline decoration-slate-300 underline-offset-4">{data.name || "..................."}</span></p>
          <p className="font-bold text-base">Ameliyat Tarihi: <span className="underline decoration-slate-300 underline-offset-4">{formatDateTR(data.surgeryDate)}</span></p>
          <p className="font-bold text-base">Tedavi Gördüğü Hastane: <span className="underline decoration-slate-300 underline-offset-4">BHT Klinik Temas Hastanesi | Küçükçekmece / İSTANBUL</span></p>
        </div>

        <div className="space-y-6 flex-1 text-[13px] leading-relaxed">
          <div>
            <p className="font-bold mb-1">Tanı:</p>
            <p className="text-justify">{data.diagnosis || "..................."}</p>
          </div>

          <div>
            <p className="font-bold mb-1">Uygulanan Ameliyat:</p>
            <p className="text-justify">{data.surgeryPerformed || "..................."}</p>
          </div>

          <div>
            <p className="font-bold mb-1 underline underline-offset-4">Şikayet:</p>
            <p className="text-justify">{data.complaint || "..................."}</p>
          </div>

          <div>
            <p className="font-bold mb-1 underline underline-offset-4">Hikaye:</p>
            <p className="text-justify">{data.history || "..................."}</p>
          </div>

          <div>
            <p className="font-bold mb-1 underline underline-offset-4">Muayene:</p>
            <p className="text-justify">{data.examination || "..................."}</p>
          </div>

          <div>
            <p className="font-bold mb-1 underline underline-offset-4">Takip:</p>
            <p className="text-justify">{data.followUp || "..................."}</p>
          </div>

          <div>
            <p className="font-bold mb-2 underline underline-offset-4">Ameliyat notu:</p>
            <p className="text-justify text-[11px] leading-tight opacity-90">{data.surgeryNote || "..................."}</p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-200">
          <p className="text-[12px] leading-snug">
            Bu belge hasta talebi ile, <strong>Nüfus Müdürlüğü, Kaymakamlık</strong> gibi devlet kurumlarına ibraz edilmesi amacı ile, kimlik ya da ehliyet yenilenmesi için hazırlanmıştır.
            Hastaya yapılan cerrahi işlem ile burun şeklinde değişiklik oluşmuştur. İlgili kuruma arz ederiz.
          </p>
        </div>

        <div className="mt-12 flex justify-between items-end">
          <div className="text-left font-bold text-base bg-slate-100 px-4 py-2 rounded-lg">
            {data.reportDate || new Date().toLocaleDateString('tr-TR')}
          </div>
          <div className="text-right">
            <p className="font-black text-lg">Op. Dr. İbrahim YAĞCI</p>
            <p className="text-[10pt] font-bold text-slate-500 uppercase tracking-widest">KBB ve B.B.C Uzmanı</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const LANGUAGES = [
  { code: 'tr', name: 'TÜRKÇE', flag: '🇹🇷' },
  { code: 'en', name: 'İNGİLİZCE', flag: '🇬🇧' },
  { code: 'de', name: 'ALMANCA', flag: '🇩🇪' },
  { code: 'es', name: 'İSPANYOLCA', flag: '🇪🇸' },
  { code: 'ru', name: 'RUSÇA', flag: '🇷🇺' },
  { code: 'fr', name: 'FRANSIZCA', flag: '🇫🇷' },
  { code: 'it', name: 'İTALYANCA', flag: '🇮🇹' },
  { code: 'ro', name: 'ROMENCE', flag: '🇷🇴' },
  { code: 'pl', name: 'LEHÇE', flag: '🇵🇱' },
  { code: 'ar', name: 'ARAPÇA', flag: '🇸🇦' },
  { code: 'az', name: 'AZERİCE', flag: '🇦🇿' },
];

const CATEGORIES = [
  {
    id: "bilgilendirme",
    title: "Hasta Bilgilendirme",
    icon: <FileText className="w-8 h-8" />,
    color: "bg-emerald-700/80",
    docs: []
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
    color: "bg-rose-700/80",
    docs: [],
    subItems: [
      { id: "prescription-builder", title: "Reçete Oluşturucu (Beta)", icon: <FileEdit className="w-6 h-6" />, path: "/recete-olustur" }
    ]
  },
  {
    id: "formlar",
    title: "Formlar",
    icon: <FileEdit className="w-8 h-8" />,
    color: "bg-amber-700/80",
    docs: [],
    subItems: [
      {
        id: "html-master",
        title: "HTML master sayfalar",
        icon: (
          <div className="relative">
            <Folder className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 flex items-center justify-center w-3 h-3 bg-red-500 rounded-full text-white text-[10px] font-black">!</span>
          </div>
        ),
        subItems: [
          { id: "html-forms", title: "po kontrol formu (çıktı alma)", icon: <FileEdit className="w-6 h-6" />, path: "/formlar/html" },
          { id: "bos-recete", title: "Boş reçete", icon: <FileEdit className="w-6 h-6" />, path: "/formlar/bos-recete" }
        ]
      }
    ]
  },
  {
    id: "raporlar",
    title: "Raporlar",
    icon: (
      <div className="flex items-center gap-1">
        <Plane className="w-5 h-5" />
        <User className="w-5 h-5" />
      </div>
    ),
    color: "bg-blue-700/80",
    subItems: [
      { id: "flight-report", title: "Uçuş Raporu", icon: <Plane className="w-6 h-6" /> },
      { id: "id-report", title: "Kimlik / Pasaport Yenileme Raporu", icon: <FileEdit className="w-6 h-6" /> },
      { id: "general-report", title: "Genel Rapor / Yazı", icon: <FileEdit className="w-6 h-6" /> }
    ]
  },
  {
    id: "post_op_forms",
    title: "Ameliyat Sonrası Bilgilendirme Formları",
    icon: <Globe className="w-8 h-8" />,
    color: "bg-violet-700/80",
    // No static items, dynamically rendered
  }
];

const PASSPORT_REPORT_TEMPLATE = {
  diagnosis: "J34.2, J34.4 Nazal Septal Deviasyon + Nazal Konka Hipertrofisi",
  surgeryPerformed: "Septorinoplasti + Konka redüksyonu",
  complaint: "Burun tıkanıklığı ve burun şekil bozukluğu",
  history: "Bu sebeple başvuran hastada saptanan septum deviasyonu ve hasta talepleri nedenli, opere edilmek üzere yatış yapıldı.",
  examination: "Septum deviye, nazal valv yetmezliği mevcut. tip pitotik hump+",
  followUp: "Septorinoplasti operasyonu yapılan ve takibinde sorun olmayan hasta 1 hafta sonra kontrole gelmek üzere önerilerle taburcu edildi.",
  surgeryNote: "GAA ETentübasyon sonrası infiltrasyon anestezisini takiben operasyona başlandı. Goodmanın ters W insizyonu sonrası cilt flebi naziona kadar eleve edildi. ASAdan septuma ulaşılarak her iki tarafta mukoprikondrial flep eleve edildi. Dorsum redükte edildi, törpülenerek düzensizlikler giderildi. Sefalik rezeksiyon sonrası Tip definisyonu yapıldı. Deviye septum ve nazal taban çıkartıldı, septoplasti yapıldı. Median-oblik ve internal lateral osteotomiler yapıldı. Orta çatı onarıldı. Tip eşitleme suturu sonrası kolumellar strut yerleştirildi. İnsizyon suture edildi. Bilateral Doyle tampon testespit edildi. Stripleme ve atel uygulanarak operasyona son verildi."
};

const toTitleCaseTr = (str: string) => {
  return str.toLocaleLowerCase('tr-TR').split(' ').map(word => {
    return word.charAt(0).toLocaleUpperCase('tr-TR') + word.slice(1);
  }).join(' ');
};

export default function Home() {
  /* State */
  const [selectedCategory, setSelectedCategory] = useState<any | null>(null);
  const [activeSubItem, setActiveSubItem] = useState<string | null>(null);
  const [selectedPostOpLang, setSelectedPostOpLang] = useState<string | null>(null); // New State for Post Op Language
  const [hoveredDoc, setHoveredDoc] = useState<string | null>(null);


  // Flight Report State
  const [flightData, setFlightData] = useState({ name: "", surgeryDate: "", flightDate: "" });
  const [canFlyDays, setCanFlyDays] = useState<string>("");

  // ID/Passport Report State
  const [idReportData, setIdReportData] = useState({
    name: "",
    surgeryDate: "",
    diagnosis: PASSPORT_REPORT_TEMPLATE.diagnosis,
    surgeryPerformed: PASSPORT_REPORT_TEMPLATE.surgeryPerformed,
    complaint: PASSPORT_REPORT_TEMPLATE.complaint,
    history: PASSPORT_REPORT_TEMPLATE.history,
    examination: PASSPORT_REPORT_TEMPLATE.examination,
    followUp: PASSPORT_REPORT_TEMPLATE.followUp,
    surgeryNote: PASSPORT_REPORT_TEMPLATE.surgeryNote,
    reportDate: new Date().toLocaleDateString('tr-TR')
  });

  // General Report State
  const [generalReportData, setGeneralReportData] = useState({
    name: "",
    date: new Date().toLocaleDateString('tr-TR'),
    title: "TIBBİ RAPOR / MEDICAL REPORT",
    content: ""
  });


  // Patient Search State
  const [searchTerm, setSearchTerm] = useState("");
  const [patients, setPatients] = useState<any[]>([]);
  const [filteredPatients, setFilteredPatients] = useState<any[]>([]);
  const [showSearch, setShowSearch] = useState(false);
  const [dynamicDocs, setDynamicDocs] = useState<Record<string, any[]>>({});

  // Fetch dynamic documents
  useEffect(() => {
    fetch('/api/documents')
      .then(res => res.json())
      .then(data => {
        if (data && !data.error) {
          setDynamicDocs(data);
        }
      })
      .catch(err => console.error("Failed to fetch dynamic docs:", err));
  }, []);

  // Merge hardcoded categories with dynamic documents
  const displayCategories = useMemo(() => {
    return CATEGORIES.map(cat => {
      const dynamicItems = dynamicDocs[cat.id] || [];
      const baseDocs = cat.docs || [];

      // Deduplicate by name
      const allDocs = [...baseDocs, ...dynamicItems];
      const seen = new Set();
      const uniqueDocs = allDocs.filter(doc => {
        const isDuplicate = seen.has(doc.name);
        seen.add(doc.name);
        return !isDuplicate;
      });

      return {
        ...cat,
        docs: uniqueDocs
      };
    });
  }, [dynamicDocs]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoadingPatients, setIsLoadingPatients] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Future Patient Logic
  const [selectedFuturePatient, setSelectedFuturePatient] = useState<any | null>(null);
  const firstTodayPatientRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Click outside listener for dropdown
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
        if (!searchTerm) setShowSearch(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchTerm]);

  useEffect(() => {
    // Initial fetch of patients from local API (synced)
    if ((activeSubItem === "flight-report" || activeSubItem === "id-report") && patients.length === 0) {
      setIsLoadingPatients(true);
      fetch("/api/patients")
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) {
            setPatients(data);
          }
          setIsLoadingPatients(false);
        })
        .catch(err => {
          console.error("Fetch patients failed:", err);
          setIsLoadingPatients(false);
        });
    }
  }, [activeSubItem, patients.length]);

  useEffect(() => {
    // Search & Filter Logic
    if (activeSubItem === "flight-report" || activeSubItem === "id-report") {
      let results = [...patients]; // Clone to sort

      // 1. Filter by Context FIRST (Flight Report = Last 30 Days + Next 7 Days)
      if (activeSubItem === "flight-report") {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const sevenDaysLater = new Date();
        sevenDaysLater.setDate(sevenDaysLater.getDate() + 7);

        // Include patients from 30 days ago to 7 days in the future
        results = results.filter(p => {
          const surgeryDate = new Date(p.surgeryDate);
          return surgeryDate >= thirtyDaysAgo && surgeryDate <= sevenDaysLater;
        });
      }

      // Get today's date in YYYY-MM-DD format
      const today = new Date().toISOString().split('T')[0];

      // Categorize patients into 3 groups
      const todayPatients = results.filter(p => p.surgeryDate === today);
      const pastPatients = results.filter(p => p.surgeryDate < today);
      const futurePatients = results.filter(p => p.surgeryDate > today);

      // Sort past patients descending (most recent first)
      pastPatients.sort((a, b) => b.surgeryDate.localeCompare(a.surgeryDate));

      // Sort future patients DESCENDING (farthest first, so they appear at top)
      futurePatients.sort((a, b) => b.surgeryDate.localeCompare(a.surgeryDate));

      // Combine: Future (reversed) → Today → Past
      // This way: scroll UP = future, scroll DOWN = past, middle = today
      results = [...futurePatients, ...todayPatients, ...pastPatients];

      // 2. Filter by Search Term (if exists) - AFTER sorting
      if (searchTerm.length >= 2) {
        const query = searchTerm.toLocaleLowerCase('tr-TR');
        results = results.filter(p => p.name.toLocaleLowerCase('tr-TR').includes(query));
      }

      setFilteredPatients(results);

      // Show if searching OR dropdown is toggled
      if ((searchTerm.length >= 2) || showDropdown) {
        setShowSearch(results.length > 0);

        // Auto-scroll to first today's patient (middle of list)
        setTimeout(() => {
          if (firstTodayPatientRef.current) {
            firstTodayPatientRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 100);
      } else {
        setShowSearch(false);
      }
    } else {
      setShowSearch(false);
    }
  }, [searchTerm, activeSubItem, patients, showDropdown]);

  // Automated flight date calculation
  useEffect(() => {
    if (flightData.surgeryDate && canFlyDays) {
      const date = new Date(flightData.surgeryDate);
      date.setDate(date.getDate() + parseInt(canFlyDays));
      const formattedDate = date.toISOString().split('T')[0];
      setFlightData(prev => ({ ...prev, flightDate: formattedDate }));
    }
  }, [flightData.surgeryDate, canFlyDays]);

  const isFlightDataValid = flightData.name.length > 2 && flightData.surgeryDate && flightData.flightDate;
  const isIdDataValid = idReportData.name.length > 2 && idReportData.surgeryDate;

  const handlePrint = () => {
    window.print();
  };

  const getActiveTitle = () => {
    if (activeSubItem === "flight-report") return "Uçuş Raporu";
    if (activeSubItem === "id-report") return "Kimlik / Pasaport Yenileme Raporu";
    return selectedCategory?.title || "Asistan Paneli";
  };

  return (
    <main className="min-h-screen p-4 md:p-8 flex flex-col items-center w-full max-w-7xl mx-auto bg-slate-950 text-slate-100 print:bg-white print:p-0 print:m-0 print:max-w-none">
      <div className="print:hidden w-full flex flex-col items-center max-w-2xl px-4">

        {/* Header / Navigation Check: Hide header if in PostOp reading mode */}
        {!selectedPostOpLang && (
          <header className="w-full flex items-center justify-center gap-6 mb-12 mt-8">
            <img src="/logo-header.png?v=3" alt="Rinoplasti Logo" className="w-24 h-24 object-contain drop-shadow-2xl hover:scale-105 transition-transform" />
            <div className="h-20 w-[2px] bg-slate-700/50 rounded-full hidden md:block"></div>
            <div className="text-center md:text-right">
              <h1
                onClick={() => { setSelectedCategory(null); setActiveSubItem(null); setSelectedPostOpLang(null); }}
                className="text-3xl md:text-5xl font-black tracking-tighter text-white cursor-pointer hover:opacity-80 transition-opacity leading-tight"
              >
                Op. Dr. İbrahim YAĞCI
              </h1>
              <p className="text-slate-400 font-medium tracking-wide text-sm md:text-base">Hekim Asistanı Paneli</p>
            </div>
            {/* Right side spacer to balance layout if needed, or keep empty/hidden */}
            <div className="w-24 hidden md:block"></div>
          </header>
        )}

        {!selectedCategory ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full animate-in fade-in zoom-in duration-500">
            {displayCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat)}
                className={`${cat.color} flex items-center justify-between w-full p-6 text-xl font-bold transition-all rounded-[2rem] border border-white/10 hover:scale-[1.02] active:scale-[0.98] shadow-2xl group`}
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
            <div className="flex items-center gap-3 mb-6">


              <button
                onClick={() => {
                  if (selectedPostOpLang) setSelectedPostOpLang(null);
                  else if (activeSubItem) setActiveSubItem(null);
                  else setSelectedCategory(null);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-slate-900/50 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-all border border-slate-800"
              >
                <ChevronLeft className="w-5 h-5" />
                Geri
              </button>

              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setActiveSubItem(null);
                  setSelectedPostOpLang(null);
                }}
                className="flex items-center gap-2 px-5 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 hover:text-blue-300 rounded-full font-bold transition-all border border-blue-500/20 shadow-lg"
              >
                <HomeIcon className="w-4 h-4" />
                Ana Sayfa
              </button>
            </div>

            {!selectedPostOpLang && (
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4 w-full">
                <h2 className="text-3xl font-black text-white border-l-8 border-emerald-500 pl-6 uppercase tracking-tight">
                  {getActiveTitle()}
                </h2>

                {selectedCategory.id === "onamlar" && (
                  <div className="flex flex-col gap-2">
                    {/* Package 1: Combined Forms with Language Selection */}
                    <div
                      className="relative"
                      onMouseEnter={() => setHoveredDoc('paket-1')}
                      onMouseLeave={() => setHoveredDoc(null)}
                    >
                      <button
                        onClick={() => {
                          // Open all 3 PDFs in Turkish
                          window.open('/documents/onamlar/onam | Anestezi TR.pdf', '_blank');
                          setTimeout(() => window.open('/documents/onamlar/onam | Kan Transfüzyonu TR.pdf', '_blank'), 300);
                          setTimeout(() => window.open('/documents/onamlar/onam | Görsel içerik kaydetme ve işleme onam formu.pdf', '_blank'), 600);
                        }}
                        className={`block w-full p-3 bg-emerald-600 border transition-all duration-300 rounded-xl ${hoveredDoc === 'paket-1' ? 'border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]' : 'border-emerald-700'}`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex flex-col">
                            <span className="text-white font-bold text-sm">Paket-1</span>
                            <span className="text-emerald-100 text-[10px] font-medium">Anestezi + Kan + Görsel</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[9pt] font-black uppercase tracking-widest text-emerald-200">DİL SEÇİN</span>
                            <Languages className="w-4 h-4 text-emerald-200 animate-pulse" />
                          </div>
                        </div>
                      </button>

                      <div className={`grid grid-cols-2 gap-2 mt-2 transition-all duration-300 ${hoveredDoc === 'paket-1' ? 'opacity-100 translate-y-0 max-h-20' : 'opacity-0 -translate-y-2 max-h-0 pointer-events-none overflow-hidden'}`}>
                        <button
                          onClick={() => {
                            // Open all 3 PDFs in Turkish
                            window.open('/documents/onamlar/onam | Anestezi TR.pdf', '_blank');
                            setTimeout(() => window.open('/documents/onamlar/onam | Kan Transfüzyonu TR.pdf', '_blank'), 300);
                            setTimeout(() => window.open('/documents/onamlar/onam | Görsel içerik kaydetme ve işleme onam formu.pdf', '_blank'), 600);
                          }}
                          className="p-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg flex items-center justify-between transition-colors text-xs font-bold group/lang"
                        >
                          <span className="flex items-center gap-1.5">
                            <span>🇹🇷</span>
                            Türkçe
                          </span>
                          <Printer className="w-3 h-3 opacity-50 group-hover/lang:opacity-100" />
                        </button>
                        <button
                          onClick={() => {
                            // Open all 3 PDFs in English
                            window.open('/documents/onamlar/onam | Anestezi EN.pdf', '_blank');
                            setTimeout(() => window.open('/documents/onamlar/onam | Kan Transfüzyonu EN.pdf', '_blank'), 300);
                            setTimeout(() => window.open('/documents/onamlar/onam | Görsel içerik kaydetme ve işleme onam formu.pdf', '_blank'), 600);
                          }}
                          className="p-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg flex items-center justify-between transition-colors text-xs font-bold group/lang"
                        >
                          <span className="flex items-center gap-1.5">
                            <span>🇬🇧</span>
                            İngilizce
                          </span>
                          <Printer className="w-3 h-3 opacity-50 group-hover/lang:opacity-100" />
                        </button>
                      </div>
                    </div>

                    {/* Package 2: Rino + Kosta with Language Selection */}
                    <div
                      className="relative"
                      onMouseEnter={() => setHoveredDoc('paket-2')}
                      onMouseLeave={() => setHoveredDoc(null)}
                    >
                      <button
                        onClick={() => {
                          // Open Rino + Kosta PDFs in Turkish
                          window.open('/documents/onamlar/onam | Rinoplasti TR.pdf', '_blank');
                          setTimeout(() => window.open('/documents/onamlar/onam | Kosta kartilaj graft TR.pdf', '_blank'), 300);
                        }}
                        className={`block w-full p-3 bg-purple-600 border transition-all duration-300 rounded-xl ${hoveredDoc === 'paket-2' ? 'border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.3)]' : 'border-purple-700'}`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex flex-col">
                            <span className="text-white font-bold text-sm">Paket-2</span>
                            <span className="text-purple-100 text-[10px] font-medium">Rinoplasti + Kosta</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[9pt] font-black uppercase tracking-widest text-purple-200">DİL SEÇİN</span>
                            <Languages className="w-4 h-4 text-purple-200 animate-pulse" />
                          </div>
                        </div>
                      </button>

                      <div className={`grid grid-cols-2 gap-2 mt-2 transition-all duration-300 ${hoveredDoc === 'paket-2' ? 'opacity-100 translate-y-0 max-h-20' : 'opacity-0 -translate-y-2 max-h-0 pointer-events-none overflow-hidden'}`}>
                        <button
                          onClick={() => {
                            // Open Rino + Kosta PDFs in Turkish
                            window.open('/documents/onamlar/onam | Rinoplasti TR.pdf', '_blank');
                            setTimeout(() => window.open('/documents/onamlar/onam | Kosta kartilaj graft TR.pdf', '_blank'), 300);
                          }}
                          className="p-2 bg-purple-700 hover:bg-purple-600 text-white rounded-lg flex items-center justify-between transition-colors text-xs font-bold group/lang"
                        >
                          <span className="flex items-center gap-1.5">
                            <span>🇹🇷</span>
                            Türkçe
                          </span>
                          <Printer className="w-3 h-3 opacity-50 group-hover/lang:opacity-100" />
                        </button>
                        <button
                          onClick={() => {
                            // Open Rino + Kosta PDFs in English
                            window.open('/documents/onamlar/onam | Rinoplasti EN.pdf', '_blank');
                            setTimeout(() => window.open('/documents/onamlar/onam | Kosta kartilaj graft EN.pdf', '_blank'), 300);
                          }}
                          className="p-2 bg-purple-700 hover:bg-purple-600 text-white rounded-lg flex items-center justify-between transition-colors text-xs font-bold group/lang"
                        >
                          <span className="flex items-center gap-1.5">
                            <span>🇬🇧</span>
                            İngilizce
                          </span>
                          <Printer className="w-3 h-3 opacity-50 group-hover/lang:opacity-100" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {(selectedCategory.id === "raporlar" || selectedCategory.id === "formlar") && !activeSubItem ? (
              <div className="space-y-4">
                {selectedCategory.docs?.map((doc: any, i: number) => (
                  <div
                    key={`doc-${i}`}
                    className="relative"
                    onMouseEnter={() => doc.langs && setHoveredDoc(doc.name)}
                    onMouseLeave={() => setHoveredDoc(null)}
                  >
                    {doc.langs ? (
                      <div className="flex flex-col gap-2">
                        <div
                          onClick={() => {
                            const trLang = doc.langs.find((l: any) => l.label === 'Türkçe');
                            if (trLang) window.open(trLang.path, '_blank');
                          }}
                          className={`w-full p-6 bg-slate-900 border transition-all duration-300 rounded-3xl flex items-center justify-between cursor-pointer ${hoveredDoc === doc.name ? 'border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.2)]' : 'border-slate-800'}`}
                        >
                          <span className="flex items-center gap-4 text-xl font-bold">
                            <Printer className="w-6 h-6 text-emerald-500" />
                            {doc.name}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-[9pt] font-black uppercase tracking-widest text-slate-500">DİL SEÇİN</span>
                            <Languages className="w-5 h-5 text-emerald-500 animate-pulse" />
                          </div>
                        </div>

                        <div className={`grid grid-cols-${doc.langs.length > 2 ? '3' : '2'} gap-2 transition-all duration-300 ${hoveredDoc === doc.name ? 'opacity-100 translate-y-0 max-h-20' : 'opacity-0 -translate-y-2 max-h-0 pointer-events-none overflow-hidden'}`}>
                          {doc.langs.map((l: any, i: number) => (
                            <button
                              key={i}
                              onClick={() => window.open(l.path, '_blank', 'noopener,noreferrer')}
                              className="p-3 bg-slate-800/80 hover:bg-emerald-600 text-slate-300 hover:text-white rounded-xl flex items-center justify-between transition-colors text-sm font-bold group/lang w-full"
                            >
                              <span className="flex items-center gap-2">
                                {l.flag && <span>{l.flag}</span>}
                                {l.label}
                              </span>
                              <ExternalLink className="w-3 h-3 opacity-50 group-hover/lang:opacity-100" />
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => window.open(doc.path, '_blank', 'noopener,noreferrer')}
                        className="w-full p-6 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-3xl flex items-center justify-between transition-all group shadow-lg"
                      >
                        <span className="flex items-center gap-4 text-xl font-bold">
                          <Printer className="w-6 h-6 text-emerald-500" />
                          {doc.name}
                        </span>
                        <ExternalLink className="w-5 h-5 text-slate-600 group-hover:text-emerald-500 transition-colors" />
                      </button>
                    )}
                  </div>
                ))}

                {selectedCategory.subItems?.map((item: any) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      if (item.path) {
                        if (item.external) {
                          window.open(item.path, '_blank');
                        } else {
                          window.location.href = item.path;
                        }
                      } else {
                        setActiveSubItem(item.id);
                      }
                    }}
                    className="w-full p-6 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-3xl flex items-center justify-between transition-all group shadow-xl"
                  >
                    <span className="flex items-center gap-4 text-xl font-bold">
                      {item.icon}
                      {item.title}
                    </span>
                    <ArrowRight className="w-5 h-5 opacity-0 group-hover:translate-x-1 group-hover:opacity-100 transition-all text-blue-500" />
                  </button>
                ))}
              </div>
            ) : activeSubItem === "flight-report" ? (
              <div className="space-y-6">
                <div className="glass-card p-8 border-blue-500/30 space-y-6 shadow-2xl relative bg-slate-900/40 rounded-[2.5rem]">
                  <div className="space-y-6">
                    <div className="relative" ref={dropdownRef}>
                      <label className="block text-sm font-black text-slate-500 uppercase tracking-widest mb-2 ml-2">Hasta İsmi</label>
                      <div className="relative flex items-center">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 z-10" />
                        <input
                          type="text"
                          placeholder="Arama yapın..."
                          className="w-full bg-slate-950 border-2 border-slate-800 rounded-l-2xl rounded-r-none pl-12 pr-4 py-4 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-white text-lg font-medium"
                          value={searchTerm || flightData.name}
                          onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setFlightData({ ...flightData, name: e.target.value });
                            setShowDropdown(true);
                          }}
                          onFocus={() => setShowDropdown(true)}
                        />
                        <button
                          onClick={() => setShowDropdown(!showDropdown)}
                          className="bg-slate-800 border-2 border-l-0 border-slate-800 rounded-r-2xl px-4 py-4 h-full hover:bg-slate-700 transition-colors flex items-center justify-center group"
                        >
                          <ChevronLeft className={`w-6 h-6 text-slate-400 transition-transform duration-300 ${showDropdown ? '-rotate-90' : 'rotate-90'}`} />
                        </button>
                      </div>

                      {showSearch && (
                        <div className="absolute z-[100] mt-2 w-full bg-slate-900 border-2 border-slate-800 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 divide-y divide-slate-800 max-h-[300px] overflow-y-auto custom-scrollbar">
                          {filteredPatients.map((p, i) => (
                            <button
                              key={i}
                              ref={p.surgeryDate === new Date().toISOString().split('T')[0] && i === filteredPatients.findIndex(fp => fp.surgeryDate === new Date().toISOString().split('T')[0]) ? firstTodayPatientRef : null}
                              onClick={() => {
                                const formattedName = toTitleCaseTr(p.name);

                                // Check if patient's surgery is in the future
                                const today = new Date().toISOString().split('T')[0];
                                if (p.surgeryDate > today) {
                                  alert("⚠️ Dikkat, Bu hasta henüz ameliyat edilmemiştir!");
                                }

                                setFlightData({ ...flightData, name: formattedName, surgeryDate: p.surgeryDate });
                                setSearchTerm("");
                                setShowSearch(false);
                                setShowDropdown(false);
                              }}
                              className="w-full p-4 text-left hover:bg-slate-800 flex items-center justify-between transition-colors group"
                            >
                              <div className="flex items-center gap-3">
                                <User className="w-5 h-5 text-blue-400 group-hover:text-blue-300" />
                                <span className="text-slate-100 font-bold text-lg">{p.name}</span>
                                <span className="text-slate-500 font-bold text-sm ml-2 bg-slate-800/50 px-2 py-0.5 rounded-md group-hover:bg-slate-700/50 transition-colors">
                                  {p.surgeryDate.split('-').reverse().join('.')}
                                </span>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-black text-slate-500 uppercase tracking-widest mb-2 ml-2">Ameliyat Tarihi</label>
                        <input
                          type="date"
                          className={`w-full bg-slate-950 border-2 border-slate-800 rounded-2xl px-4 py-4 focus:border-blue-500 outline-none text-white font-bold transition-all ${flightData.surgeryDate ? "bg-emerald-500/5 border-emerald-500/40 text-emerald-400" : ""}`}
                          value={flightData.surgeryDate}
                          onChange={(e) => setFlightData({ ...flightData, surgeryDate: e.target.value })}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-black text-blue-500 uppercase tracking-widest mb-2 ml-2">Gün Seçiniz</label>
                        <select
                          className="w-full bg-slate-950 border-2 border-slate-800 rounded-2xl px-4 py-4 focus:border-blue-500 outline-none text-white font-bold cursor-pointer appearance-none text-lg"
                          value={canFlyDays}
                          onChange={(e) => setCanFlyDays(e.target.value)}
                        >
                          <option value="">... gün seçiniz</option>
                          {[1, 2, 3, 4, 5, 6, 7].map(d => (
                            <option key={d} value={d} className="bg-slate-950">{d} Gün</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-black text-slate-500 uppercase tracking-widest mb-2 ml-2">Uçuş Tarihi</label>
                        <input
                          type="date"
                          className={`w-full bg-slate-950 border-2 border-slate-800 rounded-2xl px-4 py-4 focus:border-blue-500 outline-none text-white font-bold transition-all ${flightData.flightDate ? "bg-emerald-500/5 border-emerald-500/40 text-emerald-400" : ""}`}
                          value={flightData.flightDate}
                          onChange={(e) => setFlightData({ ...flightData, flightDate: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    disabled={!isFlightDataValid}
                    onClick={handlePrint}
                    className={`w-full py-6 rounded-3xl flex items-center justify-center gap-3 font-black text-xl transition-all shadow-2xl ${isFlightDataValid
                      ? "bg-blue-600 hover:bg-blue-500 text-white"
                      : "bg-slate-800 text-slate-600 cursor-not-allowed opacity-50"
                      }`}
                  >
                    <Printer className="w-7 h-7" />
                    Belgeyi Yazdır (A4)
                  </button>
                  {/* Preview Section */}
                  {isFlightDataValid && (
                    <div className="mt-8 animate-in fade-in slide-in-from-bottom-8 duration-500">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="h-px flex-1 bg-slate-800"></div>
                        <span className="text-slate-500 font-bold text-sm tracking-widest uppercase">Belge Önizleme (A4) / Document Preview</span>
                        <div className="h-px flex-1 bg-slate-800"></div>
                      </div>

                      <div className="relative mx-auto rounded-3xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-4 md:p-8">
                        <div className="scale-[0.5] md:scale-[0.6] origin-top h-[600px] overflow-hidden">
                          <FlightReportPrintable data={flightData} isPreview={true} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : activeSubItem === "id-report" ? (
              <div className="space-y-6">
                <div className="glass-card p-8 border-amber-500/30 space-y-6 shadow-2xl bg-slate-900/40 rounded-[2.5rem]">
                  <div className="relative" ref={dropdownRef}>
                    <label className="block text-sm font-black text-slate-500 uppercase tracking-widest mb-2 ml-2">Hasta Adı Soyadı</label>
                    <div className="relative flex items-center">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 z-10" />
                      <input
                        type="text"
                        placeholder="Arama yapın..."
                        className="w-full bg-slate-950 border-2 border-slate-800 rounded-l-2xl rounded-r-none pl-12 pr-4 py-4 focus:border-amber-500 outline-none transition-all text-white text-lg font-bold"
                        value={searchTerm || idReportData.name}
                        onChange={(e) => {
                          setSearchTerm(e.target.value);
                          setIdReportData({ ...idReportData, name: e.target.value });
                          setShowDropdown(true);
                        }}
                        onFocus={() => setShowDropdown(true)}
                      />
                      <button
                        onClick={() => setShowDropdown(!showDropdown)}
                        className="bg-slate-800 border-2 border-l-0 border-slate-800 rounded-r-2xl px-4 py-4 h-full hover:bg-slate-700 transition-colors flex items-center justify-center group"
                      >
                        <ChevronLeft className={`w-6 h-6 text-slate-400 transition-transform duration-300 ${showDropdown ? '-rotate-90' : 'rotate-90'}`} />
                      </button>
                    </div>

                    {showSearch && (
                      <div className="absolute z-[100] mt-2 w-full bg-slate-900 border-2 border-slate-800 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 divide-y divide-slate-800 max-h-[300px] overflow-y-auto custom-scrollbar">
                        {filteredPatients.map((p, i) => (
                          <button
                            key={i}
                            onClick={() => {
                              const formattedName = toTitleCaseTr(p.name);
                              setIdReportData({ ...idReportData, name: formattedName, surgeryDate: p.surgeryDate });
                              setSearchTerm("");
                              setShowSearch(false);
                              setShowDropdown(false);
                            }}
                            className="w-full p-4 text-left hover:bg-slate-800 flex items-center justify-between transition-colors group"
                          >
                            <div className="flex items-center gap-3">
                              <User className="w-5 h-5 text-amber-400 group-hover:text-amber-300" />
                              <span className="text-slate-100 font-bold text-lg">{p.name}</span>
                              <span className="text-slate-500 font-bold text-sm ml-2 bg-slate-800/50 px-2 py-0.5 rounded-md group-hover:bg-slate-700/50 transition-colors">
                                {p.surgeryDate.split('-').reverse().join('.')}
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-2">Ameliyat Tarihi</label>
                      <input
                        type="text"
                        placeholder="Örn: 11.11.2024"
                        className="w-full bg-slate-950 border-2 border-slate-800 rounded-xl px-4 py-3 focus:border-amber-500 outline-none text-white font-bold"
                        value={idReportData.surgeryDate}
                        onChange={(e) => setIdReportData({ ...idReportData, surgeryDate: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-2">Düzenleme Tarihi</label>
                      <input
                        type="text"
                        className="w-full bg-slate-950 border-2 border-slate-800 rounded-xl px-4 py-3 focus:border-amber-500 outline-none text-white font-bold"
                        value={idReportData.reportDate}
                        onChange={(e) => setIdReportData({ ...idReportData, reportDate: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-2">Tanı</label>
                      <textarea
                        className="w-full bg-slate-950 border-2 border-slate-800 rounded-xl px-4 py-3 focus:border-amber-500 outline-none text-white text-sm min-h-[60px]"
                        value={idReportData.diagnosis}
                        onChange={(e) => setIdReportData({ ...idReportData, diagnosis: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-2">Uygulanan Ameliyat</label>
                      <input
                        className="w-full bg-slate-950 border-2 border-slate-800 rounded-xl px-4 py-3 focus:border-amber-500 outline-none text-white text-sm"
                        value={idReportData.surgeryPerformed}
                        onChange={(e) => setIdReportData({ ...idReportData, surgeryPerformed: e.target.value })}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-2">Şikayet</label>
                        <textarea className="w-full bg-slate-950 border-2 border-slate-800 rounded-xl px-4 py-2 text-sm text-white h-20" value={idReportData.complaint} onChange={e => setIdReportData({ ...idReportData, complaint: e.target.value })} />
                      </div>
                      <div>
                        <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-2">Hikaye</label>
                        <textarea className="w-full bg-slate-950 border-2 border-slate-800 rounded-xl px-4 py-2 text-sm text-white h-20" value={idReportData.history} onChange={e => setIdReportData({ ...idReportData, history: e.target.value })} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-2">Ameliyat Notu</label>
                      <textarea
                        className="w-full bg-slate-950 border-2 border-slate-800 rounded-xl px-4 py-3 focus:border-amber-500 outline-none text-white text-xs min-h-[120px]"
                        value={idReportData.surgeryNote}
                        onChange={(e) => setIdReportData({ ...idReportData, surgeryNote: e.target.value })}
                      />
                    </div>
                  </div>

                  <button
                    disabled={!isIdDataValid}
                    onClick={handlePrint}
                    className={`w-full py-6 rounded-3xl flex items-center justify-center gap-3 font-black text-xl transition-all shadow-2xl ${isIdDataValid
                      ? "bg-amber-600 hover:bg-amber-500 text-white"
                      : "bg-slate-800 text-slate-600 cursor-not-allowed opacity-50"
                      }`}
                  >
                    <Printer className="w-7 h-7" />
                    Raporu Yazdır (A4)
                  </button>
                </div>

                {/* ID Report Preview */}
                {isIdDataValid && (
                  <div className="w-full pt-8">
                    <p className="text-xs font-black text-slate-500 uppercase tracking-[0.3em] mb-4 text-center">
                      BELGE ÖNİZLEME (A4) / DOCUMENT PREVIEW
                    </p>
                    <div className="max-w-[400px] mx-auto border-4 border-slate-900 rounded-[2rem] overflow-hidden shadow-2xl">
                      <IDReportPrintable data={idReportData} isPreview={true} />
                    </div>
                  </div>
                )}
              </div>
            ) : activeSubItem === "html-master" ? (
              <div className="space-y-4">
                {selectedCategory.subItems
                  ?.find((item: any) => item.id === "html-master")
                  ?.subItems?.map((nestedItem: any) => (
                    <button
                      key={nestedItem.id}
                      onClick={() => {
                        if (nestedItem.path) {
                          window.location.href = nestedItem.path;
                        }
                      }}
                      className="w-full p-6 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-3xl flex items-center justify-between transition-all group shadow-xl"
                    >
                      <span className="flex items-center gap-4 text-xl font-bold">
                        {nestedItem.icon}
                        {nestedItem.title}
                      </span>
                      <ArrowRight className="w-5 h-5 opacity-0 group-hover:translate-x-1 group-hover:opacity-100 transition-all text-emerald-500" />
                    </button>
                  ))}
              </div>
            ) : activeSubItem === "general-report" ? (
              <div className="space-y-6">
                <div className="glass-card p-8 border-violet-500/30 space-y-6 shadow-2xl relative bg-slate-900/40 rounded-[2.5rem] print:hidden">
                  {/* Reuse Patient Search Logic */}
                  <div className="relative" ref={dropdownRef}>
                    <label className="block text-sm font-black text-slate-500 uppercase tracking-widest mb-2 ml-2">Hasta Adı Soyadı</label>
                    {/* Search Input similar to Flight Report */}
                    <div className="relative flex items-center">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 z-10" />
                      <input
                        type="text"
                        placeholder="Arama yapın..."
                        className="w-full bg-slate-950 border-2 border-slate-800 rounded-l-2xl rounded-r-none pl-12 pr-4 py-4 focus:border-violet-500 outline-none transition-all text-white text-lg font-bold"
                        value={searchTerm || generalReportData.name}
                        onChange={(e) => {
                          setSearchTerm(e.target.value);
                          setGeneralReportData({ ...generalReportData, name: e.target.value });
                          setShowDropdown(true);
                        }}
                        onFocus={() => setShowDropdown(true)}
                      />
                      {/* Dropdown toggle button */}
                      <button
                        onClick={() => setShowDropdown(!showDropdown)}
                        className="bg-slate-800 border-2 border-l-0 border-slate-800 rounded-r-2xl px-4 py-4 h-full hover:bg-slate-700 transition-colors flex items-center justify-center group"
                      >
                        <ChevronLeft className={`w-6 h-6 text-slate-400 transition-transform duration-300 ${showDropdown ? '-rotate-90' : 'rotate-90'}`} />
                      </button>
                    </div>

                    {/* Dropdown List */}
                    {showSearch && (
                      <div className="absolute z-[100] mt-2 w-full bg-slate-900 border-2 border-slate-800 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 divide-y divide-slate-800 max-h-[300px] overflow-y-auto custom-scrollbar">
                        {filteredPatients.map((p, i) => (
                          <button
                            key={i}
                            onClick={() => {
                              const formattedName = toTitleCaseTr(p.name);
                              setGeneralReportData({ ...generalReportData, name: formattedName });
                              setSearchTerm("");
                              setShowSearch(false);
                              setShowDropdown(false);
                            }}
                            className="w-full p-4 text-left hover:bg-slate-800 flex items-center justify-between transition-colors group"
                          >
                            <div className="flex items-center gap-3">
                              <User className="w-5 h-5 text-violet-400 group-hover:text-violet-300" />
                              <span className="text-slate-100 font-bold text-lg">{p.name}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Date and Title Inputs */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-2">Tarih</label>
                      <input
                        type="text"
                        className="w-full bg-slate-950 border-2 border-slate-800 rounded-xl px-4 py-3 focus:border-violet-500 outline-none text-white font-bold"
                        value={generalReportData.date}
                        onChange={(e) => setGeneralReportData({ ...generalReportData, date: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-2">Rapor Başlığı</label>
                      <input
                        type="text"
                        placeholder="TIBBİ RAPOR / MEDICAL REPORT"
                        className="w-full bg-slate-950 border-2 border-slate-800 rounded-xl px-4 py-3 focus:border-violet-500 outline-none text-white font-bold"
                        value={generalReportData.title}
                        onChange={(e) => setGeneralReportData({ ...generalReportData, title: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Content Textarea */}
                  <div>
                    <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-2">Rapor İçeriği</label>
                    <textarea
                      className="w-full bg-slate-950 border-2 border-slate-800 rounded-xl px-4 py-3 focus:border-violet-500 outline-none text-white text-sm min-h-[300px] leading-relaxed"
                      placeholder="Rapor içeriğini buraya yazınız..."
                      value={generalReportData.content}
                      onChange={(e) => setGeneralReportData({ ...generalReportData, content: e.target.value })}
                    />
                  </div>

                  <button
                    onClick={handlePrint}
                    className="w-full py-6 rounded-3xl flex items-center justify-center gap-3 font-black text-xl transition-all shadow-2xl bg-violet-600 hover:bg-violet-500 text-white"
                  >
                    <Printer className="w-7 h-7" />
                    Raporu Yazdır (A4)
                  </button>
                </div>

                {/* Preview */}
                <div className="w-full pt-8">
                  <p className="text-xs font-black text-slate-500 uppercase tracking-[0.3em] mb-4 text-center">
                    BELGE ÖNİZLEME (A4) / DOCUMENT PREVIEW
                  </p>
                  <div className="max-w-[400px] mx-auto border-4 border-slate-900 rounded-[2rem] overflow-hidden shadow-2xl bg-slate-900/50 backdrop-blur-sm p-4">
                    <div className="scale-[0.5] origin-top h-[600px] overflow-hidden bg-white">
                      <GeneralReportPrintable data={generalReportData} isPreview={true} />
                    </div>
                  </div>
                </div>

                {/* Hidden Printable */}
                <GeneralReportPrintable data={generalReportData} />
              </div>
            ) : selectedCategory.id === "post_op_forms" ? (
              <div className="w-full relative animate-in fade-in zoom-in duration-300">
                {/* Controls - Top Right */}
                <div className="absolute -top-16 right-0 z-50 flex flex-col gap-3 items-end print:hidden pointer-events-none md:pointer-events-auto">
                  <div className="pointer-events-auto flex flex-col gap-2 items-end">
                    {/* Language Dropdown */}
                    <div className="relative w-56" ref={dropdownRef}>
                      <button
                        onClick={() => setShowDropdown(!showDropdown)}
                        className="w-full flex items-center justify-between px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl hover:border-violet-500 transition-all shadow-lg group"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl filter drop-shadow-md">
                            {LANGUAGES.find(l => l.code === (selectedPostOpLang || 'tr'))?.flag}
                          </span>
                          <span className="text-slate-200 font-bold text-sm uppercase tracking-wider group-hover:text-white transition-colors">
                            {LANGUAGES.find(l => l.code === (selectedPostOpLang || 'tr'))?.name}
                          </span>
                        </div>
                        <ChevronLeft className={`w-4 h-4 text-slate-500 transition-transform duration-300 ${showDropdown ? '-rotate-90' : 'rotate-90'}`} />
                      </button>

                      {showDropdown && (
                        <div className="absolute top-full left-0 mt-2 w-full bg-slate-900 border border-slate-700 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden animate-in fade-in slide-in-from-top-2 p-1.5 grid gap-1 max-h-[300px] overflow-y-auto custom-scrollbar">
                          {LANGUAGES.map((lang) => (
                            <button
                              key={lang.code}
                              onClick={() => {
                                setSelectedPostOpLang(lang.code);
                                setShowDropdown(false);
                              }}
                              className={`flex items-center gap-3 w-full p-2.5 rounded-lg transition-all ${selectedPostOpLang === lang.code || (!selectedPostOpLang && lang.code === 'tr')
                                ? 'bg-violet-600 text-white shadow-md'
                                : 'hover:bg-slate-800 text-slate-300 hover:text-white'
                                }`}
                            >
                              <span className="text-xl">{lang.flag}</span>
                              <span className="font-bold text-xs uppercase tracking-wide">{lang.name}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Print Button */}
                    <button
                      onClick={handlePrint}
                      className="w-56 py-3 bg-violet-600 hover:bg-violet-500 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
                    >
                      <Printer className="w-4 h-4" />
                      Yazdır / Print
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="w-full mt-4 md:mt-0 perspective-1000 print:hidden">
                  <div className="transform transition-all duration-500 preserve-3d">
                    <PostOpInfoPrintable lang={selectedPostOpLang || 'tr'} />
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
                          <div
                            onClick={() => {
                              const trLang = doc.langs.find((l: any) => l.label === 'Türkçe');
                              if (trLang) window.open(trLang.path, '_blank');
                            }}
                            className={`w-full p-5 bg-slate-900 border transition-all duration-300 rounded-2xl flex items-center justify-between cursor-pointer ${hoveredDoc === doc.name ? 'border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.2)]' : 'border-slate-800'}`}
                          >
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
                                className="p-3 bg-slate-800/80 hover:bg-emerald-600 text-slate-300 hover:text-white rounded-xl flex items-center justify-between transition-colors text-sm font-bold group/lang"
                              >
                                <span className="flex items-center gap-2">
                                  {l.flag && <span>{l.flag}</span>}
                                  {l.label}
                                </span>
                                <ExternalLink className="w-3 h-3 opacity-50 group-hover/lang:opacity-100" />
                              </a>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <a
                          href={doc.path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full p-5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-3xl flex items-center justify-between transition-all group shadow-sm hover:shadow-lg"
                        >
                          <div className="flex items-center gap-4">
                            {doc.iconType === 'print' || doc.name.toLowerCase().includes('print') ? (
                              <Printer className="w-6 h-6 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
                            ) : doc.iconType === 'send' ? (
                              <div className="flex items-center gap-1">
                                <MessageCircle className="w-6 h-6 text-emerald-500" />
                                <Mail className="w-6 h-6 text-red-500" />
                              </div>
                            ) : (
                              <FileText className="w-6 h-6 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
                            )}
                            <span className="text-lg font-bold text-slate-200 group-hover:text-white transition-colors flex items-center gap-2">
                              {doc.flag && <span>{doc.flag}</span>}
                              {doc.name}
                            </span>
                          </div>
                          <ExternalLink className="w-5 h-5 text-slate-600 group-hover:text-white transition-colors opacity-50 group-hover:opacity-100" />
                        </a>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-slate-500 bg-slate-900 p-8 rounded-[2rem] text-center italic">
                    Bu kategoride henüz belge bulunmamaktadır.
                  </p>
                )}
              </div>
            )}
          </div>

        )}
      </div>

      {/* POST OP PRINTABLE VIEW */}


      {/* Warning Modal for Future Patients */}
      {
        selectedFuturePatient && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-slate-900 border-2 border-slate-700 p-8 rounded-3xl max-w-md w-full shadow-2xl relative">
              <button
                onClick={() => setSelectedFuturePatient(null)}
                className="absolute top-4 right-4 p-2 hover:bg-slate-800 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-slate-400" />
              </button>

              <div className="flex flex-col items-center text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-amber-500/20 flex items-center justify-center">
                  <AlertTriangle className="w-8 h-8 text-amber-500" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-white">Dikkat</h3>
                  <p className="text-slate-400 font-medium text-lg leading-relaxed">
                    <span className="text-white font-bold">{selectedFuturePatient.name}</span> isimli hasta henüz ameliyat edilmemiştir.
                  </p>
                  <p className="text-slate-500 text-sm">
                    Ameliyat Tarihi: <span className="font-bold text-slate-400">{selectedFuturePatient.surgeryDate.split('-').reverse().join('.')}</span>
                  </p>
                </div>

                <button
                  onClick={() => setSelectedFuturePatient(null)}
                  className="w-full py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-2xl transition-colors"
                >
                  Tamam, Anlaşıldı
                </button>
              </div>
            </div>
          </div>
        )
      }

      {/* Hidden Print Components */}
      {/* Dedicated Print View for PostOp - Outside of 3D transforms */}
      {selectedPostOpLang && (
        <div className="hidden print:block">
          <PostOpInfoPrintable lang={selectedPostOpLang} />
        </div>
      )}

      {activeSubItem === "flight-report" && <FlightReportPrintable data={flightData} />}
      {activeSubItem === "id-report" && <IDReportPrintable data={idReportData} />}
    </main>
  );
}
