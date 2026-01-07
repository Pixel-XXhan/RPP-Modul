"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
    Plus,
    Search,
    Filter,
    ClipboardList,
    FileCheck,
    ChevronRight,
    Loader2,
    Trash2,
} from "lucide-react";
import { useAsesmen } from "@/hooks/useAsesmen";
import { Asesmen } from "@/types/database";

function AsesmenCard({
    asesmen,
    index,
    onDelete,
}: {
    asesmen: Asesmen;
    index: number;
    onDelete: (id: string) => void;
}) {
    const isFormatif = asesmen.jenis === "formatif";

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-card rounded-2xl border border-border p-5 hover:shadow-lg hover:border-primary/20 transition-all group"
        >
            <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isFormatif
                    ? "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
                    : "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                    }`}>
                    {isFormatif ? <ClipboardList size={24} /> : <FileCheck size={24} />}
                </div>
                <div className="flex items-center gap-2">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${isFormatif
                        ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                        : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                        }`}>
                        {isFormatif ? "Formatif" : "Sumatif"}
                    </span>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${asesmen.status === "published"
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                        : "bg-muted text-muted-foreground"
                        }`}>
                        {asesmen.status === "published" ? "Dipublikasi" : "Draft"}
                    </span>
                </div>
            </div>

            <Link href={`/dashboard/asesmen/${asesmen.id}`}>
                <h3 className="font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                    {asesmen.judul}
                </h3>
            </Link>

            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <span>Kelas {asesmen.kelas}</span>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                        <span className="font-semibold text-foreground">
                            {asesmen.soal?.length || 0}
                        </span> Soal
                    </span>
                    <button
                        onClick={() => onDelete(asesmen.id)}
                        className="p-2 rounded-lg hover:bg-red-50 text-muted-foreground hover:text-red-600 dark:hover:bg-red-900/20 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <Trash2 size={14} />
                    </button>
                </div>
                <Link
                    href={`/dashboard/asesmen/${asesmen.id}`}
                    className="text-sm font-semibold text-primary hover:underline flex items-center gap-1"
                >
                    Lihat <ChevronRight size={14} />
                </Link>
            </div>
        </motion.div>
    );
}

export default function AsesmenPage() {
    const { data: asesmenList = [], loading, error, fetchAll, remove } = useAsesmen();
    const [searchQuery, setSearchQuery] = useState("");
    const [filterType, setFilterType] = useState<"all" | "formatif" | "sumatif">("all");

    useEffect(() => {
        fetchAll();
    }, [fetchAll]);

    const handleDelete = async (id: string) => {
        if (confirm("Apakah Anda yakin ingin menghapus asesmen ini?")) {
            await remove(id);
        }
    };

    const filteredAsesmens = asesmenList.filter(a => {
        const matchesSearch = a.judul?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = filterType === "all" || a.jenis === filterType;
        return matchesSearch && matchesType;
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold font-serif text-foreground">Asesmen</h1>
                    <p className="text-muted-foreground mt-1">Kelola asesmen formatif dan sumatif</p>
                </div>
                <Link href="/dashboard/asesmen/create">
                    <Button className="bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl shadow-lg shadow-primary/20">
                        <Plus size={18} className="mr-2" />
                        Buat Asesmen Baru
                    </Button>
                </Link>
            </div>

            {/* Type Tabs */}
            <div className="flex gap-2">
                {[
                    { value: "all", label: "Semua" },
                    { value: "formatif", label: "Formatif" },
                    { value: "sumatif", label: "Sumatif" },
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
                        placeholder="Cari asesmen..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                </div>
                <button className="px-4 py-3 bg-card border border-border rounded-xl hover:bg-muted transition-colors">
                    <Filter size={18} className="text-muted-foreground" />
                </button>
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
            ) : filteredAsesmens.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredAsesmens.map((asesmen, index) => (
                        <AsesmenCard
                            key={asesmen.id}
                            asesmen={asesmen}
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
                    <ClipboardList size={48} className="mx-auto text-muted-foreground/40 mb-4" />
                    <h3 className="text-lg font-bold text-foreground mb-2">Belum ada Asesmen</h3>
                    <p className="text-muted-foreground mb-6">Buat asesmen pertama Anda</p>
                    <Link href="/dashboard/asesmen/create">
                        <Button className="bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl">
                            <Plus size={18} className="mr-2" />
                            Buat Asesmen Pertama
                        </Button>
                    </Link>
                </motion.div>
            )}
        </div>
    );
}
