"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
    ArrowLeft,
    Download,
    Edit,
    Calendar,
    BookOpen,
    Target,
    Sparkles,
    CheckCircle2,
    Clock,
} from "lucide-react";

const silabusData = {
    id: "1",
    title: "Silabus Matematika Kelas 7 Semester 1",
    subject: "Matematika",
    grade: "Kelas 7",
    semester: "Semester 1 (Ganjil)",
    year: "2025/2026",
    createdAt: "1 Januari 2026",
    updatedAt: "1 minggu lalu",
    weeks: [
        { week: "1-2", topic: "Bilangan Bulat", cp: "MAT-D-01", activities: ["Diskusi", "Latihan"], hours: 8 },
        { week: "3-4", topic: "Operasi Bilangan Bulat", cp: "MAT-D-01", activities: ["Demo", "Kerja Kelompok"], hours: 8 },
        { week: "5-6", topic: "Pecahan", cp: "MAT-D-02", activities: ["Eksplorasi", "Presentasi"], hours: 8 },
        { week: "7-8", topic: "Operasi Pecahan", cp: "MAT-D-02", activities: ["Latihan", "Quiz"], hours: 8 },
        { week: "9-10", topic: "Persamaan Linear", cp: "MAT-D-03", activities: ["Discovery Learning"], hours: 8 },
        { week: "11-12", topic: "Pertidaksamaan Linear", cp: "MAT-D-03", activities: ["Project"], hours: 8 },
        { week: "13-14", topic: "Himpunan", cp: "MAT-D-04", activities: ["Diskusi", "Game"], hours: 8 },
        { week: "15-16", topic: "Review & Ujian", cp: "-", activities: ["Review", "UAS"], hours: 8 },
    ],
};

export default function SilabusDetailPage({ params }: { params: { id: string } }) {
    const totalHours = silabusData.weeks.reduce((a, w) => a + w.hours, 0);

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                    <Link href="/dashboard/silabus" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-3">
                        <ArrowLeft size={16} className="mr-2" />Kembali
                    </Link>
                    <h1 className="text-2xl md:text-3xl font-bold font-serif text-foreground">{silabusData.title}</h1>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mt-2">
                        <span>{silabusData.subject}</span><span>•</span>
                        <span>{silabusData.grade}</span><span>•</span>
                        <span>{silabusData.year}</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Link href={`/dashboard/silabus/${params.id}/edit`}>
                        <Button variant="outline" className="rounded-xl"><Edit size={16} className="mr-2" />Edit</Button>
                    </Link>
                    <Button className="bg-primary text-white rounded-xl"><Download size={16} className="mr-2" />Export</Button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: "Total Minggu", value: silabusData.weeks.length, icon: Calendar, color: "bg-blue-100 text-blue-600" },
                    { label: "Total JP", value: totalHours, icon: Clock, color: "bg-emerald-100 text-emerald-600" },
                    { label: "Capaian Pembelajaran", value: 4, icon: Target, color: "bg-violet-100 text-violet-600" },
                    { label: "Topik", value: silabusData.weeks.filter(w => w.topic !== "Review & Ujian").length, icon: BookOpen, color: "bg-amber-100 text-amber-600" },
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

            {/* Weekly Table */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl border overflow-hidden">
                <div className="p-6 border-b">
                    <h2 className="text-lg font-bold">Pemetaan Mingguan</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-neutral-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-bold text-muted-foreground uppercase">Minggu</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-muted-foreground uppercase">Topik</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-muted-foreground uppercase">Kode CP</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-muted-foreground uppercase">Kegiatan</th>
                                <th className="px-6 py-4 text-center text-xs font-bold text-muted-foreground uppercase">JP</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100">
                            {silabusData.weeks.map((week, i) => (
                                <motion.tr key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05 * i }}
                                    className="hover:bg-neutral-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-bold">
                                            {week.week}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-medium">{week.topic}</td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-emerald-700 font-medium">{week.cp}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-wrap gap-1">
                                            {week.activities.map((a, j) => (
                                                <span key={j} className="px-2 py-0.5 bg-neutral-100 text-neutral-600 rounded text-xs">{a}</span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center font-semibold">{week.hours}</td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>

            {/* AI Badge */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-4 border border-primary/10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary"><Sparkles size={20} /></div>
                    <div>
                        <p className="font-medium">Silabus Terstruktur dengan AI</p>
                        <p className="text-sm text-muted-foreground">Pemetaan mingguan disusun berdasarkan Kurikulum Merdeka</p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
