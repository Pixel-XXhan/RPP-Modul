"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, ArrowRight } from "lucide-react";

export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <main className="min-h-screen grid lg:grid-cols-2">
            {/* Left Side: Visual */}
            <div className="relative hidden lg:block h-full overflow-hidden order-2">
                <Image
                    src="/images/auth-side.png"
                    alt="Katedra Library"
                    fill
                    className="object-cover scale-x-[-1]" // Flipping image for variety
                    priority
                />
                <div className="absolute inset-0 bg-primary/40 mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                <div className="absolute bottom-20 left-12 right-12 text-white z-10 text-right">
                    <p className="text-2xl font-serif font-medium leading-relaxed mb-6">
                        "Bergabunglah dengan 50.000+ pendidik yang telah merevolusi cara mereka mengajar."
                    </p>
                    <div className="flex flex-col items-end">
                        <h3 className="text-3xl font-bold font-serif text-accent">Mulai Langkahmu.</h3>
                        <p className="text-white/80">Revolusi Administrasi Pendidikan</p>
                    </div>
                </div>
            </div>

            {/* Right Side: Form */}
            <div className="flex items-center justify-center p-8 md:p-12 lg:p-20 bg-background relative order-1">
                {/* Mobile Background Texture */}
                <div className="absolute inset-0 lg:hidden -z-10">
                    <Image src="/images/auth-side.png" alt="bg" fill className="object-cover opacity-10" />
                </div>

                <div className="w-full max-w-md space-y-8">
                    <div className="text-center lg:text-left">
                        <Link href="/" className="inline-block mb-8">
                            <span className="font-serif text-3xl font-bold text-primary tracking-tight">
                                KATEDRA<span className="text-accent">.</span>
                            </span>
                        </Link>
                        <h1 className="text-3xl font-bold font-serif text-foreground mb-2">Buat Akun Baru</h1>
                        <p className="text-muted-foreground">Mulai gunakan AI untuk mempermudah administrasi sekolah Anda.</p>
                    </div>

                    <form className="space-y-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-1.5">Nama Lengkap</label>
                                <Input
                                    type="text"
                                    placeholder="Nama Anda"
                                    className="h-12 rounded-xl bg-white/50 border-neutral-200 focus:ring-primary"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-1.5">Nama Sekolah / Institusi</label>
                                <Input
                                    type="text"
                                    placeholder="Contoh: SMAN 1 Jakarta"
                                    className="h-12 rounded-xl bg-white/50 border-neutral-200 focus:ring-primary"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
                                <Input
                                    type="email"
                                    placeholder="nama@sekolah.sch.id"
                                    className="h-12 rounded-xl bg-white/50 border-neutral-200 focus:ring-primary"
                                />
                            </div>
                            <div className="relative">
                                <label className="block text-sm font-medium text-foreground mb-1.5">Password</label>
                                <div className="relative">
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        className="h-12 rounded-xl bg-white/50 border-neutral-200 focus:ring-primary pr-10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                                <p className="text-xs text-muted-foreground mt-1.5">Minimal 8 karakter, kombinasi huruf & angka.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-2">
                            <input type="checkbox" id="terms" className="mt-1 rounded border-gray-300 text-primary focus:ring-primary" />
                            <label
                                htmlFor="terms"
                                className="text-sm text-muted-foreground leading-snug"
                            >
                                Saya setuju dengan <Link href="/syarat-ketentuan" className="font-bold text-primary hover:underline">Syarat & Ketentuan</Link> serta <Link href="/kebijakan-privasi" className="font-bold text-primary hover:underline">Kebijakan Privasi</Link>.
                            </label>
                        </div>

                        <Button className="w-full h-12 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-lg shadow-lg shadow-primary/20 transition-all hover:scale-[1.02]">
                            Buat Akun <ArrowRight size={18} className="ml-2" />
                        </Button>
                    </form>

                    <p className="text-center text-sm text-muted-foreground mt-8">
                        Sudah punya akun?{" "}
                        <Link href="/login" className="font-bold text-primary hover:text-accent transition-colors">
                            Masuk Disini
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
}
