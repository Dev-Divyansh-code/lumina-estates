import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import type { Property } from '../../lib/properties'
import { formatPrice, formatArea } from '../../lib/utils'

interface PropertyCardProps {
  property: Property
  index?: number
}

export function PropertyCard({ property, index = 0 }: PropertyCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [canTilt, setCanTilt] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseX = useSpring(x, { stiffness: 300, damping: 30 })
  const mouseY = useSpring(y, { stiffness: 300, damping: 30 })

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [6, -6])
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-6, 6])

  useEffect(() => {
    // 3D tilt only on fine pointer + sufficient width
    const mq = window.matchMedia('(pointer: fine) and (min-width: 768px)')
    const update = () => setCanTilt(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  const handleMouse = (e: React.MouseEvent) => {
    if (!canTilt || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    x.set(px)
    y.set(py)
  }

  const handleLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="h-full"
    >
      <Link to={`/residences/${property.slug}`} className="block h-full">
        <motion.div
          ref={ref}
          onMouseMove={handleMouse}
          onMouseLeave={handleLeave}
          style={
            canTilt
              ? { rotateX, rotateY, transformStyle: 'preserve-3d' }
              : undefined
          }
          className="group relative h-full perspective-1000"
        >
          <div className="relative aspect-[5/4] xs:aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] overflow-hidden bg-warm-gray">
            <img
              src={property.images[0]}
              alt={property.title}
              loading="lazy"
              decoding="async"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/95 via-charcoal/25 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-500" />

            {property.status !== 'available' && (
              <span className="absolute top-3 left-3 sm:top-4 sm:left-4 text-[10px] uppercase tracking-wider px-2.5 py-1 bg-charcoal/70 text-cream/80 backdrop-blur-sm">
                {property.status}
              </span>
            )}

            <div
              className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-6"
              style={canTilt ? { transform: 'translateZ(30px)' } : undefined}
            >
              <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-graphite-light mb-1 sm:mb-1.5">
                {property.location}
              </p>
              <h3 className="font-serif text-lg sm:text-xl md:text-2xl text-cream mb-1.5 sm:mb-2 group-hover:text-silver transition-colors duration-400">
                {property.title}
              </h3>
              <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-1 sm:gap-2">
                <p className="text-sm text-cream/70">{formatPrice(property.price)}</p>
                <span className="text-[11px] sm:text-xs text-cream/40">
                  {property.bedrooms} bd · {formatArea(property.area)}
                </span>
              </div>
            </div>

            {/* Always visible on touch; hover-reveal on desktop */}
            <div
              className="absolute top-3 right-3 sm:top-4 sm:right-4 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-400 sm:translate-y-1 sm:group-hover:translate-y-0"
              style={canTilt ? { transform: 'translateZ(40px)' } : undefined}
            >
              <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] uppercase tracking-wider bg-charcoal-50 text-cream px-2.5 sm:px-3 py-1.5 font-medium border border-silver/40 shadow-silver-glow">
                Explore
                <ArrowUpRight size={12} className="text-silver" />
              </span>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  )
}
