"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
    Plus,
    Search,
    Filter,
    Library,
    Loader2,
    Trash2,
    Edit,
    BarChart3,
} from "lucide-react";
import { useBankSoal } from "@/hooks/useBankSoal";
import { BankSoal, TipeSoal, TingkatKesulitan } from "@/types/database";

const difficultyColors: Record<TingkatKesulitan, string> = {
    mudah: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    sedang: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    sulit: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

const typeLabels: Record<TipeSoal, string> = {
    "pilihan_ganda": "Pilihan Ganda",
    "essay": "Essay",
    "isian_singkat": "Isian Singkat",
    "benar_salah": "Benar/Salah",
    "menjodohkan": "Menjodohkan",
};

function SoalCard({
    soal,
    index,
    onDelete
}: {
    soal: BankSoal;
    index: number;
    onDelete: (id: string) => void;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-card rounded-2xl border border-border p-5 hover:shadow-lg hover:border-primary/20 transition-all group"
        >
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-muted text-muted-foreground">
                        {typeLabels[soal.tipe] || soal.tipe}
                    </span>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${difficultyColors[soal.tingkat_kesulitan]}`}>
                        {soal.tingkat_kesulitan.charAt(0).toUpperCase() + soal.tingkat_kesulitan.slice(1)}
                    </span>
                </div>
            </div>

            <Link href={`/dashboard/bank-soal/${soal.id}`}>
                <p className="text-foreground group-hover:text-primary transition-colors mb-3 line-clamp-2">
                    {soal.pertanyaan}
                </p>
            </Link>

            <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex gap-2">
                    <Link
                        href={`/dashboard/bank-soal/${soal.id}/edit`}
                        className="p-2 rounded-lg hover:bg-muted text-muted-foreground"
                    >
                        <Edit size={14} />
                    </Link>
                    <button
                        onClick={() => onDelete(soal.id)}
                        className="p-2 rounded-lg hover:bg-red-50 text-muted-foreground hover:text-red-600 dark:hover:bg-red-900/20"
                    >
                        <Trash2 size={14} />
                    </button>
                </div>
                <Link
                    href={`/dashboard/bank-soal/${soal.id}`}
                    className="text-xs font-semibold text-primary hover:underline"
                >
                    Detail →
                </Link>
            </div>
        </motion.div>
    );
}

export default function BankSoalPage() {
    const { data: soalList, loading, error, fetchAll, remove, statistics, fetchStatistics } = useBankSoal();
    const [searchQuery, setSearchQuery] = useState("");
    const [filterType, setFilterType] = useState<"all" | TipeSoal>("all");
    const [filterDifficulty, setFilterDifficulty] = useState<"all" | TingkatKesulitan>("all");

    useEffect(() => {
        fetchAll();
        fetchStatistics();
    }, [fetchAll, fetchStatistics]);

    const handleDelete = async (id: string) => {
        if (confirm("Apakah Anda yakin ingin menghapus soal ini?")) {
            await remove(id);
        }
    };

    const filteredSoal = soalList.filter(s => {
        const matchesSearch = s.pertanyaan.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = filterType === "all" || s.tipe === filterType;
        const matchesDifficulty = filterDifficulty === "all" || s.tingkat_kesulitan === filterDifficulty;
        return matchesSearch && matchesType && matchesDifficulty;
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold font-serif text-foreground">Bank Soal</h1>
                    <p className="text-muted-foreground mt-1">Kelola koleksi soal untuk asesmen</p>
                </div>
                <Link href="/dashboard/bank-soal/create">
                    <Button className="bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl shadow-lg shadow-primary/20">
                        <Plus size={18} className="mr-2" />
                        Tambah Soal Baru
                    </Button>
                </Link>
            </div>

            {/* Statistics Cards */}
            {statistics && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-card rounded-xl border border-border p-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                <BarChart3 size={20} className="text-primary" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-foreground">{statistics.total}</p>
                                <p className="text-sm text-muted-foreground">Total Soal</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-card rounded-xl border border-border p-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                                <span className="text-emerald-500 font-bold">PG</span>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-foreground">{statistics.by_tipe?.pilihan_ganda || 0}</p>
                                <p className="text-sm text-muted-foreground">Pilihan Ganda</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-card rounded-xl border border-border p-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                <span className="text-blue-500 font-bold">E</span>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-foreground">{statistics.by_tipe?.essay || 0}</p>
                                <p className="text-sm text-muted-foreground">Essay</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-card rounded-xl border border-border p-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                                <span className="text-amber-500 font-bold">IS</span>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-foreground">{statistics.by_tipe?.isian_singkat || 0}</p>
                                <p className="text-sm text-muted-foreground">Isian Singkat</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Type Tabs */}
            <div className="flex gap-2 flex-wrap">
                {[
                    { value: "all", label: "Semua" },
                    { value: "pilihan_ganda", label: "Pilihan Ganda" },
                    { value: "essay", label: "Essay" },
                    { value: "isian_singkat", label: "Isian" },
                    { value: "benar_salah", label: "Benar/Salah" },
                ].map((type) => (
                    <button
                        key={type.value}
                        onClick={() => setFilterType(type.value as typeof filterType)}
                        className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${filterType === type.value
                            ? "bg-primary text-white"
                            : "bg-card border border-border text-muted-foreground hover:bg-muted"
                            }`}
                    >
                        {type.label}
                    </button>
                ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Cari soal..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                </div>
                <select
                    value={filterDifficulty}
                    onChange={(e) => setFilterDifficulty(e.target.value as typeof filterDifficulty)}
                    className="px-4 py-3 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium"
                >
                    <option value="all">Semua Tingkat</option>
                    <option value="mudah">Mudah</option>
                    <option value="sedang">Sedang</option>
                    <option value="sulit">Sulit</option>
                </select>
                <button className="px-4 py-3 bg-card border border-border rounded-xl hover:bg-muted transition-colors">
                    <Filter size={18} className="text-muted-foreground" />
                </button>
            </div>

            <div className="text-sm text-muted-foreground">
                Menampilkan <span className="font-semibold text-foreground">{filteredSoal.length}</span> soal
            </div>

            {/* Error State */}
            {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-200">
                    {error}
                </div>
            )}

            {/* Loading State */}
            {loading ? (
                <div className="flex items-center justify-center py-16">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
            ) : filteredSoal.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredSoal.map((soal, index) => (
                        <SoalCard
                            key={soal.id}
                            soal={soal}
                            index={index}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-16 bg-card rounded-2xl border border-border"
                >
                    <Library size={48} className="mx-auto text-muted-foreground/40 mb-4" />
                    <h3 className="text-lg font-bold text-foreground mb-2">Belum ada Soal</h3>
                    <p className="text-muted-foreground mb-6">Tambahkan soal pertama ke bank soal Anda</p>
                    <Link href="/dashboard/bank-soal/create">
                        <Button className="bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl">
                            <Plus size={18} className="mr-2" />
                            Tambah Soal Pertama
                        </Button>
                    </Link>
                </motion.div>
            )}
        </div>
    );
}
