import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '../../lib/utils'

interface PropertyShowcaseProps {
  images: string[]
  title: string
}

/**
 * Immersive image showcase — cinematic alternative to the 3D property viewer.
 */
export function PropertyShowcase({ images, title }: PropertyShowcaseProps) {
  const [index, setIndex] = useState(0)
  const total = images.length
  const current = images[index] ?? images[0]

  const prev = () => setIndex((i) => (i - 1 + total) % total)
  const next = () => setIndex((i) => (i + 1) % total)

  if (!current) return null

  return (
    <div className="relative overflow-hidden rounded-sm border border-white/5 bg-charcoal-50">
      <div className="relative aspect-[4/3] xs:aspect-[16/10] w-full overflow-hidden md:aspect-[21/9]">
        <AnimatePresence mode="wait">
          <motion.img
            key={current}
            src={current}
            alt={`${title} — view ${index + 1}`}
            className="absolute inset-0 h-full w-full object-cover"
            sizes="100vw"
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          />
        </AnimatePresence>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-charcoal/20" />
        <div className="pointer-events-none absolute inset-0 bg-noise opacity-30 mix-blend-overlay" />

        <div className="absolute bottom-3 left-3 sm:bottom-5 sm:left-5 md:bottom-6 md:left-6">
          <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-cream/70">
            <span className="text-graphite">{String(index + 1).padStart(2, '0')}</span>
            <span className="mx-2 text-cream/30">/</span>
            {String(total).padStart(2, '0')}
          </p>
        </div>

        {total > 1 && (
          <div className="absolute bottom-3 right-3 sm:bottom-5 sm:right-5 md:bottom-6 md:right-6 flex gap-2">
            <button
              type="button"
              onClick={prev}
              className="flex h-11 w-11 sm:h-10 sm:w-10 items-center justify-center border border-white/15 bg-charcoal/50 text-cream backdrop-blur-md transition-colors hover:border-silver/50 hover:text-silver"
              aria-label="Previous image"
              data-cursor="hover"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={next}
              className="flex h-11 w-11 sm:h-10 sm:w-10 items-center justify-center border border-white/15 bg-charcoal/50 text-cream backdrop-blur-md transition-colors hover:border-silver/50 hover:text-silver"
              aria-label="Next image"
              data-cursor="hover"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>

      {total > 1 && (
        <div className="flex gap-2 overflow-x-auto border-t border-white/5 p-2.5 sm:p-3 md:gap-3 md:p-4 touch-pan-x scrollbar-thin">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setIndex(i)}
              data-cursor="hover"
              className={cn(
                'relative h-12 w-16 sm:h-14 sm:w-20 md:h-16 md:w-24 shrink-0 overflow-hidden border transition-all duration-300',
                i === index
                  ? 'border-silver opacity-100 ring-1 ring-graphite/40'
                  : 'border-transparent opacity-50 hover:opacity-80'
              )}
              aria-label={`Show image ${i + 1}`}
            >
              <img src={src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
