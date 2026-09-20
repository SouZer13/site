export function formatEuro(value: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: value % 1 === 0 ? 0 : 2,
  }).format(value)
}

export function formatBudgetRange(min: number, max: number): string {
  if (min <= 0 && max >= 10000) return 'Tous budgets'
  return `${formatEuro(min)} – ${formatEuro(max)}`
}
