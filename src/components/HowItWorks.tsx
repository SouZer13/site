import { motion } from 'framer-motion'

const STEPS = [
  {
    n: '01',
    title: 'Décrivez votre événement',
    text: 'Lieu, date, budget et prestation recherchée : quelques informations suffisent.',
  },
  {
    n: '02',
    title: 'Découvrez les bons prestataires',
    text: 'Événora sélectionne ceux qui correspondent réellement à vos critères et disponibilités.',
  },
  {
    n: '03',
    title: 'Entrez en contact',
    text: 'Envoyez une demande et échangez librement une fois votre demande acceptée.',
  },
]

export default function HowItWorks() {
  return (
    <section id="comment-ca-marche" className="mx-auto w-full max-w-content px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-[560px] text-center">
        <h2 className="font-display text-evenora-ink" style={{ fontSize: 'clamp(1.9rem, 4vw, 2.75rem)', fontWeight: 400, letterSpacing: '-0.02em' }}>
          Comment ça marche.
        </h2>
      </div>

      <div className="relative mt-16 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8">
        <div
          aria-hidden
          className="absolute left-0 right-0 top-[26px] hidden h-px bg-evenora-border sm:block"
          style={{ marginLeft: '16.66%', marginRight: '16.66%' }}
        />
        {STEPS.map((step, i) => (
          <motion.div
            key={step.n}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex flex-col items-center text-center sm:items-start sm:text-left"
          >
            <span className="relative z-10 flex h-[52px] w-[52px] items-center justify-center rounded-full border border-evenora-border bg-evenora-white font-display text-[18px] text-evenora-deep">
              {step.n}
            </span>
            <p className="mt-5 font-sans text-[18px] font-semibold text-evenora-ink">{step.title}</p>
            <p className="mt-2 max-w-[280px] font-sans text-[14.5px] leading-relaxed text-evenora-secondary">{step.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
