"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
    HelpCircle,
    Search,
    BookOpen,
    Video,
    MessageCircle,
    ChevronDown,
    ChevronRight,
    ExternalLink,
    Keyboard,
    FileText,
    Sparkles,
} from "lucide-react";

const faqs = [
    {
        question: "Bagaimana cara membuat Modul Ajar pertama?",
        answer: "Klik tombol 'Buat Dokumen' di dashboard atau navigasi ke menu Modul Ajar > Buat Baru. Isi informasi dasar seperti mata pelajaran dan kelas, lalu biarkan AI membantu melengkapi konten berdasarkan Capaian Pembelajaran yang Anda pilih.",
    },
    {
        question: "Apakah dokumen yang dihasilkan sesuai Kurikulum Merdeka?",
        answer: "Ya, semua template dan AI kami dioptimalkan untuk struktur Kurikulum Merdeka. Dokumen otomatis mengikuti format yang diakui Kemendikbudristek, termasuk Capaian Pembelajaran, Tujuan Pembelajaran, dan Asesmen.",
    },
    {
        question: "Bagaimana cara export dokumen ke PDF atau Word?",
        answer: "Setelah dokumen selesai, klik tombol 'Export' di halaman detail dokumen. Pilih format yang diinginkan (PDF atau DOCX) dan dokumen akan otomatis diunduh ke perangkat Anda.",
    },
    {
        question: "Apakah saya bisa mengedit hasil AI?",
        answer: "Tentu! Semua output AI dapat diedit sepenuhnya. Kami menyediakan editor yang mudah digunakan untuk menyesuaikan konten sesuai kebutuhan spesifik Anda.",
    },
    {
        question: "Bagaimana cara upgrade ke paket Professional?",
        answer: "Buka menu Pengaturan > Langganan atau kunjungi halaman Harga di website kami. Pilih paket yang sesuai dan ikuti proses pembayaran yang aman.",
    },
];

const tutorials = [
    { title: "Membuat Modul Ajar dengan AI", duration: "5 menit", category: "Dasar" },
    { title: "Menyusun ATP yang Efektif", duration: "8 menit", category: "Kurikulum" },
    { title: "Membuat Asesmen Formatif", duration: "6 menit", category: "Asesmen" },
    { title: "Export dan Berbagi Dokumen", duration: "3 menit", category: "Fitur" },
];

const shortcuts = [
    { keys: ["Ctrl", "K"], action: "Buka pencarian cepat" },
    { keys: ["Ctrl", "N"], action: "Buat dokumen baru" },
    { keys: ["Ctrl", "S"], action: "Simpan dokumen" },
    { keys: ["Ctrl", "E"], action: "Export dokumen" },
];

export default function BantuanPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [openFaq, setOpenFaq] = useState<number | null>(0);

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div className="text-center">
                <h1 className="text-2xl md:text-3xl font-bold font-serif text-foreground">Pusat Bantuan</h1>
                <p className="text-muted-foreground mt-1">Temukan jawaban dan pelajari cara menggunakan Katedra</p>
            </div>

            {/* Search */}
            <div className="relative max-w-xl mx-auto">
                <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                    type="text"
                    placeholder="Cari bantuan..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-card border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-lg text-foreground placeholder:text-muted-foreground"
                />
            </div>

            {/* Quick Links */}
            <div className="grid md:grid-cols-3 gap-4">
                {[
                    { title: "Dokumentasi", desc: "Panduan lengkap", icon: BookOpen, href: "#" },
                    { title: "Video Tutorial", desc: "Belajar dengan video", icon: Video, href: "#" },
                    { title: "Hubungi Kami", desc: "Tim support siap membantu", icon: MessageCircle, href: "#" },
                ].map((link, index) => {
                    const Icon = link.icon;
                    return (
                        <motion.a
                            key={link.title}
                            href={link.href}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-card rounded-2xl border border-border p-5 hover:shadow-lg hover:border-primary/20 transition-all group"
                        >
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-3 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                <Icon size={24} />
                            </div>
                            <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">{link.title}</h3>
                            <p className="text-sm text-muted-foreground">{link.desc}</p>
                        </motion.a>
                    );
                })}
            </div>

            {/* FAQ */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-card rounded-2xl border border-border overflow-hidden"
            >
                <div className="p-6 border-b border-border">
                    <h2 className="text-lg font-bold text-foreground">Pertanyaan Umum (FAQ)</h2>
                </div>
                <div className="divide-y divide-border">
                    {faqs.map((faq, index) => (
                        <div key={index} className="group">
                            <button
                                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/50 transition-colors"
                            >
                                <span className="font-medium text-foreground pr-4">{faq.question}</span>
                                <ChevronDown
                                    size={20}
                                    className={`text-muted-foreground shrink-0 transition-transform ${openFaq === index ? "rotate-180" : ""
                                        }`}
                                />
                            </button>
                            {openFaq === index && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    className="px-6 pb-6"
                                >
                                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                                </motion.div>
                            )}
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Video Tutorials */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-card rounded-2xl border border-border p-6"
            >
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-foreground">Video Tutorial</h2>
                    <a href="#" className="text-sm text-primary font-semibold hover:underline flex items-center gap-1">
                        Lihat Semua <ExternalLink size={14} />
                    </a>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                    {tutorials.map((tutorial, index) => (
                        <a
                            key={index}
                            href="#"
                            className="flex items-center gap-4 p-4 rounded-xl hover:bg-muted/50 transition-colors group"
                        >
                            <div className="w-16 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                <Video size={20} />
                            </div>
                            <div className="flex-1">
                                <p className="font-medium text-foreground group-hover:text-primary transition-colors">{tutorial.title}</p>
                                <p className="text-xs text-muted-foreground">{tutorial.duration} • {tutorial.category}</p>
                            </div>
                            <ChevronRight size={18} className="text-muted-foreground" />
                        </a>
                    ))}
                </div>
            </motion.div>

            {/* Keyboard Shortcuts */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-card rounded-2xl border border-border p-6"
            >
                <div className="flex items-center gap-2 mb-6">
                    <Keyboard size={20} className="text-primary" />
                    <h2 className="text-lg font-bold text-foreground">Pintasan Keyboard</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                    {shortcuts.map((shortcut, index) => (
                        <div key={index} className="flex items-center justify-between py-3 px-4 bg-muted/50 rounded-xl">
                            <span className="text-muted-foreground">{shortcut.action}</span>
                            <div className="flex items-center gap-1">
                                {shortcut.keys.map((key, i) => (
                                    <span key={i}>
                                        <kbd className="px-2 py-1 bg-background border border-border rounded text-xs font-mono text-foreground">
                                            {key}
                                        </kbd>
                                        {i < shortcut.keys.length - 1 && <span className="text-muted-foreground mx-1">+</span>}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Contact CTA */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-gradient-to-r from-primary to-emerald-500 rounded-2xl p-8 text-center text-primary-foreground"
            >
                <Sparkles size={32} className="mx-auto mb-4 text-amber-300" />
                <h2 className="text-xl font-bold font-serif mb-2">Butuh Bantuan Lebih?</h2>
                <p className="opacity-80 mb-6">Tim support kami siap membantu Anda 24/7</p>
                <Button className="bg-background text-foreground hover:bg-background/90 font-semibold rounded-xl">
                    <MessageCircle size={18} className="mr-2" />
                    Hubungi Support
                </Button>
            </motion.div>
        </div>
    );
}

