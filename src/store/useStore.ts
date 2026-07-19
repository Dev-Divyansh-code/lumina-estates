import { create } from 'zustand'

export type ThemeMode = 'dark' | 'light'
export type TimeOfDay = 'dawn' | 'day' | 'dusk' | 'night'
export type MaterialFinish = 'limestone' | 'obsidian' | 'bronze' | 'travertine'

interface UIState {
  theme: ThemeMode
  isMenuOpen: boolean
  isContactOpen: boolean
  setTheme: (theme: ThemeMode) => void
  toggleTheme: () => void
  toggleMenu: () => void
  closeMenu: () => void
  openContact: () => void
  closeContact: () => void
}

interface ConfiguratorState {
  timeOfDay: TimeOfDay
  material: MaterialFinish
  setTimeOfDay: (t: TimeOfDay) => void
  setMaterial: (m: MaterialFinish) => void
}

interface AppState extends UIState, ConfiguratorState {}

function readStoredTheme(): ThemeMode {
  try {
    const v = localStorage.getItem('lumina-theme')
    if (v === 'light' || v === 'dark') return v
  } catch {
    /* ignore */
  }
  return 'dark'
}

export const useStore = create<AppState>((set) => ({
  theme: typeof window !== 'undefined' ? readStoredTheme() : 'dark',
  isMenuOpen: false,
  isContactOpen: false,
  setTheme: (theme) => {
    try {
      localStorage.setItem('lumina-theme', theme)
    } catch {
      /* ignore */
    }
    set({ theme })
  },
  toggleTheme: () =>
    set((s) => {
      const theme: ThemeMode = s.theme === 'dark' ? 'light' : 'dark'
      try {
        localStorage.setItem('lumina-theme', theme)
      } catch {
        /* ignore */
      }
      return { theme }
    }),
  toggleMenu: () => set((s) => ({ isMenuOpen: !s.isMenuOpen })),
  closeMenu: () => set({ isMenuOpen: false }),
  openContact: () => set({ isContactOpen: true }),
  closeContact: () => set({ isContactOpen: false }),

  timeOfDay: 'day',
  material: 'limestone',
  setTimeOfDay: (t) => set({ timeOfDay: t }),
  setMaterial: (m) => set({ material: m }),
}))
