import type { Review } from '../types'

export const REVIEWS: Review[] = [
  {
    id: 'r1',
    author: 'Sarah',
    date: 'Juin 2027',
    rating: 5,
    text: "Une prestation incroyable, tout était parfait du premier échange jusqu'au jour J.",
    verified: true,
  },
  {
    id: 'r2',
    author: 'Karim',
    date: 'Mai 2027',
    rating: 5,
    text: "Très professionnel, à l'écoute de nos envies et d'une ponctualité irréprochable.",
    verified: true,
  },
  {
    id: 'r3',
    author: 'Inès',
    date: 'Avril 2027',
    rating: 4,
    text: 'Superbe travail, quelques petits ajustements de dernière minute très bien gérés.',
    verified: true,
  },
]
