'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from '@/lib/utils';

interface MarkdownViewerProps {
    content: string;
    className?: string;
}

export function MarkdownViewer({ content, className }: MarkdownViewerProps) {
    return (
        <div className={cn("prose prose-emerald dark:prose-invert max-w-none w-full", className)}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    // Override table styles to ensure they look good
                    table: ({ node, ...props }) => (
                        <div className="overflow-x-auto my-4 rounded-lg border border-border">
                            <table className="w-full text-sm text-left border-collapse" {...props} />
                        </div>
                    ),
                    thead: ({ node, ...props }) => (
                        <thead className="bg-muted text-muted-foreground uppercase text-xs" {...props} />
                    ),
                    th: ({ node, ...props }) => (
                        <th className="px-6 py-3 font-medium border-b border-border" {...props} />
                    ),
                    td: ({ node, ...props }) => (
                        <td className="px-6 py-4 border-b border-border/50" {...props} />
                    ),
                    // Style links
                    a: ({ node, ...props }) => (
                        <a className="text-primary hover:underline font-medium" {...props} />
                    ),
                    // Style code blocks
                    pre: ({ node, ...props }) => (
                        <pre className="bg-muted p-4 rounded-lg overflow-x-auto" {...props} />
                    ),
                    code: ({ node, ...props }) => (
                        <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-primary" {...props} />
                    )
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}
