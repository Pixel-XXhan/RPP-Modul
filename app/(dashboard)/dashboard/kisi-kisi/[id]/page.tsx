"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
    ArrowLeft,
    Edit,
    Download,
    Grid3X3,
    FileQuestion,
    Target,
    BarChart3,
    Sparkles,
} from "lucide-react";

const kisiKisiData = {
    id: "1",
    title: "Kisi-Kisi UTS Matematika Kelas 7",
    subject: "Matematika",
    grade: "Kelas 7",
    type: "UTS",
    semester: "Semester 1",
    year: "2025/2026",
    createdAt: "1 Januari 2026",
    items: [
        {
            cp: "MAT-D-01",
            materi: "Bilangan Bulat",
            indikator: "Memahami konsep bilangan bulat",
            level: "C2",
            soal: { pg: 3, essay: 1 },
        },
        {
            cp: "MAT-D-01",
            materi: "Operasi Bilangan Bulat",
            indikator: "Menghitung operasi bilangan bulat",
            level: "C3",
            soal: { pg: 4, essay: 1 },
        },
        {
            cp: "MAT-D-02",
            materi: "Pecahan",
            indikator: "Memahami konsep pecahan",
            level: "C2",
            soal: { pg: 3, essay: 0 },
        },
        {
            cp: "MAT-D-02",
            materi: "Operasi Pecahan",
            indikator: "Menghitung operasi pecahan",
            level: "C3",
            soal: { pg: 5, essay: 1 },
        },
        {
            cp: "MAT-D-03",
            materi: "Persamaan Linear",
            indikator: "Menyelesaikan PLSV",
            level: "C4",
            soal: { pg: 5, essay: 2 },
        },
    ],
};

const levelColors: Record<string, string> = {
    C1: "bg-neutral-100 text-neutral-700",
    C2: "bg-blue-100 text-blue-700",
    C3: "bg-emerald-100 text-emerald-700",
    C4: "bg-amber-100 text-amber-700",
    C5: "bg-violet-100 text-violet-700",
    C6: "bg-rose-100 text-rose-700",
};

export default function KisiKisiDetailPage({ params }: { params: { id: string } }) {
    const totalPG = kisiKisiData.items.reduce((a, i) => a + i.soal.pg, 0);
    const totalEssay = kisiKisiData.items.reduce((a, i) => a + i.soal.essay, 0);

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                    <Link href="/dashboard/kisi-kisi" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-3">
                        <ArrowLeft size={16} className="mr-2" />Kembali
                    </Link>
                    <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-2xl md:text-3xl font-bold font-serif">{kisiKisiData.title}</h1>
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-100 text-blue-700">{kisiKisiData.type}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span>{kisiKisiData.subject}</span><span>•</span>
                        <span>{kisiKisiData.grade}</span><span>•</span>
                        <span>{kisiKisiData.semester}</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Link href={`/dashboard/kisi-kisi/${params.id}/edit`}>
                        <Button variant="outline" className="rounded-xl"><Edit size={16} className="mr-2" />Edit</Button>
                    </Link>
                    <Button className="bg-primary text-white rounded-xl"><Download size={16} className="mr-2" />Export</Button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4">
                {[
                    { label: "Total Soal", value: totalPG + totalEssay, icon: FileQuestion, color: "bg-blue-100 text-blue-600" },
                    { label: "Pilihan Ganda", value: totalPG, icon: Grid3X3, color: "bg-emerald-100 text-emerald-600" },
                    { label: "Essay", value: totalEssay, icon: BarChart3, color: "bg-amber-100 text-amber-600" },
                    { label: "CP/KD", value: [...new Set(kisiKisiData.items.map(i => i.cp))].length, icon: Target, color: "bg-violet-100 text-violet-600" },
                ].map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                            className="bg-white rounded-2xl border p-4 text-center">
                            <div className={`w-10 h-10 ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-2`}>
                                <Icon size={20} />
                            </div>
                            <p className="text-2xl font-bold font-serif">{stat.value}</p>
                            <p className="text-xs text-muted-foreground">{stat.label}</p>
                        </motion.div>
                    );
                })}
            </div>

            {/* Kisi-Kisi Table */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border overflow-hidden">
                <div className="p-6 border-b">
                    <h2 className="text-lg font-bold">Pemetaan Soal</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-neutral-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-bold text-muted-foreground uppercase">No</th>
                                <th className="px-4 py-3 text-left text-xs font-bold text-muted-foreground uppercase">Kode CP</th>
                                <th className="px-4 py-3 text-left text-xs font-bold text-muted-foreground uppercase">Materi</th>
                                <th className="px-4 py-3 text-left text-xs font-bold text-muted-foreground uppercase">Indikator</th>
                                <th className="px-4 py-3 text-center text-xs font-bold text-muted-foreground uppercase">Level</th>
                                <th className="px-4 py-3 text-center text-xs font-bold text-muted-foreground uppercase">PG</th>
                                <th className="px-4 py-3 text-center text-xs font-bold text-muted-foreground uppercase">Essay</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {kisiKisiData.items.map((item, i) => (
                                <motion.tr key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                                    className="hover:bg-neutral-50">
                                    <td className="px-4 py-4 text-sm font-medium text-center">{i + 1}</td>
                                    <td className="px-4 py-4">
                                        <span className="text-sm font-medium text-emerald-700">{item.cp}</span>
                                    </td>
                                    <td className="px-4 py-4 font-medium">{item.materi}</td>
                                    <td className="px-4 py-4 text-sm text-muted-foreground">{item.indikator}</td>
                                    <td className="px-4 py-4 text-center">
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${levelColors[item.level]}`}>{item.level}</span>
                                    </td>
                                    <td className="px-4 py-4 text-center font-bold">{item.soal.pg}</td>
                                    <td className="px-4 py-4 text-center font-bold">{item.soal.essay}</td>
                                </motion.tr>
                            ))}
                        </tbody>
                        <tfoot className="bg-neutral-50 font-bold">
                            <tr>
                                <td colSpan={5} className="px-4 py-3 text-right">Total:</td>
                                <td className="px-4 py-3 text-center">{totalPG}</td>
                                <td className="px-4 py-3 text-center">{totalEssay}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </motion.div>

            {/* Level Legend */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-2xl border p-6">
                <h3 className="font-bold mb-4">Keterangan Level Kognitif (Taksonomi Bloom)</h3>
                <div className="grid grid-cols-6 gap-2">
                    {[
                        { level: "C1", label: "Mengingat" },
                        { level: "C2", label: "Memahami" },
                        { level: "C3", label: "Menerapkan" },
                        { level: "C4", label: "Menganalisis" },
                        { level: "C5", label: "Mengevaluasi" },
                        { level: "C6", label: "Mencipta" },
                    ].map((l) => (
                        <div key={l.level} className={`p-2 rounded-lg text-center ${levelColors[l.level]}`}>
                            <p className="font-bold text-sm">{l.level}</p>
                            <p className="text-xs">{l.label}</p>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* AI Badge */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-4 border border-primary/10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary"><Sparkles size={20} /></div>
                    <div>
                        <p className="font-medium">Kisi-Kisi Tervalidasi AI</p>
                        <p className="text-sm text-muted-foreground">Distribusi soal seimbang berdasarkan level kognitif dan CP</p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
