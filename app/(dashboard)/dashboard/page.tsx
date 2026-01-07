"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
    BookOpen,
    FileText,
    Target,
    ListTree,
    ClipboardList,
    Library,
    Plus,
    ArrowRight,
    TrendingUp,
    Calendar,
    Clock,
    Sparkles,
    Loader2,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { api } from "@/lib/api";

// Stat Card Component
function StatCard({ label, value, icon: Icon, trend, color, loading }: {
    label: string;
    value: string;
    icon: React.ElementType;
    trend?: string;
    color: string;
    loading?: boolean;
}) {
    return (
        <div className="bg-card rounded-2xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center`}>
                    <Icon size={24} className="text-white" />
                </div>
                {trend && (
                    <span className="text-xs font-semibold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full flex items-center gap-1">
                        <TrendingUp size={12} /> {trend}
                    </span>
                )}
            </div>
            {loading ? (
                <div className="h-9 w-16 bg-muted animate-pulse rounded" />
            ) : (
                <p className="text-3xl font-bold text-foreground font-serif">{value}</p>
            )}
            <p className="text-sm text-muted-foreground mt-1">{label}</p>
        </div>
    );
}

// Quick Action Card
function QuickAction({ label, description, href, icon: Icon, color }: {
    label: string;
    description: string;
    href: string;
    icon: React.ElementType;
    color: string;
}) {
    return (
        <Link href={href}>
            <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-card rounded-2xl p-5 border border-border shadow-sm hover:shadow-lg hover:border-primary/30 transition-all cursor-pointer group h-full"
            >
                <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center mb-3`}>
                    <Icon size={20} className="text-white" />
                </div>
                <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">{label}</h3>
                <p className="text-sm text-muted-foreground mt-1">{description}</p>
            </motion.div>
        </Link>
    );
}

// Recent Activity Item
function ActivityItem({ title, type, time, status }: {
    title: string;
    type: string;
    time: string;
    status: "created" | "updated" | "exported";
}) {
    const statusConfig = {
        created: { bg: "bg-emerald-500/10", text: "text-emerald-500", label: "Dibuat" },
        updated: { bg: "bg-blue-500/10", text: "text-blue-500", label: "Diperbarui" },
        exported: { bg: "bg-amber-500/10", text: "text-amber-500", label: "Diekspor" },
    };
    const config = statusConfig[status];

    return (
        <div className="flex items-center gap-4 py-3 border-b border-border last:border-0">
            <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-muted-foreground">
                <FileText size={18} />
            </div>
            <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground truncate">{title}</p>
                <p className="text-xs text-muted-foreground">{type}</p>
            </div>
            <div className="text-right">
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${config.bg} ${config.text}`}>
                    {config.label}
                </span>
                <p className="text-xs text-muted-foreground mt-1">{time}</p>
            </div>
        </div>
    );
}

interface DashboardStats {
    totalDocuments: number;
    modulAjar: number;
    rpp: number;
    asesmen: number;
}

interface RecentDocument {
    id: string;
    title: string;
    type: string;
    updatedAt: string;
    status: "created" | "updated" | "exported";
}

