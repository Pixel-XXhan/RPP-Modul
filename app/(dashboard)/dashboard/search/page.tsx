"use client";

import { useState, useEffect, useCallback } from "react";
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
    X,
    Clock,
    ChevronRight,
    Loader2,
    Trash2,
} from "lucide-react";
import { api } from "@/lib/api";
import { useLocalSettings } from "@/hooks/useLocalSettings";

const categories = [
    { id: "all", label: "Semua", icon: Grid3X3 },
    { id: "modul-ajar", label: "Modul Ajar", icon: BookOpen },
    { id: "rpp", label: "RPP", icon: FileText },
    { id: "silabus", label: "Silabus", icon: ListChecks },
    { id: "asesmen", label: "Asesmen", icon: Target },
    { id: "materi", label: "Materi", icon: Video },
];

const typeConfig: Record<string, { icon: typeof BookOpen; color: string; darkColor: string; label: string }> = {
    "modul-ajar": { icon: BookOpen, color: "bg-blue-100 text-blue-600", darkColor: "dark:bg-blue-900/30 dark:text-blue-400", label: "Modul Ajar" },
    "rpp": { icon: FileText, color: "bg-emerald-100 text-emerald-600", darkColor: "dark:bg-emerald-900/30 dark:text-emerald-400", label: "RPP" },
    "silabus": { icon: ListChecks, color: "bg-violet-100 text-violet-600", darkColor: "dark:bg-violet-900/30 dark:text-violet-400", label: "Silabus" },
    "asesmen": { icon: Target, color: "bg-rose-100 text-rose-600", darkColor: "dark:bg-rose-900/30 dark:text-rose-400", label: "Asesmen" },
    "materi": { icon: Video, color: "bg-amber-100 text-amber-600", darkColor: "dark:bg-amber-900/30 dark:text-amber-400", label: "Materi" },
};

interface SearchResult {
    id: string;
    type: string;
    title: string;
    subject?: string;
    grade?: string;
    date: string;
}

// Debounce hook
function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

