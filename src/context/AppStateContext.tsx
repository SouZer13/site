import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { ContactRequestPrefill } from '../types'

interface AppStateValue {
  favorites: Set<string>
  toggleFavorite: (id: string) => void
  isFavorite: (id: string) => boolean

  activeProviderId: string | null
  openProviderProfile: (id: string) => void
  closeProviderProfile: () => void

  contactModal: ContactRequestPrefill | null
  openContactModal: (prefill?: ContactRequestPrefill) => void
  closeContactModal: () => void

  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
}

const AppStateContext = createContext<AppStateValue | null>(null)

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [activeProviderId, setActiveProviderId] = useState<string | null>(null)
  const [contactModal, setContactModal] = useState<ContactRequestPrefill | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  const isFavorite = useCallback((id: string) => favorites.has(id), [favorites])

  const openProviderProfile = useCallback((id: string) => setActiveProviderId(id), [])
  const closeProviderProfile = useCallback(() => setActiveProviderId(null), [])

  const openContactModal = useCallback((prefill?: ContactRequestPrefill) => {
    setActiveProviderId(null)
    setContactModal(prefill ?? {})
  }, [])
  const closeContactModal = useCallback(() => setContactModal(null), [])

  const value = useMemo<AppStateValue>(
    () => ({
      favorites,
      toggleFavorite,
      isFavorite,
      activeProviderId,
      openProviderProfile,
      closeProviderProfile,
      contactModal,
      openContactModal,
      closeContactModal,
      mobileMenuOpen,
      setMobileMenuOpen,
    }),
    [
      favorites,
      toggleFavorite,
      isFavorite,
      activeProviderId,
      openProviderProfile,
      closeProviderProfile,
      contactModal,
      openContactModal,
      closeContactModal,
      mobileMenuOpen,
    ],
  )

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>
}

export function useAppState() {
  const ctx = useContext(AppStateContext)
  if (!ctx) throw new Error('useAppState must be used within AppStateProvider')
  return ctx
}
