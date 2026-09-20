import { Menu, X } from 'lucide-react'
import Logo from './Logo'
import { NAV_LINKS } from './nav'
import { useAppState } from '../context/AppStateContext'

interface NavbarProps {
  onOpenAuth: () => void
  onBecomeProvider: () => void
}

export default function Navbar({ onOpenAuth, onBecomeProvider }: NavbarProps) {
  const { mobileMenuOpen, setMobileMenuOpen } = useAppState()

  return (
    <header className="sticky top-0 z-30 w-full border-b border-evenora-border/70 bg-evenora-white/85 backdrop-blur-md">
      <nav className="mx-auto flex h-[68px] max-w-content items-center justify-between px-5 sm:px-8">
        <a href="#" className="flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-evenora-deep/40 rounded-lg">
          <Logo size={28} />
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-sans text-[15px] font-medium text-evenora-ink transition-opacity hover:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-evenora-deep/40 rounded"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            onClick={onOpenAuth}
            className="font-sans text-[15px] font-medium text-evenora-ink transition-opacity hover:opacity-60"
          >
            Connexion
          </button>
          <button
            type="button"
            onClick={onBecomeProvider}
            className="rounded-pill bg-evenora-ink px-5 py-2.5 font-sans text-[15px] font-medium text-evenora-white transition-transform duration-200 hover:-translate-y-0.5 active:scale-95"
          >
            Devenir prestataire
          </button>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full text-evenora-ink md:hidden"
          aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>
    </header>
  )
}
