"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    ArrowLeft,
    Sparkles,
    Plus,
    Trash2,
    GripVertical,
    Save,
    Loader2,
    ChevronDown,
    ChevronUp,
    GraduationCap,
    AlertCircle,
    CheckCircle2,
    Download
} from "lucide-react";
import { useATP } from "@/hooks/useATP";
import { DocumentExportPanel } from "@/components/ui/DocumentExportPanel";
import { api } from "@/lib/api";
import { MarkdownViewer } from "@/components/ui/MarkdownViewer";
import { cn } from "@/lib/utils";
import {
    JENJANG_OPTIONS,
    getKelasByJenjang,
    getMapelByJenjang,
    FASE_OPTIONS,
    BIDANG_KEAHLIAN_SMK,
    AI_MODEL_OPTIONS,
} from "@/lib/form-constants";

export default function CreateATPPage() {
    const router = useRouter();
    const { generateWithStreaming, streaming } = useATP();
    const contentRef = useRef<HTMLDivElement>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        title: "",
        subject: "",
        grade: "",
        phase: "E",
        capaian_pembelajaran: "",
        model: "gemini-2.5-flash"
    });

    const [tujuanPembelajaran, setTujuanPembelajaran] = useState<any[]>([]);
    const [expandedTP, setExpandedTP] = useState<string | null>(null);

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const addTP = () => {
        const newId = String(Date.now());
        setTujuanPembelajaran([
            ...tujuanPembelajaran,
            { id: newId, urutan: tujuanPembelajaran.length + 1, deskripsi: "", indicators: [] }
        ]);
        setExpandedTP(newId);
    };

    const removeTP = (id: string) => {
        setTujuanPembelajaran(tujuanPembelajaran.filter(tp => tp.id !== id));
    };

    const updateTPTitle = (id: string, deskripsi: string) => {
        setTujuanPembelajaran(tujuanPembelajaran.map(tp =>
            tp.id === id ? { ...tp, deskripsi } : tp
        ));
    };

    const addIndicator = (tpId: string) => {
        setTujuanPembelajaran(tujuanPembelajaran.map(tp =>
            tp.id === tpId ? { ...tp, indicators: [...tp.indicators, ""] } : tp
        ));
    };

    const updateIndicator = (tpId: string, index: number, value: string) => {
        setTujuanPembelajaran(tujuanPembelajaran.map(tp =>
            tp.id === tpId
                ? { ...tp, indicators: tp.indicators.map((ind: string, i: number) => i === index ? value : ind) }
                : tp
        ));
    };

    const removeIndicator = (tpId: string, index: number) => {
        setTujuanPembelajaran(tujuanPembelajaran.map(tp =>
            tp.id === tpId
                ? { ...tp, indicators: tp.indicators.filter((_: any, i: number) => i !== index) }
                : tp
        ));
    };

    const handleGenerate = async () => {
        if (!formData.subject) {
            setError("Mohon isi Mata Pelajaran terlebih dahulu");
            return;
        }
        setIsGenerating(true);
        setError(null);
        try {
            const payload = {
                mapel: formData.subject,
                topik: formData.title,
                kelas: formData.grade,
                kurikulum: "Kurikulum Merdeka",
                model: formData.model,
                capaian_pembelajaran: formData.capaian_pembelajaran,
                tujuan_pembelajaran: tujuanPembelajaran.map(tp => ({
                    deskripsi: tp.deskripsi,
                    indikator: tp.indicators
                }))
            };

            await generateWithStreaming(payload);

        } catch (err: any) {
            console.error(err);
            setError("Gagal membuat ATP. Silakan coba lagi.");
        } finally {
            setIsGenerating(false);
        }
    };

    const handleSave = async () => {
        if (!formData.title || tujuanPembelajaran.length === 0) {
            setError("Mohon isi judul dan minimal 1 tujuan pembelajaran");
            return;
        }
        setIsSaving(true);
        setError(null);
        try {
            await api.post('/api/v2/atp', {
                judul: formData.title,
                fase: formData.phase,
                kelas: formData.grade,
                tujuan_pembelajaran: tujuanPembelajaran.map((tp, i) => ({
                    urutan: i + 1,
                    deskripsi: tp.deskripsi
                }))
            });
            router.push("/dashboard/atp");
        } catch (err: any) {
            setError(err?.message || "Gagal menyimpan ATP");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div>
                <Link href="/dashboard/atp" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
                    <ArrowLeft size={16} className="mr-2" />
                    Kembali ke Daftar ATP
                </Link>
                <h1 className="text-2xl md:text-3xl font-bold font-serif text-foreground">Buat ATP Baru</h1>
                <p className="text-muted-foreground mt-1">Susun Alur Tujuan Pembelajaran berdasarkan Capaian Pembelajaran</p>
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

            {/* Basic Info - Text inputs */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-2xl border border-border p-6">
                <h2 className="text-lg font-bold font-serif text-foreground mb-6">Informasi Dasar</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Judul ATP</label>
                        <Input
                            value={formData.title}
                            onChange={(e) => handleInputChange("title", e.target.value)}
                            placeholder="Contoh: ATP Matematika - Aljabar Kelas X"
                            className="h-12 rounded-xl"
                        />
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">Mata Pelajaran</label>
                            <Input
                                value={formData.subject}
                                onChange={(e) => handleInputChange("subject", e.target.value)}
                                placeholder="Matematika, B.Indo, PJOK"
                                className="h-12 rounded-xl"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">Fase</label>
                            <select
                                value={formData.phase}
                                onChange={(e) => handleInputChange("phase", e.target.value)}
                                className="w-full h-12 px-4 rounded-xl border border-border bg-card text-foreground"
                            >
                                {FASE_OPTIONS.map((f: any) => <option key={f.value} value={f.value}>{f.label}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">Kelas</label>
                            <Input
                                value={formData.grade}
                                onChange={(e) => handleInputChange("grade", e.target.value)}
                                placeholder="X PPLG, XI TMS"
                                className="h-12 rounded-xl"
                            />
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* CP Input */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-2xl border border-emerald-100 dark:border-emerald-800 p-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-600">
                        <GraduationCap size={20} />
                    </div>
                    <div>
                        <h3 className="font-bold text-emerald-900 dark:text-emerald-100">Capaian Pembelajaran (CP)</h3>
                        <p className="text-sm text-emerald-700 dark:text-emerald-300">Tuliskan CP sebagai dasar penyusunan ATP</p>
                    </div>
                </div>
                <textarea
                    value={formData.capaian_pembelajaran}
                    onChange={(e) => handleInputChange("capaian_pembelajaran", e.target.value)}
                    placeholder="Contoh: Peserta didik mampu memahami konsep bilangan dan operasinya..."
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-emerald-200 dark:border-emerald-700 bg-white dark:bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-200 resize-none"
                />
            </motion.div>

            {/* Tujuan Pembelajaran Builder */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-card rounded-2xl border border-border p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-lg font-bold font-serif text-foreground">Alur Tujuan Pembelajaran</h2>
                        <p className="text-sm text-muted-foreground">Susun urutan TP dari sederhana ke kompleks</p>
                    </div>
                    <Button onClick={addTP} variant="outline" className="rounded-xl">
                        <Plus size={16} className="mr-2" />
                        Tambah TP
                    </Button>
                </div>

                <div className="space-y-4">
                    {tujuanPembelajaran.length === 0 ? (
                        <p className="text-center text-muted-foreground py-8">Belum ada tujuan pembelajaran. Klik "Generate dengan AI" atau "Tambah TP"</p>
                    ) : (
                        tujuanPembelajaran.map((tp, index) => (
                            <motion.div key={tp.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                                className="border border-border rounded-xl overflow-hidden">
                                {/* TP Header */}
                                <div className="flex items-center gap-3 p-4 bg-muted cursor-pointer"
                                    onClick={() => setExpandedTP(expandedTP === tp.id ? null : tp.id)}>
                                    <GripVertical size={18} className="text-muted-foreground cursor-grab" />
                                    <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                                        {index + 1}
                                    </div>
                                    <Input
                                        value={tp.deskripsi}
                                        onChange={(e) => { e.stopPropagation(); updateTPTitle(tp.id, e.target.value); }}
                                        onClick={(e) => e.stopPropagation()}
                                        placeholder="Deskripsi Tujuan Pembelajaran"
                                        className="flex-1 border-0 bg-transparent focus-visible:ring-0 font-medium"
                                    />
                                    <span className="text-xs text-muted-foreground">{tp.indicators?.length || 0} indikator</span>
                                    {expandedTP === tp.id ? <ChevronUp size={18} className="text-muted-foreground" /> : <ChevronDown size={18} className="text-muted-foreground" />}
                                    <button onClick={(e) => { e.stopPropagation(); removeTP(tp.id); }} className="p-1.5 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/20 text-red-500">
                                        <Trash2 size={16} />
                                    </button>
                                </div>

                                {/* TP Indicators */}
                                {expandedTP === tp.id && (
                                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="p-4 space-y-3">
                                        <p className="text-sm font-medium text-muted-foreground">Indikator Pencapaian:</p>
                                        {tp.indicators?.map((indicator: string, i: number) => (
                                            <div key={i} className="flex items-center gap-2">
                                                <span className="w-6 h-6 rounded bg-primary/10 text-primary text-xs flex items-center justify-center shrink-0">{i + 1}</span>
                                                <Input value={indicator} onChange={(e) => updateIndicator(tp.id, i, e.target.value)} placeholder="Deskripsi indikator" className="flex-1 h-10 rounded-lg" />
                                                <button onClick={() => removeIndicator(tp.id, i)} className="p-1.5 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/20 text-red-500">
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        ))}
                                        <Button onClick={() => addIndicator(tp.id)} variant="ghost" size="sm" className="text-primary">
                                            <Plus size={14} className="mr-1" />
                                            Tambah Indikator
                                        </Button>
                                    </motion.div>
                                )}
                            </motion.div>
                        ))
                    )}
                </div>
            </motion.div>

            {/* AI Generate */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-primary/5 rounded-2xl p-6 border border-primary/20">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                        <Sparkles size={24} className="text-white" />
                    </div>
                    <div>
                        <h3 className="font-bold text-foreground">Generate Otomatis dengan AI</h3>
                        <p className="text-sm text-muted-foreground">AI akan menyusun alur TP berdasarkan CP</p>
                    </div>
                </div>
                <div className="flex gap-3 mb-4">
                    <select
                        value={formData.model}
                        onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                        className="flex-1 h-12 px-4 rounded-xl border border-border bg-card text-foreground"
                    >
                        {AI_MODEL_OPTIONS.map((m: any) => (
                            <option key={m.value} value={m.value}>{m.label} {m.recommended ? '⭐' : ''}</option>
                        ))}
                    </select>
                </div>
                <Button onClick={handleGenerate} disabled={isGenerating} className="w-full bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl h-14 text-lg shadow-lg shadow-primary/20">
                    {isGenerating ? <><Loader2 size={20} className="mr-2 animate-spin" />Sedang Menyusun ATP...</> : <><Sparkles size={20} className="mr-2" />Generate ATP dengan AI</>}
                </Button>

                {/* Streaming / Generated Content Area */}
                {(streaming.isStreaming || streaming.content) && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-8 space-y-4"
                    >
                        <div className={cn(
                            "rounded-xl p-6 border transition-colors",
                            streaming.isStreaming
                                ? "bg-blue-50/50 border-blue-200"
                                : "bg-emerald-50/50 border-emerald-200"
                        )}>
                            <div className="flex items-center gap-3 mb-4">
                                {streaming.isStreaming ? (
                                    <Loader2 size={24} className="text-blue-600 animate-spin" />
                                ) : (
                                    <CheckCircle2 size={24} className="text-emerald-600" />
                                )}
                                <div className="flex-1">
                                    <h3 className={cn("font-bold", streaming.isStreaming ? "text-blue-900" : "text-emerald-900")}>
                                        {streaming.isStreaming ? "Sedang Menulis..." : "Dokumen Selesai"}
                                    </h3>
                                    <p className={cn("text-sm", streaming.isStreaming ? "text-blue-700" : "text-emerald-700")}>
                                        {streaming.isStreaming
                                            ? "AI sedang menyusun Alur Tujuan Pembelajaran..."
                                            : "Proses generate selesai. Silakan review hasil di bawah."}
                                    </p>
                                </div>
                                {streaming.isStreaming && (
                                    <Button
                                        onClick={streaming.stop}
                                        variant="destructive"
                                        size="sm"
                                        className="h-8 rounded-lg"
                                    >
                                        Stop Generation
                                    </Button>
                                )}
                                {!streaming.isStreaming && streaming.content && (
                                    <DocumentExportPanel
                                        content={streaming.content}
                                        title={formData.title || 'ATP'}
                                        documentType="atp"
                                        contentRef={contentRef}
                                    />
                                )}
                            </div>

                            <div ref={contentRef} className="bg-card rounded-lg border border-border p-6 shadow-sm min-h-[200px] max-h-[600px] overflow-y-auto custom-scrollbar">
                                <MarkdownViewer content={streaming.content} />
                            </div>
                        </div>
                    </motion.div>
                )}
            </motion.div>

            {/* Actions */}
            <div className="flex items-center justify-between">
                <Link href="/dashboard/atp">
                    <Button variant="outline" className="rounded-xl"><ArrowLeft size={16} className="mr-2" />Batal</Button>
                </Link>
                <Button onClick={handleSave} disabled={isSaving} className="bg-primary hover:bg-primary-dark text-white rounded-xl">
                    {isSaving ? <Loader2 size={16} className="mr-2 animate-spin" /> : <Save size={16} className="mr-2" />}
                    Simpan ATP
                </Button>
            </div>
        </div>
    );
}
