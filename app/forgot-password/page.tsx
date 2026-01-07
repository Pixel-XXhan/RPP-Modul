"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Loader2, CheckCircle, Mail } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function ForgotPasswordPage() {
    const { resetPassword } = useAuth();
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        const { error } = await resetPassword(email);

        if (error) {
            setError(error.message || "Gagal mengirim email reset password.");
        } else {
            setSuccess(true);
        }

        setIsLoading(false);
    };

    if (success) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-background p-8">
                <div className="max-w-md text-center space-y-6">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                        <Mail className="w-10 h-10 text-green-600" />
                    </div>
                    <h1 className="text-2xl font-bold font-serif">Email Terkirim!</h1>
                    <p className="text-muted-foreground">
                        Kami telah mengirimkan link reset password ke <strong>{email}</strong>.
                        Silakan cek inbox atau folder spam Anda.
                    </p>
                    <div className="space-y-3">
                        <Button onClick={() => window.location.href = "/login"} className="w-full h-12 rounded-xl">
                            Kembali ke Login
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => setSuccess(false)}
                            className="w-full h-12 rounded-xl"
                        >
                            Kirim Ulang
                        </Button>
                    </div>
                </div>
            </main>
        );
    }

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

                <div className="absolute top-8 left-8 z-20">
                    <Link href="/login" className="inline-flex items-center text-white/80 hover:text-white transition-colors gap-2 font-medium bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 hover:bg-black/30">
                        <ArrowRight className="rotate-180" size={16} />
                        Kembali ke Login
                    </Link>
                </div>

                <div className="absolute bottom-20 left-12 right-12 text-white z-10">
                    <h3 className="text-3xl font-bold font-serif mb-4">Lupa Password?</h3>
                    <p className="text-lg text-white/80">
                        Jangan khawatir, kami akan membantu Anda mendapatkan kembali akses ke akun Anda dengan mudah.
                    </p>
                </div>
            </div>

            {/* Right Side: Form */}
            <div className="flex items-center justify-center p-8 md:p-12 lg:p-20 bg-background relative">
                <div className="absolute inset-0 lg:hidden -z-10">
                    <Image src="/images/auth-side.png" alt="bg" fill className="object-cover opacity-10" />
                </div>

                <div className="absolute top-6 left-6 lg:hidden">
                    <Link href="/login" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors gap-2 font-medium">
                        <ArrowRight className="rotate-180" size={16} />
                        Login
                    </Link>
                </div>

                <div className="w-full max-w-md space-y-8">
                    <div className="text-center lg:text-left">
                        <Link href="/" className="inline-block mb-8">
                            <span className="font-serif text-3xl font-bold text-primary tracking-tight">
                                KATEDRA<span className="text-accent">.</span>
                            </span>
                        </Link>
                        <h1 className="text-3xl font-bold font-serif text-foreground mb-2">Reset Password</h1>
                        <p className="text-muted-foreground">
                            Masukkan email yang terdaftar dan kami akan mengirimkan link untuk mereset password Anda.
                        </p>
                    </div>

                    {error && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
                            <p className="text-sm text-red-800">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
                            <Input
                                type="email"
                                placeholder="nama@sekolah.sch.id"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="h-12 rounded-xl bg-white/50 border-neutral-200 focus:ring-primary"
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-12 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-lg shadow-lg shadow-primary/20 transition-all hover:scale-[1.02]"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 size={18} className="mr-2 animate-spin" />
                                    Mengirim...
                                </>
                            ) : (
                                <>
                                    Kirim Link Reset <ArrowRight size={18} className="ml-2" />
                                </>
                            )}
                        </Button>
                    </form>

                    <p className="text-center text-sm text-muted-foreground">
                        Ingat password Anda?{" "}
                        <Link href="/login" className="font-bold text-primary hover:text-accent transition-colors">
                            Masuk Sekarang
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
}
