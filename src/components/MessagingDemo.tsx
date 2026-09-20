import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send } from 'lucide-react'
import { CONVERSATIONS as INITIAL_CONVERSATIONS } from '../data/messaging'
import type { Conversation, Message } from '../types'

interface MessagingDemoProps {
  embedded?: boolean
}

export default function MessagingDemo({ embedded = false }: MessagingDemoProps) {
  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS)
  const [activeId, setActiveId] = useState(INITIAL_CONVERSATIONS[0].id)
  const [draft, setDraft] = useState('')

  const active = conversations.find((c) => c.id === activeId) ?? conversations[0]

  function send() {
    if (!draft.trim()) return
    const message: Message = {
      id: `m-${Date.now()}`,
      from: 'client',
      text: draft.trim(),
      time: 'Maintenant',
    }
    setConversations((prev) =>
      prev.map((c) => (c.id === activeId ? { ...c, messages: [...c.messages, message], lastMessage: message.text, unread: false } : c)),
    )
    setDraft('')
  }

  const body = (
    <div className="grid grid-cols-1 sm:grid-cols-[240px_1fr]">
      <div className="evenora-scroll flex overflow-x-auto border-b border-evenora-border sm:block sm:max-h-[440px] sm:overflow-y-auto sm:border-b-0 sm:border-r">
        {conversations.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setActiveId(c.id)}
            className={`flex w-full shrink-0 items-center gap-3 px-4 py-3.5 text-left transition-colors sm:shrink ${
              activeId === c.id ? 'bg-evenora-blush' : 'hover:bg-evenora-ivory'
            }`}
          >
            <span className="h-9 w-9 shrink-0 rounded-full" style={{ background: c.gradient }} />
            <span className="min-w-0">
              <span className="flex items-center gap-1.5">
                <span className="truncate font-sans text-[13.5px] font-medium text-evenora-ink">{c.providerName}</span>
                {c.unread && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-evenora-deep" />}
              </span>
              <span className="block truncate font-sans text-[12px] text-evenora-secondary">{c.lastMessage}</span>
            </span>
          </button>
        ))}
      </div>

      <div className="flex h-[440px] flex-col">
        <div className="flex items-center gap-3 border-b border-evenora-border px-5 py-3.5">
          <span className="h-8 w-8 rounded-full" style={{ background: active.gradient }} />
          <div>
            <p className="font-sans text-[14px] font-semibold text-evenora-ink">{active.providerName}</p>
            <p className="font-sans text-[12px] text-evenora-secondary">{active.providerCategory}</p>
          </div>
        </div>

        <div className="evenora-scroll flex-1 space-y-3 overflow-y-auto px-5 py-4">
          {active.messages.map((m) => (
            <div key={m.id} className={`flex ${m.from === 'client' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-2.5 font-sans text-[13.5px] leading-relaxed ${
                  m.from === 'client' ? 'bg-evenora-ink text-evenora-white' : 'bg-evenora-ivory text-evenora-ink'
                }`}
              >
                {m.text}
                <span className={`mt-1 block font-sans text-[10.5px] ${m.from === 'client' ? 'text-evenora-white/60' : 'text-evenora-secondary'}`}>
                  {m.time}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 border-t border-evenora-border p-3">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send()}
            placeholder="Écrivez votre message..."
            aria-label="Écrire un message"
            className="flex-1 rounded-pill border border-evenora-border px-4 py-2.5 font-sans text-[13.5px] text-evenora-ink focus:border-evenora-deep focus:outline-none"
          />
          <button
            type="button"
            onClick={send}
            aria-label="Envoyer le message"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-evenora-ink text-evenora-white transition-transform hover:scale-105 active:scale-95"
          >
            <Send size={15} />
          </button>
        </div>
      </div>
    </div>
  )

  if (embedded) {
    return <div className="overflow-hidden rounded-2xl border border-evenora-border">{body}</div>
  }

  return (
    <section className="mx-auto w-full max-w-content px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-[560px] text-center">
        <h2 className="font-display text-evenora-ink" style={{ fontSize: 'clamp(1.9rem, 4vw, 2.75rem)', fontWeight: 400, letterSpacing: '-0.02em' }}>
          Échangez en toute simplicité.
        </h2>
        <p className="mt-4 font-sans text-[16px] leading-relaxed text-evenora-secondary">
          La messagerie s&rsquo;ouvre automatiquement dès qu&rsquo;un prestataire accepte votre demande.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto mt-14 max-w-[820px] overflow-hidden rounded-card border border-evenora-border bg-evenora-white shadow-card"
      >
        {body}
      </motion.div>
    </section>
  )
}
