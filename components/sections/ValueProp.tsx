"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
    IconClipboardCopy,
    IconFileBroken,
    IconSignature,
    IconTableColumn,
} from "@tabler/icons-react";
import { Sparkles, Zap, BrainCircuit, LayoutDashboard } from "lucide-react";

// Reusable optimized image header component
const OptimizedImageHeader = ({ src, alt, gradient }: { src: string; alt: string; gradient: string }) => (
    <div className="relative w-full h-full min-h-[12rem] rounded-xl overflow-hidden border border-neutral-100 dark:border-white/10">
        <div className={`absolute inset-0 ${gradient} -z-10`} />
        <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
        />
    </div>
);

export function ValueProp() {
    return (
        <section id="features" className="py-24 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">

                {/* Section Header - Enhanced Hierarchy */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <span className="inline-block py-1 px-3 rounded-full bg-accent/10 border border-accent/20 text-accent-dark text-xs font-bold uppercase tracking-widest mb-4">
                            Why Katedra?
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-6xl font-bold font-serif text-primary mb-6 leading-tight"
                    >
                        Keunggulan <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">Katedra.</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="text-xl text-muted-foreground leading-relaxed text-balance"
                    >
                        Teknologi AI kami dirancang spesifik untuk struktur Kurikulum Merdeka,
                        memastikan setiap modul valid secara pedagogis dan administratif.
                    </motion.p>
                </div>

                <BentoGrid className="max-w-auto mx-auto md:auto-rows-[25rem]">
                    {items.map((item, i) => (
                        <BentoGridItem
                            key={i}
                            title={item.title}
                            description={item.description}
                            header={item.header}
                            className={item.className}
                            icon={item.icon}
                        />
                    ))}
                </BentoGrid>
            </div>
        </section>
    );
}

const items = [
    {
        title: "AI Pedagogis Context-Aware",
        description: "Bukan sekadar text-generator. AI kami memahami Capaian Pembelajaran (CP) dan Alur Tujuan Pembelajaran (ATP) secara mendalam.",
        header: (
            <OptimizedImageHeader
                src="/images/keunggulan/pedacontext.jpg"
                alt="AI Pedagogis Context-Aware"
                gradient="bg-gradient-to-br from-emerald-50 to-teal-50"
            />
        ),
        className: "md:col-span-2",
        icon: <BrainCircuit className="h-4 w-4 text-emerald-600" />,
    },
    {
        title: "Format Validasi Otomatis",
        description: "Dokumen yang dihasilkan otomatis lolos validasi format standar pengawas sekolah.",
        header: (
            <OptimizedImageHeader
                src="/images/keunggulan/validasi.jpg"
                alt="Format Validasi Otomatis"
                gradient="bg-gradient-to-br from-amber-50 to-yellow-50"
            />
        ),
        className: "md:col-span-1",
        icon: <IconSignature className="h-4 w-4 text-amber-600" />,
    },
    {
        title: "Dashboard Intuitif",
        description: "Antarmuka drag-and-drop yang memudahkan penyesuaian materi ajar.",
        header: (
            <OptimizedImageHeader
                src="/images/keunggulan/dashboard.jpg"
                alt="Dashboard Intuitif"
                gradient="bg-gradient-to-br from-blue-50 to-indigo-50"
            />
        ),
        className: "md:col-span-1",
        icon: <LayoutDashboard className="h-4 w-4 text-blue-600" />,
    },
    {
        title: "Export ke PDF & Docx",
        description: "Unduh hasil kerja Anda dalam format yang siap cetak atau siap edit.",
        header: (
            <OptimizedImageHeader
                src="/images/keunggulan/export.jpg"
                alt="Export ke PDF & Docx"
                gradient="bg-gradient-to-br from-rose-50 to-pink-50"
            />
        ),
        className: "md:col-span-2",
        icon: <IconFileBroken className="h-4 w-4 text-rose-600" />,
    },
];
