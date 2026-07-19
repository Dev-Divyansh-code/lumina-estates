import { useCallback, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon, Search } from 'lucide-react'
import { useStore } from '../../store/useStore'
import { cn } from '../../lib/utils'
import { NavSearch } from '../forms/NavSearch'
import './pill-nav.css'

const NAV_LINKS = [
  { label: 'Residences', href: '/residences' },
  { label: 'About', href: '/about' },
  { label: 'Journal', href: '/journal' },
  { label: 'Contact', href: '#contact' },
]

/** Geometric mark similar to Nova logo */
function LuminaMark({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 18 L12 4 L20 18 Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M8.2 18 L12 10.5 L15.8 18" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

export function Navbar() {
  const { isMenuOpen, toggleMenu, closeMenu, openContact, theme, toggleTheme } = useStore()
  const location = useLocation()
  const [searchOpen, setSearchOpen] = useState(false)

  const openSearch = useCallback(() => {
    closeMenu()
    setSearchOpen(true)
  }, [closeMenu])

  const closeSearch = useCallback(() => {
    setSearchOpen(false)
  }, [])

  useEffect(() => {
    closeMenu()
    setSearchOpen(false)
  }, [location.pathname, closeMenu])

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  const isActive = (href: string) => {
    if (href.startsWith('#')) return false
    return location.pathname === href || location.pathname.startsWith(`${href}/`)
  }

  const onContact = () => {
    closeMenu()
    openContact()
  }

  return (
    <>
      <div className="pill-nav-wrap">
        <header className="pill-nav" role="banner">
          <Link to="/" className="pill-nav__logo" aria-label="Lumina home">
            <span className="pill-nav__logo-icon">
              <LuminaMark size={20} />
            </span>
            <span className="pill-nav__logo-name">Lumina</span>
          </Link>

          <div className="pill-nav__cluster">
            <nav className="pill-nav__links" aria-label="Primary">
              {NAV_LINKS.map((link) =>
                link.href === '#contact' ? (
                  <button
                    key={link.href}
                    type="button"
                    onClick={onContact}
                    className="pill-nav__link"
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={cn(
                      'pill-nav__link',
                      isActive(link.href) && 'pill-nav__link--active'
                    )}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>

            {/* Search — mobile only */}
            <button
              type="button"
              className="pill-nav__search-icon"
              onClick={openSearch}
              aria-label="Search residences"
            >
              <Search size={17} strokeWidth={2.2} />
            </button>

            <button
              type="button"
              className="pill-nav__icon-btn"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
            >
              {theme === 'dark' ? (
                <Sun size={16} strokeWidth={2} />
              ) : (
                <Moon size={16} strokeWidth={2} />
              )}
            </button>

            <button
              type="button"
              className="pill-nav__menu-btn"
              onClick={toggleMenu}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </header>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="pill-nav-drawer md:hidden"
          >
            <nav className="flex flex-col items-center gap-1 w-full" aria-label="Mobile">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.35 }}
                  className="w-full flex justify-center"
                >
                  {link.href === '#contact' ? (
                    <button type="button" onClick={onContact} className="pill-nav-drawer__link">
                      {link.label}
                    </button>
                  ) : (
                    <Link
                      to={link.href}
                      onClick={closeMenu}
                      className={cn(
                        'pill-nav-drawer__link',
                        isActive(link.href) && 'pill-nav-drawer__link--active'
                      )}
                    >
                      {link.label}
                    </Link>
                  )}
                </motion.div>
              ))}
              <motion.button
                type="button"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.35 }}
                className="pill-nav-drawer__cta"
                onClick={openSearch}
              >
                <Search size={16} strokeWidth={2.2} />
                Search
              </motion.button>
              <motion.button
                type="button"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.34, duration: 0.35 }}
                onClick={onContact}
                className="pill-nav-drawer__link"
              >
                Private viewing
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <NavSearch open={searchOpen} onClose={closeSearch} />
    </>
  )
}
