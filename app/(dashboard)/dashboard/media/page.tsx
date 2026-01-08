"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Video,
    Image as ImageIcon,
    FileText,
    ExternalLink,
    Sparkles,
    Search,
    BookOpen,
    Play,
    Wand2,
    Loader2,
    AlertCircle,
} from "lucide-react";
import { api } from "@/lib/api";

const typeIcons: Record<string, React.ElementType> = {
    video: Video,
    gambar: ImageIcon,
    audio: Play,
    interaktif: Play,
    dokumen: FileText,
};

const typeColors: Record<string, string> = {
    video: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
    gambar: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
    audio: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
    interaktif: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
    dokumen: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
};

export default function MediaPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        subject: "",
        topic: "",
        grade: "",
        model: "gemini-2.5-flash"
    });
    const [recommendations, setRecommendations] = useState<any[]>([]);

    const handleGenerate = async () => {
        if (!formData.subject || !formData.topic) {
            setError("Mohon isi Mata Pelajaran dan Topik terlebih dahulu");
            return;
        }
        setIsGenerating(true);
        setError(null);
        try {
            const result = await api.post<any>('/api/v2/media/recommend', {
                mapel: formData.subject,
                topik: formData.topic,
                kelas: formData.grade || "Umum",
                model: formData.model
            });

            if (result.recommendations && Array.isArray(result.recommendations)) {
                setRecommendations(result.recommendations);
            } else if (Array.isArray(result)) {
                setRecommendations(result);
            }
        } catch (err: any) {
            console.error(err);
            setError(err?.message || "Gagal mendapatkan rekomendasi. Silakan coba lagi.");
        } finally {
            setIsGenerating(false);
        }
    };

    const filteredRecommendations = recommendations.filter(item => {
        if (!searchQuery) return true;
        const title = item.judul || item.title || "";
        return title.toLowerCase().includes(searchQuery.toLowerCase());
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
            </div>

            {/* Error Display */}
            {error && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                    className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4 border border-red-200 dark:border-red-800 flex items-center gap-3">
                    <AlertCircle className="text-red-600 shrink-0" size={20} />
                    <p className="text-red-800 dark:text-red-200 text-sm flex-1">{error}</p>
                    <Button variant="ghost" size="sm" onClick={() => setError(null)}>Tutup</Button>
                </motion.div>
            )}

            {/* AI Context Card with Form */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-6 border border-primary/20"
            >
                <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                        <BookOpen size={24} className="text-primary" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-bold text-foreground mb-1">Generate Rekomendasi</h3>
                        <p className="text-sm text-muted-foreground">
                            Isi informasi di bawah untuk mendapatkan rekomendasi media pembelajaran dari AI
                        </p>
                    </div>
                </div>

                <div className="grid md:grid-cols-4 gap-4 mb-4">
                    <Input
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="Mata Pelajaran"
                        className="h-12 rounded-xl bg-white dark:bg-background"
                    />
                    <Input
                        value={formData.topic}
                        onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                        placeholder="Topik (Fotosintesis, Aljabar)"
                        className="h-12 rounded-xl bg-white dark:bg-background"
                    />
                    <Input
                        value={formData.grade}
                        onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                        placeholder="Kelas (X PPLG, XI TMS)"
                        className="h-12 rounded-xl bg-white dark:bg-background"
                    />
                    <select
                        value={formData.model}
                        onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                        className="h-12 px-4 rounded-xl border border-border bg-white dark:bg-background text-foreground"
                    >
                        <option value="gemini-2.5-flash">Flash (Cepat)</option>
                        <option value="gemini-2.5-pro">Pro (Detail)</option>
                        <option value="gemini-3-pro-preview">Pro 3 Preview (Terbaru)</option>
                    </select>
                </div>

                <Button
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="w-full bg-primary text-white font-semibold rounded-xl h-14 shadow-lg"
                >
                    {isGenerating ? (
                        <>
                            <Loader2 size={18} className="mr-2 animate-spin" />
                            Mencari Rekomendasi...
                        </>
                    ) : (
                        <>
                            <Wand2 size={18} className="mr-2" />
                            Generate Rekomendasi
                        </>
                    )}
                </Button>
            </motion.div>

            {/* Search */}
            {recommendations.length > 0 && (
                <div className="relative">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Cari hasil rekomendasi..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-12 pl-12 pr-4 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                </div>
            )}

            {/* Recommendations Grid */}
            {filteredRecommendations.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredRecommendations.map((item, index) => {
                        const jenis = item.jenis || "dokumen";
                        const Icon = typeIcons[jenis] || FileText;
                        return (
                            <motion.div
                                key={item.id || index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-shadow group"
                            >
                                {/* Thumbnail placeholder */}
                                <div className="relative h-40 bg-muted">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Icon size={48} className="text-muted-foreground/30" />
                                    </div>
                                    {jenis === "video" && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center">
                                                <Play size={24} className="text-primary ml-1" />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${typeColors[jenis] || typeColors.dokumen}`}>
                                            {(jenis || 'dokumen').charAt(0).toUpperCase() + (jenis || 'dokumen').slice(1)}
                                        </span>
                                    </div>

                                    <h3 className="font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                                        {item.judul || item.title}
                                    </h3>

                                    {item.deskripsi && (
                                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{item.deskripsi}</p>
                                    )}

                                    {item.url && (
                                        <a href={item.url} target="_blank" rel="noopener noreferrer">
                                            <Button variant="outline" size="sm" className="w-full rounded-xl">
                                                Lihat <ExternalLink size={14} className="ml-2" />
                                            </Button>
                                        </a>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            ) : recommendations.length === 0 && !isGenerating ? (
                <div className="text-center py-12 bg-card rounded-2xl border border-border">
                    <Search size={48} className="mx-auto text-muted-foreground/30 mb-4" />
                    <p className="text-muted-foreground">Isi form di atas dan klik "Generate Rekomendasi" untuk mendapatkan saran media pembelajaran</p>
                </div>
            ) : null}
        </div>
    );
}
