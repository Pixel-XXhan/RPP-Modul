"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { LogOut, Loader2 } from "lucide-react";

interface LogoutConfirmDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    trigger?: React.ReactNode;
}

export function LogoutConfirmDialog({ open, onOpenChange, trigger }: LogoutConfirmDialogProps) {
    const { signOut } = useAuth();
    const [loading, setLoading] = useState(false);

    const handleLogout = async () => {
        setLoading(true);
        await signOut();
        // No need to set loading false as we redirect
    };

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            {trigger && trigger}
            <AlertDialogContent className="rounded-2xl max-w-sm">
                <AlertDialogHeader>
                    <div className="mx-auto w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-2 text-red-600">
                        <LogOut size={24} />
                    </div>
                    <AlertDialogTitle className="text-center">Yakin ingin keluar?</AlertDialogTitle>
                    <AlertDialogDescription className="text-center">
                        Anda harus masuk kembali untuk mengakses dokumen dan fitur lainnya.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="sm:justify-center gap-2">
                    <AlertDialogCancel className="w-full rounded-xl sm:w-auto mt-0 border-neutral-200">
                        Batal
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={(e) => {
                            e.preventDefault();
                            handleLogout();
                        }}
                        className="w-full rounded-xl sm:w-auto bg-red-600 hover:bg-red-700 text-white"
                        disabled={loading}
                    >
                        {loading ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : null}
                        {loading ? "Keluar..." : "Ya, Keluar"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
