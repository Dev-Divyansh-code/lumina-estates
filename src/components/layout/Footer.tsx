import { Link } from 'react-router-dom'
import { Instagram, Linkedin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="frame-section safe-pb">
      <div className="frame-panel frame-panel--soft relative">
        <div className="rule-silver absolute top-0 left-0 right-0" />
        <div className="container-luxury section-padding py-12 sm:py-16 md:py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-8">
            <div className="sm:col-span-2 lg:col-span-5">
              <Link to="/" className="inline-block">
                <span className="font-serif text-xl sm:text-2xl tracking-tight text-cream">Lumina</span>
                <span className="block text-[10px] tracking-[0.28em] uppercase text-graphite-light mt-0.5">
                  Estates
                </span>
              </Link>
              <p className="mt-4 sm:mt-6 text-cream/50 text-sm leading-relaxed max-w-xs">
                Curating exceptional private residences for those who appreciate architecture as a form of living art.
              </p>
            </div>

            <div className="lg:col-span-2">
              <p className="text-[11px] uppercase tracking-wider text-cream/40 mb-3 sm:mb-4">Explore</p>
              <ul className="space-y-2.5 sm:space-y-3">
                {['Residences', 'About', 'Journal'].map((item) => (
                  <li key={item}>
                    <Link
                      to={`/${item.toLowerCase()}`}
                      className="text-sm text-cream/70 hover:text-silver transition-colors inline-flex min-h-[44px] sm:min-h-0 items-center"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-2">
              <p className="text-[11px] uppercase tracking-wider text-cream/40 mb-3 sm:mb-4">Connect</p>
              <ul className="space-y-2.5 sm:space-y-3">
                <li>
                  <a
                    href="mailto:hello@luminaestates.com"
                    className="text-sm text-cream/70 hover:text-silver transition-colors break-all inline-flex min-h-[44px] sm:min-h-0 items-center"
                  >
                    hello@luminaestates.com
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+12125550198"
                    className="text-sm text-cream/70 hover:text-silver transition-colors inline-flex min-h-[44px] sm:min-h-0 items-center"
                  >
                    +1 (212) 555-0198
                  </a>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-3 lg:text-right">
              <p className="text-[11px] uppercase tracking-wider text-cream/40 mb-3 sm:mb-4">Follow</p>
              <div className="flex lg:justify-end gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center text-cream/60 hover:text-silver border border-white/5 hover:border-silver/30 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center text-cream/60 hover:text-silver border border-white/5 hover:border-silver/30 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-10 sm:mt-16 pt-6 sm:pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 text-center sm:text-left">
            <p className="text-xs text-cream/30">
              © {new Date().getFullYear()} Lumina Estates. All rights reserved.
            </p>
            <div className="flex gap-6 text-xs text-cream/30">
              <a href="#" className="hover:text-cream/60 transition-colors py-2">
                Privacy
              </a>
              <a href="#" className="hover:text-cream/60 transition-colors py-2">
                Terms
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
