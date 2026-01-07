"use client";

import { useState } from "react";
import { DashboardSidebar } from "@/components/dashboard/Sidebar";
import { DashboardHeader } from "@/components/dashboard/Header";
import { MobileNav } from "@/components/dashboard/MobileNav";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-background flex">
            {/* Desktop Sidebar */}
            <DashboardSidebar />

            {/* Mobile Navigation */}
            <MobileNav isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                <DashboardHeader onMobileMenuToggle={() => setMobileMenuOpen(true)} />

                <main className="flex-1 p-4 lg:p-6 overflow-x-hidden">
                    {children}
                </main>
            </div>
        </div>
    );
}
