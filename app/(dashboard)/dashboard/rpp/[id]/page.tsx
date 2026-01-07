"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
    ArrowLeft,
    Download,
    Edit,
    Share2,
    Copy,
    Trash2,
    BookOpen,
    Calendar,
    Clock,
    Target,
    CheckCircle2,
    FileText,
    Sparkles,
    MoreVertical,
    Printer,
    Users,
} from "lucide-react";
import { useState } from "react";

const rppData = {
    id: "1",
    title: "RPP Matematika - Persamaan Linear",
    subject: "Matematika",
    grade: "Kelas 7",
    semester: "Semester 1 (Ganjil)",
    week: "Minggu 3-4",
    duration: "2 × 40 menit",
    status: "published",
    createdAt: "10 Januari 2026",
    updatedAt: "1 jam lalu",
    kompetensiDasar: "3.5 Menjelaskan persamaan dan pertidaksamaan linear satu variabel dan penyelesaiannya",
    tujuanPembelajaran: [
        "Siswa dapat memahami konsep persamaan linear satu variabel",
        "Siswa dapat menyelesaikan persamaan linear satu variabel",
        "Siswa dapat menerapkan konsep dalam soal cerita",
    ],
    materi: [
        "Pengertian persamaan linear satu variabel",
        "Bentuk umum PLSV",
        "Langkah-langkah penyelesaian PLSV",
        "Penerapan PLSV dalam kehidupan sehari-hari",
    ],
    metode: ["Ceramah interaktif", "Diskusi kelompok", "Latihan terbimbing"],
    kegiatan: {
        pendahuluan: {
            durasi: "10 menit",
            aktivitas: [
                "Guru membuka dengan salam dan berdoa",
                "Guru memeriksa kehadiran siswa",
                "Guru melakukan apersepsi tentang variabel",
                "Guru menyampaikan tujuan pembelajaran",
            ],
        },
        inti: {
            durasi: "60 menit",
            aktivitas: [
                "Siswa mengamati contoh persamaan linear",
                "Siswa mendiskusikan karakteristik PLSV",
                "Guru menjelaskan langkah penyelesaian",
                "Siswa berlatih menyelesaikan PLSV secara berkelompok",
                "Presentasi hasil kerja kelompok",
                "Guru memberikan penguatan materi",
            ],
        },
        penutup: {
            durasi: "10 menit",
            aktivitas: [
                "Siswa menyimpulkan pembelajaran",
                "Guru memberikan kuis singkat",
                "Guru memberikan tugas rumah",
                "Guru menutup dengan doa",
            ],
        },
    },
    sumberBelajar: ["Buku Matematika Kelas 7", "LKPD", "Proyektor"],
    penilaian: {
        sikap: "Observasi selama diskusi",
        pengetahuan: "Tes tertulis 10 soal",
        keterampilan: "Penilaian presentasi",
    },
};

