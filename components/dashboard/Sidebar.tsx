"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    LayoutDashboard,
    FileText,
    BookOpen,
    Target,
    ListTree,
    ClipboardList,
    HelpCircle,
    Library,
    GraduationCap,
    PenTool,
    Folder,
    Settings,
    ChevronLeft,
    ChevronRight,
    Plus,
    Calendar,
    BarChart3,
    Video,
    Users,
    FileStack,
    Activity,
    ClipboardCheck,
    LayoutTemplate,
    LogOut,
    ChevronDown,
} from "lucide-react";

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

const navigation: NavSection[] = [
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
];

// Collapsible Section Component
function NavSectionComponent({
    section,
    isCollapsed,
    pathname
}: {
    section: NavSection;
    isCollapsed: boolean;
    pathname: string;
}) {
    const [isOpen, setIsOpen] = useState(section.defaultOpen ?? true);
    const hasActiveItem = section.items.some(item =>
        pathname === item.href || pathname.startsWith(item.href + "/")
    );

    return (
        <div className="mb-2">
            {!isCollapsed && (
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={cn(
                        "w-full flex items-center justify-between px-3 py-2 text-xs font-bold uppercase tracking-widest transition-colors rounded-lg",
                        hasActiveItem ? "text-primary" : "text-muted-foreground/60 hover:text-muted-foreground"
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
            )}

            <AnimatePresence initial={false}>
                {(isOpen || isCollapsed) && (
                    <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="space-y-0.5 overflow-hidden"
                    >
                        {section.items.map((item) => {
                            const Icon = item.icon;
                            // Fix: Dashboard should only be active on exact match
                            const isActive = item.href === "/dashboard"
                                ? pathname === "/dashboard"
                                : pathname === item.href || pathname.startsWith(item.href + "/");
                            return (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className={cn(
                                            "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative",
                                            isActive
                                                ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                                                : "text-muted-foreground hover:bg-muted hover:text-foreground",
                                            isCollapsed && "justify-center px-0"
                                        )}
                                        title={isCollapsed ? item.label : undefined}
                                    >
                                        <Icon size={20} className={cn(
                                            "transition-transform duration-200 group-hover:scale-110",
                                            isActive ? "text-primary-foreground" : ""
                                        )} />
                                        {!isCollapsed && (
                                            <motion.span
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                {item.label}
                                            </motion.span>
                                        )}
                                        {isActive && !isCollapsed && (
                                            <motion.div
                                                layoutId="activeIndicator"
                                                className="absolute right-3 w-1.5 h-1.5 rounded-full bg-white"
                                            />
                                        )}
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

export function DashboardSidebar() {
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <motion.aside
            initial={false}
            animate={{ width: isCollapsed ? 80 : 280 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="hidden lg:flex flex-col h-screen bg-card border-r border-border sticky top-0 z-40"
        >
            {/* Logo */}
            <div className="h-16 flex items-center justify-between px-4 border-b border-border shrink-0">
                <Link href="/dashboard" className="flex items-center gap-2 overflow-hidden">
                    <AnimatePresence mode="wait">
                        {!isCollapsed ? (
                            <motion.span
                                key="full-logo"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.2 }}
                                className="font-serif text-xl font-bold text-primary tracking-tight whitespace-nowrap"
                            >
                                KATEDRA<span className="text-accent">.</span>
                            </motion.span>
                        ) : (
                            <motion.span
                                key="mini-logo"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                transition={{ duration: 0.2 }}
                                className="font-serif text-xl font-bold text-primary"
                            >
                                K
                            </motion.span>
                        )}
                    </AnimatePresence>
                </Link>
                <motion.button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 rounded-lg hover:bg-muted text-muted-foreground transition-colors"
                >
                    <motion.div
                        animate={{ rotate: isCollapsed ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ChevronLeft size={18} />
                    </motion.div>
                </motion.button>
            </div>

            {/* Quick Create Button */}
            <div className="p-4 shrink-0">
                <Link href="/dashboard/modul-ajar/create">
                    <Button
                        className={cn(
                            "w-full bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary text-white font-semibold rounded-xl shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30",
                            isCollapsed ? "px-0 justify-center" : ""
                        )}
                    >
                        <Plus size={18} className={isCollapsed ? "" : "mr-2"} />
                        {!isCollapsed && "Buat Dokumen"}
                    </Button>
                </Link>
            </div>

            {/* Navigation - SCROLLABLE */}
            <nav className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-2 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent hover:scrollbar-thumb-muted-foreground/30">
                {navigation.map((section) => (
                    <NavSectionComponent
                        key={section.title}
                        section={section}
                        isCollapsed={isCollapsed}
                        pathname={pathname}
                    />
                ))}
            </nav>

            {/* Bottom Items */}
            <div className="border-t border-border px-3 py-4 space-y-1 shrink-0">
                {bottomNavItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                                isActive
                                    ? "bg-primary/10 text-primary"
                                    : "text-muted-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-foreground",
                                isCollapsed && "justify-center px-0"
                            )}
                            title={isCollapsed ? item.label : undefined}
                        >
                            <Icon size={20} />
                            {!isCollapsed && item.label}
                        </Link>
                    );
                })}
            </div>

            {/* User Profile / Logout - Dynamic from hooks */}
            <UserProfileSection isCollapsed={isCollapsed} />
        </motion.aside>
    );
}

// Separate component to use hooks
function UserProfileSection({ isCollapsed }: { isCollapsed: boolean }) {
    const { user, signOut } = useAuth();
    const { profile, fetchProfile } = useProfile();

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    const userName = profile?.nama || user?.email?.split('@')[0] || 'Pengguna';
    const userEmail = user?.email || 'user@sekolah.id';
    const userInitial = userName.charAt(0).toUpperCase();

    return (
        <div className="border-t border-neutral-100 dark:border-neutral-800 p-4 shrink-0">
            <div className={cn(
                "flex items-center gap-3",
                isCollapsed && "justify-center"
            )}>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold shadow-md">
                    {userInitial}
                </div>
                {!isCollapsed && (
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex-1 min-w-0"
                    >
                        <p className="text-sm font-semibold text-foreground truncate">{userName}</p>
                        <p className="text-xs text-muted-foreground truncate">{userEmail}</p>
                    </motion.div>
                )}
                {!isCollapsed && (
                    <motion.button
                        onClick={() => signOut()}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-muted-foreground hover:text-red-500 transition-colors"
                        title="Keluar"
                    >
                        <LogOut size={16} />
                    </motion.button>
                )}
            </div>
        </div>
    );
}
