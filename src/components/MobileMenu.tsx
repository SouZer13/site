import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import Logo from './Logo'
import { NAV_LINKS } from './nav'

interface MobileMenuProps {
  open: boolean
  onClose: () => void
  onOpenAuth: () => void
  onBecomeProvider: () => void
}

export default function MobileMenu({ open, onClose, onOpenAuth, onBecomeProvider }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-40"
            style={{ backgroundColor: 'rgba(33,26,26,0.35)', backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />
          <motion.aside
            className="fixed right-0 top-0 z-50 flex flex-col bg-evenora-white"
            style={{ width: 'min(88vw, 360px)', height: '100dvh', boxShadow: '-12px 0 48px rgba(33,26,26,0.12)' }}
            initial={{ x: '100%' }}
            animate={{ x: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }}
            exit={{ x: '100%', transition: { duration: 0.35, ease: [0.55, 0, 1, 0.45] } }}
          >
            <div className="flex items-center justify-between px-6 py-5">
              <a href="#" onClick={onClose} className="flex items-center gap-2.5">
                <Logo size={26} />
              </a>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                aria-label="Fermer le menu mobile"
                className="flex h-10 w-10 items-center justify-center rounded-full text-evenora-ink"
                style={{ backgroundColor: 'rgba(33,26,26,0.06)' }}
              >
                <X size={20} />
              </motion.button>
            </div>

            <div className="mx-6 h-px bg-evenora-border" />

            <nav className="flex flex-col gap-1 px-4 py-6">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.18 + i * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-xl px-4 py-3 font-sans text-[17px] font-medium text-evenora-ink transition-colors hover:bg-evenora-ivory"
                  onClick={onClose}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.button
                type="button"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.18 + NAV_LINKS.length * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => {
                  onClose()
                  onOpenAuth()
                }}
                className="mt-2 rounded-xl px-4 py-3 text-left font-sans text-[17px] font-medium text-evenora-ink transition-colors hover:bg-evenora-ivory"
              >
                Connexion
              </motion.button>
            </nav>

            <div className="mt-auto px-6 pb-8">
              <button
                type="button"
                onClick={() => {
                  onClose()
                  onBecomeProvider()
                }}
                className="w-full rounded-pill bg-evenora-ink py-3.5 font-sans text-[15px] font-medium text-evenora-white active:scale-95"
              >
                Devenir prestataire
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
