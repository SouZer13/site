import { motion } from 'framer-motion'
import { BadgeCheck, Heart, MapPin, Star } from 'lucide-react'
import type { Provider } from '../types'
import { useAppState } from '../context/AppStateContext'
import { formatEuro } from '../utils/format'

interface ProviderCardProps {
  provider: Provider
  index?: number
}

export default function ProviderCard({ provider, index = 0 }: ProviderCardProps) {
  const { isFavorite, toggleFavorite, openProviderProfile } = useAppState()
  const favorite = isFavorite(provider.id)

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col overflow-hidden rounded-card border border-evenora-border bg-evenora-white shadow-subtle transition-shadow hover:shadow-card"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <button
          type="button"
          onClick={() => openProviderProfile(provider.id)}
          className="absolute inset-0 h-full w-full text-left focus:outline-none"
          aria-label={`Voir le profil de ${provider.name}`}
        >
          <div
            className="h-full w-full transition-transform duration-500 group-hover:scale-105"
            style={{ background: provider.gradient }}
          />
        </button>
        <button
          type="button"
          onClick={() => toggleFavorite(provider.id)}
          aria-label={favorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
          aria-pressed={favorite}
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-evenora-white/90 text-evenora-ink shadow-subtle backdrop-blur transition-transform hover:scale-105 active:scale-95"
        >
          <Heart size={16} fill={favorite ? '#C95368' : 'none'} stroke={favorite ? '#C95368' : 'currentColor'} />
        </button>
        {provider.verified && (
          <span className="pointer-events-none absolute left-3 top-3 z-10 flex items-center gap-1 rounded-pill bg-evenora-white/90 px-2.5 py-1 font-sans text-[11.5px] font-medium text-evenora-ink shadow-subtle backdrop-blur">
            <BadgeCheck size={13} className="text-evenora-deep" /> Vérifié
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <button
              type="button"
              onClick={() => openProviderProfile(provider.id)}
              className="text-left font-sans text-[16px] font-semibold text-evenora-ink hover:opacity-70"
            >
              {provider.name}
            </button>
            <p className="mt-0.5 font-sans text-[13.5px] text-evenora-secondary">{provider.categoryLabel}</p>
          </div>
          <span className="flex shrink-0 items-center gap-1 font-sans text-[13.5px] font-semibold text-evenora-ink">
            <Star size={14} className="fill-evenora-champagne text-evenora-champagne" />
            {provider.rating.toFixed(1)}
          </span>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 font-sans text-[13px] text-evenora-secondary">
          <span className="flex items-center gap-1">
            <MapPin size={13} /> {provider.city}
          </span>
          <span>·</span>
          <span>{provider.reviewCount} avis</span>
          {typeof provider.distanceKm === 'number' && (
            <>
              <span>·</span>
              <span>{provider.distanceKm} km</span>
            </>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-evenora-border pt-4">
          <div>
            <p className="font-sans text-[11.5px] uppercase tracking-wide text-evenora-secondary">À partir de</p>
            <p className="font-sans text-[16px] font-semibold text-evenora-ink">
              {formatEuro(provider.priceFrom)}
              {provider.priceUnit !== 'forfait' && <span className="font-normal text-evenora-secondary"> {provider.priceUnit}</span>}
            </p>
          </div>
          <button
            type="button"
            onClick={() => openProviderProfile(provider.id)}
            className="rounded-pill border border-evenora-ink px-4 py-2 font-sans text-[13px] font-medium text-evenora-ink transition-colors hover:bg-evenora-ink hover:text-evenora-white"
          >
            Voir le profil
          </button>
        </div>
      </div>
    </motion.div>
  )
}
