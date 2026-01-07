"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Star, HelpCircle, ChevronDown, Zap, Shield, Clock, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const plans = [
    {
        name: "Starter",
        price: "Gratis",
        description: "Untuk guru yang ingin mencoba kemudahan AI.",
        features: [
            "3 Modul Ajar per bulan",
            "Akses Editor Dasar",
            "Export PDF (Watermarked)",
            "Template Standar (5 template)",
            "Dukungan Email"
        ],
        notIncluded: [
            "Export DOCX",
            "Template Premium",
            "Prioritas Support",
            "Kolaborasi Tim"
        ],
        cta: "Mulai Sekarang",
        ctaLink: "/register",
        popular: false,
    },
    {
        name: "Professional",
        price: "Rp 49.000",
        period: "/bulan",
        yearlyPrice: "Rp 470.000/tahun",
        savings: "Hemat 20%",
        description: "Solusi lengkap untuk produktivitas harian.",
        features: [
            "Modul Ajar Unlimited",
            "Export PDF & DOCX",
            "Editor AI Context-Aware",
            "Semua Template Premium (100+)",
            "Prioritas Support 24/7",
            "Regenerate Tanpa Batas",
            "Riwayat Versi Dokumen",
            "Kolaborasi 3 Pengguna"
        ],
        notIncluded: [],
        cta: "Pilih Pro",
        ctaLink: "/register",
        popular: true,
    },
    {
        name: "Institution",
        price: "Custom",
        description: "Untuk sekolah yang butuh manajemen terpusat.",
        features: [
            "Semua fitur Professional",
            "Dashboard Kepala Sekolah",
            "Manajemen Akun Guru (Unlimited)",
            "Pelatihan & Onboarding",
            "API Access",
            "Custom Branding Sekolah",
            "Dedicated Account Manager",
            "SLA 99.9% Uptime"
        ],
        notIncluded: [],
        cta: "Hubungi Kami",
        ctaLink: "/tentang",
        popular: false,
    },
];

const faqs = [
    {
        question: "Apakah ada uji coba gratis?",
        answer: "Ya! Anda bisa langsung menggunakan paket Starter tanpa biaya. Paket ini sudah termasuk 3 Modul Ajar per bulan untuk Anda coba."
    },
    {
        question: "Bagaimana cara upgrade ke Pro?",
        answer: "Anda bisa upgrade kapan saja melalui halaman Pengaturan > Langganan di dashboard. Pembayaran dapat dilakukan melalui transfer bank, e-wallet, atau kartu kredit."
    },
    {
        question: "Apakah ada diskon untuk pembayaran tahunan?",
        answer: "Ya! Dengan berlangganan tahunan, Anda mendapat diskon 20% dibanding pembayaran bulanan. Anda membayar Rp 470.000 untuk setahun penuh."
    },
    {
        question: "Bagaimana dengan sekolah yang ingin mendaftar banyak guru?",
        answer: "Untuk institusi dengan 10+ guru, kami menawarkan paket Institution dengan harga khusus dan fitur manajemen terpusat. Silakan hubungi tim sales kami."
    },
    {
        question: "Apakah data saya aman?",
        answer: "Keamanan data adalah prioritas utama kami. Semua data dienkripsi end-to-end dan disimpan di server yang memenuhi standar keamanan internasional."
    },
    {
        question: "Bisakah saya membatalkan langganan kapan saja?",
        answer: "Ya, Anda bisa membatalkan langganan kapan saja tanpa biaya penalti. Akses Pro akan tetap berlaku hingga akhir periode billing."
    }
];

const benefits = [
    { icon: Zap, title: "Hemat 12+ Jam/Minggu", description: "Waktu yang biasa dihabiskan untuk administrasi" },
    { icon: Shield, title: "Selalu Tervalidasi", description: "Sesuai regulasi Kemendikbudristek terbaru" },
    { icon: Clock, title: "Akses 24/7", description: "Kapan saja, di mana saja, di semua perangkat" },
    { icon: Award, title: "Kualitas Premium", description: "Output setara konsultan pendidikan profesional" }
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-neutral-200 last:border-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between py-5 text-left"
            >
                <span className="font-semibold text-foreground pr-4">{question}</span>
                <ChevronDown className={`shrink-0 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`} size={20} />
            </button>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="pb-5 text-muted-foreground leading-relaxed"
                >
                    {answer}
                </motion.div>
            )}
        </div>
    );
}

