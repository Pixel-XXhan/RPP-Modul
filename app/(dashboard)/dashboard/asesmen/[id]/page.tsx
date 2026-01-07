"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
    ArrowLeft,
    Download,
    Edit,
    CheckCircle2,
    Circle,
    Target,
    Sparkles,
    Award,
    Star,
} from "lucide-react";

const asesmenData = {
    id: "1",
    title: "Asesmen Sumatif Matematika Bab 1",
    type: "sumatif",
    subject: "Matematika",
    grade: "Kelas 7",
    cp: "MAT-D-01",
    createdAt: "10 Januari 2026",
    criteria: [
        { name: "Pemahaman Konsep", weight: 30, description: "Memahami konsep bilangan bulat" },
        { name: "Penerapan", weight: 40, description: "Menerapkan operasi dalam soal" },
        { name: "Komunikasi Matematis", weight: 30, description: "Menyajikan penyelesaian dengan jelas" },
    ],
    rubrik: [
        { level: 4, label: "Sangat Baik", minScore: 90, description: "Menguasai seluruh konsep" },
        { level: 3, label: "Baik", minScore: 75, description: "Menguasai sebagian besar konsep" },
        { level: 2, label: "Cukup", minScore: 60, description: "Menguasai konsep dasar" },
        { level: 1, label: "Perlu Bimbingan", minScore: 0, description: "Perlu pendampingan" },
    ],
    stats: { siswa: 32, selesai: 28, rataRata: 82 },
};

export default function AsesmenDetailPage({ params }: { params: { id: string } }) {
    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                    <Link href="/dashboard/asesmen" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-3">
                        <ArrowLeft size={16} className="mr-2" />Kembali
                    </Link>
                    <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-2xl md:text-3xl font-bold font-serif">{asesmenData.title}</h1>
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-rose-100 text-rose-700">Sumatif</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span>{asesmenData.subject}</span><span>•</span>
                        <span>{asesmenData.grade}</span><span>•</span>
                        <span className="text-emerald-600 font-medium">{asesmenData.cp}</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Link href={`/dashboard/asesmen/${params.id}/edit`}>
                        <Button variant="outline" className="rounded-xl"><Edit size={16} className="mr-2" />Edit</Button>
                    </Link>
                    <Button className="bg-primary text-white rounded-xl"><Download size={16} className="mr-2" />Export</Button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
                {[
                    { label: "Total Siswa", value: asesmenData.stats.siswa, icon: Target, color: "bg-blue-100 text-blue-600" },
                    { label: "Sudah Selesai", value: asesmenData.stats.selesai, icon: CheckCircle2, color: "bg-emerald-100 text-emerald-600" },
                    { label: "Rata-rata Nilai", value: asesmenData.stats.rataRata, icon: Award, color: "bg-amber-100 text-amber-600" },
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

            {/* Kriteria */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl border p-6">
                <h2 className="text-lg font-bold mb-4">Kriteria Penilaian</h2>
                <div className="space-y-4">
                    {asesmenData.criteria.map((c, i) => (
                        <div key={i} className="flex items-center gap-4 p-4 bg-neutral-50 rounded-xl">
                            <div className="w-10 h-10 rounded-lg bg-violet-100 text-violet-600 flex items-center justify-center font-bold">{i + 1}</div>
                            <div className="flex-1">
                                <p className="font-semibold">{c.name}</p>
                                <p className="text-sm text-muted-foreground">{c.description}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-2xl font-bold text-primary">{c.weight}%</p>
                                <p className="text-xs text-muted-foreground">Bobot</p>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Rubrik */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl border p-6">
                <h2 className="text-lg font-bold mb-4">Rubrik Level</h2>
                <div className="grid md:grid-cols-4 gap-3">
                    {asesmenData.rubrik.map((r) => (
                        <div key={r.level} className={`p-4 rounded-xl border-2 text-center ${r.level === 4 ? "border-emerald-200 bg-emerald-50" :
                                r.level === 3 ? "border-blue-200 bg-blue-50" :
                                    r.level === 2 ? "border-amber-200 bg-amber-50" :
                                        "border-neutral-200 bg-neutral-50"
                            }`}>
                            <div className="flex justify-center mb-2">
                                {Array.from({ length: r.level }).map((_, i) => (
                                    <Star key={i} size={16} className={`${r.level === 4 ? "text-emerald-500" :
                                            r.level === 3 ? "text-blue-500" :
                                                r.level === 2 ? "text-amber-500" :
                                                    "text-neutral-400"
                                        } fill-current`} />
                                ))}
                            </div>
                            <p className="font-bold text-sm">{r.label}</p>
                            <p className="text-xs text-muted-foreground mt-1">{r.minScore}+ poin</p>
                            <p className="text-xs text-muted-foreground mt-2">{r.description}</p>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* AI Badge */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-4 border border-primary/10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary"><Sparkles size={20} /></div>
                    <div>
                        <p className="font-medium">Asesmen Tervalidasi AI</p>
                        <p className="text-sm text-muted-foreground">Kriteria dan rubrik sesuai standar Kurikulum Merdeka</p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
