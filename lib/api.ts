import { getSupabase } from './supabase'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

export class ApiError extends Error {
    constructor(
        message: string,
        public statusCode: number,
        public error?: string
    ) {
        super(message)
        this.name = 'ApiError'
    }
}

type RequestOptions = RequestInit & {
    params?: Record<string, string | number | undefined>
}

export async function apiRequest<T>(
    endpoint: string,
    options: RequestOptions = {}
): Promise<T> {
    const supabase = getSupabase()
    const { data: { session } } = await supabase.auth.getSession()

    // Build URL with query params
    let url = `${API_BASE}${endpoint}`
    if (options.params) {
        const searchParams = new URLSearchParams()
        Object.entries(options.params).forEach(([key, value]) => {
            if (value !== undefined) {
                searchParams.append(key, String(value))
            }
        })
        const queryString = searchParams.toString()
        if (queryString) {
            url += `?${queryString}`
        }
    }

    const { params, ...fetchOptions } = options

    const response = await fetch(url, {
        ...fetchOptions,
        headers: {
            'Content-Type': 'application/json',
            ...(session?.access_token && {
                'Authorization': `Bearer ${session.access_token}`,
            }),
            ...options.headers,
        },
    })

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new ApiError(
            errorData.message || 'API Error',
            response.status,
            errorData.error
        )
    }

    // Handle empty responses (204 No Content)
    if (response.status === 204) {
        return {} as T
    }

    return response.json()
}

// Convenience methods
export const api = {
    get: <T>(endpoint: string, params?: Record<string, string | number | undefined>) =>
        apiRequest<T>(endpoint, { method: 'GET', params }),

    post: <T>(endpoint: string, data?: unknown) =>
        apiRequest<T>(endpoint, {
            method: 'POST',
            body: data ? JSON.stringify(data) : undefined,
        }),

    put: <T>(endpoint: string, data?: unknown) =>
        apiRequest<T>(endpoint, {
            method: 'PUT',
            body: data ? JSON.stringify(data) : undefined,
        }),

    patch: <T>(endpoint: string, data?: unknown) =>
        apiRequest<T>(endpoint, {
            method: 'PATCH',
            body: data ? JSON.stringify(data) : undefined,
        }),

    delete: <T>(endpoint: string) =>
        apiRequest<T>(endpoint, { method: 'DELETE' }),
}

// Streaming API for AI generation
export async function streamingRequest(
    endpoint: string,
    data: unknown,
    onChunk: (content: string) => void,
    onDone?: () => void,
    onError?: (error: Error) => void
): Promise<void> {
    const supabase = getSupabase()
    const { data: { session } } = await supabase.auth.getSession()

    try {
        const response = await fetch(`${API_BASE}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(session?.access_token && {
                    'Authorization': `Bearer ${session.access_token}`,
                }),
            },
            body: JSON.stringify(data),
        })

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}))
            throw new ApiError(errorData.message || 'Streaming Error', response.status)
        }

        const reader = response.body?.getReader()
        if (!reader) {
            throw new Error('No response body')
        }

        const decoder = new TextDecoder()

        while (true) {
            const { done, value } = await reader.read()
            if (done) break

            const chunk = decoder.decode(value)
            const lines = chunk.split('\n')

            for (const line of lines) {
                if (line.startsWith('data: ')) {
                    const data = line.slice(6)
                    if (data === '[DONE]') {
                        onDone?.()
                        return
                    }
                    try {
                        const parsed = JSON.parse(data)
                        if (parsed.content) {
                            onChunk(parsed.content)
                        }
                    } catch {
                        // Skip invalid JSON
                    }
                }
            }
        }

        onDone?.()
    } catch (error) {
        onError?.(error as Error)
    }
}
