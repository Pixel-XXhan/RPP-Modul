"use client";

import { motion, useInView } from "framer-motion";
import { Users, FileText, Heart, Star } from "lucide-react";
import { useRef, useEffect, useState } from "react";

const Counter = ({ value, duration = 2 }: { value: number; duration?: number }) => {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        if (inView) {
            let start = 0;
            const end = value;
            const totalFrames = Math.round(duration * 60);
            let frame = 0;

            const counter = setInterval(() => {
                frame++;
                const progress = frame / totalFrames;
                const current = Math.round(end * (1 - Math.pow(1 - progress, 3))); // EaseOutCubic

                setDisplayValue(current);

                if (frame === totalFrames) {
                    clearInterval(counter);
                }
            }, 1000 / 60);

            return () => clearInterval(counter);
        }
    }, [inView, value, duration]);

    return <span ref={ref}>{displayValue.toLocaleString()}</span>;
};

export function TrustProof() {
    const stats = [
        { number: 1200, suffix: '+', label: 'Guru Pengguna', icon: Users },
        { number: 15000, suffix: '+', label: 'Dokumen Dibuat', icon: FileText },
        { number: 98, suffix: '%', label: 'Tingkat Kepuasan', icon: Heart },
        { number: 4.9, suffix: '/5', label: 'Rating Aplikasi', icon: Star, isDecimal: true },
    ];

    return (
        <section className="py-24 bg-white border-t border-primary/5 relative overflow-hidden">
            {/* Elegant Divider */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-[1px] bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

            <div className="max-w-6xl mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.6 }}
                            className="space-y-4 group p-6 rounded-2xl hover:bg-neutral-50 transition-all duration-500 cursor-default relative"
                        >
                            {/* Subtle Card Glow on Hover */}
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500 pointer-events-none" />

                            {/* Icon */}
                            <div className="inline-flex p-4 bg-accent/10 rounded-full text-accent-dark mb-2 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 relative z-10">
                                <stat.icon size={28} strokeWidth={1.5} />
                            </div>

                            {/* Counter */}
                            <div className="relative z-10">
                                <div className="text-4xl md:text-5xl font-bold text-primary font-serif mb-2 tracking-tight">
                                    {stat.isDecimal ? (
                                        <span>{stat.number}</span>
                                    ) : (
                                        <Counter value={stat.number} />
                                    )}
                                    <span className="text-accent">{stat.suffix}</span>
                                </div>
                                <div className="text-sm font-medium text-muted-foreground uppercase tracking-widest group-hover:text-primary transition-colors duration-300">
                                    {stat.label}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
