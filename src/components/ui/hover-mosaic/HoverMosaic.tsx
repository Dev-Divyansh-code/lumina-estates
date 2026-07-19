import { Link } from 'react-router-dom'
import { unsplash } from '../../../lib/images'
import './hover-mosaic.css'

export interface MosaicCell {
  src: string
  alt: string
  href?: string
  /** Center brand cell (no expand photo treatment) */
  brand?: boolean
}

const DEFAULT_CELLS: MosaicCell[] = [
  {
    src: unsplash('photo-1613490493576-7fde63acd811', { w: 900, q: 72 }),
    alt: 'Casa Aurora, Malibu',
    href: '/residences/casa-aurora',
  },
  {
    src: unsplash('photo-1600585154340-be6161a56a0c', { w: 900, q: 72 }),
    alt: 'Villa Solara, Tulum',
    href: '/residences/villa-solara',
  },
  {
    src: unsplash('photo-1512917774080-9991f1c4c750', { w: 900, q: 72 }),
    alt: 'The Obsidian, Aspen',
    href: '/residences/the-obsidian',
  },
  {
    src: unsplash('photo-1600566753190-17f0baa2a6c3', { w: 900, q: 72 }),
    alt: 'Horizon House, Cape Town',
    href: '/residences/horizon-house',
  },
  {
    src: unsplash('photo-1600607687939-ce8a6c25118c', { w: 900, q: 72 }),
    alt: 'Lumina Estates',
    brand: true,
    href: '/about',
  },
  {
    src: unsplash('photo-1600210492486-724fe5c67fb0', { w: 900, q: 72 }),
    alt: 'Luminous Pavilion, Kyoto',
    href: '/residences/luminous-pavilion',
  },
  {
    src: unsplash('photo-1600047509358-9dc75507daeb', { w: 900, q: 72 }),
    alt: 'Azure Residence, Santorini',
    href: '/residences/azure-residence',
  },
  {
    src: unsplash('photo-1600596542815-ffad4c1539a9', { w: 900, q: 72 }),
    alt: 'Private residence interior',
    href: '/residences',
  },
  {
    src: unsplash('photo-1600047509807-ba8f99d2cd00', { w: 900, q: 72 }),
    alt: 'Architectural detail',
    href: '/residences',
  },
]

interface HoverMosaicProps {
  cells?: MosaicCell[]
  className?: string
}

function MosaicArticle({ cell }: { cell: MosaicCell }) {
  const media = cell.brand ? (
    <>
      <img
        src={cell.src}
        alt=""
        loading="lazy"
        decoding="async"
        className="hover-mosaic__img hover-mosaic__img--brand-bg"
      />
      <div className="hover-mosaic__brand">
        <span className="hover-mosaic__brand-mark" aria-hidden>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 18 L12 4 L20 18 Z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
            <path d="M8.2 18 L12 10.5 L15.8 18" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        </span>
        <span className="hover-mosaic__brand-name">Lumina</span>
        <span className="hover-mosaic__brand-sub">Estates</span>
      </div>
    </>
  ) : (
    <img
      src={cell.src}
      alt={cell.alt}
      loading="lazy"
      decoding="async"
      className="hover-mosaic__img"
    />
  )

  const body = (
    <article
      className={
        cell.brand
          ? 'hover-mosaic__cell hover-mosaic__cell--brand'
          : 'hover-mosaic__cell'
      }
      data-cursor="hover"
    >
      {media}
    </article>
  )

  if (cell.href) {
    return (
      <Link to={cell.href} className="hover-mosaic__link" aria-label={cell.alt}>
        {body}
      </Link>
    )
  }

  return body
}

/**
 * Interactive 3×3 hover mosaic — columns/rows expand on hover.
 * Replaces static destination photo grids.
 */
export function HoverMosaic({ cells = DEFAULT_CELLS, className }: HoverMosaicProps) {
  const grid = cells.slice(0, 9)
  while (grid.length < 9) {
    grid.push({
      src: unsplash('photo-1600585154526-990dced4db0d', { w: 900, q: 72 }),
      alt: 'Residence',
      href: '/residences',
    })
  }

  const col1 = grid.slice(0, 3)
  const col2 = grid.slice(3, 6)
  const col3 = grid.slice(6, 9)

  return (
    <div className={className ? `hover-mosaic ${className}` : 'hover-mosaic'}>
      <div className="hover-mosaic__shell group">
        <div className="hover-mosaic__col">
          {col1.map((cell, i) => (
            <MosaicArticle key={`c1-${i}`} cell={cell} />
          ))}
        </div>
        <div className="hover-mosaic__col">
          {col2.map((cell, i) => (
            <MosaicArticle key={`c2-${i}`} cell={cell} />
          ))}
        </div>
        <div className="hover-mosaic__col">
          {col3.map((cell, i) => (
            <MosaicArticle key={`c3-${i}`} cell={cell} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default HoverMosaic
