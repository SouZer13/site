import type { ChecklistItem, ProviderRequest } from '../types'

export const MY_EVENT = {
  title: 'Mariage de Sarah & Adam',
  date: '14 juin 2027',
  city: 'Montpellier',
  guests: 180,
}

export const CHECKLIST: ChecklistItem[] = [
  { id: 'ch1', category: 'Salle', status: 'confirme' },
  { id: 'ch2', category: 'Photographe', status: 'confirme' },
  { id: 'ch3', category: 'Traiteur', status: 'discussion' },
  { id: 'ch4', category: 'DJ', status: 'recherche' },
  { id: 'ch5', category: 'Décoration', status: 'recherche' },
  { id: 'ch6', category: 'Maquilleuse', status: 'confirme' },
  { id: 'ch7', category: 'Fleuriste', status: 'discussion' },
]

export const PROVIDER_REQUESTS: ProviderRequest[] = [
  { id: 'pr1', eventType: 'Mariage', date: '14 juin 2027', city: 'Montpellier', guests: 180, budgetMin: 1500, budgetMax: 2500, status: 'nouvelle' },
  { id: 'pr2', eventType: 'Anniversaire', date: '2 août 2027', city: 'Sète', guests: 40, budgetMin: 400, budgetMax: 900, status: 'nouvelle' },
  { id: 'pr3', eventType: 'Événement pro', date: '20 septembre 2027', city: 'Nîmes', guests: 90, budgetMin: 1000, budgetMax: 1800, status: 'acceptee' },
]

export const PROVIDER_STATS = [
  { label: 'Vues du profil', value: 127 },
  { label: 'Demandes reçues', value: 34 },
  { label: 'Demandes acceptées', value: 22 },
  { label: 'Rendez-vous', value: 12 },
  { label: 'Prestations confirmées', value: 7 },
]
