'use client'

import { useResource, useStreaming } from './useResource'
import { ATP, AIGenerateRequest } from '@/types/database'
import { getProviderFromModel } from '@/lib/form-constants'
import { constructPrompt } from '@/lib/utils'

export function useATP() {
    const resource = useResource<ATP>({ endpoint: '/api/v2/atp' })
    const streaming = useStreaming()

    const generateWithStreaming = async (input: AIGenerateRequest & { capaian_pembelajaran?: string }) => {
        const provider = getProviderFromModel(input.model || '')
        const endpoint = provider === 'openrouter'
            ? '/api/v1/openrouter/chat/stream'
            : '/api/v2/atp/generate/stream'

        let payload = input
        if (provider === 'openrouter') {
            const prompt = constructPrompt('atp', input)
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
