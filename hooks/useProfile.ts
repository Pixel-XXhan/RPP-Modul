'use client'

import { useState, useCallback } from 'react'
import { api } from '@/lib/api'
import { UserProfile, UserPreferences } from '@/types/database'

export function useProfile() {
    const [profile, setProfile] = useState<UserProfile | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const fetchProfile = useCallback(async () => {
        setLoading(true)
        setError(null)
        try {
            const data = await api.get<UserProfile>('/api/v2/users/profile')
            setProfile(data)
            return data
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Terjadi kesalahan')
            throw err
        } finally {
            setLoading(false)
        }
    }, [])

    const updateProfile = useCallback(async (data: Partial<UserProfile>) => {
        setLoading(true)
        setError(null)
        try {
            const updated = await api.put<UserProfile>('/api/v2/users/profile', data)
            setProfile(updated)
            return updated
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Terjadi kesalahan')
            throw err
        } finally {
            setLoading(false)
        }
    }, [])

    const updatePreferences = useCallback(async (preferences: Partial<UserPreferences>) => {
        setLoading(true)
        setError(null)
        try {
            const updated = await api.put<UserProfile>('/api/v2/users/preferences', preferences)
            setProfile(prev => prev ? { ...prev, preferences: updated.preferences } : null)
            return updated
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Terjadi kesalahan')
            throw err
        } finally {
            setLoading(false)
        }
    }, [])

    return {
        profile,
        loading,
        error,
        fetchProfile,
        updateProfile,
        updatePreferences,
    }
}
