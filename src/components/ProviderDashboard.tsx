import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  BarChart3,
  Calendar,
  CheckCircle2,
  Inbox,
  LayoutGrid,
  MessageSquare,
  Phone,
  Star,
  User,
  Video,
  Wallet,
  XCircle,
} from 'lucide-react'
import { PROVIDER_REQUESTS, PROVIDER_STATS } from '../data/dashboard'
import { PROVIDERS } from '../data/providers'
import { REVIEWS } from '../data/reviews'
import AvailabilityCalendar from './AvailabilityCalendar'
import MessagingDemo from './MessagingDemo'
import type { ProviderRequest } from '../types'

const TABS = [
  { id: 'overview', label: 'Vue d’ensemble', icon: LayoutGrid },
  { id: 'profile', label: 'Mon profil', icon: User },
  { id: 'calendar', label: 'Calendrier', icon: Calendar },
  { id: 'requests', label: 'Demandes', icon: Inbox },
  { id: 'messages', label: 'Messages', icon: MessageSquare },
  { id: 'appointments', label: 'Rendez-vous', icon: Video },
  { id: 'reviews', label: 'Avis', icon: Star },
  { id: 'stats', label: 'Statistiques', icon: BarChart3 },
  { id: 'subscription', label: 'Abonnement', icon: Wallet },
] as const

type TabId = (typeof TABS)[number]['id']

const APPOINTMENT_TYPES = [
  { icon: User, label: 'Rendez-vous physique' },
  { icon: Phone, label: 'Appel téléphonique' },
  { icon: Video, label: 'Visioconférence' },
]

