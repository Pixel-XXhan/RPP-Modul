"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const showcaseItems = [
    { title: "Modul Ajar Matematika Fase E", category: "SMA / MA", image: "/images/carousel/dashboard.png" },
    { title: "Laporan Asesmen Diagnostik", category: "SD Fase B", image: "/images/carousel/analytics.png" },
    { title: "Alur Tujuan Pembelajaran IPA", category: "SMP Fase D", image: "/images/carousel/editor.png" },
    { title: "Program Semester Genap", category: "SMK Fase F", image: "/images/carousel/curriculum.png" },
    { title: "Rapor Projek P5", category: "Semua Jenjang", image: "/images/carousel/reports.png" },
    { title: "Modul Ajar Bahasa Indonesia", category: "SMA Fase F", image: "/images/carousel/dashboard.png" }, // Reusing for grid fullness
];

export default function ShowcasePage() {
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
                        Galeri Karya
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-6xl font-bold font-serif text-primary mb-6 leading-tight"
                    >
                        Hasil Terbaik dari <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">Katedra AI.</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed text-balance"
                    >
                        Lihat bagaimana Katedra mengubah administrasi rumit menjadi dokumen profesional yang rapi dan terstruktur.
                    </motion.p>
                </div>
            </section>

            {/* Gallery Grid */}
            <section className="px-6 max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {showcaseItems.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative rounded-2xl overflow-hidden bg-white border border-neutral-100 shadow-sm hover:shadow-xl transition-all duration-500"
                        >
                            <div className="aspect-[4/3] relative overflow-hidden">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />

                                {/* Hover Overlay Button */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <button className="bg-white text-primary px-6 py-3 rounded-full font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        Lihat Detail <ArrowUpRight size={18} />
                                    </button>
                                </div>
                            </div>
                            <div className="p-6">
                                <p className="text-xs font-bold text-accent-dark uppercase tracking-wider mb-2">{item.category}</p>
                                <h3 className="text-xl font-bold text-foreground font-serif group-hover:text-primary transition-colors">{item.title}</h3>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </main>
    );
}
