"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Mail } from "lucide-react";

export default function ForgotPasswordPage() {
    return (
        <main className="min-h-screen grid lg:grid-cols-2">
            {/* Left Side: Visual */}
            <div className="relative hidden lg:block h-full overflow-hidden">
                <Image
                    src="/images/auth-side.png"
                    alt="Katedra Library"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-primary/40 mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            </div>

            {/* Right Side: Form */}
            <div className="flex items-center justify-center p-8 md:p-12 lg:p-20 bg-background relative">

                <div className="w-full max-w-md space-y-8">
                    <Link href="/login" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-4">
                        <ArrowLeft size={16} className="mr-2" />
                        Kembali ke Login
                    </Link>

                    <div className="text-center lg:text-left">
                        <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-6 text-accent-dark">
                            <Mail size={32} />
                        </div>
                        <h1 className="text-3xl font-bold font-serif text-foreground mb-2">Lupa Password?</h1>
                        <p className="text-muted-foreground">Jangan khawatir. Masukkan email Anda dan kami akan mengirimkan instruksi reset password.</p>
                    </div>

                    <form className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-1.5">Email Terdaftar</label>
                            <Input
                                type="email"
                                placeholder="nama@sekolah.sch.id"
                                className="h-12 rounded-xl bg-white/50 border-neutral-200 focus:ring-primary"
                            />
                        </div>

                        <Button className="w-full h-12 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-lg shadow-lg shadow-primary/20 transition-all hover:scale-[1.02]">
                            Kirim Link Reset
                        </Button>
                    </form>
                </div>
            </div>
        </main>
    );
}
