import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PropertyCard } from '../components/property/PropertyCard'
import { filterProperties, properties } from '../lib/properties'

export default function Residences() {
  const [params] = useSearchParams()
  const filters = useMemo(
    () => ({
      q: params.get('q') ?? undefined,
      type: params.get('type') ?? undefined,
      price: params.get('price') ?? undefined,
      location: params.get('location') ?? undefined,
    }),
    [params]
  )

  const list = useMemo(() => filterProperties(filters), [filters])
  const hasFilters = Boolean(filters.q || filters.type || filters.price || filters.location)

  return (
    <div className="frame-section frame-section--top">
      <div className="frame-panel page-shell">
        <div className="section-padding container-luxury">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl mb-10 sm:mb-14 md:mb-20"
          >
            <p className="label-premium mb-3 sm:mb-4">Collection</p>
            <h1 className="heading-hero font-serif tracking-tighter text-cream mb-4 sm:mb-6">
              <span className="text-royal">Residences</span>
            </h1>
            <p className="text-cream/55 text-sm sm:text-base md:text-lg leading-relaxed">
              {hasFilters
                ? `Showing ${list.length} of ${properties.length} residences matching your search.`
                : 'A carefully curated selection of architectural residences. Each property is presented with the same discretion and attention we bring to every client relationship.'}
            </p>
          </motion.div>

          {list.length === 0 ? (
            <p className="text-cream/50 text-sm">
              No residences match these filters. Try adjusting your search.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
              {list.map((p, i) => (
                <PropertyCard key={p.id} property={p} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
