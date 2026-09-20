import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { AvailabilityStatus } from '../types'

const WEEKDAYS = ['L', 'M', 'M', 'J', 'V', 'S', 'D']
const MONTHS = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
]

const STATUS_STYLES: Record<AvailabilityStatus, string> = {
  disponible: 'bg-[#E8F1EB] text-[#3F6B4E] hover:bg-[#DCEBE1]',
  attente: 'bg-[#FBEEDD] text-[#8A5A22] hover:bg-[#F7E4C8]',
  reserve: 'bg-[#F7E1E4] text-[#9C3E4E] hover:bg-[#F2D3D8]',
}

interface AvailabilityCalendarProps {
  availability: Record<string, AvailabilityStatus>
  selectedDate?: string | null
  onSelectDate?: (iso: string, status: AvailabilityStatus) => void
  compact?: boolean
}

function toIso(d: Date) {
  return d.toISOString().slice(0, 10)
}

export default function AvailabilityCalendar({ availability, selectedDate, onSelectDate, compact = false }: AvailabilityCalendarProps) {
  const today = new Date()
  const [viewMonth, setViewMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1))

  const firstDayIndex = (new Date(viewMonth.getFullYear(), viewMonth.getMonth(), 1).getDay() + 6) % 7
  const daysInMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 0).getDate()
  const cells: (Date | null)[] = [
    ...Array.from({ length: firstDayIndex }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(viewMonth.getFullYear(), viewMonth.getMonth(), i + 1)),
  ]

  return (
    <div className={compact ? '' : 'rounded-card border border-evenora-border bg-evenora-white p-5'}>
      <div className="flex items-center justify-between">
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
          const status = availability[iso] ?? 'disponible'
          const isSelected = selectedDate === iso
          const disabled = status === 'reserve'
          return (
            <button
              key={iso}
              type="button"
              disabled={disabled || !onSelectDate}
              onClick={() => onSelectDate?.(iso, status)}
              title={status === 'disponible' ? 'Disponible' : status === 'attente' ? 'En attente' : 'Réservé'}
              className={`flex h-9 w-9 items-center justify-center rounded-full font-sans text-[13px] transition-colors disabled:cursor-not-allowed ${STATUS_STYLES[status]} ${
                isSelected ? 'ring-2 ring-evenora-ink' : ''
              }`}
            >
              {d.getDate()}
            </button>
          )
        })}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-4">
        <span className="flex items-center gap-1.5 font-sans text-[12.5px] text-evenora-secondary">
          <span className="h-2.5 w-2.5 rounded-full bg-[#8CB89C]" /> Disponible
        </span>
        <span className="flex items-center gap-1.5 font-sans text-[12.5px] text-evenora-secondary">
          <span className="h-2.5 w-2.5 rounded-full bg-[#D9A05B]" /> En attente
        </span>
        <span className="flex items-center gap-1.5 font-sans text-[12.5px] text-evenora-secondary">
          <span className="h-2.5 w-2.5 rounded-full bg-[#D6828E]" /> Réservé
        </span>
      </div>
    </div>
  )
}
