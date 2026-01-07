"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, Download, Star, CheckCircle2, Sparkles, PenTool } from "lucide-react";

const rubrikData = {
    id: "1",
    title: "Rubrik Penilaian Presentasi",
    subject: "Umum",
    description: "Rubrik untuk menilai kemampuan presentasi siswa",
    criteria: [
        {
            name: "Konten & Materi",
            weight: 30,
            levels: [
                { level: 4, description: "Materi sangat lengkap, mendalam, dan relevan" },
                { level: 3, description: "Materi lengkap dan relevan" },
                { level: 2, description: "Materi cukup lengkap" },
                { level: 1, description: "Materi kurang lengkap" },
            ],
        },
        {
            name: "Penyampaian",
            weight: 25,
            levels: [
                { level: 4, description: "Sangat percaya diri, jelas, dan menarik" },
                { level: 3, description: "Percaya diri dan jelas" },
                { level: 2, description: "Cukup jelas namun masih ragu" },
                { level: 1, description: "Kurang percaya diri" },
            ],
        },
        {
            name: "Visual Aids",
            weight: 20,
            levels: [
                { level: 4, description: "Slide sangat profesional dan mendukung" },
                { level: 3, description: "Slide baik dan informatif" },
                { level: 2, description: "Slide cukup memadai" },
                { level: 1, description: "Slide kurang mendukung" },
            ],
        },
        {
            name: "Waktu",
            weight: 25,
            levels: [
                { level: 4, description: "Tepat waktu dengan pace sempurna" },
                { level: 3, description: "Sesuai waktu yang diberikan" },
                { level: 2, description: "Sedikit melebihi/kurang waktu" },
                { level: 1, description: "Tidak sesuai waktu" },
            ],
        },
    ],
};

export default function RubrikDetailPage({ params }: { params: { id: string } }) {
    return (
        <div className="max-w-5xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                    <Link href="/dashboard/rubrik" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-3">
                        <ArrowLeft size={16} className="mr-2" />Kembali
                    </Link>
                    <h1 className="text-2xl md:text-3xl font-bold font-serif">{rubrikData.title}</h1>
                    <p className="text-muted-foreground mt-1">{rubrikData.description}</p>
                </div>
                <div className="flex items-center gap-2">
                    <Link href={`/dashboard/rubrik/${params.id}/edit`}>
                        <Button variant="outline" className="rounded-xl"><Edit size={16} className="mr-2" />Edit</Button>
                    </Link>
                    <Button className="bg-primary text-white rounded-xl"><Download size={16} className="mr-2" />Export</Button>
                </div>
            </div>

            {/* Rubrik Table */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border overflow-hidden">
                <div className="p-6 border-b bg-gradient-to-r from-violet-50 to-purple-50">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center text-violet-600">
                            <PenTool size={20} />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold">Matrix Rubrik</h2>
                            <p className="text-sm text-muted-foreground">{rubrikData.criteria.length} kriteria × 4 level</p>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-neutral-50">
                                <th className="px-4 py-3 text-left text-sm font-bold text-muted-foreground w-48">Kriteria</th>
                                <th className="px-4 py-3 text-center text-sm font-bold text-muted-foreground w-16">Bobot</th>
                                <th className="px-3 py-3 text-center text-sm font-bold text-red-600 bg-red-50">
                                    <div className="flex items-center justify-center gap-1"><Star size={12} />1</div>
                                </th>
                                <th className="px-3 py-3 text-center text-sm font-bold text-amber-600 bg-amber-50">
                                    <div className="flex items-center justify-center gap-1"><Star size={12} /><Star size={12} /></div>
                                </th>
                                <th className="px-3 py-3 text-center text-sm font-bold text-blue-600 bg-blue-50">
                                    <div className="flex items-center justify-center gap-1"><Star size={12} /><Star size={12} /><Star size={12} /></div>
                                </th>
                                <th className="px-3 py-3 text-center text-sm font-bold text-emerald-600 bg-emerald-50">
                                    <div className="flex items-center justify-center gap-1"><Star size={12} /><Star size={12} /><Star size={12} /><Star size={12} /></div>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {rubrikData.criteria.map((c, i) => (
                                <motion.tr key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.1 }}>
                                    <td className="px-4 py-4 font-semibold">{c.name}</td>
                                    <td className="px-4 py-4 text-center">
                                        <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-sm font-bold">{c.weight}%</span>
                                    </td>
                                    {c.levels.map((l) => (
                                        <td key={l.level} className={`px-3 py-4 text-xs ${l.level === 1 ? "bg-red-50/50" :
                                                l.level === 2 ? "bg-amber-50/50" :
                                                    l.level === 3 ? "bg-blue-50/50" :
                                                        "bg-emerald-50/50"
                                            }`}>
                                            {l.description}
                                        </td>
                                    ))}
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>

            {/* Legend */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-2xl border p-6">
                <h3 className="font-bold mb-4">Keterangan Level</h3>
                <div className="grid grid-cols-4 gap-4">
                    {[
                        { level: 1, label: "Perlu Bimbingan", range: "0-59", color: "bg-red-100 text-red-700 border-red-200" },
                        { level: 2, label: "Cukup", range: "60-74", color: "bg-amber-100 text-amber-700 border-amber-200" },
                        { level: 3, label: "Baik", range: "75-89", color: "bg-blue-100 text-blue-700 border-blue-200" },
                        { level: 4, label: "Sangat Baik", range: "90-100", color: "bg-emerald-100 text-emerald-700 border-emerald-200" },
                    ].map((l) => (
                        <div key={l.level} className={`p-3 rounded-xl border-2 text-center ${l.color}`}>
                            <div className="flex justify-center mb-1">
                                {Array.from({ length: l.level }).map((_, i) => <Star key={i} size={14} className="fill-current" />)}
                            </div>
                            <p className="font-bold text-sm">{l.label}</p>
                            <p className="text-xs mt-1">{l.range}</p>
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
                        <p className="font-medium">Rubrik Terstandar AI</p>
                        <p className="text-sm text-muted-foreground">Deskriptor level disusun berdasarkan best practice penilaian autentik</p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
