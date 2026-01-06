"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const logos = [
    { name: "Lovable", src: "https://cdn.prod.website-files.com/682fa12727f78b943ed45584/68875c8ba8908e8964583de6_lovable-v2.svg" },
    { name: "Menlo", src: "https://cdn.prod.website-files.com/682fa12727f78b943ed45584/6885091bff23fbbaead4d68f_menlo%20(2).svg" },
    { name: "Instacart", src: "https://cdn.prod.website-files.com/682fa12727f78b943ed45584/68850d4a78c3eb0e7c37dd5b_instacart-v2.svg" },
    { name: "Clay", src: "https://cdn.prod.website-files.com/682fa12727f78b943ed45584/690a5985b1c1332c33a609a8_clay-lumen2.svg" },
    { name: "Mercury", src: "https://cdn.prod.website-files.com/682fa12727f78b943ed45584/689f1210efd813db213a4714_mercury-lumon.svg" },
    { name: "Groupon", src: "https://cdn.prod.website-files.com/682fa12727f78b943ed45584/689f1376ce57025556d25a77_groupon-lumon-v3.svg" },
    { name: "Just Injury Lawyers", src: "https://cdn.prod.website-files.com/682fa12727f78b943ed45584/689f1493091725f170391dbd_just%20injury%20lawyers%20lumon.svg" },
    { name: "Vercel", src: "https://cdn.prod.website-files.com/682fa12727f78b943ed45584/68cd489e5cc5b3b63d17259a_vercel-logo1.svg" },
    { name: "OpenAI", src: "https://cdn.prod.website-files.com/682fa12727f78b943ed45584/68cd48f7ceada1605ba5f9bb_OpenAI-logo.svg" },
    { name: "Replit", src: "https://cdn.prod.website-files.com/682fa12727f78b943ed45584/68d282cf6db9e65365e93c86_replit-lumen-v2.svg" },
    { name: "Nuuly", src: "https://cdn.prod.website-files.com/682fa12727f78b943ed45584/690a50c48ce65d4823f03d13_nuuly-lumen.svg" },
    { name: "Warp", src: "https://cdn.prod.website-files.com/682fa12727f78b943ed45584/690a52550f741606c7e2c77a_warp-lumen.svg" },
    { name: "Substack", src: "https://cdn.prod.website-files.com/682fa12727f78b943ed45584/689f0aaace6817d9ec9c5117_substack-lumon.svg" },
    { name: "Amazon", src: "https://cdn.prod.website-files.com/682fa12727f78b943ed45584/6834ba4ae4bfda8858fae910_Amazon_logo%201.svg" },
    { name: "Perplexity", src: "https://cdn.prod.website-files.com/682fa12727f78b943ed45584/6834bb7710c435d07581dbf0_Group%20516179.svg" },
    { name: "Superhuman", src: "https://cdn.prod.website-files.com/682fa12727f78b943ed45584/6834ba1c53a7f2625aefff07_Group-1.svg" },
    { name: "Strava", src: "https://cdn.prod.website-files.com/682fa12727f78b943ed45584/6834b8f44f8ddd95c2e78ad5_Frame%2048096283.svg" },
    { name: "Nvidia", src: "https://cdn.prod.website-files.com/682fa12727f78b943ed45584/68850e2cf5f493b2bb7e7cfc_nvidia-v4.svg" },
];

export function LogoMarquee() {
    return (
        <div className="w-full relative overflow-hidden py-10">
            {/* 20% width blur mask on edges */}
            {/* Removed white blur masks as they clash with colored backgrounds */}
            {/* <div className="absolute inset-y-0 left-0 w-[20%] z-20 bg-gradient-to-r from-background to-transparent pointer-events-none" /> */}
            {/* <div className="absolute inset-y-0 right-0 w-[20%] z-20 bg-gradient-to-l from-background to-transparent pointer-events-none" /> */}

            <div className="flex w-full">
                <motion.div
                    className="flex flex-none items-center gap-12 sm:gap-16 pr-16"
                    animate={{ translateX: "-50%" }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    style={{ width: "max-content" }}
                >
                    {/* Double the list for seamless loop */}
                    {[...logos, ...logos].map((logo, index) => (
                        <div key={`${logo.name}-${index}`} className="relative h-8 w-auto min-w-[100px] flex items-center justify-center grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                            {/* Note: Using img tag for SVGs from external CDN to avoid Next.js config complexity for now, or Image if domain configured */}
                            <img
                                src={logo.src}
                                alt={logo.name}
                                className="h-8 w-auto object-contain max-w-[120px]"
                                loading="eager"
                            />
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
