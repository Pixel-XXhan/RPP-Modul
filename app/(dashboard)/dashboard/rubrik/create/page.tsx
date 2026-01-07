"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Sparkles, Plus, Trash2, Save, Loader2, Star, GripVertical } from "lucide-react";

export default function CreateRubrikPage() {
    const [isGenerating, setIsGenerating] = useState(false);
    const [formData, setFormData] = useState({ title: "", subject: "", description: "" });
    const [criteria, setCriteria] = useState([
        { id: "1", name: "Kriteria 1", weight: 25, levels: ["", "", "", ""] },
        { id: "2", name: "Kriteria 2", weight: 25, levels: ["", "", "", ""] },
        { id: "3", name: "Kriteria 3", weight: 25, levels: ["", "", "", ""] },
        { id: "4", name: "Kriteria 4", weight: 25, levels: ["", "", "", ""] },
    ]);

    const addCriteria = () => {
        setCriteria([...criteria, { id: String(criteria.length + 1), name: "", weight: 0, levels: ["", "", "", ""] }]);
    };

    const removeCriteria = (id: string) => {
        setCriteria(criteria.filter(c => c.id !== id));
    };

    const updateCriteria = (id: string, field: string, value: any) => {
        setCriteria(criteria.map(c => c.id === id ? { ...c, [field]: value } : c));
    };

    const handleGenerate = async () => {
        setIsGenerating(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        setCriteria([
            { id: "1", name: "Konten & Materi", weight: 30, levels: ["Materi kurang lengkap", "Materi cukup lengkap", "Materi lengkap dan relevan", "Materi sangat lengkap dan mendalam"] },
            { id: "2", name: "Penyampaian", weight: 25, levels: ["Kurang percaya diri", "Cukup jelas", "Jelas dan percaya diri", "Sangat jelas dan menarik"] },
            { id: "3", name: "Visual Aids", weight: 20, levels: ["Slide kurang mendukung", "Slide cukup memadai", "Slide baik", "Slide sangat profesional"] },
            { id: "4", name: "Manajemen Waktu", weight: 25, levels: ["Tidak sesuai waktu", "Sedikit melebihi", "Sesuai waktu", "Tepat waktu dengan pace sempurna"] },
        ]);
        setIsGenerating(false);
    };

    const totalWeight = criteria.reduce((a, c) => a + c.weight, 0);

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            <div>
                <Link href="/dashboard/rubrik" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
                    <ArrowLeft size={16} className="mr-2" />Kembali
                </Link>
                <h1 className="text-2xl md:text-3xl font-bold font-serif">Buat Rubrik Penilaian</h1>
                <p className="text-muted-foreground mt-1">Susun rubrik dengan kriteria dan level pencapaian</p>
            </div>

            {/* Basic Info */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border p-6">
                <h2 className="text-lg font-bold mb-4">Informasi Dasar</h2>
                <div className="space-y-4">
                    <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Judul Rubrik (contoh: Rubrik Penilaian Presentasi)" className="h-12 rounded-xl" />
                    <div className="grid md:grid-cols-2 gap-4">
                        <select value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} className="h-12 px-4 rounded-xl border border-neutral-200">
                            <option value="">Mata Pelajaran</option>
                            <option value="umum">Umum</option>
                            <option value="matematika">Matematika</option>
                            <option value="bahasa-indonesia">Bahasa Indonesia</option>
                        </select>
                        <Input value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Deskripsi singkat" className="h-12 rounded-xl" />
                    </div>
                </div>
            </motion.div>

            {/* Rubric Builder */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border overflow-hidden">
                <div className="p-6 border-b flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-bold">Matrix Rubrik</h2>
                        <p className="text-sm text-muted-foreground">4 level: Perlu Bimbingan → Cukup → Baik → Sangat Baik</p>
                    </div>
                    <Button onClick={addCriteria} variant="outline" className="rounded-xl"><Plus size={16} className="mr-2" />Tambah Kriteria</Button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-neutral-50">
                                <th className="w-8"></th>
                                <th className="px-4 py-3 text-left text-sm font-bold text-muted-foreground">Kriteria</th>
                                <th className="px-2 py-3 text-center text-sm w-16">Bobot</th>
                                <th className="px-2 py-3 text-center text-xs text-red-600 bg-red-50 w-32"><Star size={12} className="inline" /> 1</th>
                                <th className="px-2 py-3 text-center text-xs text-amber-600 bg-amber-50 w-32"><Star size={12} className="inline" /><Star size={12} className="inline" /></th>
                                <th className="px-2 py-3 text-center text-xs text-blue-600 bg-blue-50 w-32"><Star size={12} className="inline" /><Star size={12} className="inline" /><Star size={12} className="inline" /></th>
                                <th className="px-2 py-3 text-center text-xs text-emerald-600 bg-emerald-50 w-32"><Star size={12} className="inline" /><Star size={12} className="inline" /><Star size={12} className="inline" /><Star size={12} className="inline" /></th>
                                <th className="w-12"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {criteria.map((c) => (
                                <tr key={c.id}>
                                    <td className="px-2 text-center"><GripVertical size={14} className="text-muted-foreground cursor-grab" /></td>
                                    <td className="px-4 py-3">
                                        <Input value={c.name} onChange={(e) => updateCriteria(c.id, "name", e.target.value)} placeholder="Nama kriteria" className="h-9 rounded-lg" />
                                    </td>
                                    <td className="px-2 py-3">
                                        <div className="flex items-center gap-1">
                                            <Input value={String(c.weight)} onChange={(e) => updateCriteria(c.id, "weight", parseInt(e.target.value) || 0)}
                                                type="number" className="w-14 h-9 rounded-lg text-center" />
                                            <span className="text-xs">%</span>
                                        </div>
                                    </td>
                                    {c.levels.map((level, i) => (
                                        <td key={i} className={`px-2 py-3 ${i === 0 ? "bg-red-50/50" : i === 1 ? "bg-amber-50/50" : i === 2 ? "bg-blue-50/50" : "bg-emerald-50/50"}`}>
                                            <textarea value={level} onChange={(e) => {
                                                const newLevels = [...c.levels];
                                                newLevels[i] = e.target.value;
                                                updateCriteria(c.id, "levels", newLevels);
                                            }} placeholder={`Level ${i + 1}`} rows={2}
                                                className="w-full text-xs p-2 rounded-lg border border-neutral-200 resize-none" />
                                        </td>
                                    ))}
                                    <td className="px-2 text-center">
                                        <button onClick={() => removeCriteria(c.id)} className="p-2 hover:bg-red-100 rounded-lg text-red-500"><Trash2 size={14} /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-4 bg-neutral-50 border-t flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total Bobot:</span>
                    <span className={`font-bold ${totalWeight === 100 ? "text-emerald-600" : "text-red-600"}`}>{totalWeight}%</span>
                </div>
            </motion.div>

            {/* AI Generate */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-primary/5 rounded-2xl p-6 border border-primary/20">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center"><Sparkles size={24} className="text-white" /></div>
                    <div><h3 className="font-bold">Generate dengan AI</h3><p className="text-sm text-muted-foreground">AI akan menyusun deskriptor untuk setiap level</p></div>
                </div>
                <Button onClick={handleGenerate} disabled={isGenerating} className="w-full bg-primary text-white rounded-xl h-14 text-lg">
                    {isGenerating ? <><Loader2 size={20} className="mr-2 animate-spin" />Generating...</> : <><Sparkles size={20} className="mr-2" />Generate Rubrik</>}
                </Button>
            </motion.div>

            <div className="flex justify-between">
                <Link href="/dashboard/rubrik"><Button variant="outline" className="rounded-xl"><ArrowLeft size={16} className="mr-2" />Batal</Button></Link>
                <Button className="bg-primary text-white rounded-xl"><Save size={16} className="mr-2" />Simpan Rubrik</Button>
            </div>
        </div>
    );
}