export default function SearchPage() {
    const [query, setQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [isSearching, setIsSearching] = useState(false);
    const [results, setResults] = useState<SearchResult[]>([]);
    const [hasSearched, setHasSearched] = useState(false);

    const { settings, addRecentSearch, clearRecentSearches } = useLocalSettings();
    const debouncedQuery = useDebounce(query, 300);

    // Format date helper
    const formatTimeAgo = (dateStr?: string) => {
        if (!dateStr) return 'Baru saja';
        const date = new Date(dateStr);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 60) return `${diffMins} menit lalu`;
        if (diffHours < 24) return `${diffHours} jam lalu`;
        if (diffDays < 7) return `${diffDays} hari lalu`;
        return `${diffDays} hari lalu`;
    };

    // Search function
    const performSearch = useCallback(async (searchQuery: string, category: string) => {
        if (!searchQuery.trim()) {
            setResults([]);
            setHasSearched(false);
            return;
        }

        setIsSearching(true);
        setHasSearched(true);

        try {
            const searchResults: SearchResult[] = [];
            const endpoints = category === "all"
                ? ["modul-ajar", "rpp", "silabus", "asesmen", "materi"]
                : [category];

            const responses = await Promise.all(
                endpoints.map(endpoint =>
                    api.get<any[]>(`/api/v2/${endpoint}`, { search: searchQuery, limit: 10 })
                        .then(res => ({ endpoint, data: Array.isArray(res) ? res : [] }))
                        .catch(() => ({ endpoint, data: [] }))
                )
            );

            for (const { endpoint, data } of responses) {
                for (const item of data) {
                    searchResults.push({
                        id: item.id,
                        type: endpoint,
                        title: item.judul || item.title || `${typeConfig[endpoint]?.label || endpoint}`,
                        subject: item.mapel || item.mata_pelajaran || '',
                        grade: item.kelas || '',
                        date: formatTimeAgo(item.updated_at || item.created_at),
                    });
                }
            }

            setResults(searchResults);

            // Save to recent searches
            if (searchQuery.trim().length >= 2) {
                addRecentSearch(searchQuery.trim());
            }
        } catch (error) {
            console.error('Search failed:', error);
            setResults([]);
        } finally {
            setIsSearching(false);
        }
    }, [addRecentSearch]);

    // Effect to search when debounced query changes
    useEffect(() => {
        if (debouncedQuery) {
            performSearch(debouncedQuery, selectedCategory);
        } else {
            setResults([]);
            setHasSearched(false);
        }
    }, [debouncedQuery, selectedCategory, performSearch]);

    // Filter results by category (for local filtering after fetch)
    const filteredResults = results.filter(result => {
        if (selectedCategory === "all") return true;
        return result.type === selectedCategory;
    });

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
                    placeholder="Cari modul ajar, RPP, silabus, asesmen..."
                    className="h-14 pl-12 pr-24 rounded-2xl text-lg border-2 border-border focus:border-primary bg-background"
                />
                {isSearching && (
                    <Loader2 size={20} className="absolute right-20 top-1/2 -translate-y-1/2 animate-spin text-primary" />
                )}
                {query && !isSearching && (
                    <button onClick={() => setQuery("")} className="absolute right-20 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded-full">
                        <X size={16} className="text-muted-foreground" />
                    </button>
                )}
                <Button onClick={() => performSearch(query, selectedCategory)} className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground rounded-xl h-10">
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
                                ? "bg-primary text-primary-foreground"
                                : "bg-card border border-border text-muted-foreground hover:bg-muted"
                                }`}>
                            <Icon size={16} />{cat.label}
                        </button>
                    );
                })}
            </div>

            {/* Recent Searches (when no query) */}
            {!query && settings.recentSearches.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-2xl border border-border p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <Clock size={18} className="text-muted-foreground" />
                            <h2 className="font-semibold text-foreground">Pencarian Terakhir</h2>
                        </div>
                        <button onClick={clearRecentSearches} className="text-xs text-muted-foreground hover:text-destructive flex items-center gap-1">
                            <Trash2 size={12} />
                            Hapus Semua
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {settings.recentSearches.map((search, i) => (
                            <button key={i} onClick={() => setQuery(search)}
                                className="px-3 py-1.5 bg-muted hover:bg-muted/80 rounded-full text-sm text-muted-foreground transition-colors">
                                {search}
                            </button>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* Search Results */}
            {hasSearched && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-2xl border border-border overflow-hidden">
                    <div className="p-4 border-b border-border bg-muted/50">
                        <p className="text-sm text-muted-foreground">
                            {isSearching ? (
                                "Mencari..."
                            ) : (
                                <>{filteredResults.length} hasil untuk <span className="font-semibold text-foreground">"{query}"</span></>
                            )}
                        </p>
                    </div>

                    {filteredResults.length > 0 ? (
                        <div className="divide-y divide-border">
                            {filteredResults.map((result, index) => {
                                const config = typeConfig[result.type] || typeConfig['rpp'];
                                const Icon = config.icon;
                                return (
                                    <motion.div key={result.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.05 }}>
                                        <Link href={`/dashboard/${result.type}/${result.id}`}
                                            className="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors group">
                                            <div className={`w-12 h-12 rounded-xl ${config.color} ${config.darkColor} flex items-center justify-center shrink-0`}>
                                                <Icon size={24} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className={`text-xs font-semibold px-2 py-0.5 rounded ${config.color} ${config.darkColor}`}>{config.label}</span>
                                                </div>
                                                <p className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">{result.title}</p>
                                                {(result.subject || result.grade) && (
                                                    <p className="text-sm text-muted-foreground">{[result.subject, result.grade].filter(Boolean).join(' • ')}</p>
                                                )}
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
                    ) : !isSearching && (
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
