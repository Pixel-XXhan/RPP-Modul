'use client'

import { useState, useCallback } from 'react'
import { api } from '@/lib/api'
import { ExportRequest, ExportResponse } from '@/types/database'

export function useExport() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const exportDocument = useCallback(async (request: ExportRequest) => {
        setLoading(true)
        setError(null)
        try {
            const result = await api.post<ExportResponse>('/api/v2/export/document', request)
            // Open download URL in new tab
            window.open(result.download_url, '_blank')
            return result
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Export gagal')
            throw err
        } finally {
            setLoading(false)
        }
    }, [])

    const generateAndExport = useCallback(async (request: {
        mapel: string
        topik: string
        kelas: string
        document_type: ExportRequest['document_type']
        format: ExportRequest['format']
        kurikulum?: string
        alokasi_waktu?: number
    }) => {
        setLoading(true)
        setError(null)
        try {
            const result = await api.post<ExportResponse>('/api/v2/export/generate', request)
            window.open(result.download_url, '_blank')
            return result
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Export gagal')
            throw err
        } finally {
            setLoading(false)
        }
    }, [])

    return {
        loading,
        error,
        exportDocument,
        generateAndExport,
    }
}
