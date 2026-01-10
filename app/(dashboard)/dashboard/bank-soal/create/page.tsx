"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Sparkles, Loader2, CheckSquare, AlignLeft, ListOrdered, AlertCircle, CheckCircle2, Download } from "lucide-react";
import { useBankSoal } from "@/hooks/useBankSoal";
import { useExport } from "@/hooks/useExport";
import { TipeSoal, TingkatKesulitan } from "@/types/database";
import { AI_MODEL_OPTIONS } from "@/lib/form-constants";
import { MarkdownViewer } from "@/components/ui/MarkdownViewer";
import { cn } from "@/lib/utils";

const difficultyMap: Record<string, TingkatKesulitan> = {
    easy: "mudah",
    medium: "sedang",
    hard: "sulit"
};

const typeMap: Record<string, TipeSoal> = {
    pg: "pilihan_ganda",
    essay: "essay",
    isian: "isian_singkat"
};

export default function CreateBankSoalPage() {
    const router = useRouter();
    const { generateWithStreaming, streaming } = useBankSoal();
    const { generateAndExport, loading: exportLoading } = useExport();
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [questionType, setQuestionType] = useState<"pg" | "essay" | "isian">("pg");
    const [formData, setFormData] = useState({
        subject: "",
        grade: "",
        topic: "",
        difficulty: "medium",
        jumlah: 10,
        model: "gemini-2.5-flash"
    });

    const handleGenerate = async () => {
        if (!formData.subject || !formData.topic) {
            setError("Mohon isi Mata Pelajaran dan Topik terlebih dahulu");
            return;
        }
        setIsGenerating(true);
        setError(null);
        try {
            await generateWithStreaming({
                mapel: formData.subject,
                topik: formData.topic,
                kelas: formData.grade || "Umum",
                tipe: typeMap[questionType],
                tingkat_kesulitan: difficultyMap[formData.difficulty],
                jumlah: formData.jumlah,
                model: formData.model,
                save_to_db: false
            });
        } catch (err: any) {
            console.error(err);
            setError(err?.message || "Gagal generate soal. Silakan coba lagi.");
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div>
                <Link href="/dashboard/bank-soal" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
                    <ArrowLeft size={16} className="mr-2" />Kembali
                </Link>
                <h1 className="text-2xl md:text-3xl font-bold font-serif text-foreground">Generate Bank Soal AI</h1>
                <p className="text-muted-foreground mt-1">Buat paket soal lengkap secara instan dengan AI</p>
            </div>

            {/* Error Display */}
            {error && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4 border border-red-200 dark:border-red-800 flex items-center gap-3"
                >
                    <AlertCircle className="text-red-600 dark:text-red-400 shrink-0" size={20} />
                    <p className="text-red-800 dark:text-red-200 text-sm flex-1">{error}</p>
                    <Button variant="ghost" size="sm" onClick={() => setError(null)} className="text-red-600">
                        Tutup
                    </Button>
                </motion.div>
            )}

            {/* Type Selection */}
            <div className="flex gap-3">
                {[
                    { value: "pg", label: "Pilihan Ganda", icon: CheckSquare },
                    { value: "essay", label: "Essay", icon: AlignLeft },
                    { value: "isian", label: "Isian Singkat", icon: ListOrdered },
                ].map((type) => {
                    const Icon = type.icon;
                    return (
                        <button key={type.value} onClick={() => setQuestionType(type.value as any)}
                            className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all ${questionType === type.value ? "border-primary bg-primary/5 text-primary" : "border-border hover:border-primary/30 text-muted-foreground"}`}>
                            <Icon size={20} />
                            <span className="font-semibold">{type.label}</span>
                        </button>
                    );
                })}
            </div>

            {/* Parameters Form */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-2xl border border-border p-6 space-y-4">
                <h2 className="text-lg font-bold text-foreground">Parameter Soal</h2>
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Mata Pelajaran</label>
                        <Input
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            placeholder="Contoh: Matematika"
                            className="h-12 rounded-xl"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Topik / Materi</label>
                        <Input
                            value={formData.topic}
                            onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                            placeholder="Contoh: Aljabar Linear"
                            className="h-12 rounded-xl"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Kelas</label>
                        <Input
                            value={formData.grade}
                            onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                            placeholder="Contoh: X SMA"
                            className="h-12 rounded-xl"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Tingkat Kesulitan</label>
                        <select
                            value={formData.difficulty}
                            onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                            className="w-full h-12 px-4 rounded-xl border border-border bg-card text-foreground focus:ring-2 focus:ring-primary/20"
                        >
                            <option value="easy">Mudah (C1-C2)</option>
                            <option value="medium">Sedang (C3-C4)</option>
                            <option value="hard">Sulit (C5-C6)</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Jumlah Soal</label>
                        <Input
                            type="number"
                            min={1}
                            max={50}
                            value={formData.jumlah}
                            onChange={(e) => setFormData({ ...formData, jumlah: parseInt(e.target.value) || 10 })}
                            className="h-12 rounded-xl"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Model AI</label>
                        <select
                            value={formData.model}
                            onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                            className="w-full h-12 px-4 rounded-xl border border-border bg-card text-foreground focus:ring-2 focus:ring-primary/20"
                        >
                            {AI_MODEL_OPTIONS.map((m: any) => (
                                <option key={m.value} value={m.value}>{m.label} {m.recommended ? '⭐' : ''}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <Button onClick={handleGenerate} disabled={isGenerating} className="w-full bg-primary text-white rounded-xl h-14 text-lg mt-4">
                    {isGenerating ? <><Loader2 size={20} className="mr-2 animate-spin" />Sedang Menulis Soal...</> : <><Sparkles size={20} className="mr-2" />Generate Soal</>}
                </Button>
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
                                        ? "AI sedang menyusun paket soal..."
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
                                        topik: formData.topic,
                                        kelas: formData.grade,
                                        document_type: 'bank-soal',
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
        </div>
    );
}
