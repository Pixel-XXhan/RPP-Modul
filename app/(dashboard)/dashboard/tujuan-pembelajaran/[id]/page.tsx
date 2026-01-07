"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
    ArrowLeft,
    Edit,
    Target,
    CheckCircle2,
    Circle,
    GraduationCap,
    Calendar,
    BookOpen,
    Sparkles,
} from "lucide-react";

const tpData = {
    id: "1",
    code: "TP-01",
    title: "Siswa dapat menjelaskan konsep bilangan bulat positif dan negatif dengan benar",
    status: "completed",
    cp: {
        code: "MAT-D-01",
        title: "Memahami konsep bilangan bulat dan pecahan",
    },
    subject: "Matematika",
    grade: "Kelas 7",
    week: "Minggu 1-2",
    indicators: [
        { id: "1", text: "Dapat menyebutkan contoh bilangan bulat positif", status: "completed" },
        { id: "2", text: "Dapat menyebutkan contoh bilangan bulat negatif", status: "completed" },
        { id: "3", text: "Dapat menempatkan bilangan bulat pada garis bilangan", status: "completed" },
    ],
    activities: [
        "Diskusi tentang suhu dan ketinggian",
        "Latihan menempatkan bilangan pada garis bilangan",
        "Kuis pemahaman konsep",
    ],
    assessment: "Tes tertulis 10 soal pilihan ganda",
    createdAt: "1 Januari 2026",
    updatedAt: "1 minggu lalu",
};

const statusConfig = {
    completed: { label: "Selesai", color: "bg-emerald-100 text-emerald-700", icon: CheckCircle2 },
    "in-progress": { label: "Berlangsung", color: "bg-blue-100 text-blue-700", icon: Target },
    pending: { label: "Belum Mulai", color: "bg-neutral-100 text-neutral-600", icon: Circle },
};

export default function TPDetailPage({ params }: { params: { id: string } }) {
    const status = statusConfig[tpData.status as keyof typeof statusConfig];
    const StatusIcon = status.icon;
    const completedIndicators = tpData.indicators.filter(i => i.status === "completed").length;

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                    <Link href="/dashboard/tujuan-pembelajaran" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-3">
                        <ArrowLeft size={16} className="mr-2" />Kembali
                    </Link>
                    <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-bold text-primary bg-primary/10 px-2.5 py-1 rounded">{tpData.code}</span>
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 ${status.color}`}>
                            <StatusIcon size={12} />{status.label}
                        </span>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold font-serif leading-tight">{tpData.title}</h1>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mt-2">
                        <span>{tpData.subject}</span><span>•</span>
                        <span>{tpData.grade}</span><span>•</span>
                        <span><Calendar size={14} className="inline mr-1" />{tpData.week}</span>
                    </div>
                </div>
                <Link href={`/dashboard/tujuan-pembelajaran/${params.id}/edit`}>
                    <Button className="bg-primary text-white rounded-xl"><Edit size={16} className="mr-2" />Edit</Button>
                </Link>
            </div>

            {/* CP Reference */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100 p-5">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                        <GraduationCap size={20} />
                    </div>
                    <div>
                        <span className="text-xs font-bold text-emerald-700">{tpData.cp.code}</span>
                        <p className="text-sm text-emerald-600">Capaian Pembelajaran</p>
                    </div>
                </div>
                <p className="text-emerald-900">{tpData.cp.title}</p>
            </motion.div>

            {/* Progress */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl border p-5">
                <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold">Progress Indikator</span>
                    <span className="text-sm text-muted-foreground">{completedIndicators}/{tpData.indicators.length}</span>
                </div>
                <div className="h-3 bg-neutral-100 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${(completedIndicators / tpData.indicators.length) * 100}%` }} transition={{ duration: 1 }}
                        className="h-full bg-gradient-to-r from-primary to-emerald-500 rounded-full" />
                </div>
            </motion.div>

            {/* Indicators */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl border p-6">
                <h2 className="text-lg font-bold mb-4">Indikator Pencapaian</h2>
                <div className="space-y-3">
                    {tpData.indicators.map((ind, i) => (
                        <div key={ind.id} className={`flex items-start gap-4 p-4 rounded-xl ${ind.status === "completed" ? "bg-emerald-50" : "bg-neutral-50"
                            }`}>
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${ind.status === "completed" ? "bg-emerald-500 text-white" : "bg-neutral-200 text-neutral-500"
                                }`}>
                                {ind.status === "completed" ? <CheckCircle2 size={18} /> : i + 1}
                            </div>
                            <p className={ind.status === "completed" ? "text-emerald-900" : "text-foreground"}>{ind.text}</p>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Activities */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-2xl border p-6">
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                        <BookOpen size={18} />
                    </div>
                    <h2 className="text-lg font-bold">Kegiatan Pembelajaran</h2>
                </div>
                <ul className="space-y-2">
                    {tpData.activities.map((act, i) => (
                        <li key={i} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary" />{act}
                        </li>
                    ))}
                </ul>
            </motion.div>

            {/* Assessment */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="bg-white rounded-2xl border p-6">
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600">
                        <Target size={18} />
                    </div>
                    <h2 className="text-lg font-bold">Asesmen</h2>
                </div>
                <p className="text-foreground">{tpData.assessment}</p>
            </motion.div>

            {/* AI Badge */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-4 border border-primary/10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary"><Sparkles size={20} /></div>
                    <div>
                        <p className="font-medium">TP Terstruktur AI</p>
                        <p className="text-sm text-muted-foreground">Indikator disusun dari tingkat sederhana ke kompleks</p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
