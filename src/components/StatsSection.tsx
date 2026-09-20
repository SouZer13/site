import { motion } from 'framer-motion'

const STATS = [
  { value: '2 500+', label: 'prestataires' },
  { value: '40+', label: 'catégories' },
  { value: '120+', label: 'villes' },
  { value: '10 000+', label: 'projets accompagnés' },
]

export default function StatsSection() {
  return (
    <section className="mx-auto w-full max-w-content px-5 py-14 sm:px-8">
      <div className="grid grid-cols-2 gap-6 border-y border-evenora-border py-10 sm:grid-cols-4">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="text-center"
          >
            <p className="font-display text-[30px] font-normal text-evenora-ink sm:text-[36px]">{s.value}</p>
            <p className="mt-1 font-sans text-[13px] text-evenora-secondary">{s.label}</p>
          </motion.div>
        ))}
      </div>
      <p className="mt-4 text-center font-sans text-[12px] text-evenora-secondary">
        Chiffres de démonstration présentés dans ce prototype, à titre indicatif uniquement.
      </p>
    </section>
  )
}
