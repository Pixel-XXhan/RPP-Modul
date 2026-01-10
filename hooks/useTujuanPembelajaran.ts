'use client'

import { useResource, useStreaming } from './useResource'
import { api } from '@/lib/api'
import { TujuanPembelajaran } from '@/types/database'
import { getProviderFromModel } from '@/lib/form-constants'
import { constructPrompt } from '@/lib/utils'

interface GenerateTPInput {
    mapel: string
    topik: string
    kelas: string
    capaian_pembelajaran?: string
    jumlah?: number
    model?: string
}

export function useTujuanPembelajaran() {
    const resource = useResource<TujuanPembelajaran>({ endpoint: '/api/v2/tp' })
    const streaming = useStreaming()

    const generateTP = async (input: GenerateTPInput) => {
        return resource.generate(input)
    }

    const generateWithStreaming = async (input: GenerateTPInput) => {
        const provider = getProviderFromModel(input.model || '')
        const endpoint = provider === 'openrouter'
            ? '/api/v1/openrouter/chat/stream'
            : '/api/v2/tp/generate/stream'

        let payload = input
        if (provider === 'openrouter') {
            const prompt = constructPrompt('tujuan_pembelajaran', input as any)
            payload = {
                model: input.model,
                messages: [{ role: 'user', content: prompt }],
                stream: true
            } as any
        }

        await streaming.startStreaming(endpoint, payload as any)
    }

    const bulkCreate = async (tpList: Partial<TujuanPembelajaran>[]) => {
        return api.post<TujuanPembelajaran[]>('/api/v2/tp/bulk', tpList)
    }

    return {
        ...resource,
        streaming,
        generateTP,
        generateWithStreaming,
        bulkCreate,
    }
}
