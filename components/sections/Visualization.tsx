"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, CheckCircle2, ExternalLink } from "lucide-react";

export function Visualization() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const laptopY = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const badgeY = useTransform(scrollYProgress, [0, 1], [50, -50]);

    return (
        <section ref={containerRef} id="showcase" className="py-32 bg-[#FAFAFA] overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

                {/* Left Column: Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-10 relative z-10"
                >
                    {/* Eyebrow */}
                    <span className="text-accent-dark text-xs font-bold uppercase tracking-[0.2em]">
                        Output Profesional
                    </span>

                    {/* Headline */}
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight font-serif">
                        Format Baku,
                        <br />
                        <span className="text-primary decoration-accent/30 underline decoration-4 underline-offset-4">Standar Pengawas</span>
                    </h2>

                    {/* Description */}
                    <p className="text-lg text-muted-foreground leading-relaxed font-sans max-w-lg">
                        Setiap dokumen yang dihasilkan Katedra mengikuti pedoman format resmi
                        Kemendikbud. Tidak perlu khawatir soal margin, font, atau struktur tabel.
                    </p>

                    {/* Feature List */}
                    <ul className="space-y-5">
                        {[
                            'Tabel identitas dengan border konsisten',
                            'Rubrik asesmen autentik (Proses & Produk)',
                            'Glosarium istilah pembelajaran',
                            'Lampiran media & referensi',
                        ].map((item, idx) => (
                            <motion.li
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex items-start gap-4 group"
                            >
                                <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-0.5 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                                    <Check size={14} className="text-primary group-hover:text-white transition-colors" />
                                </div>
                                <span className="text-foreground font-medium">{item}</span>
                            </motion.li>
                        ))}
                    </ul>

                    {/* CTA Button */}
                    <Button
                        size="lg"
                        className="rounded-full bg-primary hover:bg-primary-dark text-white px-8 py-7 text-lg shadow-xl shadow-primary/20 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                    >
                        Lihat Contoh Dokumen
                        <ExternalLink size={18} className="ml-2" />
                    </Button>
                </motion.div>

                {/* Right Column: Visual Demo */}
                <motion.div
                    style={{ y: laptopY }}
                    className="relative perspective-1000"
                >
                    {/* Background Depth Orbs */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-gradient-radial from-accent/10 to-transparent blur-3xl" />

                    {/* Laptop Mockup */}
                    <div className="relative z-10 mx-auto max-w-[650px] transform rotate-x-6 rotate-y-6 hover:rotate-0 transition-transform duration-700 ease-out">
                        {/* Laptop Screen Frame */}
                        <div className="bg-[#1a1a1a] rounded-t-2xl p-3 pb-0 shadow-2xl ring-1 ring-white/10 relative">
                            {/* Camera Dot */}
                            <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-gray-800 rounded-full ring-1 ring-gray-700"></div>

                            {/* Screen Bezel */}
                            <div className="bg-white rounded-t-lg overflow-hidden border-[6px] border-[#1a1a1a] border-b-0 h-[450px] relative">
                                {/* Document Preview - Auto-scrolling */}
                                <motion.div
                                    animate={{ y: [0, -600, 0] }}
                                    transition={{
                                        duration: 20,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        repeatDelay: 2
                                    }}
                                    className="bg-white p-8 sm:p-10 shadow-inner"
                                >
                                    {/* Fake Document Content */}
                                    <div className="space-y-8 text-xs sm:text-sm font-serif text-gray-800">
                                        {/* Header */}
                                        <div className="text-center border-b-[3px] border-double border-primary pb-6">
                                            <div className="flex justify-center mb-3">
                                                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                                                    <div className="w-8 h-8 bg-primary rounded-full opacity-20 animate-ping"></div>
                                                </div>
                                            </div>
                                            <h3 className="font-bold text-base tracking-widest text-primary">MODUL AJAR</h3>
                                            <p className="text-gray-500 italic mt-1">Kurikulum Merdeka 2024</p>
                                        </div>

                                        {/* Tabel Identitas */}
                                        <table className="w-full border-collapse border border-gray-300 shadow-sm">
                                            <tbody>
                                                <tr className="border-b border-gray-300">
                                                    <td className="border-r border-gray-300 p-3 bg-gray-50 font-bold w-1/3 text-primary-dark">Mata Pelajaran</td>
                                                    <td className="p-3 font-medium">Biologi</td>
                                                </tr>
                                                <tr className="border-b border-gray-300">
                                                    <td className="border-r border-gray-300 p-3 bg-gray-50 font-bold text-primary-dark">Fase / Kelas</td>
                                                    <td className="p-3 font-medium">E (Kelas X)</td>
                                                </tr>
                                                <tr className="border-b border-gray-300">
                                                    <td className="border-r border-gray-300 p-3 bg-gray-50 font-bold text-primary-dark">Topik Utama</td>
                                                    <td className="p-3 font-medium">Pemahaman Biologi (Sel)</td>
                                                </tr>
                                            </tbody>
                                        </table>

                                        {/* Content Sections */}
                                        <div>
                                            <h4 className="font-bold text-primary mb-3 text-base border-b border-gray-200 pb-1">A. Capaian Pembelajaran</h4>
                                            <p className="text-gray-600 leading-relaxed text-justify">
                                                Pada akhir fase E, peserta didik memiliki kemampuan menciptakan solusi atas permasalahan-permasalahan berdasarkan isu lokal, nasional atau global terkait pemahaman keanekaragaman makhluk hidup dan peranannya...
                                            </p>
                                        </div>

                                        <div>
                                            <h4 className="font-bold text-primary mb-3 text-base border-b border-gray-200 pb-1">B. Tujuan Pembelajaran</h4>
                                            <ol className="list-decimal list-inside space-y-2 text-gray-600 pl-2">
                                                <li>Mengidentifikasi komponen kimiawi penyusun sel, sel prokariot, dan sel eukariot.</li>
                                                <li>Menganalisis perbedaan antara sel hewan dan sel tumbuhan.</li>
                                                <li>Menjelaskan fungsi organel-organel sel dalam proses metabolisme.</li>
                                            </ol>
                                        </div>

                                        <div>
                                            <h4 className="font-bold text-primary mb-3 text-base border-b border-gray-200 pb-1">C. Kegiatan Pembelajaran</h4>
                                            <div className="border border-gray-200 p-4 bg-gray-50/50 rounded-lg">
                                                <p className="font-bold text-primary-dark mb-2">Pertemuan 1 (2 JP)</p>
                                                <ul className="list-disc list-inside space-y-1 text-gray-500">
                                                    <li>Pendahuluan (15 menit) <span className="text-xs text-accent italic">- Apersepsi</span></li>
                                                    <li>Kegiatan Inti (60 menit) <span className="text-xs text-accent italic">- Diskusi Kelompok</span></li>
                                                    <li>Penutup (15 menit) <span className="text-xs text-accent italic">- Refleksi</span></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Gradient fade at bottom/top of screen for smooth loop illusion */}
                                <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-white to-transparent pointer-events-none" />
                                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                            </div>
                        </div>

                        {/* Laptop Base */}
                        <div className="h-5 bg-[#2a2a2a] rounded-b-[20px] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] mx-auto w-full relative z-20">
                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-1.5 bg-[#4a4a4a] rounded-b-lg"></div>
                        </div>
                    </div>

                    {/* Floating Badge Parallax */}
                    <motion.div
                        style={{ y: badgeY }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1 }}
                        className="absolute -bottom-10 -right-4 sm:-right-10 bg-white/90 backdrop-blur-md px-6 py-4 rounded-2xl shadow-2xl border border-white/40 z-30"
                    >
                        <div className="flex items-center gap-3">
                            <div className="bg-green-100 p-2 rounded-full">
                                <CheckCircle2 className="text-green-600" size={24} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Status</p>
                                <p className="text-base font-bold text-primary-dark">Format Valid ✓</p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
