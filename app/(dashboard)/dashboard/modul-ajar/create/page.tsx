"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    ArrowLeft,
    ArrowRight,
    Sparkles,
    BookOpen,
    Target,
    Users,
    Clock,
    Save,
    FileText,
    CheckCircle2,
    Loader2,
    Download,
    AlertCircle,
} from "lucide-react";
import { useModulAjar } from "@/hooks/useModulAjar";
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

const steps = [
    { id: 1, title: "Informasi Dasar", icon: BookOpen },
    { id: 2, title: "Capaian Pembelajaran", icon: Target },
    { id: 3, title: "Tujuan & Materi", icon: FileText },
    { id: 4, title: "Kegiatan", icon: Users },
    { id: 5, title: "Review & Generate", icon: Sparkles },
];

export default function CreateModulAjarPage() {
    const router = useRouter();
    const { create, streaming, generateWithStreaming, loading, error } = useModulAjar();
    const { generateAndExport, loading: exportLoading } = useExport();
    const [currentStep, setCurrentStep] = useState(1);
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedContent, setGeneratedContent] = useState("");

    // Jenjang state for dynamic options
    const [jenjang, setJenjang] = useState("");
    const [bidangKeahlian, setBidangKeahlian] = useState("");
    const [programKeahlian, setProgramKeahlian] = useState("");

    const [formData, setFormData] = useState({
        title: "",
        subject: "",
        grade: "",
        semester: "",
        duration: "",
        capaianPembelajaran: "",
        tujuanPembelajaran: "",
        materi: "",
        pendahuluan: "",
        inti: "",
        penutup: "",
        model: "gemini-2.5-flash",
        format: "pdf",
    });
    const [result, setResult] = useState<any>(null);

    // Dynamic options based on jenjang
    const kelasOptions = getKelasByJenjang(jenjang);
    const mapelOptions = getMapelByJenjang(jenjang);
    const programOptions = getProgramByBidang(bidangKeahlian);
    const fase = jenjang && formData.grade ? getFase(jenjang, formData.grade) : '';


    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSaveDraft = async () => {
        try {
            const result = await create({
                judul: formData.title || "Draft Modul Ajar",
                kelas: formData.grade,
                topik: formData.subject,
                alokasi_waktu: parseInt(formData.duration) || undefined,
                capaian_pembelajaran: formData.capaianPembelajaran ? [formData.capaianPembelajaran] : undefined,
                tujuan_pembelajaran: formData.tujuanPembelajaran ? [formData.tujuanPembelajaran] : undefined,
                status: 'draft',
            });
            router.push(`/dashboard/modul-ajar/${result.id}`);
        } catch (err) {
            console.error("Failed to save draft:", err);
        }
    };

    // Form validation - required fields
    const isFormValid = formData.title && formData.subject && formData.grade;

    const handleGenerate = async () => {
        // Validation gate
        if (!isFormValid) {
            alert('Mohon lengkapi Judul, Mata Pelajaran, dan Kelas terlebih dahulu');
            return;
        }

        setIsGenerating(true);
        setGeneratedContent("");
        setResult(null);

        try {
            const payload = {
                mapel: formData.subject,
                topik: formData.title,
                kelas: formData.grade,
                kurikulum: "Kurikulum Merdeka",
                alokasi_waktu: formData.duration ? parseInt(formData.duration) : undefined,
                capaian_pembelajaran: formData.capaianPembelajaran,
                tujuan_pembelajaran: formData.tujuanPembelajaran,
                kegiatan_pembelajaran: formData.inti,
                model: formData.model
            };
        } catch (err: any) {
            console.error("Generation failed:", err);
        } finally {
            setIsGenerating(false);
        }
    };

    // Show streaming content if available
    const displayContent = streaming.content || generatedContent;

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div>
                <Link
                    href="/dashboard/modul-ajar"
                    className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
                >
                    <ArrowLeft size={16} className="mr-2" />
                    Kembali ke Daftar Modul
                </Link>
                <h1 className="text-2xl md:text-3xl font-bold font-serif text-foreground">Buat Modul Ajar Baru</h1>
                <p className="text-muted-foreground mt-1">Lengkapi informasi di bawah untuk menghasilkan modul ajar dengan AI</p>
            </div>

            {/* Progress Steps */}
            <div className="bg-card rounded-2xl border border-border p-4 overflow-x-auto">
                <div className="flex items-center justify-between min-w-[600px]">
                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        const isActive = currentStep === step.id;
                        const isCompleted = currentStep > step.id;

                        return (
                            <div key={step.id} className="flex items-center">
                                <button
                                    onClick={() => setCurrentStep(step.id)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${isActive
                                        ? "bg-primary text-white"
                                        : isCompleted
                                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                                            : "bg-muted text-muted-foreground hover:bg-muted/80"
                                        }`}
                                >
                                    {isCompleted ? (
                                        <CheckCircle2 size={18} />
                                    ) : (
                                        <Icon size={18} />
                                    )}
                                    <span className="font-medium text-sm hidden md:inline">{step.title}</span>
                                </button>
                                {index < steps.length - 1 && (
                                    <div className={`w-8 h-0.5 mx-2 ${isCompleted ? "bg-emerald-300" : "bg-border"}`} />
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Error Display */}
            {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-200">
                    {error}
                </div>
            )}

            {/* Form Content */}
            <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-card rounded-2xl border border-border p-6 md:p-8"
            >
                {currentStep === 1 && (
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold font-serif text-foreground mb-6">Informasi Dasar</h2>

                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">Judul Modul <span className="text-red-500">*</span></label>
                            <Input
                                value={formData.title}
                                onChange={(e) => handleInputChange("title", e.target.value)}
                                placeholder="Contoh: Modul Ajar Aljabar Dasar"
                                className="h-12 rounded-xl"
                            />
                        </div>

                        {/* Jenjang Selector - NEW */}
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">Jenjang Pendidikan <span className="text-red-500">*</span></label>
                            <select
                                value={jenjang}
                                onChange={(e) => {
                                    setJenjang(e.target.value);
                                    handleInputChange("grade", ""); // Reset grade when jenjang changes
                                    handleInputChange("subject", ""); // Reset subject
                                    setBidangKeahlian(""); // Reset SMK fields
                                    setProgramKeahlian("");
                                }}
                                className="w-full h-12 px-4 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/20"
                            >
                                <option value="">Pilih Jenjang</option>
                                {JENJANG_OPTIONS.map(j => (
                                    <option key={j.value} value={j.value}>{j.label}</option>
                                ))}
                            </select>
                        </div>

                        {/* SMK Only - Bidang Keahlian */}
                        {jenjang === 'smk' && (
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">Bidang Keahlian</label>
                                    <select
                                        value={bidangKeahlian}
                                        onChange={(e) => {
                                            setBidangKeahlian(e.target.value);
                                            setProgramKeahlian("");
                                        }}
                                        className="w-full h-12 px-4 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    >
                                        <option value="">Pilih Bidang Keahlian</option>
                                        {BIDANG_KEAHLIAN_SMK.map(b => (
                                            <option key={b.value} value={b.value}>{b.label}</option>
                                        ))}
                                    </select>
                                </div>
                                {bidangKeahlian && programOptions.length > 0 && (
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">Program Keahlian</label>
                                        <select
                                            value={programKeahlian}
                                            onChange={(e) => setProgramKeahlian(e.target.value)}
                                            className="w-full h-12 px-4 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/20"
                                        >
                                            <option value="">Pilih Program</option>
                                            {programOptions.map((p: any) => (
                                                <option key={p.value} value={p.value}>{p.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">Mata Pelajaran <span className="text-red-500">*</span></label>
                                <select
                                    value={formData.subject}
                                    onChange={(e) => handleInputChange("subject", e.target.value)}
                                    className="w-full h-12 px-4 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    disabled={!jenjang}
                                >
                                    <option value="">{jenjang ? 'Pilih Mata Pelajaran' : 'Pilih Jenjang terlebih dahulu'}</option>
                                    {mapelOptions.map((m: any) => (
                                        <option key={m.value} value={m.value}>{m.label}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    Kelas <span className="text-red-500">*</span>
                                    {fase && <span className="ml-2 text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">Fase {fase}</span>}
                                </label>
                                <select
                                    value={formData.grade}
                                    onChange={(e) => handleInputChange("grade", e.target.value)}
                                    className="w-full h-12 px-4 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    disabled={!jenjang}
                                >
                                    <option value="">{jenjang ? 'Pilih Kelas' : 'Pilih Jenjang terlebih dahulu'}</option>
                                    {kelasOptions.map((k: any) => (
                                        <option key={k.value} value={k.value}>{k.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">Semester</label>
                                <select
                                    value={formData.semester}
                                    onChange={(e) => handleInputChange("semester", e.target.value)}
                                    className="w-full h-12 px-4 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/20"
                                >
                                    <option value="">Pilih Semester</option>
                                    {SEMESTER_OPTIONS.map(s => (
                                        <option key={s.value} value={s.value}>{s.label}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">Alokasi Waktu</label>
                                <div className="relative">
                                    <Input
                                        value={formData.duration}
                                        onChange={(e) => handleInputChange("duration", e.target.value)}
                                        placeholder="Contoh: 4"
                                        className="h-12 rounded-xl pr-24"
                                    />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                                        JP
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Validation Warning */}
                        {!isFormValid && (
                            <div className="flex items-center gap-2 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl text-amber-800 dark:text-amber-200">
                                <AlertCircle size={18} />
                                <span className="text-sm">Lengkapi Judul, Jenjang, Mata Pelajaran, dan Kelas untuk melanjutkan</span>
                            </div>
                        )}
                    </div>
                )}

                {currentStep === 2 && (
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold font-serif text-foreground mb-6">Capaian Pembelajaran</h2>

                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Capaian Pembelajaran (CP)
                            </label>
                            <p className="text-sm text-muted-foreground mb-3">
                                Pilih atau masukkan Capaian Pembelajaran sesuai kurikulum merdeka
                            </p>
                            <textarea
                                value={formData.capaianPembelajaran}
                                onChange={(e) => handleInputChange("capaianPembelajaran", e.target.value)}
                                placeholder="Contoh: Peserta didik mampu memahami konsep dasar aljabar..."
                                rows={6}
                                className="w-full px-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                            />
                        </div>

                        <div className="bg-accent/10 rounded-xl p-4 border border-accent/20">
                            <div className="flex items-center gap-2 mb-2">
                                <Sparkles size={16} className="text-accent-dark" />
                                <span className="font-semibold text-accent-dark text-sm">Tips AI</span>
                            </div>
                            <p className="text-sm text-accent-dark/80">
                                Semakin detail CP yang Anda masukkan, semakin akurat modul yang dihasilkan.
                                Anda juga bisa menggunakan database CP bawaan kami.
                            </p>
                        </div>
                    </div>
                )}

                {currentStep === 3 && (
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold font-serif text-foreground mb-6">Tujuan & Materi</h2>

                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Tujuan Pembelajaran
                            </label>
                            <textarea
                                value={formData.tujuanPembelajaran}
                                onChange={(e) => handleInputChange("tujuanPembelajaran", e.target.value)}
                                placeholder="Masukkan tujuan pembelajaran yang ingin dicapai..."
                                rows={4}
                                className="w-full px-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Materi Pembelajaran
                            </label>
                            <textarea
                                value={formData.materi}
                                onChange={(e) => handleInputChange("materi", e.target.value)}
                                placeholder="Masukkan poin-poin materi yang akan diajarkan..."
                                rows={4}
                                className="w-full px-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                            />
                        </div>
                    </div>
                )}

                {currentStep === 4 && (
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold font-serif text-foreground mb-6">Kegiatan Pembelajaran</h2>

                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Kegiatan Pendahuluan
                            </label>
                            <textarea
                                value={formData.pendahuluan}
                                onChange={(e) => handleInputChange("pendahuluan", e.target.value)}
                                placeholder="Contoh: Guru membuka dengan salam, apersepsi..."
                                rows={3}
                                className="w-full px-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Kegiatan Inti
                            </label>
                            <textarea
                                value={formData.inti}
                                onChange={(e) => handleInputChange("inti", e.target.value)}
                                placeholder="Contoh: Siswa mengamati, menanya, mengumpulkan informasi..."
                                rows={4}
                                className="w-full px-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Kegiatan Penutup
                            </label>
                            <textarea
                                value={formData.penutup}
                                onChange={(e) => handleInputChange("penutup", e.target.value)}
                                placeholder="Contoh: Refleksi, kesimpulan, tugas rumah..."
                                rows={3}
                                className="w-full px-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                            />
                        </div>
                    </div>
                )}

                {currentStep === 5 && (
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold font-serif text-foreground mb-6">Review & Generate</h2>

                        <div className="bg-muted rounded-xl p-6 space-y-4">
                            <h3 className="font-semibold text-foreground">Ringkasan Modul</h3>
                            <div className="grid md:grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="text-muted-foreground">Judul:</span>
                                    <p className="font-medium text-foreground">{formData.title || "-"}</p>
                                </div>
                                <div>
                                    <span className="text-muted-foreground">Mata Pelajaran:</span>
                                    <p className="font-medium text-foreground">{formData.subject || "-"}</p>
                                </div>
                                <div>
                                    <span className="text-muted-foreground">Kelas:</span>
                                    <p className="font-medium text-foreground">Kelas {formData.grade || "-"}</p>
                                </div>
                                <div>
                                    <span className="text-muted-foreground">Alokasi Waktu:</span>
                                    <p className="font-medium text-foreground">{formData.duration || "-"} JP</p>
                                </div>
                            </div>
                        </div>

                        {/* Export Configuration */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">Model AI</label>
                                <select
                                    value={formData.model}
                                    onChange={(e) => handleInputChange("model", e.target.value)}
                                    className="w-full h-12 px-4 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/20"
                                >
                                    {AI_MODEL_OPTIONS.map((m: any) => (
                                        <option key={m.value} value={m.value}>
                                            {m.label} {m.recommended ? '⭐' : ''} {m.premium ? '💎' : ''}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">Format Output</label>
                                <select
                                    value={formData.format}
                                    onChange={(e) => handleInputChange("format", e.target.value)}
                                    className="w-full h-12 px-4 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/20"
                                >
                                    <option value="pdf">PDF Document (.pdf)</option>
                                    <option value="docx">Word Document (.docx)</option>
                                </select>
                            </div>
                        </div>

                        {/* Streaming / Generated Content Area */}
                        {(streaming.isStreaming || streaming.content) && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-4"
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
                                                    ? "AI sedang menyusun Modul Ajar dengan format Markdown (Tabel, List, dll)"
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
                                            <Button
                                                onClick={() => generateAndExport({
                                                    mapel: formData.subject,
                                                    topik: formData.title,
                                                    kelas: formData.grade,
                                                    document_type: 'modul_ajar',
                                                    format: 'docx',
                                                    kurikulum: 'merdeka',
                                                    alokasi_waktu: parseInt(formData.duration) || 2,
                                                    content: streaming.content
                                                })}
                                                disabled={exportLoading}
                                                className="bg-emerald-600 hover:bg-emerald-700 text-white h-8 rounded-lg"
                                            >
                                                {exportLoading ? <Loader2 size={16} className="animate-spin mr-2" /> : <Download size={16} className="mr-2" />}
                                                Download Docx
                                            </Button>
                                        )}
                                    </div>

                                    {/* Markdown Preview */}
                                    <div className="bg-white rounded-lg border p-6 shadow-sm min-h-[200px] max-h-[600px] overflow-y-auto custom-scrollbar">
                                        <MarkdownViewer content={streaming.content} />
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        <div className="bg-primary/5 rounded-xl p-6 border border-primary/20">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                                    <Sparkles size={24} className="text-white" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-foreground">Siap Generate dengan AI</h3>
                                    <p className="text-sm text-muted-foreground">
                                        AI akan melengkapi modul ajar Anda berdasarkan input di atas
                                    </p>
                                </div>
                            </div>
                            <Button
                                onClick={handleGenerate}
                                disabled={isGenerating || !formData.subject || !formData.grade}
                                className="w-full bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl h-14 text-lg shadow-lg shadow-primary/20"
                            >
                                {isGenerating ? (
                                    <>
                                        <Loader2 size={20} className="mr-2 animate-spin" />
                                        Sedang Menghasilkan...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles size={20} className="mr-2" />
                                        Generate Modul Ajar
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                )}
            </motion.div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between">
                <Button
                    variant="outline"
                    onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
                    disabled={currentStep === 1}
                    className="rounded-xl"
                >
                    <ArrowLeft size={16} className="mr-2" />
                    Sebelumnya
                </Button>

                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        className="rounded-xl"
                        onClick={handleSaveDraft}
                        disabled={loading}
                    >
                        {loading ? (
                            <Loader2 size={16} className="mr-2 animate-spin" />
                        ) : (
                            <Save size={16} className="mr-2" />
                        )}
                        Simpan Draft
                    </Button>
                    {currentStep < 5 && (
                        <Button
                            onClick={() => setCurrentStep(prev => Math.min(5, prev + 1))}
                            className="bg-primary hover:bg-primary-dark text-white rounded-xl"
                        >
                            Selanjutnya
                            <ArrowRight size={16} className="ml-2" />
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
