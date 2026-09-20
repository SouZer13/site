/**
 * Generates an elegant nude/rose gradient placeholder photo as a data URL.
 * Used wherever a builder-supplied event photo isn't available yet, so the
 * gallery and cards never show a broken image.
 */
export function makePlaceholderImage(colors: [string, string], label: string): string {
  const width = 800
  const height = 600
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  if (!ctx) return ''

  const gradient = ctx.createLinearGradient(0, 0, width, height)
  gradient.addColorStop(0, colors[0])
  gradient.addColorStop(1, colors[1])
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width, height)

  ctx.fillStyle = 'rgba(255,255,255,0.14)'
  ctx.beginPath()
  ctx.ellipse(width * 0.78, height * 0.24, 180, 180, 0, 0, Math.PI * 2)
  ctx.fill()

  ctx.fillStyle = 'rgba(75,48,44,0.10)'
  ctx.beginPath()
  ctx.ellipse(width * 0.16, height * 0.86, 220, 140, 0, 0, Math.PI * 2)
  ctx.fill()

  ctx.font = '600 30px Inter, sans-serif'
  ctx.fillStyle = 'rgba(255,255,255,0.92)'
  ctx.textAlign = 'left'
  ctx.textBaseline = 'bottom'
  ctx.fillText(label.toUpperCase(), 36, height - 36)

  return canvas.toDataURL('image/png')
}
