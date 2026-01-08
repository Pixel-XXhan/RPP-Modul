"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
    Plus,
    Search,
    Filter,
    BookOpen,
    ChevronRight,
    FileText,
    Video,
    Image as ImageIcon,
    Link as LinkIcon,
    MoreVertical,
    Edit,
    Trash2,
    Eye,
    Download,
} from "lucide-react";
import { useState } from "react";

// Mock data
const mockMateri = [
    {
        id: "1",
        title: "Pengenalan Bilangan Bulat",
        description: "Materi pengantar tentang konsep bilangan bulat positif dan negatif, serta representasinya pada garis bilangan.",
        subject: "Matematika",
        type: "text",
        attachments: 2,
        views: 156,
        updatedAt: "2 jam lalu",
    },
    {
        id: "2",
        title: "Video: Operasi Hitung Bilangan Bulat",
        description: "Video pembelajaran tentang penjumlahan, pengurangan, perkalian, dan pembagian bilangan bulat.",
        subject: "Matematika",
        type: "video",
        duration: "12:34",
        views: 342,
        updatedAt: "3 hari lalu",
    },
    {
        id: "3",
        title: "Infografis Struktur Teks Narasi",
        description: "Infografis yang menjelaskan struktur teks narasi: orientasi, komplikasi, dan resolusi.",
        subject: "Bahasa Indonesia",
        type: "image",
        views: 89,
        updatedAt: "1 minggu lalu",
    },
    {
        id: "4",
        title: "Artikel: Energi dalam Kehidupan Sehari-hari",
        description: "Artikel tentang berbagai bentuk energi dan transformasinya dalam aktivitas sehari-hari.",
        subject: "IPA",
        type: "text",
        attachments: 3,
        views: 201,
        updatedAt: "2 minggu lalu",
    },
];

const typeConfig = {
    text: { icon: FileText, color: "bg-blue-100 text-blue-600", label: "Teks" },
    video: { icon: Video, color: "bg-rose-100 text-rose-600", label: "Video" },
    image: { icon: ImageIcon, color: "bg-amber-100 text-amber-600", label: "Gambar" },
    link: { icon: LinkIcon, color: "bg-emerald-100 text-emerald-600", label: "Link" },
};

function MateriCard({ materi, index }: { materi: typeof mockMateri[0]; index: number }) {
    const [showMenu, setShowMenu] = useState(false);
    const typeInfo = typeConfig[materi.type as keyof typeof typeConfig];
    const TypeIcon = typeInfo.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-2xl border border-neutral-200 p-5 hover:shadow-lg hover:border-primary/20 transition-all group"
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className={`w-11 h-11 rounded-xl ${typeInfo.color} flex items-center justify-center`}>
                    <TypeIcon size={22} />
                </div>
                <div className="flex items-center gap-2">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${typeInfo.color}`}>
                        {typeInfo.label}
                    </span>
                    <div className="relative">
                        <button
                            onClick={() => setShowMenu(!showMenu)}
                            className="p-1.5 rounded-lg hover:bg-neutral-100 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <MoreVertical size={16} />
                        </button>
                        {showMenu && (
                            <>
                                <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)} />
                                <div className="absolute right-0 top-8 w-44 bg-white rounded-xl shadow-lg border border-neutral-200 py-2 z-20">
                                    <button className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-neutral-50">
                                        <Eye size={14} /> Pratinjau
                                    </button>
                                    <button className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-neutral-50">
                                        <Edit size={14} /> Edit
                                    </button>
                                    <button className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-neutral-50">
                                        <Download size={14} /> Unduh
                                    </button>
                                    <hr className="my-2" />
                                    <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                                        <Trash2 size={14} /> Hapus
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Content */}
            <Link href={`/dashboard/materi/${materi.id}`}>
                <h3 className="font-bold text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">
                    {materi.title}
                </h3>
            </Link>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                {materi.description}
            </p>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mb-4">
                <span className="bg-neutral-100 px-2 py-1 rounded">{materi.subject}</span>
                {materi.type === "video" && materi.duration && (
                    <span className="bg-neutral-100 px-2 py-1 rounded">⏱ {materi.duration}</span>
                )}
                {materi.attachments && (
                    <span className="bg-neutral-100 px-2 py-1 rounded">📎 {materi.attachments} lampiran</span>
                )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                        <Eye size={12} /> {materi.views}
                    </span>
                    <span>{materi.updatedAt}</span>
                </div>
                <Link
                    href={`/dashboard/materi/${materi.id}`}
                    className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
                >
                    Buka <ChevronRight size={14} />
                </Link>
            </div>
        </motion.div>
    );
}

export default function MateriPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [filterType, setFilterType] = useState<"all" | "text" | "video" | "image" | "link">("all");

    const filteredMateri = mockMateri.filter(m => {
        const matchesSearch = (m.title || "").toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = filterType === "all" || m.type === filterType;
        return matchesSearch && matchesType;
    });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold font-serif text-foreground">Materi Pembelajaran</h1>
                    <p className="text-muted-foreground mt-1">Kelola konten dan bahan ajar</p>
                </div>
                <Link href="/dashboard/materi/create">
                    <Button className="bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl shadow-lg shadow-primary/20">
                        <Plus size={18} className="mr-2" />
                        Tambah Materi
                    </Button>
                </Link>
            </div>

            {/* Type Tabs */}
            <div className="flex gap-2 flex-wrap">
                {[
                    { value: "all", label: "Semua", count: mockMateri.length },
                    { value: "text", label: "Teks", icon: FileText },
                    { value: "video", label: "Video", icon: Video },
                    { value: "image", label: "Gambar", icon: ImageIcon },
                ].map((type) => {
                    const Icon = type.icon;
                    return (
                        <button
                            key={type.value}
                            onClick={() => setFilterType(type.value as any)}
                            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2 ${filterType === type.value
                                ? "bg-primary text-white"
                                : "bg-white border border-neutral-200 text-muted-foreground hover:bg-neutral-50"
                                }`}
                        >
                            {Icon && <Icon size={16} />}
                            {type.label}
                            {type.count && (
                                <span className={`text-xs px-1.5 py-0.5 rounded-full ${filterType === type.value ? "bg-white/20" : "bg-neutral-100"
                                    }`}>
                                    {type.count}
                                </span>
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Search */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Cari materi pembelajaran..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-white border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                </div>
                <button className="px-4 py-3 bg-white border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-colors">
                    <Filter size={18} className="text-muted-foreground" />
                </button>
            </div>

            {/* Grid */}
            {filteredMateri.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredMateri.map((materi, index) => (
                        <MateriCard key={materi.id} materi={materi} index={index} />
                    ))}
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-16 bg-white rounded-2xl border border-neutral-200"
                >
                    <BookOpen size={48} className="mx-auto text-muted-foreground/40 mb-4" />
                    <h3 className="text-lg font-bold text-foreground mb-2">Belum ada Materi</h3>
                    <p className="text-muted-foreground mb-6">Tambahkan materi pembelajaran pertama</p>
                    <Link href="/dashboard/materi/create">
                        <Button className="bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl">
                            <Plus size={18} className="mr-2" />
                            Tambah Materi Pertama
                        </Button>
                    </Link>
                </motion.div>
            )}
        </div>
    );
}
