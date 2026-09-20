import { motion } from 'framer-motion'
import { PROVIDERS } from '../data/providers'
import AvailabilityCalendar from './AvailabilityCalendar'

export default function AvailabilityShowcase() {
  const provider = PROVIDERS[3]

  return (
    <section className="mx-auto w-full max-w-content px-5 py-20 sm:px-8 sm:py-28">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="font-display text-evenora-ink" style={{ fontSize: 'clamp(1.9rem, 4vw, 2.75rem)', fontWeight: 400, letterSpacing: '-0.02em' }}>
            Ne contactez que les prestataires réellement disponibles à votre date.
          </h2>
          <p className="mt-5 max-w-[460px] font-sans text-[15.5px] leading-relaxed text-evenora-secondary">
            Chaque prestataire tient son calendrier à jour sur Événora. Vous voyez immédiatement qui est libre, en discussion ou déjà réservé — plus besoin d&rsquo;attendre une réponse pour le savoir.
          </p>
          <div className="mt-7 flex flex-col gap-3">
            <div className="flex items-center gap-3 font-sans text-[14.5px] text-evenora-ink">
              <span className="h-3 w-3 rounded-full bg-[#8CB89C]" /> Disponible — répond généralement en moins de 24h
            </div>
            <div className="flex items-center gap-3 font-sans text-[14.5px] text-evenora-ink">
              <span className="h-3 w-3 rounded-full bg-[#D9A05B]" /> En attente — en discussion avec d&rsquo;autres clients
            </div>
            <div className="flex items-center gap-3 font-sans text-[14.5px] text-evenora-ink">
              <span className="h-3 w-3 rounded-full bg-[#D6828E]" /> Réservé — non disponible à cette date
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-3 font-sans text-[13.5px] font-medium text-evenora-secondary">Calendrier de {provider.name}</p>
          <AvailabilityCalendar availability={provider.availability} />
        </motion.div>
      </div>
    </section>
  )
}
