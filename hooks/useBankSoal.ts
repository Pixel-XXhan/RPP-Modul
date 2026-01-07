'use client'

import { useState, useCallback } from 'react'
import { useResource } from './useResource'
import { api } from '@/lib/api'
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
        return api.post<{ count: number; soal: BankSoal[] }>('/api/v2/bank-soal/generate', input)
    }

    const bulkCreate = async (soal: Partial<BankSoal>[]) => {
        return api.post<BankSoal[]>('/api/v2/bank-soal/bulk', soal)
    }

    return {
        ...resource,
        statistics,
        statsLoading,
        fetchStatistics,
        generateSoal,
        bulkCreate,
    }
}
