import { useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import { useClickOutside } from '../hooks/useClickOutside'
import { CITIES } from '../data/cities'

interface LocationSelectProps {
  value: string | null
  onChange: (city: string | null) => void
  className?: string
}

/** City/region field. Built so a real address-autocomplete API can later replace the static CITIES list. */
export default function LocationSelect({ value, onChange, className = '' }: LocationSelectProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const ref = useRef<HTMLDivElement>(null)

  useClickOutside(ref, () => setOpen(false), open)

  const filtered = useMemo(() => {
    if (!query.trim()) return CITIES
    const q = query.toLowerCase()
    return CITIES.filter((c) => c.toLowerCase().includes(q))
  }, [query])

  function select(city: string) {
    onChange(city)
    setOpen(false)
    setQuery('')
  }

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label="Choisir une ville"
        className="flex w-full flex-col items-start gap-0.5 rounded-2xl px-5 py-3 text-left transition-colors hover:bg-evenora-ivory focus:outline-none"
      >
        <span className="flex items-center gap-1.5 font-sans text-[12px] font-semibold uppercase tracking-wide text-evenora-secondary">
          <MapPin size={13} /> Lieu
        </span>
        <span className={`truncate font-sans text-[15px] ${value ? 'font-medium text-evenora-ink' : 'text-evenora-secondary'}`}>
          {value ?? 'Où ?'}
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 top-full z-40 mt-3 w-[92vw] max-w-[320px] rounded-card border border-evenora-border bg-evenora-white p-4 shadow-lifted"
          >
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher une ville"
              className="w-full rounded-xl border border-evenora-border px-3 py-2 font-sans text-[14px] text-evenora-ink placeholder:text-evenora-secondary focus:outline-none"
              aria-label="Rechercher une ville"
            />
            <div className="evenora-scroll mt-3 max-h-[260px] overflow-y-auto">
              {filtered.length === 0 && (
                <p className="px-2 py-6 text-center font-sans text-[14px] text-evenora-secondary">Aucune ville trouvée.</p>
              )}
              {filtered.map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => select(city)}
                  className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left font-sans text-[14px] transition-colors hover:bg-evenora-blush ${
                    value === city ? 'bg-evenora-blush font-medium text-evenora-ink' : 'text-evenora-ink'
                  }`}
                >
                  <MapPin size={14} className="text-evenora-secondary" />
                  {city}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
