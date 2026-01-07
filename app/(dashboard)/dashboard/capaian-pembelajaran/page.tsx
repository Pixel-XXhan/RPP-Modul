"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
    Plus,
    Search,
    Filter,
    GraduationCap,
    ChevronRight,
    BookOpen,
    Layers,
    Target,
} from "lucide-react";
import { useState } from "react";

// Mock data for Capaian Pembelajaran
const mockCPs = [
    {
        id: "1",
        code: "MAT-D-01",
        title: "Memahami dan menerapkan konsep bilangan bulat dan pecahan dalam berbagai konteks",
        subject: "Matematika",
        phase: "Fase D",
        grade: "Kelas 7-9",
        tpCount: 6,
    },
    {
        id: "2",
        code: "BIN-D-01",
        title: "Memahami, menggunakan, dan menganalisis teks naratif secara lisan dan tulis",
        subject: "Bahasa Indonesia",
        phase: "Fase D",
        grade: "Kelas 7-9",
        tpCount: 8,
    },
    {
        id: "3",
        code: "IPA-D-01",
        title: "Memahami konsep energi, gaya, dan gerak serta penerapannya dalam kehidupan sehari-hari",
        subject: "IPA",
        phase: "Fase D",
        grade: "Kelas 7-9",
        tpCount: 5,
    },
    {
        id: "4",
        code: "IPS-D-01",
        title: "Memahami kondisi geografis Indonesia dan dampaknya terhadap kehidupan sosial ekonomi",
        subject: "IPS",
        phase: "Fase D",
        grade: "Kelas 7-9",
        tpCount: 7,
    },
];

const phases = [
    { value: "all", label: "Semua Fase" },
    { value: "A", label: "Fase A (PAUD)" },
    { value: "B", label: "Fase B (Kelas 1-2)" },
    { value: "C", label: "Fase C (Kelas 3-4)" },
    { value: "D", label: "Fase D (Kelas 7-9)" },
    { value: "E", label: "Fase E (Kelas 10)" },
    { value: "F", label: "Fase F (Kelas 11-12)" },
];

function CPCard({ cp, index }: { cp: typeof mockCPs[0]; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-2xl border border-neutral-200 p-6 hover:shadow-lg hover:border-primary/20 transition-all group"
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center">
                        <GraduationCap size={24} className="text-emerald-600" />
                    </div>
                    <div>
                        <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
                            {cp.code}
                        </span>
                        <p className="text-xs text-muted-foreground mt-1">{cp.phase} • {cp.grade}</p>
                    </div>
                </div>
            </div>

            {/* Title */}
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-4 leading-relaxed">
                {cp.title}
            </h3>

            {/* Subject Tag */}
            <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-medium bg-neutral-100 text-neutral-700 px-2.5 py-1 rounded-full">
                    {cp.subject}
                </span>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Target size={14} className="text-primary" />
                    <span><span className="font-semibold text-foreground">{cp.tpCount}</span> Tujuan Pembelajaran</span>
                </div>
                <button className="flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
                    Detail <ChevronRight size={14} />
                </button>
            </div>
        </motion.div>
    );
}

export default function CapaianPembelajaranPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedPhase, setSelectedPhase] = useState("all");
    const [selectedSubject, setSelectedSubject] = useState("all");

    const subjects = ["all", ...new Set(mockCPs.map(cp => cp.subject))];

    const filteredCPs = mockCPs.filter(cp => {
        const matchesSearch = cp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            cp.code.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesSubject = selectedSubject === "all" || cp.subject === selectedSubject;
        return matchesSearch && matchesSubject;
    });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold font-serif text-foreground">Capaian Pembelajaran</h1>
                    <p className="text-muted-foreground mt-1">Database CP sesuai Kurikulum Merdeka</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground bg-neutral-100 px-3 py-1 rounded-full">
                        📚 {mockCPs.length} CP tersedia
                    </span>
                </div>
            </div>

            {/* Info Banner */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-4 border border-emerald-100"
            >
                <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                        <Layers size={20} />
                    </div>
                    <div>
                        <p className="font-medium text-emerald-900">Database Capaian Pembelajaran Terintegrasi</p>
                        <p className="text-sm text-emerald-700 mt-1">
                            Pilih CP yang sesuai untuk modul ajar Anda. Data selalu diperbarui sesuai regulasi Kemendikbudristek terbaru.
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-3">
                {/* Search */}
                <div className="flex-1 relative">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Cari berdasarkan kode atau judul CP..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-white border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                </div>

                {/* Subject Filter */}
                <select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="px-4 py-3 bg-white border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium min-w-[180px]"
                >
                    <option value="all">Semua Mata Pelajaran</option>
                    {subjects.filter(s => s !== "all").map(subject => (
                        <option key={subject} value={subject}>{subject}</option>
                    ))}
                </select>

                {/* Phase Filter */}
                <select
                    value={selectedPhase}
                    onChange={(e) => setSelectedPhase(e.target.value)}
                    className="px-4 py-3 bg-white border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium min-w-[160px]"
                >
                    {phases.map(phase => (
                        <option key={phase.value} value={phase.value}>{phase.label}</option>
                    ))}
                </select>
            </div>

            {/* Results Count */}
            <div className="text-sm text-muted-foreground">
                Menampilkan <span className="font-semibold text-foreground">{filteredCPs.length}</span> Capaian Pembelajaran
            </div>

            {/* Grid */}
            {filteredCPs.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-4">
                    {filteredCPs.map((cp, index) => (
                        <CPCard key={cp.id} cp={cp} index={index} />
                    ))}
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-16 bg-white rounded-2xl border border-neutral-200"
                >
                    <GraduationCap size={48} className="mx-auto text-muted-foreground/40 mb-4" />
                    <h3 className="text-lg font-bold text-foreground mb-2">Tidak ditemukan</h3>
                    <p className="text-muted-foreground mb-6">Coba ubah kata kunci atau filter pencarian</p>
                </motion.div>
            )}
        </div>
    );
}
