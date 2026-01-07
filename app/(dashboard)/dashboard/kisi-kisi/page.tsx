"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
    Plus,
    Search,
    Filter,
    Grid3X3,
    ChevronRight,
    FileQuestion,
    BarChart3,
    Target,
} from "lucide-react";
import { useState } from "react";

// Mock data
const mockKisiKisi = [
    {
        id: "1",
        title: "Kisi-Kisi UTS Matematika Kelas 7",
        subject: "Matematika",
        grade: "Kelas 7",
        type: "UTS",
        questionCount: 25,
        cpCount: 3,
        updatedAt: "1 hari lalu",
    },
    {
        id: "2",
        title: "Kisi-Kisi UAS Bahasa Indonesia Kelas 8",
        subject: "Bahasa Indonesia",
        grade: "Kelas 8",
        type: "UAS",
        questionCount: 40,
        cpCount: 5,
        updatedAt: "3 hari lalu",
    },
    {
        id: "3",
        title: "Kisi-Kisi Ulangan Harian IPA Bab 3",
        subject: "IPA",
        grade: "Kelas 9",
        type: "UH",
        questionCount: 15,
        cpCount: 2,
        updatedAt: "1 minggu lalu",
    },
];

const typeColors = {
    UTS: "bg-blue-100 text-blue-700",
    UAS: "bg-emerald-100 text-emerald-700",
    UH: "bg-amber-100 text-amber-700",
};

function KisiKisiCard({ kisi, index }: { kisi: typeof mockKisiKisi[0]; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-2xl border border-neutral-200 p-5 hover:shadow-lg hover:border-primary/20 transition-all group"
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="w-11 h-11 rounded-xl bg-teal-100 flex items-center justify-center text-teal-600">
                    <Grid3X3 size={22} />
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${typeColors[kisi.type as keyof typeof typeColors]}`}>
                    {kisi.type}
                </span>
            </div>

            {/* Content */}
            <Link href={`/dashboard/kisi-kisi/${kisi.id}`}>
                <h3 className="font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                    {kisi.title}
                </h3>
            </Link>

            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <span>{kisi.subject}</span>
                <span>•</span>
                <span>{kisi.grade}</span>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-neutral-50 rounded-xl p-3 text-center">
                    <div className="flex items-center justify-center gap-1.5 mb-1">
                        <FileQuestion size={14} className="text-muted-foreground" />
                        <span className="text-lg font-bold text-foreground">{kisi.questionCount}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">Soal</span>
                </div>
                <div className="bg-neutral-50 rounded-xl p-3 text-center">
                    <div className="flex items-center justify-center gap-1.5 mb-1">
                        <Target size={14} className="text-muted-foreground" />
                        <span className="text-lg font-bold text-foreground">{kisi.cpCount}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">CP/KD</span>
                </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                <span className="text-xs text-muted-foreground">{kisi.updatedAt}</span>
                <Link
                    href={`/dashboard/kisi-kisi/${kisi.id}`}
                    className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
                >
                    Lihat <ChevronRight size={14} />
                </Link>
            </div>
        </motion.div>
    );
}

export default function KisiKisiPage() {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredKisiKisi = mockKisiKisi.filter(k =>
        k.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold font-serif text-foreground">Kisi-Kisi</h1>
                    <p className="text-muted-foreground mt-1">Blueprint pemetaan soal ujian</p>
                </div>
                <Link href="/dashboard/kisi-kisi/create">
                    <Button className="bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl shadow-lg shadow-primary/20">
                        <Plus size={18} className="mr-2" />
                        Buat Kisi-Kisi
                    </Button>
                </Link>
            </div>

            {/* Search */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Cari kisi-kisi..."
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
            {filteredKisiKisi.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredKisiKisi.map((kisi, index) => (
                        <KisiKisiCard key={kisi.id} kisi={kisi} index={index} />
                    ))}
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-16 bg-white rounded-2xl border border-neutral-200"
                >
                    <Grid3X3 size={48} className="mx-auto text-muted-foreground/40 mb-4" />
                    <h3 className="text-lg font-bold text-foreground mb-2">Belum ada Kisi-Kisi</h3>
                    <p className="text-muted-foreground mb-6">Buat kisi-kisi ujian pertama</p>
                    <Link href="/dashboard/kisi-kisi/create">
                        <Button className="bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl">
                            <Plus size={18} className="mr-2" />
                            Buat Kisi-Kisi Pertama
                        </Button>
                    </Link>
                </motion.div>
            )}
        </div>
    );
}
