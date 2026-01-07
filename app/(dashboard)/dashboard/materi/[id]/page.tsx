"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
    ArrowLeft,
    Edit,
    Download,
    BookOpen,
    FileText,
    Video,
    Image as ImageIcon,
    Eye,
    Calendar,
    User,
    Sparkles,
    ExternalLink,
} from "lucide-react";

const materiData = {
    id: "1",
    title: "Pengenalan Bilangan Bulat",
    type: "text",
    subject: "Matematika",
    grade: "Kelas 7",
    topic: "Bilangan",
    description: "Materi pengantar tentang konsep bilangan bulat positif dan negatif, serta representasinya pada garis bilangan.",
    content: `
## Pengertian Bilangan Bulat

Bilangan bulat adalah himpunan bilangan yang terdiri dari bilangan bulat negatif, nol, dan bilangan bulat positif.

### Bilangan Bulat Positif
Bilangan bulat positif adalah bilangan asli, yaitu 1, 2, 3, 4, 5, dan seterusnya.

### Bilangan Bulat Negatif  
Bilangan bulat negatif adalah lawan dari bilangan bulat positif, yaitu -1, -2, -3, -4, -5, dan seterusnya.

### Nol
Nol (0) bukan bilangan positif maupun negatif, tetapi termasuk bilangan bulat.

## Garis Bilangan

Bilangan bulat dapat direpresentasikan pada garis bilangan:
- Bilangan positif berada di sebelah kanan nol
- Bilangan negatif berada di sebelah kiri nol
- Semakin ke kanan, nilai bilangan semakin besar

## Contoh Bilangan Bulat dalam Kehidupan

1. **Suhu**: -5°C (di bawah nol), 25°C (di atas nol)
2. **Ketinggian**: -100m (di bawah permukaan laut), 500m (di atas permukaan laut)
3. **Keuangan**: -Rp50.000 (utang), Rp100.000 (tabungan)
    `,
    attachments: [
        { name: "LKPD Bilangan Bulat.pdf", size: "1.2 MB" },
        { name: "Latihan Soal.docx", size: "450 KB" },
    ],
    author: "Arief Fajar",
    views: 156,
    createdAt: "5 Januari 2026",
    updatedAt: "2 jam lalu",
};

const typeConfig = {
    text: { icon: FileText, color: "bg-blue-100 text-blue-600", label: "Teks" },
    video: { icon: Video, color: "bg-rose-100 text-rose-600", label: "Video" },
    image: { icon: ImageIcon, color: "bg-amber-100 text-amber-600", label: "Gambar" },
};

export default function MateriDetailPage({ params }: { params: { id: string } }) {
    const typeInfo = typeConfig[materiData.type as keyof typeof typeConfig];
    const TypeIcon = typeInfo.icon;

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                    <Link href="/dashboard/materi" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-3">
                        <ArrowLeft size={16} className="mr-2" />Kembali
                    </Link>
                    <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-2xl md:text-3xl font-bold font-serif">{materiData.title}</h1>
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${typeInfo.color}`}>{typeInfo.label}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                        <span>{materiData.subject}</span><span>•</span>
                        <span>{materiData.grade}</span><span>•</span>
                        <span>{materiData.topic}</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Link href={`/dashboard/materi/${params.id}/edit`}>
                        <Button variant="outline" className="rounded-xl"><Edit size={16} className="mr-2" />Edit</Button>
                    </Link>
                    <Button className="bg-primary text-white rounded-xl"><Download size={16} className="mr-2" />Unduh</Button>
                </div>
            </div>

            {/* Meta */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border p-5">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl ${typeInfo.color} flex items-center justify-center`}>
                            <TypeIcon size={20} />
                        </div>
                        <div><p className="text-xs text-muted-foreground">Tipe</p><p className="font-medium">{typeInfo.label}</p></div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center"><Eye size={20} /></div>
                        <div><p className="text-xs text-muted-foreground">Dilihat</p><p className="font-medium">{materiData.views}x</p></div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-violet-100 text-violet-600 flex items-center justify-center"><User size={20} /></div>
                        <div><p className="text-xs text-muted-foreground">Pembuat</p><p className="font-medium">{materiData.author}</p></div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center"><Calendar size={20} /></div>
                        <div><p className="text-xs text-muted-foreground">Diperbarui</p><p className="font-medium">{materiData.updatedAt}</p></div>
                    </div>
                </div>
            </motion.div>

            {/* Description */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-blue-50 rounded-2xl border border-blue-100 p-6">
                <p className="text-blue-900 leading-relaxed">{materiData.description}</p>
            </motion.div>

            {/* Content */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl border p-6">
                <h2 className="text-lg font-bold mb-4">Konten Materi</h2>
                <article className="prose prose-neutral max-w-none">
                    <div className="whitespace-pre-wrap text-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: materiData.content.replace(/##\s/g, '<h2 class="text-xl font-bold mt-6 mb-3">').replace(/###\s/g, '<h3 class="text-lg font-semibold mt-4 mb-2">').replace(/\n\n/g, '</p><p class="my-3">').replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>') }} />
                </article>
            </motion.div>

            {/* Attachments */}
            {materiData.attachments.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-2xl border p-6">
                    <h2 className="text-lg font-bold mb-4">Lampiran ({materiData.attachments.length})</h2>
                    <div className="space-y-3">
                        {materiData.attachments.map((att, i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                                        <FileText size={20} />
                                    </div>
                                    <div>
                                        <p className="font-medium">{att.name}</p>
                                        <p className="text-xs text-muted-foreground">{att.size}</p>
                                    </div>
                                </div>
                                <Button variant="outline" size="sm" className="rounded-lg">
                                    <Download size={14} className="mr-1" />Unduh
                                </Button>
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* AI Badge */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-4 border border-primary/10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary"><Sparkles size={20} /></div>
                    <div>
                        <p className="font-medium">Materi Terstruktur AI</p>
                        <p className="text-sm text-muted-foreground">Konten disusun sesuai dengan CP dan tingkat perkembangan siswa</p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
