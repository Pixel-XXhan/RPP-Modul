'use client'

import { useResource } from './useResource'
import { Template } from '@/types/database'

export function useTemplate() {
    const resource = useResource<Template>({ endpoint: '/api/v2/template' })

    return {
        ...resource,
    }
}
