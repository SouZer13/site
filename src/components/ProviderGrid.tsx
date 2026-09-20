import { useMemo, useState } from 'react'
import { SlidersHorizontal } from 'lucide-react'
import { PROVIDERS } from '../data/providers'
import ProviderCard from './ProviderCard'
import type { SearchFilters } from '../types'

interface ProviderGridProps {
  filters: SearchFilters
  onResetFilters: () => void
}

const hasActiveFilters = (f: SearchFilters) =>
  Boolean(f.prestation || f.location || f.date || f.eventType) || f.budgetMin > 0 || f.budgetMax < 10000

export default function ProviderGrid({ filters, onResetFilters }: ProviderGridProps) {
  const [showAll, setShowAll] = useState(false)

  const filtered = useMemo(() => {
    return PROVIDERS.filter((p) => {
      if (filters.prestation && p.categoryId !== filters.prestation) return false
      if (filters.location && p.city !== filters.location) return false
      if (p.priceFrom > filters.budgetMax) return false
      return true
    })
  }, [filters])

  const visible = showAll ? filtered : filtered.slice(0, 6)
  const active = hasActiveFilters(filters)

  return (
    <section id="prestataires" className="mx-auto w-full max-w-content px-5 py-20 sm:px-8 sm:py-28">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h2 className="font-display text-evenora-ink" style={{ fontSize: 'clamp(1.9rem, 4vw, 2.75rem)', fontWeight: 400, letterSpacing: '-0.02em' }}>
            Des prestataires qui font la différence.
          </h2>
          <p className="mt-3 max-w-[520px] font-sans text-[15.5px] leading-relaxed text-evenora-secondary">
            Une sélection de professionnels vérifiés, prête à être filtrée selon votre recherche.
          </p>
        </div>
        {active && (
          <button
            type="button"
            onClick={onResetFilters}
            className="flex shrink-0 items-center gap-1.5 rounded-pill border border-evenora-border px-4 py-2 font-sans text-[13.5px] font-medium text-evenora-ink transition-colors hover:bg-evenora-ivory"
          >
            <SlidersHorizontal size={14} /> Réinitialiser les filtres
          </button>
        )}
      </div>

      {visible.length === 0 ? (
        <div className="mt-14 flex flex-col items-center rounded-card border border-dashed border-evenora-border px-6 py-16 text-center">
          <p className="font-sans text-[16px] font-medium text-evenora-ink">Aucun prestataire ne correspond à cette recherche.</p>
          <p className="mt-1 font-sans text-[14px] text-evenora-secondary">Essayez d&rsquo;élargir votre lieu ou votre budget.</p>
          <button
            type="button"
            onClick={onResetFilters}
            className="mt-5 rounded-pill bg-evenora-ink px-5 py-2.5 font-sans text-[14px] font-medium text-evenora-white"
          >
            Réinitialiser la recherche
          </button>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p, i) => (
            <ProviderCard key={p.id} provider={p} index={i} />
          ))}
        </div>
      )}

      {!showAll && filtered.length > 6 && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll(true)}
            className="rounded-pill border border-evenora-ink px-6 py-3 font-sans text-[14.5px] font-medium text-evenora-ink transition-colors hover:bg-evenora-ink hover:text-evenora-white"
          >
            Voir tous les prestataires
          </button>
        </div>
      )}

      <p className="mt-6 text-center font-sans text-[12px] text-evenora-secondary">
        Prestataires et avis présentés à titre de démonstration dans ce prototype.
      </p>
    </section>
  )
}
