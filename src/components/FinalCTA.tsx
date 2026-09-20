import { motion } from 'framer-motion'

interface FinalCTAProps {
  onFindProviders: () => void
  onBecomeProvider: () => void
}

export default function FinalCTA({ onFindProviders, onBecomeProvider }: FinalCTAProps) {
  return (
    <section className="mx-auto w-full max-w-content px-5 pb-20 sm:px-8 sm:pb-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-card px-6 py-16 text-center sm:px-12 sm:py-24"
        style={{ background: 'linear-gradient(160deg, #FFF9F6 0%, #F8E8E5 55%, #F4D9CD 100%)' }}
      >
        <h2 className="font-display text-evenora-ink" style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)', fontWeight: 400, letterSpacing: '-0.025em' }}>
          Votre prochain événement commence ici.
        </h2>
        <p className="mx-auto mt-5 max-w-[480px] font-sans text-[16px] leading-relaxed text-evenora-secondary">
          Trouvez les professionnels qui transformeront vos idées en souvenirs.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={onFindProviders}
            className="rounded-pill bg-evenora-ink px-7 py-3.5 font-sans text-[15px] font-medium text-evenora-white transition-transform hover:-translate-y-0.5 active:scale-95"
          >
            Trouver mes prestataires
          </button>
          <button
            type="button"
            onClick={onBecomeProvider}
            className="font-sans text-[15px] font-medium text-evenora-ink underline-offset-4 hover:underline"
          >
            Je suis prestataire
          </button>
        </div>
      </motion.div>
    </section>
  )
}
