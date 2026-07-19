import { heroContent } from '../../../lib/hero-content'
import './lumina-brand.css'

export interface LuminaBrandCardProps {
  text?: string
  tagline?: string
  open?: boolean
  className?: string
}

/**
 * Lumina brand wordmark in the hero (no stripe lines).
 */
export function LuminaBrandCard({
  text = heroContent.watermark.text,
  tagline = 'PRIVATE · DISCREET · WORLDWIDE',
  open = true,
  className,
}: LuminaBrandCardProps) {
  return (
    <div
      className={[
        'lumina-brand',
        open ? 'lumina-brand--open' : 'lumina-brand--card',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      role="img"
      aria-label={text}
    >
      {!open && <div className="lumina-brand__dots" />}

      <div className="lumina-brand__inner">
        <div className="lumina-brand__word-wrap">
          <h2 className="lumina-brand__word">{text}</h2>
        </div>

        <div className="lumina-brand__tag">
          <span className="lumina-brand__rule" />
          <span className="lumina-brand__tag-text">{tagline}</span>
          <span className="lumina-brand__rule" />
        </div>
      </div>
    </div>
  )
}

export default LuminaBrandCard
