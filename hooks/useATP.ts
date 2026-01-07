'use client'

import { useResource } from './useResource'
import { ATP, AIGenerateRequest } from '@/types/database'

export function useATP() {
    const resource = useResource<ATP>({ endpoint: '/api/v2/atp' })

    const generateATP = async (input: AIGenerateRequest & { capaian_pembelajaran?: string }) => {
        return resource.generate(input)
    }

    return {
        ...resource,
        generateATP,
    }
}
