"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Sparkles, Loader2, AlertCircle, CheckCircle2, Download } from "lucide-react";
import { useRubrik } from "@/hooks/useRubrik";
import { DocumentExportPanel } from "@/components/ui/DocumentExportPanel";
import { MarkdownViewer } from "@/components/ui/MarkdownViewer";
import { cn } from "@/lib/utils";
import { AI_MODEL_OPTIONS } from "@/lib/form-constants";

const penilaianTypes = [
    { value: "sikap", label: "Sikap" },
    { value: "pengetahuan", label: "Pengetahuan" },
    { value: "keterampilan", label: "Keterampilan" },
    { value: "proyek", label: "Proyek" },
    { value: "portofolio", label: "Portofolio" },
];

const skalaOptions = [
    { value: "1-4", label: "Skala 1-4" },
    { value: "1-100", label: "Skala 1-100" },
    { value: "A-E", label: "Grade A-E" },
];

export default function CreateRubrikPage() {
    const router = useRouter();
    const { generateWithStreaming, streaming } = useRubrik();
    const contentRef = useRef<HTMLDivElement>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        title: "",
        subject: "",
        kelas: "",
        topik: "",
        jenis_penilaian: "keterampilan",
        skala: "1-4",
        model: "gemini-2.5-flash"
    });

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
                kelas: formData.kelas || "Umum",
                jenis_penilaian: formData.jenis_penilaian as any,
                skala: formData.skala as any,
                model: formData.model
            });
        } catch (err: any) {
            console.error(err);
            setError("Gagal generate rubrik. Silakan coba lagi.");
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div>
                <Link href="/dashboard/rubrik" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
                    <ArrowLeft size={16} className="mr-2" />Kembali
                </Link>
                <h1 className="text-2xl md:text-3xl font-bold font-serif text-foreground">Generate Rubrik AI</h1>
                <p className="text-muted-foreground mt-1">Susun rubrik penilaian secara otomatis dengan AI</p>
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

            {/* Parameters Form */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-2xl border border-border p-6 space-y-4">
                <h2 className="text-lg font-bold text-foreground">Parameter Rubrik</h2>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Judul Rubrik</label>
                        <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Contoh: Rubrik Penilaian Presentasi" className="h-12 rounded-xl" />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Mata Pelajaran</label>
                            <Input
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                placeholder="Contoh: Bahasa Indonesia"
                                className="h-12 rounded-xl"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Kelas</label>
                            <Input
                                value={formData.kelas}
                                onChange={(e) => setFormData({ ...formData, kelas: e.target.value })}
                                placeholder="Contoh: X"
                                className="h-12 rounded-xl"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Topik / Kegiatan</label>
                            <Input
                                value={formData.topik}
                                onChange={(e) => setFormData({ ...formData, topik: e.target.value })}
                                placeholder="Contoh: Presentasi Kelompok"
                                className="h-12 rounded-xl"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Jenis Penilaian</label>
                            <select
                                value={formData.jenis_penilaian}
                                onChange={(e) => setFormData({ ...formData, jenis_penilaian: e.target.value })}
                                className="w-full h-12 px-4 rounded-xl border border-border bg-card text-foreground"
                            >
                                {penilaianTypes.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Skala Penilaian</label>
                            <select
                                value={formData.skala}
                                onChange={(e) => setFormData({ ...formData, skala: e.target.value })}
                                className="w-full h-12 px-4 rounded-xl border border-border bg-card text-foreground"
                            >
                                {skalaOptions.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Model AI</label>
                            <select
                                value={formData.model}
                                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                                className="w-full h-12 px-4 rounded-xl border border-border bg-card text-foreground"
                            >
                                {AI_MODEL_OPTIONS.map((m: any) => (
                                    <option key={m.value} value={m.value}>{m.label} {m.recommended ? '⭐' : ''}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <Button onClick={handleGenerate} disabled={isGenerating} className="w-full bg-primary text-white rounded-xl h-14 text-lg mt-4">
                        {isGenerating ? <><Loader2 size={20} className="mr-2 animate-spin" />Sedang Menyusun Rubrik...</> : <><Sparkles size={20} className="mr-2" />Generate Rubrik</>}
                    </Button>
                </div>
            </motion.div>

            {/* Streaming / Generated Content Area */}
            {(streaming.isStreaming || streaming.content) && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
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
                                        ? "AI sedang menyusun rubrik..."
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
                                    title={formData.title || 'Rubrik'}
                                    documentType="rubrik"
                                    contentRef={contentRef}
                                />
                            )}
                        </div>

                        {/* Markdown Preview */}
                        <div ref={contentRef} className="bg-card rounded-lg border border-border p-6 shadow-sm min-h-[200px] max-h-[600px] overflow-y-auto custom-scrollbar">
                            <MarkdownViewer content={streaming.content} />
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
