"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Sparkles, Loader2, AlertCircle, CheckCircle2, Download } from "lucide-react";
import { useKisiKisi } from "@/hooks/useKisiKisi";
import { useExport } from "@/hooks/useExport";
import { MarkdownViewer } from "@/components/ui/MarkdownViewer";
import { cn } from "@/lib/utils";
import { AI_MODEL_OPTIONS } from "@/lib/form-constants";

const ujianTypes = [
    { value: "Ulangan Harian", label: "Ulangan Harian" },
    { value: "PTS", label: "PTS (Tengah Semester)" },
    { value: "PAS", label: "PAS (Akhir Semester)" },
    { value: "PAT", label: "PAT (Akhir Tahun)" },
];

export default function CreateKisiKisiPage() {
    const router = useRouter();
    const { generateWithStreaming, streaming } = useKisiKisi();
    const { generateAndExport, loading: exportLoading } = useExport();
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        title: "",
        subject: "",
        grade: "",
        type: "PTS",
        jumlah_soal: 40,
        model: "gemini-2.5-flash"
    });

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
                topik: formData.title || formData.subject,
                kelas: formData.grade || "Umum",
                jenis_ujian: formData.type as any,
                jumlah_soal: formData.jumlah_soal,
                model: formData.model
            };
            await generateWithStreaming(payload);
        } catch (err: any) {
            console.error(err);
            setError("Gagal generate kisi-kisi. Silakan coba lagi.");
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div>
                <Link href="/dashboard/kisi-kisi" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
                    <ArrowLeft size={16} className="mr-2" />Kembali
                </Link>
                <h1 className="text-2xl md:text-3xl font-bold font-serif text-foreground">Generate Kisi-Kisi AI</h1>
                <p className="text-muted-foreground mt-1">Petakan soal automatically berdasarkan CP, materi, dan level kognitif</p>
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
                <h2 className="text-lg font-bold text-foreground">Parameter Kisi-Kisi</h2>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Judul Kisi-Kisi</label>
                        <Input
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="Contoh: Kisi-Kisi PAS Matematika Kelas X"
                            className="h-12 rounded-xl"
                        />
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
                                value={formData.grade}
                                onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                                placeholder="Contoh: X"
                                className="h-12 rounded-xl"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Jenis Ujian</label>
                            <select
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                className="w-full h-12 px-4 rounded-xl border border-border bg-card text-foreground"
                            >
                                {ujianTypes.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Jumlah Soal</label>
                            <Input
                                type="number"
                                value={formData.jumlah_soal}
                                onChange={(e) => setFormData({ ...formData, jumlah_soal: parseInt(e.target.value) || 20 })}
                                placeholder="Jumlah Soal"
                                className="h-12 rounded-xl"
                            />
                        </div>
                        <div className="space-y-2 md:col-span-2">
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

                    <Button onClick={handleGenerate} disabled={isGenerating} className="w-full bg-primary text-white rounded-xl h-14 text-lg">
                        {isGenerating ? <><Loader2 size={20} className="mr-2 animate-spin" />Sedang Menyusun Kisi-Kisi...</> : <><Sparkles size={20} className="mr-2" />Generate Kisi-Kisi</>}
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
                                        ? "AI sedang menyusun kisi-kisi..."
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
                                <div className="flex gap-2">
                                    <Button
                                        onClick={() => generateAndExport({
                                            mapel: formData.subject,
                                            topik: formData.title,
                                            kelas: formData.grade,
                                            document_type: 'kisi_kisi',
                                            format: 'pdf',
                                            kurikulum: 'merdeka',
                                            content: streaming.content
                                        })}
                                        disabled={exportLoading}
                                        variant="outline"
                                        className="h-8 rounded-lg border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                                    >
                                        {exportLoading ? <Loader2 size={16} className="animate-spin mr-2" /> : <Download size={16} className="mr-2" />}
                                        PDF
                                    </Button>
                                    <Button
                                        onClick={() => generateAndExport({
                                            mapel: formData.subject,
                                            topik: formData.title,
                                            kelas: formData.grade,
                                            document_type: 'kisi_kisi',
                                            format: 'docx',
                                            kurikulum: 'merdeka',
                                            content: streaming.content
                                        })}
                                        disabled={exportLoading}
                                        className="bg-emerald-600 hover:bg-emerald-700 text-white h-8 rounded-lg"
                                    >
                                        {exportLoading ? <Loader2 size={16} className="animate-spin mr-2" /> : <Download size={16} className="mr-2" />}
                                        Word (Docx)
                                    </Button>
                                </div>
                            )}
                        </div>

                        {/* Markdown Preview */}
                        <div className="bg-white rounded-lg border p-6 shadow-sm min-h-[200px] max-h-[600px] overflow-y-auto custom-scrollbar">
                            <MarkdownViewer content={streaming.content} />
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
