"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Sparkles, Save, Loader2, Plus, Trash2, GraduationCap, AlertCircle, CheckCircle2, Download } from "lucide-react";
import { api } from "@/lib/api";
import { useTujuanPembelajaran } from "@/hooks/useTujuanPembelajaran";
import { useExport } from "@/hooks/useExport";
import { MarkdownViewer } from "@/components/ui/MarkdownViewer";
import { cn } from "@/lib/utils";

export default function CreateTPPage() {
    const router = useRouter();
    const { generateWithStreaming, streaming } = useTujuanPembelajaran();
    const { generateAndExport, loading: exportLoading } = useExport();
    const [isGenerating, setIsGenerating] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        title: "",
        subject: "",
        grade: "",
        topik: "",
        jumlah: 4,
        model: "gemini-2.5-flash"
    });
    const [indicators, setIndicators] = useState<string[]>([]);

    const addIndicator = () => setIndicators([...indicators, ""]);
    const removeIndicator = (index: number) => setIndicators(indicators.filter((_, i) => i !== index));
    const updateIndicator = (index: number, value: string) => {
        const newIndicators = [...indicators];
        newIndicators[index] = value;
        setIndicators(newIndicators);
    };

    const handleGenerate = async () => {
        if (!formData.subject || !formData.topik) {
            setError("Mohon isi Mata Pelajaran dan Topik terlebih dahulu");
            return;
        }
        setIsGenerating(true);
        setError(null);
        try {
            await generateWithStreaming({
                mapel: formData.subject,
                topik: formData.topik,
                kelas: formData.grade || "Umum",
                jumlah: formData.jumlah,
                model: formData.model
            });

        } catch (err: any) {
            console.error(err);
            setError("Gagal generate tujuan pembelajaran. Silakan coba lagi.");
        } finally {
            setIsGenerating(false);
        }
    };

    const handleSave = async () => {
        if (!formData.title) {
            setError("Mohon isi rumusan tujuan pembelajaran");
            return;
        }
        setIsSaving(true);
        setError(null);
        try {
            await api.post('/api/v2/tp', {
                deskripsi: formData.title,
                kelas: formData.grade,
                indikator: indicators.filter(i => i.trim() !== "")
            });
            router.push("/dashboard/tujuan-pembelajaran");
        } catch (err: any) {
            setError(err?.message || "Gagal menyimpan tujuan pembelajaran");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div>
                <Link href="/dashboard/tujuan-pembelajaran" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
                    <ArrowLeft size={16} className="mr-2" />Kembali
                </Link>
                <h1 className="text-2xl md:text-3xl font-bold font-serif text-foreground">Buat Tujuan Pembelajaran</h1>
                <p className="text-muted-foreground mt-1">Susun tujuan pembelajaran berdasarkan Capaian Pembelajaran</p>
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

            {/* Topic Info */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-2xl border border-emerald-100 dark:border-emerald-800 p-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-600">
                        <GraduationCap size={20} />
                    </div>
                    <div>
                        <h3 className="font-bold text-emerald-900 dark:text-emerald-100">Topik Pembelajaran</h3>
                        <p className="text-sm text-emerald-700 dark:text-emerald-300">AI akan menyusun TP berdasarkan topik</p>
                    </div>
                </div>
                <Input
                    value={formData.topik}
                    onChange={(e) => setFormData({ ...formData, topik: e.target.value })}
                    placeholder="Contoh: Pengukuran Sudut, Teks Naratif, Hukum Newton"
                    className="h-12 rounded-xl bg-white dark:bg-background"
                />
            </motion.div>

            {/* Basic Info - Text inputs */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-2xl border border-border p-6">
                <h2 className="text-lg font-bold mb-4 text-foreground">Informasi Dasar</h2>
                <div className="space-y-4">
                    <div className="grid md:grid-cols-3 gap-4">
                        <Input
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            placeholder="Mata Pelajaran"
                            className="h-12 rounded-xl"
                        />
                        <Input
                            value={formData.grade}
                            onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                            placeholder="Kelas (X PPLG, XI TMS)"
                            className="h-12 rounded-xl"
                        />
                        <Input
                            type="number"
                            value={formData.jumlah}
                            onChange={(e) => setFormData({ ...formData, jumlah: parseInt(e.target.value) || 4 })}
                            placeholder="Jumlah TP"
                            className="h-12 rounded-xl"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Rumusan Tujuan Pembelajaran</label>
                        <textarea value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="Siswa dapat... (rumuskan dengan kata kerja operasional sesuai level kognitif)" rows={3}
                            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" />
                    </div>
                </div>
            </motion.div>

            {/* Indicators */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-2xl border border-border p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-foreground">Indikator Pencapaian</h2>
                    <Button onClick={addIndicator} variant="outline" className="rounded-xl"><Plus size={16} className="mr-2" />Tambah</Button>
                </div>
                <div className="space-y-3">
                    {indicators.length === 0 ? (
                        <p className="text-center text-muted-foreground py-4">Belum ada indikator. Klik "Generate dengan AI" atau "Tambah"</p>
                    ) : (
                        indicators.map((ind, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold shrink-0">{i + 1}</span>
                                <Input value={ind} onChange={(e) => updateIndicator(i, e.target.value)} placeholder="Deskripsi indikator pencapaian" className="flex-1 h-10 rounded-lg" />
                                <button onClick={() => removeIndicator(i)} className="p-2 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg text-red-500"><Trash2 size={16} /></button>
                            </div>
                        ))
                    )}
                </div>
            </motion.div>

            {/* AI Generate */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-primary/5 rounded-2xl p-6 border border-primary/20">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center"><Sparkles size={24} className="text-white" /></div>
                    <div><h3 className="font-bold text-foreground">Generate dengan AI</h3><p className="text-sm text-muted-foreground">AI akan merumuskan TP dan indikator berdasarkan topik</p></div>
                </div>
                <div className="flex gap-3 mb-4">
                    <select
                        value={formData.model}
                        onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                        className="flex-1 h-12 px-4 rounded-xl border border-border bg-card text-foreground"
                    >
                        <option value="gemini-2.5-flash">Gemini 2.5 Flash (Cepat)</option>
                        <option value="gemini-2.5-pro">Gemini 2.5 Pro (Detail)</option>
                        <option value="gemini-3-pro-preview">Gemini 3 Pro Preview (Terbaru)</option>
                    </select>
                </div>
                <Button onClick={handleGenerate} disabled={isGenerating} className="w-full bg-primary text-white rounded-xl h-14 text-lg">
                    {isGenerating ? <><Loader2 size={20} className="mr-2 animate-spin" />Generating...</> : <><Sparkles size={20} className="mr-2" />Generate TP</>}
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
                                            ? "AI sedang menyusun tujuan pembelajaran..."
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
                                    <Button
                                        onClick={() => generateAndExport({
                                            mapel: formData.subject,
                                            topik: formData.topik,
                                            kelas: formData.grade,
                                            document_type: 'tujuan_pembelajaran',
                                            format: 'docx',
                                            kurikulum: 'merdeka',
                                            content: streaming.content
                                        })}
                                        disabled={exportLoading}
                                        className="bg-emerald-600 hover:bg-emerald-700 text-white h-8 rounded-lg"
                                    >
                                        {exportLoading ? <Loader2 size={16} className="animate-spin mr-2" /> : <Download size={16} className="mr-2" />}
                                        Download Docx
                                    </Button>
                                )}
                            </div>

                            {/* Markdown Preview */}
                            <div className="bg-white rounded-lg border p-6 shadow-sm min-h-[200px] max-h-[600px] overflow-y-auto custom-scrollbar">
                                <MarkdownViewer content={streaming.content} />
                            </div>
                        </div>
                    </motion.div>
                )}
            </motion.div>

            <div className="flex justify-between">
                <Link href="/dashboard/tujuan-pembelajaran"><Button variant="outline" className="rounded-xl"><ArrowLeft size={16} className="mr-2" />Batal</Button></Link>
                <Button onClick={handleSave} disabled={isSaving} className="bg-primary text-white rounded-xl">
                    {isSaving ? <Loader2 size={16} className="mr-2 animate-spin" /> : <Save size={16} className="mr-2" />}
                    Simpan TP
                </Button>
            </div>
        </div>
    );
}
