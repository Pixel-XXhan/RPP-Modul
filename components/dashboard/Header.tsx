"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
    Search,
    Bell,
    User,
    ChevronDown,
    LogOut,
    Settings,
    HelpCircle,
    Menu,
    Moon,
    Sun,
    Monitor,
} from "lucide-react";

interface DashboardHeaderProps {
    onMobileMenuToggle?: () => void;
}

export function DashboardHeader({ onMobileMenuToggle }: DashboardHeaderProps) {
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [mounted, setMounted] = useState(false);
    const pathname = usePathname();
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    // Generate breadcrumb from pathname
    const pathSegments = pathname.split("/").filter(Boolean);
    const breadcrumbs = pathSegments.map((segment, index) => {
        const href = "/" + pathSegments.slice(0, index + 1).join("/");
        const label = segment
            .split("-")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
        return { label, href };
    });

    const cycleTheme = () => {
        if (theme === "light") setTheme("dark");
        else if (theme === "dark") setTheme("system");
        else setTheme("light");
    };

    const ThemeIcon = theme === "dark" ? Moon : theme === "light" ? Sun : Monitor;

    return (
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 lg:px-6 sticky top-0 z-40">
            {/* Left: Mobile Menu + Breadcrumb */}
            <div className="flex items-center gap-4">
                {/* Mobile Menu Button */}
                <button
                    onClick={onMobileMenuToggle}
                    className="lg:hidden p-2 rounded-lg hover:bg-muted text-muted-foreground"
                >
                    <Menu size={20} />
                </button>

                {/* Breadcrumb */}
                <nav className="hidden md:flex items-center gap-2 text-sm">
                    {breadcrumbs.map((crumb, index) => (
                        <div key={crumb.href} className="flex items-center gap-2">
                            {index > 0 && <span className="text-muted-foreground/40">/</span>}
                            {index === breadcrumbs.length - 1 ? (
                                <span className="font-semibold text-foreground">{crumb.label}</span>
                            ) : (
                                <Link
                                    href={crumb.href}
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {crumb.label}
                                </Link>
                            )}
                        </div>
                    ))}
                </nav>
            </div>

            {/* Right: Search + Theme + Notifications + User */}
            <div className="flex items-center gap-2">
                {/* Search Bar */}
                <div className="hidden md:flex items-center gap-2 bg-muted rounded-xl px-4 py-2 w-64">
                    <Search size={16} className="text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Cari dokumen..."
                        className="bg-transparent border-none outline-none text-sm w-full placeholder:text-muted-foreground text-foreground"
                    />
                    <kbd className="hidden lg:inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-background px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                        ⌘K
                    </kbd>
                </div>

                {/* Mobile Search */}
                <button className="md:hidden p-2 rounded-lg hover:bg-muted text-muted-foreground">
                    <Search size={20} />
                </button>

                {/* Theme Toggle */}
                {mounted && (
                    <button
                        onClick={cycleTheme}
                        className="p-2 rounded-lg hover:bg-muted text-muted-foreground transition-colors"
                        title={`Current: ${theme}`}
                    >
                        <ThemeIcon size={20} />
                    </button>
                )}

                {/* Notifications */}
                <div className="relative">
                    <button
                        onClick={() => setShowNotifications(!showNotifications)}
                        className="p-2 rounded-lg hover:bg-muted text-muted-foreground relative"
                    >
                        <Bell size={20} />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
                    </button>

                    {showNotifications && (
                        <div className="absolute right-0 top-12 w-80 bg-card rounded-2xl shadow-2xl border border-border overflow-hidden z-50">
                            <div className="p-4 border-b border-border">
                                <h3 className="font-bold text-foreground">Notifikasi</h3>
                            </div>
                            <div className="p-4 space-y-3 max-h-80 overflow-y-auto">
                                <div className="flex gap-3 p-3 rounded-xl hover:bg-muted cursor-pointer">
                                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                                        ✓
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-foreground">Modul Ajar berhasil dibuat</p>
                                        <p className="text-xs text-muted-foreground">2 menit yang lalu</p>
                                    </div>
                                </div>
                                <div className="flex gap-3 p-3 rounded-xl hover:bg-muted cursor-pointer">
                                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500 shrink-0">
                                        📄
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-foreground">RPP siap untuk diunduh</p>
                                        <p className="text-xs text-muted-foreground">1 jam yang lalu</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-3 border-t border-border">
                                <button
                                    onClick={() => setShowNotifications(false)}
                                    className="text-sm text-primary font-semibold hover:underline block text-center w-full"
                                >
                                    Tutup
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* User Menu */}
                <div className="relative">
                    <button
                        onClick={() => setShowUserMenu(!showUserMenu)}
                        className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-muted transition-colors"
                    >
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                            A
                        </div>
                        <ChevronDown size={14} className="text-muted-foreground hidden md:block" />
                    </button>

                    {showUserMenu && (
                        <div className="absolute right-0 top-12 w-56 bg-card rounded-2xl shadow-2xl border border-border overflow-hidden z-50">
                            <div className="p-4 border-b border-border">
                                <p className="font-bold text-foreground">Arief Fajar</p>
                                <p className="text-xs text-muted-foreground">arief@sekolah.id</p>
                            </div>
                            <div className="p-2">
                                <Link
                                    href="/dashboard/profile"
                                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted text-sm text-foreground"
                                >
                                    <User size={16} />
                                    Profil Saya
                                </Link>
                                <Link
                                    href="/dashboard/settings"
                                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted text-sm text-foreground"
                                >
                                    <Settings size={16} />
                                    Pengaturan
                                </Link>
                                <Link
                                    href="/dashboard/bantuan"
                                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted text-sm text-foreground"
                                >
                                    <HelpCircle size={16} />
                                    Bantuan
                                </Link>
                            </div>
                            <div className="p-2 border-t border-border">
                                <button className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-destructive/10 text-sm text-destructive w-full">
                                    <LogOut size={16} />
                                    Keluar
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Click outside to close */}
            {(showUserMenu || showNotifications) && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => {
                        setShowUserMenu(false);
                        setShowNotifications(false);
                    }}
                />
            )}
        </header>
    );
}
