"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Sparkles, Plus, Trash2, Save, Loader2, CheckSquare, AlignLeft, ListOrdered } from "lucide-react";

export default function CreateBankSoalPage() {
    const [isGenerating, setIsGenerating] = useState(false);
    const [questionType, setQuestionType] = useState<"pg" | "essay" | "isian">("pg");
    const [formData, setFormData] = useState({ subject: "", grade: "", topic: "", difficulty: "medium" });
    const [options, setOptions] = useState(["", "", "", ""]);
    const [correctAnswer, setCorrectAnswer] = useState(0);
    const [question, setQuestion] = useState("");
    const [explanation, setExplanation] = useState("");

    const handleGenerate = async () => {
        setIsGenerating(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        setQuestion("Hasil dari 2³ × 3² adalah...");
        setOptions(["18", "24", "72", "108"]);
        setCorrectAnswer(2);
        setExplanation("2³ = 8, 3² = 9, jadi 8 × 9 = 72");
        setIsGenerating(false);
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
                            className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all ${questionType === type.value ? "border-primary bg-primary/5 text-primary" : "border-neutral-200 hover:border-neutral-300 text-muted-foreground"}`}>
                            <Icon size={20} />
                            <span className="font-semibold">{type.label}</span>
                        </button>
                    );
                })}
            </div>

            {/* Meta */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border border-neutral-200 p-6">
                <h2 className="text-lg font-bold mb-4">Informasi Soal</h2>
                <div className="grid md:grid-cols-4 gap-4">
                    <select value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} className="h-12 px-4 rounded-xl border border-neutral-200">
                        <option value="">Mata Pelajaran</option>
                        <option value="matematika">Matematika</option>
                        <option value="bahasa-indonesia">Bahasa Indonesia</option>
                    </select>
                    <select value={formData.grade} onChange={(e) => setFormData({ ...formData, grade: e.target.value })} className="h-12 px-4 rounded-xl border border-neutral-200">
                        <option value="">Kelas</option>
                        <option value="7">Kelas 7</option>
                        <option value="8">Kelas 8</option>
                    </select>
                    <Input value={formData.topic} onChange={(e) => setFormData({ ...formData, topic: e.target.value })} placeholder="Topik/Bab" className="h-12 rounded-xl" />
                    <select value={formData.difficulty} onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })} className="h-12 px-4 rounded-xl border border-neutral-200">
                        <option value="easy">Mudah</option>
                        <option value="medium">Sedang</option>
                        <option value="hard">Sulit</option>
                    </select>
                </div>
            </motion.div>

            {/* Question */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border border-neutral-200 p-6">
                <h2 className="text-lg font-bold mb-4">Soal</h2>
                <textarea value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Tuliskan pertanyaan di sini..." rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" />

                {questionType === "pg" && (
                    <div className="mt-6 space-y-3">
                        <p className="font-semibold text-sm text-muted-foreground">Pilihan Jawaban:</p>
                        {options.map((opt, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <button onClick={() => setCorrectAnswer(i)}
                                    className={`w-10 h-10 rounded-lg font-bold transition-colors ${correctAnswer === i ? "bg-emerald-500 text-white" : "bg-neutral-100 text-muted-foreground hover:bg-neutral-200"}`}>
                                    {String.fromCharCode(65 + i)}
                                </button>
                                <Input value={opt} onChange={(e) => { const newOpts = [...options]; newOpts[i] = e.target.value; setOptions(newOpts); }}
                                    placeholder={`Pilihan ${String.fromCharCode(65 + i)}`} className="flex-1 h-10 rounded-lg" />
                            </div>
                        ))}
                    </div>
                )}

                <div className="mt-6">
                    <p className="font-semibold text-sm text-muted-foreground mb-2">Pembahasan (opsional):</p>
                    <textarea value={explanation} onChange={(e) => setExplanation(e.target.value)} placeholder="Jelaskan jawaban yang benar..." rows={3}
                        className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" />
                </div>
            </motion.div>

            {/* AI Generate */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-primary/5 rounded-2xl p-6 border border-primary/20">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center"><Sparkles size={24} className="text-white" /></div>
                    <div><h3 className="font-bold">Generate dengan AI</h3><p className="text-sm text-muted-foreground">AI akan membuat soal berdasarkan topik</p></div>
                </div>
                <Button onClick={handleGenerate} disabled={isGenerating} className="w-full bg-primary text-white rounded-xl h-14 text-lg">
                    {isGenerating ? <><Loader2 size={20} className="mr-2 animate-spin" />Generating...</> : <><Sparkles size={20} className="mr-2" />Generate Soal</>}
                </Button>
            </motion.div>

            <div className="flex justify-between">
                <Link href="/dashboard/bank-soal"><Button variant="outline" className="rounded-xl"><ArrowLeft size={16} className="mr-2" />Batal</Button></Link>
                <Button className="bg-primary text-white rounded-xl"><Save size={16} className="mr-2" />Simpan Soal</Button>
            </div>
        </div>
    );
}
