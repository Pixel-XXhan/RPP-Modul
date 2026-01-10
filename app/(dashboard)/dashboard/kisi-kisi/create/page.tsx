"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Sparkles, Plus, Trash2, Save, Loader2, Grid3X3, AlertCircle, CheckCircle2 } from "lucide-react";
import { api } from "@/lib/api";
import { useKisiKisi } from "@/hooks/useKisiKisi";
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

const levelOptions = [
    { value: "C1", label: "C1 - Mengingat" },
    { value: "C2", label: "C2 - Memahami" },
    { value: "C3", label: "C3 - Menerapkan" },
    { value: "C4", label: "C4 - Menganalisis" },
    { value: "C5", label: "C5 - Mengevaluasi" },
    { value: "C6", label: "C6 - Mencipta" },
];

const ujianTypes = [
    { value: "Ulangan Harian", label: "Ulangan Harian" },
    { value: "PTS", label: "PTS (Tengah Semester)" },
    { value: "PAS", label: "PAS (Akhir Semester)" },
    { value: "PAT", label: "PAT (Akhir Tahun)" },
];

export default function CreateKisiKisiPage() {
    const router = useRouter();
    const { generateWithStreaming, streaming } = useKisiKisi();
    const [isGenerating, setIsGenerating] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        title: "",
        subject: "",
        grade: "",
        type: "PTS",
        jumlah_soal: 40,
        model: "gemini-2.5-flash"
    });
    const [items, setItems] = useState<any[]>([]);

    const addItem = () => {
        setItems([...items, {
            id: String(Date.now()),
            kompetensi_dasar: "",
            materi: "",
            indikator: "",
            level_kognitif: "C2",
            nomor_soal: []
        }]);
    };

    const removeItem = (id: string) => {
        setItems(items.filter(i => i.id !== id));
    };

    const updateItem = (id: string, field: string, value: any) => {
        setItems(items.map(i => i.id === id ? { ...i, [field]: value } : i));
    };

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

    const handleSave = async () => {
        if (!formData.title || items.length === 0) {
            setError("Mohon isi judul dan minimal 1 indikator");
            return;
        }
        setIsSaving(true);
        setError(null);
        try {
            await api.post('/api/v2/kisi-kisi', {
                judul: formData.title,
                jenis_ujian: formData.type,
                kelas: formData.grade,
                indikator_soal: items.map(i => ({
                    kompetensi_dasar: i.kompetensi_dasar,
                    materi: i.materi,
                    indikator: i.indikator,
                    level_kognitif: i.level_kognitif,
                    nomor_soal: i.nomor_soal
                }))
            });
            router.push("/dashboard/kisi-kisi");
        } catch (err: any) {
            setError(err?.message || "Gagal menyimpan kisi-kisi");
        } finally {
            setIsSaving(false);
        }
    };

    const totalSoal = items.reduce((a, i) => a + (i.nomor_soal?.length || 0), 0);

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            <div>
                <Link href="/dashboard/kisi-kisi" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
                    <ArrowLeft size={16} className="mr-2" />Kembali
                </Link>
                <h1 className="text-2xl md:text-3xl font-bold font-serif text-foreground">Buat Kisi-Kisi</h1>
                <p className="text-muted-foreground mt-1">Petakan soal berdasarkan CP, materi, dan level kognitif</p>
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

            {/* Basic Info - Changed to text inputs */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-2xl border border-border p-6">
                <h2 className="text-lg font-bold mb-4 text-foreground">Informasi Dasar</h2>
                <div className="space-y-4">
                    <Input
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="Judul Kisi-Kisi (contoh: Kisi-Kisi PAS Matematika Kelas X)"
                        className="h-12 rounded-xl"
                    />
                    <div className="grid md:grid-cols-4 gap-4">
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
                        <select
                            value={formData.type}
                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                            className="h-12 px-4 rounded-xl border border-border bg-card text-foreground"
                        >
                            {ujianTypes.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                        </select>
                        <Input
                            type="number"
                            value={formData.jumlah_soal}
                            onChange={(e) => setFormData({ ...formData, jumlah_soal: parseInt(e.target.value) || 20 })}
                            placeholder="Jumlah Soal"
                            className="h-12 rounded-xl"
                        />
                    </div>
                </div>
            </motion.div>

            {/* Kisi-Kisi Builder */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-2xl border border-border overflow-hidden">
                <div className="p-6 border-b border-border flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center"><Grid3X3 size={20} /></div>
                        <div><h2 className="text-lg font-bold text-foreground">Pemetaan Soal</h2><p className="text-sm text-muted-foreground">Total: {items.length} indikator, {totalSoal} soal</p></div>
                    </div>
                    <Button onClick={addItem} variant="outline" className="rounded-xl"><Plus size={16} className="mr-2" />Tambah Baris</Button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-muted">
                            <tr>
                                <th className="px-4 py-3 text-left font-bold text-muted-foreground">No</th>
                                <th className="px-4 py-3 text-left font-bold text-muted-foreground">Kode KD</th>
                                <th className="px-4 py-3 text-left font-bold text-muted-foreground">Materi</th>
                                <th className="px-4 py-3 text-left font-bold text-muted-foreground">Indikator</th>
                                <th className="px-4 py-3 text-center font-bold text-muted-foreground">Level</th>
                                <th className="px-4 py-3 text-center font-bold text-muted-foreground">No. Soal</th>
                                <th className="w-12"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {items.map((item, index) => (
                                <tr key={item.id} className="hover:bg-muted/50">
                                    <td className="px-4 py-3 text-center font-medium">{index + 1}</td>
                                    <td className="px-4 py-3"><Input value={item.kompetensi_dasar} onChange={(e) => updateItem(item.id, "kompetensi_dasar", e.target.value)} placeholder="3.1" className="h-9 rounded-lg w-20" /></td>
                                    <td className="px-4 py-3"><Input value={item.materi} onChange={(e) => updateItem(item.id, "materi", e.target.value)} placeholder="Materi" className="h-9 rounded-lg w-32" /></td>
                                    <td className="px-4 py-3"><Input value={item.indikator} onChange={(e) => updateItem(item.id, "indikator", e.target.value)} placeholder="Indikator" className="h-9 rounded-lg" /></td>
                                    <td className="px-4 py-3">
                                        <select value={item.level_kognitif} onChange={(e) => updateItem(item.id, "level_kognitif", e.target.value)} className="h-9 px-2 rounded-lg border border-border bg-card text-xs">
                                            {levelOptions.map(l => <option key={l.value} value={l.value}>{l.value}</option>)}
                                        </select>
                                    </td>
                                    <td className="px-4 py-3 text-center text-xs">{item.nomor_soal?.join(", ") || "-"}</td>
                                    <td className="px-4 py-3"><button onClick={() => removeItem(item.id)} className="p-2 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg text-red-500"><Trash2 size={14} /></button></td>
                                </tr>
                            ))}
                            {items.length === 0 && (
                                <tr><td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">Belum ada indikator. Klik "Generate dengan AI" atau "Tambah Baris"</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </motion.div>

            {/* AI Generate */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-primary/5 rounded-2xl p-6 border border-primary/20">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center"><Sparkles size={24} className="text-white" /></div>
                    <div><h3 className="font-bold text-foreground">Generate dengan AI</h3><p className="text-sm text-muted-foreground">AI akan menyusun kisi-kisi berdasarkan CP dan materi</p></div>
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
                    {isGenerating ? <><Loader2 size={20} className="mr-2 animate-spin" />Generating...</> : <><Sparkles size={20} className="mr-2" />Generate Kisi-Kisi</>}
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
                                            ? "AI sedang menyusun kisi-kisi..."
                                            : "Proses generate selesai. Silakan review hasil di bawah."}
                                    </p>
                                </div>
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
                <Link href="/dashboard/kisi-kisi"><Button variant="outline" className="rounded-xl"><ArrowLeft size={16} className="mr-2" />Batal</Button></Link>
                <Button onClick={handleSave} disabled={isSaving} className="bg-primary text-white rounded-xl">
                    {isSaving ? <Loader2 size={16} className="mr-2 animate-spin" /> : <Save size={16} className="mr-2" />}
                    Simpan Kisi-Kisi
                </Button>
            </div>
        </div>
    );
}
