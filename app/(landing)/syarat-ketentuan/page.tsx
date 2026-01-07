"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ScrollText, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function TermsPage() {
    return (
        <main className="min-h-screen pt-24 pb-20 px-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <Link href="/login" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8 group">
                    <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                    Kembali ke Login
                </Link>

                <div className="text-center mb-16">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-accent-dark border border-accent/20"
                    >
                        <ScrollText size={32} />
                    </motion.div>
                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="text-4xl md:text-5xl font-bold font-serif text-foreground mb-4"
                    >
                        Syarat & Ketentuan
                    </motion.h1>
                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-muted-foreground"
                    >
                        Terakhir diperbarui: Januari 2026
                    </motion.p>
                </div>

                {/* Content Card */}
                <motion.div
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white/50 backdrop-blur-xl border border-white/40 shadow-xl rounded-3xl p-8 md:p-12 space-y-12"
                >
                    <section>
                        <h3 className="text-xl font-bold font-serif text-primary mb-4 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">1</span>
                            Penggunaan Layanan
                        </h3>
                        <p className="text-muted-foreground leading-relaxed pl-11">
                            Katedra disediakan sebagai alat bantu("tool") untuk administrasi pendidikan. Meskipun kami menggunakan teknologi AI tercanggih, hasil akhir (Modul Ajar, ATP, dll) tetap memerlukan verifikasi dan validasi dari Anda sebagai pendidik profesional. Kami tidak bertanggung jawab atas penggunaan dokumen tanpa validasi.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-xl font-bold font-serif text-primary mb-4 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">2</span>
                            Akun & Keamanan
                        </h3>
                        <p className="text-muted-foreground leading-relaxed pl-11">
                            Anda bertanggung jawab penuh atas kerahasiaan password akun Anda. Aktivitas yang terjadi di bawah akun Anda adalah tanggung jawab Anda sepenuhnya. Jika Anda mencurigai adanya akses ilegal, segera hubungi tim support kami.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-xl font-bold font-serif text-primary mb-4 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">3</span>
                            Langganan & Pembayaran
                        </h3>
                        <p className="text-muted-foreground leading-relaxed pl-11">
                            Layanan Katedra Pro bersifat berlangganan (bulanan/tahunan). Pembayaran tidak dapat dikembalikan (non-refundable) kecuali ditentukan lain oleh hukum yang berlaku. Anda dapat membatalkan langganan kapan saja melalui dashboard akun.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-xl font-bold font-serif text-primary mb-4 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">4</span>
                            Hak Kekayaan Intelektual
                        </h3>
                        <p className="text-muted-foreground leading-relaxed pl-11">
                            Dokumen yang Anda hasilkan adalah milik Anda sepenuhnya. Namun, Katedra memiliki hak untuk menggunakan data anonim (tanpa identitas) untuk tujuan pelatihan dan peningkatan kualitas model AI kami, kecuali Anda memilih untuk opt-out (keluar) dari program perbaikan data.
                        </p>
                    </section>
                </motion.div>

                <div className="text-center mt-12 text-sm text-muted-foreground">
                    <p>Punya pertanyaan hukum? Hubungi <a href="#" className="font-bold text-primary hover:underline">legal@katedra.id</a></p>
                </div>
            </div>
        </main>
    );
}
