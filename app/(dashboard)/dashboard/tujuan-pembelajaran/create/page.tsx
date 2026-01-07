"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Sparkles, Save, Loader2, Plus, Trash2, GraduationCap } from "lucide-react";

export default function CreateTPPage() {
    const [isGenerating, setIsGenerating] = useState(false);
    const [formData, setFormData] = useState({ title: "", subject: "", grade: "", cpId: "", week: "" });
    const [indicators, setIndicators] = useState(["", "", ""]);

    const addIndicator = () => setIndicators([...indicators, ""]);
    const removeIndicator = (index: number) => setIndicators(indicators.filter((_, i) => i !== index));
    const updateIndicator = (index: number, value: string) => {
        const newIndicators = [...indicators];
        newIndicators[index] = value;
        setIndicators(newIndicators);
    };

    const handleGenerate = async () => {
        setIsGenerating(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        setFormData({ ...formData, title: "Siswa dapat menjelaskan konsep bilangan bulat positif dan negatif dengan benar" });
        setIndicators([
            "Dapat menyebutkan contoh bilangan bulat positif",
            "Dapat menyebutkan contoh bilangan bulat negatif",
            "Dapat menempatkan bilangan bulat pada garis bilangan",
        ]);
        setIsGenerating(false);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div>
                <Link href="/dashboard/tujuan-pembelajaran" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
                    <ArrowLeft size={16} className="mr-2" />Kembali
                </Link>
                <h1 className="text-2xl md:text-3xl font-bold font-serif">Buat Tujuan Pembelajaran</h1>
                <p className="text-muted-foreground mt-1">Susun tujuan pembelajaran berdasarkan Capaian Pembelajaran</p>
            </div>

            {/* CP Selection */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100 p-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                        <GraduationCap size={20} />
                    </div>
                    <div>
                        <h3 className="font-bold text-emerald-900">Capaian Pembelajaran</h3>
                        <p className="text-sm text-emerald-700">Pilih CP sebagai dasar penyusunan TP</p>
                    </div>
                </div>
                <select value={formData.cpId} onChange={(e) => setFormData({ ...formData, cpId: e.target.value })}
                    className="w-full h-12 px-4 rounded-xl border border-emerald-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-200">
                    <option value="">Pilih Capaian Pembelajaran</option>
                    <option value="1">MAT-D-01: Memahami konsep bilangan bulat dan pecahan</option>
                    <option value="2">MAT-D-02: Menerapkan operasi hitung dalam pemecahan masalah</option>
                    <option value="3">BIN-D-01: Memahami teks naratif secara lisan dan tulis</option>
                </select>
            </motion.div>

            {/* Basic Info */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border p-6">
                <h2 className="text-lg font-bold mb-4">Informasi Dasar</h2>
                <div className="space-y-4">
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
                        <Input value={formData.week} onChange={(e) => setFormData({ ...formData, week: e.target.value })} placeholder="Minggu (1-2)" className="h-12 rounded-xl" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Rumusan Tujuan Pembelajaran</label>
                        <textarea value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="Siswa dapat... (rumuskan dengan kata kerja operasional sesuai level kognitif)" rows={3}
                            className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" />
                    </div>
                </div>
            </motion.div>

            {/* Indicators */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold">Indikator Pencapaian</h2>
                    <Button onClick={addIndicator} variant="outline" className="rounded-xl"><Plus size={16} className="mr-2" />Tambah</Button>
                </div>
                <div className="space-y-3">
                    {indicators.map((ind, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold shrink-0">{i + 1}</span>
                            <Input value={ind} onChange={(e) => updateIndicator(i, e.target.value)} placeholder="Deskripsi indikator pencapaian" className="flex-1 h-10 rounded-lg" />
                            {indicators.length > 1 && (
                                <button onClick={() => removeIndicator(i)} className="p-2 hover:bg-red-100 rounded-lg text-red-500"><Trash2 size={16} /></button>
                            )}
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* AI Generate */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-primary/5 rounded-2xl p-6 border border-primary/20">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center"><Sparkles size={24} className="text-white" /></div>
                    <div><h3 className="font-bold">Generate dengan AI</h3><p className="text-sm text-muted-foreground">AI akan merumuskan TP dan indikator berdasarkan CP</p></div>
                </div>
                <Button onClick={handleGenerate} disabled={isGenerating} className="w-full bg-primary text-white rounded-xl h-14 text-lg">
                    {isGenerating ? <><Loader2 size={20} className="mr-2 animate-spin" />Generating...</> : <><Sparkles size={20} className="mr-2" />Generate TP</>}
                </Button>
            </motion.div>

            <div className="flex justify-between">
                <Link href="/dashboard/tujuan-pembelajaran"><Button variant="outline" className="rounded-xl"><ArrowLeft size={16} className="mr-2" />Batal</Button></Link>
                <Button className="bg-primary text-white rounded-xl"><Save size={16} className="mr-2" />Simpan TP</Button>
            </div>
        </div>
    );
}
