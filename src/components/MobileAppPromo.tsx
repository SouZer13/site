import { motion } from 'framer-motion'
import { Apple, Play } from 'lucide-react'
import { CHECKLIST, MY_EVENT } from '../data/dashboard'

export default function MobileAppPromo() {
  return (
    <section className="mx-auto w-full max-w-content px-5 py-20 sm:px-8 sm:py-28">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="order-2 lg:order-1"
        >
          <h2 className="font-display text-evenora-ink" style={{ fontSize: 'clamp(1.9rem, 4vw, 2.75rem)', fontWeight: 400, letterSpacing: '-0.02em' }}>
            Votre événement vous suit partout.
          </h2>
          <p className="mt-5 max-w-[440px] font-sans text-[15.5px] leading-relaxed text-evenora-secondary">
            Retrouvez vos prestataires, messages, rendez-vous et checklist depuis votre téléphone.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-2 rounded-2xl bg-evenora-ink px-4 py-2.5 font-sans text-[13px] font-medium text-evenora-white opacity-70">
              <Apple size={18} /> App Store
            </span>
            <span className="flex items-center gap-2 rounded-2xl bg-evenora-ink px-4 py-2.5 font-sans text-[13px] font-medium text-evenora-white opacity-70">
              <Play size={16} /> Google Play
            </span>
          </div>
          <p className="mt-3 font-sans text-[12.5px] text-evenora-secondary">Bientôt disponible.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="order-1 flex justify-center lg:order-2"
        >
          <div
            className="evenora-float relative rounded-[44px] border-[10px] border-evenora-ink bg-evenora-ivory p-1.5 shadow-lifted"
            style={{ width: 260, height: 540 }}
          >
            <div className="absolute left-1/2 top-2.5 h-1.5 w-16 -translate-x-1/2 rounded-pill bg-evenora-ink/70" />
            <div className="h-full w-full overflow-hidden rounded-[32px] bg-evenora-white p-4">
              <p className="font-sans text-[11px] font-semibold uppercase tracking-wide text-evenora-secondary">Mon événement</p>
              <p className="mt-1 font-display text-[16px] font-normal text-evenora-ink">{MY_EVENT.title}</p>
              <p className="mt-0.5 font-sans text-[11.5px] text-evenora-secondary">{MY_EVENT.date} · {MY_EVENT.city}</p>

              <div className="mt-4 space-y-2">
                {CHECKLIST.slice(0, 5).map((item) => (
                  <div key={item.id} className="flex items-center justify-between rounded-xl bg-evenora-ivory px-3 py-2">
                    <span className="font-sans text-[11.5px] font-medium text-evenora-ink">{item.category}</span>
                    <span
                      className={`h-2 w-2 rounded-full ${
                        item.status === 'confirme' ? 'bg-[#8CB89C]' : item.status === 'discussion' ? 'bg-[#D9A05B]' : 'bg-evenora-border'
                      }`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
