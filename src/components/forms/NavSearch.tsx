import { type FormEvent, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Search, X } from 'lucide-react'
import { properties } from '../../lib/properties'
import './nav-search.css'

const PRICE_OPTIONS = [
  { value: '', label: 'Any price' },
  { value: '0-5000000', label: 'Under $5M' },
  { value: '5000000-10000000', label: '$5M – $10M' },
  { value: '10000000-20000000', label: '$10M – $20M' },
  { value: '20000000-', label: '$20M+' },
]

const TYPE_OPTIONS = [
  { value: '', label: 'Any type' },
  { value: 'available', label: 'Available' },
  { value: 'reserved', label: 'Reserved' },
  { value: 'featured', label: 'Featured' },
]

interface NavSearchProps {
  open: boolean
  onClose: () => void
}

export function NavSearch({ open, onClose }: NavSearchProps) {
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')
  const [type, setType] = useState('')
  const [price, setPrice] = useState('')
  const [location, setLocation] = useState('')

  const locations = useMemo(() => {
    const set = new Set(properties.map((p) => p.location))
    return Array.from(set).sort()
  }, [])

  useEffect(() => {
    if (!open) return
    const t = window.setTimeout(() => inputRef.current?.focus(), 80)
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.clearTimeout(t)
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (query.trim()) params.set('q', query.trim())
    if (type) params.set('type', type)
    if (price) params.set('price', price)
    if (location) params.set('location', location)
    const qs = params.toString()
    onClose()
    navigate(qs ? `/residences?${qs}` : '/residences')
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="nav-search"
          role="dialog"
          aria-modal="true"
          aria-label="Search residences"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <button
            type="button"
            className="nav-search__backdrop"
            aria-label="Close search"
            onClick={onClose}
          />

          <motion.div
            className="nav-search__panel"
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="nav-search__head">
              <p className="nav-search__title">Search residences</p>
              <button
                type="button"
                className="nav-search__close"
                onClick={onClose}
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <form className="nav-search__form" onSubmit={onSubmit}>
              <div className="nav-search__field nav-search__field--grow">
                <label className="nav-search__label" htmlFor="nav-search-q">
                  Looking for
                </label>
                <input
                  ref={inputRef}
                  id="nav-search-q"
                  className="nav-search__control"
                  type="search"
                  placeholder="Name, place, or keyword"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  autoComplete="off"
                  enterKeyHint="search"
                />
              </div>

              <div className="nav-search__field">
                <label className="nav-search__label" htmlFor="nav-search-type">
                  Type
                </label>
                <select
                  id="nav-search-type"
                  className="nav-search__control"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  {TYPE_OPTIONS.map((o) => (
                    <option key={o.value || 'all-type'} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="nav-search__field">
                <label className="nav-search__label" htmlFor="nav-search-price">
                  Price
                </label>
                <select
                  id="nav-search-price"
                  className="nav-search__control"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                >
                  {PRICE_OPTIONS.map((o) => (
                    <option key={o.value || 'all-price'} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="nav-search__field">
                <label className="nav-search__label" htmlFor="nav-search-location">
                  Location
                </label>
                <select
                  id="nav-search-location"
                  className="nav-search__control"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                >
                  <option value="">All cities</option>
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              <button type="submit" className="nav-search__submit">
                <Search size={16} strokeWidth={2.4} />
                Search
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
