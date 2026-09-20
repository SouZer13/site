import { motion } from 'framer-motion'
import * as Icons from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { CATEGORIES } from '../data/categories'

interface CategoryGridProps {
  onSelectCategory: (id: string, label: string) => void
}

export default function CategoryGrid({ onSelectCategory }: CategoryGridProps) {
  return (
    <section id="decouvrir" className="mx-auto w-full max-w-content px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-[620px] text-center">
        <h2 className="font-display text-evenora-ink" style={{ fontSize: 'clamp(1.9rem, 4vw, 2.75rem)', fontWeight: 400, letterSpacing: '-0.02em' }}>
          Tout ce qu&rsquo;il faut pour votre événement.
        </h2>
        <p className="mt-4 font-sans text-[16px] leading-relaxed text-evenora-secondary">
          Découvrez des professionnels sélectionnés pour donner vie à chaque détail.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
        {CATEGORIES.slice(0, 8).map((cat, i) => {
          const Icon = (Icons as unknown as Record<string, LucideIcon>)[cat.icon] ?? Icons.Sparkles
          return (
            <motion.button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id, cat.label)}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -3 }}
              className="group flex flex-col items-start gap-4 rounded-card border border-evenora-border bg-evenora-white p-5 text-left shadow-subtle transition-shadow hover:shadow-card sm:p-6"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-evenora-blush text-evenora-deep transition-colors group-hover:bg-evenora-deep group-hover:text-evenora-white">
                <Icon size={20} strokeWidth={1.75} />
              </span>
              <div>
                <p className="font-sans text-[15.5px] font-semibold text-evenora-ink">{cat.label}</p>
                <p className="mt-1 font-sans text-[13.5px] text-evenora-secondary">{cat.description}</p>
              </div>
              <span className="mt-auto font-sans text-[12.5px] font-medium text-evenora-champagne">
                {cat.providerCount} prestataires·démo
              </span>
            </motion.button>
          )
        })}
      </div>
    </section>
  )
}
