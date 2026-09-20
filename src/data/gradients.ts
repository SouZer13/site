/** Elegant nude/rose/champagne gradient placeholders used whenever a real photo isn't available. */
export const GRADIENTS = [
  'linear-gradient(135deg, #F4D9CD 0%, #D66A7A 100%)',
  'linear-gradient(135deg, #F8E8E5 0%, #C9A66B 100%)',
  'linear-gradient(160deg, #FFF9F6 0%, #F4D9CD 55%, #C95368 100%)',
  'linear-gradient(135deg, #C9A66B 0%, #4B302C 100%)',
  'linear-gradient(135deg, #F8E8E5 0%, #D66A7A 60%, #4B302C 100%)',
  'linear-gradient(160deg, #F4D9CD 0%, #C95368 100%)',
  'linear-gradient(135deg, #FFF9F6 0%, #C9A66B 45%, #D66A7A 100%)',
  'linear-gradient(135deg, #D66A7A 0%, #4B302C 100%)',
]

export function gradientFor(seed: number) {
  return GRADIENTS[seed % GRADIENTS.length]
}
