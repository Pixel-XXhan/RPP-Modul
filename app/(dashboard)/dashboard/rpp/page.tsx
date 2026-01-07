"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
    Plus,
    Search,
    Filter,
    MoreVertical,
    FileText,
    Calendar,
    Download,
    Edit,
    Trash2,
    Copy,
    Eye,
    Loader2,
} from "lucide-react";
import { useRPP } from "@/hooks/useRPP";
import { useExport } from "@/hooks/useExport";
import { RPP } from "@/types/database";

function RPPCard({
    rpp,
    index,
    onDelete,
    onExport,
}: {
    rpp: RPP;
    index: number;
    onDelete: (id: string) => void;
    onExport: (id: string) => void;
}) {
    const [showMenu, setShowMenu] = useState(false);

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
        return date.toLocaleDateString('id-ID');
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-card rounded-2xl border border-border p-5 hover:shadow-lg hover:border-primary/20 transition-all group relative"
        >
            <div className="flex items-start justify-between mb-4">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${rpp.status === "published"
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                    : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                    }`}>
                    {rpp.status === "published" ? "Dipublikasi" : "Draft"}
                </span>

                <div className="relative">
                    <button
                        onClick={() => setShowMenu(!showMenu)}
                        className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <MoreVertical size={16} />
                    </button>
                    {showMenu && (
                        <>
                            <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)} />
                            <div className="absolute right-0 top-8 w-48 bg-card rounded-xl shadow-lg border border-border py-2 z-20">
                                <Link
                                    href={`/dashboard/rpp/${rpp.id}`}
                                    className="flex items-center gap-2 w-full px-4 py-2 text-sm text-foreground hover:bg-muted"
                                >
                                    <Eye size={14} /> Lihat
                                </Link>
                                <Link
                                    href={`/dashboard/rpp/${rpp.id}/edit`}
                                    className="flex items-center gap-2 w-full px-4 py-2 text-sm text-foreground hover:bg-muted"
                                >
                                    <Edit size={14} /> Edit
                                </Link>
                                <button
                                    onClick={() => { onExport(rpp.id); setShowMenu(false); }}
                                    className="flex items-center gap-2 w-full px-4 py-2 text-sm text-foreground hover:bg-muted"
                                >
                                    <Download size={14} /> Export PDF
                                </button>
                                <hr className="my-2 border-border" />
                                <button
                                    onClick={() => { onDelete(rpp.id); setShowMenu(false); }}
                                    className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                                >
                                    <Trash2 size={14} /> Hapus
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>

            <Link href={`/dashboard/rpp/${rpp.id}`}>
                <h3 className="font-bold text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">
                    {rpp.judul}
                </h3>
            </Link>

            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                {rpp.materi_pokok && (
                    <>
                        <span className="bg-muted px-2 py-0.5 rounded">{rpp.materi_pokok}</span>
                        <span>•</span>
                    </>
                )}
                <span>Kelas {rpp.kelas}</span>
                {rpp.alokasi_waktu && (
                    <>
                        <span>•</span>
                        <span>{rpp.alokasi_waktu} JP</span>
                    </>
                )}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar size={12} />
                    <span>{formatTimeAgo(rpp.updated_at)}</span>
                </div>
                <Link
                    href={`/dashboard/rpp/${rpp.id}/edit`}
                    className="text-xs font-semibold text-primary hover:underline"
                >
                    Edit →
                </Link>
            </div>
        </motion.div>
    );
}

export default function RPPPage() {
    const { data: rpps = [], loading, error, fetchAll, remove } = useRPP();
    const { exportDocument } = useExport();
    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState<"all" | "published" | "draft">("all");

    useEffect(() => {
        fetchAll();
    }, [fetchAll]);

    const handleDelete = async (id: string) => {
        if (confirm("Apakah Anda yakin ingin menghapus RPP ini?")) {
            await remove(id);
        }
    };

    const handleExport = async (id: string) => {
        await exportDocument({
            document_id: id,
            document_type: 'rpp',
            format: 'pdf',
        });
    };

    const filteredRPPs = rpps.filter(rpp => {
        const matchesSearch = rpp.judul?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filterStatus === "all" || rpp.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold font-serif text-foreground">RPP</h1>
                    <p className="text-muted-foreground mt-1">Rencana Pelaksanaan Pembelajaran</p>
                </div>
                <Link href="/dashboard/rpp/create">
                    <Button className="bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl shadow-lg shadow-primary/20">
                        <Plus size={18} className="mr-2" />
                        Buat RPP Baru
                    </Button>
                </Link>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Cari RPP..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                </div>
                <div className="flex gap-2">
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value as typeof filterStatus)}
                        className="px-4 py-3 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm font-medium"
                    >
                        <option value="all">Semua Status</option>
                        <option value="published">Dipublikasi</option>
                        <option value="draft">Draft</option>
                    </select>
                    <button className="px-4 py-3 bg-card border border-border rounded-xl hover:bg-muted transition-colors">
                        <Filter size={18} className="text-muted-foreground" />
                    </button>
                </div>
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
            ) : filteredRPPs.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredRPPs.map((rpp, index) => (
                        <RPPCard
                            key={rpp.id}
                            rpp={rpp}
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
                    <FileText size={48} className="mx-auto text-muted-foreground/40 mb-4" />
                    <h3 className="text-lg font-bold text-foreground mb-2">Belum ada RPP</h3>
                    <p className="text-muted-foreground mb-6">Buat RPP pertama Anda dengan bantuan AI</p>
                    <Link href="/dashboard/rpp/create">
                        <Button className="bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl">
                            <Plus size={18} className="mr-2" />
                            Buat RPP Pertama
                        </Button>
                    </Link>
                </motion.div>
            )}
        </div>
    );
}
