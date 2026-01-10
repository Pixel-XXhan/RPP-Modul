'use client'

import { useResource, useStreaming } from './useResource'
import { Silabus, AIGenerateRequest } from '@/types/database'
import { getProviderFromModel } from '@/lib/form-constants'
import { constructPrompt } from '@/lib/utils'

export function useSilabus() {
    const resource = useResource<Silabus>({ endpoint: '/api/v2/silabus' })
    const streaming = useStreaming()

    const generateWithStreaming = async (input: AIGenerateRequest & { semester?: number }) => {
        const provider = getProviderFromModel(input.model || '')
        const endpoint = provider === 'openrouter'
            ? '/api/v1/openrouter/chat/stream'
            : '/api/v2/silabus/generate/stream'

        let payload = input
        if (provider === 'openrouter') {
            const prompt = constructPrompt('silabus', input)
            payload = {
                model: input.model,
                messages: [{ role: 'user', content: prompt }],
                stream: true
            } as any
        }

        await streaming.startStreaming(endpoint, payload)
    }

    return {
        ...resource,
        streaming,
        generateWithStreaming,
    }
}
