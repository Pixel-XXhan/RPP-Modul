"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, CheckCircle2, Sparkles, Loader2, Bot } from "lucide-react";
import Image from "next/image";
import { LogoMarquee } from "@/components/ui/logo-marquee";

export function Hero() {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 500], [0, 100]);

    return (
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">

            {/* 0. Hero Background Image (Fixed Layout) */}
            {/* 0. Hero Background Image (Fixed Layout) */}
            {/* 0. Hero Background Image (Fixed Layout) */}
            <div className="absolute top-0 left-0 right-0 h-[110vh] -z-10 overflow-hidden">
                <Image
                    src="/images/carousel/hero-bg.webp"
                    alt="Background"
                    fill
                    className="object-cover object-[center_75%] pointer-events-none"
                    priority
                />
                {/* Visual Adjustment: Lighter overlay for better brightness */}
                <div className="absolute inset-0 bg-white/30" />
                <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-transparent to-white" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* 1. Header Content */}
                <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-32 md:mb-40 z-10 relative">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-1.5 mb-8"
                    >
                        <Sparkles size={14} className="text-accent-dark" />
                        <span className="text-sm font-semibold text-accent-dark tracking-wide uppercase">AI-Powered Education</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-bold text-[#011c15] font-serif leading-[1.1] mb-8 tracking-tight drop-shadow-sm"
                    >
                        Administrasi Selesai, <br className="hidden md:block" />
                        <span className="text-primary relative inline-block">
                            Inspirasi Dimulai.
                            <svg className="absolute w-full h-3 -bottom-1 left-0 text-accent opacity-40" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
                            </svg>
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl text-[#1a3c34] font-medium w-full max-w-2xl leading-relaxed mb-10 text-balance"
                    >
                        Platform AI premium untuk menyusun Modul Ajar Kurikulum Merdeka.
                        Hemat waktu administrasi hingga 90% dan fokus kembali pada siswa.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center gap-4"
                    >
                        <Link href="/login">
                            <Button className="rounded-full bg-primary hover:bg-primary-dark text-white px-8 py-6 text-lg font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:-translate-y-1 transition-all">
                                Mulai Gratis Sekarang
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                        <Button variant="outline" className="rounded-full px-8 py-6 text-lg font-medium hover:bg-neutral-50 border-neutral-200">
                            Lihat Demo Video
                            <Play className="ml-2 h-4 w-4 fill-current opacity-60" />
                        </Button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-8 flex items-center gap-6 text-sm font-medium text-muted-foreground"
                    >
                        <span className="flex items-center gap-2"><CheckCircle2 className="text-accent" size={18} /> Tanpa Kartu Kredit</span>
                        <span className="flex items-center gap-2"><CheckCircle2 className="text-accent" size={18} /> 1 Dokumen Gratis</span>
                    </motion.div>
                </div>

                {/* 2. Containerized Hero Visual */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="relative max-w-6xl mx-auto"
                >
                    {/* Main Image Container */}
                    <div className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-primary/10 border border-neutral-200 bg-white aspect-[16/9] md:aspect-[21/9]">
                        <Image
                            src="/images/carousel/dashboard.webp"
                            alt="Dashboard Katedra"
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

                        {/* REMOVED: Play Button Overlay */}
                    </div>

                    {/* Floating Widget 1: Processing Status */}
                    <motion.div
                        style={{ y }}
                        className="absolute -top-12 -left-4 md:top-10 md:-left-12 bg-white p-4 rounded-xl shadow-xl shadow-black/5 border border-neutral-100 flex items-center gap-4 z-20 max-w-[280px]"
                    >
                        <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                            {/* Removed animate-spin class */}
                            <Loader2 className="text-accent-dark" size={24} />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">AI Processing</p>
                            <p className="text-sm font-bold text-foreground">Menyusun Modul Ajar...</p>
                        </div>
                    </motion.div>

                    {/* Floating Widget 2: Success Notification */}
                    <motion.div
                        style={{ y: useTransform(scrollY, [0, 500], [0, -50]) }}
                        className="absolute -bottom-8 -right-4 md:bottom-10 md:-right-12 bg-white p-4 rounded-xl shadow-xl shadow-black/5 border border-neutral-100 flex items-center gap-4 z-20"
                    >
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                            <Bot className="text-green-700" size={20} />
                        </div>
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-bold text-foreground">Analisis CP Selesai</span>
                                <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full font-bold">100%</span>
                            </div>
                            <div className="w-32 h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                                <div className="h-full w-full bg-green-500 rounded-full" />
                            </div>
                        </div>
                    </motion.div>

                </motion.div>

                {/* 3. Trusted By Strip (Clean Layout) */}
                <div className="mt-20 relative w-full bg-[#064E3B] py-12 px-6 md:px-12 rounded-3xl mx-auto max-w-7xl flex flex-col items-center gap-8 shadow-2xl shadow-[#064E3B]/20">
                    <p className="text-center font-serif text-2xl md:text-3xl text-white font-medium text-balance">
                        Used by professionals everywhere to speed up their thoughts
                    </p>
                    <div className="w-full relative">
                        <LogoMarquee />
                    </div>
                </div>

            </div>
        </section>

    );
}
