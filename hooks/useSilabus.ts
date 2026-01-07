'use client'

import { useResource, useStreaming } from './useResource'
import { Silabus, AIGenerateRequest } from '@/types/database'

export function useSilabus() {
    const resource = useResource<Silabus>({ endpoint: '/api/v2/silabus' })
    const streaming = useStreaming()

    const generateWithStreaming = async (input: AIGenerateRequest & { semester?: number }) => {
        await streaming.startStreaming('/api/v2/silabus/generate/stream', input)
    }

    return {
        ...resource,
        streaming,
        generateWithStreaming,
    }
}
