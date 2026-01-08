"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Sparkles, Plus, Trash2, Save, Loader2, CheckCircle2, ListChecks, PenLine, Download } from "lucide-react";
import { api } from "@/lib/api";

export default function CreateAsesmenPage() {
    const [isGenerating, setIsGenerating] = useState(false);
    const [asesmenType, setAsesmenType] = useState<"formatif" | "sumatif">("formatif");
    const [formData, setFormData] = useState({
        title: "",
        subject: "",
        grade: "",
        cp: "",
        model: "gemini-2.5-flash",
        format: "pdf"
    });
    const [result, setResult] = useState<any>(null);

    const [criteria, setCriteria] = useState([
        { id: "1", name: "Pemahaman Konsep", weight: 30 },
        { id: "2", name: "Penerapan", weight: 40 },
        { id: "3", name: "Komunikasi", weight: 30 },
    ]);

    const addCriteria = () => {
        setCriteria([...criteria, { id: String(criteria.length + 1), name: "", weight: 0 }]);
    };

    const removeCriteria = (id: string) => {
        setCriteria(criteria.filter(c => c.id !== id));
    };

    const handleGenerate = async () => {
        setIsGenerating(true);
        setResult(null);
        try {
            const payload = {
                mapel: formData.subject,
                topik: formData.title,
                kelas: formData.grade,
                kurikulum: "Kurikulum Merdeka",
                alokasi_waktu: 90, // Default
                model: formData.model,
                format: formData.format,
                document_type: "asesmen",
                // Manual Overrides
                capaian_pembelajaran: formData.cp ? [formData.cp] : [],
                asesmen: {
                    jenis: asesmenType,
                    kriteria: criteria
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
                <Link href="/dashboard/asesmen" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
                    <ArrowLeft size={16} className="mr-2" />Kembali
                </Link>
                <h1 className="text-2xl md:text-3xl font-bold font-serif text-foreground">Buat Asesmen Baru</h1>
                <p className="text-muted-foreground mt-1">Rancang asesmen formatif atau sumatif</p>
            </div>

            {/* Type Selection */}
            <div className="flex gap-4">
                {[
                    { value: "formatif", label: "Asesmen Formatif", icon: ListChecks, desc: "Penilaian proses belajar" },
                    { value: "sumatif", label: "Asesmen Sumatif", icon: PenLine, desc: "Penilaian akhir capaian" },
                ].map((type) => {
                    const Icon = type.icon;
                    return (
                        <button key={type.value} onClick={() => setAsesmenType(type.value as any)}
                            className={`flex-1 p-5 rounded-2xl border-2 transition-all ${asesmenType === type.value ? "border-primary bg-primary/5" : "border-neutral-200 hover:border-neutral-300"}`}>
                            <Icon size={28} className={asesmenType === type.value ? "text-primary" : "text-muted-foreground"} />
                            <h3 className={`font-bold mt-2 ${asesmenType === type.value ? "text-primary" : "text-foreground"}`}>{type.label}</h3>
                            <p className="text-sm text-muted-foreground">{type.desc}</p>
                        </button>
                    );
                })}
            </div>

            {/* Basic Info */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border border-neutral-200 p-6">
                <h2 className="text-lg font-bold mb-6">Informasi Dasar</h2>
                <div className="space-y-4">
                    <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Judul Asesmen" className="h-12 rounded-xl" />
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
                        <Input value={formData.cp} onChange={(e) => setFormData({ ...formData, cp: e.target.value })} placeholder="Kode CP/TP" className="h-12 rounded-xl" />
                    </div>
                </div>
            </motion.div>

            {/* Criteria */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border border-neutral-200 p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold">Kriteria Penilaian</h2>
                    <Button onClick={addCriteria} variant="outline" className="rounded-xl"><Plus size={16} className="mr-2" />Tambah</Button>
                </div>
                <div className="space-y-3">
                    {criteria.map((c, i) => (
                        <div key={c.id} className="flex items-center gap-3 p-4 bg-neutral-50 rounded-xl">
                            <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold">{i + 1}</span>
                            <Input value={c.name} placeholder="Nama Kriteria" className="flex-1 h-10 rounded-lg" />
                            <div className="flex items-center gap-2">
                                <Input value={String(c.weight)} type="number" className="w-20 h-10 rounded-lg text-center" />
                                <span className="text-sm text-muted-foreground">%</span>
                            </div>
                            <button onClick={() => removeCriteria(c.id)} className="p-2 hover:bg-red-100 rounded-lg text-red-500"><Trash2 size={16} /></button>
                        </div>
                    ))}
                </div>
                <div className="mt-4 p-3 bg-neutral-100 rounded-xl flex justify-between">
                    <span className="font-medium">Total Bobot:</span>
                    <span className={`font-bold ${criteria.reduce((a, c) => a + c.weight, 0) === 100 ? "text-emerald-600" : "text-red-600"}`}>
                        {criteria.reduce((a, c) => a + c.weight, 0)}%
                    </span>
                </div>
            </motion.div>

            {/* AI Generate */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-primary/5 rounded-2xl p-6 border border-primary/20">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center"><Sparkles size={24} className="text-white" /></div>
                    <div><h3 className="font-bold">Generate dengan AI</h3><p className="text-sm text-muted-foreground">AI akan menyusun rubrik dan instrumen asesmen</p></div>
                </div>
                <Button onClick={handleGenerate} disabled={isGenerating} className="w-full bg-primary text-white rounded-xl h-14 text-lg">
                    {isGenerating ? <><Loader2 size={20} className="mr-2 animate-spin" />Generating...</> : <><Sparkles size={20} className="mr-2" />Generate Asesmen</>}
                </Button>

                {/* Configuration */}
                <div className="grid md:grid-cols-2 gap-4 mt-4">
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
                                <h3 className="font-bold text-emerald-900">Dokumen Siap!</h3>
                                <p className="text-sm text-emerald-700">
                                    Asesmen berhasil digenerate dan siap diunduh.
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
                <Link href="/dashboard/asesmen"><Button variant="outline" className="rounded-xl"><ArrowLeft size={16} className="mr-2" />Batal</Button></Link>
                <Button className="bg-primary text-white rounded-xl"><Save size={16} className="mr-2" />Simpan</Button>
            </div>
        </div>
    );
}
