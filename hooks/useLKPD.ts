'use client'

import { useResource } from './useResource'
import { LKPD, AIGenerateRequest } from '@/types/database'

export function useLKPD() {
    const resource = useResource<LKPD>({ endpoint: '/api/v2/lkpd' })

    const generateLKPD = async (input: AIGenerateRequest & { jenis_kegiatan?: string; durasi?: number }) => {
        return resource.generate(input)
    }

    return {
        ...resource,
        generateLKPD,
    }
}
