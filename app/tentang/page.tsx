"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Heart, Globe, Lightbulb } from "lucide-react";

export default function TentangPage() {
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
                        Tentang Katedra
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-6xl font-bold font-serif text-primary mb-6 leading-tight"
                    >
                        Mengembalikan Fokus Guru <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">Kepada Siswa.</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed text-balance"
                    >
                        Misi kami sederhana: Menggunakan AI untuk menangani beban administrasi, agar pendidik bisa kembali menginspirasi.
                    </motion.p>
                </div>
            </section>

            {/* Team Image & Story */}
            <section className="px-6 max-w-7xl mx-auto mb-32">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative rounded-3xl overflow-hidden aspect-[21/9] shadow-2xl mb-16 group"
                >
                    <Image
                        src="/images/about-team.png"
                        alt="Katedra Team"
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 text-white">
                        <p className="text-sm font-bold uppercase tracking-widest mb-2 opacity-80">Jakarta, Indonesia</p>
                        <h2 className="text-3xl font-serif font-bold">Dibuat oleh Pendidik & Insinyur</h2>
                    </div>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-12">
                    <div className="space-y-4">
                        <div className="w-12 h-12 bg-rose-100 rounded-2xl flex items-center justify-center text-rose-600 mb-4">
                            <Heart size={24} />
                        </div>
                        <h3 className="text-xl font-bold font-serif text-foreground">Empati pada Pendidik</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            Kami paham beban administrasi yang menumpuk. Setiap fitur Katedra dirancang untuk mengurangi jam kerja lembur guru.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-4">
                            <Lightbulb size={24} />
                        </div>
                        <h3 className="text-xl font-bold font-serif text-foreground">Inovasi Bertanggung Jawab</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            Kami menggunakan AI secara etis. Bukan untuk menggantikan guru, tapi untuk menjadi asisten cerdas yang bisa diandalkan.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 mb-4">
                            <Globe size={24} />
                        </div>
                        <h3 className="text-xl font-bold font-serif text-foreground">Dampak Nasional</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            Kami bermimpi melihat kualitas pendidikan yang merata di seluruh Indonesia, dimulai dari administrasi yang rapi.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
