"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Plus,
    Search,
    ClipboardList,
    BookOpen,
    Download,
    Eye,
    MoreVertical,
    Target,
    Users,
    Sparkles,
} from "lucide-react";

const mockLKPD = [
    { id: "1", title: "LKPD Bilangan Bulat", subject: "Matematika", grade: "Kelas 7", type: "Individu", pages: 8, downloads: 245 },
    { id: "2", title: "LKPD Operasi Pecahan", subject: "Matematika", grade: "Kelas 7", type: "Kelompok", pages: 12, downloads: 189 },
    { id: "3", title: "LKPD Persamaan Linear", subject: "Matematika", grade: "Kelas 7", type: "Individu", pages: 6, downloads: 156 },
    { id: "4", title: "LKPD Teks Naratif", subject: "Bahasa Indonesia", grade: "Kelas 7", type: "Individu", pages: 10, downloads: 134 },
    { id: "5", title: "LKPD Eksplorasi Himpunan", subject: "Matematika", grade: "Kelas 7", type: "Kelompok", pages: 14, downloads: 98 },
];

const typeColors = {
    Individu: "bg-blue-100 text-blue-700",
    Kelompok: "bg-emerald-100 text-emerald-700",
};

export default function LKPDPage() {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredLKPD = mockLKPD.filter(lkpd =>
        (lkpd.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (lkpd.subject || "").toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold font-serif text-foreground">LKPD</h1>
                    <p className="text-muted-foreground mt-1">Lembar Kerja Peserta Didik</p>
                </div>
                <Link href="/dashboard/lkpd/create">
                    <Button className="bg-primary hover:bg-primary-dark text-white rounded-xl shadow-lg shadow-primary/20">
                        <Plus size={18} className="mr-2" />Buat LKPD
                    </Button>
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
                {[
                    { label: "Total LKPD", value: mockLKPD.length, icon: ClipboardList, color: "bg-blue-100 text-blue-600" },
                    { label: "Individu", value: mockLKPD.filter(l => l.type === "Individu").length, icon: Target, color: "bg-violet-100 text-violet-600" },
                    { label: "Kelompok", value: mockLKPD.filter(l => l.type === "Kelompok").length, icon: Users, color: "bg-emerald-100 text-emerald-600" },
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

            {/* Search */}
            <div className="relative max-w-md">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari LKPD..."
                    className="h-12 pl-11 rounded-xl"
                />
            </div>

            {/* LKPD Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredLKPD.map((lkpd, index) => (
                    <motion.div key={lkpd.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}
                        className="bg-white rounded-2xl border overflow-hidden group hover:shadow-lg transition-all">
                        {/* Preview */}
                        <div className="aspect-[4/3] bg-gradient-to-br from-blue-50 to-violet-50 flex items-center justify-center relative">
                            <ClipboardList size={48} className="text-blue-300" />
                            <span className="absolute top-3 left-3 text-xs font-semibold px-2 py-1 bg-white/80 rounded-full">{lkpd.pages} halaman</span>
                            <span className={`absolute top-3 right-3 text-xs font-semibold px-2 py-1 rounded-full ${typeColors[lkpd.type as keyof typeof typeColors]}`}>{lkpd.type}</span>
                        </div>

                        {/* Info */}
                        <div className="p-4">
                            <h3 className="font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">{lkpd.title}</h3>
                            <p className="text-sm text-muted-foreground mt-1">{lkpd.subject} • {lkpd.grade}</p>

                            <div className="flex items-center justify-between mt-4">
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                    <Download size={14} />{lkpd.downloads}
                                </div>
                                <div className="flex items-center gap-1">
                                    <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg"><Eye size={14} /></Button>
                                    <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg"><Download size={14} /></Button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {filteredLKPD.length === 0 && (
                <div className="text-center py-16 bg-white rounded-2xl border">
                    <ClipboardList size={48} className="mx-auto text-muted-foreground/40 mb-4" />
                    <h3 className="text-lg font-bold text-foreground mb-2">Tidak ada LKPD</h3>
                    <p className="text-muted-foreground mb-4">Buat LKPD pertama Anda</p>
                    <Link href="/dashboard/lkpd/create">
                        <Button className="bg-primary text-white rounded-xl"><Plus size={16} className="mr-2" />Buat LKPD</Button>
                    </Link>
                </div>
            )}
        </div>
    );
}
