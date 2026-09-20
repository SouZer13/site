import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { PRICING_PLANS } from '../data/pricing'

export default function Pricing() {
  const [yearly, setYearly] = useState(false)

  return (
    <section id="tarifs" className="mx-auto w-full max-w-content px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-[560px] text-center">
        <h2 className="font-display text-evenora-ink" style={{ fontSize: 'clamp(1.9rem, 4vw, 2.75rem)', fontWeight: 400, letterSpacing: '-0.02em' }}>
          Une offre pour chaque ambition.
        </h2>
        <p className="mt-4 font-sans text-[16px] leading-relaxed text-evenora-secondary">
          Choisissez le niveau de visibilité qui correspond à votre activité.
        </p>

        <div className="mt-7 inline-flex items-center gap-1 rounded-pill border border-evenora-border bg-evenora-white p-1">
          <button
            type="button"
            onClick={() => setYearly(false)}
            className={`rounded-pill px-4 py-2 font-sans text-[13.5px] font-medium transition-colors ${
              !yearly ? 'bg-evenora-ink text-evenora-white' : 'text-evenora-ink'
            }`}
          >
            Mensuel
          </button>
          <button
            type="button"
            onClick={() => setYearly(true)}
            className={`flex items-center gap-1.5 rounded-pill px-4 py-2 font-sans text-[13.5px] font-medium transition-colors ${
              yearly ? 'bg-evenora-ink text-evenora-white' : 'text-evenora-ink'
            }`}
          >
            Annuel
            <span className={`rounded-pill px-1.5 py-0.5 font-sans text-[11px] ${yearly ? 'bg-evenora-white/20' : 'bg-evenora-blush text-evenora-deep'}`}>
              -20%
            </span>
          </button>
        </div>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {PRICING_PLANS.map((plan, i) => {
          const price = yearly ? plan.yearlyPrice : plan.monthlyPrice
          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className={`relative flex flex-col rounded-card border p-6 ${
                plan.highlight
                  ? 'border-evenora-deep bg-evenora-ink text-evenora-white shadow-lifted'
                  : 'border-evenora-border bg-evenora-white shadow-subtle'
              }`}
            >
              {plan.badge && (
                <span className="absolute -top-3 left-6 rounded-pill bg-evenora-champagne px-3 py-1 font-sans text-[11.5px] font-semibold text-evenora-ink">
                  {plan.badge}
                </span>
              )}
              <p className={`font-sans text-[15px] font-semibold ${plan.highlight ? 'text-evenora-white' : 'text-evenora-ink'}`}>{plan.name}</p>
              <p className="mt-3 flex items-baseline gap-1">
                <span className="font-display text-[32px] font-normal">
                  {price === 0 ? '0 €' : `${price.toFixed(2).replace('.', ',')} €`}
                </span>
                {price > 0 && (
                  <span className={`font-sans text-[13px] ${plan.highlight ? 'text-evenora-white/70' : 'text-evenora-secondary'}`}>/mois</span>
                )}
              </p>

              <ul className="mt-6 flex-1 space-y-2.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 font-sans text-[13.5px]">
                    <Check size={15} className={plan.highlight ? 'mt-0.5 shrink-0 text-evenora-champagne' : 'mt-0.5 shrink-0 text-evenora-deep'} />
                    <span className={plan.highlight ? 'text-evenora-white/90' : 'text-evenora-ink'}>{f}</span>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                className={`mt-7 rounded-pill py-3 font-sans text-[14px] font-medium transition-transform hover:-translate-y-0.5 active:scale-95 ${
                  plan.highlight ? 'bg-evenora-white text-evenora-ink' : 'bg-evenora-ink text-evenora-white'
                }`}
              >
                {plan.id === 'free' ? 'Commencer' : 'Choisir cette offre'}
              </button>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
