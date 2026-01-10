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
    AlertCircle,
} from "lucide-react";
import { useSilabus } from "@/hooks/useSilabus";
import { useExport } from "@/hooks/useExport";
import { api } from "@/lib/api";
import { MarkdownViewer } from "@/components/ui/MarkdownViewer";
import { cn } from "@/lib/utils";
import {
    JENJANG_OPTIONS,
    getKelasByJenjang,
    getMapelByJenjang,
    getFase,
    SEMESTER_OPTIONS,
    AI_MODEL_OPTIONS,
    BIDANG_KEAHLIAN_SMK,
    getProgramByBidang,
} from "@/lib/form-constants";

interface WeekData {
    id: string;
    week: string;
    topic: string;
    cp: string;
}

export default function CreateSilabusPage() {
    const { generateWithStreaming, streaming } = useSilabus();
    const { generateAndExport, loading: exportLoading } = useExport();
    const [isGenerating, setIsGenerating] = useState(false);

    // Jenjang state for dynamic options
    const [jenjang, setJenjang] = useState("");
    const [bidangKeahlian, setBidangKeahlian] = useState("");

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

    // Dynamic options based on jenjang
    const kelasOptions = getKelasByJenjang(jenjang);
    const mapelOptions = getMapelByJenjang(jenjang);
    const fase = jenjang && formData.grade ? getFase(jenjang, formData.grade) : '';

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
                semester: formData.semester ? parseInt(formData.semester) : 1,
                kurikulum: "Kurikulum Merdeka",
                model: formData.model,
                rincian_minggu: kegiatanMap
            };

            await generateWithStreaming(payload);

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
                        placeholder="Judul Silabus *"
                        className="h-12 rounded-xl bg-background border-border"
                    />

                    {/* Jenjang Selector */}
                    <select
                        value={jenjang}
                        onChange={(e) => {
                            setJenjang(e.target.value);
                            setFormData({ ...formData, subject: "", grade: "" });
                            setBidangKeahlian("");
                        }}
                        className="w-full h-12 px-4 rounded-xl border border-border bg-background text-foreground"
                    >
                        <option value="">Pilih Jenjang Pendidikan *</option>
                        {JENJANG_OPTIONS.map(j => (
                            <option key={j.value} value={j.value}>{j.label}</option>
                        ))}
                    </select>

                    {/* SMK Bidang Keahlian */}
                    {jenjang === 'smk' && (
                        <select value={bidangKeahlian} onChange={(e) => setBidangKeahlian(e.target.value)} className="w-full h-12 px-4 rounded-xl border border-border bg-background text-foreground">
                            <option value="">Pilih Bidang Keahlian</option>
                            {BIDANG_KEAHLIAN_SMK.map(b => (
                                <option key={b.value} value={b.value}>{b.label}</option>
                            ))}
                        </select>
                    )}

                    <div className="grid md:grid-cols-4 gap-4">
                        <select
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            className="h-12 px-4 rounded-xl border border-border bg-background text-foreground"
                            disabled={!jenjang}
                        >
                            <option value="">{jenjang ? 'Mata Pelajaran *' : 'Pilih Jenjang'}</option>
                            {mapelOptions.map((m: any) => (
                                <option key={m.value} value={m.value}>{m.label}</option>
                            ))}
                        </select>
                        <select
                            value={formData.grade}
                            onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                            className="h-12 px-4 rounded-xl border border-border bg-background text-foreground"
                            disabled={!jenjang}
                        >
                            <option value="">{jenjang ? `Kelas * ${fase ? `(Fase ${fase})` : ''}` : 'Pilih Jenjang'}</option>
                            {kelasOptions.map((k: any) => (
                                <option key={k.value} value={k.value}>{k.label}</option>
                            ))}
                        </select>
                        <select
                            value={formData.semester}
                            onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                            className="h-12 px-4 rounded-xl border border-border bg-background text-foreground"
                        >
                            <option value="">Semester *</option>
                            {SEMESTER_OPTIONS.map(s => (
                                <option key={s.value} value={s.value}>{s.label}</option>
                            ))}
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
                            {AI_MODEL_OPTIONS.map((m: any) => (
                                <option key={m.value} value={m.value}>{m.label} {m.recommended ? '⭐' : ''}</option>
                            ))}
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
                                <div className="flex-1">
                                    <h3 className={cn("font-bold", streaming.isStreaming ? "text-blue-900" : "text-emerald-900")}>
                                        {streaming.isStreaming ? "Sedang Menulis..." : "Dokumen Selesai"}
                                    </h3>
                                    <p className={cn("text-sm", streaming.isStreaming ? "text-blue-700" : "text-emerald-700")}>
                                        {streaming.isStreaming
                                            ? "AI sedang menyusun Silabus..."
                                            : "Proses generate selesai. Silakan review hasil di bawah."}
                                    </p>
                                </div>
                                {streaming.isStreaming && (
                                    <Button
                                        onClick={streaming.stop}
                                        variant="destructive"
                                        size="sm"
                                        className="h-8 rounded-lg"
                                    >
                                        Stop Generation
                                    </Button>
                                )}
                                {!streaming.isStreaming && streaming.content && (
                                    <div className="flex gap-2">
                                        <Button
                                            onClick={() => generateAndExport({
                                                mapel: formData.subject,
                                                topik: `${weeks.map(w => w.topic).join(", ")} (Semester ${formData.semester} - ${formData.year})`,
                                                kelas: formData.grade,
                                                document_type: 'silabus',
                                                format: 'pdf',
                                                kurikulum: 'merdeka',
                                                content: streaming.content
                                            })}
                                            disabled={exportLoading}
                                            variant="outline"
                                            className="h-8 rounded-lg border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                                        >
                                            {exportLoading ? <Loader2 size={16} className="animate-spin mr-2" /> : <Download size={16} className="mr-2" />}
                                            PDF
                                        </Button>
                                        <Button
                                            onClick={() => generateAndExport({
                                                mapel: formData.subject,
                                                topik: `${weeks.map(w => w.topic).join(", ")} (Semester ${formData.semester} - ${formData.year})`,
                                                kelas: formData.grade,
                                                document_type: 'silabus',
                                                format: 'docx',
                                                kurikulum: 'merdeka',
                                                content: streaming.content
                                            })}
                                            disabled={exportLoading}
                                            className="bg-emerald-600 hover:bg-emerald-700 text-white h-8 rounded-lg"
                                        >
                                            {exportLoading ? <Loader2 size={16} className="animate-spin mr-2" /> : <Download size={16} className="mr-2" />}
                                            Word (Docx)
                                        </Button>
                                    </div>
                                )}
                            </div>

                            <div className="bg-white rounded-lg border p-6 shadow-sm min-h-[200px] max-h-[600px] overflow-y-auto custom-scrollbar">
                                <MarkdownViewer content={streaming.content} />
                            </div>
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
