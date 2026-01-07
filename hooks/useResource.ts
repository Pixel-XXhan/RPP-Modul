'use client'

import { useState, useCallback } from 'react'
import { api, streamingRequest } from '@/lib/api'
import { PaginationParams } from '@/types/database'

interface UseResourceOptions<T> {
    endpoint: string
    initialData?: T[]
}

interface UseResourceReturn<T> {
    data: T[]
    item: T | null
    loading: boolean
    error: string | null
    total: number
    fetchAll: (params?: PaginationParams) => Promise<void>
    fetchOne: (id: string) => Promise<T>
    create: (data: Partial<T>) => Promise<T>
    update: (id: string, data: Partial<T>) => Promise<T>
    remove: (id: string) => Promise<void>
    generate: (input: unknown) => Promise<T>
    reset: () => void
}

export function useResource<T extends { id: string }>({
    endpoint,
    initialData = [],
}: UseResourceOptions<T>): UseResourceReturn<T> {
    const [data, setData] = useState<T[]>(initialData)
    const [item, setItem] = useState<T | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [total, setTotal] = useState(0)

    const fetchAll = useCallback(async (params?: PaginationParams) => {
        setLoading(true)
        setError(null)
        try {
            const result = await api.get<T[]>(endpoint, params as Record<string, string | number | undefined>)
            setData(result)
            setTotal(result.length)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Terjadi kesalahan')
        } finally {
            setLoading(false)
        }
    }, [endpoint])

    const fetchOne = useCallback(async (id: string): Promise<T> => {
        setLoading(true)
        setError(null)
        try {
            const result = await api.get<T>(`${endpoint}/${id}`)
            setItem(result)
            return result
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Terjadi kesalahan')
            throw err
        } finally {
            setLoading(false)
        }
    }, [endpoint])

    const create = useCallback(async (input: Partial<T>): Promise<T> => {
        setLoading(true)
        setError(null)
        try {
            const result = await api.post<T>(endpoint, input)
            setData(prev => [result, ...prev])
            return result
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Terjadi kesalahan'
            setError(message)
            throw err
        } finally {
            setLoading(false)
        }
    }, [endpoint])

    const update = useCallback(async (id: string, input: Partial<T>): Promise<T> => {
        setLoading(true)
        setError(null)
        try {
            const result = await api.put<T>(`${endpoint}/${id}`, input)
            setData(prev => prev.map(item => item.id === id ? result : item))
            setItem(result)
            return result
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Terjadi kesalahan'
            setError(message)
            throw err
        } finally {
            setLoading(false)
        }
    }, [endpoint])

    const remove = useCallback(async (id: string): Promise<void> => {
        setLoading(true)
        setError(null)
        try {
            await api.delete(`${endpoint}/${id}`)
            setData(prev => prev.filter(item => item.id !== id))
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Terjadi kesalahan'
            setError(message)
            throw err
        } finally {
            setLoading(false)
        }
    }, [endpoint])

    const generate = useCallback(async (input: unknown): Promise<T> => {
        setLoading(true)
        setError(null)
        try {
            const result = await api.post<T>(`${endpoint}/generate`, input)
            setData(prev => [result, ...prev])
            return result
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Terjadi kesalahan'
            setError(message)
            throw err
        } finally {
            setLoading(false)
        }
    }, [endpoint])

    const reset = useCallback(() => {
        setData(initialData)
        setItem(null)
        setError(null)
        setLoading(false)
    }, [initialData])

    return {
        data,
        item,
        loading,
        error,
        total,
        fetchAll,
        fetchOne,
        create,
        update,
        remove,
        generate,
        reset,
    }
}

// Streaming hook for AI generation
interface UseStreamingReturn {
    content: string
    isStreaming: boolean
    error: string | null
    startStreaming: (endpoint: string, data: unknown) => Promise<void>
    reset: () => void
}

export function useStreaming(): UseStreamingReturn {
    const [content, setContent] = useState('')
    const [isStreaming, setIsStreaming] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const startStreaming = useCallback(async (endpoint: string, data: unknown) => {
        setContent('')
        setIsStreaming(true)
        setError(null)

        await streamingRequest(
            endpoint,
            data,
            (chunk) => setContent(prev => prev + chunk),
            () => setIsStreaming(false),
            (err) => {
                setError(err.message)
                setIsStreaming(false)
            }
        )
    }, [])

    const reset = useCallback(() => {
        setContent('')
        setIsStreaming(false)
        setError(null)
    }, [])

    return { content, isStreaming, error, startStreaming, reset }
}
