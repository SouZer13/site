import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Wallet } from 'lucide-react'
import { useClickOutside } from '../hooks/useClickOutside'
import { formatEuro } from '../utils/format'

const MIN = 0
const MAX = 10000
const STEP = 50

/** Decorative distribution — taller in the middle, purely visual. */
const HISTOGRAM = [3, 5, 8, 12, 18, 24, 30, 34, 30, 26, 20, 16, 22, 28, 24, 18, 14, 10, 7, 4]

interface BudgetSelectorProps {
  min: number
  max: number
  onApply: (min: number, max: number) => void
  className?: string
}

export default function BudgetSelector({ min, max, onApply, className = '' }: BudgetSelectorProps) {
  const [open, setOpen] = useState(false)
  const [draftMin, setDraftMin] = useState(min)
  const [draftMax, setDraftMax] = useState(max)
  const ref = useRef<HTMLDivElement>(null)

  useClickOutside(ref, () => setOpen(false), open)

  useEffect(() => {
    if (open) {
      setDraftMin(min)
      setDraftMax(max)
    }
  }, [open, min, max])

  const isDefault = min <= MIN && max >= MAX
  const label = isDefault ? 'Quel budget ?' : `${formatEuro(min)} – ${formatEuro(max)}`

  function handleMinChange(v: number) {
    const next = Math.min(v, draftMax - STEP)
    setDraftMin(Math.max(MIN, next))
  }
  function handleMaxChange(v: number) {
    const next = Math.max(v, draftMin + STEP)
    setDraftMax(Math.min(MAX, next))
  }

  function apply() {
    onApply(draftMin, draftMax)
    setOpen(false)
  }
  function clear() {
    setDraftMin(MIN)
    setDraftMax(MAX)
  }

  const minPct = ((draftMin - MIN) / (MAX - MIN)) * 100
  const maxPct = ((draftMax - MIN) / (MAX - MIN)) * 100

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label="Sélectionner un budget"
        className="flex w-full flex-col items-start gap-0.5 rounded-2xl px-5 py-3 text-left transition-colors hover:bg-evenora-ivory focus:outline-none"
      >
        <span className="flex items-center gap-1.5 font-sans text-[12px] font-semibold uppercase tracking-wide text-evenora-secondary">
          <Wallet size={13} /> Budget
        </span>
        <span className={`font-sans text-[15px] ${isDefault ? 'text-evenora-secondary' : 'text-evenora-ink font-medium'}`}>
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
            className="absolute left-1/2 top-full z-40 mt-3 w-[92vw] max-w-[380px] -translate-x-1/2 rounded-card border border-evenora-border bg-evenora-white p-6 shadow-lifted sm:left-0 sm:translate-x-0"
          >
            <p className="font-display text-[20px] font-normal text-evenora-ink">Votre budget</p>

            <div className="mt-5 flex h-16 items-end gap-[3px]">
              {HISTOGRAM.map((h, i) => {
                const barPct = (i / (HISTOGRAM.length - 1)) * 100
                const inRange = barPct >= minPct && barPct <= maxPct
                return (
                  <div
                    key={i}
                    className={`flex-1 rounded-t-sm transition-colors ${inRange ? 'bg-evenora-deep' : 'bg-evenora-border'}`}
                    style={{ height: `${h * 2.6}px` }}
                  />
                )
              })}
            </div>

            <div className="relative mt-4 h-5">
              <div className="absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 rounded-pill bg-evenora-border" />
              <div
                className="absolute top-1/2 h-1 -translate-y-1/2 rounded-pill bg-evenora-deep"
                style={{ left: `${minPct}%`, right: `${100 - maxPct}%` }}
              />
              <input
                type="range"
                className="evenora-range absolute inset-0 w-full"
                min={MIN}
                max={MAX}
                step={STEP}
                value={draftMin}
                onChange={(e) => handleMinChange(Number(e.target.value))}
                aria-label="Budget minimum"
              />
              <input
                type="range"
                className="evenora-range absolute inset-0 w-full"
                min={MIN}
                max={MAX}
                step={STEP}
                value={draftMax}
                onChange={(e) => handleMaxChange(Number(e.target.value))}
                aria-label="Budget maximum"
              />
            </div>

            <div className="mt-5 flex items-center gap-3">
              <label className="flex-1">
                <span className="mb-1 block font-sans text-[12px] font-medium text-evenora-secondary">Minimum</span>
                <div className="flex items-center rounded-xl border border-evenora-border px-3 py-2">
                  <input
                    type="number"
                    min={MIN}
                    max={draftMax - STEP}
                    step={STEP}
                    value={draftMin}
                    onChange={(e) => handleMinChange(Number(e.target.value) || MIN)}
                    className="w-full bg-transparent font-sans text-[14px] text-evenora-ink focus:outline-none"
                    aria-label="Montant minimum en euros"
                  />
                  <span className="font-sans text-[14px] text-evenora-secondary">€</span>
                </div>
              </label>
              <span className="mt-5 text-evenora-secondary">—</span>
              <label className="flex-1">
                <span className="mb-1 block font-sans text-[12px] font-medium text-evenora-secondary">Maximum</span>
                <div className="flex items-center rounded-xl border border-evenora-border px-3 py-2">
                  <input
                    type="number"
                    min={draftMin + STEP}
                    max={MAX}
                    step={STEP}
                    value={draftMax}
                    onChange={(e) => handleMaxChange(Number(e.target.value) || MAX)}
                    className="w-full bg-transparent font-sans text-[14px] text-evenora-ink focus:outline-none"
                    aria-label="Montant maximum en euros"
                  />
                  <span className="font-sans text-[14px] text-evenora-secondary">€</span>
                </div>
              </label>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <button
                type="button"
                onClick={clear}
                className="font-sans text-[14px] font-medium text-evenora-ink underline-offset-2 hover:underline"
              >
                Effacer
              </button>
              <button
                type="button"
                onClick={apply}
                className="rounded-pill bg-evenora-ink px-5 py-2.5 font-sans text-[14px] font-medium text-evenora-white transition-transform hover:-translate-y-0.5 active:scale-95"
              >
                Appliquer
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
