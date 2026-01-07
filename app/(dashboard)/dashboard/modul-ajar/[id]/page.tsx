"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
    ArrowLeft,
    Download,
    Edit,
    Share2,
    Copy,
    Trash2,
    BookOpen,
    Calendar,
    Clock,
    Target,
    CheckCircle2,
    FileText,
    Sparkles,
    MoreVertical,
    Printer,
    Loader2,
} from "lucide-react";
import { useModulAjar } from "@/hooks/useModulAjar";
import { useExport } from "@/hooks/useExport";
import { ModulAjar } from "@/types/database";

export default function ModulAjarDetailPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const { fetchOne, remove } = useModulAjar();
    const { exportDocument, loading: exporting } = useExport();
    const [modulData, setModulData] = useState<ModulAjar | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showActions, setShowActions] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchOne(params.id);
                setModulData(data);
            } catch (err: any) {
                setError(err.message || "Gagal memuat data");
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [params.id, fetchOne]);

    const handleExport = async () => {
        await exportDocument({
            document_id: params.id,
            document_type: 'modul_ajar',
            format: 'pdf',
        });
    };

    const handleDelete = async () => {
        if (confirm("Apakah Anda yakin ingin menghapus modul ini?")) {
            await remove(params.id);
            router.push("/dashboard/modul-ajar");
        }
    };

    const formatDate = (dateStr?: string) => {
        if (!dateStr) return "-";
        return new Date(dateStr).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-16">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    if (error || !modulData) {
        return (
            <div className="max-w-4xl mx-auto space-y-6">
                <Link
                    href="/dashboard/modul-ajar"
                    className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
                >
                    <ArrowLeft size={16} className="mr-2" />
                    Kembali ke Daftar Modul
                </Link>
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-200">
                    {error || "Modul tidak ditemukan"}
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                    <Link
                        href="/dashboard/modul-ajar"
                        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-3"
                    >
                        <ArrowLeft size={16} className="mr-2" />
                        Kembali ke Daftar Modul
                    </Link>
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <h1 className="text-2xl md:text-3xl font-bold font-serif text-foreground">
                            {modulData.judul}
                        </h1>
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${modulData.status === "published"
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                            : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                            }`}>
                            {modulData.status === "published" ? "Dipublikasi" : "Draft"}
                        </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                        {modulData.topik && (
                            <>
                                <span className="flex items-center gap-1">
                                    <BookOpen size={14} className="text-primary" />
                                    {modulData.topik}
                                </span>
                                <span>•</span>
                            </>
                        )}
                        <span>Kelas {modulData.kelas}</span>
                        {modulData.alokasi_waktu && (
                            <>
                                <span>•</span>
                                <span className="flex items-center gap-1">
                                    <Clock size={14} />
                                    {modulData.alokasi_waktu} JP
                                </span>
                            </>
                        )}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    <Link href={`/dashboard/modul-ajar/${params.id}/edit`}>
                        <Button variant="outline" className="rounded-xl">
                            <Edit size={16} className="mr-2" />
                            Edit
                        </Button>
                    </Link>
                    <Button
                        onClick={handleExport}
                        disabled={exporting}
                        className="bg-primary hover:bg-primary-dark text-white rounded-xl"
                    >
                        {exporting ? (
                            <Loader2 size={16} className="mr-2 animate-spin" />
                        ) : (
                            <Download size={16} className="mr-2" />
                        )}
                        Export PDF
                    </Button>
                    <div className="relative">
                        <Button
                            variant="outline"
                            size="icon"
                            className="rounded-xl"
                            onClick={() => setShowActions(!showActions)}
                        >
                            <MoreVertical size={16} />
                        </Button>
                        {showActions && (
                            <>
                                <div className="fixed inset-0 z-10" onClick={() => setShowActions(false)} />
                                <div className="absolute right-0 top-12 w-48 bg-card rounded-xl shadow-lg border border-border py-2 z-20">
                                    <button className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-muted">
                                        <Copy size={14} /> Duplikat
                                    </button>
                                    <button className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-muted">
                                        <Share2 size={14} /> Bagikan
                                    </button>
                                    <button className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-muted">
                                        <Printer size={14} /> Cetak
                                    </button>
                                    <hr className="my-2 border-border" />
                                    <button
                                        onClick={handleDelete}
                                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                                    >
                                        <Trash2 size={14} /> Hapus
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Meta Info */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card rounded-2xl border border-border p-5"
            >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                        <p className="text-xs text-muted-foreground mb-1">Fase</p>
                        <p className="font-medium text-foreground">{modulData.fase || "-"}</p>
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground mb-1">Alokasi Waktu</p>
                        <p className="font-medium text-foreground">{modulData.alokasi_waktu || "-"} JP</p>
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground mb-1">Dibuat</p>
                        <p className="font-medium text-foreground">{formatDate(modulData.created_at)}</p>
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground mb-1">Diperbarui</p>
                        <p className="font-medium text-foreground">{formatDate(modulData.updated_at)}</p>
                    </div>
                </div>
            </motion.div>

            {/* Capaian Pembelajaran */}
            {modulData.capaian_pembelajaran && modulData.capaian_pembelajaran.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-card rounded-2xl border border-border p-6"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                            <Target size={18} />
                        </div>
                        <h2 className="text-lg font-bold text-foreground">Capaian Pembelajaran</h2>
                    </div>
                    <ul className="space-y-2">
                        {modulData.capaian_pembelajaran.map((cp, i) => (
                            <li key={i} className="text-foreground leading-relaxed flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                                {cp}
                            </li>
                        ))}
                    </ul>
                </motion.div>
            )}

            {/* Tujuan Pembelajaran */}
            {modulData.tujuan_pembelajaran && modulData.tujuan_pembelajaran.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="bg-card rounded-2xl border border-border p-6"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                            <CheckCircle2 size={18} />
                        </div>
                        <h2 className="text-lg font-bold text-foreground">Tujuan Pembelajaran</h2>
                    </div>
                    <ol className="space-y-3">
                        {modulData.tujuan_pembelajaran.map((tp, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-sm flex items-center justify-center shrink-0 font-medium">
                                    {i + 1}
                                </span>
                                <span className="text-foreground">{tp}</span>
                            </li>
                        ))}
                    </ol>
                </motion.div>
            )}

            {/* Kegiatan Pembelajaran */}
            {modulData.kegiatan_pembelajaran && Object.keys(modulData.kegiatan_pembelajaran).length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="bg-card rounded-2xl border border-border p-6"
                >
                    <div className="flex items-center gap-2 mb-6">
                        <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
                            <Calendar size={18} />
                        </div>
                        <h2 className="text-lg font-bold text-foreground">Kegiatan Pembelajaran</h2>
                    </div>

                    {/* Pendahuluan */}
                    {modulData.kegiatan_pembelajaran.pendahuluan && (
                        <div className="mb-6">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-full text-sm font-semibold">
                                    Pendahuluan
                                </span>
                            </div>
                            <ul className="space-y-2 ml-4">
                                {modulData.kegiatan_pembelajaran.pendahuluan.map((k: string, i: number) => (
                                    <li key={i} className="flex items-start gap-2 text-foreground">
                                        <span className="w-5 h-5 rounded bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-xs flex items-center justify-center shrink-0 mt-0.5">
                                            {i + 1}
                                        </span>
                                        {k}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Inti */}
                    {modulData.kegiatan_pembelajaran.inti && (
                        <div className="mb-6">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 rounded-full text-sm font-semibold">
                                    Kegiatan Inti
                                </span>
                            </div>
                            <ul className="space-y-2 ml-4">
                                {modulData.kegiatan_pembelajaran.inti.map((k: string, i: number) => (
                                    <li key={i} className="flex items-start gap-2 text-foreground">
                                        <span className="w-5 h-5 rounded bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs flex items-center justify-center shrink-0 mt-0.5">
                                            {i + 1}
                                        </span>
                                        {k}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Penutup */}
                    {modulData.kegiatan_pembelajaran.penutup && (
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <span className="px-3 py-1 bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 rounded-full text-sm font-semibold">
                                    Penutup
                                </span>
                            </div>
                            <ul className="space-y-2 ml-4">
                                {modulData.kegiatan_pembelajaran.penutup.map((k: string, i: number) => (
                                    <li key={i} className="flex items-start gap-2 text-foreground">
                                        <span className="w-5 h-5 rounded bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 text-xs flex items-center justify-center shrink-0 mt-0.5">
                                            {i + 1}
                                        </span>
                                        {k}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </motion.div>
            )}

            {/* Asesmen */}
            {modulData.asesmen && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-card rounded-2xl border border-border p-6"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center text-rose-600 dark:text-rose-400">
                            <FileText size={18} />
                        </div>
                        <h2 className="text-lg font-bold text-foreground">Asesmen</h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        {modulData.asesmen.formatif && (
                            <div className="p-4 bg-muted rounded-xl">
                                <p className="text-sm font-semibold text-foreground mb-2">Asesmen Formatif</p>
                                <p className="text-sm text-muted-foreground">{modulData.asesmen.formatif}</p>
                            </div>
                        )}
                        {modulData.asesmen.sumatif && (
                            <div className="p-4 bg-muted rounded-xl">
                                <p className="text-sm font-semibold text-foreground mb-2">Asesmen Sumatif</p>
                                <p className="text-sm text-muted-foreground">{modulData.asesmen.sumatif}</p>
                            </div>
                        )}
                    </div>
                </motion.div>
            )}

            {/* AI Generated Badge */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-4 border border-primary/10"
            >
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                        <Sparkles size={20} />
                    </div>
                    <div>
                        <p className="font-medium text-foreground">Dihasilkan dengan AI Katedra</p>
                        <p className="text-sm text-muted-foreground">
                            Dokumen ini dibuat dengan bantuan AI dan telah divalidasi sesuai kurikulum merdeka
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
