"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Sparkles, Plus, Trash2, Save, Loader2, Star, GripVertical, AlertCircle } from "lucide-react";
import { api } from "@/lib/api";
import {
    JENJANG_OPTIONS,
    getKelasByJenjang,
    getMapelByJenjang,
    getFase,
    BIDANG_KEAHLIAN_SMK,
    AI_MODEL_OPTIONS,
} from "@/lib/form-constants";

const penilaianTypes = [
    { value: "sikap", label: "Sikap" },
    { value: "pengetahuan", label: "Pengetahuan" },
    { value: "keterampilan", label: "Keterampilan" },
    { value: "proyek", label: "Proyek" },
    { value: "portofolio", label: "Portofolio" },
];

const skalaOptions = [
    { value: "1-4", label: "Skala 1-4" },
    { value: "1-100", label: "Skala 1-100" },
    { value: "A-E", label: "Grade A-E" },
];

export default function CreateRubrikPage() {
    const router = useRouter();
    const [isGenerating, setIsGenerating] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        title: "",
        subject: "",
        kelas: "",
        topik: "",
        jenis_penilaian: "keterampilan",
        skala: "1-4",
        model: "gemini-2.5-flash"
    });
    const [criteria, setCriteria] = useState<any[]>([]);

    const addCriteria = () => {
        setCriteria([...criteria, {
            id: String(Date.now()),
            aspek: "",
            bobot: 25,
            deskriptor: { "1": "", "2": "", "3": "", "4": "" }
        }]);
    };

    const removeCriteria = (id: string) => {
        setCriteria(criteria.filter(c => c.id !== id));
    };

    const updateCriteria = (id: string, field: string, value: any) => {
        setCriteria(criteria.map(c => c.id === id ? { ...c, [field]: value } : c));
    };

    const updateDeskriptor = (id: string, level: string, value: string) => {
        setCriteria(criteria.map(c => c.id === id ? {
            ...c,
            deskriptor: { ...c.deskriptor, [level]: value }
        } : c));
    };

    const handleGenerate = async () => {
        if (!formData.subject || !formData.topik) {
            setError("Mohon isi Mata Pelajaran dan Topik terlebih dahulu");
            return;
        }
        setIsGenerating(true);
        setError(null);
        try {
            const result = await api.post<any>('/api/v2/rubrik/generate', {
                mapel: formData.subject,
                topik: formData.topik,
                kelas: formData.kelas || "Umum",
                jenis_penilaian: formData.jenis_penilaian,
                skala: formData.skala,
                model: formData.model
            });

            if (result.kriteria && Array.isArray(result.kriteria)) {
                setCriteria(result.kriteria.map((k: any, i: number) => ({
                    id: String(i + 1),
                    aspek: k.aspek || "",
                    bobot: k.bobot || 25,
                    deskriptor: k.deskriptor || { "1": "", "2": "", "3": "", "4": "" }
                })));
            }
            if (result.judul) {
                setFormData(prev => ({ ...prev, title: result.judul }));
            }
        } catch (err: any) {
            console.error(err);
            setError(err?.message || "Gagal generate rubrik. Silakan coba lagi.");
        } finally {
            setIsGenerating(false);
        }
    };

    const handleSave = async () => {
        if (!formData.title || criteria.length === 0) {
            setError("Mohon isi judul dan minimal 1 kriteria");
            return;
        }
        setIsSaving(true);
        setError(null);
        try {
            await api.post('/api/v2/rubrik', {
                judul: formData.title,
                jenis_penilaian: formData.jenis_penilaian,
                skala: formData.skala,
                kriteria: criteria.map(c => ({
                    aspek: c.aspek,
                    bobot: c.bobot,
                    deskriptor: c.deskriptor
                }))
            });
            router.push("/dashboard/rubrik");
        } catch (err: any) {
            setError(err?.message || "Gagal menyimpan rubrik");
        } finally {
            setIsSaving(false);
        }
    };

    const totalWeight = criteria.reduce((a, c) => a + (c.bobot || 0), 0);

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            <div>
                <Link href="/dashboard/rubrik" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
                    <ArrowLeft size={16} className="mr-2" />Kembali
                </Link>
                <h1 className="text-2xl md:text-3xl font-bold font-serif text-foreground">Buat Rubrik Penilaian</h1>
                <p className="text-muted-foreground mt-1">Susun rubrik dengan kriteria dan level pencapaian</p>
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
                    <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Judul Rubrik (contoh: Rubrik Penilaian Presentasi)" className="h-12 rounded-xl" />
                    <div className="grid md:grid-cols-4 gap-4">
                        <Input
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            placeholder="Mata Pelajaran"
                            className="h-12 rounded-xl"
                        />
                        <Input
                            value={formData.kelas}
                            onChange={(e) => setFormData({ ...formData, kelas: e.target.value })}
                            placeholder="Kelas (X PPLG, XI TMS)"
                            className="h-12 rounded-xl"
                        />
                        <Input
                            value={formData.topik}
                            onChange={(e) => setFormData({ ...formData, topik: e.target.value })}
                            placeholder="Topik/Kegiatan"
                            className="h-12 rounded-xl"
                        />
                        <select
                            value={formData.jenis_penilaian}
                            onChange={(e) => setFormData({ ...formData, jenis_penilaian: e.target.value })}
                            className="h-12 px-4 rounded-xl border border-border bg-card text-foreground"
                        >
                            {penilaianTypes.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
                        </select>
                    </div>
                </div>
            </motion.div>

            {/* Rubric Builder */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-2xl border border-border overflow-hidden">
                <div className="p-6 border-b border-border flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-bold text-foreground">Matrix Rubrik</h2>
                        <p className="text-sm text-muted-foreground">4 level: Perlu Bimbingan → Cukup → Baik → Sangat Baik</p>
                    </div>
                    <Button onClick={addCriteria} variant="outline" className="rounded-xl"><Plus size={16} className="mr-2" />Tambah Kriteria</Button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-muted">
                                <th className="w-8"></th>
                                <th className="px-4 py-3 text-left text-sm font-bold text-muted-foreground">Kriteria</th>
                                <th className="px-2 py-3 text-center text-sm w-16">Bobot</th>
                                <th className="px-2 py-3 text-center text-xs text-red-600 bg-red-50 dark:bg-red-900/20 w-32"><Star size={12} className="inline" /> 1</th>
                                <th className="px-2 py-3 text-center text-xs text-amber-600 bg-amber-50 dark:bg-amber-900/20 w-32"><Star size={12} className="inline" /><Star size={12} className="inline" /></th>
                                <th className="px-2 py-3 text-center text-xs text-blue-600 bg-blue-50 dark:bg-blue-900/20 w-32"><Star size={12} className="inline" /><Star size={12} className="inline" /><Star size={12} className="inline" /></th>
                                <th className="px-2 py-3 text-center text-xs text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 w-32"><Star size={12} className="inline" /><Star size={12} className="inline" /><Star size={12} className="inline" /><Star size={12} className="inline" /></th>
                                <th className="w-12"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {criteria.map((c) => (
                                <tr key={c.id}>
                                    <td className="px-2 text-center"><GripVertical size={14} className="text-muted-foreground cursor-grab" /></td>
                                    <td className="px-4 py-3">
                                        <Input value={c.aspek} onChange={(e) => updateCriteria(c.id, "aspek", e.target.value)} placeholder="Nama kriteria" className="h-9 rounded-lg" />
                                    </td>
                                    <td className="px-2 py-3">
                                        <div className="flex items-center gap-1">
                                            <Input value={String(c.bobot)} onChange={(e) => updateCriteria(c.id, "bobot", parseInt(e.target.value) || 0)}
                                                type="number" className="w-14 h-9 rounded-lg text-center" />
                                            <span className="text-xs">%</span>
                                        </div>
                                    </td>
                                    {["1", "2", "3", "4"].map((level, i) => (
                                        <td key={level} className={`px-2 py-3 ${i === 0 ? "bg-red-50/50 dark:bg-red-900/10" : i === 1 ? "bg-amber-50/50 dark:bg-amber-900/10" : i === 2 ? "bg-blue-50/50 dark:bg-blue-900/10" : "bg-emerald-50/50 dark:bg-emerald-900/10"}`}>
                                            <textarea
                                                value={c.deskriptor?.[level] || ""}
                                                onChange={(e) => updateDeskriptor(c.id, level, e.target.value)}
                                                placeholder={`Level ${level}`}
                                                rows={2}
                                                className="w-full text-xs p-2 rounded-lg border border-border bg-background resize-none"
                                            />
                                        </td>
                                    ))}
                                    <td className="px-2 text-center">
                                        <button onClick={() => removeCriteria(c.id)} className="p-2 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg text-red-500"><Trash2 size={14} /></button>
                                    </td>
                                </tr>
                            ))}
                            {criteria.length === 0 && (
                                <tr><td colSpan={8} className="px-4 py-8 text-center text-muted-foreground">Belum ada kriteria. Klik "Generate dengan AI" atau "Tambah Kriteria"</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {criteria.length > 0 && (
                    <div className="p-4 bg-muted border-t border-border flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Total Bobot:</span>
                        <span className={`font-bold ${totalWeight === 100 ? "text-emerald-600" : "text-red-600"}`}>{totalWeight}%</span>
                    </div>
                )}
            </motion.div>

            {/* AI Generate */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-primary/5 rounded-2xl p-6 border border-primary/20">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center"><Sparkles size={24} className="text-white" /></div>
                    <div><h3 className="font-bold text-foreground">Generate dengan AI</h3><p className="text-sm text-muted-foreground">AI akan menyusun deskriptor untuk setiap level</p></div>
                </div>
                <div className="flex gap-3 mb-4">
                    <select
                        value={formData.skala}
                        onChange={(e) => setFormData({ ...formData, skala: e.target.value })}
                        className="h-12 px-4 rounded-xl border border-border bg-card text-foreground"
                    >
                        {skalaOptions.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                    </select>
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
                    {isGenerating ? <><Loader2 size={20} className="mr-2 animate-spin" />Generating...</> : <><Sparkles size={20} className="mr-2" />Generate Rubrik</>}
                </Button>
            </motion.div>

            <div className="flex justify-between">
                <Link href="/dashboard/rubrik"><Button variant="outline" className="rounded-xl"><ArrowLeft size={16} className="mr-2" />Batal</Button></Link>
                <Button onClick={handleSave} disabled={isSaving} className="bg-primary text-white rounded-xl">
                    {isSaving ? <Loader2 size={16} className="mr-2 animate-spin" /> : <Save size={16} className="mr-2" />}
                    Simpan Rubrik
                </Button>
            </div>
        </div>
    );
}
