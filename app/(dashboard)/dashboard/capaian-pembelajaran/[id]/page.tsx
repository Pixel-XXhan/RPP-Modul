"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
    ArrowLeft,
    Edit,
    Download,
    GraduationCap,
    Target,
    BookOpen,
    ChevronRight,
    Sparkles,
    Copy,
} from "lucide-react";

const cpData = {
    id: "1",
    code: "MAT-D-01",
    phase: "D",
    subject: "Matematika",
    title: "Peserta didik mampu memahami konsep bilangan bulat dan pecahan, serta menerapkan operasi hitung dalam menyelesaikan masalah sehari-hari.",
    elements: [
        "Bilangan bulat positif, negatif, dan nol",
        "Operasi penjumlahan, pengurangan, perkalian, dan pembagian bilangan bulat",
        "Pecahan biasa, campuran, desimal, dan persen",
        "Operasi hitung pecahan",
        "Penerapan dalam pemecahan masalah kontekstual",
    ],
    tujuanPembelajaran: [
        { id: "1", code: "TP-01", title: "Memahami konsep bilangan bulat positif dan negatif", status: "completed" },
        { id: "2", code: "TP-02", title: "Melakukan operasi penjumlahan dan pengurangan bilangan bulat", status: "completed" },
        { id: "3", code: "TP-03", title: "Melakukan operasi perkalian dan pembagian bilangan bulat", status: "in-progress" },
        { id: "4", code: "TP-04", title: "Memahami konsep pecahan biasa dan campuran", status: "pending" },
        { id: "5", code: "TP-05", title: "Melakukan operasi hitung pecahan", status: "pending" },
        { id: "6", code: "TP-06", title: "Menyelesaikan masalah kontekstual bilangan", status: "pending" },
    ],
    grade: "Kelas 7-9",
    year: "2024",
};

const statusConfig = {
    completed: { label: "Selesai", color: "bg-emerald-100 text-emerald-700" },
    "in-progress": { label: "Berlangsung", color: "bg-blue-100 text-blue-700" },
    pending: { label: "Belum", color: "bg-neutral-100 text-neutral-500" },
};

export default function CPDetailPage({ params }: { params: { id: string } }) {
    const completedTP = cpData.tujuanPembelajaran.filter(tp => tp.status === "completed").length;
    const progress = Math.round((completedTP / cpData.tujuanPembelajaran.length) * 100);

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                    <Link href="/dashboard/capaian-pembelajaran" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-3">
                        <ArrowLeft size={16} className="mr-2" />Kembali
                    </Link>
                    <div className="flex items-center gap-3 mb-3">
                        <span className="text-sm font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">{cpData.code}</span>
                        <span className="text-sm font-medium text-muted-foreground bg-neutral-100 px-3 py-1 rounded-full">Fase {cpData.phase}</span>
                    </div>
                    <h1 className="text-xl md:text-2xl font-bold font-serif leading-relaxed">{cpData.title}</h1>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mt-3">
                        <span>{cpData.subject}</span><span>•</span>
                        <span>{cpData.grade}</span><span>•</span>
                        <span>Kurikulum {cpData.year}</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" className="rounded-xl"><Copy size={16} className="mr-2" />Salin</Button>
                    <Button className="bg-primary text-white rounded-xl"><Download size={16} className="mr-2" />Export</Button>
                </div>
            </div>

            {/* Progress */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border p-5">
                <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold">Progress Tujuan Pembelajaran</span>
                    <span className="text-sm text-muted-foreground">{completedTP}/{cpData.tujuanPembelajaran.length} TP</span>
                </div>
                <div className="h-3 bg-neutral-100 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 1 }}
                        className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full" />
                </div>
                <p className="text-sm text-muted-foreground mt-2">{progress}% tercapai</p>
            </motion.div>

            {/* Elemen CP */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl border p-6">
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center text-violet-600">
                        <BookOpen size={18} />
                    </div>
                    <h2 className="text-lg font-bold">Elemen Capaian Pembelajaran</h2>
                </div>
                <ul className="space-y-3">
                    {cpData.elements.map((el, i) => (
                        <li key={i} className="flex items-start gap-3 p-3 bg-neutral-50 rounded-xl">
                            <span className="w-6 h-6 rounded-full bg-violet-100 text-violet-600 text-sm flex items-center justify-center shrink-0 font-medium">{i + 1}</span>
                            <span className="text-foreground">{el}</span>
                        </li>
                    ))}
                </ul>
            </motion.div>

            {/* Tujuan Pembelajaran List */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl border p-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                            <Target size={18} />
                        </div>
                        <h2 className="text-lg font-bold">Tujuan Pembelajaran Terkait</h2>
                    </div>
                    <Link href="/dashboard/atp/create">
                        <Button variant="outline" size="sm" className="rounded-xl">Buat ATP</Button>
                    </Link>
                </div>
                <div className="space-y-3">
                    {cpData.tujuanPembelajaran.map((tp) => {
                        const status = statusConfig[tp.status as keyof typeof statusConfig];
                        return (
                            <Link key={tp.id} href={`/dashboard/tujuan-pembelajaran/${tp.id}`}>
                                <div className="flex items-center gap-4 p-4 bg-neutral-50 rounded-xl hover:bg-neutral-100 transition-colors group">
                                    <span className="text-sm font-bold text-primary">{tp.code}</span>
                                    <span className="flex-1 text-foreground">{tp.title}</span>
                                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${status.color}`}>{status.label}</span>
                                    <ChevronRight size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
                {[
                    { label: "Tujuan Pembelajaran", value: cpData.tujuanPembelajaran.length, icon: Target, color: "bg-blue-100 text-blue-600" },
                    { label: "Tercapai", value: completedTP, icon: GraduationCap, color: "bg-emerald-100 text-emerald-600" },
                    { label: "Elemen", value: cpData.elements.length, icon: BookOpen, color: "bg-violet-100 text-violet-600" },
                ].map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.05 }}
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

            {/* AI Badge */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-4 border border-primary/10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary"><Sparkles size={20} /></div>
                    <div>
                        <p className="font-medium">CP Resmi Kurikulum Merdeka</p>
                        <p className="text-sm text-muted-foreground">Dokumen ini sesuai dengan Permendikbudristek No. 5 Tahun 2024</p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
