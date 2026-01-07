import { createBrowserClient } from '@supabase/ssr'

// Check if we're in a build/prerender environment without env vars
const isBuildTime = typeof window === 'undefined' &&
    (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

export function createClient() {
    // During build time without env vars, return a mock client
    if (isBuildTime) {
        return null as unknown as ReturnType<typeof createBrowserClient>
    }

    return createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
}

// Singleton instance for client-side usage
let supabaseInstance: ReturnType<typeof createBrowserClient> | null = null

export function getSupabase() {
    if (isBuildTime) {
        return null as unknown as ReturnType<typeof createBrowserClient>
    }

    if (!supabaseInstance) {
        supabaseInstance = createClient()
    }
    return supabaseInstance
}
