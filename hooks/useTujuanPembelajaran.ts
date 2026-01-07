'use client'

import { useResource } from './useResource'
import { api } from '@/lib/api'
import { TujuanPembelajaran } from '@/types/database'

interface GenerateTPInput {
    mapel: string
    topik: string
    kelas: string
    capaian_pembelajaran?: string
    jumlah?: number
}

export function useTujuanPembelajaran() {
    const resource = useResource<TujuanPembelajaran>({ endpoint: '/api/v2/tp' })

    const generateTP = async (input: GenerateTPInput) => {
        return resource.generate(input)
    }

    const bulkCreate = async (tpList: Partial<TujuanPembelajaran>[]) => {
        return api.post<TujuanPembelajaran[]>('/api/v2/tp/bulk', tpList)
    }

    return {
        ...resource,
        generateTP,
        bulkCreate,
    }
}
