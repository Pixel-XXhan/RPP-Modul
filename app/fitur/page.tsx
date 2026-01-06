"use client";

import { motion } from "framer-motion";
import { ValueProp } from "@/components/sections/ValueProp"; // Reusing the content we just polished
import Image from "next/image";

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

            {/* Core Features (Reusing ValueProp which has the grids & images) */}
            <ValueProp />

            {/* Additional "Deep Dive" Section to ensure "Lengkap" */}
            <section className="py-20 px-6 max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-center mb-32">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative rounded-3xl overflow-hidden shadow-2xl border border-neutral-200"
                    >
                        <Image
                            src="/images/carousel/editor.png"
                            alt="Smart Editor"
                            width={800}
                            height={600}
                            className="w-full h-auto"
                        />
                    </motion.div>
                    <div className="space-y-6">
                        <h3 className="text-3xl font-bold font-serif text-primary">Smart Editor Berbasis Konteks</h3>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Editor kami tidak hanya memperbaiki typo. Ia memahami konteks pedagogis, menyarankan perbaikan kalimat agar lebih sesuai dengan Taksonomi Bloom, dan memastikan alur ajar yang logis.
                        </p>
                        <ul className="space-y-3">
                            {['Saran kalimat aktif', 'Cek kesesuaian ATP', 'Integrasi Profil Pelajar Pancasila'].map((item) => (
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
                            {['Update otomatis regulasi', 'Validasi struktur modul', 'Rekomendasi asesmen'].map((item) => (
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
                        className="relative rounded-3xl overflow-hidden shadow-2xl border border-neutral-200 order-1 md:order-2"
                    >
                        <Image
                            src="/images/carousel/analytics.png"
                            alt="Realtime Analytics"
                            width={800}
                            height={600}
                            className="w-full h-auto"
                        />
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
