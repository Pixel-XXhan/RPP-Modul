'use client'

import { useResource, useStreaming } from './useResource'
import { Materi, AIGenerateRequest } from '@/types/database'

export function useMateri() {
    const resource = useResource<Materi>({ endpoint: '/api/v2/materi' })
    const streaming = useStreaming()

    const generateWithStreaming = async (input: AIGenerateRequest) => {
        await streaming.startStreaming('/api/v2/materi/generate/stream', input)
    }

    return {
        ...resource,
        streaming,
        generateWithStreaming,
    }
}
