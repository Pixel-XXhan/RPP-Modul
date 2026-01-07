"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Heart, Globe, Lightbulb, Users, MapPin, Mail, Phone, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const values = [
    {
        icon: Heart,
        title: "Empati pada Pendidik",
        description: "Kami paham beban administrasi yang menumpuk. Setiap fitur Katedra dirancang untuk mengurangi jam kerja lembur guru.",
        color: "bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400"
    },
    {
        icon: Lightbulb,
        title: "Inovasi Bertanggung Jawab",
        description: "Kami menggunakan AI secara etis. Bukan untuk menggantikan guru, tapi untuk menjadi asisten cerdas yang bisa diandalkan.",
        color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
    },
    {
        icon: Globe,
        title: "Dampak Nasional",
        description: "Kami bermimpi melihat kualitas pendidikan yang merata di seluruh Indonesia, dimulai dari administrasi yang rapi.",
        color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
    },
    {
        icon: Users,
        title: "Komunitas Guru",
        description: "Kami membangun komunitas guru yang saling berbagi template, tips, dan pengalaman menggunakan Katedra.",
        color: "bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400"
    }
];

const milestones = [
    { year: "2025", title: "Ide Lahir", description: "Arief Fajar, siswa kelas 11 PPLG 3, memulai perjalanan Katedra dari Bandung." },
    { year: "2025", title: "Pengembangan", description: "Prototipe pertama dibuat dengan fokus pada kemudahan guru membuat dokumen administrasi." },
    { year: "2026", title: "Beta Launch", description: "Versi beta diluncurkan untuk guru-guru di Bandung dan sekitarnya." },
    { year: "2026", title: "Ekspansi", description: "Memperluas jangkauan ke seluruh Indonesia dengan fitur-fitur baru." },
];

const stats = [
    { value: "2025", label: "Tahun Berdiri" },
    { value: "Bandung", label: "Kota Asal" },
    { value: "PPLG", label: "Jurusan Founder" },
    { value: "∞", label: "Potensi Dampak" }
];

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

            {/* Stats */}
            <section className="px-6 max-w-7xl mx-auto mb-20">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-primary text-white rounded-2xl p-6 text-center"
                        >
                            <p className="text-3xl md:text-4xl font-bold font-serif">{stat.value}</p>
                            <p className="text-sm text-white/70 mt-1">{stat.label}</p>
                        </motion.div>
                    ))}
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 text-white">
                        <p className="text-sm font-bold uppercase tracking-widest mb-2 opacity-80">Bandung, Indonesia</p>
                        <h2 className="text-3xl font-serif font-bold">Dibuat oleh Siswa SMK untuk Guru Indonesia</h2>
                    </div>
                </motion.div>

                {/* Values */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {values.map((value, index) => {
                        const Icon = value.icon;
                        return (
                            <motion.div
                                key={value.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-card rounded-2xl border border-border p-6 shadow-sm"
                            >
                                <div className={`w-12 h-12 ${value.color} rounded-2xl flex items-center justify-center mb-4`}>
                                    <Icon size={24} />
                                </div>
                                <h3 className="text-lg font-bold font-serif text-foreground mb-2">{value.title}</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* Our Story Timeline */}
            <section className="px-6 max-w-4xl mx-auto mb-32">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold font-serif text-primary mb-4">Perjalanan Kami</h2>
                    <p className="text-muted-foreground">Dari ide seorang siswa SMK menjadi platform yang membantu guru</p>
                </div>

                <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border" />

                    <div className="space-y-8">
                        {milestones.map((milestone, index) => (
                            <motion.div
                                key={milestone.year + milestone.title}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="relative flex gap-6"
                            >
                                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold font-serif text-lg shrink-0 z-10">
                                    {milestone.year.slice(-2)}
                                </div>
                                <div className="bg-card rounded-2xl border border-border p-6 flex-1 shadow-sm">
                                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{milestone.year}</span>
                                    <h3 className="text-lg font-bold text-foreground mt-1">{milestone.title}</h3>
                                    <p className="text-muted-foreground text-sm mt-2">{milestone.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Founder Section */}
            <section className="px-6 max-w-4xl mx-auto mb-32">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-card rounded-3xl border border-border p-8 md:p-12"
                >
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-4xl shrink-0">
                            AF
                        </div>
                        <div className="text-center md:text-left">
                            <h3 className="text-2xl font-bold font-serif text-foreground mb-2">Arief Fajar</h3>
                            <p className="text-primary font-semibold mb-3">Founder & Developer</p>
                            <p className="text-muted-foreground leading-relaxed mb-4">
                                Siswa kelas 11 PPLG 3 dari Bandung yang percaya bahwa teknologi bisa membantu guru fokus pada hal yang paling penting: mengajar dan menginspirasi siswa.
                            </p>
                            <div className="flex flex-wrap justify-center md:justify-start gap-3">
                                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">🎓 Kelas 11 PPLG 3</span>
                                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">📍 Bandung</span>
                                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">💻 Full-Stack Developer</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Contact Section */}
            <section className="px-6 max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-r from-primary to-emerald-400 rounded-3xl p-12 text-white text-center"
                >
                    <Sparkles className="mx-auto mb-4" size={40} />
                    <h2 className="text-3xl font-bold font-serif mb-4">Tertarik Berkolaborasi?</h2>
                    <p className="text-white/80 mb-8 max-w-xl mx-auto">
                        Punya ide, masukan, atau ingin berkontribusi? Mari bersama-sama membantu guru Indonesia.
                    </p>

                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white/10 rounded-xl p-4">
                            <MapPin className="mx-auto mb-2" size={24} />
                            <p className="text-sm font-semibold">Lokasi</p>
                            <p className="text-xs text-white/70">Bandung, Jawa Barat</p>
                        </div>
                        <div className="bg-white/10 rounded-xl p-4">
                            <Mail className="mx-auto mb-2" size={24} />
                            <p className="text-sm font-semibold">Email</p>
                            <p className="text-xs text-white/70">hello@katedra.id</p>
                        </div>
                        <div className="bg-white/10 rounded-xl p-4">
                            <Phone className="mx-auto mb-2" size={24} />
                            <p className="text-sm font-semibold">Telepon</p>
                            <p className="text-xs text-white/70">+62 812 XXXX XXXX</p>
                        </div>
                    </div>

                    <Link href="/register">
                        <Button className="bg-white text-primary hover:bg-white/90 font-bold rounded-xl px-8 py-6">
                            Mulai Menggunakan Katedra <ArrowRight className="ml-2" size={20} />
                        </Button>
                    </Link>
                </motion.div>
            </section>
        </main>
    );
}
