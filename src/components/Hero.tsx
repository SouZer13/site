import { useMemo } from 'react'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import CircularGallery from './CircularGallery.jsx'
import SearchBar from './SearchBar'
import EventTypePills from './EventTypePills'
import { buildGalleryItems } from '../data/gallery'
import type { SearchFilters } from '../types'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
}

interface HeroProps {
  filters: SearchFilters
  onFiltersChange: (next: Partial<SearchFilters>) => void
  onSearch: () => void
}

export default function Hero({ filters, onFiltersChange, onSearch }: HeroProps) {
  const galleryItems = useMemo(() => buildGalleryItems(), [])

  return (
    <section className="relative w-full overflow-x-hidden" style={{ paddingTop: 'clamp(40px, 7vw, 72px)', paddingBottom: 'clamp(12px, 2.5vw, 28px)' }}>
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2"
        style={{
          width: 'min(960px, 100%)',
          height: 540,
          background:
            'radial-gradient(50% 50% at 50% 38%, rgba(248,232,229,0.75) 0%, rgba(244,217,205,0.35) 45%, rgba(248,232,229,0) 72%)',
          zIndex: 0,
        }}
      />

      <div className="relative z-20 mx-auto flex max-w-[760px] flex-col items-center px-5 text-center sm:px-8">
        <motion.h1
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="font-display text-evenora-ink"
          style={{ fontWeight: 400, fontSize: 'clamp(2.5rem, 7vw, 4.5rem)', lineHeight: 1.1, letterSpacing: '-0.025em' }}
        >
          Des événements qui{' '}
          <span className="italic text-evenora-deep">vous ressemblent.</span>
        </motion.h1>

        <motion.p
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-6 max-w-[560px] font-sans text-evenora-secondary"
          style={{ fontSize: 'clamp(1rem, 2.2vw, 1.125rem)', lineHeight: 1.55, letterSpacing: '-0.011em' }}
        >
          Les meilleurs prestataires, disponibles à la bonne date et dans votre région.
        </motion.p>

        <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible" className="mt-10 w-full">
          <SearchBar filters={filters} onChange={onFiltersChange} onSearch={onSearch} />
        </motion.div>

        <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible" className="mt-6">
          <EventTypePills value={filters.eventType} onChange={(id) => onFiltersChange({ eventType: id })} />
        </motion.div>
      </div>

      <motion.div
        custom={4}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full"
        style={{
          height: 'clamp(340px, 50vh, 520px)',
          marginTop: 'clamp(24px, 4vw, 56px)',
          marginBottom: 'clamp(32px, 5vw, 64px)',
        }}
      >
        <CircularGallery
          items={galleryItems}
          bend={3}
          textColor="#211A1A"
          borderRadius={0.06}
          scrollEase={0.02}
          font="bold 30px Inter"
        />
      </motion.div>
    </section>
  )
}
