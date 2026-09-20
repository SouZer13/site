import { motion } from 'framer-motion'
import { CalendarDays, CheckCircle2, Circle, MapPin, MessageCircleDashed, Users } from 'lucide-react'
import { CHECKLIST, MY_EVENT } from '../data/dashboard'
import type { ChecklistItem } from '../types'

const STATUS_LABEL: Record<ChecklistItem['status'], string> = {
  confirme: 'Confirmé',
  discussion: 'En discussion',
  recherche: 'À rechercher',
}

const STATUS_STYLE: Record<ChecklistItem['status'], string> = {
  confirme: 'bg-[#E8F1EB] text-[#3F6B4E]',
  discussion: 'bg-[#FBEEDD] text-[#8A5A22]',
  recherche: 'bg-evenora-ivory text-evenora-secondary',
}

const STATUS_ICON: Record<ChecklistItem['status'], typeof CheckCircle2> = {
  confirme: CheckCircle2,
  discussion: MessageCircleDashed,
  recherche: Circle,
}

export default function MyEventDashboard() {
  const confirmedCount = CHECKLIST.filter((c) => c.status === 'confirme').length
  const progressPct = Math.round((confirmedCount / CHECKLIST.length) * 100)

  return (
    <section className="mx-auto w-full max-w-content px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-[620px] text-center">
        <h2 className="font-display text-evenora-ink" style={{ fontSize: 'clamp(1.9rem, 4vw, 2.75rem)', fontWeight: 400, letterSpacing: '-0.02em' }}>
          Tout votre événement, au même endroit.
        </h2>
        <p className="mt-4 font-sans text-[16px] leading-relaxed text-evenora-secondary">
          Suivez vos prestataires, votre budget et votre checklist depuis un tableau de bord unique.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto mt-14 max-w-[760px] rounded-card border border-evenora-border bg-evenora-white p-6 shadow-card sm:p-8"
      >
        <div className="flex flex-col justify-between gap-5 border-b border-evenora-border pb-6 sm:flex-row sm:items-center">
          <div>
            <p className="font-sans text-[12px] font-semibold uppercase tracking-wide text-evenora-secondary">Mon événement</p>
            <p className="mt-1 font-display text-[22px] font-normal text-evenora-ink">{MY_EVENT.title}</p>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 font-sans text-[13.5px] text-evenora-secondary">
              <span className="flex items-center gap-1.5">
                <CalendarDays size={14} /> {MY_EVENT.date}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin size={14} /> {MY_EVENT.city}
              </span>
              <span className="flex items-center gap-1.5">
                <Users size={14} /> {MY_EVENT.guests} invités
              </span>
            </div>
          </div>
          <div className="min-w-[180px]">
            <div className="flex items-center justify-between font-sans text-[13px] text-evenora-ink">
              <span className="font-medium">{confirmedCount} / {CHECKLIST.length} prestataires trouvés</span>
              <span className="text-evenora-secondary">{progressPct}%</span>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-pill bg-evenora-blush">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${progressPct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="h-full rounded-pill bg-evenora-deep"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {CHECKLIST.map((item) => {
            const Icon = STATUS_ICON[item.status]
            return (
              <div
                key={item.id}
                className="flex items-center justify-between gap-3 rounded-2xl border border-evenora-border px-4 py-3"
              >
                <span className="font-sans text-[14.5px] font-medium text-evenora-ink">{item.category}</span>
                <span className={`flex items-center gap-1.5 rounded-pill px-3 py-1 font-sans text-[12.5px] font-medium ${STATUS_STYLE[item.status]}`}>
                  <Icon size={13} /> {STATUS_LABEL[item.status]}
                </span>
              </div>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}
