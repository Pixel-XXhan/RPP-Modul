'use client'

import { useResource, useStreaming } from './useResource'
import { Rubrik } from '@/types/database'
import { getProviderFromModel } from '@/lib/form-constants'
import { constructPrompt } from '@/lib/utils'

interface GenerateRubrikInput {
    mapel: string
    topik: string
    kelas: string
    jenis_penilaian: 'sikap' | 'pengetahuan' | 'keterampilan' | 'proyek' | 'portofolio'
    skala: '1-4' | '1-100' | 'A-E'
    model?: string
}

export function useRubrik() {
    const resource = useResource<Rubrik>({ endpoint: '/api/v2/rubrik' })
    const streaming = useStreaming()

    const generateWithStreaming = async (input: GenerateRubrikInput) => {
        const provider = getProviderFromModel(input.model || '')
        const endpoint = provider === 'openrouter'
            ? '/api/v1/openrouter/chat/stream'
            : '/api/v2/rubrik/generate/stream'

        let payload = input
        if (provider === 'openrouter') {
            const prompt = constructPrompt('rubrik', input as any)
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
