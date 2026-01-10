'use client'

import { useResource, useStreaming } from './useResource'
import { Asesmen } from '@/types/database'
import { getProviderFromModel } from '@/lib/form-constants'
import { constructPrompt } from '@/lib/utils'

interface GenerateAsesmenInput {
    mapel: string
    topik: string
    kelas: string
    jenis: 'diagnostik' | 'formatif' | 'sumatif'
    model?: string
}

export function useAsesmen() {
    const resource = useResource<Asesmen>({ endpoint: '/api/v2/asesmen' })
    const streaming = useStreaming()

    const generateWithStreaming = async (input: GenerateAsesmenInput) => {
        const provider = getProviderFromModel(input.model || '')
        const endpoint = provider === 'openrouter'
            ? '/api/v1/openrouter/chat/stream'
            : '/api/v2/asesmen/generate/stream'

        let payload = input
        if (provider === 'openrouter') {
            const prompt = constructPrompt('asesmen', input as any)
            payload = {
                model: input.model,
                messages: [{ role: 'user', content: prompt }],
                stream: true
            } as any
        }

        await streaming.startStreaming(endpoint, payload as any)
    }

    return {
        ...resource,
        streaming,
        generateWithStreaming,
    }
}
