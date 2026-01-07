'use client'

import { useResource } from './useResource'
import { KisiKisi } from '@/types/database'

interface GenerateKisiKisiInput {
    mapel: string
    topik: string
    kelas: string
    jenis_ujian: 'Ulangan Harian' | 'PTS' | 'PAS' | 'PAT'
    jumlah_soal: number
}

export function useKisiKisi() {
    const resource = useResource<KisiKisi>({ endpoint: '/api/v2/kisi-kisi' })

    const generateKisiKisi = async (input: GenerateKisiKisiInput) => {
        return resource.generate(input)
    }

    return {
        ...resource,
        generateKisiKisi,
    }
}
