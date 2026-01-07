"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

const links = [
    { name: "Fitur", href: "/fitur" },
    { name: "Showcase", href: "/showcase" },
    { name: "Harga", href: "/harga" },
    { name: "Tentang", href: "/tentang" },
];

import { usePathname } from "next/navigation";

export function Navbar() {
    const pathname = usePathname();
    const isAuthPage = pathname === "/login" || pathname === "/register" || pathname === "/forgot-password";

    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (isAuthPage) return null;

    return (
        <>
            <motion.nav
                initial={{ y: -100, x: "-50%", opacity: 0 }}
                animate={{ y: 0, x: "-50%", opacity: 1 }}
                transition={{ duration: 0.6, ease: "circOut" }}
                className="fixed top-6 left-1/2 z-50 w-full max-w-5xl px-4 pointer-events-none"
            >
                <motion.div
                    animate={{
                        paddingLeft: isScrolled ? 20 : 32,
                        paddingRight: isScrolled ? 20 : 32,
                        paddingTop: isScrolled ? 10 : 16,
                        paddingBottom: isScrolled ? 10 : 16,
                        maxWidth: isScrolled ? "56rem" : "64rem",
                    }}
                    transition={{
                        duration: 0.4,
                        ease: [0.4, 0, 0.2, 1]
                    }}
                    className="pointer-events-auto relative w-full flex items-center justify-between rounded-full bg-white/90 backdrop-blur-xl border border-white/20 shadow-lg shadow-black/5 mx-auto"
                >
                    {/* 1. Logo (Left) */}
                    <Link href="/" className="flex items-center gap-1 shrink-0 z-10 group relative">
                        <motion.span
                            animate={{
                                fontSize: isScrolled ? "1.125rem" : "1.25rem"
                            }}
                            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                            className="font-serif font-bold text-primary tracking-tight group-hover:opacity-80 transition-opacity"
                        >
                            KATEDRA<span className="text-accent">.</span>
                        </motion.span>
                    </Link>

                    {/* 2. Desktop Links (ABSOLUTE CENTER) */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block z-0">
                        <div className="flex items-center gap-1">
                            {links.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={cn(
                                        "font-medium text-muted-foreground hover:text-primary px-4 py-2 rounded-full hover:bg-neutral-100/50 transition-all duration-300",
                                        isScrolled ? "text-xs" : "text-sm"
                                    )}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* 3. CTA (Right) */}
                    <div className="hidden md:flex items-center gap-3 shrink-0 z-10">
                        <Link href="/login" className={cn(
                            "font-medium text-primary hover:text-accent transition-colors",
                            isScrolled ? "text-xs" : "text-sm"
                        )}>
                            Masuk
                        </Link>
                        <Link href="/login">
                            <Button
                                size={isScrolled ? "sm" : "default"}
                                className="rounded-full bg-accent hover:bg-yellow-500 text-primary-dark font-bold px-5 shadow-md shadow-accent/20 transition-all duration-300"
                            >
                                Mulai Gratis
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        onClick={() => setIsMobileOpen(!isMobileOpen)}
                        className="md:hidden flex items-center justify-center p-2 text-primary hover:bg-neutral-100 rounded-full transition-colors z-20"
                    >
                        {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </motion.div>

                {/* Mobile Menu Dropdown */}
                <AnimatePresence>
                    {isMobileOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20, scale: 0.95, filter: "blur(10px)" }}
                            animate={{ opacity: 1, y: 10, scale: 1, filter: "blur(0px)" }}
                            exit={{ opacity: 0, y: -20, scale: 0.95, filter: "blur(10px)" }}
                            transition={{ duration: 0.3, type: "spring", bounce: 0.3 }}
                            className="pointer-events-auto absolute top-full left-0 right-0 mx-2 mt-2 p-3 bg-white/95 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl shadow-black/10 overflow-hidden md:hidden"
                        >
                            <div className="flex flex-col gap-1">
                                {links.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setIsMobileOpen(false)}
                                        className="flex items-center justify-between p-4 rounded-2xl hover:bg-neutral-100/80 text-foreground font-medium transition-all group active:scale-95"
                                    >
                                        <span className="text-lg">{link.name}</span>
                                        <ArrowRight size={18} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-accent" />
                                    </Link>
                                ))}
                                <div className="h-px bg-neutral-100 my-2 mx-2" />
                                <div className="grid grid-cols-2 gap-3 p-2">
                                    <Link href="/login">
                                        <Button variant="outline" className="w-full rounded-xl border-neutral-200 font-semibold h-12">
                                            Masuk
                                        </Button>
                                    </Link>
                                    <Link href="/register">
                                        <Button className="w-full rounded-xl bg-primary text-white font-bold h-12 shadow-lg shadow-primary/20">
                                            Mulai
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>
        </>
    );
}
