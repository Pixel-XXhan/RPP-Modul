'use client'

import { useState, useCallback } from 'react'
import { useResource, useStreaming } from './useResource'
import { api } from '@/lib/api'
import { getProviderFromModel } from '@/lib/form-constants'
import { constructPrompt } from '@/lib/utils'
import { BankSoal, BankSoalStatistics, TipeSoal, TingkatKesulitan } from '@/types/database'

interface GenerateSoalInput {
    mapel: string
    topik: string
    kelas: string
    tipe: TipeSoal
    tingkat_kesulitan: TingkatKesulitan
    jumlah: number
    model?: string
    save_to_db?: boolean
}

export function useBankSoal() {
    const resource = useResource<BankSoal>({ endpoint: '/api/v2/bank-soal' })
    const streaming = useStreaming()
    const [statistics, setStatistics] = useState<BankSoalStatistics | null>(null)
    const [statsLoading, setStatsLoading] = useState(false)

    const fetchStatistics = useCallback(async () => {
        setStatsLoading(true)
        try {
            const stats = await api.get<BankSoalStatistics>('/api/v2/bank-soal/statistics')
            setStatistics(stats)
        } catch (err) {
            console.error('Failed to fetch statistics:', err)
        } finally {
            setStatsLoading(false)
        }
    }, [])

    const generateSoal = async (input: GenerateSoalInput) => {
        const provider = getProviderFromModel(input.model || '')
        const endpoint = provider === 'openrouter'
            ? '/api/v1/openrouter/chat' // POST (non-stream)
            : '/api/v2/bank-soal/generate'

        let payload = input
        if (provider === 'openrouter') {
            const prompt = constructPrompt('bank_soal', input as any)
            payload = {
                model: input.model,
                messages: [{ role: 'user', content: prompt }],
                stream: false
            } as any
        }

        return api.post<{ count: number; soal: BankSoal[] }>(endpoint, payload)
    }

    const generateWithStreaming = async (input: GenerateSoalInput) => {
        const provider = getProviderFromModel(input.model || '')
        const endpoint = provider === 'openrouter'
            ? '/api/v1/openrouter/chat/stream'
            : '/api/v2/bank-soal/generate/stream'

        let payload = input
        if (provider === 'openrouter') {
            const prompt = constructPrompt('bank_soal', input as any)
            payload = {
                model: input.model,
                messages: [{ role: 'user', content: prompt }],
                stream: true
            } as any
        }

        await streaming.startStreaming(endpoint, payload as any)
    }

    const bulkCreate = async (soal: Partial<BankSoal>[]) => {
        return api.post<BankSoal[]>('/api/v2/bank-soal/bulk', soal)
    }

    return {
        ...resource,
        statistics,
        statsLoading,
        streaming,
        fetchStatistics,
        generateSoal,
        generateWithStreaming,
        bulkCreate,
    }
}
