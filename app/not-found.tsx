"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";
import { motion } from "framer-motion";

export default function NotFound() {
    return (
        <main className="min-h-screen flex items-center justify-center bg-[#050510] overflow-hidden relative selection:bg-indigo-500/30">
            {/* Space Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(76,29,149,0.2),transparent_70%)] opacity-50" />
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-[0.05]" />

            {/* Floating Stars/Particles */}
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute bg-white rounded-full opacity-20"
                    style={{
                        width: Math.random() * 3 + 1,
                        height: Math.random() * 3 + 1,
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                    }}
                    animate={{
                        y: [0, -20, 0],
                        opacity: [0.2, 0.5, 0.2],
                    }}
                    transition={{
                        duration: Math.random() * 5 + 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: Math.random() * 2,
                    }}
                />
            ))}

            <div className="container relative z-10 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 px-6 md:px-0">

                {/* Left: Astronaut Illustration */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, x: -50 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative w-full max-w-md md:max-w-lg aspect-square"
                >
                    <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/30 to-purple-500/30 rounded-full blur-[100px] opacity-60 animate-pulse-slow" />
                    <motion.div
                        animate={{ y: [-15, 15, -15], rotate: [0, 2, -2, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="relative z-10"
                    >
                        <Image
                            src="/images/astronaut-404.png"
                            alt="Astronaut Lost in Space 404"
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
                    <div className="space-y-2">
                        <h1 className="text-8xl md:text-9xl font-bold font-serif text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-indigo-300 animate-gradient-x leading-none tracking-tighter drop-shadow-lg">
                            404
                        </h1>
                        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-wide uppercase">
                            Houston, We Have a Problem
                        </h2>
                        <p className="text-lg text-indigo-200/80 leading-relaxed font-light">
                            Astronot kami tersesat di antariksa digital. Halaman yang Anda cari tidak dapat ditemukan di koordinat ini.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full md:w-auto">
                        <Button
                            asChild
                            size="lg"
                            className="h-12 px-8 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-lg shadow-[0_0_20px_rgba(79,70,229,0.4)] transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(79,70,229,0.6)]"
                        >
                            <Link href="/dashboard">
                                <Home className="mr-2 h-5 w-5" />
                                Kembali ke Base
                            </Link>
                        </Button>

                        <Button
                            asChild
                            variant="outline"
                            size="lg"
                            className="h-12 px-8 rounded-full border-white/10 bg-white/5 text-white hover:bg-white/10 font-medium text-lg backdrop-blur-md transition-all hover:scale-105"
                        >
                            <Link href="javascript:history.back()">
                                <ArrowLeft className="mr-2 h-5 w-5" />
                                Mundur
                            </Link>
                        </Button>
                    </div>

                    <p className="text-indigo-400/30 text-xs md:text-left font-mono pt-8">
                        Mission Status: FAILED | Code: 404_LOST_IN_SPACE
                    </p>
                </motion.div>
            </div>
        </main>
    );
}
