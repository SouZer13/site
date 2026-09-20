import type { Category } from '../types'

/** Provider categories. New categories can be appended here without touching UI code. */
export const CATEGORIES: Category[] = [
  { id: 'photographe', label: 'Photographes', description: 'Capturez chaque instant.', icon: 'Camera', providerCount: 312 },
  { id: 'traiteur', label: 'Traiteurs', description: 'Une expérience qui se déguste.', icon: 'UtensilsCrossed', providerCount: 248 },
  { id: 'decorateur', label: 'Décorateurs', description: 'Imaginez votre univers.', icon: 'Flower2', providerCount: 187 },
  { id: 'dj', label: 'DJ & musique', description: 'Créez l’ambiance.', icon: 'Music4', providerCount: 204 },
  { id: 'salle', label: 'Salles', description: 'Le lieu parfait.', icon: 'Building2', providerCount: 156 },
  { id: 'beaute', label: 'Beauté', description: 'Pour vous sentir unique.', icon: 'Sparkles', providerCount: 229 },
  { id: 'videaste', label: 'Vidéastes', description: 'Revivez votre journée.', icon: 'Video', providerCount: 143 },
  { id: 'patisserie', label: 'Pâtisserie', description: 'La touche finale.', icon: 'Cake', providerCount: 118 },
  { id: 'wedding-planner', label: 'Wedding & event planners', description: 'Orchestrez chaque détail.', icon: 'ClipboardList', providerCount: 96 },
  { id: 'fleuriste', label: 'Fleuristes', description: 'Composez vos couleurs.', icon: 'Flower', providerCount: 134 },
  { id: 'henne', label: 'Henné', description: 'Un art traditionnel et précis.', icon: 'PenTool', providerCount: 61 },
  { id: 'photobooth', label: 'Photobooth', description: 'Des souvenirs à emporter.', icon: 'Camera' as const, providerCount: 88 },
  { id: 'animation', label: 'Animation', description: 'Faites vivre vos invités.', icon: 'PartyPopper', providerCount: 121 },
  { id: 'location-materiel', label: 'Location de matériel', description: 'Tout l’équipement, sans le stress.', icon: 'Package', providerCount: 97 },
  { id: 'chauffeur', label: 'Chauffeurs', description: 'Une arrivée mémorable.', icon: 'Car', providerCount: 54 },
  { id: 'tenues', label: 'Robes & tenues', description: 'Le look qui vous ressemble.', icon: 'Shirt', providerCount: 142 },
  { id: 'createur-contenu', label: 'Créateurs de contenu', description: 'Racontez votre histoire.', icon: 'Clapperboard', providerCount: 76 },
  { id: 'musiciens', label: 'Musiciens & artistes', description: 'Une prestation live inoubliable.', icon: 'Guitar', providerCount: 68 },
  { id: 'sonorisation', label: 'Sonorisation & éclairage', description: 'Une ambiance maîtrisée.', icon: 'Lightbulb', providerCount: 59 },
]

/** Short list surfaced in the search bar's "Prestation" popover. */
export const QUICK_CATEGORY_IDS = [
  'dj',
  'traiteur',
  'photographe',
  'videaste',
  'decorateur',
  'salle',
  'beaute',
  'patisserie',
  'wedding-planner',
  'photobooth',
  'animation',
  'fleuriste',
]
