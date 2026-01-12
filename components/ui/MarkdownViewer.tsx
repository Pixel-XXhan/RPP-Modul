'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { Copy, Check } from 'lucide-react';

interface MarkdownViewerProps {
    content: string;
    className?: string;
}

export function MarkdownViewer({ content, className }: MarkdownViewerProps) {
    const { resolvedTheme } = useTheme();
    const [copiedCode, setCopiedCode] = React.useState<string | null>(null);

    // Fix: Replace HTML <br> tags with Markdown newlines to prevent raw tag display
    const processedContent = content.replace(/<br\s*\/?>/gi, '\n');

    const copyToClipboard = async (code: string) => {
        try {
            await navigator.clipboard.writeText(code);
            setCopiedCode(code);
            setTimeout(() => setCopiedCode(null), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <div className={cn("prose prose-emerald dark:prose-invert max-w-none w-full", className)}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
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
                    // Code blocks with syntax highlighting
                    code: ({ node, className, children, ...props }) => {
                        const match = /language-(\w+)/.exec(className || '');
                        const codeString = String(children).replace(/\n$/, '');

                        // Inline code
                        if (!match) {
                            return (
                                <code
                                    className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-primary"
                                    {...props}
                                >
                                    {children}
                                </code>
                            );
                        }

                        // Code block with syntax highlighting
                        return (
                            <div className="relative group my-4">
                                <div className="absolute right-2 top-2 z-10">
                                    <button
                                        onClick={() => copyToClipboard(codeString)}
                                        className="p-1.5 rounded-md bg-background/80 hover:bg-background border border-border opacity-0 group-hover:opacity-100 transition-opacity"
                                        title="Copy code"
                                    >
                                        {copiedCode === codeString ? (
                                            <Check className="h-4 w-4 text-green-500" />
                                        ) : (
                                            <Copy className="h-4 w-4 text-muted-foreground" />
                                        )}
                                    </button>
                                </div>
                                <div className="absolute left-3 top-2 text-xs text-muted-foreground font-mono uppercase">
                                    {match[1]}
                                </div>
                                <SyntaxHighlighter
                                    style={resolvedTheme === 'dark' ? oneDark : oneLight}
                                    language={match[1]}
                                    PreTag="div"
                                    className="!mt-0 !rounded-lg !pt-8"
                                    showLineNumbers
                                    wrapLines
                                    customStyle={{
                                        margin: 0,
                                        borderRadius: '0.5rem',
                                        fontSize: '0.875rem',
                                    }}
                                >
                                    {codeString}
                                </SyntaxHighlighter>
                            </div>
                        );
                    },
                    // Pre tag - let code handle the styling
                    pre: ({ node, children, ...props }) => (
                        <div className="not-prose">
                            {children}
                        </div>
                    ),
                    // Style list items
                    ul: ({ node, ...props }) => (
                        <ul className="list-disc pl-6 space-y-1 my-2" {...props} />
                    ),
                    ol: ({ node, ...props }) => (
                        <ol className="list-decimal pl-6 space-y-1 my-2" {...props} />
                    ),
                    li: ({ node, ...props }) => (
                        <li className="text-foreground" {...props} />
                    ),
                    // Style headings
                    h1: ({ node, ...props }) => (
                        <h1 className="text-2xl font-bold text-foreground mt-6 mb-4" {...props} />
                    ),
                    h2: ({ node, ...props }) => (
                        <h2 className="text-xl font-bold text-foreground mt-5 mb-3" {...props} />
                    ),
                    h3: ({ node, ...props }) => (
                        <h3 className="text-lg font-semibold text-foreground mt-4 mb-2" {...props} />
                    ),
                    // Paragraphs
                    p: ({ node, ...props }) => (
                        <p className="text-foreground my-2 leading-relaxed" {...props} />
                    ),
                    // Blockquotes
                    blockquote: ({ node, ...props }) => (
                        <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground my-4" {...props} />
                    ),
                    // Horizontal rules
                    hr: ({ node, ...props }) => (
                        <hr className="border-border my-6" {...props} />
                    ),
                    // Strong/bold
                    strong: ({ node, ...props }) => (
                        <strong className="font-bold text-foreground" {...props} />
                    ),
                    // Emphasis/italic
                    em: ({ node, ...props }) => (
                        <em className="italic text-foreground" {...props} />
                    ),
                }}
            >
                {processedContent}
            </ReactMarkdown>
        </div>
    );
}
