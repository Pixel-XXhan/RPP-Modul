"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Plus,
    Search,
    Activity,
    Clock,
    Users,
    Target,
    Play,
    ChevronRight,
    BookOpen,
} from "lucide-react";

const mockActivities = [
    { id: "1", title: "Diskusi Kelompok: Bilangan Bulat", module: "Modul Ajar Matematika", duration: "20 menit", type: "diskusi" },
    { id: "2", title: "Latihan Terbimbing: Operasi Hitung", module: "RPP Persamaan Linear", duration: "30 menit", type: "latihan" },
    { id: "3", title: "Eksplorasi: Garis Bilangan", module: "Modul Ajar Matematika", duration: "15 menit", type: "eksplorasi" },
    { id: "4", title: "Presentasi Hasil Kerja", module: "Modul Ajar Matematika", duration: "25 menit", type: "presentasi" },
    { id: "5", title: "Kuis Interaktif", module: "RPP Persamaan Linear", duration: "10 menit", type: "kuis" },
    { id: "6", title: "Praktikum Laboratorium", module: "Modul Ajar IPA", duration: "45 menit", type: "praktikum" },
    { id: "7", title: "Kerja Kelompok: Poster", module: "Modul Ajar Bahasa Indonesia", duration: "60 menit", type: "diskusi" },
];

const typeConfig: Record<string, { color: string; darkColor: string; icon: typeof Activity }> = {
    diskusi: { color: "bg-blue-100 text-blue-700", darkColor: "dark:bg-blue-900/30 dark:text-blue-400", icon: Users },
    latihan: { color: "bg-emerald-100 text-emerald-700", darkColor: "dark:bg-emerald-900/30 dark:text-emerald-400", icon: Target },
    eksplorasi: { color: "bg-violet-100 text-violet-700", darkColor: "dark:bg-violet-900/30 dark:text-violet-400", icon: Activity },
    presentasi: { color: "bg-amber-100 text-amber-700", darkColor: "dark:bg-amber-900/30 dark:text-amber-400", icon: Play },
    kuis: { color: "bg-rose-100 text-rose-700", darkColor: "dark:bg-rose-900/30 dark:text-rose-400", icon: BookOpen },
    praktikum: { color: "bg-teal-100 text-teal-700", darkColor: "dark:bg-teal-900/30 dark:text-teal-400", icon: Activity },
};

export default function KegiatanPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [typeFilter, setTypeFilter] = useState("all");

    const types = ["all", "diskusi", "latihan", "eksplorasi", "presentasi", "kuis", "praktikum"];

    const filteredActivities = mockActivities.filter(activity => {
        const matchesSearch = !searchQuery || (activity.title || "").toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = typeFilter === "all" || activity.type === typeFilter;
        return matchesSearch && matchesType;
    });

    // Calculate total duration
    const totalDuration = mockActivities.reduce((acc, act) => {
        const mins = parseInt(act.duration);
        return acc + (isNaN(mins) ? 0 : mins);
    }, 0);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold font-serif text-foreground">Kegiatan Pembelajaran</h1>
                    <p className="text-muted-foreground mt-1">Kelola aktivitas pembelajaran di kelas</p>
                </div>
                <Link href="/dashboard/kegiatan/create">
                    <Button className="bg-primary hover:bg-primary-dark text-white rounded-xl shadow-lg shadow-primary/20">
                        <Plus size={18} className="mr-2" />Tambah Kegiatan
                    </Button>
                </Link>
            </div>

            {/* Stats - Simplified without status tracking */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                    { label: "Total Kegiatan", value: mockActivities.length, icon: Activity, color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" },
                    { label: "Total Durasi", value: `${totalDuration} menit`, icon: Clock, color: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400" },
                    { label: "Jenis Berbeda", value: new Set(mockActivities.map(a => a.type)).size, icon: Target, color: "bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400" },
                ].map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                            className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-4 text-center">
                            <div className={`w-10 h-10 ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-2`}>
                                <Icon size={20} />
                            </div>
                            <p className="text-xl font-bold font-serif text-foreground">{stat.value}</p>
                            <p className="text-xs text-muted-foreground">{stat.label}</p>
                        </motion.div>
                    );
                })}
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Cari kegiatan..."
                        className="h-12 pl-11 rounded-xl"
                    />
                </div>
                <div className="flex flex-wrap gap-2">
                    {types.map((type) => (
                        <button key={type} onClick={() => setTypeFilter(type)}
                            className={`px-4 py-2 rounded-xl text-sm font-semibold capitalize transition-colors ${typeFilter === type
                                ? "bg-primary text-white"
                                : "bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-muted-foreground hover:bg-neutral-50 dark:hover:bg-neutral-800"
                                }`}>
                            {type === "all" ? "Semua" : type}
                        </button>
                    ))}
                </div>
            </div>

            {/* Activities List - Without status tracking */}
            <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
                <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
                    {filteredActivities.map((activity, index) => {
                        const typeInfo = typeConfig[activity.type] || typeConfig.eksplorasi;
                        const TypeIcon = typeInfo.icon;
                        return (
                            <motion.div key={activity.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.05 }}
                                className="flex items-center gap-4 p-4 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors group cursor-pointer">
                                <div className={`w-12 h-12 rounded-xl ${typeInfo.color} ${typeInfo.darkColor} flex items-center justify-center shrink-0`}>
                                    <TypeIcon size={24} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-bold text-foreground group-hover:text-primary transition-colors truncate">{activity.title}</p>
                                    <p className="text-sm text-muted-foreground truncate">{activity.module}</p>
                                </div>
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                    <Clock size={14} />
                                    <span>{activity.duration}</span>
                                </div>
                                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${typeInfo.color} ${typeInfo.darkColor}`}>
                                    {activity.type}
                                </span>
                                <ChevronRight size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {filteredActivities.length === 0 && (
                <div className="text-center py-16 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800">
                    <Activity size={48} className="mx-auto text-muted-foreground/40 mb-4" />
                    <h3 className="text-lg font-bold text-foreground mb-2">Tidak ada kegiatan</h3>
                    <p className="text-muted-foreground">Coba filter atau kata kunci lain</p>
                </div>
            )}
        </div>
    );
}
