"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
    Search as SearchIcon,
    FileText,
    BookOpen,
    Target,
    ListChecks,
    Grid3X3,
    Video,
    Filter,
    X,
    Clock,
    ChevronRight,
} from "lucide-react";

const categories = [
    { id: "all", label: "Semua", icon: Grid3X3 },
    { id: "modul-ajar", label: "Modul Ajar", icon: BookOpen },
    { id: "rpp", label: "RPP", icon: FileText },
    { id: "silabus", label: "Silabus", icon: ListChecks },
    { id: "asesmen", label: "Asesmen", icon: Target },
    { id: "materi", label: "Materi", icon: Video },
];

const mockResults = [
    { id: "1", type: "modul-ajar", title: "Modul Ajar Matematika - Aljabar Dasar", subject: "Matematika", grade: "Kelas 7", date: "2 jam lalu" },
    { id: "2", type: "rpp", title: "RPP Persamaan Linear Satu Variabel", subject: "Matematika", grade: "Kelas 7", date: "Kemarin" },
    { id: "3", type: "materi", title: "Pengenalan Bilangan Bulat", subject: "Matematika", grade: "Kelas 7", date: "3 hari lalu" },
    { id: "4", type: "silabus", title: "Silabus Matematika Semester 1", subject: "Matematika", grade: "Kelas 7", date: "1 minggu lalu" },
    { id: "5", type: "asesmen", title: "Asesmen Sumatif Bab 1", subject: "Matematika", grade: "Kelas 7", date: "2 minggu lalu" },
    { id: "6", type: "modul-ajar", title: "Modul Ajar Bahasa Indonesia - Teks Naratif", subject: "Bahasa Indonesia", grade: "Kelas 7", date: "2 minggu lalu" },
];

const recentSearches = ["bilangan bulat", "persamaan linear", "RPP matematika", "silabus kelas 7"];

const typeConfig: Record<string, { icon: typeof BookOpen; color: string; label: string }> = {
    "modul-ajar": { icon: BookOpen, color: "bg-blue-100 text-blue-600", label: "Modul Ajar" },
    "rpp": { icon: FileText, color: "bg-emerald-100 text-emerald-600", label: "RPP" },
    "silabus": { icon: ListChecks, color: "bg-violet-100 text-violet-600", label: "Silabus" },
    "asesmen": { icon: Target, color: "bg-rose-100 text-rose-600", label: "Asesmen" },
    "materi": { icon: Video, color: "bg-amber-100 text-amber-600", label: "Materi" },
};

export default function SearchPage() {
    const [query, setQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [isSearching, setIsSearching] = useState(false);

    const filteredResults = mockResults.filter(result => {
        const matchesQuery = !query || (result.title || "").toLowerCase().includes(query.toLowerCase());
        const matchesCategory = selectedCategory === "all" || result.type === selectedCategory;
        return matchesQuery && matchesCategory;
    });

    const handleSearch = () => {
        if (!query) return;
        setIsSearching(true);
        setTimeout(() => setIsSearching(false), 500);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Search Header */}
            <div>
                <h1 className="text-2xl md:text-3xl font-bold font-serif text-foreground">Pencarian</h1>
                <p className="text-muted-foreground mt-1">Cari dokumen di seluruh perpustakaan Anda</p>
            </div>

            {/* Search Bar */}
            <div className="relative">
                <SearchIcon size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    placeholder="Cari modul ajar, RPP, silabus, asesmen..."
                    className="h-14 pl-12 pr-24 rounded-2xl text-lg border-2 border-neutral-200 focus:border-primary"
                />
                {query && (
                    <button onClick={() => setQuery("")} className="absolute right-20 top-1/2 -translate-y-1/2 p-1 hover:bg-neutral-100 rounded-full">
                        <X size={16} className="text-muted-foreground" />
                    </button>
                )}
                <Button onClick={handleSearch} className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-white rounded-xl h-10">
                    Cari
                </Button>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
                {categories.map((cat) => {
                    const Icon = cat.icon;
                    return (
                        <button key={cat.id} onClick={() => setSelectedCategory(cat.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${selectedCategory === cat.id
                                ? "bg-primary text-white"
                                : "bg-white border border-neutral-200 text-muted-foreground hover:bg-neutral-50"
                                }`}>
                            <Icon size={16} />{cat.label}
                        </button>
                    );
                })}
            </div>

            {/* Recent Searches (when no query) */}
            {!query && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Clock size={18} className="text-muted-foreground" />
                        <h2 className="font-semibold">Pencarian Terakhir</h2>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {recentSearches.map((search, i) => (
                            <button key={i} onClick={() => setQuery(search)}
                                className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 rounded-full text-sm text-muted-foreground transition-colors">
                                {search}
                            </button>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* Search Results */}
            {query && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border overflow-hidden">
                    <div className="p-4 border-b bg-neutral-50">
                        <p className="text-sm text-muted-foreground">
                            {filteredResults.length} hasil untuk <span className="font-semibold text-foreground">"{query}"</span>
                        </p>
                    </div>

                    {filteredResults.length > 0 ? (
                        <div className="divide-y">
                            {filteredResults.map((result, index) => {
                                const config = typeConfig[result.type];
                                const Icon = config.icon;
                                return (
                                    <motion.div key={result.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.05 }}>
                                        <Link href={`/dashboard/${result.type}/${result.id}`}
                                            className="flex items-center gap-4 p-4 hover:bg-neutral-50 transition-colors group">
                                            <div className={`w-12 h-12 rounded-xl ${config.color} flex items-center justify-center shrink-0`}>
                                                <Icon size={24} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className={`text-xs font-semibold px-2 py-0.5 rounded ${config.color}`}>{config.label}</span>
                                                </div>
                                                <p className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">{result.title}</p>
                                                <p className="text-sm text-muted-foreground">{result.subject} • {result.grade}</p>
                                            </div>
                                            <div className="text-right shrink-0">
                                                <p className="text-xs text-muted-foreground">{result.date}</p>
                                                <ChevronRight size={16} className="text-muted-foreground ml-auto mt-1 group-hover:text-primary transition-colors" />
                                            </div>
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <SearchIcon size={48} className="mx-auto text-muted-foreground/40 mb-4" />
                            <h3 className="text-lg font-bold text-foreground mb-2">Tidak ada hasil</h3>
                            <p className="text-muted-foreground">Coba kata kunci lain atau kategori berbeda</p>
                        </div>
                    )}
                </motion.div>
            )}
        </div>
    );
}
