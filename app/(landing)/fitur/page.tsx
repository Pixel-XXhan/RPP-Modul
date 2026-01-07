"use client";

import { motion } from "framer-motion";
import { ValueProp } from "@/components/sections/ValueProp";
import Image from "next/image";
import {
    Sparkles,
    Zap,
    Shield,
    Clock,
    FileText,
    BookOpen,
    Target,
    CheckCircle2,
    ArrowRight,
    Brain,
    Layers,
    RefreshCw,
    Download,
    Lock,
    Users,
    Award
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const coreFeatures = [
    {
        icon: Brain,
        title: "AI Generatif Cerdas",
        description: "Model AI yang dilatih khusus untuk konteks pendidikan Indonesia dan Kurikulum Merdeka.",
        color: "bg-violet-100 text-violet-600"
    },
    {
        icon: FileText,
        title: "Generator Modul Ajar",
        description: "Buat Modul Ajar lengkap dalam hitungan menit, bukan jam. Termasuk CP, TP, materi, dan asesmen.",
        color: "bg-blue-100 text-blue-600"
    },
    {
        icon: Target,
        title: "Pemetaan Otomatis ATP",
        description: "AI memetakan Alur Tujuan Pembelajaran secara otomatis berdasarkan CP yang dipilih.",
        color: "bg-emerald-100 text-emerald-600"
    },
    {
        icon: Layers,
        title: "Generator RPP & Silabus",
        description: "Susun RPP dan Silabus semester yang terstruktur dan sesuai regulasi terbaru.",
        color: "bg-amber-100 text-amber-600"
    },
    {
        icon: RefreshCw,
        title: "Regenerate Instan",
        description: "Tidak puas dengan hasil? Regenerate bagian tertentu tanpa kehilangan yang lain.",
        color: "bg-rose-100 text-rose-600"
    },
    {
        icon: Download,
        title: "Export Multi-Format",
        description: "Export ke PDF, DOCX, atau langsung print. Semua format didukung dengan layout profesional.",
        color: "bg-teal-100 text-teal-600"
    }
];

const advancedFeatures = [
    {
        icon: Lock,
        title: "Validasi Regulasi",
        description: "Setiap dokumen dicek otomatis terhadap peraturan Kemendikbudristek terbaru.",
    },
    {
        icon: Users,
        title: "Kolaborasi Tim",
        description: "Bagikan dan edit dokumen bersama rekan guru dalam satu sekolah.",
    },
    {
        icon: Award,
        title: "Template Premium",
        description: "Akses 100+ template siap pakai dari guru-guru berpengalaman.",
    },
    {
        icon: Shield,
        title: "Keamanan Data",
        description: "Enkripsi end-to-end untuk semua dokumen Anda. Data Anda aman bersama kami.",
    }
];

const stats = [
    { value: "50K+", label: "Dokumen Dibuat" },
    { value: "12K+", label: "Guru Aktif" },
    { value: "500+", label: "Sekolah Partner" },
    { value: "4.9/5", label: "Rating Pengguna" }
];

export default function FiturPage() {
    return (
        <main className="min-h-screen pt-24 pb-20">
            {/* Page Header */}
            <section className="relative py-20 px-6 text-center overflow-hidden">
                <div className="max-w-4xl mx-auto relative z-10">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block py-1 px-3 rounded-full bg-accent/10 border border-accent/20 text-accent-dark text-xs font-bold uppercase tracking-widest mb-4"
                    >
                        Teknologi Kami
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-6xl font-bold font-serif text-primary mb-6 leading-tight"
                    >
                        Teknologi di Balik <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">Inspirasi.</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed text-balance"
                    >
                        Jelajahi fitur-fitur canggih yang membuat Katedra menjadi standar baru dalam administrasi pendidikan.
                    </motion.p>
                </div>

                {/* Background Decor */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-3xl -z-10" />
            </section>

            {/* Stats Section */}
            <section className="px-6 max-w-7xl mx-auto mb-20">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-2xl border border-neutral-200 p-6 text-center shadow-sm"
                        >
                            <p className="text-3xl md:text-4xl font-bold font-serif text-primary">{stat.value}</p>
                            <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Core Features Grid */}
            <section className="px-6 max-w-7xl mx-auto mb-32">
                <div className="text-center mb-12">
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-bold font-serif text-primary mb-4"
                    >
                        Fitur Utama
                    </motion.h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Semua yang Anda butuhkan untuk membuat administrasi mengajar yang profesional
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {coreFeatures.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm hover:shadow-lg transition-shadow"
                            >
                                <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-4`}>
                                    <Icon size={24} />
                                </div>
                                <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* Core Features (Reusing ValueProp which has the grids & images) */}
            <ValueProp />

            {/* Additional "Deep Dive" Section */}
            <section className="py-20 px-6 max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-center mb-32">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative rounded-3xl overflow-hidden shadow-2xl border border-neutral-200 bg-gradient-to-br from-neutral-100 to-neutral-200 aspect-video flex items-center justify-center"
                    >
                        <FileText size={80} className="text-neutral-300" />
                    </motion.div>
                    <div className="space-y-6">
                        <h3 className="text-3xl font-bold font-serif text-primary">Smart Editor Berbasis Konteks</h3>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Editor kami tidak hanya memperbaiki typo. Ia memahami konteks pedagogis, menyarankan perbaikan kalimat agar lebih sesuai dengan Taksonomi Bloom, dan memastikan alur ajar yang logis.
                        </p>
                        <ul className="space-y-3">
                            {['Saran kalimat aktif', 'Cek kesesuaian ATP', 'Integrasi Profil Pelajar Pancasila', 'Preview real-time', 'Undo/Redo tanpa batas'].map((item) => (
                                <li key={item} className="flex items-center gap-3 text-foreground font-medium">
                                    <span className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-accent-dark text-sm">✓</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6 order-2 md:order-1">
                        <h3 className="text-3xl font-bold font-serif text-primary">Analisis Kurikulum Real-time</h3>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Algoritma kami selalu diperbarui dengan regulasi terbaru Kemendikbudristek. Dokumen Anda dijamin valid dan sesuai dengan standar pengawas sekolah terkini.
                        </p>
                        <ul className="space-y-3">
                            {['Update otomatis regulasi', 'Validasi struktur modul', 'Rekomendasi asesmen', 'Cek kelengkapan dokumen', 'Notifikasi perubahan regulasi'].map((item) => (
                                <li key={item} className="flex items-center gap-3 text-foreground font-medium">
                                    <span className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-accent-dark text-sm">✓</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative rounded-3xl overflow-hidden shadow-2xl border border-neutral-200 order-1 md:order-2 bg-gradient-to-br from-neutral-100 to-neutral-200 aspect-video flex items-center justify-center"
                    >
                        <Target size={80} className="text-neutral-300" />
                    </motion.div>
                </div>
            </section>

            {/* Advanced Features */}
            <section className="py-20 px-6 bg-neutral-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold font-serif text-primary mb-4">
                            Fitur Lanjutan
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Tingkatkan produktivitas dengan fitur-fitur premium
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {advancedFeatures.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <motion.div
                                    key={feature.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="bg-white rounded-2xl border border-neutral-200 p-6 text-center shadow-sm hover:shadow-lg transition-shadow"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                                        <Icon size={24} />
                                    </div>
                                    <h3 className="font-bold text-foreground mb-2">{feature.title}</h3>
                                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-r from-primary to-primary-light rounded-3xl p-12 text-white"
                    >
                        <Sparkles className="mx-auto mb-4" size={40} />
                        <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">
                            Siap Mencoba Semua Fitur?
                        </h2>
                        <p className="text-white/80 mb-8 max-w-xl mx-auto">
                            Mulai gratis sekarang dan rasakan perbedaannya. Tidak perlu kartu kredit.
                        </p>
                        <Link href="/register">
                            <Button className="bg-white text-primary hover:bg-neutral-100 font-bold rounded-xl px-8 py-6 text-lg">
                                Mulai Gratis Sekarang <ArrowRight className="ml-2" size={20} />
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
