"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Instagram, Phone, ArrowRight, Twitter, Facebook, Linkedin } from "lucide-react";

import { usePathname } from "next/navigation";

export function Footer() {
    const pathname = usePathname();
    const isAuthPage = pathname === "/login" || pathname === "/register" || pathname === "/forgot-password";

    if (isAuthPage) return null;

    return (
        <footer className="bg-[#011c15] text-white pt-24 pb-12 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 xl:gap-20">
                    {/* Column 1: Branding */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-1">
                            <span className="font-serif text-3xl font-bold text-white tracking-tight">KATEDRA</span>
                            <span className="text-3xl text-accent font-bold">.</span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                            Excellence in Education Technology. Platform cerdas untuk pendidik masa depan.
                        </p>
                        <div className="flex gap-4 pt-2">
                            {/* Social Icons with Hover Reveal */}
                            {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-accent hover:text-primary-dark transition-all duration-300 hover:-translate-y-1"
                                >
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h4 className="text-accent font-bold text-xs uppercase tracking-[0.2em] mb-8">
                            Navigasi
                        </h4>
                        <ul className="space-y-4">
                            {['Beranda', 'Fitur', 'Harga', 'Login'].map((link) => (
                                <li key={link}>
                                    <Link href="#" className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm">
                                        <span className="w-0 h-[1px] bg-accent transition-all duration-300 group-hover:w-4" />
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Developer Info */}
                    <div>
                        <h4 className="text-accent font-bold text-xs uppercase tracking-[0.2em] mb-8">
                            Dibangun Oleh
                        </h4>
                        <div className="space-y-4 text-sm text-gray-300">
                            <div className="group">
                                <p className="font-medium text-white group-hover:text-accent transition-colors">Arief Fajar</p>
                                <p className="text-gray-500 text-xs mt-1">Edu-Tech Developer</p>
                            </div>

                            <div className="pt-6 border-t border-white/5">
                                <p className="text-[10px] text-accent/80 uppercase tracking-widest mb-3">Inkubasi</p>
                                <p className="font-medium text-white">SMK Marhas Margahayu</p>
                                <a
                                    href="https://instagram.com/marhasupdate"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 text-gray-400 hover:text-accent text-xs mt-3 transition-colors group"
                                >
                                    <Instagram size={14} className="text-accent group-hover:scale-110 transition-transform" />
                                    @marhasupdate
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Column 4: Support & Newsletter */}
                    <div>
                        <h4 className="text-accent font-bold text-xs uppercase tracking-[0.2em] mb-8">
                            Bantuan
                        </h4>

                        <a
                            href="https://wa.me/628814554581?text=Halo%20Pak%20Arief,%20saya%20ingin%20bertanya%20tentang%20Katedra"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 bg-[#064E3B] text-white px-5 py-3 rounded-xl hover:bg-accent hover:text-primary-dark transition-all duration-300 text-sm font-medium w-full shadow-lg hover:shadow-accent/20 mb-8 border border-white/5"
                        >
                            <Phone size={16} />
                            Hubungi via WhatsApp
                        </a>

                        <div className="space-y-4">
                            <p className="text-xs text-gray-400">Berlangganan Newsletter:</p>
                            <form className="flex gap-2 group relative">
                                <Input
                                    placeholder="Email Anda"
                                    className="bg-transparent border-white/10 text-white text-sm placeholder:text-gray-600 focus-visible:ring-accent focus-visible:border-accent transition-all rounded-lg pl-4 pr-12"
                                />
                                <Button
                                    size="icon"
                                    className="absolute right-1 top-1 w-8 h-8 bg-white/10 text-white hover:bg-accent hover:text-primary-dark transition-colors rounded-md"
                                >
                                    <ArrowRight size={14} />
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/5 mt-20 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-gray-500 font-medium">
                        <p className="tracking-wide">© 2025 Katedra. All Rights Reserved.</p>
                        <div className="flex gap-8">
                            <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-accent transition-colors">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
