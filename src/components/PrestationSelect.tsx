import { useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Search, Sparkles } from 'lucide-react'
import { useClickOutside } from '../hooks/useClickOutside'
import { CATEGORIES, QUICK_CATEGORY_IDS } from '../data/categories'

interface PrestationSelectProps {
  value: string | null
  onChange: (categoryId: string | null, label: string | null) => void
  className?: string
}

export default function PrestationSelect({ value, onChange, className = '' }: PrestationSelectProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const ref = useRef<HTMLDivElement>(null)

  useClickOutside(ref, () => setOpen(false), open)

  const selected = CATEGORIES.find((c) => c.id === value)

  const quickList = useMemo(() => CATEGORIES.filter((c) => QUICK_CATEGORY_IDS.includes(c.id)), [])
  const filtered = useMemo(() => {
    if (!query.trim()) return quickList
    const q = query.toLowerCase()
    return CATEGORIES.filter((c) => c.label.toLowerCase().includes(q))
  }, [query, quickList])

  function select(id: string, label: string) {
    onChange(id, label)
    setOpen(false)
    setQuery('')
  }

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label="Choisir une prestation"
        className="flex w-full flex-col items-start gap-0.5 rounded-2xl px-5 py-3 text-left transition-colors hover:bg-evenora-ivory focus:outline-none"
      >
        <span className="flex items-center gap-1.5 font-sans text-[12px] font-semibold uppercase tracking-wide text-evenora-secondary">
          <Sparkles size={13} /> Prestation
        </span>
        <span className={`truncate font-sans text-[15px] ${selected ? 'font-medium text-evenora-ink' : 'text-evenora-secondary'}`}>
          {selected ? selected.label : 'Que recherchez-vous ?'}
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 top-full z-40 mt-3 w-[92vw] max-w-[400px] rounded-card border border-evenora-border bg-evenora-white p-4 shadow-lifted"
          >
            <div className="flex items-center gap-2 rounded-xl border border-evenora-border px-3 py-2">
              <Search size={16} className="text-evenora-secondary" />
              <input
                autoFocus
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher une catégorie"
                className="w-full bg-transparent font-sans text-[14px] text-evenora-ink placeholder:text-evenora-secondary focus:outline-none"
                aria-label="Rechercher une catégorie de prestataire"
              />
            </div>

            <div className="evenora-scroll mt-3 grid max-h-[280px] grid-cols-2 gap-1 overflow-y-auto">
              {filtered.length === 0 && (
                <p className="col-span-2 px-2 py-6 text-center font-sans text-[14px] text-evenora-secondary">
                  Aucune catégorie ne correspond.
                </p>
              )}
              {filtered.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => select(cat.id, cat.label)}
                  className={`rounded-xl px-3 py-2.5 text-left font-sans text-[14px] transition-colors hover:bg-evenora-blush ${
                    value === cat.id ? 'bg-evenora-blush font-medium text-evenora-ink' : 'text-evenora-ink'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
