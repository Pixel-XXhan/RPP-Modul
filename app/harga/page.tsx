"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
    {
        name: "Starter",
        price: "Gratis",
        description: "Untuk guru yang ingin mencoba kemudahan AI.",
        features: ["1 Modul Ajar per bulan", "Akses Editor Dasar", "Export PDF (Watermarked)", "Template Standar"],
        cta: "Mulai Sekarang",
        popular: false,
    },
    {
        name: "Professional",
        price: "Rp 49.000",
        period: "/bulan",
        description: "Solusi lengkap untuk produktivitas harian.",
        features: ["Modul Ajar Unlimited", "Export PDF & Docx", "Editor AI Context-Aware", "Akses Semua Template Premium", "Prioritas Support"],
        cta: "Pilih Pro",
        popular: true,
    },
    {
        name: "Institution",
        price: "Custom",
        description: "Untuk sekolah yang butuh manajemen terpusat.",
        features: ["Dashboard Kepala Sekolah", "Manajemen Akun Guru", "Pelatihan & Onboarding", "API Access", "Custom Branding Sekolah"],
        cta: "Hubungi Kami",
        popular: false,
    },
];

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
                </div>
            </section>

            {/* Pricing Cards */}
            <section className="px-6 max-w-7xl mx-auto">
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
                                <p className={`mt-4 text-sm ${plan.popular ? 'text-white/70' : 'text-muted-foreground'} leading-relaxed`}>{plan.description}</p>
                            </div>

                            <div className="flex-grow space-y-4 mb-8">
                                {plan.features.map((feature, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <CheckCircle2 size={18} className={`shrink-0 mt-0.5 ${plan.popular ? 'text-accent' : 'text-primary'}`} />
                                        <span className={`text-sm font-medium ${plan.popular ? 'text-white/90' : 'text-foreground/80'}`}>{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <Button
                                className={`w-full rounded-xl py-6 font-bold text-lg transition-transform active:scale-95 ${plan.popular
                                        ? 'bg-white text-primary hover:bg-neutral-100'
                                        : 'bg-primary text-white hover:bg-primary-dark'
                                    }`}
                            >
                                {plan.cta}
                            </Button>
                        </motion.div>
                    ))}
                </div>
            </section>
        </main>
    );
}
