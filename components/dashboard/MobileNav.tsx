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
    HelpCircle,
    GraduationCap,
    PenTool,
    Folder,
    Settings,
    Activity,
    Video,
    LayoutTemplate,
    ClipboardCheck,
    LogOut,
    ChevronDown,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";

interface MobileNavProps {
    isOpen: boolean;
    onClose: () => void;
}

interface NavItem {
    label: string;
    href: string;
    icon: React.ElementType;
}

interface NavSection {
    title: string;
    items: NavItem[];
    defaultOpen?: boolean;
}

const mobileNavSections: NavSection[] = [
    {
        title: "Utama",
        defaultOpen: true,
        items: [
            { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        ],
    },
    {
        title: "Dokumen",
        defaultOpen: true,
        items: [
            { label: "Modul Ajar", href: "/dashboard/modul-ajar", icon: BookOpen },
            { label: "RPP", href: "/dashboard/rpp", icon: FileText },
            { label: "ATP", href: "/dashboard/atp", icon: Target },
            { label: "Silabus", href: "/dashboard/silabus", icon: ListTree },
            { label: "LKPD", href: "/dashboard/lkpd", icon: ClipboardCheck },
        ],
    },
    {
        title: "Asesmen",
        defaultOpen: true,
        items: [
            { label: "Asesmen", href: "/dashboard/asesmen", icon: ClipboardList },
            { label: "Bank Soal", href: "/dashboard/bank-soal", icon: Library },
            { label: "Rubrik", href: "/dashboard/rubrik", icon: PenTool },
            { label: "Kisi-Kisi", href: "/dashboard/kisi-kisi", icon: Folder },
        ],
    },
    {
        title: "Kurikulum",
        defaultOpen: false,
        items: [
            { label: "Capaian Pembelajaran", href: "/dashboard/capaian-pembelajaran", icon: GraduationCap },
            { label: "Tujuan Pembelajaran", href: "/dashboard/tujuan-pembelajaran", icon: Target },
            { label: "Materi", href: "/dashboard/materi", icon: BookOpen },
            { label: "Kegiatan", href: "/dashboard/kegiatan", icon: Activity },
        ],
    },
    {
        title: "Resources",
        defaultOpen: false,
        items: [
            { label: "Rekomendasi Media AI", href: "/dashboard/media", icon: Video },
            { label: "Templates", href: "/dashboard/templates", icon: LayoutTemplate },
        ],
    },
];

const bottomNavItems: NavItem[] = [
    { label: "Pengaturan", href: "/dashboard/settings", icon: Settings },
    { label: "Bantuan", href: "/dashboard/bantuan", icon: HelpCircle },
    { label: "Profil", href: "/dashboard/profile", icon: User },
];

function MobileNavSection({
    section,
    pathname,
    onClose,
}: {
    section: NavSection;
    pathname: string;
    onClose: () => void;
}) {
    const [isOpen, setIsOpen] = useState(section.defaultOpen ?? true);
    const hasActiveItem = section.items.some(item =>
        pathname === item.href || pathname.startsWith(item.href + "/")
    );

    return (
        <div className="mb-2">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "w-full flex items-center justify-between px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors rounded-lg",
                    hasActiveItem ? "text-primary" : "text-muted-foreground/60"
                )}
            >
                {section.title}
                <motion.div
                    animate={{ rotate: isOpen ? 0 : -90 }}
                    transition={{ duration: 0.2 }}
                >
                    <ChevronDown size={14} />
                </motion.div>
            </button>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-0.5 overflow-hidden"
                    >
                        {section.items.map((item) => {
                            const Icon = item.icon;
                            const isActive = item.href === "/dashboard"
                                ? pathname === "/dashboard"
                                : pathname === item.href || pathname.startsWith(item.href + "/");
                            return (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        onClick={onClose}
                                        className={cn(
                                            "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all",
                                            isActive
                                                ? "bg-primary text-primary-foreground shadow-md"
                                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                        )}
                                    >
                                        <Icon size={18} />
                                        {item.label}
                                    </Link>
                                </li>
                            );
                        })}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
    const pathname = usePathname();
    const { user, signOut } = useAuth();
    const { profile, fetchProfile } = useProfile();

    useEffect(() => {
        if (isOpen) {
            fetchProfile();
        }
    }, [isOpen, fetchProfile]);

    const userName = profile?.nama || user?.email?.split('@')[0] || 'Pengguna';
    const userEmail = user?.email || 'user@sekolah.id';
    const userInitial = userName.charAt(0).toUpperCase();

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
                        className="fixed left-0 top-0 h-full w-80 bg-card z-50 lg:hidden shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="h-16 flex items-center justify-between px-4 border-b border-border shrink-0">
                            <span className="font-serif text-xl font-bold text-primary tracking-tight">
                                KATEDRA<span className="text-accent">.</span>
                            </span>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-lg hover:bg-muted text-muted-foreground"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Quick Create */}
                        <div className="p-4 shrink-0">
                            <Link
                                href="/dashboard/modul-ajar/create"
                                onClick={onClose}
                                className="flex items-center justify-center gap-2 w-full py-3 bg-primary text-white font-semibold rounded-xl shadow-lg shadow-primary/20"
                            >
                                <Plus size={18} />
                                Buat Dokumen
                            </Link>
                        </div>

                        {/* Navigation - Scrollable */}
                        <nav className="flex-1 overflow-y-auto px-3 py-2">
                            {mobileNavSections.map((section) => (
                                <MobileNavSection
                                    key={section.title}
                                    section={section}
                                    pathname={pathname}
                                    onClose={onClose}
                                />
                            ))}
                        </nav>

                        {/* Bottom Items */}
                        <div className="border-t border-border px-3 py-2 shrink-0">
                            {bottomNavItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={onClose}
                                        className={cn(
                                            "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all",
                                            isActive
                                                ? "bg-primary/10 text-primary"
                                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                        )}
                                    >
                                        <Icon size={18} />
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </div>

                        {/* User Info */}
                        <div className="border-t border-border p-4 shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
                                    {userInitial}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-foreground truncate">{userName}</p>
                                    <p className="text-xs text-muted-foreground truncate">{userEmail}</p>
                                </div>
                                <button
                                    onClick={() => {
                                        onClose();
                                        signOut();
                                    }}
                                    className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-muted-foreground hover:text-red-500 transition-colors"
                                >
                                    <LogOut size={16} />
                                </button>
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
        <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border py-2 px-4 lg:hidden z-40">
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
