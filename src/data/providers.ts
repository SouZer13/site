import type { AvailabilityStatus, Provider } from '../types'

function buildAvailability(seed: number): Record<string, AvailabilityStatus> {
  const today = new Date()
  const map: Record<string, AvailabilityStatus> = {}
  for (let i = 0; i < 42; i++) {
    const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i)
    const key = d.toISOString().slice(0, 10)
    const mod = (i + seed) % 9
    let status: AvailabilityStatus = 'disponible'
    if (mod === 0) status = 'reserve'
    else if (mod === 3) status = 'attente'
    map[key] = status
  }
  return map
}

export const PROVIDERS: Provider[] = [
  {
    id: 'studio-amelie',
    name: 'Studio Amélie',
    categoryId: 'photographe',
    categoryLabel: 'Photographe',
    city: 'Montpellier',
    rating: 4.9,
    reviewCount: 127,
    priceFrom: 850,
    priceUnit: 'forfait',
    verified: true,
    gradient: 'linear-gradient(135deg, #F4D9CD 0%, #D66A7A 100%)',
    description:
      "Studio Amélie capture la lumière naturelle et les émotions vraies. Une approche discrète et éditoriale, pensée pour raconter votre journée sans jamais la mettre en scène.",
    services: ['Reportage journée complète', 'Séance couple', 'Album photo premium', 'Drone sur autorisation'],
    portfolio: [
      'linear-gradient(135deg, #F4D9CD 0%, #D66A7A 100%)',
      'linear-gradient(135deg, #F8E8E5 0%, #C9A66B 100%)',
      'linear-gradient(160deg, #FFF9F6 0%, #F4D9CD 55%, #C95368 100%)',
      'linear-gradient(135deg, #C9A66B 0%, #4B302C 100%)',
    ],
    travel: { baseCity: 'Montpellier', radiusKm: 120, freeUpToKm: 30, pricePerKm: 0.7 },
    availability: buildAvailability(1),
  },
  {
    id: 'maison-noura',
    name: 'Maison Noura',
    categoryId: 'traiteur',
    categoryLabel: 'Traiteur',
    city: 'Lyon',
    rating: 4.8,
    reviewCount: 96,
    priceFrom: 35,
    priceUnit: '/pers.',
    verified: true,
    gradient: 'linear-gradient(135deg, #F8E8E5 0%, #C9A66B 100%)',
    description:
      "Maison Noura compose des menus sur-mesure entre cuisine française et saveurs du monde. Un service traiteur soigné, du cocktail dînatoire au dîner assis.",
    services: ['Cocktail dînatoire', 'Menu assis 3 services', 'Buffet sucré', 'Service en salle'],
    portfolio: [
      'linear-gradient(135deg, #F8E8E5 0%, #C9A66B 100%)',
      'linear-gradient(135deg, #D66A7A 0%, #4B302C 100%)',
      'linear-gradient(160deg, #F4D9CD 0%, #C95368 100%)',
      'linear-gradient(135deg, #FFF9F6 0%, #C9A66B 45%, #D66A7A 100%)',
    ],
    travel: { baseCity: 'Lyon', radiusKm: 80, freeUpToKm: 20, pricePerKm: 0.9 },
    availability: buildAvailability(2),
  },
  {
    id: 'atelier-rosea',
    name: 'Atelier Roséa',
    categoryId: 'decorateur',
    categoryLabel: 'Décoration événementielle',
    city: 'Paris',
    rating: 4.9,
    reviewCount: 84,
    priceFrom: 1200,
    priceUnit: 'forfait',
    verified: true,
    gradient: 'linear-gradient(160deg, #FFF9F6 0%, #F4D9CD 55%, #C95368 100%)',
    description:
      "Atelier Roséa imagine des décors sur-mesure, entre fleurs séchées, textures naturelles et palettes nude. Disponible dans un rayon de 120 km autour de Paris.",
    services: ['Scénographie complète', 'Arche florale', 'Table d’honneur', 'Mise en lumière'],
    portfolio: [
      'linear-gradient(160deg, #FFF9F6 0%, #F4D9CD 55%, #C95368 100%)',
      'linear-gradient(135deg, #F4D9CD 0%, #D66A7A 100%)',
      'linear-gradient(135deg, #C9A66B 0%, #4B302C 100%)',
      'linear-gradient(135deg, #F8E8E5 0%, #D66A7A 60%, #4B302C 100%)',
    ],
    travel: { baseCity: 'Paris', radiusKm: 120, freeUpToKm: 30, pricePerKm: 0.7 },
    availability: buildAvailability(3),
  },
  {
    id: 'dj-elyas',
    name: 'DJ Elyas',
    categoryId: 'dj',
    categoryLabel: 'DJ & Animation',
    city: 'Marseille',
    rating: 4.8,
    reviewCount: 143,
    priceFrom: 650,
    priceUnit: 'forfait',
    verified: true,
    gradient: 'linear-gradient(135deg, #C9A66B 0%, #4B302C 100%)',
    description:
      "DJ Elyas anime vos soirées avec un set sur-mesure, du cocktail à la piste de danse. Sonorisation et éclairage professionnels inclus.",
    services: ['DJ set 6h', 'Sonorisation', 'Éclairage d’ambiance', 'Animation micro'],
    portfolio: [
      'linear-gradient(135deg, #C9A66B 0%, #4B302C 100%)',
      'linear-gradient(135deg, #D66A7A 0%, #4B302C 100%)',
      'linear-gradient(135deg, #F4D9CD 0%, #D66A7A 100%)',
      'linear-gradient(160deg, #F4D9CD 0%, #C95368 100%)',
    ],
    travel: { baseCity: 'Marseille', radiusKm: 100, freeUpToKm: 25, pricePerKm: 0.8 },
    availability: buildAvailability(4),
  },
  {
    id: 'les-douceurs-de-lea',
    name: 'Les Douceurs de Léa',
    categoryId: 'patisserie',
    categoryLabel: 'Pâtisserie événementielle',
    city: 'Bordeaux',
    rating: 4.9,
    reviewCount: 71,
    priceFrom: 6,
    priceUnit: '/part',
    verified: true,
    gradient: 'linear-gradient(135deg, #FFF9F6 0%, #C9A66B 45%, #D66A7A 100%)',
    description:
      "Wedding cakes et pièces montées sur-mesure, pensés comme de véritables pièces décoratives autant que gourmandes.",
    services: ['Wedding cake sur-mesure', 'Pièce montée', 'Table de desserts', 'Dragées & mignardises'],
    portfolio: [
      'linear-gradient(135deg, #FFF9F6 0%, #C9A66B 45%, #D66A7A 100%)',
      'linear-gradient(135deg, #F8E8E5 0%, #C9A66B 100%)',
      'linear-gradient(160deg, #FFF9F6 0%, #F4D9CD 55%, #C95368 100%)',
      'linear-gradient(135deg, #F4D9CD 0%, #D66A7A 100%)',
    ],
    travel: { baseCity: 'Bordeaux', radiusKm: 60, freeUpToKm: 15, pricePerKm: 0.6 },
    availability: buildAvailability(5),
  },
  {
    id: 'maison-clarte',
    name: 'Maison Clarté',
    categoryId: 'salle',
    categoryLabel: 'Salle de réception',
    city: 'Nantes',
    rating: 4.7,
    reviewCount: 58,
    priceFrom: 2800,
    priceUnit: 'forfait',
    verified: true,
    gradient: 'linear-gradient(135deg, #D66A7A 0%, #4B302C 100%)',
    description:
      "Une bâtisse en pierre entourée d’un parc arboré, à 20 minutes de Nantes. Capacité jusqu’à 220 invités, hébergement sur place.",
    services: ['Location de salle', 'Parc privatif', 'Hébergement sur place', 'Coordination technique'],
    portfolio: [
      'linear-gradient(135deg, #D66A7A 0%, #4B302C 100%)',
      'linear-gradient(135deg, #C9A66B 0%, #4B302C 100%)',
      'linear-gradient(135deg, #F8E8E5 0%, #D66A7A 60%, #4B302C 100%)',
      'linear-gradient(160deg, #FFF9F6 0%, #F4D9CD 55%, #C95368 100%)',
    ],
    travel: { baseCity: 'Nantes', radiusKm: 40, freeUpToKm: 0, pricePerKm: 0 },
    availability: buildAvailability(6),
  },
]
