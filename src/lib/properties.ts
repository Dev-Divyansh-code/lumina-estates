import { unsplash } from './images'

export interface Property {
  id: string
  slug: string
  title: string
  location: string
  price: number
  bedrooms: number
  bathrooms: number
  area: number
  year: number
  description: string
  highlights: string[]
  images: string[]
  modelPath?: string
  featured?: boolean
  status: 'available' | 'reserved' | 'sold'
}

const img = (id: string) => unsplash(id, { w: 800, q: 68 })

export const properties: Property[] = [
  {
    id: '1',
    slug: 'casa-aurora',
    title: 'Casa Aurora',
    location: 'Malibu, California',
    price: 28500000,
    bedrooms: 6,
    bathrooms: 8,
    area: 12400,
    year: 2024,
    description:
      'A luminous cliffside sanctuary where architecture dissolves into the Pacific horizon. Floor-to-ceiling glass, hand-finished limestone, and a private infinity edge that mirrors the sky.',
    highlights: [
      'Oceanfront infinity pool',
      'Private screening pavilion',
      "Chef's kitchen by Boffi",
      'Smart home throughout',
      'Staff quarters & wine cellar',
    ],
    images: [
      img('photo-1613490493576-7fde63acd811'),
      img('photo-1600596542815-ffad4c1539a9'),
    ],
    featured: true,
    status: 'available',
  },
  {
    id: '2',
    slug: 'villa-solara',
    title: 'Villa Solara',
    location: 'Tulum, Mexico',
    price: 9800000,
    bedrooms: 5,
    bathrooms: 6,
    area: 8700,
    year: 2023,
    description:
      'Jungle-meets-sea minimalism. Raw concrete, tropical hardwoods, and open-air living spaces designed for the Caribbean light.',
    highlights: [
      'Private cenote access',
      'Rooftop observatory',
      'Outdoor living pavilion',
      'Solar-powered estate',
    ],
    images: [
      img('photo-1600585154340-be6161a56a0c'),
      img('photo-1600607687939-ce8a6c25118c'),
    ],
    featured: true,
    status: 'available',
  },
  {
    id: '3',
    slug: 'the-obsidian',
    title: 'The Obsidian',
    location: 'Aspen, Colorado',
    price: 19200000,
    bedrooms: 7,
    bathrooms: 9,
    area: 15600,
    year: 2025,
    description:
      'A monolithic alpine retreat carved into the mountain. Dark stone, warm timber, and panoramic glass walls that frame the Rockies.',
    highlights: [
      'Ski-in / ski-out access',
      'Indoor-outdoor spa',
      'Cinema & wine vault',
      'Heated outdoor living',
    ],
    images: [
      img('photo-1512917774080-9991f1c4c750'),
      img('photo-1600047509807-ba8f99d2cd00'),
    ],
    featured: false,
    status: 'available',
  },
  {
    id: '4',
    slug: 'horizon-house',
    title: 'Horizon House',
    location: 'Cape Town, South Africa',
    price: 14500000,
    bedrooms: 4,
    bathrooms: 5,
    area: 6800,
    year: 2022,
    description:
      'Suspended between mountain and ocean. A study in restraint and light, with every room oriented toward Table Mountain or the Atlantic.',
    highlights: [
      'Cantilevered living spaces',
      'Private art gallery',
      'Infinity lap pool',
      'Staff & guest cottages',
    ],
    images: [
      img('photo-1600566753190-17f0baa2a6c3'),
      img('photo-1600573472592-401b489a3cdc'),
    ],
    status: 'reserved',
  },
  {
    id: '5',
    slug: 'luminous-pavilion',
    title: 'Luminous Pavilion',
    location: 'Kyoto, Japan',
    price: 7200000,
    bedrooms: 3,
    bathrooms: 3,
    area: 4200,
    year: 2024,
    description:
      'A contemporary interpretation of the traditional Japanese pavilion. Sliding walls, engawa corridors, and a private moss garden.',
    highlights: [
      'Traditional engawa',
      'Private tea house',
      'Heated stone floors',
      'Curated garden',
    ],
    images: [
      img('photo-1600210492486-724fe5c67fb0'),
      img('photo-1600585154526-990dced4db0d'),
    ],
    status: 'available',
  },
  {
    id: '6',
    slug: 'azure-residence',
    title: 'Azure Residence',
    location: 'Santorini, Greece',
    price: 6800000,
    bedrooms: 4,
    bathrooms: 4,
    area: 5100,
    year: 2023,
    description:
      'Carved into the caldera cliffs. Whitewashed volumes, private plunge pools, and uninterrupted Aegean views.',
    highlights: [
      'Caldera-edge infinity pool',
      'Private cave spa',
      'Sunset terrace',
      'Concierge service',
    ],
    images: [
      img('photo-1600047509358-9dc75507daeb'),
      img('photo-1600566753086-00f18fb6b3ea'),
    ],
    status: 'available',
  },
]

export function getPropertyBySlug(slug: string): Property | undefined {
  return properties.find((p) => p.slug === slug)
}

export function getFeaturedProperties(): Property[] {
  return properties.filter((p) => p.featured)
}

export interface PropertyFilters {
  q?: string
  type?: string
  price?: string
  location?: string
}

/** Filter collection for search bar / residences page */
export function filterProperties(filters: PropertyFilters): Property[] {
  const q = filters.q?.trim().toLowerCase()
  const type = filters.type?.trim()
  const location = filters.location?.trim()
  const price = filters.price?.trim()

  return properties.filter((p) => {
    if (q) {
      const hay = `${p.title} ${p.location} ${p.description} ${p.highlights.join(' ')}`.toLowerCase()
      if (!hay.includes(q)) return false
    }
    if (location && p.location !== location) return false
    if (type === 'featured' && !p.featured) return false
    if (type === 'available' || type === 'reserved' || type === 'sold') {
      if (p.status !== type) return false
    }
    if (price) {
      const [minS, maxS] = price.split('-')
      const min = minS ? Number(minS) : 0
      const max = maxS !== undefined && maxS !== '' ? Number(maxS) : Infinity
      if (p.price < min || p.price > max) return false
    }
    return true
  })
}
