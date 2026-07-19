import { Link } from 'react-router-dom'
import type { Property } from '../../../lib/properties'
import { formatPrice } from '../../../lib/utils'
import './image-accordion.css'

interface ImageAccordionProps {
  items: Property[]
}

/**
 * Horizontal image accordion (3 frames) — Cruip-style expand on hover.
 */
export function ImageAccordion({ items }: ImageAccordionProps) {
  const frames = items.slice(0, 3)

  if (frames.length === 0) return null

  return (
    <div className="img-acc group">
      {frames.map((property) => (
        <article key={property.id} className="img-acc__panel group/article">
          <Link
            to={`/residences/${property.slug}`}
            className="img-acc__link"
            data-cursor="hover"
          >
            <span className="img-acc__caption">
              <span className="img-acc__title">{property.title}</span>
              <span className="img-acc__meta">
                {property.location}
                <span className="img-acc__dot" aria-hidden>
                  ·
                </span>
                {formatPrice(property.price)}
              </span>
            </span>
          </Link>
          <img
            className="img-acc__img"
            src={property.images[0]}
            alt={property.title}
            width={960}
            height={480}
            loading="lazy"
            decoding="async"
          />
        </article>
      ))}
    </div>
  )
}

export default ImageAccordion
