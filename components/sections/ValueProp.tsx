"use client";

import { motion } from "framer-motion";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
    IconClipboardCopy,
    IconFileBroken,
    IconSignature,
    IconTableColumn,
} from "@tabler/icons-react";
import { Sparkles, Zap, BrainCircuit, LayoutDashboard } from "lucide-react";

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

const Skeleton = ({ bgClass = "bg-neutral-100" }) => (
    <div className={`flex flex-1 w-full h-full min-h-[6rem] rounded-xl ${bgClass} border border-transparent dark:border-white/10 relative overflow-hidden transition-all duration-500 group-hover:border-accent/20`}>
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/5 opacity-50" />
    </div>
);

const items = [
    {
        title: "AI Pedagogis Context-Aware",
        description: "Bukan sekadar text-generator. AI kami memahami Capaian Pembelajaran (CP) dan Alur Tujuan Pembelajaran (ATP) secara mendalam.",
        header: (
            <div className="relative w-full h-full min-h-[12rem] rounded-xl overflow-hidden border border-neutral-100 dark:border-white/10">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-teal-50 -z-10" />
                {/* Using standard img for local assets to ensure immediate render or Next Image if preferred */}
                <img
                    src="/images/keunggulan/pedacontext.jpg"
                    alt="AI Pedagogis Context-Aware"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </div>
        ),
        className: "md:col-span-2",
        icon: <BrainCircuit className="h-4 w-4 text-emerald-600" />,
    },
    {
        title: "Format Validasi Otomatis",
        description: "Dokumen yang dihasilkan otomatis lolos validasi format standar pengawas sekolah.",
        header: (
            <div className="relative w-full h-full min-h-[12rem] rounded-xl overflow-hidden border border-neutral-100 dark:border-white/10">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-yellow-50 -z-10" />
                <img
                    src="/images/keunggulan/validasi.jpg"
                    alt="Format Validasi Otomatis"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </div>
        ),
        className: "md:col-span-1",
        icon: <IconSignature className="h-4 w-4 text-amber-600" />,
    },
    {
        title: "Dashboard Intuitif",
        description: "Antarmuka drag-and-drop yang memudahkan penyesuaian materi ajar.",
        header: (
            <div className="relative w-full h-full min-h-[12rem] rounded-xl overflow-hidden border border-neutral-100 dark:border-white/10">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 -z-10" />
                <img
                    src="/images/keunggulan/dashboard.jpg"
                    alt="Dashboard Intuitif"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </div>
        ),
        className: "md:col-span-1",
        icon: <LayoutDashboard className="h-4 w-4 text-blue-600" />,
    },
    {
        title: "Export ke PDF & Docx",
        description: "Unduh hasil kerja Anda dalam format yang siap cetak atau siap edit.",
        header: (
            <div className="relative w-full h-full min-h-[12rem] rounded-xl overflow-hidden border border-neutral-100 dark:border-white/10">
                <div className="absolute inset-0 bg-gradient-to-br from-rose-50 to-pink-50 -z-10" />
                <img
                    src="/images/keunggulan/export.jpg"
                    alt="Export ke PDF & Docx"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </div>
        ),
        className: "md:col-span-2",
        icon: <IconFileBroken className="h-4 w-4 text-rose-600" />,
    },
];
