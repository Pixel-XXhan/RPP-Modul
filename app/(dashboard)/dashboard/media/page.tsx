"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
    Video,
    Image as ImageIcon,
    FileText,
    ExternalLink,
    Sparkles,
    Search,
    BookOpen,
    Play,
    ChevronRight,
    Wand2,
    RefreshCw,
} from "lucide-react";

// Mock AI-recommended media data
const recommendations = [
    {
        id: 1,
        title: "Video Pembelajaran Fotosintesis",
        type: "video",
        source: "YouTube EDU",
        duration: "8:45",
        relevance: 95,
        subject: "IPA",
        grade: "Kelas 7",
        url: "#",
        thumbnail: "/api/placeholder/320/180",
    },
    {
        id: 2,
        title: "Infografis Sistem Peredaran Darah",
        type: "image",
        source: "Khan Academy",
        relevance: 92,
        subject: "IPA",
        grade: "Kelas 8",
        url: "#",
        thumbnail: "/api/placeholder/320/180",
    },
    {
        id: 3,
        title: "Artikel: Penerapan Aljabar dalam Kehidupan",
        type: "article",
        source: "Ruangguru",
        readTime: "5 menit",
        relevance: 88,
        subject: "Matematika",
        grade: "Kelas 7",
        url: "#",
    },
    {
        id: 4,
        title: "Video Animasi: Siklus Air",
        type: "video",
        source: "Zenius",
        duration: "6:30",
        relevance: 90,
        subject: "IPA",
        grade: "Kelas 5",
        url: "#",
        thumbnail: "/api/placeholder/320/180",
    },
    {
        id: 5,
        title: "Simulasi Interaktif: Hukum Newton",
        type: "interactive",
        source: "PhET Simulations",
        relevance: 94,
        subject: "Fisika",
        grade: "Kelas 10",
        url: "#",
    },
    {
        id: 6,
        title: "Podcast: Sejarah Kemerdekaan Indonesia",
        type: "audio",
        source: "Spotify EDU",
        duration: "25:00",
        relevance: 85,
        subject: "IPS",
        grade: "Kelas 8",
        url: "#",
    },
];

const typeIcons: Record<string, React.ElementType> = {
    video: Video,
    image: ImageIcon,
    article: FileText,
    interactive: Play,
    audio: Play,
};

const typeColors: Record<string, string> = {
    video: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
    image: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
    article: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
    interactive: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
    audio: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
};

export default function MediaPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState("all");

    const handleGenerate = async () => {
        setIsGenerating(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsGenerating(false);
    };

    const filteredRecommendations = recommendations.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.subject.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesSubject = selectedSubject === "all" || item.subject === selectedSubject;
        return matchesSearch && matchesSubject;
    });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold font-serif text-foreground flex items-center gap-2">
                        <Sparkles className="text-accent" size={28} />
                        Rekomendasi Media AI
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        AI akan merekomendasikan media pembelajaran yang relevan dengan materi Anda
                    </p>
                </div>
                <Button
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="bg-gradient-to-r from-primary to-primary-light text-white font-semibold rounded-xl shadow-lg"
                >
                    {isGenerating ? (
                        <>
                            <RefreshCw size={18} className="mr-2 animate-spin" />
                            Mencari...
                        </>
                    ) : (
                        <>
                            <Wand2 size={18} className="mr-2" />
                            Generate Rekomendasi
                        </>
                    )}
                </Button>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Cari berdasarkan topik atau mata pelajaran..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-12 pl-12 pr-4 rounded-xl border border-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                </div>
                <select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="h-12 px-4 rounded-xl border border-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                    <option value="all">Semua Mata Pelajaran</option>
                    <option value="IPA">IPA</option>
                    <option value="Matematika">Matematika</option>
                    <option value="IPS">IPS</option>
                    <option value="Fisika">Fisika</option>
                </select>
            </div>

            {/* AI Context Card */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-6 border border-primary/20"
            >
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                        <BookOpen size={24} className="text-primary" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-bold text-foreground mb-1">Cara Kerja</h3>
                        <p className="text-sm text-muted-foreground">
                            AI menganalisis materi pembelajaran Anda dan merekomendasikan media pendukung dari berbagai sumber
                            terpercaya seperti YouTube EDU, Khan Academy, Ruangguru, dan lainnya. Klik "Generate Rekomendasi"
                            untuk mendapatkan rekomendasi baru berdasarkan modul ajar yang sedang Anda kerjakan.
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Recommendations Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredRecommendations.map((item, index) => {
                    const Icon = typeIcons[item.type] || FileText;
                    return (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden hover:shadow-lg transition-shadow group"
                        >
                            {/* Thumbnail placeholder */}
                            {item.thumbnail && (
                                <div className="relative h-40 bg-neutral-100 dark:bg-neutral-800">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Icon size={48} className="text-neutral-300 dark:text-neutral-600" />
                                    </div>
                                    {item.type === "video" && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center">
                                                <Play size={24} className="text-primary ml-1" />
                                            </div>
                                        </div>
                                    )}
                                    <span className="absolute top-3 right-3 text-xs font-bold bg-black/70 text-white px-2 py-1 rounded-lg">
                                        {item.duration || item.readTime || "Interaktif"}
                                    </span>
                                </div>
                            )}

                            <div className="p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${typeColors[item.type]}`}>
                                        {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                                    </span>
                                    <span className="text-xs text-muted-foreground">{item.source}</span>
                                </div>

                                <h3 className="font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                                    {item.title}
                                </h3>

                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">{item.subject} • {item.grade}</span>
                                    <div className="flex items-center gap-1 text-emerald-600">
                                        <Sparkles size={14} />
                                        <span className="font-semibold">{item.relevance}%</span>
                                    </div>
                                </div>

                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full mt-4 rounded-xl"
                                >
                                    Lihat <ExternalLink size={14} className="ml-2" />
                                </Button>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {filteredRecommendations.length === 0 && (
                <div className="text-center py-12">
                    <Search size={48} className="mx-auto text-muted-foreground/30 mb-4" />
                    <p className="text-muted-foreground">Tidak ada rekomendasi yang cocok dengan pencarian Anda</p>
                </div>
            )}
        </div>
    );
}
