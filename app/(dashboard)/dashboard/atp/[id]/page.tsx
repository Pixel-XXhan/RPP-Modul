"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
    ArrowLeft,
    Download,
    Edit,
    Share2,
    Target,
    CheckCircle2,
    Sparkles,
    MoreVertical,
    ChevronRight,
    GraduationCap,
    Calendar,
} from "lucide-react";
import { useState } from "react";

const atpData = {
    id: "1",
    title: "ATP Matematika - Bilangan Bulat dan Pecahan",
    subject: "Matematika",
    grade: "Kelas 7",
    phase: "Fase D",
    semester: "Semester 1",
    status: "active",
    createdAt: "5 Januari 2026",
    updatedAt: "2 hari lalu",
    cp: {
        code: "MAT-D-01",
        title: "Peserta didik mampu memahami konsep bilangan bulat dan pecahan, serta menerapkan operasi hitung dalam menyelesaikan masalah sehari-hari.",
    },
    tujuanPembelajaran: [
        {
            id: "1",
            code: "TP-01",
            title: "Memahami konsep bilangan bulat positif dan negatif",
            status: "completed",
            week: "Minggu 1-2",
            indicators: [
                "Dapat menyebutkan contoh bilangan bulat",
                "Dapat menempatkan bilangan pada garis bilangan",
            ],
        },
        {
            id: "2",
            code: "TP-02",
            title: "Melakukan operasi penjumlahan dan pengurangan bilangan bulat",
            status: "completed",
            week: "Minggu 3-4",
            indicators: [
                "Dapat menjumlahkan dua bilangan bulat",
                "Dapat mengurangkan dua bilangan bulat",
            ],
        },
        {
            id: "3",
            code: "TP-03",
            title: "Melakukan operasi perkalian dan pembagian bilangan bulat",
            status: "in-progress",
            week: "Minggu 5-6",
            indicators: [
                "Dapat mengalikan dua bilangan bulat",
                "Dapat membagi dua bilangan bulat",
            ],
        },
        {
            id: "4",
            code: "TP-04",
            title: "Menerapkan operasi bilangan bulat dalam soal cerita",
            status: "pending",
            week: "Minggu 7-8",
            indicators: [
                "Dapat menganalisis masalah",
                "Dapat menyelesaikan soal cerita",
            ],
        },
    ],
};

const statusConfig = {
    completed: { label: "Selesai", color: "bg-emerald-100 text-emerald-700", icon: CheckCircle2 },
    "in-progress": { label: "Berlangsung", color: "bg-blue-100 text-blue-700", icon: Target },
    pending: { label: "Belum Mulai", color: "bg-neutral-100 text-neutral-600", icon: Calendar },
};

export default function ATPDetailPage({ params }: { params: { id: string } }) {
    const [showActions, setShowActions] = useState(false);

    const completedCount = atpData.tujuanPembelajaran.filter(tp => tp.status === "completed").length;
    const progress = Math.round((completedCount / atpData.tujuanPembelajaran.length) * 100);

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                    <Link href="/dashboard/atp" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-3">
                        <ArrowLeft size={16} className="mr-2" />Kembali ke Daftar ATP
                    </Link>
                    <h1 className="text-2xl md:text-3xl font-bold font-serif text-foreground">{atpData.title}</h1>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mt-2">
                        <span>{atpData.subject}</span><span>•</span>
                        <span>{atpData.grade}</span><span>•</span>
                        <span>{atpData.phase}</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Link href={`/dashboard/atp/${params.id}/edit`}>
                        <Button variant="outline" className="rounded-xl"><Edit size={16} className="mr-2" />Edit</Button>
                    </Link>
                    <Button className="bg-primary text-white rounded-xl"><Download size={16} className="mr-2" />Export</Button>
                </div>
            </div>

            {/* Progress */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border p-5">
                <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold">Progress Pembelajaran</span>
                    <span className="text-sm text-muted-foreground">{completedCount}/{atpData.tujuanPembelajaran.length} TP</span>
                </div>
                <div className="h-3 bg-neutral-100 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 1 }}
                        className="h-full bg-gradient-to-r from-primary to-emerald-500 rounded-full" />
                </div>
                <p className="text-sm text-muted-foreground mt-2">{progress}% selesai</p>
            </motion.div>

            {/* CP */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100 p-6">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                        <GraduationCap size={20} />
                    </div>
                    <div>
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">{atpData.cp.code}</span>
                        <p className="text-sm text-emerald-700 mt-0.5">Capaian Pembelajaran</p>
                    </div>
                </div>
                <p className="text-emerald-900 leading-relaxed">{atpData.cp.title}</p>
            </motion.div>

            {/* ATP Flow */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl border p-6">
                <h2 className="text-lg font-bold mb-6">Alur Tujuan Pembelajaran</h2>

                <div className="space-y-4">
                    {atpData.tujuanPembelajaran.map((tp, index) => {
                        const status = statusConfig[tp.status as keyof typeof statusConfig];
                        const StatusIcon = status.icon;

                        return (
                            <motion.div key={tp.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 * index }}
                                className="relative pl-8 pb-6 last:pb-0">
                                {/* Connector Line */}
                                {index < atpData.tujuanPembelajaran.length - 1 && (
                                    <div className="absolute left-[15px] top-10 bottom-0 w-0.5 bg-neutral-200" />
                                )}

                                {/* Step Number */}
                                <div className={`absolute left-0 top-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${tp.status === "completed" ? "bg-emerald-500 text-white" :
                                        tp.status === "in-progress" ? "bg-blue-500 text-white" :
                                            "bg-neutral-200 text-neutral-500"
                                    }`}>
                                    {tp.status === "completed" ? <CheckCircle2 size={16} /> : index + 1}
                                </div>

                                {/* Content */}
                                <div className="bg-neutral-50 rounded-xl p-4 ml-4">
                                    <div className="flex items-start justify-between mb-2">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-xs font-bold text-primary">{tp.code}</span>
                                                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${status.color}`}>{status.label}</span>
                                            </div>
                                            <h3 className="font-semibold text-foreground">{tp.title}</h3>
                                        </div>
                                        <span className="text-xs text-muted-foreground whitespace-nowrap">{tp.week}</span>
                                    </div>

                                    <div className="mt-3">
                                        <p className="text-xs font-semibold text-muted-foreground mb-2">Indikator:</p>
                                        <ul className="space-y-1">
                                            {tp.indicators.map((ind, i) => (
                                                <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-primary/40" />{ind}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </motion.div>

            {/* AI Badge */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-4 border border-primary/10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary"><Sparkles size={20} /></div>
                    <div>
                        <p className="font-medium">Disusun dengan AI Katedra</p>
                        <p className="text-sm text-muted-foreground">Alur pembelajaran terstruktur dari sederhana ke kompleks</p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
