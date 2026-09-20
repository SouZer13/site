import { EVENT_TYPES } from '../data/eventTypes'

interface EventTypePillsProps {
  value: string | null
  onChange: (id: string | null) => void
}

export default function EventTypePills({ value, onChange }: EventTypePillsProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2.5" role="group" aria-label="Type d'événement">
      {EVENT_TYPES.map((type) => {
        const active = value === type.id
        return (
          <button
            key={type.id}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(active ? null : type.id)}
            className={`rounded-pill border px-4 py-2 font-sans text-[13.5px] font-medium transition-colors ${
              active
                ? 'border-evenora-deep bg-evenora-deep text-evenora-white'
                : 'border-evenora-border bg-evenora-white text-evenora-ink hover:border-evenora-nude hover:bg-evenora-ivory'
            }`}
          >
            {type.label}
          </button>
        )
      })}
    </div>
  )
}
