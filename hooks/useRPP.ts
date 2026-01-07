'use client'

import { useResource, useStreaming } from './useResource'
import { RPP, AIGenerateRequest } from '@/types/database'

export function useRPP() {
    const resource = useResource<RPP>({ endpoint: '/api/v2/rpp' })
    const streaming = useStreaming()

    const generateWithStreaming = async (input: AIGenerateRequest) => {
        await streaming.startStreaming('/api/v2/rpp/generate/stream', input)
    }

    return {
        ...resource,
        streaming,
        generateWithStreaming,
    }
}