export default function DashboardPage() {
    const { user } = useAuth();
    const { profile, fetchProfile } = useProfile();
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [recentDocs, setRecentDocs] = useState<RecentDocument[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                // Fetch profile
                await fetchProfile();

                // Fetch stats from various endpoints
                const [modulAjarRes, rppRes, asesmenRes] = await Promise.all([
                    api.get<{ id: string }[]>('/api/v2/modul-ajar', { limit: 100 }).catch(() => []),
                    api.get<{ id: string }[]>('/api/v2/rpp', { limit: 100 }).catch(() => []),
                    api.get<{ id: string }[]>('/api/v2/asesmen', { limit: 100 }).catch(() => []),
                ]);

                setStats({
                    totalDocuments: (modulAjarRes?.length || 0) + (rppRes?.length || 0) + (asesmenRes?.length || 0),
                    modulAjar: modulAjarRes?.length || 0,
                    rpp: rppRes?.length || 0,
                    asesmen: asesmenRes?.length || 0,
                });

                // Build recent documents from combined data
                const allDocs: RecentDocument[] = [
                    ...(modulAjarRes?.slice(0, 2).map((d: any) => ({
                        id: d.id,
                        title: d.judul || 'Modul Ajar',
                        type: 'Modul Ajar',
                        updatedAt: d.updated_at,
                        status: 'created' as const,
                    })) || []),
                    ...(rppRes?.slice(0, 2).map((d: any) => ({
                        id: d.id,
                        title: d.judul || 'RPP',
                        type: 'RPP',
                        updatedAt: d.updated_at,
                        status: 'updated' as const,
                    })) || []),
                ];
                setRecentDocs(allDocs.slice(0, 4));
            } catch (error) {
                console.error('Failed to load dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [fetchProfile]);

    const formatTimeAgo = (dateStr?: string) => {
        if (!dateStr) return 'Baru saja';
        const date = new Date(dateStr);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 60) return `${diffMins} menit lalu`;
        if (diffHours < 24) return `${diffHours} jam lalu`;
        if (diffDays < 7) return `${diffDays} hari lalu`;
        return date.toLocaleDateString('id-ID');
    };

    const userName = profile?.nama || user?.email?.split('@')[0] || 'Pengguna';

    const statsData = [
        { label: "Total Dokumen", value: stats?.totalDocuments?.toString() || "0", icon: FileText, trend: loading ? undefined : "+3 minggu ini", color: "bg-primary" },
        { label: "Modul Ajar", value: stats?.modulAjar?.toString() || "0", icon: BookOpen, color: "bg-emerald-500" },
        { label: "RPP", value: stats?.rpp?.toString() || "0", icon: ListTree, color: "bg-blue-500" },
        { label: "Asesmen", value: stats?.asesmen?.toString() || "0", icon: ClipboardList, color: "bg-amber-500" },
    ];

    const quickActions = [
        { label: "Modul Ajar", description: "Buat modul ajar baru dengan AI", href: "/dashboard/modul-ajar/create", icon: BookOpen, color: "bg-emerald-500" },
        { label: "RPP", description: "Susun rencana pembelajaran", href: "/dashboard/rpp/create", icon: FileText, color: "bg-blue-500" },
        { label: "ATP", description: "Buat alur tujuan pembelajaran", href: "/dashboard/atp/create", icon: Target, color: "bg-violet-500" },
        { label: "Silabus", description: "Generate silabus semester", href: "/dashboard/silabus/create", icon: ListTree, color: "bg-rose-500" },
        { label: "Asesmen", description: "Buat soal dan rubrik", href: "/dashboard/asesmen/create", icon: ClipboardList, color: "bg-amber-500" },
        { label: "Bank Soal", description: "Kelola koleksi soal", href: "/dashboard/bank-soal", icon: Library, color: "bg-teal-500" },
    ];

    return (
        <div className="space-y-8">
            {/* Welcome Banner */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative bg-gradient-to-r from-primary to-emerald-400 rounded-3xl p-8 text-white overflow-hidden"
            >
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                        <Sparkles size={20} className="text-amber-300" />
                        <span className="text-sm font-semibold text-white/80 uppercase tracking-wider">Selamat Datang</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold font-serif mb-2">Halo, {userName}! 👋</h1>
                    <p className="text-white/80 max-w-xl mb-6">
                        {stats && stats.totalDocuments > 0 ? (
                            <>Anda sudah membuat <span className="font-bold text-amber-300">{stats.totalDocuments} dokumen</span>. Terus berkarya!</>
                        ) : (
                            <>Mulai buat dokumen pertama Anda dengan bantuan AI Katedra.</>
                        )}
                    </p>
                    <div className="flex flex-wrap gap-3">
                        <Link href="/dashboard/modul-ajar/create">
                            <Button className="bg-white text-primary hover:bg-white/90 font-semibold rounded-xl">
                                <Plus size={18} className="mr-2" />
                                Buat Dokumen Baru
                            </Button>
                        </Link>
                        <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-white font-semibold rounded-xl backdrop-blur-sm">
                            Lihat Tutorial
                        </Button>
                    </div>
                </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {statsData.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <StatCard {...stat} loading={loading} />
                    </motion.div>
                ))}
            </div>

            {/* Quick Actions */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold font-serif text-foreground">Buat Cepat</h2>
                    <Link href="/dashboard/modul-ajar" className="text-sm text-primary font-semibold hover:underline flex items-center gap-1">
                        Lihat Semua <ArrowRight size={14} />
                    </Link>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {quickActions.map((action, index) => (
                        <motion.div
                            key={action.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + index * 0.05 }}
                        >
                            <QuickAction {...action} />
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Recent Activity */}
            <div className="grid lg:grid-cols-2 gap-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-card rounded-2xl p-6 border border-border shadow-sm"
                >
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold font-serif text-foreground">Aktivitas Terbaru</h2>
                        <Link href="/dashboard/modul-ajar" className="text-sm text-primary font-semibold hover:underline">
                            Lihat Semua
                        </Link>
                    </div>
                    {loading ? (
                        <div className="flex items-center justify-center py-8">
                            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                        </div>
                    ) : recentDocs.length > 0 ? (
                        <div>
                            {recentDocs.map((doc) => (
                                <ActivityItem
                                    key={doc.id}
                                    title={doc.title}
                                    type={doc.type}
                                    time={formatTimeAgo(doc.updatedAt)}
                                    status={doc.status}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-muted-foreground">
                            <FileText size={32} className="mx-auto mb-2 opacity-50" />
                            <p>Belum ada aktivitas</p>
                        </div>
                    )}
                </motion.div>

                {/* Reminder */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-card rounded-2xl p-6 border border-border shadow-sm"
                >
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold font-serif text-foreground">Pengingat</h2>
                        <Calendar size={18} className="text-muted-foreground" />
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 p-4 bg-amber-500/10 rounded-xl border border-amber-500/20">
                            <Clock size={20} className="text-amber-500" />
                            <div>
                                <p className="font-medium text-foreground">Deadline Silabus Semester 2</p>
                                <p className="text-sm text-muted-foreground">3 hari lagi</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
                            <Clock size={20} className="text-blue-500" />
                            <div>
                                <p className="font-medium text-foreground">Review RPP Mingguan</p>
                                <p className="text-sm text-muted-foreground">Setiap Jumat</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
