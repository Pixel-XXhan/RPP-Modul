import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { NoiseOverlay } from "@/components/ui/noise-overlay";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Katedra - Administrasi Selesai, Inspirasi Dimulai",
  description: "Platform AI premium untuk menyusun Modul Ajar Kurikulum Merdeka dengan presisi tinggi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${inter.variable} ${playfair.variable} antialiased`}
      >
        <SmoothScroll>
          <NoiseOverlay />
          <Navbar />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
