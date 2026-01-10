"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";
import { motion } from "framer-motion";

export default function NotFound() {
    return (
        <main className="min-h-screen flex items-center justify-center bg-[#0a0a0a] overflow-hidden relative selection:bg-primary/30">
            {/* Dynamic Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(var(--primary-rgb),0.1),transparent_70%)] opacity-30" />
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-[0.05]" />

            <div className="container relative z-10 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 px-6 md:px-0">

                {/* Left: 3D Illustration */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative w-full max-w-lg md:max-w-xl aspect-square"
                >
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-full blur-[120px] opacity-40 animate-pulse-slow" />
                    <motion.div
                        animate={{ y: [-15, 15, -15] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <Image
                            src="/images/404-illustration.png"
                            alt="404 Page Not Found"
                            width={800}
                            height={800}
                            className="object-contain drop-shadow-2xl"
                            priority
                        />
                    </motion.div>
                </motion.div>

                {/* Right: Content */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="flex flex-col items-center md:items-start text-center md:text-left space-y-6 max-w-lg"
                >
                    <div className="space-y-4">
                        <h1 className="text-8xl md:text-9xl font-bold font-serif text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40 leading-none">
                            404
                        </h1>
                        <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight">
                            Halaman Hilang?
                        </h2>
                        <p className="text-lg text-white/60 leading-relaxed font-light">
                            Jangan khawatir, bahkan AI terpintar pun kadang tersesat. Halaman yang Anda cari mungkin telah dipindahkan atau diculik oleh alien (canda).
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full md:w-auto">
                        <Button
                            asChild
                            size="lg"
                            className="h-14 px-8 rounded-full bg-primary hover:bg-primary/90 text-white font-bold text-lg shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)] transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(var(--primary-rgb),0.5)]"
                        >
                            <Link href="/dashboard">
                                <Home className="mr-2 h-5 w-5" />
                                Kembali ke Dashboard
                            </Link>
                        </Button>

                        <Button
                            asChild
                            variant="outline"
                            size="lg"
                            className="h-14 px-8 rounded-full border-white/10 bg-white/5 text-white hover:bg-white/10 font-medium text-lg backdrop-blur-md transition-all hover:scale-105"
                        >
                            <Link href="javascript:history.back()">
                                <ArrowLeft className="mr-2 h-5 w-5" />
                                Kembali
                            </Link>
                        </Button>
                    </div>

                    <p className="text-white/20 text-sm md:text-left font-mono pt-8">
                        Error Code: SUWARG-404-NOT-FOUND
                    </p>
                </motion.div>
            </div>
        </main>
    );
}
