"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";
import { motion } from "framer-motion";

export default function NotFound() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-background p-4 relative overflow-hidden">
            {/* Background Blobs */}
            <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-3xl opacity-50" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-accent/20 rounded-full blur-3xl opacity-50" />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center space-y-8 z-10"
            >
                <div className="space-y-2">
                    <h1 className="text-9xl font-bold text-primary font-serif">404</h1>
                    <h2 className="text-3xl font-bold tracking-tight">Halaman Tidak Ditemukan</h2>
                    <p className="text-muted-foreground max-w-[500px] mx-auto">
                        Maaf, halaman yang Anda cari mungkin telah dipindahkan, dihapus, atau tidak tersedia lagi.
                    </p>
                </div>

                <div className="flex gap-4 justify-center">
                    <Button asChild size="lg" className="rounded-xl h-12 px-8">
                        <Link href="/">
                            <Home className="mr-2 h-4 w-4" />
                            Ke Beranda
                        </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="rounded-xl h-12 px-8">
                        <Link href="javascript:history.back()">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Kembali
                        </Link>
                    </Button>
                </div>
            </motion.div>
        </main>
    );
}
