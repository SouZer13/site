import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react'
import { useClickOutside } from '../hooks/useClickOutside'

interface DateSelectProps {
  value: string | null
  onChange: (iso: string | null) => void
  className?: string
}

const WEEKDAYS = ['L', 'M', 'M', 'J', 'V', 'S', 'D']
const MONTHS = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
]

function toIso(d: Date) {
  return d.toISOString().slice(0, 10)
}

export default function DateSelect({ value, onChange, className = '' }: DateSelectProps) {
  const [open, setOpen] = useState(false)
  const today = new Date()
  const [viewMonth, setViewMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1))
  const ref = useRef<HTMLDivElement>(null)

  useClickOutside(ref, () => setOpen(false), open)

  const firstDayIndex = (new Date(viewMonth.getFullYear(), viewMonth.getMonth(), 1).getDay() + 6) % 7
  const daysInMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 0).getDate()
  const cells: (Date | null)[] = [
    ...Array.from({ length: firstDayIndex }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(viewMonth.getFullYear(), viewMonth.getMonth(), i + 1)),
  ]

  const todayIso = toIso(today)

  const label = value
    ? new Date(value).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
    : 'Quand ?'

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label="Choisir une date"
        className="flex w-full flex-col items-start gap-0.5 rounded-2xl px-5 py-3 text-left transition-colors hover:bg-evenora-ivory focus:outline-none"
      >
        <span className="flex items-center gap-1.5 font-sans text-[12px] font-semibold uppercase tracking-wide text-evenora-secondary">
          <CalendarDays size={13} /> Date
        </span>
        <span className={`truncate font-sans text-[15px] ${value ? 'font-medium text-evenora-ink' : 'text-evenora-secondary'}`}>
          {label}
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-1/2 top-full z-40 mt-3 w-[92vw] max-w-[320px] -translate-x-1/2 rounded-card border border-evenora-border bg-evenora-white p-4 shadow-lifted sm:left-0 sm:translate-x-0"
          >
            <div className="flex items-center justify-between px-1">
              <button
                type="button"
                aria-label="Mois précédent"
                onClick={() => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() - 1, 1))}
                className="flex h-8 w-8 items-center justify-center rounded-full text-evenora-ink hover:bg-evenora-ivory"
              >
                <ChevronLeft size={16} />
              </button>
              <p className="font-sans text-[14px] font-semibold text-evenora-ink">
                {MONTHS[viewMonth.getMonth()]} {viewMonth.getFullYear()}
              </p>
              <button
                type="button"
                aria-label="Mois suivant"
                onClick={() => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 1))}
                className="flex h-8 w-8 items-center justify-center rounded-full text-evenora-ink hover:bg-evenora-ivory"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            <div className="mt-3 grid grid-cols-7 gap-1 text-center">
              {WEEKDAYS.map((d, i) => (
                <span key={`${d}-${i}`} className="font-sans text-[11px] font-medium text-evenora-secondary">
                  {d}
                </span>
              ))}
              {cells.map((d, i) => {
                if (!d) return <span key={`empty-${i}`} />
                const iso = toIso(d)
                const isPast = iso < todayIso
                const isSelected = iso === value
                return (
                  <button
                    key={iso}
                    type="button"
                    disabled={isPast}
                    onClick={() => {
                      onChange(iso)
                      setOpen(false)
                    }}
                    className={`flex h-9 w-9 items-center justify-center rounded-full font-sans text-[13px] transition-colors ${
                      isSelected
                        ? 'bg-evenora-ink text-evenora-white'
                        : isPast
                          ? 'text-evenora-border'
                          : 'text-evenora-ink hover:bg-evenora-blush'
                    }`}
                  >
                    {d.getDate()}
                  </button>
                )
              })}
            </div>

            {value && (
              <button
                type="button"
                onClick={() => {
                  onChange(null)
                  setOpen(false)
                }}
                className="mt-3 font-sans text-[13px] font-medium text-evenora-ink underline-offset-2 hover:underline"
              >
                Effacer la date
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
