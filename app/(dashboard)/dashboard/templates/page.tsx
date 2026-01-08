"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Search,
    FileText,
    BookOpen,
    ListChecks,
    Target,
    Copy,
    Eye,
    Sparkles,
    CheckCircle,
} from "lucide-react";

const categories = [
    { id: "all", label: "Semua", count: 48 },
    { id: "modul-ajar", label: "Modul Ajar", count: 15 },
    { id: "rpp", label: "RPP", count: 12 },
    { id: "silabus", label: "Silabus", count: 8 },
    { id: "asesmen", label: "Asesmen", count: 10 },
    { id: "rubrik", label: "Rubrik", count: 3 },
];

const mockTemplates = [
    { id: "1", title: "Template Modul Ajar Lengkap", category: "modul-ajar", subject: "Umum", description: "Template standar untuk pembuatan Modul Ajar Kurikulum Merdeka", isPremium: false },
    { id: "2", title: "RPP Kurikulum Merdeka", category: "rpp", subject: "Umum", description: "Format RPP sesuai dengan pedoman terbaru Kemendikbud", isPremium: false },
    { id: "3", title: "Silabus 1 Semester", category: "silabus", subject: "Umum", description: "Template silabus untuk perencanaan semester", isPremium: false },
    { id: "4", title: "Template Asesmen Formatif", category: "asesmen", subject: "Umum", description: "Template untuk membuat asesmen formatif yang efektif", isPremium: false },
    { id: "5", title: "Modul Ajar Matematika SD", category: "modul-ajar", subject: "Matematika", description: "Modul ajar khusus untuk mata pelajaran Matematika SD", isPremium: true },
    { id: "6", title: "RPP Bahasa Indonesia SMP", category: "rpp", subject: "B. Indonesia", description: "RPP lengkap untuk Bahasa Indonesia jenjang SMP", isPremium: true },
    { id: "7", title: "Rubrik Penilaian Proyek", category: "rubrik", subject: "Umum", description: "Template rubrik untuk penilaian berbasis proyek", isPremium: false },
    { id: "8", title: "Template Kisi-Kisi UTS", category: "asesmen", subject: "Umum", description: "Template kisi-kisi untuk ujian tengah semester", isPremium: false },
];

const categoryIcons: Record<string, typeof FileText> = {
    "modul-ajar": BookOpen,
    "rpp": FileText,
    "silabus": ListChecks,
    "asesmen": Target,
    "rubrik": CheckCircle,
};

export default function TemplatesPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("all");

    const filteredTemplates = mockTemplates.filter(template => {
        const matchesSearch = !searchQuery || (template.title || "").toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = activeCategory === "all" || template.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold font-serif text-foreground">Template Library</h1>
                    <p className="text-muted-foreground mt-1">Gunakan template siap pakai untuk mempercepat kerja Anda</p>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Cari template..."
                        className="h-12 pl-11 rounded-xl"
                    />
                </div>
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                    <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${activeCategory === cat.id
                            ? "bg-primary text-white"
                            : "bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-muted-foreground hover:bg-neutral-50 dark:hover:bg-neutral-800"
                            }`}>
                        {cat.label}
                        <span className={`text-xs px-1.5 py-0.5 rounded ${activeCategory === cat.id ? "bg-white/20" : "bg-neutral-100 dark:bg-neutral-700"}`}>{cat.count}</span>
                    </button>
                ))}
            </div>

            {/* Templates Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredTemplates.map((template, index) => {
                    const Icon = categoryIcons[template.category] || FileText;
                    return (
                        <motion.div key={template.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}
                            className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden group hover:shadow-lg transition-all">
                            {/* Preview */}
                            <div className="aspect-[4/3] bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-700 flex items-center justify-center relative">
                                <Icon size={48} className="text-neutral-400 dark:text-neutral-500" />
                                {template.isPremium && (
                                    <span className="absolute top-3 right-3 px-2 py-1 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-bold rounded-full flex items-center gap-1">
                                        <Sparkles size={10} />Premium
                                    </span>
                                )}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                    <Button size="sm" className="bg-white text-foreground rounded-lg"><Eye size={14} className="mr-1" />Preview</Button>
                                </div>
                            </div>

                            {/* Info */}
                            <div className="p-4">
                                <p className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">{template.title}</p>
                                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{template.description}</p>

                                <div className="flex items-center gap-2 mt-3">
                                    <span className="text-xs px-2 py-1 bg-neutral-100 dark:bg-neutral-800 text-muted-foreground rounded-lg">{template.subject}</span>
                                    <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-lg capitalize">{template.category.replace("-", " ")}</span>
                                </div>

                                <Button variant="outline" className="w-full mt-4 rounded-xl group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-colors">
                                    <Copy size={14} className="mr-2" />Gunakan Template
                                </Button>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {filteredTemplates.length === 0 && (
                <div className="text-center py-16 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800">
                    <FileText size={48} className="mx-auto text-muted-foreground/40 mb-4" />
                    <h3 className="text-lg font-bold text-foreground mb-2">Tidak ada template</h3>
                    <p className="text-muted-foreground">Coba kata kunci atau kategori lain</p>
                </div>
            )}
        </div>
    );
}
