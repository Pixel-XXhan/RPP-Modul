"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Sparkles, Save, Loader2, CheckSquare, AlignLeft, ListOrdered, AlertCircle, CheckCircle2, Download } from "lucide-react";
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
    const { generateWithStreaming, streaming, create } = useBankSoal();
    const { generateAndExport, loading: exportLoading } = useExport();
    const [isGenerating, setIsGenerating] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [questionType, setQuestionType] = useState<"pg" | "essay" | "isian">("pg");
    const [formData, setFormData] = useState({
        subject: "",
        grade: "",
        topic: "",
        difficulty: "medium",
        model: "gemini-2.5-flash"
    });
    const [options, setOptions] = useState([
        { label: "A", text: "" },
        { label: "B", text: "" },
        { label: "C", text: "" },
        { label: "D", text: "" }
    ]);
    const [correctAnswer, setCorrectAnswer] = useState(0);
    const [question, setQuestion] = useState("");
    const [explanation, setExplanation] = useState("");

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
                jumlah: 1,
                model: formData.model,
                save_to_db: false
            });
            // Result handling is now done via streaming.content in the UI

        } catch (err: any) {
            console.error(err);
            setError(err?.message || "Gagal generate soal. Silakan coba lagi.");
        } finally {
            setIsGenerating(false);
        }
    };

    const handleSave = async () => {
        if (!question) {
            setError("Soal tidak boleh kosong");
            return;
        }
        setIsSaving(true);
        setError(null);
        try {
            await create({
                tipe: typeMap[questionType],
                tingkat_kesulitan: difficultyMap[formData.difficulty],
                pertanyaan: question,
                pilihan: questionType === "pg" ? options : undefined,
                jawaban_benar: questionType === "pg" ? options[correctAnswer]?.label : undefined,
                pembahasan: explanation || undefined
            });
            router.push("/dashboard/bank-soal");
        } catch (err: any) {
            setError(err?.message || "Gagal menyimpan soal");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div>
                <Link href="/dashboard/bank-soal" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
                    <ArrowLeft size={16} className="mr-2" />Kembali
                </Link>
                <h1 className="text-2xl md:text-3xl font-bold font-serif text-foreground">Tambah Soal Baru</h1>
                <p className="text-muted-foreground mt-1">Buat soal untuk bank soal</p>
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

            {/* Meta - Changed selects to text inputs */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-2xl border border-border p-6">
                <h2 className="text-lg font-bold mb-4 text-foreground">Informasi Soal</h2>
                <div className="grid md:grid-cols-4 gap-4">
                    <Input
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="Mata Pelajaran (Matematika, B.Indo, dll)"
                        className="h-12 rounded-xl"
                    />
                    <Input
                        value={formData.grade}
                        onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                        placeholder="Kelas (X PPLG 1, XI TMS 2)"
                        className="h-12 rounded-xl"
                    />
                    <Input
                        value={formData.topic}
                        onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                        placeholder="Topik/Bab"
                        className="h-12 rounded-xl"
                    />
                    <select
                        value={formData.difficulty}
                        onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                        className="h-12 px-4 rounded-xl border border-border bg-card text-foreground"
                    >
                        <option value="easy">Mudah (C1-C2)</option>
                        <option value="medium">Sedang (C3-C4)</option>
                        <option value="hard">Sulit (C5-C6)</option>
                    </select>
                </div>
            </motion.div>

            {/* Question */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-2xl border border-border p-6">
                <h2 className="text-lg font-bold mb-4 text-foreground">Soal</h2>
                <textarea value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Tuliskan pertanyaan di sini..." rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" />

                {questionType === "pg" && (
                    <div className="mt-6 space-y-3">
                        <p className="font-semibold text-sm text-muted-foreground">Pilihan Jawaban:</p>
                        {options.map((opt, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <button onClick={() => setCorrectAnswer(i)}
                                    className={`w-10 h-10 rounded-lg font-bold transition-colors ${correctAnswer === i ? "bg-emerald-500 text-white" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>
                                    {opt.label}
                                </button>
                                <Input
                                    value={opt.text}
                                    onChange={(e) => {
                                        const newOpts = [...options];
                                        newOpts[i] = { ...newOpts[i], text: e.target.value };
                                        setOptions(newOpts);
                                    }}
                                    placeholder={`Pilihan ${opt.label}`}
                                    className="flex-1 h-10 rounded-lg"
                                />
                            </div>
                        ))}
                    </div>
                )}

                <div className="mt-6">
                    <p className="font-semibold text-sm text-muted-foreground mb-2">Pembahasan (opsional):</p>
                    <textarea value={explanation} onChange={(e) => setExplanation(e.target.value)} placeholder="Jelaskan jawaban yang benar..." rows={3}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" />
                </div>
            </motion.div>

            {/* AI Generate */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-primary/5 rounded-2xl p-6 border border-primary/20">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center"><Sparkles size={24} className="text-white" /></div>
                    <div>
                        <h3 className="font-bold text-foreground">Generate dengan AI</h3>
                        <p className="text-sm text-muted-foreground">AI akan membuat soal berdasarkan topik</p>
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
                <Button onClick={handleGenerate} disabled={isGenerating} className="w-full bg-primary text-white rounded-xl h-14 text-lg">
                    {isGenerating ? <><Loader2 size={20} className="mr-2 animate-spin" />Generating...</> : <><Sparkles size={20} className="mr-2" />Generate Soal</>}
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
                                <div>
                                    <h3 className={cn("font-bold", streaming.isStreaming ? "text-blue-900" : "text-emerald-900")}>
                                        {streaming.isStreaming ? "Sedang Menulis..." : "Dokumen Selesai"}
                                    </h3>
                                    <p className={cn("text-sm", streaming.isStreaming ? "text-blue-700" : "text-emerald-700")}>
                                        {streaming.isStreaming
                                            ? "AI sedang menyusun soal..."
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
            </motion.div>

            <div className="flex justify-between">
                <Link href="/dashboard/bank-soal"><Button variant="outline" className="rounded-xl"><ArrowLeft size={16} className="mr-2" />Batal</Button></Link>
                <Button onClick={handleSave} disabled={isSaving} className="bg-primary text-white rounded-xl">
                    {isSaving ? <Loader2 size={16} className="mr-2 animate-spin" /> : <Save size={16} className="mr-2" />}
                    Simpan Soal
                </Button>
            </div>
        </div>
    );
}
