"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Sparkles, Plus, Trash2, Save, Loader2, Grid3X3 } from "lucide-react";

const levelOptions = [
    { value: "C1", label: "C1 - Mengingat" },
    { value: "C2", label: "C2 - Memahami" },
    { value: "C3", label: "C3 - Menerapkan" },
    { value: "C4", label: "C4 - Menganalisis" },
    { value: "C5", label: "C5 - Mengevaluasi" },
    { value: "C6", label: "C6 - Mencipta" },
];

export default function CreateKisiKisiPage() {
    const [isGenerating, setIsGenerating] = useState(false);
    const [formData, setFormData] = useState({ title: "", subject: "", grade: "", type: "", semester: "" });
    const [items, setItems] = useState([
        { id: "1", cp: "", materi: "", indikator: "", level: "C2", pg: 5, essay: 1 },
        { id: "2", cp: "", materi: "", indikator: "", level: "C3", pg: 5, essay: 1 },
    ]);

    const addItem = () => {
        setItems([...items, { id: String(items.length + 1), cp: "", materi: "", indikator: "", level: "C2", pg: 0, essay: 0 }]);
    };

    const removeItem = (id: string) => {
        setItems(items.filter(i => i.id !== id));
    };

    const updateItem = (id: string, field: string, value: any) => {
        setItems(items.map(i => i.id === id ? { ...i, [field]: value } : i));
    };

    const handleGenerate = async () => {
        setIsGenerating(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        setItems([
            { id: "1", cp: "MAT-D-01", materi: "Bilangan Bulat", indikator: "Memahami konsep bilangan bulat", level: "C2", pg: 3, essay: 1 },
            { id: "2", cp: "MAT-D-01", materi: "Operasi Bilangan Bulat", indikator: "Menghitung operasi bilangan bulat", level: "C3", pg: 4, essay: 1 },
            { id: "3", cp: "MAT-D-02", materi: "Pecahan", indikator: "Memahami konsep pecahan", level: "C2", pg: 3, essay: 0 },
            { id: "4", cp: "MAT-D-02", materi: "Operasi Pecahan", indikator: "Menyelesaikan operasi pecahan", level: "C3", pg: 5, essay: 1 },
        ]);
        setIsGenerating(false);
    };

    const totalPG = items.reduce((a, i) => a + i.pg, 0);
    const totalEssay = items.reduce((a, i) => a + i.essay, 0);

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            <div>
                <Link href="/dashboard/kisi-kisi" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
                    <ArrowLeft size={16} className="mr-2" />Kembali
                </Link>
                <h1 className="text-2xl md:text-3xl font-bold font-serif">Buat Kisi-Kisi</h1>
                <p className="text-muted-foreground mt-1">Petakan soal berdasarkan CP, materi, dan level kognitif</p>
            </div>

            {/* Basic Info */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border p-6">
                <h2 className="text-lg font-bold mb-4">Informasi Dasar</h2>
                <div className="space-y-4">
                    <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Judul Kisi-Kisi (contoh: Kisi-Kisi UTS Matematika Kelas 7)" className="h-12 rounded-xl" />
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
                        <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} className="h-12 px-4 rounded-xl border border-neutral-200">
                            <option value="">Jenis Ujian</option>
                            <option value="UH">Ulangan Harian</option>
                            <option value="UTS">UTS</option>
                            <option value="UAS">UAS</option>
                        </select>
                        <select value={formData.semester} onChange={(e) => setFormData({ ...formData, semester: e.target.value })} className="h-12 px-4 rounded-xl border border-neutral-200">
                            <option value="">Semester</option>
                            <option value="1">Ganjil</option>
                            <option value="2">Genap</option>
                        </select>
                    </div>
                </div>
            </motion.div>

            {/* Kisi-Kisi Builder */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border overflow-hidden">
                <div className="p-6 border-b flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center"><Grid3X3 size={20} /></div>
                        <div><h2 className="text-lg font-bold">Pemetaan Soal</h2><p className="text-sm text-muted-foreground">Total: {totalPG} PG, {totalEssay} Essay</p></div>
                    </div>
                    <Button onClick={addItem} variant="outline" className="rounded-xl"><Plus size={16} className="mr-2" />Tambah Baris</Button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-neutral-50">
                            <tr>
                                <th className="px-4 py-3 text-left font-bold text-muted-foreground">No</th>
                                <th className="px-4 py-3 text-left font-bold text-muted-foreground">Kode CP</th>
                                <th className="px-4 py-3 text-left font-bold text-muted-foreground">Materi</th>
                                <th className="px-4 py-3 text-left font-bold text-muted-foreground">Indikator</th>
                                <th className="px-4 py-3 text-center font-bold text-muted-foreground">Level</th>
                                <th className="px-4 py-3 text-center font-bold text-muted-foreground">PG</th>
                                <th className="px-4 py-3 text-center font-bold text-muted-foreground">Essay</th>
                                <th className="w-12"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {items.map((item, index) => (
                                <tr key={item.id} className="hover:bg-neutral-50">
                                    <td className="px-4 py-3 text-center font-medium">{index + 1}</td>
                                    <td className="px-4 py-3"><Input value={item.cp} onChange={(e) => updateItem(item.id, "cp", e.target.value)} placeholder="MAT-D-01" className="h-9 rounded-lg w-24" /></td>
                                    <td className="px-4 py-3"><Input value={item.materi} onChange={(e) => updateItem(item.id, "materi", e.target.value)} placeholder="Materi" className="h-9 rounded-lg w-36" /></td>
                                    <td className="px-4 py-3"><Input value={item.indikator} onChange={(e) => updateItem(item.id, "indikator", e.target.value)} placeholder="Indikator" className="h-9 rounded-lg" /></td>
                                    <td className="px-4 py-3">
                                        <select value={item.level} onChange={(e) => updateItem(item.id, "level", e.target.value)} className="h-9 px-2 rounded-lg border border-neutral-200 text-xs">
                                            {levelOptions.map(l => <option key={l.value} value={l.value}>{l.value}</option>)}
                                        </select>
                                    </td>
                                    <td className="px-4 py-3"><Input value={String(item.pg)} onChange={(e) => updateItem(item.id, "pg", parseInt(e.target.value) || 0)} type="number" className="h-9 w-14 rounded-lg text-center" /></td>
                                    <td className="px-4 py-3"><Input value={String(item.essay)} onChange={(e) => updateItem(item.id, "essay", parseInt(e.target.value) || 0)} type="number" className="h-9 w-14 rounded-lg text-center" /></td>
                                    <td className="px-4 py-3"><button onClick={() => removeItem(item.id)} className="p-2 hover:bg-red-100 rounded-lg text-red-500"><Trash2 size={14} /></button></td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot className="bg-neutral-50 font-bold">
                            <tr>
                                <td colSpan={5} className="px-4 py-3 text-right">Total:</td>
                                <td className="px-4 py-3 text-center">{totalPG}</td>
                                <td className="px-4 py-3 text-center">{totalEssay}</td>
                                <td></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </motion.div>

            {/* AI Generate */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-primary/5 rounded-2xl p-6 border border-primary/20">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center"><Sparkles size={24} className="text-white" /></div>
                    <div><h3 className="font-bold">Generate dengan AI</h3><p className="text-sm text-muted-foreground">AI akan menyusun kisi-kisi berdasarkan CP dan materi</p></div>
                </div>
                <Button onClick={handleGenerate} disabled={isGenerating} className="w-full bg-primary text-white rounded-xl h-14 text-lg">
                    {isGenerating ? <><Loader2 size={20} className="mr-2 animate-spin" />Generating...</> : <><Sparkles size={20} className="mr-2" />Generate Kisi-Kisi</>}
                </Button>
            </motion.div>

            <div className="flex justify-between">
                <Link href="/dashboard/kisi-kisi"><Button variant="outline" className="rounded-xl"><ArrowLeft size={16} className="mr-2" />Batal</Button></Link>
                <Button className="bg-primary text-white rounded-xl"><Save size={16} className="mr-2" />Simpan Kisi-Kisi</Button>
            </div>
        </div>
    );
}