export default function ProviderDashboard() {
  const [tab, setTab] = useState<TabId>('overview')
  const [requests, setRequests] = useState<ProviderRequest[]>(PROVIDER_REQUESTS)
  const provider = PROVIDERS[0]

  function updateRequest(id: string, status: ProviderRequest['status']) {
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)))
  }

  return (
    <section className="mx-auto w-full max-w-content px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-[620px] text-center">
        <h2 className="font-display text-evenora-ink" style={{ fontSize: 'clamp(1.9rem, 4vw, 2.75rem)', fontWeight: 400, letterSpacing: '-0.02em' }}>
          Votre espace prestataire.
        </h2>
        <p className="mt-4 font-sans text-[16px] leading-relaxed text-evenora-secondary">
          Aperçu de démonstration du tableau de bord mis à disposition de chaque prestataire Événora.
        </p>
      </div>

      <div className="mx-auto mt-14 max-w-[960px] overflow-hidden rounded-card border border-evenora-border bg-evenora-white shadow-card">
        <div className="evenora-scroll flex gap-1 overflow-x-auto border-b border-evenora-border p-2">
          {TABS.map((t) => {
            const Icon = t.icon
            const active = tab === t.id
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`flex shrink-0 items-center gap-1.5 rounded-pill px-4 py-2 font-sans text-[13.5px] font-medium transition-colors ${
                  active ? 'bg-evenora-ink text-evenora-white' : 'text-evenora-ink hover:bg-evenora-ivory'
                }`}
              >
                <Icon size={14} /> {t.label}
              </button>
            )
          })}
        </div>

        <div className="p-6 sm:p-8">
          {tab === 'overview' && (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {PROVIDER_STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="rounded-2xl border border-evenora-border p-4"
                >
                  <p className="font-display text-[26px] font-normal text-evenora-ink">{s.value}</p>
                  <p className="mt-1 font-sans text-[12.5px] text-evenora-secondary">{s.label}</p>
                </motion.div>
              ))}
            </div>
          )}

          {tab === 'profile' && (
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="h-20 w-20 shrink-0 rounded-2xl" style={{ background: provider.gradient }} />
              <div>
                <p className="font-sans text-[17px] font-semibold text-evenora-ink">{provider.name}</p>
                <p className="font-sans text-[14px] text-evenora-secondary">{provider.categoryLabel} · {provider.city}</p>
                <p className="mt-2 max-w-[420px] font-sans text-[13.5px] leading-relaxed text-evenora-secondary">
                  {provider.description}
                </p>
              </div>
            </div>
          )}

          {tab === 'calendar' && <AvailabilityCalendar availability={provider.availability} compact />}

          {tab === 'requests' && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {requests.map((req) => (
                <div key={req.id} className="rounded-2xl border border-evenora-border p-5">
                  <div className="flex items-center justify-between">
                    <span className="rounded-pill bg-evenora-blush px-2.5 py-1 font-sans text-[12px] font-medium text-evenora-ink">
                      {req.status === 'nouvelle' ? 'Nouvelle demande' : req.status === 'acceptee' ? 'Acceptée' : 'Refusée'}
                    </span>
                    <span className="font-sans text-[12.5px] text-evenora-secondary">{req.date}</span>
                  </div>
                  <p className="mt-3 font-sans text-[15px] font-semibold text-evenora-ink">{req.eventType}</p>
                  <p className="mt-1 font-sans text-[13.5px] text-evenora-secondary">
                    {req.city} · {req.guests} personnes
                  </p>
                  <p className="mt-1 font-sans text-[13.5px] text-evenora-secondary">
                    Budget : {req.budgetMin.toLocaleString('fr-FR')} € – {req.budgetMax.toLocaleString('fr-FR')} €
                  </p>

                  {req.status === 'nouvelle' ? (
                    <div className="mt-4 flex gap-2">
                      <button
                        type="button"
                        onClick={() => updateRequest(req.id, 'acceptee')}
                        className="flex-1 rounded-pill bg-evenora-ink py-2 font-sans text-[13.5px] font-medium text-evenora-white"
                      >
                        Accepter
                      </button>
                      <button
                        type="button"
                        onClick={() => updateRequest(req.id, 'refusee')}
                        className="flex-1 rounded-pill border border-evenora-border py-2 font-sans text-[13.5px] font-medium text-evenora-ink hover:bg-evenora-ivory"
                      >
                        Refuser
                      </button>
                    </div>
                  ) : req.status === 'acceptee' ? (
                    <p className="mt-4 flex items-center gap-1.5 font-sans text-[13px] font-medium text-[#3F6B4E]">
                      <CheckCircle2 size={14} /> Contact confirmé — messagerie ouverte
                    </p>
                  ) : (
                    <p className="mt-4 flex items-center gap-1.5 font-sans text-[13px] font-medium text-evenora-secondary">
                      <XCircle size={14} /> Demande refusée
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          {tab === 'messages' && <MessagingDemo embedded />}

          {tab === 'appointments' && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {APPOINTMENT_TYPES.map((a) => (
                <div key={a.label} className="rounded-2xl border border-evenora-border p-5">
                  <a.icon size={18} className="text-evenora-deep" />
                  <p className="mt-3 font-sans text-[14.5px] font-medium text-evenora-ink">{a.label}</p>
                  <p className="mt-1 font-sans text-[13px] text-evenora-secondary">Proposé le 22 mai, 14h00</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button type="button" className="rounded-pill bg-evenora-ink px-3 py-1.5 font-sans text-[12.5px] font-medium text-evenora-white">
                      Accepter
                    </button>
                    <button type="button" className="rounded-pill border border-evenora-border px-3 py-1.5 font-sans text-[12.5px] font-medium text-evenora-ink hover:bg-evenora-ivory">
                      Refuser
                    </button>
                    <button type="button" className="rounded-pill border border-evenora-border px-3 py-1.5 font-sans text-[12.5px] font-medium text-evenora-ink hover:bg-evenora-ivory">
                      Autre horaire
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === 'reviews' && (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {REVIEWS.map((r) => (
                <div key={r.id} className="rounded-2xl bg-evenora-ivory p-4">
                  <span className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={13} className={i < r.rating ? 'fill-evenora-champagne text-evenora-champagne' : 'text-evenora-border'} />
                    ))}
                  </span>
                  <p className="mt-2 font-sans text-[13.5px] leading-relaxed text-evenora-ink">&ldquo;{r.text}&rdquo;</p>
                  <p className="mt-1.5 font-sans text-[12.5px] font-medium text-evenora-secondary">{r.author} · {r.date}</p>
                </div>
              ))}
            </div>
          )}

          {tab === 'stats' && (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {PROVIDER_STATS.map((s) => (
                <div key={s.label} className="rounded-2xl border border-evenora-border p-4">
                  <p className="font-display text-[26px] font-normal text-evenora-ink">{s.value}</p>
                  <p className="mt-1 font-sans text-[12.5px] text-evenora-secondary">{s.label}</p>
                </div>
              ))}
            </div>
          )}

          {tab === 'subscription' && (
            <div className="flex flex-col items-start gap-3">
              <p className="font-sans text-[14.5px] text-evenora-ink">
                Vous êtes actuellement sur l&rsquo;offre <span className="font-semibold">Pro</span>.
              </p>
              <a href="#tarifs" className="rounded-pill bg-evenora-ink px-5 py-2.5 font-sans text-[14px] font-medium text-evenora-white">
                Voir les offres
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
