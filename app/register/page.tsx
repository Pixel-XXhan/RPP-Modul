"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, ArrowRight, Loader2, CheckCircle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function RegisterPage() {
    const router = useRouter();
    const { signUp, signInWithGoogle, signInWithFacebook } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const [formData, setFormData] = useState({
        namaLengkap: "",
        institusi: "",
        email: "",
        password: "",
        agreeTerms: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!formData.agreeTerms) {
            setError("Anda harus menyetujui Syarat & Ketentuan");
            return;
        }

        if (formData.password.length < 8) {
            setError("Password minimal 8 karakter");
            return;
        }

        setIsLoading(true);

        const { error } = await signUp(formData.email, formData.password, {
            nama_lengkap: formData.namaLengkap,
            institusi: formData.institusi,
        });

        if (error) {
            setError(error.message || "Registrasi gagal. Coba lagi.");
            setIsLoading(false);
        } else {
            setSuccess(true);
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        await signInWithGoogle();
    };

    const handleFacebookLogin = async () => {
        await signInWithFacebook();
    };

    if (success) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-background p-8">
                <div className="max-w-md text-center space-y-6">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>
                    <h1 className="text-2xl font-bold font-serif">Registrasi Berhasil!</h1>
                    <p className="text-muted-foreground">
                        Kami telah mengirimkan email konfirmasi ke <strong>{formData.email}</strong>.
                        Silakan cek inbox atau folder spam Anda.
                    </p>
                    <Button onClick={() => router.push("/login")} className="w-full h-12 rounded-xl">
                        Kembali ke Login
                    </Button>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen grid lg:grid-cols-2">
            {/* Left Side: Visual */}
            <div className="relative hidden lg:block h-full overflow-hidden order-2">
                <Image
                    src="/images/auth-side.png"
                    alt="Katedra Library"
                    fill
                    className="object-cover scale-x-[-1]"
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

                    {error && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
                            <p className="text-sm text-red-800">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-1.5">Nama Lengkap</label>
                                <Input
                                    type="text"
                                    name="namaLengkap"
                                    value={formData.namaLengkap}
                                    onChange={handleChange}
                                    placeholder="Nama Anda"
                                    required
                                    className="h-12 rounded-xl bg-white/50 border-neutral-200 focus:ring-primary"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-1.5">Nama Sekolah / Institusi</label>
                                <Input
                                    type="text"
                                    name="institusi"
                                    value={formData.institusi}
                                    onChange={handleChange}
                                    placeholder="Contoh: SMAN 1 Jakarta"
                                    className="h-12 rounded-xl bg-white/50 border-neutral-200 focus:ring-primary"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
                                <Input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="nama@sekolah.sch.id"
                                    required
                                    className="h-12 rounded-xl bg-white/50 border-neutral-200 focus:ring-primary"
                                />
                            </div>
                            <div className="relative">
                                <label className="block text-sm font-medium text-foreground mb-1.5">Password</label>
                                <div className="relative">
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        required
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
                                <p className="text-xs text-muted-foreground mt-1.5">Minimal 8 karakter.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-2">
                            <input
                                type="checkbox"
                                id="terms"
                                name="agreeTerms"
                                checked={formData.agreeTerms}
                                onChange={handleChange}
                                className="mt-1 rounded border-gray-300 text-primary focus:ring-primary"
                            />
                            <label
                                htmlFor="terms"
                                className="text-sm text-muted-foreground leading-snug"
                            >
                                Saya setuju dengan <Link href="/syarat-ketentuan" className="font-bold text-primary hover:underline">Syarat & Ketentuan</Link> serta <Link href="/kebijakan-privasi" className="font-bold text-primary hover:underline">Kebijakan Privasi</Link>.
                            </label>
                        </div>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-12 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-lg shadow-lg shadow-primary/20 transition-all hover:scale-[1.02]"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 size={18} className="mr-2 animate-spin" />
                                    Membuat Akun...
                                </>
                            ) : (
                                <>
                                    Buat Akun <ArrowRight size={18} className="ml-2" />
                                </>
                            )}
                        </Button>
                    </form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-neutral-200" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground font-medium tracking-wider">Atau daftar dengan</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleGoogleLogin}
                            className="h-12 rounded-xl border-neutral-200 hover:bg-neutral-50 font-semibold text-foreground"
                        >
                            <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            Google
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleFacebookLogin}
                            className="h-12 rounded-xl border-neutral-200 hover:bg-neutral-50 font-semibold text-foreground"
                        >
                            <svg className="mr-2 h-5 w-5 text-[#1877F2] fill-current" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.79-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                            Facebook
                        </Button>
                    </div>

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
