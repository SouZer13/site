export interface Category {
  id: string
  label: string
  description: string
  icon: string
  providerCount: number
}

export type AvailabilityStatus = 'disponible' | 'attente' | 'reserve'

export interface TravelInfo {
  baseCity: string
  radiusKm: number
  freeUpToKm: number
  pricePerKm: number
}

export interface Provider {
  id: string
  name: string
  categoryId: string
  categoryLabel: string
  city: string
  rating: number
  reviewCount: number
  priceFrom: number
  priceUnit: string
  verified: boolean
  gradient: string
  description: string
  services: string[]
  portfolio: string[]
  travel: TravelInfo
  availability: Record<string, AvailabilityStatus>
  distanceKm?: number
}

export interface EventTypeOption {
  id: string
  label: string
}

export interface SearchFilters {
  prestation: string | null
  location: string | null
  date: string | null
  budgetMin: number
  budgetMax: number
  eventType: string | null
}

export interface ContactRequestPrefill {
  providerId?: string
  providerName?: string
}

export interface Review {
  id: string
  author: string
  date: string
  rating: number
  text: string
  verified: boolean
}

export interface Message {
  id: string
  from: 'client' | 'provider'
  text: string
  time: string
}

export interface Conversation {
  id: string
  providerName: string
  providerCategory: string
  gradient: string
  lastMessage: string
  unread: boolean
  messages: Message[]
}

export interface ChecklistItem {
  id: string
  category: string
  status: 'confirme' | 'discussion' | 'recherche'
}

export interface ProviderRequest {
  id: string
  eventType: string
  date: string
  city: string
  guests: number
  budgetMin: number
  budgetMax: number
  status: 'nouvelle' | 'acceptee' | 'refusee'
}

export interface PricingPlan {
  id: string
  name: string
  monthlyPrice: number
  yearlyPrice: number
  highlight?: boolean
  badge?: string
  features: string[]
}

export interface InspirationArticle {
  id: string
  title: string
  category: string
  readTime: string
  gradient: string
}
