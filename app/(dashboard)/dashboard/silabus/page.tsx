"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
    Plus,
    Search,
    Filter,
    ListTree,
    Calendar,
    ChevronRight,
    Loader2,
    Trash2,
    Download,
} from "lucide-react";
import { useSilabus } from "@/hooks/useSilabus";
import { useExport } from "@/hooks/useExport";
import { Silabus } from "@/types/database";

function SilabusCard({
    silabus,
    index,
    onDelete,
    onExport,
}: {
    silabus: Silabus;
    index: number;
    onDelete: (id: string) => void;
    onExport: (id: string) => void;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-card rounded-2xl border border-border p-5 hover:shadow-lg hover:border-primary/20 transition-all group"
        >
            <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center text-rose-600 dark:text-rose-400">
                    <ListTree size={24} />
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${silabus.status === "published"
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                    : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                    }`}>
                    {silabus.status === "published" ? "Dipublikasi" : "Draft"}
                </span>
            </div>

            <Link href={`/dashboard/silabus/${silabus.id}`}>
                <h3 className="font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                    {silabus.judul}
                </h3>
            </Link>

            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <span>Kelas {silabus.kelas}</span>
                <span>•</span>
                <span>Semester {silabus.semester}</span>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex gap-2">
                    <button
                        onClick={() => onExport(silabus.id)}
                        className="p-2 rounded-lg hover:bg-muted text-muted-foreground"
                        title="Export PDF"
                    >
                        <Download size={14} />
                    </button>
                    <button
                        onClick={() => onDelete(silabus.id)}
                        className="p-2 rounded-lg hover:bg-red-50 text-muted-foreground hover:text-red-600 dark:hover:bg-red-900/20"
                        title="Hapus"
                    >
                        <Trash2 size={14} />
                    </button>
                </div>
                <Link
                    href={`/dashboard/silabus/${silabus.id}`}
                    className="text-sm font-semibold text-primary hover:underline flex items-center gap-1"
                >
                    Lihat <ChevronRight size={14} />
                </Link>
            </div>
        </motion.div>
    );
}

export default function SilabusPage() {
    const { data: silabusList, loading, error, fetchAll, remove } = useSilabus();
    const { exportDocument } = useExport();
    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState<"all" | "published" | "draft">("all");

    useEffect(() => {
        fetchAll();
    }, [fetchAll]);

    const handleDelete = async (id: string) => {
        if (confirm("Apakah Anda yakin ingin menghapus silabus ini?")) {
            await remove(id);
        }
    };

    const handleExport = async (id: string) => {
        await exportDocument({
            document_id: id,
            document_type: 'silabus',
            format: 'pdf',
        });
    };

    const filteredSilabus = silabusList.filter(s => {
        const matchesSearch = s.judul?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filterStatus === "all" || s.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold font-serif text-foreground">Silabus</h1>
                    <p className="text-muted-foreground mt-1">Kelola silabus pembelajaran per semester</p>
                </div>
                <Link href="/dashboard/silabus/create">
                    <Button className="bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl shadow-lg shadow-primary/20">
                        <Plus size={18} className="mr-2" />
                        Buat Silabus Baru
                    </Button>
                </Link>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Cari silabus..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                </div>
                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value as typeof filterStatus)}
                    className="px-4 py-3 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium"
                >
                    <option value="all">Semua Status</option>
                    <option value="published">Dipublikasi</option>
                    <option value="draft">Draft</option>
                </select>
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
            ) : filteredSilabus.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredSilabus.map((silabus, index) => (
                        <SilabusCard
                            key={silabus.id}
                            silabus={silabus}
                            index={index}
                            onDelete={handleDelete}
                            onExport={handleExport}
                        />
                    ))}
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-16 bg-card rounded-2xl border border-border"
                >
                    <ListTree size={48} className="mx-auto text-muted-foreground/40 mb-4" />
                    <h3 className="text-lg font-bold text-foreground mb-2">Belum ada Silabus</h3>
                    <p className="text-muted-foreground mb-6">Buat silabus semester pertama Anda</p>
                    <Link href="/dashboard/silabus/create">
                        <Button className="bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl">
                            <Plus size={18} className="mr-2" />
                            Buat Silabus Pertama
                        </Button>
                    </Link>
                </motion.div>
            )}
        </div>
    );
}
