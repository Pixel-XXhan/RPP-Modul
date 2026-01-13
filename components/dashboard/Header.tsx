"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
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
    Command,
    X,
    CheckCircle2,
    FileText,
    Sparkles,
} from "lucide-react";
import { LogoutConfirmDialog } from "./LogoutConfirmDialog";

interface DashboardHeaderProps {
    onMobileMenuToggle?: () => void;
}

interface Notification {
    id: string;
    title: string;
    description: string;
    time: string;
    type: 'success' | 'info' | 'warning';
    read: boolean;
}

export function DashboardHeader({ onMobileMenuToggle }: DashboardHeaderProps) {
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showLogoutDialog, setShowLogoutDialog] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [searchFocused, setSearchFocused] = useState(false);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const pathname = usePathname();
    const { theme, setTheme } = useTheme();
    const { user } = useAuth();
    const { profile, fetchProfile } = useProfile();

    useEffect(() => {
        setMounted(true);
        fetchProfile();
    }, [fetchProfile]);

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

    // Add notification when document is generated (called from outside)
    const addNotification = (title: string, description: string, type: 'success' | 'info' | 'warning' = 'success') => {
        const newNotification: Notification = {
            id: Date.now().toString(),
            title,
            description,
            time: 'Baru saja',
            type,
            read: false,
        };
        setNotifications(prev => [newNotification, ...prev].slice(0, 10));
    };

    // Expose addNotification globally for other components to use
    useEffect(() => {
        (window as any).addNotification = addNotification;
        return () => {
            delete (window as any).addNotification;
        };
    }, []);

    const unreadCount = notifications.filter(n => !n.read).length;

    const markAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const getNotificationIcon = (type: string) => {
        switch (type) {
            case 'success': return <CheckCircle2 size={16} className="text-emerald-500" />;
            case 'info': return <FileText size={16} className="text-blue-500" />;
            case 'warning': return <Sparkles size={16} className="text-amber-500" />;
            default: return <Bell size={16} />;
        }
    };

    return (
        <>
            <header className="h-16 bg-card/80 backdrop-blur-xl border-b border-border/50 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-40 relative">
                {/* Gradient accent bar at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-emerald-500 to-primary opacity-60" />

                {/* Left: Mobile Menu + Breadcrumb */}
                <div className="flex items-center gap-4">
                    {/* Mobile Menu Button */}
                    <button
                        onClick={onMobileMenuToggle}
                        className="lg:hidden p-2 rounded-xl hover:bg-muted/80 text-muted-foreground transition-all duration-200 active:scale-95"
                    >
                        <Menu size={20} />
                    </button>

                    {/* Breadcrumb */}
                    <nav className="hidden md:flex items-center gap-2 text-sm">
                        {breadcrumbs.map((crumb, index) => (
                            <div key={crumb.href} className="flex items-center gap-2">
                                {index > 0 && <span className="text-muted-foreground/40">/</span>}
                                {index === breadcrumbs.length - 1 ? (
                                    <span className="font-semibold text-foreground bg-primary/10 px-2.5 py-1 rounded-lg">{crumb.label}</span>
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
                    {/* Search Bar - Modern Pill Style */}
                    <div className={`hidden md:flex items-center gap-2 rounded-full px-4 py-2 w-64 transition-all duration-300 ${searchFocused
                            ? 'bg-background ring-2 ring-primary/30 shadow-lg shadow-primary/10'
                            : 'bg-muted/60 hover:bg-muted'
                        }`}>
                        <Search size={16} className={`transition-colors ${searchFocused ? 'text-primary' : 'text-muted-foreground'}`} />
                        <input
                            type="text"
                            placeholder="Cari dokumen..."
                            className="bg-transparent border-none outline-none text-sm w-full placeholder:text-muted-foreground text-foreground"
                            onFocus={() => setSearchFocused(true)}
                            onBlur={() => setSearchFocused(false)}
                        />
                        <kbd className="hidden lg:inline-flex h-5 select-none items-center gap-1 rounded-md border border-border bg-background/80 px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                            <Command size={10} />K
                        </kbd>
                    </div>

                    {/* Mobile Search */}
                    <button className="md:hidden p-2.5 rounded-xl hover:bg-muted/80 text-muted-foreground transition-all">
                        <Search size={20} />
                    </button>

                    {/* Theme Toggle - Pill Button */}
                    {mounted && (
                        <button
                            onClick={cycleTheme}
                            className="p-2.5 rounded-xl hover:bg-muted/80 text-muted-foreground transition-all duration-200 hover:text-foreground active:scale-95"
                            title={`Current: ${theme}`}
                        >
                            <ThemeIcon size={20} />
                        </button>
                    )}

                    {/* Notifications */}
                    <div className="relative">
                        <button
                            onClick={() => setShowNotifications(!showNotifications)}
                            className="p-2.5 rounded-xl hover:bg-muted/80 text-muted-foreground relative transition-all duration-200 hover:text-foreground active:scale-95"
                        >
                            <Bell size={20} />
                            {unreadCount > 0 && (
                                <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-[10px] font-bold text-primary-foreground rounded-full flex items-center justify-center animate-pulse">
                                    {unreadCount > 9 ? '9+' : unreadCount}
                                </span>
                            )}
                        </button>

                        {showNotifications && (
                            <div className="absolute right-0 top-14 w-80 bg-card/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-border/50 overflow-hidden z-50 animate-in slide-in-from-top-2 duration-200">
                                <div className="p-4 border-b border-border/50 flex items-center justify-between">
                                    <h3 className="font-bold text-foreground">Notifikasi</h3>
                                    {unreadCount > 0 && (
                                        <button
                                            onClick={markAllAsRead}
                                            className="text-xs text-primary hover:underline"
                                        >
                                            Tandai semua dibaca
                                        </button>
                                    )}
                                </div>
                                <div className="max-h-80 overflow-y-auto">
                                    {notifications.length === 0 ? (
                                        <div className="p-8 text-center text-muted-foreground">
                                            <Bell size={32} className="mx-auto mb-2 opacity-30" />
                                            <p className="text-sm">Belum ada notifikasi</p>
                                        </div>
                                    ) : (
                                        <div className="p-2 space-y-1">
                                            {notifications.map(notif => (
                                                <div
                                                    key={notif.id}
                                                    className={`flex gap-3 p-3 rounded-xl hover:bg-muted/60 cursor-pointer transition-colors ${!notif.read ? 'bg-primary/5' : ''
                                                        }`}
                                                >
                                                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                                                        {getNotificationIcon(notif.type)}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium text-foreground truncate">{notif.title}</p>
                                                        <p className="text-xs text-muted-foreground truncate">{notif.description}</p>
                                                        <p className="text-xs text-muted-foreground/60 mt-0.5">{notif.time}</p>
                                                    </div>
                                                    {!notif.read && (
                                                        <div className="w-2 h-2 bg-primary rounded-full shrink-0 mt-2" />
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className="p-3 border-t border-border/50">
                                    <button
                                        onClick={() => setShowNotifications(false)}
                                        className="text-sm text-muted-foreground hover:text-foreground font-medium block text-center w-full transition-colors"
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
                            className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-muted/80 transition-all duration-200 active:scale-98"
                        >
                            {user?.user_metadata?.avatar_url ? (
                                <img
                                    src={user.user_metadata.avatar_url}
                                    alt="Profile"
                                    className="w-8 h-8 rounded-full object-cover ring-2 ring-primary/20"
                                />
                            ) : (
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-emerald-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-primary/20">
                                    {(profile?.nama || user?.email || 'P').charAt(0).toUpperCase()}
                                </div>
                            )}
                            <ChevronDown size={14} className="text-muted-foreground hidden md:block" />
                        </button>

                        {showUserMenu && (
                            <div className="absolute right-0 top-14 w-56 bg-card/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-border/50 overflow-hidden z-50 animate-in slide-in-from-top-2 duration-200">
                                <div className="p-4 border-b border-border/50 bg-gradient-to-r from-primary/5 to-emerald-500/5">
                                    <p className="font-bold text-foreground">{profile?.nama || user?.email?.split('@')[0] || 'Pengguna'}</p>
                                    <p className="text-xs text-muted-foreground truncate">{user?.email || 'user@sekolah.id'}</p>
                                </div>
                                <div className="p-2">
                                    <Link
                                        href="/dashboard/profile"
                                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-muted/60 text-sm text-foreground transition-colors"
                                    >
                                        <User size={16} className="text-muted-foreground" />
                                        Profil Saya
                                    </Link>
                                    <Link
                                        href="/dashboard/settings"
                                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-muted/60 text-sm text-foreground transition-colors"
                                    >
                                        <Settings size={16} className="text-muted-foreground" />
                                        Pengaturan
                                    </Link>
                                    <Link
                                        href="/dashboard/bantuan"
                                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-muted/60 text-sm text-foreground transition-colors"
                                    >
                                        <HelpCircle size={16} className="text-muted-foreground" />
                                        Bantuan
                                    </Link>
                                </div>
                                <div className="p-2 border-t border-border/50">
                                    <button
                                        onClick={() => {
                                            setShowUserMenu(false);
                                            setShowLogoutDialog(true);
                                        }}
                                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-destructive/10 text-sm text-destructive w-full transition-colors"
                                    >
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

            <LogoutConfirmDialog
                open={showLogoutDialog}
                onOpenChange={setShowLogoutDialog}
            />
        </>
    );
}
