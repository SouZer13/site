import { motion } from 'framer-motion'
import { Calendar, ClipboardCheck, LineChart, MessageSquare, User, Users } from 'lucide-react'

const POINTS = [
  { icon: User, label: 'Un profil professionnel' },
  { icon: Calendar, label: 'Un calendrier intelligent' },
  { icon: Users, label: 'Des demandes qualifiées' },
  { icon: MessageSquare, label: 'Une messagerie centralisée' },
  { icon: LineChart, label: 'Des statistiques utiles' },
  { icon: ClipboardCheck, label: 'Une visibilité adaptée à votre activité' },
]

interface ForProvidersProps {
  onBecomeProvider: () => void
}

export default function ForProviders({ onBecomeProvider }: ForProvidersProps) {
  return (
    <section className="mx-auto w-full max-w-content px-5 py-20 sm:px-8 sm:py-28">
      <div className="grid grid-cols-1 items-center gap-12 rounded-card bg-evenora-ivory p-8 sm:p-12 lg:grid-cols-2 lg:p-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="font-display text-evenora-ink" style={{ fontSize: 'clamp(1.9rem, 3.6vw, 2.5rem)', fontWeight: 400, letterSpacing: '-0.02em' }}>
            Votre talent mérite d&rsquo;être trouvé.
          </h2>
          <p className="mt-4 max-w-[440px] font-sans text-[15.5px] leading-relaxed text-evenora-secondary">
            Événora vous aide à transformer votre visibilité en véritables opportunités.
          </p>
          <button
            type="button"
            onClick={onBecomeProvider}
            className="mt-8 rounded-pill bg-evenora-ink px-6 py-3.5 font-sans text-[14.5px] font-medium text-evenora-white transition-transform hover:-translate-y-0.5 active:scale-95"
          >
            Créer mon profil professionnel
          </button>
        </motion.div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {POINTS.map((p, i) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3 rounded-2xl bg-evenora-white p-4 shadow-subtle"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-evenora-blush text-evenora-deep">
                <p.icon size={16} strokeWidth={1.75} />
              </span>
              <span className="font-sans text-[13.5px] font-medium text-evenora-ink">{p.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
