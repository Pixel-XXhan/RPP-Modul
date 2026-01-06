"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles, Play, Check } from "lucide-react";
import { useEffect, useState } from "react";

const ParticleContainer = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute bg-accent/20 rounded-full"
                    initial={{
                        x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                        y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
                        scale: Math.random() * 0.5 + 0.5,
                        opacity: Math.random() * 0.5 + 0.2
                    }}
                    animate={{
                        y: [null, Math.random() * -100],
                        opacity: [null, 0]
                    }}
                    transition={{
                        duration: Math.random() * 5 + 5,
                        repeat: Infinity,
                        ease: "linear",
                        delay: Math.random() * 5
                    }}
                    style={{
                        width: Math.random() * 4 + 1 + "px",
                        height: Math.random() * 4 + 1 + "px",
                    }}
                />
            ))}
        </div>
    );
};

export function FinalCTA() {
    return (
        <section className="relative py-32 bg-[#022C22] overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#064E3B] via-[#022C22] to-[#011c15]" />
                <div className="absolute -top-[20%] -left-[10%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px]" />
                <div className="absolute -bottom-[20%] -right-[10%] w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px]" />
            </div>

            <ParticleContainer />

            {/* Content Container */}
            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="space-y-12"
                >
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight font-serif tracking-tight">
                        Siap Menghemat <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-yellow-200 to-accent animate-gradient bg-300%">20 Jam</span>
                        <br />
                        Kerja Administrasi?
                    </h2>

                    <p className="text-xl text-white/80 max-w-2xl mx-auto font-sans leading-relaxed text-balance">
                        Bergabung dengan ribuan guru yang sudah fokus ke hal yang penting: <span className="text-white font-medium border-b border-accent/50 pb-0.5">mengajar</span>.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-6">
                        <Button
                            size="lg"
                            className="group relative bg-accent hover:bg-accent-light text-[#022C22] px-10 py-8 h-auto text-lg font-bold shadow-[0_0_40px_-10px_rgba(212,175,55,0.3)] hover:shadow-[0_0_60px_-15px_rgba(212,175,55,0.4)] transition-all transform hover:scale-105 rounded-full overflow-hidden"
                        >
                            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-shimmer" />
                            <span className="relative flex items-center gap-2">
                                Mulai Gratis Sekarang
                                <Sparkles size={20} className="fill-current" />
                            </span>
                        </Button>

                        <Button
                            size="lg"
                            variant="outline"
                            className="border border-white/10 bg-white/5 text-white hover:bg-white hover:text-primary px-10 py-8 h-auto text-lg font-medium backdrop-blur-sm rounded-full transition-all hover:scale-105"
                        >
                            Lihat Demo
                            <Play size={20} className="ml-2 fill-current" />
                        </Button>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-white/60 pt-8 font-medium tracking-wide">
                        <span className="flex items-center gap-2">
                            <Check size={16} className="text-accent" />
                            Tanpa Kartu Kredit
                        </span>
                        <span className="hidden sm:inline text-white/10">|</span>
                        <span className="flex items-center gap-2">
                            <Check size={16} className="text-accent" />
                            1 Dokumen Gratis
                        </span>
                        <span className="hidden sm:inline text-white/10">|</span>
                        <span className="flex items-center gap-2">
                            <Check size={16} className="text-accent" />
                            Cancel Kapan Saja
                        </span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
