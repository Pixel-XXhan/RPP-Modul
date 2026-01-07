"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";
import { cn } from "@/lib/utils";

interface OptimizedImageProps extends Omit<ImageProps, 'onLoadingComplete'> {
    skeletonClassName?: string;
}

export function OptimizedImage({
    className,
    skeletonClassName,
    alt,
    ...props
}: OptimizedImageProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    return (
        <div className={cn("relative overflow-hidden", className)}>
            {/* Skeleton Loader */}
            {isLoading && !hasError && (
                <div
                    className={cn(
                        "absolute inset-0 bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 dark:from-neutral-800 dark:via-neutral-700 dark:to-neutral-800 animate-pulse",
                        skeletonClassName
                    )}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                </div>
            )}

            {/* Error State */}
            {hasError && (
                <div className="absolute inset-0 bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                        <svg className="w-8 h-8 mx-auto mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-xs">Gagal memuat</span>
                    </div>
                </div>
            )}

            {/* Actual Image */}
            <Image
                {...props}
                alt={alt}
                className={cn(
                    "transition-opacity duration-300",
                    isLoading ? "opacity-0" : "opacity-100",
                    className
                )}
                onLoad={() => setIsLoading(false)}
                onError={() => {
                    setIsLoading(false);
                    setHasError(true);
                }}
            />
        </div>
    );
}

// Card Skeleton for loading states
export function CardSkeleton({ className }: { className?: string }) {
    return (
        <div className={cn(
            "bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 animate-pulse",
            className
        )}>
            <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-neutral-200 dark:bg-neutral-700" />
                <div className="flex-1 space-y-2">
                    <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-3/4" />
                    <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-1/2" />
                </div>
            </div>
            <div className="mt-4 space-y-2">
                <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded" />
                <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-5/6" />
            </div>
        </div>
    );
}

// Page Skeleton for full page loading
export function PageSkeleton() {
    return (
        <div className="space-y-6 animate-pulse">
            {/* Header skeleton */}
            <div className="space-y-2">
                <div className="h-8 bg-neutral-200 dark:bg-neutral-700 rounded w-1/3" />
                <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-1/2" />
            </div>

            {/* Cards grid skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                    <CardSkeleton key={i} />
                ))}
            </div>
        </div>
    );
}

// Table Skeleton
export function TableSkeleton({ rows = 5 }: { rows?: number }) {
    return (
        <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden animate-pulse">
            {/* Header */}
            <div className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-800">
                <div className="flex gap-4">
                    <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-1/4" />
                    <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-1/6" />
                    <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-1/6" />
                    <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-1/6" />
                </div>
            </div>
            {/* Rows */}
            {Array.from({ length: rows }).map((_, i) => (
                <div key={i} className="px-6 py-4 border-b border-neutral-100 dark:border-neutral-800 last:border-0">
                    <div className="flex gap-4 items-center">
                        <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-1/3" />
                        <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-1/6" />
                        <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-1/6" />
                        <div className="h-6 bg-neutral-200 dark:bg-neutral-700 rounded-full w-16" />
                    </div>
                </div>
            ))}
        </div>
    );
}
