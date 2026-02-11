"use client";

import React, { useState } from 'react';

export default function PrescriptionBuilder() {
    const [patientName, setPatientName] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [medications, setMedications] = useState([
        { id: 1, name: 'Cefaks 500 mg TB', dosage: '2 kutu', usage: 'S: 2x1 (Sabah - Akşam,Tok karnına)', type: 'Antibiyotik' },
        { id: 2, name: 'Cipro 500 mg TB', dosage: '1 kutu', usage: 'S: 2x1 (Sabah - Akşam,Tok karnına)', type: 'Antibiyotik' },
        { id: 3, name: 'Arveles 25 mg TB', dosage: '1 kutu', usage: 'S: 2x1 (Ağrı durumunda, Tok karnına)', type: 'Ağrı Kesici' },
        { id: 4, name: 'Majezik Sprey', dosage: '1 kutu', usage: 'S: 3x4 puf (Boğaz ağrısı durumunda)', type: 'Boğaz Spreyi' },
        { id: 5, name: 'İlliadin Sprey', dosage: '1 kutu', usage: 'S: 3x2 (Burun açıcı, sadece ilk 5 gün)', type: 'Burun Spreyi' },
        { id: 6, name: 'Thiocilline ve Terramycin Krem', dosage: "1'er kutu", usage: 'S: 3x1 (Dikişlere sürülecek)', type: 'Krem' },
        { id: 7, name: 'Nazalnem veya Okyanus suyu spreyi', dosage: '1 kutu', usage: 'S: 8x1 (Burun içi nemlendirme, sıklıkla)', type: 'Yıkama' },
    ]);

    return (
        <div className="min-h-screen bg-slate-50 flex justify-center p-8 print:p-0 print:bg-white">
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
            <div className="w-[210mm] min-h-[297mm] bg-white p-12 shadow-xl print:shadow-none print:w-[210mm] print:h-[297mm] print:p-[10mm] print:mx-auto flex flex-col relative">

                {/* Header */}
                <div className="flex justify-between items-center border-b-2 border-slate-200 pb-6 mb-8">
                    <div className="flex items-center gap-4">
                        <img src="/logo-header.png?v=3" alt="Logo" className="w-20 h-20 object-contain" />
                        <div>
                            <h1 className="text-blue-900 text-2xl font-black">Op. Dr. İbrahim YAĞCI</h1>
                            <p className="text-slate-500 font-bold text-sm tracking-wider uppercase">Rinoplasti & KBB Uzmanı</p>
                        </div>
                    </div>
                    <div className="text-5xl font-serif font-bold text-blue-900">Rx</div>
                </div>

                {/* Patient Info */}
                <div className="bg-slate-50 p-6 rounded-lg mb-8 grid grid-cols-3 gap-6 print:bg-transparent print:p-0 print:mb-4">
                    <div className="col-span-2">
                        <label className="block text-slate-500 text-xs font-bold uppercase mb-2">Hasta Adı Soyadı</label>
                        <input
                            type="text"
                            value={patientName}
                            onChange={(e) => setPatientName(e.target.value)}
                            placeholder="Ad Soyad giriniz..."
                            className="w-full p-2 border border-slate-300 rounded text-lg font-semibold text-slate-900 bg-white print:border-none print:p-0"
                        />
                    </div>
                    <div>
                        <label className="block text-slate-500 text-xs font-bold uppercase mb-2">Tarih</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full p-2 border border-slate-300 rounded text-lg font-semibold text-slate-900 bg-white print:border-none print:p-0"
                        />
                    </div>
                </div>

                {/* Medication List */}
                <div className="space-y-4 mb-8 flex-1">
                    {medications.map((med, index) => (
                        <div key={med.id} className="flex justify-between items-start pb-4 border-b border-dashed border-slate-200 break-inside-avoid">
                            <div className="flex-1">
                                <div className="text-lg font-bold text-slate-800 mb-1">
                                    {index + 1}. {med.name}
                                </div>
                                <div className="text-sm text-slate-500 mb-1">{med.dosage}</div>
                                <div className="font-semibold text-slate-900">{med.usage}</div>
                            </div>
                            <div className="flex items-center gap-2 print:hidden">
                                <span className="px-2 py-1 bg-green-50 text-green-700 text-xs font-bold border border-green-200 rounded">
                                    {med.type}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="mt-auto pt-8 flex justify-between items-end">
                    <div className="text-center">
                        <div className="w-48 border-b-2 border-black mb-2 h-16"></div>
                        <div className="font-bold text-sm">Kaşe / İmza</div>
                    </div>
                </div>

            </div>
        </div>
    );
}
