'use client'

import { useResource, useStreaming } from './useResource'
import { KisiKisi } from '@/types/database'
import { getProviderFromModel } from '@/lib/form-constants'
import { constructPrompt } from '@/lib/utils'

interface GenerateKisiKisiInput {
    mapel: string
    topik: string
    kelas: string
    jenis_ujian: 'Ulangan Harian' | 'PTS' | 'PAS' | 'PAT'
    jumlah_soal: number
    model?: string
}

export function useKisiKisi() {
    const resource = useResource<KisiKisi>({ endpoint: '/api/v2/kisi-kisi' })
    const streaming = useStreaming()

    const generateWithStreaming = async (input: GenerateKisiKisiInput) => {
        const provider = getProviderFromModel(input.model || '')
        const endpoint = provider === 'openrouter'
            ? '/api/v1/openrouter/chat/stream'
            : '/api/v2/kisi-kisi/generate/stream'

        let payload = input
        if (provider === 'openrouter') {
            const prompt = constructPrompt('kisi_kisi', input as any)
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
