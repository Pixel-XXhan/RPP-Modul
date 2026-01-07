'use client'

import { useState, useCallback } from 'react'
import { api } from '@/lib/api'
import { Media, MediaStatistics } from '@/types/database'
import { useResource } from './useResource'

interface RecommendMediaInput {
    mapel: string
    topik: string
    kelas: string
}

export function useMedia() {
    const resource = useResource<Media>({ endpoint: '/api/v2/media' })
    const [statistics, setStatistics] = useState<MediaStatistics | null>(null)
    const [statsLoading, setStatsLoading] = useState(false)

    const fetchStatistics = useCallback(async () => {
        setStatsLoading(true)
        try {
            const stats = await api.get<MediaStatistics>('/api/v2/media/statistics')
            setStatistics(stats)
        } catch (err) {
            console.error('Failed to fetch statistics:', err)
        } finally {
            setStatsLoading(false)
        }
    }, [])

    const getRecommendations = async (input: RecommendMediaInput) => {
        return api.post<Media[]>('/api/v2/media/recommend', input)
    }

    return {
        ...resource,
        statistics,
        statsLoading,
        fetchStatistics,
        getRecommendations,
    }
}
