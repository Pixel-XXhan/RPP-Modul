"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
    ArrowLeft,
    Edit,
    Copy,
    Trash2,
    CheckCircle2,
    XCircle,
    HelpCircle,
    Sparkles,
    BarChart3,
} from "lucide-react";

const soalData = {
    id: "1",
    type: "pg",
    question: "Hasil dari 2³ × 3² adalah...",
    subject: "Matematika",
    grade: "Kelas 7",
    topic: "Bilangan Berpangkat",
    difficulty: "medium",
    options: [
        { label: "A", text: "18", isCorrect: false },
        { label: "B", text: "24", isCorrect: false },
        { label: "C", text: "72", isCorrect: true },
        { label: "D", text: "108", isCorrect: false },
    ],
    explanation: "2³ = 2 × 2 × 2 = 8\n3² = 3 × 3 = 9\nMaka 2³ × 3² = 8 × 9 = 72",
    stats: { attempted: 156, correct: 124, incorrect: 32 },
    createdAt: "5 Januari 2026",
};

const difficultyConfig = {
    easy: { label: "Mudah", color: "bg-emerald-100 text-emerald-700" },
    medium: { label: "Sedang", color: "bg-amber-100 text-amber-700" },
    hard: { label: "Sulit", color: "bg-red-100 text-red-700" },
};

export default function BankSoalDetailPage({ params }: { params: { id: string } }) {
    const difficulty = difficultyConfig[soalData.difficulty as keyof typeof difficultyConfig];
    const correctRate = Math.round((soalData.stats.correct / soalData.stats.attempted) * 100);

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                    <Link href="/dashboard/bank-soal" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-3">
                        <ArrowLeft size={16} className="mr-2" />Kembali
                    </Link>
                    <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-2xl font-bold font-serif">Detail Soal</h1>
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-100 text-blue-700">Pilihan Ganda</span>
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${difficulty.color}`}>{difficulty.label}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span>{soalData.subject}</span><span>•</span>
                        <span>{soalData.grade}</span><span>•</span>
                        <span>{soalData.topic}</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" className="rounded-xl"><Copy size={16} className="mr-2" />Duplikat</Button>
                    <Link href={`/dashboard/bank-soal/${params.id}/edit`}>
                        <Button className="bg-primary text-white rounded-xl"><Edit size={16} className="mr-2" />Edit</Button>
                    </Link>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
                {[
                    { label: "Dijawab", value: soalData.stats.attempted, icon: BarChart3, color: "bg-blue-100 text-blue-600" },
                    { label: "Benar", value: soalData.stats.correct, icon: CheckCircle2, color: "bg-emerald-100 text-emerald-600" },
                    { label: "Salah", value: soalData.stats.incorrect, icon: XCircle, color: "bg-red-100 text-red-600" },
                ].map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                            className="bg-white rounded-2xl border p-4 text-center">
                            <div className={`w-10 h-10 ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-2`}>
                                <Icon size={20} />
                            </div>
                            <p className="text-2xl font-bold font-serif">{stat.value}</p>
                            <p className="text-xs text-muted-foreground">{stat.label}</p>
                        </motion.div>
                    );
                })}
            </div>

            {/* Question */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl border p-6">
                <h2 className="text-lg font-bold mb-4">Pertanyaan</h2>
                <p className="text-xl font-medium leading-relaxed">{soalData.question}</p>
            </motion.div>

            {/* Options */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-white rounded-2xl border p-6">
                <h2 className="text-lg font-bold mb-4">Pilihan Jawaban</h2>
                <div className="space-y-3">
                    {soalData.options.map((opt) => (
                        <div key={opt.label} className={`flex items-center gap-4 p-4 rounded-xl border-2 ${opt.isCorrect ? "border-emerald-400 bg-emerald-50" : "border-neutral-200"
                            }`}>
                            <span className={`w-10 h-10 rounded-lg font-bold flex items-center justify-center ${opt.isCorrect ? "bg-emerald-500 text-white" : "bg-neutral-100 text-muted-foreground"
                                }`}>{opt.label}</span>
                            <span className={`flex-1 font-medium ${opt.isCorrect ? "text-emerald-700" : ""}`}>{opt.text}</span>
                            {opt.isCorrect && <CheckCircle2 size={20} className="text-emerald-500" />}
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Explanation */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-blue-50 rounded-2xl border border-blue-100 p-6">
                <div className="flex items-center gap-2 mb-4">
                    <HelpCircle size={20} className="text-blue-600" />
                    <h2 className="text-lg font-bold text-blue-900">Pembahasan</h2>
                </div>
                <pre className="whitespace-pre-wrap font-sans text-blue-800 leading-relaxed">{soalData.explanation}</pre>
            </motion.div>

            {/* Accuracy Graph */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="bg-white rounded-2xl border p-6">
                <h2 className="text-lg font-bold mb-4">Tingkat Akurasi</h2>
                <div className="flex items-center gap-4">
                    <div className="flex-1">
                        <div className="h-4 bg-neutral-100 rounded-full overflow-hidden">
                            <motion.div initial={{ width: 0 }} animate={{ width: `${correctRate}%` }} transition={{ duration: 1 }}
                                className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full" />
                        </div>
                    </div>
                    <span className="text-2xl font-bold text-emerald-600">{correctRate}%</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">{correctRate >= 80 ? "Soal ini memiliki tingkat pemahaman yang baik" : "Pertimbangkan untuk memberikan penjelasan lebih lanjut"}</p>
            </motion.div>

            {/* AI Badge */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-4 border border-primary/10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary"><Sparkles size={20} /></div>
                    <div>
                        <p className="font-medium">Soal Tervalidasi AI</p>
                        <p className="text-sm text-muted-foreground">Kualitas soal telah dianalisis berdasarkan tingkat kesulitan dan akurasi</p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
