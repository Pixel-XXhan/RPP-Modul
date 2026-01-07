'use client'

import { useResource } from './useResource'
import { api } from '@/lib/api'
import { KegiatanItem } from '@/types/database'

interface Kegiatan extends KegiatanItem {
    id: string
    nama: string
    rpp_id?: string
    user_id: string
    created_at: string
}

interface GenerateKegiatanInput {
    mapel: string
    topik: string
    kelas: string
    model_pembelajaran: string
    alokasi_waktu: number
}

interface GenerateKegiatanResult {
    model_pembelajaran: string
    alokasi_waktu: number
    kegiatan: KegiatanItem[]
}

export function useKegiatan() {
    const resource = useResource<Kegiatan>({ endpoint: '/api/v2/kegiatan' })

    const generateKegiatan = async (input: GenerateKegiatanInput) => {
        return api.post<GenerateKegiatanResult>('/api/v2/kegiatan/generate', input)
    }

    const bulkCreate = async (kegiatanList: Partial<Kegiatan>[]) => {
        return api.post<Kegiatan[]>('/api/v2/kegiatan/bulk', kegiatanList)
    }

    return {
        ...resource,
        generateKegiatan,
        bulkCreate,
    }
}
