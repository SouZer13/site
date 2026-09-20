import type { Conversation } from '../types'

export const CONVERSATIONS: Conversation[] = [
  {
    id: 'c1',
    providerName: 'Studio Amélie',
    providerCategory: 'Photographe',
    gradient: 'linear-gradient(135deg, #F4D9CD 0%, #D66A7A 100%)',
    lastMessage: 'Avec plaisir, je vous envoie mes disponibilités de juin.',
    unread: true,
    messages: [
      { id: 'm1', from: 'client', text: 'Bonjour, votre travail me plaît beaucoup ! Êtes-vous disponible le 14 juin 2027 ?', time: '09:12' },
      { id: 'm2', from: 'provider', text: 'Bonjour Sarah, merci beaucoup ! Oui, cette date est encore libre.', time: '09:40' },
      { id: 'm3', from: 'client', text: "Parfait, pouvez-vous m'en dire plus sur la formule journée complète ?", time: '09:42' },
      { id: 'm4', from: 'provider', text: 'Avec plaisir, je vous envoie mes disponibilités de juin.', time: '09:45' },
    ],
  },
  {
    id: 'c2',
    providerName: 'Maison Noura',
    providerCategory: 'Traiteur',
    gradient: 'linear-gradient(135deg, #F8E8E5 0%, #C9A66B 100%)',
    lastMessage: "On peut prévoir une dégustation si vous le souhaitez.",
    unread: false,
    messages: [
      { id: 'm1', from: 'client', text: 'Bonjour, nous serons environ 180 invités, est-ce gérable ?', time: 'Hier' },
      { id: 'm2', from: 'provider', text: 'Bonjour, oui sans problème. On peut prévoir une dégustation si vous le souhaitez.', time: 'Hier' },
    ],
  },
  {
    id: 'c3',
    providerName: 'Atelier Roséa',
    providerCategory: 'Décoration',
    gradient: 'linear-gradient(160deg, #FFF9F6 0%, #F4D9CD 55%, #C95368 100%)',
    lastMessage: 'Je vous prépare un moodboard pour la fin de semaine.',
    unread: false,
    messages: [
      { id: 'm1', from: 'provider', text: 'Je vous prépare un moodboard pour la fin de semaine.', time: 'Lundi' },
    ],
  },
]
