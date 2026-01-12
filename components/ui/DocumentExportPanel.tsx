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
            const { default: html2canvas } = await import('html2canvas');

            if (contentRef?.current) {
                const canvas = await html2canvas(contentRef.current, {
                    scale: 2,
                    useCORS: true,
                    logging: false,
                    backgroundColor: '#ffffff'
                });

                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF({
                    orientation: 'portrait',
                    unit: 'mm',
                    format: 'a4'
                });

                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = pdf.internal.pageSize.getHeight();
                const imgWidth = canvas.width;
                const imgHeight = canvas.height;
                const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
                const imgX = (pdfWidth - imgWidth * ratio) / 2;
                const imgY = 10;

                // Add multiple pages if content is tall
                let heightLeft = imgHeight * ratio;
                let position = 0;

                pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
                heightLeft -= pdfHeight;

                while (heightLeft > 0) {
                    position = heightLeft - imgHeight * ratio;
                    pdf.addPage();
                    pdf.addImage(imgData, 'PNG', imgX, position, imgWidth * ratio, imgHeight * ratio);
                    heightLeft -= pdfHeight;
                }

                const filename = `${title.replace(/\s+/g, '_')}_${documentType}_${new Date().toISOString().split('T')[0]}.pdf`;
                pdf.save(filename);
            }
        } catch (err) {
            console.error('PDF export failed:', err);
        } finally {
            setIsExporting(null);
        }
    };

    const handleExportDOCX = async () => {
        setIsExporting('docx');
        try {
            const { Document, Packer, Paragraph, TextRun, HeadingLevel } = await import('docx');
            const { saveAs } = await import('file-saver');

            // Parse markdown to create DOCX paragraphs
            const lines = content.split('\n');
            const children: any[] = [];

            for (const line of lines) {
                if (line.startsWith('# ')) {
                    children.push(new Paragraph({
                        text: line.slice(2),
                        heading: HeadingLevel.HEADING_1,
                    }));
                } else if (line.startsWith('## ')) {
                    children.push(new Paragraph({
                        text: line.slice(3),
                        heading: HeadingLevel.HEADING_2,
                    }));
                } else if (line.startsWith('### ')) {
                    children.push(new Paragraph({
                        text: line.slice(4),
                        heading: HeadingLevel.HEADING_3,
                    }));
                } else if (line.startsWith('- ') || line.startsWith('* ')) {
                    children.push(new Paragraph({
                        text: line.slice(2),
                        bullet: { level: 0 },
                    }));
                } else if (line.match(/^\d+\.\s/)) {
                    children.push(new Paragraph({
                        text: line.replace(/^\d+\.\s/, ''),
                        numbering: { reference: 'default-numbering', level: 0 },
                    }));
                } else if (line.startsWith('**') && line.endsWith('**')) {
                    children.push(new Paragraph({
                        children: [new TextRun({ text: line.slice(2, -2), bold: true })],
                    }));
                } else if (line.trim()) {
                    // Clean up markdown formatting
                    const cleanText = line
                        .replace(/\*\*([^*]+)\*\*/g, '$1')
                        .replace(/\*([^*]+)\*/g, '$1')
                        .replace(/`([^`]+)`/g, '$1');
                    children.push(new Paragraph({ text: cleanText }));
                } else {
                    children.push(new Paragraph({ text: '' }));
                }
            }

            const doc = new Document({
                sections: [{
                    properties: {},
                    children
                }]
            });

            const blob = await Packer.toBlob(doc);
            const filename = `${title.replace(/\s+/g, '_')}_${documentType}_${new Date().toISOString().split('T')[0]}.docx`;
            saveAs(blob, filename);
        } catch (err) {
            console.error('DOCX export failed:', err);
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
