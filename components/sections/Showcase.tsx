"use client";

import ThreeDImageCarousel from "@/components/ui/ThreeDImageCarousel";
import { motion } from "framer-motion";

export function Showcase() {
    // Premium generated visuals
    const slides = [
        { id: 1, src: "/images/carousel/dashboard.png", href: "#" },
        { id: 2, src: "/images/carousel/analytics.png", href: "#" },
        { id: 3, src: "/images/carousel/editor.png", href: "#" },
        { id: 4, src: "/images/carousel/curriculum.png", href: "#" },
        { id: 5, src: "/images/carousel/reports.png", href: "#" },
    ];

    return (
        <section id="showcase" className="py-24 bg-neutral-50 border-y border-neutral-200 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 text-center mb-16">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-bold font-serif mb-6 text-primary"
                >
                    Eksplorasi Fitur Premium.
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-lg text-muted-foreground max-w-2xl mx-auto"
                >
                    Geser untuk melihat antarmuka cerdas yang dirancang untuk kecepatan dan keindahan.
                </motion.p>
            </div>

            <div className="scale-75 md:scale-100 transform origin-top">
                <ThreeDImageCarousel
                    slides={slides}
                    autoplay={true}
                    itemCount={5}
                />
            </div>
        </section>
    );
}