export default function RPPDetailPage({ params }: { params: { id: string } }) {
    const [showActions, setShowActions] = useState(false);

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                    <Link href="/dashboard/rpp" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-3">
                        <ArrowLeft size={16} className="mr-2" />
                        Kembali ke Daftar RPP
                    </Link>
                    <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-2xl md:text-3xl font-bold font-serif text-foreground">{rppData.title}</h1>
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700">Dipublikasi</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1"><BookOpen size={14} className="text-primary" />{rppData.subject}</span>
                        <span>•</span>
                        <span>{rppData.grade}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1"><Calendar size={14} />{rppData.week}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1"><Clock size={14} />{rppData.duration}</span>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Link href={`/dashboard/rpp/${params.id}/edit`}>
                        <Button variant="outline" className="rounded-xl"><Edit size={16} className="mr-2" />Edit</Button>
                    </Link>
                    <Button className="bg-primary hover:bg-primary-dark text-white rounded-xl">
                        <Download size={16} className="mr-2" />Export PDF
                    </Button>
                    <div className="relative">
                        <Button variant="outline" size="icon" className="rounded-xl" onClick={() => setShowActions(!showActions)}>
                            <MoreVertical size={16} />
                        </Button>
                        {showActions && (
                            <>
                                <div className="fixed inset-0 z-10" onClick={() => setShowActions(false)} />
                                <div className="absolute right-0 top-12 w-48 bg-white rounded-xl shadow-lg border py-2 z-20">
                                    <button className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-neutral-50"><Copy size={14} />Duplikat</button>
                                    <button className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-neutral-50"><Share2 size={14} />Bagikan</button>
                                    <button className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-neutral-50"><Printer size={14} />Cetak</button>
                                    <hr className="my-2" />
                                    <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"><Trash2 size={14} />Hapus</button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Meta */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border p-5">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div><p className="text-xs text-muted-foreground mb-1">Semester</p><p className="font-medium">{rppData.semester}</p></div>
                    <div><p className="text-xs text-muted-foreground mb-1">Minggu</p><p className="font-medium">{rppData.week}</p></div>
                    <div><p className="text-xs text-muted-foreground mb-1">Dibuat</p><p className="font-medium">{rppData.createdAt}</p></div>
                    <div><p className="text-xs text-muted-foreground mb-1">Diperbarui</p><p className="font-medium">{rppData.updatedAt}</p></div>
                </div>
            </motion.div>

            {/* Kompetensi Dasar */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl border p-6">
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600"><Target size={18} /></div>
                    <h2 className="text-lg font-bold">Kompetensi Dasar</h2>
                </div>
                <p className="text-foreground leading-relaxed">{rppData.kompetensiDasar}</p>
            </motion.div>

            {/* Tujuan Pembelajaran */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-white rounded-2xl border p-6">
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600"><CheckCircle2 size={18} /></div>
                    <h2 className="text-lg font-bold">Tujuan Pembelajaran</h2>
                </div>
                <ol className="space-y-3">
                    {rppData.tujuanPembelajaran.map((tp, i) => (
                        <li key={i} className="flex items-start gap-3">
                            <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-sm flex items-center justify-center shrink-0 font-medium">{i + 1}</span>
                            <span>{tp}</span>
                        </li>
                    ))}
                </ol>
            </motion.div>

            {/* Materi & Metode */}
            <div className="grid md:grid-cols-2 gap-4">
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl border p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center text-violet-600"><BookOpen size={18} /></div>
                        <h2 className="text-lg font-bold">Materi</h2>
                    </div>
                    <ul className="space-y-2">
                        {rppData.materi.map((m, i) => (
                            <li key={i} className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" />{m}</li>
                        ))}
                    </ul>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="bg-white rounded-2xl border p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600"><Users size={18} /></div>
                        <h2 className="text-lg font-bold">Metode</h2>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {rppData.metode.map((m, i) => (
                            <span key={i} className="px-3 py-1.5 bg-amber-50 text-amber-700 rounded-full text-sm font-medium">{m}</span>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Kegiatan Pembelajaran */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-2xl border p-6">
                <div className="flex items-center gap-2 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-rose-100 flex items-center justify-center text-rose-600"><Calendar size={18} /></div>
                    <h2 className="text-lg font-bold">Kegiatan Pembelajaran</h2>
                </div>

                {[
                    { key: "pendahuluan", label: "Pendahuluan", color: "emerald", data: rppData.kegiatan.pendahuluan },
                    { key: "inti", label: "Kegiatan Inti", color: "blue", data: rppData.kegiatan.inti },
                    { key: "penutup", label: "Penutup", color: "amber", data: rppData.kegiatan.penutup },
                ].map((section) => (
                    <div key={section.key} className="mb-6 last:mb-0">
                        <div className="flex items-center gap-2 mb-3">
                            <span className={`px-3 py-1 bg-${section.color}-100 text-${section.color}-700 rounded-full text-sm font-semibold`}>{section.label}</span>
                            <span className="text-xs text-muted-foreground">~{section.data.durasi}</span>
                        </div>
                        <ul className="space-y-2 ml-4">
                            {section.data.aktivitas.map((a, i) => (
                                <li key={i} className="flex items-start gap-2">
                                    <span className={`w-5 h-5 rounded bg-${section.color}-50 text-${section.color}-600 text-xs flex items-center justify-center shrink-0 mt-0.5`}>{i + 1}</span>
                                    {a}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </motion.div>

            {/* Penilaian */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="bg-white rounded-2xl border p-6">
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center text-teal-600"><FileText size={18} /></div>
                    <h2 className="text-lg font-bold">Penilaian</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 bg-neutral-50 rounded-xl"><p className="text-sm font-semibold mb-1">Sikap</p><p className="text-sm text-muted-foreground">{rppData.penilaian.sikap}</p></div>
                    <div className="p-4 bg-neutral-50 rounded-xl"><p className="text-sm font-semibold mb-1">Pengetahuan</p><p className="text-sm text-muted-foreground">{rppData.penilaian.pengetahuan}</p></div>
                    <div className="p-4 bg-neutral-50 rounded-xl"><p className="text-sm font-semibold mb-1">Keterampilan</p><p className="text-sm text-muted-foreground">{rppData.penilaian.keterampilan}</p></div>
                </div>
            </motion.div>

            {/* AI Badge */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-4 border border-primary/10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary"><Sparkles size={20} /></div>
                    <div>
                        <p className="font-medium">Dihasilkan dengan AI Katedra</p>
                        <p className="text-sm text-muted-foreground">Dokumen telah divalidasi sesuai Kurikulum Merdeka</p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
