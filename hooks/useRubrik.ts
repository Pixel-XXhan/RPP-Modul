'use client'

import { useResource } from './useResource'
import { Rubrik } from '@/types/database'

interface GenerateRubrikInput {
    mapel: string
    topik: string
    kelas: string
    jenis_penilaian: 'sikap' | 'pengetahuan' | 'keterampilan' | 'proyek' | 'portofolio'
    skala: '1-4' | '1-100' | 'A-E'
}

export function useRubrik() {
    const resource = useResource<Rubrik>({ endpoint: '/api/v2/rubrik' })

    const generateRubrik = async (input: GenerateRubrikInput) => {
        return resource.generate(input)
    }

    return {
        ...resource,
        generateRubrik,
    }
}
