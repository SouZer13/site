import { makePlaceholderImage } from '../utils/placeholderImage'

interface GalleryItemSource {
  text: string
  colors: [string, string]
}

const SOURCES: GalleryItemSource[] = [
  { text: 'Mariage', colors: ['#F4D9CD', '#D66A7A'] },
  { text: 'Anniversaire', colors: ['#F8E8E5', '#C9A66B'] },
  { text: 'Gala', colors: ['#4B302C', '#C95368'] },
  { text: 'Fiançailles', colors: ['#FFF9F6', '#D66A7A'] },
  { text: 'Baby shower', colors: ['#F8E8E5', '#F4D9CD'] },
  { text: 'Soirée privée', colors: ['#4B302C', '#C9A66B'] },
  { text: 'Événement professionnel', colors: ['#C9A66B', '#4B302C'] },
  { text: 'Cérémonie', colors: ['#F4D9CD', '#C95368'] },
]

/** Builds the 8 Événora gallery cards as elegant gradient placeholders (no external images). */
export function buildGalleryItems() {
  return SOURCES.map((s) => ({
    image: makePlaceholderImage(s.colors, s.text),
    text: s.text,
  }))
}
