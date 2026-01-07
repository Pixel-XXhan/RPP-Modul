"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
    Plus,
    Search,
    Filter,
    Target,
    ChevronRight,
    CheckCircle2,
    Circle,
    MoreVertical,
    Edit,
    Trash2,
    GraduationCap,
} from "lucide-react";
import { useState } from "react";

// Mock data
const mockTPs = [
    {
        id: "1",
        code: "TP-01",
        title: "Siswa dapat menjelaskan konsep bilangan bulat positif dan negatif",
        cpCode: "MAT-D-01",
        cpTitle: "Memahami konsep bilangan bulat",
        subject: "Matematika",
        indicators: [
            "Dapat menyebutkan contoh bilangan bulat positif",
            "Dapat menyebutkan contoh bilangan bulat negatif",
            "Dapat menempatkan bilangan bulat pada garis bilangan",
        ],
        status: "completed",
    },
    {
        id: "2",
        code: "TP-02",
        title: "Siswa dapat melakukan operasi penjumlahan dan pengurangan bilangan bulat",
        cpCode: "MAT-D-01",
        cpTitle: "Memahami konsep bilangan bulat",
        subject: "Matematika",
        indicators: [
            "Dapat menjumlahkan dua bilangan bulat",
            "Dapat mengurangkan dua bilangan bulat",
            "Dapat menyelesaikan soal cerita terkait operasi bilangan",
        ],
        status: "in-progress",
    },
    {
        id: "3",
        code: "TP-03",
        title: "Siswa dapat mengidentifikasi struktur teks narasi",
        cpCode: "BIN-D-01",
        cpTitle: "Memahami teks naratif",
        subject: "Bahasa Indonesia",
        indicators: [
            "Dapat mengidentifikasi orientasi cerita",
            "Dapat mengidentifikasi komplikasi",
            "Dapat mengidentifikasi resolusi",
        ],
        status: "pending",
    },
];

const statusConfig = {
    completed: { label: "Selesai", color: "bg-emerald-100 text-emerald-700", icon: CheckCircle2 },
    "in-progress": { label: "Berlangsung", color: "bg-blue-100 text-blue-700", icon: Target },
    pending: { label: "Belum Mulai", color: "bg-neutral-100 text-neutral-600", icon: Circle },
};

function TPCard({ tp, index }: { tp: typeof mockTPs[0]; index: number }) {
    const [showMenu, setShowMenu] = useState(false);
    const status = statusConfig[tp.status as keyof typeof statusConfig];
    const StatusIcon = status.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-2xl border border-neutral-200 overflow-hidden hover:shadow-lg hover:border-primary/20 transition-all group"
        >
            {/* Header */}
            <div className="p-5 border-b border-neutral-100">
                <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
                            {tp.code}
                        </span>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 ${status.color}`}>
                            <StatusIcon size={12} />
                            {status.label}
                        </span>
                    </div>
                    <div className="relative">
                        <button
                            onClick={() => setShowMenu(!showMenu)}
                            className="p-1.5 rounded-lg hover:bg-neutral-100 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <MoreVertical size={16} />
                        </button>
                        {showMenu && (
                            <>
                                <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)} />
                                <div className="absolute right-0 top-8 w-40 bg-white rounded-xl shadow-lg border border-neutral-200 py-2 z-20">
                                    <button className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-neutral-50">
                                        <Edit size={14} /> Edit
                                    </button>
                                    <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                                        <Trash2 size={14} /> Hapus
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors leading-relaxed">
                    {tp.title}
                </h3>

                {/* CP Reference */}
                <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                    <GraduationCap size={14} className="text-emerald-600" />
                    <span className="font-medium text-emerald-700">{tp.cpCode}</span>
                    <span className="truncate">{tp.cpTitle}</span>
                </div>
            </div>

            {/* Indicators */}
            <div className="p-5 bg-neutral-50/50">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    Indikator ({tp.indicators.length})
                </p>
                <ul className="space-y-2">
                    {tp.indicators.slice(0, 3).map((indicator, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                            <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center shrink-0 mt-0.5">
                                {i + 1}
                            </span>
                            <span className="line-clamp-1">{indicator}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Footer */}
            <div className="px-5 py-3 border-t border-neutral-100 flex items-center justify-between">
                <span className="text-xs text-muted-foreground bg-neutral-100 px-2 py-1 rounded">
                    {tp.subject}
                </span>
                <Link
                    href={`/dashboard/tujuan-pembelajaran/${tp.id}`}
                    className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
                >
                    Detail <ChevronRight size={14} />
                </Link>
            </div>
        </motion.div>
    );
}

export default function TujuanPembelajaranPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState<"all" | "completed" | "in-progress" | "pending">("all");

    const filteredTPs = mockTPs.filter(tp => {
        const matchesSearch = tp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tp.code.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = filterStatus === "all" || tp.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold font-serif text-foreground">Tujuan Pembelajaran</h1>
                    <p className="text-muted-foreground mt-1">Kelola tujuan pembelajaran berdasarkan CP</p>
                </div>
                <Link href="/dashboard/tujuan-pembelajaran/create">
                    <Button className="bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl shadow-lg shadow-primary/20">
                        <Plus size={18} className="mr-2" />
                        Buat TP Baru
                    </Button>
                </Link>
            </div>

            {/* Status Tabs */}
            <div className="flex gap-2 flex-wrap">
                {[
                    { value: "all", label: "Semua" },
                    { value: "completed", label: "Selesai" },
                    { value: "in-progress", label: "Berlangsung" },
                    { value: "pending", label: "Belum Mulai" },
                ].map((status) => (
                    <button
                        key={status.value}
                        onClick={() => setFilterStatus(status.value as any)}
                        className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${filterStatus === status.value
                                ? "bg-primary text-white"
                                : "bg-white border border-neutral-200 text-muted-foreground hover:bg-neutral-50"
                            }`}
                    >
                        {status.label}
                    </button>
                ))}
            </div>

            {/* Search */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Cari tujuan pembelajaran..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-white border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                </div>
                <button className="px-4 py-3 bg-white border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-colors">
                    <Filter size={18} className="text-muted-foreground" />
                </button>
            </div>

            {/* Grid */}
            {filteredTPs.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredTPs.map((tp, index) => (
                        <TPCard key={tp.id} tp={tp} index={index} />
                    ))}
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-16 bg-white rounded-2xl border border-neutral-200"
                >
                    <Target size={48} className="mx-auto text-muted-foreground/40 mb-4" />
                    <h3 className="text-lg font-bold text-foreground mb-2">Belum ada Tujuan Pembelajaran</h3>
                    <p className="text-muted-foreground mb-6">Buat tujuan pembelajaran berdasarkan CP</p>
                    <Link href="/dashboard/tujuan-pembelajaran/create">
                        <Button className="bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl">
                            <Plus size={18} className="mr-2" />
                            Buat TP Pertama
                        </Button>
                    </Link>
                </motion.div>
            )}
        </div>
    );
}
