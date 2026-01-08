"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    ArrowLeft,
    Sparkles,
    Plus,
    Trash2,
    Save,
    Loader2,
    CheckCircle2,
    Calendar,
    ChevronDown,
    ChevronUp,
    Download,
} from "lucide-react";
import { api } from "@/lib/api";

interface WeekData {
    id: string;
    week: string;
    topic: string;
    cp: string;
}

export default function CreateSilabusPage() {
    const [isGenerating, setIsGenerating] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        subject: "",
        grade: "",
        semester: "",
        year: "2025/2026",
        model: "gemini-2.5-flash",
        format: "pdf",
    });
    const [result, setResult] = useState<any>(null);

    const [weeks, setWeeks] = useState<WeekData[]>([
        { id: "1", week: "1-2", topic: "Pengenalan Bilangan Bulat", cp: "MAT-D-01" },
        { id: "2", week: "3-4", topic: "Operasi Hitung Bilangan Bulat", cp: "MAT-D-01" },
    ]);

    const [expandedWeek, setExpandedWeek] = useState<string | null>("1");

    const addWeek = () => {
        const newId = String(weeks.length + 1);
        setWeeks([...weeks, { id: newId, week: "", topic: "", cp: "" }]);
        setExpandedWeek(newId);
    };

    const removeWeek = (id: string) => {
        setWeeks(weeks.filter(w => w.id !== id));
    };

    const updateWeek = (id: string, field: keyof WeekData, value: string) => {
        setWeeks(weeks.map(w => w.id === id ? { ...w, [field]: value } : w));
    };

    const handleGenerate = async () => {
        setIsGenerating(true);
        setResult(null);
        try {
            // Map weeks to kegiatan_pembelajaran format
            const kegiatanMap: Record<string, string> = {};
            weeks.forEach(w => {
                if (w.week && w.topic) {
                    kegiatanMap[`Minggu ${w.week}`] = `${w.topic} (CP: ${w.cp})`;
                }
            });

            const payload = {
                mapel: formData.subject,
                topik: formData.title,
                kelas: formData.grade,
                kurikulum: "Kurikulum Merdeka",
                alokasi_waktu: weeks.length * 4, // Estimate
                model: formData.model,
                format: formData.format,
                document_type: "silabus",
                kegiatan_pembelajaran: kegiatanMap
            };

            const response: any = await api.post('/api/v2/export/generate', payload);
            setResult(response);
        } catch (error) {
            console.error(error);
        } finally {
            setIsGenerating(false);
        }
    };

    const canGenerate = formData.title && formData.subject && formData.grade && formData.semester;

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div>
                <Link href="/dashboard/silabus" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
                    <ArrowLeft size={16} className="mr-2" />
                    Kembali ke Daftar Silabus
                </Link>
                <h1 className="text-2xl md:text-3xl font-bold font-serif text-foreground">Buat Silabus Baru</h1>
                <p className="text-muted-foreground mt-1">Rancang silabus semester dengan pemetaan mingguan</p>
            </div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-2xl border border-border p-6">
                <h2 className="text-lg font-bold font-serif text-foreground mb-6">Informasi Dasar</h2>
                <div className="space-y-4">
                    <Input
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="Judul Silabus"
                        className="h-12 rounded-xl bg-background border-border"
                    />
                    <div className="grid md:grid-cols-4 gap-4">
                        <select
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            className="h-12 px-4 rounded-xl border border-border bg-background text-foreground"
                        >
                            <option value="">Mata Pelajaran</option>
                            <option value="matematika">Matematika</option>
                            <option value="bahasa-indonesia">Bahasa Indonesia</option>
                            <option value="ipa">IPA</option>
                            <option value="ips">IPS</option>
                        </select>
                        <select
                            value={formData.grade}
                            onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                            className="h-12 px-4 rounded-xl border border-border bg-background text-foreground"
                        >
                            <option value="">Kelas</option>
                            <option value="7">Kelas 7</option>
                            <option value="8">Kelas 8</option>
                            <option value="9">Kelas 9</option>
                        </select>
                        <select
                            value={formData.semester}
                            onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                            className="h-12 px-4 rounded-xl border border-border bg-background text-foreground"
                        >
                            <option value="">Semester</option>
                            <option value="1">Ganjil</option>
                            <option value="2">Genap</option>
                        </select>
                        <Input
                            value={formData.year}
                            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                            className="h-12 rounded-xl bg-background border-border"
                        />
                    </div>
                </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-2xl border border-border p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-foreground">Pemetaan Mingguan</h2>
                    <Button onClick={addWeek} variant="outline" className="rounded-xl"><Plus size={16} className="mr-2" />Tambah</Button>
                </div>
                <div className="space-y-3">
                    {weeks.map((week) => (
                        <div key={week.id} className="border border-border rounded-xl overflow-hidden bg-card">
                            <div
                                className="flex items-center gap-4 p-4 bg-muted cursor-pointer"
                                onClick={() => setExpandedWeek(expandedWeek === week.id ? null : week.id)}
                            >
                                <Calendar size={16} className="text-primary" />
                                <span className="font-bold text-primary">Minggu {week.week || "?"}</span>
                                <span className="flex-1 truncate text-muted-foreground">{week.topic || "Belum ada topik"}</span>
                                {expandedWeek === week.id ? <ChevronUp size={18} className="text-muted-foreground" /> : <ChevronDown size={18} className="text-muted-foreground" />}
                                <button
                                    onClick={(e) => { e.stopPropagation(); removeWeek(week.id); }}
                                    className="p-1.5 hover:bg-destructive/10 rounded text-destructive"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                            {expandedWeek === week.id && (
                                <div className="p-4 space-y-3 bg-background">
                                    <Input
                                        value={week.week}
                                        onChange={(e) => updateWeek(week.id, "week", e.target.value)}
                                        placeholder="Minggu (1-2)"
                                        className="h-10 rounded-lg bg-card border-border"
                                    />
                                    <Input
                                        value={week.topic}
                                        onChange={(e) => updateWeek(week.id, "topic", e.target.value)}
                                        placeholder="Topik Pembelajaran"
                                        className="h-10 rounded-lg bg-card border-border"
                                    />
                                    <Input
                                        value={week.cp}
                                        onChange={(e) => updateWeek(week.id, "cp", e.target.value)}
                                        placeholder="Kode CP"
                                        className="h-10 rounded-lg bg-card border-border"
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-primary/10 rounded-2xl p-6 border border-primary/20">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                        <Sparkles size={24} className="text-primary-foreground" />
                    </div>
                    <div>
                        <h3 className="font-bold text-foreground">Generate dengan AI</h3>
                        <p className="text-sm text-muted-foreground">AI akan menyusun silabus lengkap berdasarkan data</p>
                    </div>
                </div>
                {!canGenerate && (
                    <p className="text-sm text-amber-600 dark:text-amber-400 mb-3">
                        ⚠️ Lengkapi informasi dasar terlebih dahulu sebelum generate
                    </p>
                )}

                {/* Configuration */}
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Model AI</label>
                        <select
                            value={formData.model}
                            onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                            className="w-full h-12 px-4 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/20"
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
                            className="w-full h-12 px-4 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/20"
                        >
                            <option value="pdf">PDF Document (.pdf)</option>
                            <option value="docx">Word Document (.docx)</option>
                        </select>
                    </div>
                </div>

                <Button
                    onClick={handleGenerate}
                    disabled={isGenerating || !canGenerate}
                    className="w-full bg-primary text-primary-foreground rounded-xl h-14 text-lg disabled:opacity-50"
                >
                    {isGenerating ? <><Loader2 size={20} className="mr-2 animate-spin" />Generating...</> : <><Sparkles size={20} className="mr-2" />Generate Silabus</>}
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
                                <h3 className="font-bold text-emerald-900">Silabus Siap!</h3>
                                <p className="text-sm text-emerald-700">
                                    Silabus Anda telah berhasil digenerate.
                                </p>
                            </div>
                            <a
                                href={result.download_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
                            >
                                <Download size={18} />
                                Download {result.format.toUpperCase()}
                            </a>
                        </div>
                    </motion.div>
                )}
            </motion.div>

            <div className="flex justify-between">
                <Link href="/dashboard/silabus"><Button variant="outline" className="rounded-xl"><ArrowLeft size={16} className="mr-2" />Batal</Button></Link>
                <Button className="bg-primary text-primary-foreground rounded-xl"><Save size={16} className="mr-2" />Simpan</Button>
            </div>
        </div>
    );
}
