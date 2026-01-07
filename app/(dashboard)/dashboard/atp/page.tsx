"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
    Plus,
    Search,
    Filter,
    Target,
    ChevronRight,
    Loader2,
    Trash2,
} from "lucide-react";
import { useATP } from "@/hooks/useATP";
import { ATP } from "@/types/database";

function ATPCard({
    atp,
    index,
    onDelete,
}: {
    atp: ATP;
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
            <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center text-violet-600 dark:text-violet-400">
                    <Target size={24} />
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400">
                    {atp.fase}
                </span>
            </div>

            <Link href={`/dashboard/atp/${atp.id}`}>
                <h3 className="font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                    {atp.judul}
                </h3>
            </Link>

            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <span>Kelas {atp.kelas}</span>
                <span>•</span>
                <span>{atp.fase}</span>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex gap-2">
                    <span className="text-sm text-muted-foreground">
                        <span className="font-semibold text-foreground">
                            {atp.tujuan_pembelajaran?.length || 0}
                        </span> Tujuan Pembelajaran
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => onDelete(atp.id)}
                        className="p-2 rounded-lg hover:bg-red-50 text-muted-foreground hover:text-red-600 dark:hover:bg-red-900/20 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <Trash2 size={14} />
                    </button>
                    <Link
                        href={`/dashboard/atp/${atp.id}`}
                        className="text-sm font-semibold text-primary hover:underline flex items-center gap-1"
                    >
                        Lihat <ChevronRight size={14} />
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}

export default function ATPPage() {
    const { data: atpList, loading, error, fetchAll, remove } = useATP();
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchAll();
    }, [fetchAll]);

    const handleDelete = async (id: string) => {
        if (confirm("Apakah Anda yakin ingin menghapus ATP ini?")) {
            await remove(id);
        }
    };

    const filteredATPs = atpList.filter(atp =>
        atp.judul?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold font-serif text-foreground">ATP</h1>
                    <p className="text-muted-foreground mt-1">Alur Tujuan Pembelajaran</p>
                </div>
                <Link href="/dashboard/atp/create">
                    <Button className="bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl shadow-lg shadow-primary/20">
                        <Plus size={18} className="mr-2" />
                        Buat ATP Baru
                    </Button>
                </Link>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Cari ATP..."
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
            ) : filteredATPs.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredATPs.map((atp, index) => (
                        <ATPCard
                            key={atp.id}
                            atp={atp}
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
                    <Target size={48} className="mx-auto text-muted-foreground/40 mb-4" />
                    <h3 className="text-lg font-bold text-foreground mb-2">Belum ada ATP</h3>
                    <p className="text-muted-foreground mb-6">Buat alur tujuan pembelajaran pertama Anda</p>
                    <Link href="/dashboard/atp/create">
                        <Button className="bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl">
                            <Plus size={18} className="mr-2" />
                            Buat ATP Pertama
                        </Button>
                    </Link>
                </motion.div>
            )}
        </div>
    );
}
