'use client';

import { useState, useEffect, useCallback } from 'react';

export interface LocalSettings {
    theme: 'light' | 'dark' | 'system';
    notifications: {
        email: boolean;
        push: boolean;
        updates: boolean;
    };
    defaultKurikulum: string;
    defaultAIModel: string;
    language: 'id' | 'en';
    generationCount: number;
    lastGenerationDate: string;
    recentSearches: string[];
}

const DEFAULT_SETTINGS: LocalSettings = {
    theme: 'system',
    notifications: {
        email: true,
        push: true,
        updates: true,
    },
    defaultKurikulum: 'Kurikulum Merdeka',
    defaultAIModel: 'gemini-2.5-flash',
    language: 'id',
    generationCount: 0,
    lastGenerationDate: '',
    recentSearches: [],
};

const STORAGE_KEY = 'katedra_settings';

export function useLocalSettings() {
    const [settings, setSettings] = useState<LocalSettings>(DEFAULT_SETTINGS);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load settings from localStorage on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                setSettings({ ...DEFAULT_SETTINGS, ...parsed });
            }
        } catch (error) {
            console.error('Failed to load settings:', error);
        }
        setIsLoaded(true);
    }, []);

    // Save settings to localStorage whenever they change
    const saveSettings = useCallback((newSettings: Partial<LocalSettings>) => {
        setSettings(prev => {
            const updated = { ...prev, ...newSettings };
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            } catch (error) {
                console.error('Failed to save settings:', error);
            }
            return updated;
        });
    }, []);

    // Update specific notification setting
    const updateNotification = useCallback((key: keyof LocalSettings['notifications'], value: boolean) => {
        setSettings(prev => {
            const updated = {
                ...prev,
                notifications: { ...prev.notifications, [key]: value }
            };
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            } catch (error) {
                console.error('Failed to save notification setting:', error);
            }
            return updated;
        });
    }, []);

    // Increment generation count
    const incrementGenerationCount = useCallback(() => {
        setSettings(prev => {
            const today = new Date().toISOString().split('T')[0];
            const updated = {
                ...prev,
                generationCount: prev.generationCount + 1,
                lastGenerationDate: today
            };
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            } catch (error) {
                console.error('Failed to save generation count:', error);
            }
            return updated;
        });
    }, []);

    // Add recent search
    const addRecentSearch = useCallback((query: string) => {
        if (!query.trim()) return;

        setSettings(prev => {
            const searches = [query, ...prev.recentSearches.filter(s => s !== query)].slice(0, 10);
            const updated = { ...prev, recentSearches: searches };
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            } catch (error) {
                console.error('Failed to save recent search:', error);
            }
            return updated;
        });
    }, []);

    // Clear recent searches
    const clearRecentSearches = useCallback(() => {
        saveSettings({ recentSearches: [] });
    }, [saveSettings]);

    // Reset to defaults
    const resetSettings = useCallback(() => {
        setSettings(DEFAULT_SETTINGS);
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_SETTINGS));
        } catch (error) {
            console.error('Failed to reset settings:', error);
        }
    }, []);

    return {
        settings,
        isLoaded,
        saveSettings,
        updateNotification,
        incrementGenerationCount,
        addRecentSearch,
        clearRecentSearches,
        resetSettings,
    };
}

// Standalone functions for use outside React components
export function getLocalGenerationCount(): number {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            const parsed = JSON.parse(stored);
            return parsed.generationCount || 0;
        }
    } catch { }
    return 0;
}

export function incrementLocalGenerationCount(): void {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        const settings = stored ? JSON.parse(stored) : DEFAULT_SETTINGS;
        settings.generationCount = (settings.generationCount || 0) + 1;
        settings.lastGenerationDate = new Date().toISOString().split('T')[0];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (error) {
        console.error('Failed to increment generation count:', error);
    }
}
