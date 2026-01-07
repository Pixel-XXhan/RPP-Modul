'use client'

import { useCallback, useState } from 'react'
import { api } from '@/lib/api'
import { CapaianPembelajaran } from '@/types/database'
import { useResource } from './useResource'

interface CPLookupInput {
    mapel: string
    fase: string
}

interface CPLookupResult {
    mapel: string
    fase: string
    deskripsi_fase: string
    elemen: {
        nama: string
        deskripsi: string
        sub_elemen?: string[]
    }[]
    ai_response?: { model: string }
}

export function useCapaianPembelajaran() {
    const resource = useResource<CapaianPembelajaran>({ endpoint: '/api/v2/cp' })
    const [lookupResult, setLookupResult] = useState<CPLookupResult | null>(null)
    const [lookupLoading, setLookupLoading] = useState(false)

    const lookup = useCallback(async (input: CPLookupInput) => {
        setLookupLoading(true)
        try {
            const result = await api.post<CPLookupResult>('/api/v2/cp/lookup', input)
            setLookupResult(result)
            return result
        } finally {
            setLookupLoading(false)
        }
    }, [])

    return {
        ...resource,
        lookupResult,
        lookupLoading,
        lookup,
    }
}
