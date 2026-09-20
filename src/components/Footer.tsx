import Logo from './Logo'

const COLUMNS = [
  {
    title: 'Événora',
    links: ['À propos', 'Comment ça marche', 'Inspirations'],
  },
  {
    title: 'Clients',
    links: ['Trouver un prestataire', 'Favoris', 'Mon événement', 'Aide'],
  },
  {
    title: 'Prestataires',
    links: ['Devenir prestataire', 'Tarifs', 'Connexion', "Centre d'aide"],
  },
  {
    title: 'Légal',
    links: ['Mentions légales', 'CGU', 'Confidentialité', 'Cookies'],
  },
]

export default function Footer() {
  return (
    <footer className="w-full border-t border-evenora-border bg-evenora-ivory">
      <div className="mx-auto w-full max-w-content px-5 py-16 sm:px-8">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-5">
          <div className="col-span-2 sm:col-span-1">
            <Logo size={26} />
            <p className="mt-4 max-w-[220px] font-sans text-[13px] leading-relaxed text-evenora-secondary">
              La plateforme française pour trouver les prestataires de vos événements.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="font-sans text-[13px] font-semibold text-evenora-ink">{col.title}</p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" onClick={(e) => e.preventDefault()} className="font-sans text-[13.5px] text-evenora-secondary transition-colors hover:text-evenora-ink">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-evenora-border pt-8 sm:flex-row">
          <p className="font-sans text-[12.5px] text-evenora-secondary">© {new Date().getFullYear()} Événora. Tous droits réservés.</p>
          <div className="flex items-center gap-4">
            {['Instagram', 'TikTok', 'Facebook', 'LinkedIn'].map((s) => (
              <a
                key={s}
                href="#"
                onClick={(e) => e.preventDefault()}
                className="font-sans text-[12.5px] text-evenora-secondary transition-colors hover:text-evenora-ink"
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
