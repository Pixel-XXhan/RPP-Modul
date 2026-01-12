"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Sparkles, Plus, Trash2, Save, Loader2, CheckCircle2, FileText, Download, AlertCircle } from "lucide-react";
import { useLKPD } from "@/hooks/useLKPD";
import { DocumentExportPanel } from "@/components/ui/DocumentExportPanel";
import { api } from "@/lib/api";
import { MarkdownViewer } from "@/components/ui/MarkdownViewer";
import { cn } from "@/lib/utils";
import {
    JENJANG_OPTIONS,
    getKelasByJenjang,
    getMapelByJenjang,
    getFase,
    BIDANG_KEAHLIAN_SMK,
    AI_MODEL_OPTIONS,
} from "@/lib/form-constants";

export default function CreateLKPDPage() {
    const { generateWithStreaming, streaming } = useLKPD();
    const contentRef = useRef<HTMLDivElement>(null);
    const [isGenerating, setIsGenerating] = useState(false);

    // Jenjang state for dynamic options
    const [jenjang, setJenjang] = useState("");
    const [bidangKeahlian, setBidangKeahlian] = useState("");

    const [formData, setFormData] = useState({
        title: "",
        subject: "",
        grade: "",
        topic: "",
        model: "gemini-2.5-flash",
        format: "pdf"
    });
    const [result, setResult] = useState<any>(null);

    // Dynamic options based on jenjang
    const kelasOptions = getKelasByJenjang(jenjang);
    const mapelOptions = getMapelByJenjang(jenjang);
    const fase = jenjang && formData.grade ? getFase(jenjang, formData.grade) : '';

    // Form validation
    const isFormValid = formData.title && formData.subject && formData.grade && jenjang;

    const [questions, setQuestions] = useState([
        { id: "1", question: "" }
    ]);

    const addQuestion = () => {
        setQuestions([...questions, { id: String(questions.length + 1), question: "" }]);
    };

    const updateQuestion = (id: string, text: string) => {
        setQuestions(questions.map(q => q.id === id ? { ...q, question: text } : q));
    };

    const removeQuestion = (id: string) => {
        setQuestions(questions.filter(q => q.id !== id));
    };

    const handleGenerate = async () => {
        setIsGenerating(true);
        setResult(null);
        try {
            const payload = {
                mapel: formData.subject,
                topik: formData.title || formData.topic,
                kelas: formData.grade,
                kurikulum: "Kurikulum Merdeka",
                model: formData.model,
                materi_pokok: formData.topic,
                kegiatan_pembelajaran: {
                    soal: questions.map(q => q.question).join("\n\n")
                }
            };

            await generateWithStreaming(payload);
        } catch (error) {
            console.error(error);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div>
                <Link href="/dashboard/lkpd" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
                    <ArrowLeft size={16} className="mr-2" />Kembali
                </Link>
                <h1 className="text-2xl md:text-3xl font-bold font-serif text-foreground">Buat LKPD Baru</h1>
                <p className="text-muted-foreground mt-1">Lembar Kerja Peserta Didik</p>
            </div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border border-neutral-200 p-6">
                <h2 className="text-lg font-bold mb-6">Informasi Dasar</h2>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Jenjang Pendidikan</label>
                        <select
                            value={jenjang}
                            onChange={(e) => {
                                setJenjang(e.target.value);
                                setFormData(prev => ({ ...prev, grade: "", subject: "" }));
                            }}
                            className="w-full h-12 px-4 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
                        >
                            <option value="">Pilih Jenjang</option>
                            {JENJANG_OPTIONS.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                    </div>

                    {jenjang === "SMK" && (
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">Bidang Keahlian</label>
                            <select
                                value={bidangKeahlian}
                                onChange={(e) => setBidangKeahlian(e.target.value)}
                                className="w-full h-12 px-4 rounded-xl border border-neutral-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                            >
                                <option value="">Pilih Bidang</option>
                                {BIDANG_KEAHLIAN_SMK.map((b) => (
                                    <option key={b.value} value={b.value}>
                                        {b.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Kelas / Fase</label>
                        <select
                            value={formData.grade}
                            onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                            disabled={!jenjang}
                            className="w-full h-12 px-4 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
                        >
                            <option value="">Pilih Kelas</option>
                            {kelasOptions.map((cls: any) => (
                                <option key={cls.value} value={cls.value}>{cls.label} {fase ? `(Fase ${fase})` : ''}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Mata Pelajaran</label>
                        <select
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            disabled={!jenjang}
                            className="w-full h-12 px-4 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
                        >
                            <option value="">Pilih Mata Pelajaran</option>
                            {mapelOptions.map((subject: any) => (
                                <option key={subject.value} value={subject.value}>{subject.label}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="space-y-4 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Judul / Topik LKPD</label>
                        <Input
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value, topic: e.target.value })}
                            placeholder="Contoh: Sistem Pencernaan Manusia"
                            className="h-12 rounded-xl"
                        />
                    </div>
                </div>

                {/* Questions Section */}
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <label className="block text-lg font-bold text-foreground">Daftar Pertanyaan / Instruksi</label>
                        <Button variant="outline" onClick={addQuestion} size="sm" className="rounded-xl">
                            <Plus size={16} className="mr-2" />
                            Tambah Soal
                        </Button>
                    </div>

                    <div className="space-y-3">
                        {questions.map((q, idx) => (
                            <div key={q.id} className="flex gap-3">
                                <span className="flex items-center justify-center w-8 h-12 font-bold text-muted-foreground">{idx + 1}.</span>
                                <Input
                                    value={q.question}
                                    onChange={(e) => updateQuestion(q.id, e.target.value)}
                                    placeholder="Tulis instruksi atau pertanyaan..."
                                    className="h-12 rounded-xl flex-1"
                                />
                                {questions.length > 1 && (
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => removeQuestion(q.id)}
                                        className="h-12 w-12 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl"
                                    >
                                        <Trash2 size={18} />
                                    </Button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* AI Model Selection */}
                <div className="grid md:grid-cols-2 gap-4 mb-8 pt-6 border-t border-neutral-100">
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Model AI</label>
                        <select
                            value={formData.model}
                            onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                            className="w-full h-12 px-4 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
                        >
                            {AI_MODEL_OPTIONS.map((m: any) => (
                                <option key={m.value} value={m.value}>{m.label} {m.recommended ? '⭐' : ''}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Format Output</label>
                        <select
                            value={formData.format}
                            onChange={(e) => setFormData({ ...formData, format: e.target.value })}
                            className="w-full h-12 px-4 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
                        >
                            <option value="pdf">PDF Document (.pdf)</option>
                            <option value="docx">Word Document (.docx)</option>
                        </select>
                    </div>
                </div>

                <Button onClick={handleGenerate} disabled={isGenerating} className="w-full bg-primary text-white rounded-xl h-14 text-lg">
                    {isGenerating ? <><Loader2 size={20} className="mr-2 animate-spin" />Generating...</> : <><Sparkles size={20} className="mr-2" />Generate LKPD</>}
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
                                            ? "AI sedang menyusun LKPD..."
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
                                        title={formData.title || 'LKPD'}
                                        documentType="lkpd"
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
            </motion.div>
        </div>
    );
}
