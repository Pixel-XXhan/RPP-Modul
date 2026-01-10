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

        try {
            // Call Backend API to enforce Rate Limiting
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            })

            const data = await res.json()

            if (!res.ok) {
                // Return backend error message (friendly format from HttpExceptionFilter)
                return { error: new Error(data.message || 'Login gagal') }
            }

            // Sync session with Supabase Client
            const { error: sessionError } = await supabase.auth.setSession({
                access_token: data.session.access_token,
                refresh_token: data.session.refresh_token,
            })

            if (sessionError) {
                return { error: sessionError }
            }

            router.push('/dashboard')
            return { error: null }
        } catch (err: any) {
            return { error: new Error(err.message || 'Terjadi kesalahan koneksi') }
        }
    }

    const signUp = async (email: string, password: string, metadata?: { nama_lengkap?: string; institusi?: string }) => {
        if (!supabase) return { error: new Error('Supabase not initialized') }

        try {
            // Call Backend API to enforce Rate Limiting
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    password,
                    nama_lengkap: metadata?.nama_lengkap,
                    institusi: metadata?.institusi
                }),
            })

            const data = await res.json()

            if (!res.ok) {
                return { error: new Error(data.message || 'Registrasi gagal') }
            }

            return { error: null }
        } catch (err: any) {
            return { error: new Error(err.message || 'Terjadi kesalahan koneksi') }
        }
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

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            })

            const data = await res.json()

            if (!res.ok) {
                return { error: new Error(data.message || 'Gagal reset password') }
            }

            return { error: null }
        } catch (err: any) {
            return { error: new Error(err.message || 'Terjadi kesalahan koneksi') }
        }
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
