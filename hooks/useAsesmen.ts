'use client'

import { useResource } from './useResource'
import { Asesmen } from '@/types/database'

interface GenerateAsesmenInput {
    mapel: string
    topik: string
    kelas: string
    jenis: 'diagnostik' | 'formatif' | 'sumatif'
}

export function useAsesmen() {
    const resource = useResource<Asesmen>({ endpoint: '/api/v2/asesmen' })

    const generateAsesmen = async (input: GenerateAsesmenInput) => {
        return resource.generate(input)
    }

    return {
        ...resource,
        generateAsesmen,
    }
}
