"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    User,
    Mail,
    Building,
    MapPin,
    Phone,
    Camera,
    Save,
    BookOpen,
    Award,
    FileText,
    Loader2,
    Check,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { api } from "@/lib/api";

export default function ProfilePage() {
    const { user } = useAuth();
    const { profile, loading, fetchProfile, updateProfile } = useProfile();
    const [isEditing, setIsEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [stats, setStats] = useState({ modulAjar: 0, rpp: 0, asesmen: 0 });

    const [formData, setFormData] = useState({
        nama: "",
        nip: "",
        sekolah: "",
        jenjang: "",
        mata_pelajaran: "",
        alamat: "",
        bio: "",
    });

    useEffect(() => {
        fetchProfile();
        loadStats();
    }, [fetchProfile]);

    useEffect(() => {
        if (profile) {
            setFormData({
                nama: profile.nama || "",
                nip: profile.nip || "",
                sekolah: profile.sekolah || "",
                jenjang: profile.jenjang || "",
                mata_pelajaran: Array.isArray(profile.mata_pelajaran) ? profile.mata_pelajaran.join(", ") : (profile.mata_pelajaran || ""),
                alamat: "",
                bio: "",
            });
        }
    }, [profile]);

    const loadStats = async () => {
        try {
            const [modulAjar, rpp, asesmen] = await Promise.all([
                api.get<{ id: string }[]>('/api/v2/modul-ajar', { limit: 100 }).catch(() => []),
                api.get<{ id: string }[]>('/api/v2/rpp', { limit: 100 }).catch(() => []),
                api.get<{ id: string }[]>('/api/v2/asesmen', { limit: 100 }).catch(() => []),
            ]);
            setStats({
                modulAjar: modulAjar?.length || 0,
                rpp: rpp?.length || 0,
                asesmen: asesmen?.length || 0,
            });
        } catch (error) {
            console.error("Failed to load stats:", error);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await updateProfile({
                nama: formData.nama,
                nip: formData.nip,
                sekolah: formData.sekolah,
                jenjang: formData.jenjang,
                mata_pelajaran: formData.mata_pelajaran ? formData.mata_pelajaran.split(",").map(s => s.trim()) : undefined,
            });
            setIsEditing(false);
            setSuccessMessage("Profil berhasil disimpan!");
            setTimeout(() => setSuccessMessage(null), 3000);
        } catch (error) {
            console.error("Failed to save profile:", error);
        } finally {
            setSaving(false);
        }
    };

    const statsData = [
        { label: "Modul Dibuat", value: stats.modulAjar.toString(), icon: BookOpen, color: "bg-[var(--success)]" },
        { label: "RPP Selesai", value: stats.rpp.toString(), icon: FileText, color: "bg-[var(--info)]" },
        { label: "Asesmen", value: stats.asesmen.toString(), icon: Award, color: "bg-[var(--warning)]" },
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center py-16">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl md:text-3xl font-bold font-serif text-foreground">Profil Saya</h1>
                <p className="text-muted-foreground mt-1">Kelola informasi personal Anda</p>
            </div>

            {successMessage && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-[var(--success)]/10 border border-[var(--success)]/30 rounded-xl"
                >
                    <p className="text-sm text-[var(--success)] flex items-center gap-2">
                        <Check size={16} /> {successMessage}
                    </p>
                </motion.div>
            )}

            {/* Profile Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card rounded-2xl border border-border overflow-hidden"
            >
                {/* Cover */}
                <div className="h-32 bg-gradient-to-r from-primary to-emerald-400 relative">
                    <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-10" />
                </div>

                {/* Avatar & Basic Info */}
                <div className="px-6 pb-6">
                    <div className="flex flex-col md:flex-row md:items-end gap-4 -mt-12 relative z-10">
                        <div className="relative">
                            <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-accent/20 border-4 border-card shadow-lg flex items-center justify-center text-accent-dark dark:text-accent text-4xl font-bold">
                                {formData.nama?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || "U"}
                            </div>
                            <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center shadow-lg hover:bg-primary-dark transition-colors">
                                <Camera size={14} />
                            </button>
                        </div>
                        <div className="flex-1 pb-2">
                            <h2 className="text-2xl font-bold text-foreground">{formData.nama || "Pengguna"}</h2>
                            <p className="text-muted-foreground">{user?.email}</p>
                        </div>
                        <Button
                            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                            disabled={saving}
                            variant={isEditing ? "default" : "outline"}
                            className="rounded-xl"
                        >
                            {saving ? (
                                <>
                                    <Loader2 size={16} className="mr-2 animate-spin" />
                                    Menyimpan...
                                </>
                            ) : isEditing ? (
                                <>
                                    <Save size={16} className="mr-2" />
                                    Simpan
                                </>
                            ) : (
                                "Edit Profil"
                            )}
                        </Button>
                    </div>
                </div>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
                {statsData.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-card rounded-2xl border border-border p-4 text-center"
                        >
                            <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                                <Icon size={24} className="text-white" />
                            </div>
                            <p className="text-2xl font-bold text-foreground font-serif">{stat.value}</p>
                            <p className="text-sm text-muted-foreground">{stat.label}</p>
                        </motion.div>
                    );
                })}
            </div>

            {/* Profile Form */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-card rounded-2xl border border-border p-6"
            >
                <h3 className="text-lg font-bold text-foreground mb-6">Informasi Lengkap</h3>

                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                            <User size={14} className="text-muted-foreground" />
                            Nama Lengkap
                        </label>
                        <Input
                            value={formData.nama}
                            onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                            disabled={!isEditing}
                            className="h-12 rounded-xl"
                        />
                    </div>
                    <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                            <Mail size={14} className="text-muted-foreground" />
                            Email
                        </label>
                        <Input
                            value={user?.email || ""}
                            disabled
                            className="h-12 rounded-xl bg-muted"
                        />
                    </div>
                    <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                            <Phone size={14} className="text-muted-foreground" />
                            NIP
                        </label>
                        <Input
                            value={formData.nip}
                            onChange={(e) => setFormData({ ...formData, nip: e.target.value })}
                            disabled={!isEditing}
                            placeholder="Nomor Induk Pegawai"
                            className="h-12 rounded-xl"
                        />
                    </div>
                    <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                            <Building size={14} className="text-muted-foreground" />
                            Sekolah
                        </label>
                        <Input
                            value={formData.sekolah}
                            onChange={(e) => setFormData({ ...formData, sekolah: e.target.value })}
                            disabled={!isEditing}
                            placeholder="Nama Sekolah"
                            className="h-12 rounded-xl"
                        />
                    </div>
                    <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                            <BookOpen size={14} className="text-muted-foreground" />
                            Mata Pelajaran
                        </label>
                        <Input
                            value={formData.mata_pelajaran}
                            onChange={(e) => setFormData({ ...formData, mata_pelajaran: e.target.value })}
                            disabled={!isEditing}
                            placeholder="Mata Pelajaran yang diampu"
                            className="h-12 rounded-xl"
                        />
                    </div>
                    <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                            <MapPin size={14} className="text-muted-foreground" />
                            Jenjang
                        </label>
                        <select
                            value={formData.jenjang}
                            onChange={(e) => setFormData({ ...formData, jenjang: e.target.value })}
                            disabled={!isEditing}
                            className="w-full h-12 px-4 rounded-xl border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50 disabled:bg-muted"
                        >
                            <option value="">Pilih Jenjang</option>
                            <option value="SD">SD</option>
                            <option value="SMP">SMP</option>
                            <option value="SMA">SMA</option>
                            <option value="SMK">SMK</option>
                        </select>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
