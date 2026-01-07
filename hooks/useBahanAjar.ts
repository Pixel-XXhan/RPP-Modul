'use client'

import { useResource } from './useResource'
import { api } from '@/lib/api'

interface BahanAjar {
    id: string
    judul: string
    jenis: 'handout' | 'buku' | 'modul' | 'brosur' | 'lembar_info' | 'poster' | 'infografis'
    kelas: string
    deskripsi?: string
    konten_text?: string
    mapel_id?: string
    user_id: string
    created_at: string
    updated_at: string
}

interface GenerateBahanAjarInput {
    mapel: string
    topik: string
    kelas: string
    jenis: BahanAjar['jenis']
}

export function useBahanAjar() {
    const resource = useResource<BahanAjar>({ endpoint: '/api/v2/bahan-ajar' })

    const generateBahanAjar = async (input: GenerateBahanAjarInput) => {
        return resource.generate(input)
    }

    return {
        ...resource,
        generateBahanAjar,
    }
}