export default function HargaPage() {
    return (
        <main className="min-h-screen pt-24 pb-20">
            {/* Page Header */}
            <section className="relative py-20 px-6 text-center">
                <div className="max-w-4xl mx-auto relative z-10">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block py-1 px-3 rounded-full bg-accent/10 border border-accent/20 text-accent-dark text-xs font-bold uppercase tracking-widest mb-4"
                    >
                        Investasi Cerdas
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-6xl font-bold font-serif text-primary mb-6 leading-tight"
                    >
                        Harga yang Transparan <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">Tanpa Biaya Tersembunyi.</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-muted-foreground max-w-2xl mx-auto"
                    >
                        Pilih paket yang sesuai dengan kebutuhan Anda. Mulai gratis, upgrade kapan saja.
                    </motion.p>
                </div>
            </section>

            {/* Benefits Bar */}
            <section className="px-6 max-w-7xl mx-auto mb-16">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {benefits.map((benefit, index) => {
                        const Icon = benefit.icon;
                        return (
                            <motion.div
                                key={benefit.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white rounded-xl border border-neutral-200 p-4 text-center"
                            >
                                <Icon className="mx-auto text-primary mb-2" size={24} />
                                <p className="font-semibold text-foreground text-sm">{benefit.title}</p>
                                <p className="text-xs text-muted-foreground">{benefit.description}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* Pricing Cards */}
            <section className="px-6 max-w-7xl mx-auto mb-32">
                <div className="grid md:grid-cols-3 gap-8 items-start">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className={`relative rounded-3xl p-8 border ${plan.popular ? 'bg-primary text-white border-primary shadow-2xl scale-105 z-10' : 'bg-white text-foreground border-neutral-200 shadow-lg'} flex flex-col h-full`}
                        >
                            {plan.popular && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent text-primary-dark font-bold text-xs uppercase tracking-widest py-1 px-4 rounded-full flex items-center gap-1 shadow-lg">
                                    <Star size={12} fill="currentColor" /> Paling Diminati
                                </div>
                            )}

                            <div className="mb-8">
                                <h3 className={`text-lg font-bold ${plan.popular ? 'text-white/80' : 'text-muted-foreground'} uppercase tracking-wider mb-2`}>{plan.name}</h3>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-serif font-bold">{plan.price}</span>
                                    {plan.period && <span className={`text-sm ${plan.popular ? 'text-white/60' : 'text-muted-foreground'}`}>{plan.period}</span>}
                                </div>
                                {plan.yearlyPrice && (
                                    <div className={`mt-2 text-sm ${plan.popular ? 'text-white/70' : 'text-muted-foreground'}`}>
                                        atau {plan.yearlyPrice} <span className="text-accent font-semibold">{plan.savings}</span>
                                    </div>
                                )}
                                <p className={`mt-4 text-sm ${plan.popular ? 'text-white/70' : 'text-muted-foreground'} leading-relaxed`}>{plan.description}</p>
                            </div>

                            <div className="flex-grow space-y-3 mb-8">
                                {plan.features.map((feature, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <CheckCircle2 size={18} className={`shrink-0 mt-0.5 ${plan.popular ? 'text-accent' : 'text-primary'}`} />
                                        <span className={`text-sm font-medium ${plan.popular ? 'text-white/90' : 'text-foreground/80'}`}>{feature}</span>
                                    </div>
                                ))}
                                {plan.notIncluded.map((feature, i) => (
                                    <div key={i} className="flex items-start gap-3 opacity-50">
                                        <div className={`w-[18px] h-[18px] shrink-0 mt-0.5 rounded-full border ${plan.popular ? 'border-white/40' : 'border-neutral-300'}`} />
                                        <span className={`text-sm ${plan.popular ? 'text-white/50' : 'text-muted-foreground'} line-through`}>{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <Link href={plan.ctaLink}>
                                <Button
                                    className={`w-full rounded-xl py-6 font-bold text-lg transition-transform active:scale-95 ${plan.popular
                                        ? 'bg-white text-primary hover:bg-neutral-100'
                                        : 'bg-primary text-white hover:bg-primary-dark'
                                        }`}
                                >
                                    {plan.cta}
                                </Button>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* FAQ Section */}
            <section className="px-6 max-w-3xl mx-auto mb-20">
                <div className="text-center mb-12">
                    <HelpCircle className="mx-auto text-primary mb-4" size={40} />
                    <h2 className="text-3xl font-bold font-serif text-primary mb-4">Pertanyaan Umum</h2>
                    <p className="text-muted-foreground">Jawaban untuk pertanyaan yang sering ditanyakan</p>
                </div>

                <div className="bg-white rounded-2xl border border-neutral-200 p-6">
                    {faqs.map((faq, index) => (
                        <FAQItem key={index} {...faq} />
                    ))}
                </div>
            </section>

            {/* Trust Section */}
            <section className="px-6 max-w-4xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-neutral-50 rounded-3xl p-12 border border-neutral-200"
                >
                    <p className="text-2xl font-serif font-bold text-primary mb-4">
                        "Katedra menghemat 12+ jam kerja saya setiap minggu. Sekarang saya punya waktu lebih untuk siswa."
                    </p>
                    <div className="flex items-center justify-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                            R
                        </div>
                        <div className="text-left">
                            <p className="font-semibold text-foreground">Ratna Dewi, S.Pd.</p>
                            <p className="text-sm text-muted-foreground">Guru Matematika, SMPN 5 Jakarta</p>
                        </div>
                    </div>
                </motion.div>
            </section>
        </main>
    );
}
