import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Loader2, X } from 'lucide-react'
import { EVENT_TYPES } from '../data/eventTypes'
import { CITIES } from '../data/cities'
import { useAppState } from '../context/AppStateContext'

type Step = 'form' | 'sent' | 'confirmed'

export default function ContactRequestModal() {
  const { contactModal, closeContactModal } = useAppState()
  const open = contactModal !== null
  const [step, setStep] = useState<Step>('form')
  const [form, setForm] = useState({
    firstName: '',
    eventType: '',
    date: '',
    city: '',
    guests: '',
    budget: '',
    message: '',
  })

  useEffect(() => {
    if (open) {
      setStep('form')
      setForm({ firstName: '', eventType: '', date: '', city: '', guests: '', budget: '', message: '' })
    }
  }, [open])

  useEffect(() => {
    if (step !== 'sent') return
    const t = setTimeout(() => setStep('confirmed'), 1800)
    return () => clearTimeout(t)
  }, [step])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStep('sent')
  }

  const providerName = contactModal?.providerName

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-50"
            style={{ backgroundColor: 'rgba(33,26,26,0.4)', backdropFilter: 'blur(4px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeContactModal}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true">
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="evenora-scroll relative max-h-[88vh] w-full max-w-[520px] overflow-y-auto rounded-card bg-evenora-white p-6 shadow-lifted sm:p-8"
            >
              <button
                type="button"
                onClick={closeContactModal}
                aria-label="Fermer"
                className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full text-evenora-ink hover:bg-evenora-ivory"
              >
                <X size={18} />
              </button>

              {step === 'form' && (
                <>
                  <p className="font-display text-[24px] font-normal text-evenora-ink">
                    Demander à être mis en relation
                  </p>
                  <p className="mt-1.5 font-sans text-[14px] text-evenora-secondary">
                    {providerName ? `Avec ${providerName}. ` : ''}Le contact du prestataire n&rsquo;est partagé qu&rsquo;après acceptation de votre demande.
                  </p>

                  <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <label className="flex flex-col gap-1.5 sm:col-span-1">
                      <span className="font-sans text-[13px] font-medium text-evenora-ink">Prénom</span>
                      <input
                        required
                        value={form.firstName}
                        onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                        className="rounded-xl border border-evenora-border px-3.5 py-2.5 font-sans text-[14px] text-evenora-ink focus:border-evenora-deep focus:outline-none"
                        placeholder="Votre prénom"
                      />
                    </label>

                    <label className="flex flex-col gap-1.5 sm:col-span-1">
                      <span className="font-sans text-[13px] font-medium text-evenora-ink">Type d&rsquo;événement</span>
                      <select
                        required
                        value={form.eventType}
                        onChange={(e) => setForm({ ...form, eventType: e.target.value })}
                        className="rounded-xl border border-evenora-border bg-evenora-white px-3.5 py-2.5 font-sans text-[14px] text-evenora-ink focus:border-evenora-deep focus:outline-none"
                      >
                        <option value="" disabled>
                          Choisir
                        </option>
                        {EVENT_TYPES.map((t) => (
                          <option key={t.id} value={t.label}>
                            {t.label}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="flex flex-col gap-1.5 sm:col-span-1">
                      <span className="font-sans text-[13px] font-medium text-evenora-ink">Date</span>
                      <input
                        required
                        type="date"
                        value={form.date}
                        onChange={(e) => setForm({ ...form, date: e.target.value })}
                        className="rounded-xl border border-evenora-border px-3.5 py-2.5 font-sans text-[14px] text-evenora-ink focus:border-evenora-deep focus:outline-none"
                      />
                    </label>

                    <label className="flex flex-col gap-1.5 sm:col-span-1">
                      <span className="font-sans text-[13px] font-medium text-evenora-ink">Lieu</span>
                      <select
                        required
                        value={form.city}
                        onChange={(e) => setForm({ ...form, city: e.target.value })}
                        className="rounded-xl border border-evenora-border bg-evenora-white px-3.5 py-2.5 font-sans text-[14px] text-evenora-ink focus:border-evenora-deep focus:outline-none"
                      >
                        <option value="" disabled>
                          Choisir
                        </option>
                        {CITIES.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="flex flex-col gap-1.5 sm:col-span-1">
                      <span className="font-sans text-[13px] font-medium text-evenora-ink">Nombre d&rsquo;invités</span>
                      <input
                        required
                        type="number"
                        min={1}
                        value={form.guests}
                        onChange={(e) => setForm({ ...form, guests: e.target.value })}
                        className="rounded-xl border border-evenora-border px-3.5 py-2.5 font-sans text-[14px] text-evenora-ink focus:border-evenora-deep focus:outline-none"
                        placeholder="Ex. 120"
                      />
                    </label>

                    <label className="flex flex-col gap-1.5 sm:col-span-1">
                      <span className="font-sans text-[13px] font-medium text-evenora-ink">Budget</span>
                      <input
                        required
                        value={form.budget}
                        onChange={(e) => setForm({ ...form, budget: e.target.value })}
                        className="rounded-xl border border-evenora-border px-3.5 py-2.5 font-sans text-[14px] text-evenora-ink focus:border-evenora-deep focus:outline-none"
                        placeholder="Ex. 1 500 – 2 500 €"
                      />
                    </label>

                    <label className="flex flex-col gap-1.5 sm:col-span-2">
                      <span className="font-sans text-[13px] font-medium text-evenora-ink">Message</span>
                      <textarea
                        rows={3}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="resize-none rounded-xl border border-evenora-border px-3.5 py-2.5 font-sans text-[14px] text-evenora-ink focus:border-evenora-deep focus:outline-none"
                        placeholder="Décrivez votre projet en quelques mots..."
                      />
                    </label>

                    <button
                      type="submit"
                      className="mt-1 rounded-pill bg-evenora-ink py-3.5 font-sans text-[15px] font-medium text-evenora-white transition-transform hover:-translate-y-0.5 active:scale-95 sm:col-span-2"
                    >
                      Envoyer ma demande
                    </button>
                  </form>
                </>
              )}

              {step === 'sent' && (
                <div className="flex flex-col items-center py-10 text-center">
                  <Loader2 size={34} className="animate-spin text-evenora-deep" />
                  <p className="mt-5 font-display text-[22px] font-normal text-evenora-ink">Demande envoyée</p>
                  <p className="mt-2 max-w-[320px] font-sans text-[14px] text-evenora-secondary">
                    Nous prévenons {providerName ?? 'le prestataire'} de votre demande. Un instant...
                  </p>
                </div>
              )}

              {step === 'confirmed' && (
                <div className="flex flex-col items-center py-10 text-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-evenora-blush">
                    <CheckCircle2 size={28} className="text-evenora-deep" />
                  </span>
                  <p className="mt-5 font-display text-[22px] font-normal text-evenora-ink">Contact confirmé</p>
                  <p className="mt-2 max-w-[340px] font-sans text-[14px] text-evenora-secondary">
                    {providerName ?? 'Le prestataire'} a accepté votre demande. Vous pouvez désormais échanger directement par messagerie.
                  </p>
                  <button
                    type="button"
                    onClick={closeContactModal}
                    className="mt-6 rounded-pill bg-evenora-ink px-6 py-3 font-sans text-[14px] font-medium text-evenora-white"
                  >
                    Continuer
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
