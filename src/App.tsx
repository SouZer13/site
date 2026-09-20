import { useState } from 'react'
import { AppStateProvider, useAppState } from './context/AppStateContext'
import Navbar from './components/Navbar'
import MobileMenu from './components/MobileMenu'
import Hero from './components/Hero'
import CategoryGrid from './components/CategoryGrid'
import ProviderGrid from './components/ProviderGrid'
import AvailabilityShowcase from './components/AvailabilityShowcase'
import HowItWorks from './components/HowItWorks'
import MyEventDashboard from './components/MyEventDashboard'
import FavoritesSection from './components/FavoritesSection'
import ProviderDashboard from './components/ProviderDashboard'
import MessagingDemo from './components/MessagingDemo'
import ForProviders from './components/ForProviders'
import Pricing from './components/Pricing'
import Inspirations from './components/Inspirations'
import MobileAppPromo from './components/MobileAppPromo'
import StatsSection from './components/StatsSection'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'
import ContactRequestModal from './components/ContactRequestModal'
import ProviderProfileModal from './components/ProviderProfileModal'
import AuthModal from './components/AuthModal'
import type { AuthMode } from './components/AuthModal'
import type { SearchFilters } from './types'

const DEFAULT_FILTERS: SearchFilters = {
  prestation: null,
  location: null,
  date: null,
  budgetMin: 0,
  budgetMax: 10000,
  eventType: null,
}

function AppShell() {
  const { mobileMenuOpen, setMobileMenuOpen } = useAppState()
  const [filters, setFilters] = useState<SearchFilters>(DEFAULT_FILTERS)
  const [authMode, setAuthMode] = useState<AuthMode | null>(null)

  function handleFiltersChange(next: Partial<SearchFilters>) {
    setFilters((prev) => ({ ...prev, ...next }))
  }

  function scrollToProviders() {
    document.getElementById('prestataires')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-evenora-white">
      <Navbar onOpenAuth={() => setAuthMode('login')} onBecomeProvider={() => setAuthMode('signup-provider')} />
      <MobileMenu
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onOpenAuth={() => setAuthMode('login')}
        onBecomeProvider={() => setAuthMode('signup-provider')}
      />

      <main>
        <Hero filters={filters} onFiltersChange={handleFiltersChange} onSearch={scrollToProviders} />
        <CategoryGrid onSelectCategory={(id) => { handleFiltersChange({ prestation: id }); scrollToProviders() }} />
        <ProviderGrid filters={filters} onResetFilters={() => setFilters(DEFAULT_FILTERS)} />
        <AvailabilityShowcase />
        <HowItWorks />
        <MyEventDashboard />
        <FavoritesSection />
        <ProviderDashboard />
        <MessagingDemo />
        <ForProviders onBecomeProvider={() => setAuthMode('signup-provider')} />
        <Pricing />
        <Inspirations />
        <MobileAppPromo />
        <StatsSection />
        <FinalCTA onFindProviders={scrollToProviders} onBecomeProvider={() => setAuthMode('signup-provider')} />
      </main>

      <Footer />

      <ContactRequestModal />
      <ProviderProfileModal />
      <AuthModal mode={authMode} onClose={() => setAuthMode(null)} onChangeMode={setAuthMode} />
    </div>
  )
}

export default function App() {
  return (
    <AppStateProvider>
      <AppShell />
    </AppStateProvider>
  )
}
