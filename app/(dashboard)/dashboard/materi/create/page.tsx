"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Sparkles, Save, Loader2, FileText, Video, Image as ImageIcon, Upload, X } from "lucide-react";

const typeOptions = [
    { value: "text", label: "Teks", icon: FileText, color: "bg-blue-100 text-blue-600", desc: "Artikel, penjelasan, panduan" },
    { value: "video", label: "Video", icon: Video, color: "bg-rose-100 text-rose-600", desc: "Tutorial, demonstrasi" },
    { value: "image", label: "Gambar", icon: ImageIcon, color: "bg-amber-100 text-amber-600", desc: "Infografis, diagram" },
];

export default function CreateMateriPage() {
    const [isGenerating, setIsGenerating] = useState(false);
    const [materiType, setMateriType] = useState("text");
    const [formData, setFormData] = useState({ title: "", subject: "", grade: "", topic: "", description: "" });
    const [content, setContent] = useState("");

    const handleGenerate = async () => {
        setIsGenerating(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        setContent(`## Pengertian Bilangan Bulat

Bilangan bulat adalah himpunan bilangan yang terdiri dari bilangan bulat negatif, nol, dan bilangan bulat positif.

### Bilangan Bulat Positif
Bilangan bulat positif adalah bilangan asli, yaitu 1, 2, 3, 4, 5, dan seterusnya.

### Bilangan Bulat Negatif
Bilangan bulat negatif adalah lawan dari bilangan bulat positif, yaitu -1, -2, -3, -4, -5, dan seterusnya.

## Contoh dalam Kehidupan
- Suhu: -5°C (di bawah nol)
- Ketinggian: -100m (di bawah permukaan laut)
- Keuangan: -Rp50.000 (utang)`);
        setIsGenerating(false);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div>
                <Link href="/dashboard/materi" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
                    <ArrowLeft size={16} className="mr-2" />Kembali
                </Link>
                <h1 className="text-2xl md:text-3xl font-bold font-serif">Tambah Materi Pembelajaran</h1>
                <p className="text-muted-foreground mt-1">Buat konten pembelajaran untuk siswa</p>
            </div>

            {/* Type Selection */}
            <div className="grid md:grid-cols-3 gap-4">
                {typeOptions.map((type) => {
                    const Icon = type.icon;
                    return (
                        <button key={type.value} onClick={() => setMateriType(type.value)}
                            className={`flex flex-col items-center p-5 rounded-2xl border-2 transition-all ${materiType === type.value ? "border-primary bg-primary/5" : "border-neutral-200 hover:border-neutral-300"
                                }`}>
                            <div className={`w-12 h-12 rounded-xl ${type.color} flex items-center justify-center mb-3`}>
                                <Icon size={24} />
                            </div>
                            <h3 className={`font-bold ${materiType === type.value ? "text-primary" : "text-foreground"}`}>{type.label}</h3>
                            <p className="text-xs text-muted-foreground mt-1">{type.desc}</p>
                        </button>
                    );
                })}
            </div>

            {/* Basic Info */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border p-6">
                <h2 className="text-lg font-bold mb-4">Informasi Dasar</h2>
                <div className="space-y-4">
                    <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Judul Materi" className="h-12 rounded-xl" />
                    <div className="grid md:grid-cols-3 gap-4">
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
                    </div>
                    <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Deskripsi singkat materi..." rows={2}
                        className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" />
                </div>
            </motion.div>

            {/* Content Editor */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border p-6">
                <h2 className="text-lg font-bold mb-4">Konten Materi</h2>
                {materiType === "text" ? (
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Tulis konten materi di sini... (Markdown supported)" rows={12}
                        className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none font-mono text-sm" />
                ) : (
                    <div className="border-2 border-dashed border-neutral-200 rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
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
                    <div><h3 className="font-bold">Generate dengan AI</h3><p className="text-sm text-muted-foreground">AI akan menyusun konten materi berdasarkan topik</p></div>
                </div>
                <Button onClick={handleGenerate} disabled={isGenerating || materiType !== "text"} className="w-full bg-primary text-white rounded-xl h-14 text-lg">
                    {isGenerating ? <><Loader2 size={20} className="mr-2 animate-spin" />Generating...</> : <><Sparkles size={20} className="mr-2" />Generate Materi</>}
                </Button>
                {materiType !== "text" && <p className="text-xs text-center text-muted-foreground mt-2">AI generation hanya untuk tipe Teks</p>}
            </motion.div>

            <div className="flex justify-between">
                <Link href="/dashboard/materi"><Button variant="outline" className="rounded-xl"><ArrowLeft size={16} className="mr-2" />Batal</Button></Link>
                <Button className="bg-primary text-white rounded-xl"><Save size={16} className="mr-2" />Simpan Materi</Button>
            </div>
        </div>
    );
}
