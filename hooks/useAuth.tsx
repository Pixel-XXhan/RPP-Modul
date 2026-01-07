'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { User, Session, AuthChangeEvent } from '@supabase/supabase-js'
import { getSupabase } from '@/lib/supabase'

interface AuthContextType {
    user: User | null
    session: Session | null
    loading: boolean
    signIn: (email: string, password: string) => Promise<{ error: Error | null }>
    signUp: (email: string, password: string, metadata?: { nama_lengkap?: string; institusi?: string }) => Promise<{ error: Error | null }>
    signInWithGoogle: () => Promise<void>
    signInWithFacebook: () => Promise<void>
    signOut: () => Promise<void>
    resetPassword: (email: string) => Promise<{ error: Error | null }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [session, setSession] = useState<Session | null>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    const supabase = getSupabase()

    useEffect(() => {
        // Skip if supabase is not available (build time)
        if (!supabase) {
            setLoading(false)
            return
        }

        // Get initial session
        const initSession = async () => {
            const { data: { session: sess } } = await supabase.auth.getSession()
            setSession(sess)
            setUser(sess?.user ?? null)
            setLoading(false)
        }
        initSession()

        // Listen for auth changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((event: AuthChangeEvent, sess: Session | null) => {
            setSession(sess)
            setUser(sess?.user ?? null)
            setLoading(false)
        })

        return () => subscription.unsubscribe()
    }, [supabase])

    const signIn = async (email: string, password: string) => {
        if (!supabase) return { error: new Error('Supabase not initialized') }
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (!error) {
            router.push('/dashboard')
        }
        return { error }
    }

    const signUp = async (email: string, password: string, metadata?: { nama_lengkap?: string; institusi?: string }) => {
        if (!supabase) return { error: new Error('Supabase not initialized') }
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: metadata,
            },
        })
        return { error }
    }

    const signInWithGoogle = async () => {
        if (!supabase) return
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        })
    }

    const signInWithFacebook = async () => {
        if (!supabase) return
        await supabase.auth.signInWithOAuth({
            provider: 'facebook',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        })
    }

    const signOut = async () => {
        if (!supabase) return
        await supabase.auth.signOut()
        router.push('/login')
    }

    const resetPassword = async (email: string) => {
        if (!supabase) return { error: new Error('Supabase not initialized') }
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/reset-password`,
        })
        return { error }
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                session,
                loading,
                signIn,
                signUp,
                signInWithGoogle,
                signInWithFacebook,
                signOut,
                resetPassword,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
