import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { INSPIRATIONS } from '../data/inspirations'

export default function Inspirations() {
  return (
    <section id="inspirations" className="mx-auto w-full max-w-content px-5 py-20 sm:px-8 sm:py-28">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h2 className="font-display text-evenora-ink" style={{ fontSize: 'clamp(1.9rem, 4vw, 2.75rem)', fontWeight: 400, letterSpacing: '-0.02em' }}>
            Pour vous inspirer.
          </h2>
          <p className="mt-3 max-w-[460px] font-sans text-[15.5px] leading-relaxed text-evenora-secondary">
            Conseils, idées et guides pratiques pour préparer votre événement sereinement.
          </p>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {INSPIRATIONS.map((a, i) => (
          <motion.a
            key={a.id}
            href="#"
            onClick={(e) => e.preventDefault()}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="group flex flex-col overflow-hidden rounded-card border border-evenora-border bg-evenora-white shadow-subtle transition-shadow hover:shadow-card"
          >
            <div className="aspect-[4/3] w-full transition-transform duration-500 group-hover:scale-105" style={{ background: a.gradient }} />
            <div className="flex flex-1 flex-col p-5">
              <span className="font-sans text-[12px] font-semibold uppercase tracking-wide text-evenora-champagne">{a.category}</span>
              <p className="mt-2 font-sans text-[15px] font-semibold leading-snug text-evenora-ink">{a.title}</p>
              <div className="mt-auto flex items-center justify-between pt-4">
                <span className="font-sans text-[12.5px] text-evenora-secondary">{a.readTime} de lecture</span>
                <ArrowUpRight size={15} className="text-evenora-ink transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  )
}
