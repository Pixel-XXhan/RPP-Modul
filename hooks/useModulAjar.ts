'use client'

import { useResource, useStreaming } from './useResource'
import { ModulAjar, AIGenerateRequest } from '@/types/database'

export function useModulAjar() {
    const resource = useResource<ModulAjar>({ endpoint: '/api/v2/modul-ajar' })
    const streaming = useStreaming()

    const generateWithStreaming = async (input: AIGenerateRequest) => {
        await streaming.startStreaming('/api/v2/modul-ajar/generate/stream', input)
    }

    return {
        ...resource,
        streaming,
        generateWithStreaming,
    }
}
