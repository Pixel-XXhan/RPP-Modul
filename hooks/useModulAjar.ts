'use client'

import { useResource, useStreaming } from './useResource'
import { ModulAjar, AIGenerateRequest } from '@/types/database'
import { getProviderFromModel } from '@/lib/form-constants'
import { constructPrompt } from '@/lib/utils'

export function useModulAjar() {
    const resource = useResource<ModulAjar>({ endpoint: '/api/v2/modul-ajar' })
    const streaming = useStreaming()

    const generateWithStreaming = async (input: AIGenerateRequest) => {
        const provider = getProviderFromModel(input.model || '')
        const endpoint = provider === 'openrouter'
            ? '/api/v1/openrouter/chat/stream' // Correct Backend Endpoint
            : '/api/v2/modul-ajar/generate/stream'

        let payload = input
        if (provider === 'openrouter') {
            const prompt = constructPrompt('modul_ajar', input)
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
