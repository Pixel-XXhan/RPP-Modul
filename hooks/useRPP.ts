'use client'

import { useResource, useStreaming } from './useResource'
import { RPP, AIGenerateRequest } from '@/types/database'
import { getProviderFromModel } from '@/lib/form-constants'
import { constructPrompt } from '@/lib/utils'

export function useRPP() {
    const resource = useResource<RPP>({ endpoint: '/api/v2/rpp' })
    const streaming = useStreaming()

    const generateWithStreaming = async (input: AIGenerateRequest) => {
        const provider = getProviderFromModel(input.model || '')
        const endpoint = provider === 'openrouter'
            ? '/api/v1/openrouter/chat/stream'
            : '/api/v2/rpp/generate/stream'

        let payload = input
        if (provider === 'openrouter') {
            const prompt = constructPrompt('rpp', input)
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
