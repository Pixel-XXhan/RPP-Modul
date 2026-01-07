"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    ArrowLeft,
    Sparkles,
    Target,
    Plus,
    Trash2,
    GripVertical,
    Save,
    Loader2,
    ChevronDown,
    ChevronUp,
    GraduationCap,
} from "lucide-react";

export default function CreateATPPage() {
    const [isGenerating, setIsGenerating] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        subject: "",
        grade: "",
        phase: "",
        semester: "",
        cpId: "",
    });

    const [tujuanPembelajaran, setTujuanPembelajaran] = useState([
        { id: "1", title: "TP 1: Memahami konsep dasar", indicators: ["Indikator 1", "Indikator 2"] },
        { id: "2", title: "TP 2: Menerapkan konsep", indicators: ["Indikator 1"] },
    ]);

    const [expandedTP, setExpandedTP] = useState<string | null>("1");

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const addTP = () => {
        const newId = String(tujuanPembelajaran.length + 1);
        setTujuanPembelajaran([
            ...tujuanPembelajaran,
            { id: newId, title: `TP ${newId}: `, indicators: [] }
        ]);
        setExpandedTP(newId);
    };

    const removeTP = (id: string) => {
        setTujuanPembelajaran(tujuanPembelajaran.filter(tp => tp.id !== id));
    };

    const updateTPTitle = (id: string, title: string) => {
        setTujuanPembelajaran(tujuanPembelajaran.map(tp =>
            tp.id === id ? { ...tp, title } : tp
        ));
    };

    const addIndicator = (tpId: string) => {
        setTujuanPembelajaran(tujuanPembelajaran.map(tp =>
            tp.id === tpId ? { ...tp, indicators: [...tp.indicators, ""] } : tp
        ));
    };

    const updateIndicator = (tpId: string, index: number, value: string) => {
        setTujuanPembelajaran(tujuanPembelajaran.map(tp =>
            tp.id === tpId
                ? { ...tp, indicators: tp.indicators.map((ind, i) => i === index ? value : ind) }
                : tp
        ));
    };

    const removeIndicator = (tpId: string, index: number) => {
        setTujuanPembelajaran(tujuanPembelajaran.map(tp =>
            tp.id === tpId
                ? { ...tp, indicators: tp.indicators.filter((_, i) => i !== index) }
                : tp
        ));
    };

    const handleGenerate = async () => {
        setIsGenerating(true);
        await new Promise(resolve => setTimeout(resolve, 3000));
        setIsGenerating(false);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div>
                <Link
                    href="/dashboard/atp"
                    className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
                >
                    <ArrowLeft size={16} className="mr-2" />
                    Kembali ke Daftar ATP
                </Link>
                <h1 className="text-2xl md:text-3xl font-bold font-serif text-foreground">Buat ATP Baru</h1>
                <p className="text-muted-foreground mt-1">Susun Alur Tujuan Pembelajaran berdasarkan Capaian Pembelajaran</p>
            </div>

            {/* Basic Info */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl border border-neutral-200 p-6"
            >
                <h2 className="text-lg font-bold font-serif text-foreground mb-6">Informasi Dasar</h2>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Judul ATP</label>
                        <Input
                            value={formData.title}
                            onChange={(e) => handleInputChange("title", e.target.value)}
                            placeholder="Contoh: ATP Matematika - Aljabar Kelas 7"
                            className="h-12 rounded-xl"
                        />
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">Mata Pelajaran</label>
                            <select
                                value={formData.subject}
                                onChange={(e) => handleInputChange("subject", e.target.value)}
                                className="w-full h-12 px-4 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
                            >
                                <option value="">Pilih</option>
                                <option value="matematika">Matematika</option>
                                <option value="bahasa-indonesia">Bahasa Indonesia</option>
                                <option value="ipa">IPA</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">Fase</label>
                            <select
                                value={formData.phase}
                                onChange={(e) => handleInputChange("phase", e.target.value)}
                                className="w-full h-12 px-4 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
                            >
                                <option value="">Pilih</option>
                                <option value="D">Fase D (Kelas 7-9)</option>
                                <option value="E">Fase E (Kelas 10)</option>
                                <option value="F">Fase F (Kelas 11-12)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">Kelas</label>
                            <select
                                value={formData.grade}
                                onChange={(e) => handleInputChange("grade", e.target.value)}
                                className="w-full h-12 px-4 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
                            >
                                <option value="">Pilih</option>
                                <option value="7">Kelas 7</option>
                                <option value="8">Kelas 8</option>
                                <option value="9">Kelas 9</option>
                            </select>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* CP Selection */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100 p-6"
            >
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                        <GraduationCap size={20} />
                    </div>
                    <div>
                        <h3 className="font-bold text-emerald-900">Capaian Pembelajaran (CP)</h3>
                        <p className="text-sm text-emerald-700">Pilih CP sebagai dasar penyusunan ATP</p>
                    </div>
                </div>

                <select
                    value={formData.cpId}
                    onChange={(e) => handleInputChange("cpId", e.target.value)}
                    className="w-full h-12 px-4 rounded-xl border border-emerald-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-200"
                >
                    <option value="">Pilih Capaian Pembelajaran</option>
                    <option value="1">MAT-D-01: Memahami konsep bilangan bulat dan pecahan</option>
                    <option value="2">MAT-D-02: Menerapkan operasi hitung dalam pemecahan masalah</option>
                    <option value="3">BIN-D-01: Memahami teks naratif secara lisan dan tulis</option>
                </select>
            </motion.div>

            {/* Tujuan Pembelajaran Builder */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl border border-neutral-200 p-6"
            >
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-lg font-bold font-serif text-foreground">Alur Tujuan Pembelajaran</h2>
                        <p className="text-sm text-muted-foreground">Susun urutan TP dari sederhana ke kompleks</p>
                    </div>
                    <Button onClick={addTP} variant="outline" className="rounded-xl">
                        <Plus size={16} className="mr-2" />
                        Tambah TP
                    </Button>
                </div>

                <div className="space-y-4">
                    {tujuanPembelajaran.map((tp, index) => (
                        <motion.div
                            key={tp.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="border border-neutral-200 rounded-xl overflow-hidden"
                        >
                            {/* TP Header */}
                            <div
                                className="flex items-center gap-3 p-4 bg-neutral-50 cursor-pointer"
                                onClick={() => setExpandedTP(expandedTP === tp.id ? null : tp.id)}
                            >
                                <GripVertical size={18} className="text-muted-foreground cursor-grab" />
                                <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                                    {index + 1}
                                </div>
                                <Input
                                    value={tp.title}
                                    onChange={(e) => {
                                        e.stopPropagation();
                                        updateTPTitle(tp.id, e.target.value);
                                    }}
                                    onClick={(e) => e.stopPropagation()}
                                    placeholder="Judul Tujuan Pembelajaran"
                                    className="flex-1 border-0 bg-transparent focus-visible:ring-0 font-medium"
                                />
                                <span className="text-xs text-muted-foreground">
                                    {tp.indicators.length} indikator
                                </span>
                                {expandedTP === tp.id ? (
                                    <ChevronUp size={18} className="text-muted-foreground" />
                                ) : (
                                    <ChevronDown size={18} className="text-muted-foreground" />
                                )}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeTP(tp.id);
                                    }}
                                    className="p-1.5 rounded-lg hover:bg-red-100 text-red-500"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>

                            {/* TP Indicators */}
                            {expandedTP === tp.id && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    className="p-4 space-y-3"
                                >
                                    <p className="text-sm font-medium text-muted-foreground">Indikator Pencapaian:</p>
                                    {tp.indicators.map((indicator, i) => (
                                        <div key={i} className="flex items-center gap-2">
                                            <span className="w-6 h-6 rounded bg-primary/10 text-primary text-xs flex items-center justify-center shrink-0">
                                                {i + 1}
                                            </span>
                                            <Input
                                                value={indicator}
                                                onChange={(e) => updateIndicator(tp.id, i, e.target.value)}
                                                placeholder="Deskripsi indikator"
                                                className="flex-1 h-10 rounded-lg"
                                            />
                                            <button
                                                onClick={() => removeIndicator(tp.id, i)}
                                                className="p-1.5 rounded-lg hover:bg-red-100 text-red-500"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    ))}
                                    <Button
                                        onClick={() => addIndicator(tp.id)}
                                        variant="ghost"
                                        size="sm"
                                        className="text-primary"
                                    >
                                        <Plus size={14} className="mr-1" />
                                        Tambah Indikator
                                    </Button>
                                </motion.div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* AI Generate */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-primary/5 rounded-2xl p-6 border border-primary/20"
            >
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                        <Sparkles size={24} className="text-white" />
                    </div>
                    <div>
                        <h3 className="font-bold text-foreground">Generate Otomatis dengan AI</h3>
                        <p className="text-sm text-muted-foreground">
                            AI akan menyusun alur TP berdasarkan CP yang dipilih
                        </p>
                    </div>
                </div>
                <Button
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="w-full bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl h-14 text-lg shadow-lg shadow-primary/20"
                >
                    {isGenerating ? (
                        <>
                            <Loader2 size={20} className="mr-2 animate-spin" />
                            Sedang Menyusun ATP...
                        </>
                    ) : (
                        <>
                            <Sparkles size={20} className="mr-2" />
                            Generate ATP dengan AI
                        </>
                    )}
                </Button>
            </motion.div>

            {/* Actions */}
            <div className="flex items-center justify-between">
                <Link href="/dashboard/atp">
                    <Button variant="outline" className="rounded-xl">
                        <ArrowLeft size={16} className="mr-2" />
                        Batal
                    </Button>
                </Link>
                <Button className="bg-primary hover:bg-primary-dark text-white rounded-xl">
                    <Save size={16} className="mr-2" />
                    Simpan ATP
                </Button>
            </div>
        </div>
    );
}
