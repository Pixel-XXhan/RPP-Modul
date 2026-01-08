"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Sparkles, Plus, Trash2, Save, Loader2, CheckCircle2, FileText, Download } from "lucide-react";
import { api } from "@/lib/api";

export default function CreateLKPDPage() {
    const [isGenerating, setIsGenerating] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        subject: "",
        grade: "",
        topic: "",
        model: "gemini-2.5-flash",
        format: "pdf"
    });
    const [result, setResult] = useState<any>(null);

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
                alokasi_waktu: 60,
                model: formData.model,
                format: formData.format,
                document_type: "lkpd",
                // Manual Overrides
                materi_pokok: formData.topic,
                kegiatan_pembelajaran: {
                    soal: questions.map(q => q.question).join("\n\n")
                }
            };

            const response: any = await api.post('/api/v2/export/generate', payload);
            setResult(response);
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
                <div className="space-y-4">
                    <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Judul LKPD" className="h-12 rounded-xl" />
                    <div className="grid md:grid-cols-3 gap-4">
                        <select value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} className="h-12 px-4 rounded-xl border border-neutral-200">
                            <option value="">Mata Pelajaran</option>
                            <option value="matematika">Matematika</option>
                            <option value="bahasa-indonesia">Bahasa Indonesia</option>
                            <option value="ipa">IPA</option>
                        </select>
                        <select value={formData.grade} onChange={(e) => setFormData({ ...formData, grade: e.target.value })} className="h-12 px-4 rounded-xl border border-neutral-200">
                            <option value="">Kelas</option>
                            <option value="7">Kelas 7</option>
                            <option value="8">Kelas 8</option>
                        </select>
                        <Input value={formData.topic} onChange={(e) => setFormData({ ...formData, topic: e.target.value })} placeholder="Topik Materi" className="h-12 rounded-xl" />
                    </div>
                </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border border-neutral-200 p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold">Daftar Soal / Instruksi</h2>
                    <Button onClick={addQuestion} variant="outline" className="rounded-xl"><Plus size={16} className="mr-2" />Tambah</Button>
                </div>
                <div className="space-y-3">
                    {questions.map((q, i) => (
                        <div key={q.id} className="flex items-start gap-3 p-4 bg-neutral-50 rounded-xl">
                            <span className="mt-2 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">{i + 1}</span>
                            <textarea
                                value={q.question}
                                onChange={(e) => updateQuestion(q.id, e.target.value)}
                                placeholder="Tulis instruksi atau soal..."
                                className="flex-1 min-h-[80px] p-3 rounded-lg border border-neutral-200 resize-y"
                            />
                            <button onClick={() => removeQuestion(q.id)} className="p-2 hover:bg-red-100 rounded-lg text-red-500 mt-1"><Trash2 size={16} /></button>
                        </div>
                    ))}
                </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-primary/5 rounded-2xl p-6 border border-primary/20">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center"><Sparkles size={24} className="text-white" /></div>
                    <div><h3 className="font-bold">Generate dengan AI</h3><p className="text-sm text-muted-foreground">AI akan menyusun LKPD lengkap</p></div>
                </div>

                {/* Configuration */}
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Model AI</label>
                        <select
                            value={formData.model}
                            onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                            className="w-full h-12 px-4 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
                        >
                            <option value="gemini-2.5-flash">Gemini 2.5 Flash (Cepat)</option>
                            <option value="gemini-2.5-pro">Gemini 2.5 Pro (Detail Tinggi)</option>
                            <option value="gemini-3-pro-preview">Gemini 3 Pro Preview (Terbaru)</option>
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

                {result && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 bg-emerald-50 rounded-xl p-6 border border-emerald-200"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                                <CheckCircle2 className="text-emerald-600" size={24} />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-emerald-900">LKPD Siap!</h3>
                                <p className="text-sm text-emerald-700">
                                    LKPD berhasil digenerate dan siap diunduh.
                                </p>
                            </div>
                            <a
                                href={result.download_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
                            >
                                <Download size={18} />
                                Download {(result.format || 'pdf').toUpperCase()}
                            </a>
                        </div>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
}
