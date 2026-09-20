import { Heart } from 'lucide-react'
import { PROVIDERS } from '../data/providers'
import ProviderCard from './ProviderCard'
import { useAppState } from '../context/AppStateContext'

export default function FavoritesSection() {
  const { favorites } = useAppState()
  const favoriteProviders = PROVIDERS.filter((p) => favorites.has(p.id))

  if (favoriteProviders.length === 0) return null

  return (
    <section id="favoris" className="mx-auto w-full max-w-content px-5 py-20 sm:px-8 sm:py-28">
      <div className="flex items-center gap-2.5">
        <Heart size={20} className="text-evenora-deep" fill="#C95368" />
        <h2 className="font-display text-evenora-ink" style={{ fontSize: 'clamp(1.6rem, 3.2vw, 2.1rem)', fontWeight: 400, letterSpacing: '-0.02em' }}>
          Vos favoris.
        </h2>
      </div>
      <p className="mt-3 max-w-[480px] font-sans text-[15px] leading-relaxed text-evenora-secondary">
        Retrouvez ici les prestataires que vous avez mis de côté pour votre événement.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {favoriteProviders.map((p, i) => (
          <ProviderCard key={p.id} provider={p} index={i} />
        ))}
      </div>
    </section>
  )
}
