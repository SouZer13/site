import type { PricingPlan } from '../types'

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free',
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: ['Profil basique', 'Visibilité limitée'],
  },
  {
    id: 'pro',
    name: 'Pro',
    monthlyPrice: 19.9,
    yearlyPrice: 15.9,
    features: [
      'Profil complet',
      'Photos & vidéos',
      'Calendrier',
      'Demandes de contact',
      'Messagerie',
      'Disponibilités',
      'Zones de déplacement',
      'Avis',
      'Statistiques',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    monthlyPrice: 39.9,
    yearlyPrice: 31.9,
    highlight: true,
    badge: 'Le plus choisi',
    features: [
      'Tout Pro',
      'Meilleure visibilité',
      'Profil mis en avant',
      'Priorité dans les résultats',
      'Badge Premium',
      'Statistiques avancées',
    ],
  },
  {
    id: 'elite',
    name: 'Elite',
    monthlyPrice: 69.9,
    yearlyPrice: 55.9,
    features: [
      'Tout Premium',
      'Visibilité maximale',
      'Mise en avant page d’accueil',
      'Priorité de classement',
      'Badge Elite',
      'Options promotionnelles',
    ],
  },
]
