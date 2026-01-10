'use client'

import { useResource, useStreaming } from './useResource'
import { LKPD, AIGenerateRequest } from '@/types/database'
import { getProviderFromModel } from '@/lib/form-constants'
import { constructPrompt } from '@/lib/utils'

export function useLKPD() {
    const resource = useResource<LKPD>({ endpoint: '/api/v2/lkpd' })
    const streaming = useStreaming()

    const generateWithStreaming = async (input: AIGenerateRequest & { jenis_kegiatan?: string; durasi?: number }) => {
        const provider = getProviderFromModel(input.model || '')
        const endpoint = provider === 'openrouter'
            ? '/api/v1/openrouter/chat/stream'
            : '/api/v2/lkpd/generate/stream'

        let payload = input
        if (provider === 'openrouter') {
            const prompt = constructPrompt('lkpd', input)
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
