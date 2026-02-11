"use client";

import React, { useEffect } from 'react';

export default function BosRecete() {
    useEffect(() => {
        document.title = "Boş Reçete";
    }, []);

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
                    .print-hidden {
                        display: none !important;
                    }
                }
            `}</style>

            {/* Print Button - Floating Top Right */}
            <div className="fixed top-6 right-6 flex gap-2 print:hidden z-50">
                <button
                    onClick={() => window.print()}
                    className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold transition-all shadow-lg hover:scale-105 active:scale-95 flex items-center gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
                    Yazdır
                </button>
            </div>

            {/* A4 Container: 210mm x 297mm */}
            <div className="w-[210mm] h-[297mm] bg-white p-[12mm] shadow-xl print:shadow-none print:w-[210mm] print:h-[297mm] print:mx-auto flex flex-col relative text-slate-900 overflow-hidden">

                {/* Header Section */}
                <div className="flex-1 flex flex-col">
                    {/* Top Header */}
                    <div className="flex items-center justify-between border-b-2 border-slate-900 pb-4 mb-4">
                        {/* Logo Left */}
                        <img src="/logo-header.png?v=3" alt="Logo" className="w-[130px] h-[130px] object-contain" />

                        {/* Title Center */}
                        <div className="flex-1 text-center px-4">
                            <h1 className="font-black text-4xl text-slate-900 mb-1">Op. Dr. İbrahim YAĞCI</h1>
                            <p className="font-bold text-xl text-slate-600 tracking-[0.1em]">Rinoplasti & KBB Uzmanı</p>
                        </div>

                        {/* QR Code Right */}
                        <div className="flex flex-col items-center justify-center w-[130px]">
                            <img
                                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://r.ibrahimyagci.com`}
                                alt="QR Code"
                                className="w-[100px] h-[100px] mb-1"
                            />
                            <span className="text-[10px] text-slate-500 text-center leading-tight font-bold">r.ibrahimyagci.com</span>
                        </div>
                    </div>

                    {/* Blank Body - Patient Info Space */}
                    <div className="mt-4 flex flex-col gap-6">
                        <div className="w-full flex items-center gap-4">
                            <span className="font-black text-sm uppercase tracking-wider text-slate-400">Hasta:</span>
                            <div className="flex-1 border-b-2 border-slate-100 h-8"></div>
                        </div>
                        <div className="w-full flex items-center gap-4">
                            <span className="font-black text-sm uppercase tracking-wider text-slate-400">Tarih:</span>
                            <div className="w-48 border-b-2 border-slate-100 h-8"></div>
                        </div>
                    </div>

                    {/* Main Empty Content Area */}
                    <div className="flex-1 mt-12 relative">
                        {/* Subtle background lines if needed, but keeping it completely blank as requested */}
                    </div>
                </div>

                {/* Footnote / Footer */}
                <div className="absolute bottom-0 left-0 w-full px-[12mm] pb-[12mm]">
                    <div className="border-t-2 border-slate-900 pt-4 text-center bg-white">
                        {/* Line 1 */}
                        <div className="flex items-center justify-center gap-8 text-base font-bold text-slate-900 whitespace-nowrap">
                            <span>Op. Dr. İbrahim YAĞCI</span>
                            <span className="text-slate-300">|</span>
                            <div className="flex items-center gap-2">
                                <img src="/instagram_icon.png" alt="IG" className="w-5 h-5 object-contain" />
                                <span>@dribrahimyagci</span>
                            </div>
                            <span className="text-slate-300">|</span>
                            <span>Hekim asistanı Ezgi: +90 (551) 199 9963</span>
                        </div>
                        {/* Line 2 */}
                        <div className="text-2xl italic font-serif mt-2 text-slate-800 whitespace-nowrap">
                            Ameliyat süreci ile ilgili tüm sorularınız için: <span className="font-black text-slate-900">r.ibrahimyagci.com</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
