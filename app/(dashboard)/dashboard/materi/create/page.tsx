"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Sparkles, Save, Loader2, FileText, Video, Image as ImageIcon, Upload, AlertCircle } from "lucide-react";
import { api } from "@/lib/api";

const typeOptions = [
    { value: "text", label: "Teks", icon: FileText, color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30", desc: "Artikel, penjelasan, panduan" },
    { value: "video", label: "Video", icon: Video, color: "bg-rose-100 text-rose-600 dark:bg-rose-900/30", desc: "Tutorial, demonstrasi" },
    { value: "image", label: "Gambar", icon: ImageIcon, color: "bg-amber-100 text-amber-600 dark:bg-amber-900/30", desc: "Infografis, diagram" },
];

export default function CreateMateriPage() {
    const router = useRouter();
    const [isGenerating, setIsGenerating] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [materiType, setMateriType] = useState("text");
    const [formData, setFormData] = useState({
        title: "",
        subject: "",
        grade: "",
        topic: "",
        description: "",
        model: "gemini-2.5-flash"
    });
    const [content, setContent] = useState("");

    const handleGenerate = async () => {
        if (!formData.subject || !formData.topic) {
            setError("Mohon isi Mata Pelajaran dan Topik terlebih dahulu");
            return;
        }
        setIsGenerating(true);
        setError(null);
        try {
            const result = await api.post<any>('/api/v2/materi/generate', {
                mapel: formData.subject,
                topik: formData.topic,
                kelas: formData.grade || "Umum",
                model: formData.model
            });

            if (result.ringkasan) {
                setContent(result.ringkasan);
            }
            if (result.judul) {
                setFormData(prev => ({ ...prev, title: result.judul }));
            }
            if (result.poin_penting && Array.isArray(result.poin_penting)) {
                const points = result.poin_penting.map((p: string) => `- ${p}`).join('\n');
                setContent(prev => prev + '\n\n## Poin Penting\n' + points);
            }
        } catch (err: any) {
            console.error(err);
            setError(err?.message || "Gagal generate materi. Silakan coba lagi.");
        } finally {
            setIsGenerating(false);
        }
    };

    const handleSave = async () => {
        if (!formData.title || !content) {
            setError("Mohon isi judul dan konten materi");
            return;
        }
        setIsSaving(true);
        setError(null);
        try {
            await api.post('/api/v2/materi', {
                judul: formData.title,
                kelas: formData.grade,
                bab: formData.topic,
                ringkasan: content
            });
            router.push("/dashboard/materi");
        } catch (err: any) {
            setError(err?.message || "Gagal menyimpan materi");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div>
                <Link href="/dashboard/materi" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
                    <ArrowLeft size={16} className="mr-2" />Kembali
                </Link>
                <h1 className="text-2xl md:text-3xl font-bold font-serif text-foreground">Tambah Materi Pembelajaran</h1>
                <p className="text-muted-foreground mt-1">Buat konten pembelajaran untuk siswa</p>
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

            {/* Type Selection */}
            <div className="grid md:grid-cols-3 gap-4">
                {typeOptions.map((type) => {
                    const Icon = type.icon;
                    return (
                        <button key={type.value} onClick={() => setMateriType(type.value)}
                            className={`flex flex-col items-center p-5 rounded-2xl border-2 transition-all ${materiType === type.value ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"}`}>
                            <div className={`w-12 h-12 rounded-xl ${type.color} flex items-center justify-center mb-3`}>
                                <Icon size={24} />
                            </div>
                            <h3 className={`font-bold ${materiType === type.value ? "text-primary" : "text-foreground"}`}>{type.label}</h3>
                            <p className="text-xs text-muted-foreground mt-1">{type.desc}</p>
                        </button>
                    );
                })}
            </div>

            {/* Basic Info - Text inputs */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-2xl border border-border p-6">
                <h2 className="text-lg font-bold mb-4 text-foreground">Informasi Dasar</h2>
                <div className="space-y-4">
                    <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Judul Materi" className="h-12 rounded-xl" />
                    <div className="grid md:grid-cols-3 gap-4">
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
                        <Input value={formData.topic} onChange={(e) => setFormData({ ...formData, topic: e.target.value })} placeholder="Topik/Bab" className="h-12 rounded-xl" />
                    </div>
                    <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Deskripsi singkat materi..." rows={2}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" />
                </div>
            </motion.div>

            {/* Content Editor */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-2xl border border-border p-6">
                <h2 className="text-lg font-bold mb-4 text-foreground">Konten Materi</h2>
                {materiType === "text" ? (
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Tulis konten materi di sini... (Markdown supported)" rows={12}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none font-mono text-sm" />
                ) : (
                    <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                        <Upload size={40} className="mx-auto text-muted-foreground mb-3" />
                        <p className="font-medium text-foreground">Drag & drop file di sini</p>
                        <p className="text-sm text-muted-foreground mt-1">atau klik untuk memilih file</p>
                        <p className="text-xs text-muted-foreground mt-3">
                            {materiType === "video" ? "MP4, WebM, maksimal 500MB" : "JPG, PNG, WEBP, maksimal 10MB"}
                        </p>
                    </div>
                )}
            </motion.div>

            {/* AI Generate */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-primary/5 rounded-2xl p-6 border border-primary/20">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center"><Sparkles size={24} className="text-white" /></div>
                    <div><h3 className="font-bold text-foreground">Generate dengan AI</h3><p className="text-sm text-muted-foreground">AI akan menyusun konten materi berdasarkan topik</p></div>
                </div>
                <div className="flex gap-3 mb-4">
                    <select
                        value={formData.model}
                        onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                        className="flex-1 h-12 px-4 rounded-xl border border-border bg-card text-foreground"
                    >
                        <option value="gemini-2.5-flash">Gemini 2.5 Flash (Cepat)</option>
                        <option value="gemini-2.5-pro">Gemini 2.5 Pro (Detail)</option>
                        <option value="gemini-3-pro-preview">Gemini 3 Pro Preview (Terbaru)</option>
                    </select>
                </div>
                <Button onClick={handleGenerate} disabled={isGenerating || materiType !== "text"} className="w-full bg-primary text-white rounded-xl h-14 text-lg">
                    {isGenerating ? <><Loader2 size={20} className="mr-2 animate-spin" />Generating...</> : <><Sparkles size={20} className="mr-2" />Generate Materi</>}
                </Button>
                {materiType !== "text" && <p className="text-xs text-center text-muted-foreground mt-2">AI generation hanya untuk tipe Teks</p>}
            </motion.div>

            <div className="flex justify-between">
                <Link href="/dashboard/materi"><Button variant="outline" className="rounded-xl"><ArrowLeft size={16} className="mr-2" />Batal</Button></Link>
                <Button onClick={handleSave} disabled={isSaving} className="bg-primary text-white rounded-xl">
                    {isSaving ? <Loader2 size={16} className="mr-2 animate-spin" /> : <Save size={16} className="mr-2" />}
                    Simpan Materi
                </Button>
            </div>
        </div>
    );
}
