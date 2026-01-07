import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { NoiseOverlay } from "@/components/ui/noise-overlay";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function LandingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SmoothScroll>
            <NoiseOverlay />
            <Navbar />
            {children}
            <Footer />
        </SmoothScroll>
    );
}
