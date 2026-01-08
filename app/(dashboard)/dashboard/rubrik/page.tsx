"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
    Plus,
    Search,
    Filter,
    PenTool,
    ChevronRight,
    Star,
    CheckCircle2,
    MoreVertical,
    Edit,
    Trash2,
    Copy,
} from "lucide-react";
import { useState } from "react";

// Mock data
const mockRubriks = [
    {
        id: "1",
        title: "Rubrik Penilaian Presentasi",
        description: "Rubrik untuk menilai kemampuan presentasi siswa mencakup konten, delivery, dan visual aids.",
        subject: "Umum",
        criteriaCount: 4,
        levelCount: 4,
        usedIn: 5,
        updatedAt: "1 hari lalu",
    },
    {
        id: "2",
        title: "Rubrik Asesmen Proyek Matematika",
        description: "Rubrik penilaian proyek matematika untuk mengukur pemahaman konsep dan penerapan.",
        subject: "Matematika",
        criteriaCount: 5,
        levelCount: 4,
        usedIn: 3,
        updatedAt: "3 hari lalu",
    },
    {
        id: "3",
        title: "Rubrik Menulis Esai Argumentatif",
        description: "Rubrik untuk menilai esai argumentatif meliputi thesis, evidence, dan conclusion.",
        subject: "Bahasa Indonesia",
        criteriaCount: 6,
        levelCount: 4,
        usedIn: 8,
        updatedAt: "1 minggu lalu",
    },
];

function RubrikCard({ rubrik, index }: { rubrik: typeof mockRubriks[0]; index: number }) {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-2xl border border-neutral-200 overflow-hidden hover:shadow-lg hover:border-primary/20 transition-all group"
        >
            {/* Colored Header */}
            <div className="h-2 bg-gradient-to-r from-violet-500 to-purple-500" />

            <div className="p-5">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                    <div className="w-11 h-11 rounded-xl bg-violet-100 flex items-center justify-center text-violet-600">
                        <PenTool size={22} />
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
                                    <button className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-neutral-50">
                                        <Copy size={14} /> Duplikat
                                    </button>
                                    <hr className="my-2" />
                                    <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                                        <Trash2 size={14} /> Hapus
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Content */}
                <Link href={`/dashboard/rubrik/${rubrik.id}`}>
                    <h3 className="font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                        {rubrik.title}
                    </h3>
                </Link>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {rubrik.description}
                </p>

                {/* Matrix Info */}
                <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center gap-1.5 text-sm">
                        <CheckCircle2 size={14} className="text-violet-500" />
                        <span className="text-foreground font-medium">{rubrik.criteriaCount}</span>
                        <span className="text-muted-foreground">kriteria</span>
                    </div>
                    <span className="text-neutral-300">•</span>
                    <div className="flex items-center gap-1.5 text-sm">
                        <Star size={14} className="text-amber-500" />
                        <span className="text-foreground font-medium">{rubrik.levelCount}</span>
                        <span className="text-muted-foreground">level</span>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="bg-neutral-100 px-2 py-1 rounded">{rubrik.subject}</span>
                        <span>• Digunakan {rubrik.usedIn}x</span>
                    </div>
                    <Link
                        href={`/dashboard/rubrik/${rubrik.id}`}
                        className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
                    >
                        Lihat <ChevronRight size={14} />
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}

export default function RubrikPage() {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredRubriks = mockRubriks.filter(r =>
        (r.title || "").toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold font-serif text-foreground">Rubrik Penilaian</h1>
                    <p className="text-muted-foreground mt-1">Kelola rubrik untuk asesmen autentik</p>
                </div>
                <Link href="/dashboard/rubrik/create">
                    <Button className="bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl shadow-lg shadow-primary/20">
                        <Plus size={18} className="mr-2" />
                        Buat Rubrik Baru
                    </Button>
                </Link>
            </div>

            {/* Info */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl p-4 border border-violet-100"
            >
                <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center text-violet-600 shrink-0">
                        <PenTool size={20} />
                    </div>
                    <div>
                        <p className="font-medium text-violet-900">Rubrik untuk Asesmen Autentik</p>
                        <p className="text-sm text-violet-700 mt-1">
                            Buat rubrik dengan kriteria dan level yang jelas untuk menilai kinerja siswa secara objektif.
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Search */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Cari rubrik..."
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
            {filteredRubriks.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredRubriks.map((rubrik, index) => (
                        <RubrikCard key={rubrik.id} rubrik={rubrik} index={index} />
                    ))}
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-16 bg-white rounded-2xl border border-neutral-200"
                >
                    <PenTool size={48} className="mx-auto text-muted-foreground/40 mb-4" />
                    <h3 className="text-lg font-bold text-foreground mb-2">Belum ada Rubrik</h3>
                    <p className="text-muted-foreground mb-6">Buat rubrik penilaian pertama Anda</p>
                    <Link href="/dashboard/rubrik/create">
                        <Button className="bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl">
                            <Plus size={18} className="mr-2" />
                            Buat Rubrik Pertama
                        </Button>
                    </Link>
                </motion.div>
            )}
        </div>
    );
}
