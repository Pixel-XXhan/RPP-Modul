'use client';

import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import {
    Download,
    FileText,
    Printer,
    Copy,
    Check,
    Loader2,
    FileDown
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface DocumentExportPanelProps {
    content: string;
    title: string;
    documentType: string;
    className?: string;
    contentRef?: React.RefObject<HTMLDivElement | null>;
}

export function DocumentExportPanel({
    content,
    title,
    documentType,
    className,
    contentRef
}: DocumentExportPanelProps) {
    const [isExporting, setIsExporting] = useState<'pdf' | 'docx' | null>(null);
    const [copied, setCopied] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    const handleCopyText = async () => {
        try {
            // Strip markdown formatting for plain text
            const plainText = content
                .replace(/#{1,6}\s/g, '')
                .replace(/\*\*([^*]+)\*\*/g, '$1')
                .replace(/\*([^*]+)\*/g, '$1')
                .replace(/`([^`]+)`/g, '$1')
                .replace(/```[\s\S]*?```/g, '')
                .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
                .replace(/^\s*[-*+]\s/gm, '• ')
                .replace(/^\s*\d+\.\s/gm, '')
                .trim();

            await navigator.clipboard.writeText(plainText);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const handlePrint = () => {
        if (contentRef?.current) {
            const printWindow = window.open('', '_blank');
            if (printWindow) {
                printWindow.document.write(`
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <title>${title}</title>
                        <style>
                            body {
                                font-family: 'Times New Roman', Times, serif;
                                font-size: 12pt;
                                line-height: 1.6;
                                margin: 3cm 2.5cm 2.5cm 3cm;
                                color: #000;
                            }
                            h1 { font-size: 16pt; font-weight: bold; margin-bottom: 12pt; }
                            h2 { font-size: 14pt; font-weight: bold; margin-top: 12pt; margin-bottom: 8pt; }
                            h3 { font-size: 12pt; font-weight: bold; margin-top: 10pt; margin-bottom: 6pt; }
                            p { margin-bottom: 6pt; text-align: justify; }
                            ul, ol { margin-left: 20pt; margin-bottom: 6pt; }
                            li { margin-bottom: 3pt; }
                            table { border-collapse: collapse; width: 100%; margin: 12pt 0; }
                            th, td { border: 1px solid #000; padding: 6pt; text-align: left; }
                            th { background-color: #f0f0f0; font-weight: bold; }
                            pre, code { font-family: 'Courier New', monospace; font-size: 10pt; }
                            @media print {
                                body { margin: 0; }
                                @page { margin: 3cm 2.5cm 2.5cm 3cm; }
                            }
                        </style>
                    </head>
                    <body>
                        ${contentRef.current.innerHTML}
                    </body>
                    </html>
                `);
                printWindow.document.close();
                printWindow.focus();
                setTimeout(() => {
                    printWindow.print();
                    printWindow.close();
                }, 250);
            }
        }
    };

    const handleExportPDF = async () => {
        setIsExporting('pdf');
        try {
            const { default: jsPDF } = await import('jspdf');

            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });

            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
            const margin = 20;
            const maxWidth = pageWidth - margin * 2;
            let yPosition = margin;

            // Helper function to add text with word wrap
            const addText = (text: string, fontSize: number, isBold: boolean = false) => {
                pdf.setFontSize(fontSize);
                if (isBold) {
                    pdf.setFont('helvetica', 'bold');
                } else {
                    pdf.setFont('helvetica', 'normal');
                }

                const lines = pdf.splitTextToSize(text, maxWidth);
                const lineHeight = fontSize * 0.4;

                for (const line of lines) {
                    if (yPosition + lineHeight > pageHeight - margin) {
                        pdf.addPage();
                        yPosition = margin;
                    }
                    pdf.text(line, margin, yPosition);
                    yPosition += lineHeight;
                }
            };

            // Add title
            pdf.setFontSize(18);
            pdf.setFont('helvetica', 'bold');
            pdf.text(title, margin, yPosition);
            yPosition += 12;

            // Add date
            pdf.setFontSize(10);
            pdf.setFont('helvetica', 'normal');
            pdf.text(`Dibuat: ${new Date().toLocaleDateString('id-ID')}`, margin, yPosition);
            yPosition += 8;

            // Draw separator line
            pdf.setDrawColor(0, 0, 0);
            pdf.line(margin, yPosition, pageWidth - margin, yPosition);
            yPosition += 8;

            // Parse and render content
            const lines = content.split('\n');

            for (const line of lines) {
                const trimmedLine = line.trim();

                if (!trimmedLine) {
                    yPosition += 4;
                    continue;
                }

                // Remove markdown bold/italic markers for text
                const cleanText = trimmedLine
                    .replace(/\*\*([^*]+)\*\*/g, '$1')
                    .replace(/\*([^*]+)\*/g, '$1')
                    .replace(/`([^`]+)`/g, '$1')
                    .replace(/^#+\s*/, '');

                if (trimmedLine.startsWith('# ')) {
                    yPosition += 4;
                    addText(cleanText, 16, true);
                    yPosition += 2;
                } else if (trimmedLine.startsWith('## ')) {
                    yPosition += 3;
                    addText(cleanText, 14, true);
                    yPosition += 2;
                } else if (trimmedLine.startsWith('### ')) {
                    yPosition += 2;
                    addText(cleanText, 12, true);
                    yPosition += 1;
                } else if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('* ')) {
                    addText('• ' + trimmedLine.slice(2), 11);
                } else if (trimmedLine.match(/^\d+\.\s/)) {
                    addText(trimmedLine, 11);
                } else {
                    addText(cleanText, 11);
                }
            }

            const filename = `${title.replace(/\s+/g, '_')}_${documentType}_${new Date().toISOString().split('T')[0]}.pdf`;
            pdf.save(filename);
        } catch (err) {
            console.error('PDF export failed:', err);
            alert('Gagal export PDF. Silakan coba Print ke PDF.');
        } finally {
            setIsExporting(null);
        }
    };


    const handleExportDOCX = async () => {
        setIsExporting('docx');
        try {
            const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle } = await import('docx');
            const { saveAs } = await import('file-saver');

            // Parse markdown to create DOCX paragraphs
            const lines = content.split('\n');
            const children: any[] = [];

            // Add document title
            children.push(new Paragraph({
                children: [new TextRun({ text: title, bold: true, size: 32 })],
                alignment: AlignmentType.CENTER,
                spacing: { after: 200 }
            }));

            // Add date
            children.push(new Paragraph({
                children: [new TextRun({ text: `Dibuat: ${new Date().toLocaleDateString('id-ID')}`, size: 20, italics: true })],
                alignment: AlignmentType.CENTER,
                spacing: { after: 400 }
            }));

            // Add separator
            children.push(new Paragraph({
                border: { bottom: { style: BorderStyle.SINGLE, size: 1, color: '000000' } },
                spacing: { after: 200 }
            }));

            // Helper to parse inline bold/italic
            const parseInlineFormatting = (text: string): any[] => {
                const runs: any[] = [];
                let remaining = text;

                // Simple regex to find **bold** and *italic* patterns
                const pattern = /(\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`)/g;
                let lastIndex = 0;
                let match;

                while ((match = pattern.exec(text)) !== null) {
                    // Add text before the match
                    if (match.index > lastIndex) {
                        runs.push(new TextRun({ text: text.slice(lastIndex, match.index), size: 22 }));
                    }

                    // Add formatted text
                    if (match[2]) {
                        // Bold
                        runs.push(new TextRun({ text: match[2], bold: true, size: 22 }));
                    } else if (match[3]) {
                        // Italic
                        runs.push(new TextRun({ text: match[3], italics: true, size: 22 }));
                    } else if (match[4]) {
                        // Code
                        runs.push(new TextRun({ text: match[4], font: 'Courier New', size: 20 }));
                    }

                    lastIndex = match.index + match[0].length;
                }

                // Add remaining text
                if (lastIndex < text.length) {
                    runs.push(new TextRun({ text: text.slice(lastIndex), size: 22 }));
                }

                return runs.length > 0 ? runs : [new TextRun({ text, size: 22 })];
            };

            for (const line of lines) {
                const trimmedLine = line.trim();

                if (trimmedLine.startsWith('# ')) {
                    children.push(new Paragraph({
                        text: trimmedLine.slice(2),
                        heading: HeadingLevel.HEADING_1,
                        spacing: { before: 300, after: 150 }
                    }));
                } else if (trimmedLine.startsWith('## ')) {
                    children.push(new Paragraph({
                        text: trimmedLine.slice(3),
                        heading: HeadingLevel.HEADING_2,
                        spacing: { before: 240, after: 120 }
                    }));
                } else if (trimmedLine.startsWith('### ')) {
                    children.push(new Paragraph({
                        text: trimmedLine.slice(4),
                        heading: HeadingLevel.HEADING_3,
                        spacing: { before: 180, after: 100 }
                    }));
                } else if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('* ')) {
                    children.push(new Paragraph({
                        children: parseInlineFormatting(trimmedLine.slice(2)),
                        bullet: { level: 0 },
                        spacing: { after: 60 }
                    }));
                } else if (trimmedLine.match(/^\d+\.\s/)) {
                    const textContent = trimmedLine.replace(/^\d+\.\s/, '');
                    children.push(new Paragraph({
                        children: parseInlineFormatting(textContent),
                        numbering: { reference: 'default-numbering', level: 0 },
                        spacing: { after: 60 }
                    }));
                } else if (trimmedLine) {
                    children.push(new Paragraph({
                        children: parseInlineFormatting(trimmedLine),
                        spacing: { after: 100 }
                    }));
                } else {
                    children.push(new Paragraph({ text: '', spacing: { after: 100 } }));
                }
            }

            const doc = new Document({
                numbering: {
                    config: [{
                        reference: 'default-numbering',
                        levels: [{
                            level: 0,
                            format: 'decimal',
                            text: '%1.',
                            alignment: AlignmentType.START
                        }]
                    }]
                },
                sections: [{
                    properties: {
                        page: {
                            margin: {
                                top: 1440,
                                right: 1440,
                                bottom: 1440,
                                left: 1440
                            }
                        }
                    },
                    children
                }]
            });

            const blob = await Packer.toBlob(doc);
            const filename = `${title.replace(/\s+/g, '_')}_${documentType}_${new Date().toISOString().split('T')[0]}.docx`;
            saveAs(blob, filename);
        } catch (err) {
            console.error('DOCX export failed:', err);
            alert('Gagal export DOCX. Silakan coba lagi.');
        } finally {
            setIsExporting(null);
        }
    };


    return (
        <div className={cn("flex flex-wrap gap-2", className)}>
            {/* Copy Text Button */}
            <Button
                variant="outline"
                size="sm"
                onClick={handleCopyText}
                disabled={!content}
                className="gap-2"
            >
                {copied ? (
                    <>
                        <Check className="h-4 w-4 text-green-500" />
                        <span>Tersalin!</span>
                    </>
                ) : (
                    <>
                        <Copy className="h-4 w-4" />
                        <span>Salin Teks</span>
                    </>
                )}
            </Button>

            {/* Print Button */}
            <Button
                variant="outline"
                size="sm"
                onClick={handlePrint}
                disabled={!content || !contentRef?.current}
                className="gap-2"
            >
                <Printer className="h-4 w-4" />
                <span>Cetak</span>
            </Button>

            {/* PDF Export Button */}
            <Button
                variant="outline"
                size="sm"
                onClick={handleExportPDF}
                disabled={!content || isExporting !== null || !contentRef?.current}
                className="gap-2"
            >
                {isExporting === 'pdf' ? (
                    <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Membuat PDF...</span>
                    </>
                ) : (
                    <>
                        <FileDown className="h-4 w-4" />
                        <span>Unduh PDF</span>
                    </>
                )}
            </Button>

            {/* DOCX Export Button */}
            <Button
                variant="outline"
                size="sm"
                onClick={handleExportDOCX}
                disabled={!content || isExporting !== null}
                className="gap-2"
            >
                {isExporting === 'docx' ? (
                    <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Membuat DOCX...</span>
                    </>
                ) : (
                    <>
                        <FileText className="h-4 w-4" />
                        <span>Unduh Word</span>
                    </>
                )}
            </Button>
        </div>
    );
}
