import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, X } from 'lucide-react'

export type AuthMode = 'login' | 'signup-client' | 'signup-provider'

interface AuthModalProps {
  mode: AuthMode | null
  onClose: () => void
  onChangeMode: (mode: AuthMode) => void
}

const TABS: { id: AuthMode; label: string }[] = [
  { id: 'login', label: 'Connexion' },
  { id: 'signup-client', label: 'Créer un compte' },
  { id: 'signup-provider', label: 'Devenir prestataire' },
]

export default function AuthModal({ mode, onClose, onChangeMode }: AuthModalProps) {
  const [submitted, setSubmitted] = useState(false)
  const open = mode !== null

  useEffect(() => {
    if (open) setSubmitted(false)
  }, [open, mode])

  return (
    <AnimatePresence>
      {open && mode && (
        <>
          <motion.div
            className="fixed inset-0 z-50"
            style={{ backgroundColor: 'rgba(33,26,26,0.4)', backdropFilter: 'blur(4px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 14, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[420px] rounded-card bg-evenora-white p-6 shadow-lifted sm:p-8"
            >
              <button
                type="button"
                onClick={onClose}
                aria-label="Fermer"
                className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full text-evenora-ink hover:bg-evenora-ivory"
              >
                <X size={18} />
              </button>

              {!submitted ? (
                <>
                  <div className="flex gap-1 rounded-pill bg-evenora-ivory p-1">
                    {TABS.map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => onChangeMode(t.id)}
                        className={`flex-1 rounded-pill px-2 py-2 font-sans text-[12.5px] font-medium transition-colors ${
                          mode === t.id ? 'bg-evenora-ink text-evenora-white' : 'text-evenora-ink'
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>

                  <p className="mt-6 font-display text-[22px] font-normal text-evenora-ink">
                    {mode === 'login' ? 'Bon retour parmi nous' : mode === 'signup-provider' ? 'Créer mon profil professionnel' : 'Créer mon compte'}
                  </p>
                  <p className="mt-1 font-sans text-[13.5px] text-evenora-secondary">
                    Démonstration de prototype — aucune donnée n&rsquo;est envoyée.
                  </p>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      setSubmitted(true)
                    }}
                    className="mt-6 flex flex-col gap-3.5"
                  >
                    {mode !== 'login' && (
                      <label className="flex flex-col gap-1.5">
                        <span className="font-sans text-[13px] font-medium text-evenora-ink">
                          {mode === 'signup-provider' ? 'Nom de votre activité' : 'Prénom'}
                        </span>
                        <input
                          required
                          className="rounded-xl border border-evenora-border px-3.5 py-2.5 font-sans text-[14px] text-evenora-ink focus:border-evenora-deep focus:outline-none"
                        />
                      </label>
                    )}
                    <label className="flex flex-col gap-1.5">
                      <span className="font-sans text-[13px] font-medium text-evenora-ink">Email</span>
                      <input
                        required
                        type="email"
                        className="rounded-xl border border-evenora-border px-3.5 py-2.5 font-sans text-[14px] text-evenora-ink focus:border-evenora-deep focus:outline-none"
                      />
                    </label>
                    <label className="flex flex-col gap-1.5">
                      <span className="font-sans text-[13px] font-medium text-evenora-ink">Mot de passe</span>
                      <input
                        required
                        type="password"
                        className="rounded-xl border border-evenora-border px-3.5 py-2.5 font-sans text-[14px] text-evenora-ink focus:border-evenora-deep focus:outline-none"
                      />
                    </label>

                    <button
                      type="submit"
                      className="mt-2 rounded-pill bg-evenora-ink py-3.5 font-sans text-[15px] font-medium text-evenora-white transition-transform hover:-translate-y-0.5 active:scale-95"
                    >
                      {mode === 'login' ? 'Se connecter' : 'Continuer'}
                    </button>
                  </form>
                </>
              ) : (
                <div className="flex flex-col items-center py-8 text-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-evenora-blush">
                    <CheckCircle2 size={26} className="text-evenora-deep" />
                  </span>
                  <p className="mt-5 font-display text-[20px] font-normal text-evenora-ink">
                    {mode === 'signup-provider' ? 'Profil créé avec succès' : 'Bienvenue sur Événora'}
                  </p>
                  <p className="mt-2 max-w-[280px] font-sans text-[13.5px] text-evenora-secondary">
                    Ceci est une démonstration : aucun compte réel n&rsquo;a été créé.
                  </p>
                  <button
                    type="button"
                    onClick={onClose}
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
