import { Search } from 'lucide-react'
import PrestationSelect from './PrestationSelect'
import LocationSelect from './LocationSelect'
import DateSelect from './DateSelect'
import BudgetSelector from './BudgetSelector'
import type { SearchFilters } from '../types'

interface SearchBarProps {
  filters: SearchFilters
  onChange: (next: Partial<SearchFilters>) => void
  onSearch: () => void
}

export default function SearchBar({ filters, onChange, onSearch }: SearchBarProps) {
  return (
    <div className="w-full rounded-[28px] border border-evenora-border bg-evenora-white p-2 shadow-lifted transition-shadow hover:shadow-lifted sm:p-2.5">
      <div className="flex flex-col divide-y divide-evenora-border sm:flex-row sm:items-center sm:divide-x sm:divide-y-0">
        <PrestationSelect
          value={filters.prestation}
          onChange={(id) => onChange({ prestation: id })}
          className="sm:flex-1"
        />
        <LocationSelect
          value={filters.location}
          onChange={(city) => onChange({ location: city })}
          className="sm:flex-1"
        />
        <DateSelect
          value={filters.date}
          onChange={(date) => onChange({ date })}
          className="sm:flex-1"
        />
        <div className="flex items-center gap-2 sm:flex-1">
          <BudgetSelector
            min={filters.budgetMin}
            max={filters.budgetMax}
            onApply={(min, max) => onChange({ budgetMin: min, budgetMax: max })}
            className="flex-1"
          />
          <button
            type="button"
            onClick={onSearch}
            aria-label="Rechercher des prestataires"
            className="mr-1.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-evenora-ink text-evenora-white transition-transform duration-200 hover:-translate-y-0.5 hover:scale-105 active:scale-95 sm:h-11 sm:w-11"
          >
            <Search size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
