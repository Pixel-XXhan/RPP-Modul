"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    User,
    Bell,
    Shield,
    Palette,
    ChevronRight,
    Moon,
    Sun,
    Monitor,
    Check,
    Loader2,
    Save,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";

const tabs = [
    { id: "account", label: "Akun", icon: User },
    { id: "notifications", label: "Notifikasi", icon: Bell },
    { id: "preferences", label: "Preferensi", icon: Palette },
    { id: "security", label: "Keamanan", icon: Shield },
];

export default function SettingsPage() {
    const { user, signOut } = useAuth();
    const { profile, loading: profileLoading, fetchProfile, updateProfile, updatePreferences } = useProfile();
    const [activeTab, setActiveTab] = useState("account");
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();
    const [saving, setSaving] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        nama: "",
        nip: "",
        sekolah: "",
        jenjang: "",
    });

    const [notifications, setNotifications] = useState({
        email: true,
        push: true,
        weekly: false,
        marketing: false,
    });

    useEffect(() => {
        setMounted(true);
        fetchProfile();
    }, [fetchProfile]);

    useEffect(() => {
        if (profile) {
            setFormData({
                nama: profile.nama || "",
                nip: profile.nip || "",
                sekolah: profile.sekolah || "",
                jenjang: profile.jenjang || "",
            });
        }
    }, [profile]);

    const handleSaveProfile = async () => {
        setSaving(true);
        try {
            await updateProfile({
                nama: formData.nama,
                nip: formData.nip,
                sekolah: formData.sekolah,
                jenjang: formData.jenjang,
            });
            setSuccessMessage("Profil berhasil disimpan!");
            setTimeout(() => setSuccessMessage(null), 3000);
        } catch (error) {
            console.error("Failed to save profile:", error);
        } finally {
            setSaving(false);
        }
    };

    const handleThemeChange = async (newTheme: string) => {
        setTheme(newTheme);
        try {
            await updatePreferences({ theme: newTheme as 'light' | 'dark' | 'system' });
        } catch (error) {
            console.error("Failed to save theme preference:", error);
        }
    };

    const themeOptions = [
        { value: "light", label: "Terang", icon: Sun },
        { value: "dark", label: "Gelap", icon: Moon },
        { value: "system", label: "Sistem", icon: Monitor },
    ];

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl md:text-3xl font-bold font-serif text-foreground">Pengaturan</h1>
                <p className="text-muted-foreground mt-1">Kelola preferensi dan keamanan akun Anda</p>
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

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Sidebar Tabs */}
                <div className="lg:w-56 shrink-0">
                    <nav className="bg-card rounded-2xl border border-border p-2 space-y-1">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === tab.id
                                        ? "bg-primary/10 text-primary"
                                        : "text-muted-foreground hover:bg-muted"
                                        }`}
                                >
                                    <Icon size={18} />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </nav>
                </div>

                {/* Content */}
                <div className="flex-1">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-card rounded-2xl border border-border p-6"
                    >
                        {activeTab === "account" && (
                            <div className="space-y-6">
                                <h2 className="text-lg font-bold text-foreground">Pengaturan Akun</h2>

                                {profileLoading ? (
                                    <div className="flex items-center justify-center py-8">
                                        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
                                            <Input
                                                type="email"
                                                value={user?.email || ""}
                                                disabled
                                                className="h-12 rounded-xl bg-muted"
                                            />
                                            <p className="text-xs text-muted-foreground mt-1">Email tidak dapat diubah</p>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-foreground mb-1.5">Nama Lengkap</label>
                                            <Input
                                                type="text"
                                                value={formData.nama}
                                                onChange={(e) => setFormData(prev => ({ ...prev, nama: e.target.value }))}
                                                placeholder="Nama Anda"
                                                className="h-12 rounded-xl"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-foreground mb-1.5">NIP (Opsional)</label>
                                            <Input
                                                type="text"
                                                value={formData.nip}
                                                onChange={(e) => setFormData(prev => ({ ...prev, nip: e.target.value }))}
                                                placeholder="Nomor Induk Pegawai"
                                                className="h-12 rounded-xl"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-foreground mb-1.5">Sekolah / Institusi</label>
                                            <Input
                                                type="text"
                                                value={formData.sekolah}
                                                onChange={(e) => setFormData(prev => ({ ...prev, sekolah: e.target.value }))}
                                                placeholder="Contoh: SMAN 1 Jakarta"
                                                className="h-12 rounded-xl"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-foreground mb-1.5">Jenjang</label>
                                            <select
                                                value={formData.jenjang}
                                                onChange={(e) => setFormData(prev => ({ ...prev, jenjang: e.target.value }))}
                                                className="w-full h-12 px-4 rounded-xl border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                                            >
                                                <option value="">Pilih Jenjang</option>
                                                <option value="SD">SD</option>
                                                <option value="SMP">SMP</option>
                                                <option value="SMA">SMA</option>
                                                <option value="SMK">SMK</option>
                                            </select>
                                        </div>

                                        <div className="pt-4 flex gap-3">
                                            <Button
                                                onClick={handleSaveProfile}
                                                disabled={saving}
                                                className="rounded-xl"
                                            >
                                                {saving ? (
                                                    <><Loader2 size={16} className="mr-2 animate-spin" /> Menyimpan...</>
                                                ) : (
                                                    <><Save size={16} className="mr-2" /> Simpan Perubahan</>
                                                )}
                                            </Button>
                                        </div>

                                        <div className="pt-4 border-t border-border">
                                            <div className="flex items-center justify-between py-4">
                                                <div>
                                                    <p className="font-medium text-foreground">Keluar dari Akun</p>
                                                    <p className="text-sm text-muted-foreground">Anda akan logout dari sesi ini</p>
                                                </div>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="rounded-lg"
                                                    onClick={signOut}
                                                >
                                                    Logout
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === "notifications" && (
                            <div className="space-y-6">
                                <h2 className="text-lg font-bold text-foreground">Pengaturan Notifikasi</h2>

                                <div className="space-y-4">
                                    {[
                                        { key: "email", label: "Notifikasi Email", desc: "Terima update via email" },
                                        { key: "push", label: "Push Notification", desc: "Notifikasi di browser" },
                                        { key: "weekly", label: "Ringkasan Mingguan", desc: "Laporan aktivitas mingguan" },
                                        { key: "marketing", label: "Email Promosi", desc: "Tips dan penawaran khusus" },
                                    ].map((item) => (
                                        <div key={item.key} className="flex items-center justify-between py-4 border-b border-border last:border-0">
                                            <div>
                                                <p className="font-medium text-foreground">{item.label}</p>
                                                <p className="text-sm text-muted-foreground">{item.desc}</p>
                                            </div>
                                            <button
                                                onClick={() => setNotifications(prev => ({ ...prev, [item.key]: !prev[item.key as keyof typeof prev] }))}
                                                className={`w-12 h-7 rounded-full transition-colors relative ${notifications[item.key as keyof typeof notifications]
                                                    ? "bg-primary"
                                                    : "bg-muted"
                                                    }`}
                                            >
                                                <span
                                                    className={`absolute top-1 w-5 h-5 bg-background rounded-full shadow transition-transform ${notifications[item.key as keyof typeof notifications]
                                                        ? "translate-x-6"
                                                        : "translate-x-1"
                                                        }`}
                                                />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === "preferences" && (
                            <div className="space-y-6">
                                <h2 className="text-lg font-bold text-foreground">Preferensi</h2>

                                <div className="space-y-6">
                                    <div>
                                        <p className="font-medium text-foreground mb-3">Tema Tampilan</p>
                                        <div className="grid grid-cols-3 gap-3">
                                            {mounted && themeOptions.map((option) => {
                                                const Icon = option.icon;
                                                const isActive = theme === option.value;
                                                return (
                                                    <button
                                                        key={option.value}
                                                        onClick={() => handleThemeChange(option.value)}
                                                        className={`relative flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all ${isActive
                                                            ? "bg-primary text-primary-foreground border-primary shadow-lg"
                                                            : "bg-card border-border text-foreground hover:border-primary/50"
                                                            }`}
                                                    >
                                                        <Icon size={24} />
                                                        <span className="text-sm font-semibold">{option.label}</span>
                                                        {isActive && (
                                                            <motion.div
                                                                initial={{ scale: 0 }}
                                                                animate={{ scale: 1 }}
                                                                className="absolute -top-2 -right-2 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center border-2 border-background"
                                                            >
                                                                <Check size={12} />
                                                            </motion.div>
                                                        )}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                        <p className="text-sm text-muted-foreground mt-3">
                                            Pilih tema yang sesuai dengan preferensi Anda. Mode &quot;Sistem&quot; akan mengikuti pengaturan perangkat.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "security" && (
                            <div className="space-y-6">
                                <h2 className="text-lg font-bold text-foreground">Keamanan</h2>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between py-4 border-b border-border">
                                        <div>
                                            <p className="font-medium text-foreground">Autentikasi 2 Faktor</p>
                                            <p className="text-sm text-muted-foreground">Tambah lapisan keamanan ekstra</p>
                                        </div>
                                        <Button variant="outline" size="sm" className="rounded-lg">
                                            Aktifkan
                                        </Button>
                                    </div>
                                    <div className="flex items-center justify-between py-4 border-b border-border">
                                        <div>
                                            <p className="font-medium text-foreground">Sesi Login Aktif</p>
                                            <p className="text-sm text-muted-foreground">1 perangkat aktif</p>
                                        </div>
                                        <Button variant="outline" size="sm" className="rounded-lg">
                                            Kelola
                                        </Button>
                                    </div>
                                    <div className="flex items-center justify-between py-4">
                                        <div>
                                            <p className="font-medium text-foreground">Riwayat Login</p>
                                            <p className="text-sm text-muted-foreground">Lihat aktivitas login terakhir</p>
                                        </div>
                                        <ChevronRight size={18} className="text-muted-foreground" />
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
