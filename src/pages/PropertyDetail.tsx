import { useEffect } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Bed, Bath, Maximize, Calendar } from 'lucide-react'
import { getPropertyBySlug } from '../lib/properties'
import { formatPrice, formatArea } from '../lib/utils'
import { useStore } from '../store/useStore'
import { PropertyShowcase } from '../components/property/PropertyShowcase'
import { Reveal } from '../components/ui/Reveal'

export default function PropertyDetail() {
  const { slug } = useParams<{ slug: string }>()
  const property = slug ? getPropertyBySlug(slug) : undefined
  const openContact = useStore((s) => s.openContact)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!property) {
    return <Navigate to="/residences" replace />
  }

  return (
    <div className="frame-section frame-section--top">
      <div className="frame-panel page-shell">
        <div className="section-padding container-luxury mb-5 sm:mb-8">
          <Link
            to="/residences"
            className="inline-flex items-center gap-2 text-sm text-cream/50 hover:text-silver transition-colors min-h-[44px]"
          >
            <ArrowLeft size={16} />
            All Residences
          </Link>
        </div>

        <section className="section-padding container-luxury mb-10 sm:mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <PropertyShowcase images={property.images} title={property.title} />
          </motion.div>
        </section>

        <section className="section-padding container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16">
            <div className="lg:col-span-7 order-2 lg:order-1">
              <Reveal>
                <p className="label-premium mb-2 sm:mb-3">{property.location}</p>
                <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight text-cream mb-3 sm:mb-4">
                  {property.title}
                </h1>
                <p className="text-xl sm:text-2xl md:text-3xl text-cream/90 font-light mb-6 sm:mb-8">
                  {formatPrice(property.price)}
                </p>
                <p className="text-cream/60 text-sm sm:text-base md:text-lg leading-relaxed mb-8 sm:mb-10">
                  {property.description}
                </p>

                <h3 className="text-[11px] uppercase tracking-wider text-cream/40 mb-3 sm:mb-4">
                  Highlights
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 mb-10 sm:mb-12">
                  {property.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2.5 text-sm text-cream/70">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-graphite shrink-0 ring-1 ring-silver/40" />
                      {h}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            <div className="lg:col-span-5 order-1 lg:order-2">
              <Reveal delay={0.1}>
                <div className="glass rounded-sm p-5 sm:p-6 md:p-8 lg:sticky lg:top-28">
                  <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <Bed size={18} className="text-graphite-light shrink-0" />
                      <div className="min-w-0">
                        <p className="text-base sm:text-lg text-cream">{property.bedrooms}</p>
                        <p className="text-[10px] sm:text-[11px] text-cream/40 uppercase tracking-wider">
                          Bedrooms
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <Bath size={18} className="text-silver shrink-0" />
                      <div className="min-w-0">
                        <p className="text-base sm:text-lg text-cream">{property.bathrooms}</p>
                        <p className="text-[10px] sm:text-[11px] text-cream/40 uppercase tracking-wider">
                          Bathrooms
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <Maximize size={18} className="text-graphite-light shrink-0" />
                      <div className="min-w-0">
                        <p className="text-base sm:text-lg text-cream truncate">
                          {formatArea(property.area)}
                        </p>
                        <p className="text-[10px] sm:text-[11px] text-cream/40 uppercase tracking-wider">
                          Area
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <Calendar size={18} className="text-silver shrink-0" />
                      <div className="min-w-0">
                        <p className="text-base sm:text-lg text-cream">{property.year}</p>
                        <p className="text-[10px] sm:text-[11px] text-cream/40 uppercase tracking-wider">
                          Year
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={openContact}
                    className="w-full btn-primary text-sm tracking-wider uppercase"
                  >
                    Request Private Viewing
                  </button>
                  <p className="mt-3 sm:mt-4 text-center text-[11px] text-cream/35">
                    Discreet · By appointment only
                  </p>
                </div>
              </Reveal>
            </div>
          </div>

          <div className="mt-12 sm:mt-16 md:mt-20 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
            {property.images.map((src, i) => (
              <motion.div
                key={src}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="relative aspect-[16/10] overflow-hidden bg-warm-gray group"
                data-cursor="hover"
              >
                <img
                  src={src}
                  alt={`${property.title} view ${i + 1}`}
                  loading="lazy"
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
                />
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
