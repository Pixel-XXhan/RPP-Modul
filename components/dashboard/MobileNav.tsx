"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    FileText,
    BookOpen,
    ClipboardList,
    User,
    X,
    Plus,
    Target,
    ListTree,
    Library,
} from "lucide-react";

interface MobileNavProps {
    isOpen: boolean;
    onClose: () => void;
}

const mobileNavItems = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Modul Ajar", href: "/dashboard/modul-ajar", icon: BookOpen },
    { label: "RPP", href: "/dashboard/rpp", icon: FileText },
    { label: "ATP", href: "/dashboard/atp", icon: Target },
    { label: "Silabus", href: "/dashboard/silabus", icon: ListTree },
    { label: "Asesmen", href: "/dashboard/asesmen", icon: ClipboardList },
    { label: "Bank Soal", href: "/dashboard/bank-soal", icon: Library },
    { label: "Profil", href: "/dashboard/profile", icon: User },
];

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
    const pathname = usePathname();

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 z-50 lg:hidden"
                        onClick={onClose}
                    />

                    {/* Slide-out Menu */}
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed left-0 top-0 h-full w-72 bg-white z-50 lg:hidden shadow-2xl"
                    >
                        {/* Header */}
                        <div className="h-16 flex items-center justify-between px-4 border-b border-neutral-100">
                            <span className="font-serif text-xl font-bold text-primary tracking-tight">
                                KATEDRA<span className="text-accent">.</span>
                            </span>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-lg hover:bg-neutral-100 text-muted-foreground"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Quick Create */}
                        <div className="p-4">
                            <Link
                                href="/dashboard/modul-ajar/create"
                                onClick={onClose}
                                className="flex items-center justify-center gap-2 w-full py-3 bg-primary text-white font-semibold rounded-xl shadow-lg shadow-primary/20"
                            >
                                <Plus size={18} />
                                Buat Dokumen
                            </Link>
                        </div>

                        {/* Navigation */}
                        <nav className="px-3 py-2">
                            <ul className="space-y-1">
                                {mobileNavItems.map((item, index) => {
                                    const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                                    const Icon = item.icon;
                                    return (
                                        <motion.li
                                            key={item.href}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                        >
                                            <Link
                                                href={item.href}
                                                onClick={onClose}
                                                className={cn(
                                                    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                                                    isActive
                                                        ? "bg-primary/10 text-primary"
                                                        : "text-muted-foreground hover:bg-neutral-100 hover:text-foreground"
                                                )}
                                            >
                                                <Icon size={20} className={isActive ? "text-primary" : ""} />
                                                {item.label}
                                            </Link>
                                        </motion.li>
                                    );
                                })}
                            </ul>
                        </nav>

                        {/* User Info */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-neutral-100">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent-dark font-bold">
                                    A
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-foreground">Arief Fajar</p>
                                    <p className="text-xs text-muted-foreground">arief@sekolah.id</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

// Bottom Tab Bar for Mobile (optional - can be added to layout)
export function MobileBottomNav() {
    const pathname = usePathname();

    const tabs = [
        { label: "Home", href: "/dashboard", icon: LayoutDashboard },
        { label: "Dokumen", href: "/dashboard/modul-ajar", icon: BookOpen },
        { label: "Buat", href: "/dashboard/modul-ajar/create", icon: Plus, isAction: true },
        { label: "Asesmen", href: "/dashboard/asesmen", icon: ClipboardList },
        { label: "Profil", href: "/dashboard/profile", icon: User },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 py-2 px-4 lg:hidden z-40">
            <div className="flex items-center justify-around">
                {tabs.map((tab) => {
                    const isActive = pathname === tab.href || pathname.startsWith(tab.href + "/");
                    const Icon = tab.icon;

                    if (tab.isAction) {
                        return (
                            <Link
                                key={tab.href}
                                href={tab.href}
                                className="flex flex-col items-center justify-center -mt-6"
                            >
                                <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/30">
                                    <Icon size={24} />
                                </div>
                            </Link>
                        );
                    }

                    return (
                        <Link
                            key={tab.href}
                            href={tab.href}
                            className={cn(
                                "flex flex-col items-center gap-1 py-1 px-3",
                                isActive ? "text-primary" : "text-muted-foreground"
                            )}
                        >
                            <Icon size={20} />
                            <span className="text-xs font-medium">{tab.label}</span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
