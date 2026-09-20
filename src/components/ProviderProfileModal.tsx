import { AnimatePresence, motion } from 'framer-motion'
import { BadgeCheck, Heart, MapPin, Star, X } from 'lucide-react'
import { PROVIDERS } from '../data/providers'
import { REVIEWS } from '../data/reviews'
import { useAppState } from '../context/AppStateContext'
import { formatEuro } from '../utils/format'
import AvailabilityCalendar from './AvailabilityCalendar'
import Logo from './Logo'

export default function ProviderProfileModal() {
  const { activeProviderId, closeProviderProfile, isFavorite, toggleFavorite, openContactModal } = useAppState()
  const provider = PROVIDERS.find((p) => p.id === activeProviderId) ?? null
  const open = provider !== null

  const estimatedFee = provider
    ? provider.travel.pricePerKm > 0
      ? Math.round(Math.max(0, 45 - provider.travel.freeUpToKm) * provider.travel.pricePerKm)
      : 0
    : 0

  return (
    <AnimatePresence>
      {open && provider && (
        <>
          <motion.div
            className="fixed inset-0 z-50"
            style={{ backgroundColor: 'rgba(33,26,26,0.45)', backdropFilter: 'blur(4px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeProviderProfile}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6" role="dialog" aria-modal="true">
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="evenora-scroll relative max-h-[92vh] w-full max-w-[720px] overflow-y-auto rounded-card bg-evenora-white shadow-lifted"
            >
              <div className="relative h-44 w-full sm:h-56" style={{ background: provider.gradient }}>
                <button
                  type="button"
                  onClick={closeProviderProfile}
                  aria-label="Fermer"
                  className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-evenora-white/90 text-evenora-ink shadow-subtle"
                >
                  <X size={18} />
                </button>
                <div className="absolute -bottom-8 left-6 flex h-16 w-16 items-center justify-center rounded-2xl border-4 border-evenora-white bg-evenora-ivory shadow-subtle">
                  <Logo size={26} withWordmark={false} />
                </div>
              </div>

              <div className="px-6 pb-8 pt-12 sm:px-8">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-display text-[26px] font-normal text-evenora-ink">{provider.name}</h3>
                      {provider.verified && (
                        <span className="flex items-center gap-1 rounded-pill bg-evenora-blush px-2.5 py-1 font-sans text-[11.5px] font-medium text-evenora-ink">
                          <BadgeCheck size={13} className="text-evenora-deep" /> Vérifié
                        </span>
                      )}
                    </div>
                    <p className="mt-1 font-sans text-[14.5px] text-evenora-secondary">
                      {provider.categoryLabel} · {provider.city}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => toggleFavorite(provider.id)}
                      aria-pressed={isFavorite(provider.id)}
                      aria-label="Ajouter aux favoris"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-evenora-border text-evenora-ink hover:bg-evenora-ivory"
                    >
                      <Heart size={16} fill={isFavorite(provider.id) ? '#C95368' : 'none'} stroke={isFavorite(provider.id) ? '#C95368' : 'currentColor'} />
                    </button>
                    <span className="flex items-center gap-1 rounded-pill border border-evenora-border px-3 py-2 font-sans text-[14px] font-semibold text-evenora-ink">
                      <Star size={14} className="fill-evenora-champagne text-evenora-champagne" />
                      {provider.rating.toFixed(1)}
                      <span className="font-normal text-evenora-secondary">({provider.reviewCount})</span>
                    </span>
                  </div>
                </div>

                <p className="mt-5 max-w-[560px] font-sans text-[14.5px] leading-relaxed text-evenora-secondary">
                  {provider.description}
                </p>

                <div className="mt-7">
                  <p className="font-sans text-[13px] font-semibold uppercase tracking-wide text-evenora-secondary">Services</p>
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    {provider.services.map((s) => (
                      <span key={s} className="rounded-pill border border-evenora-border px-3 py-1.5 font-sans text-[13px] text-evenora-ink">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-7">
                  <p className="font-sans text-[13px] font-semibold uppercase tracking-wide text-evenora-secondary">Portfolio</p>
                  <div className="mt-2.5 grid grid-cols-4 gap-2">
                    {provider.portfolio.map((g, i) => (
                      <div key={i} className="aspect-square rounded-xl" style={{ background: g }} />
                    ))}
                  </div>
                </div>

                <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="rounded-card border border-evenora-border p-5">
                    <p className="font-sans text-[13px] font-semibold uppercase tracking-wide text-evenora-secondary">Tarif indicatif</p>
                    <p className="mt-1.5 font-sans text-[20px] font-semibold text-evenora-ink">
                      À partir de {formatEuro(provider.priceFrom)}
                      {provider.priceUnit !== 'forfait' && <span className="font-normal text-evenora-secondary"> {provider.priceUnit}</span>}
                    </p>
                  </div>
                  <div className="rounded-card border border-evenora-border p-5">
                    <p className="flex items-center gap-1.5 font-sans text-[13px] font-semibold uppercase tracking-wide text-evenora-secondary">
                      <MapPin size={13} /> Zone de déplacement
                    </p>
                    <p className="mt-1.5 font-sans text-[14px] leading-relaxed text-evenora-ink">
                      Disponible dans un rayon de {provider.travel.radiusKm} km autour de {provider.travel.baseCity}.
                    </p>
                    <p className="mt-1 font-sans text-[13px] text-evenora-secondary">
                      {provider.travel.freeUpToKm > 0
                        ? `Déplacement offert jusqu'à ${provider.travel.freeUpToKm} km, puis ${provider.travel.pricePerKm.toFixed(2)} €/km.`
                        : 'Déplacement inclus dans le forfait.'}
                    </p>
                    {estimatedFee > 0 && (
                      <p className="mt-2 font-sans text-[13px] font-medium text-evenora-deep">
                        Frais de déplacement estimés : {formatEuro(estimatedFee)}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-7">
                  <p className="font-sans text-[13px] font-semibold uppercase tracking-wide text-evenora-secondary">Calendrier</p>
                  <div className="mt-2.5">
                    <AvailabilityCalendar availability={provider.availability} compact />
                  </div>
                </div>

                <div className="mt-7">
                  <p className="font-sans text-[13px] font-semibold uppercase tracking-wide text-evenora-secondary">Avis</p>
                  <div className="mt-2.5 space-y-3">
                    {REVIEWS.map((r) => (
                      <div key={r.id} className="rounded-2xl bg-evenora-ivory p-4">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} size={13} className={i < r.rating ? 'fill-evenora-champagne text-evenora-champagne' : 'text-evenora-border'} />
                            ))}
                          </span>
                          <span className="font-sans text-[12px] text-evenora-secondary">{r.date}</span>
                        </div>
                        <p className="mt-2 font-sans text-[13.5px] leading-relaxed text-evenora-ink">&ldquo;{r.text}&rdquo;</p>
                        <p className="mt-1.5 font-sans text-[12.5px] font-medium text-evenora-secondary">
                          {r.author} {r.verified && <span className="text-evenora-deep">· Avis vérifié</span>}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => openContactModal({ providerId: provider.id, providerName: provider.name })}
                  className="mt-8 w-full rounded-pill bg-evenora-ink py-3.5 font-sans text-[15px] font-medium text-evenora-white transition-transform hover:-translate-y-0.5 active:scale-95"
                >
                  Demander à être mis en relation
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
