"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Lock, Eye } from "lucide-react";
import { motion } from "framer-motion";

export default function PrivacyPage() {
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
                        className="w-16 h-16 bg-blue-100/50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-blue-700 border border-blue-200"
                    >
                        <Lock size={32} />
                    </motion.div>
                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="text-4xl md:text-5xl font-bold font-serif text-foreground mb-4"
                    >
                        Kebijakan Privasi
                    </motion.h1>
                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-muted-foreground"
                    >
                        Kami menjaga data Anda seaman kami menjaga data kami sendiri.
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
                        <h3 className="text-xl font-bold font-serif text-blue-900 mb-4 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-sm font-bold">1</span>
                            Data yang Kami Kumpulkan
                        </h3>
                        <ul className="list-disc pl-16 text-muted-foreground space-y-2 leading-relaxed">
                            <li><strong>Informasi Akun:</strong> Nama, alamat email, nomer telepon, dan institusi sekolah.</li>
                            <li><strong>Konten Pengguna:</strong> Modul ajar, dokumen kurikulum, dan data siswa yang Anda input (semua dienkripsi).</li>
                            <li><strong>Data Penggunaan:</strong> Log aktivitas untuk memantau performa sistem dan keamanan.</li>
                        </ul>
                    </section>

                    <section>
                        <h3 className="text-xl font-bold font-serif text-blue-900 mb-4 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-sm font-bold">2</span>
                            Penggunaan Data
                        </h3>
                        <p className="text-muted-foreground leading-relaxed pl-11">
                            Data Anda digunakan semata-mata untuk:
                        </p>
                        <ul className="list-disc pl-16 mt-2 text-muted-foreground space-y-2 leading-relaxed">
                            <li>Menyediakan layanan pembuatan dokumen otomatis.</li>
                            <li>Meningkatkan akurasi model AI Katedra (dengan data yang di-anonimkan).</li>
                            <li>Mengirimkan informasi penting terkait akun dan perubahan kebijakan.</li>
                        </ul>
                    </section>

                    <section>
                        <h3 className="text-xl font-bold font-serif text-blue-900 mb-4 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-sm font-bold">3</span>
                            Keamanan Data
                        </h3>
                        <p className="text-muted-foreground leading-relaxed pl-11">
                            Kami menggunakan standar keamanan enkripsi **AES-256** untuk data istirahat (at rest) dan **TLS 1.3** untuk data dalam transit. Database kami dilindungi oleh firewall berlapis dan audit keamanan berkala.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-xl font-bold font-serif text-blue-900 mb-4 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-sm font-bold">4</span>
                            Hak Anda
                        </h3>
                        <p className="text-muted-foreground leading-relaxed pl-11">
                            Anda memiliki hak untuk meminta salinan data (Export Data) atau meminta penghapusan permanen akun dan seluruh data terkait (Right to be Forgotten) kapan saja melalui menu pengaturan akun.
                        </p>
                    </section>
                </motion.div>

                <div className="text-center mt-12 text-sm text-muted-foreground">
                    <p>Ada keprihatinan tentang privasi? Email kami di <a href="#" className="font-bold text-blue-700 hover:underline">privacy@katedra.id</a></p>
                </div>
            </div>
        </main>
    );
}
