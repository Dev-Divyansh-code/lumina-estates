import { type FormEvent, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { Search } from 'lucide-react'
import { properties } from '../../lib/properties'
import { heroContent } from '../../lib/hero-content'
import { unsplash, PHOTOS } from '../../lib/images'
import { LuminaBrandCard } from './lumina-brand'
import './nova-hero.css'

/** Soft architectural backdrop for the hero (desaturated in CSS) */
const HERO_BG = unsplash(PHOTOS.villaMain, { w: 1600, q: 72 })

const easeOut = [0.16, 1, 0.3, 1] as const

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

export interface HeroShowcaseProps {
  /** Override watermark word (default from hero-content.ts) */
  watermarkText?: string
  /** Hide watermark completely */
  showWatermark?: boolean
}

export function HeroShowcase({
  watermarkText,
  showWatermark,
}: HeroShowcaseProps = {}) {
  const navigate = useNavigate()
  const reduce = useReducedMotion()
  const { watermark, eyebrow, title, tagline } = heroContent

  const showMark = showWatermark ?? watermark.visible
  const markText = watermarkText ?? watermark.text

  const locations = useMemo(() => {
    const set = new Set(properties.map((p) => p.location))
    return Array.from(set).sort()
  }, [])

  const [query, setQuery] = useState('')
  const [type, setType] = useState('')
  const [price, setPrice] = useState('')
  const [location, setLocation] = useState('')

  const onSearch = (e: FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (query.trim()) params.set('q', query.trim())
    if (type) params.set('type', type)
    if (price) params.set('price', price)
    if (location) params.set('location', location)
    const qs = params.toString()
    navigate(qs ? `/residences?${qs}` : '/residences')
  }

  return (
    <section className="nova-hero" aria-label="Home hero">
      <div className="nova-hero__panel">
        {/* Double-layer architecture background — photo + soft fade (not flat grey) */}
        <div className="nova-hero__media" aria-hidden>
          {/* Soft blurred base layer for depth */}
          <img
            className="nova-hero__media-img nova-hero__media-img--blur"
            src={HERO_BG}
            alt=""
            width={1600}
            height={1000}
            decoding="async"
            fetchPriority="high"
          />
          {/* Sharp photo layer — more visible, faded only at edges */}
          <img
            className="nova-hero__media-img nova-hero__media-img--sharp"
            src={HERO_BG}
            alt=""
            width={1600}
            height={1000}
            decoding="async"
          />
          <div className="nova-hero__media-shade" />
          <div className="nova-hero__media-grain" />
        </div>
        <div className="nova-hero__glow" aria-hidden />
        <div className="nova-hero__grid" aria-hidden />

        {/* Brand mark — control text in src/lib/hero-content.ts */}
        {showMark && (
          <LuminaBrandCard
            text={markText}
            tagline="PRIVATE · DISCREET · WORLDWIDE"
            open
          />
        )}

        <div className="nova-hero__inner">
          {/* Supporting copy — open on the field, no box */}
          <motion.p
            className="nova-hero__eyebrow"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: easeOut, delay: 0.28 }}
          >
            {eyebrow}
          </motion.p>

          <h1 className="nova-hero__title">
            {reduce ? (
              <>
                {title.line1} <em>{title.line2}</em>
              </>
            ) : (
              <>
                <span className="inline-block overflow-hidden align-bottom pb-0.5">
                  <motion.span
                    className="inline-block"
                    initial={{ y: '105%' }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.35, duration: 0.7, ease: easeOut }}
                  >
                    {title.line1}
                  </motion.span>
                </span>{' '}
                <span className="inline-block overflow-hidden align-bottom pb-0.5">
                  <motion.em
                    className="inline-block not-italic"
                    style={{ fontStyle: 'italic' }}
                    initial={{ y: '105%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.45, duration: 0.75, ease: easeOut }}
                  >
                    {title.line2}
                  </motion.em>
                </span>
              </>
            )}
          </h1>

          <motion.p
            className="nova-hero__tag"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: easeOut, delay: 0.5 }}
          >
            {tagline}
          </motion.p>
        </div>

        <div className="nova-search-wrap">
          <motion.form
            id="hero-search"
            className="nova-search"
            onSubmit={onSearch}
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6, ease: easeOut }}
          >
            <div className="nova-search__field nova-search__field--query">
              <label className="nova-search__label" htmlFor="search-q">
                Looking for
              </label>
              <input
                id="search-q"
                className="nova-search__control"
                type="search"
                placeholder="Name or keyword"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoComplete="off"
                enterKeyHint="search"
              />
            </div>

            <div className="nova-search__field">
              <label className="nova-search__label" htmlFor="search-type">
                Type
              </label>
              <select
                id="search-type"
                className="nova-search__control"
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

            <div className="nova-search__field">
              <label className="nova-search__label" htmlFor="search-price">
                Price
              </label>
              <select
                id="search-price"
                className="nova-search__control"
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

            <div className="nova-search__field nova-search__field--location">
              <label className="nova-search__label" htmlFor="search-location">
                Location
              </label>
              <select
                id="search-location"
                className="nova-search__control"
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

            <button type="submit" className="nova-search__submit">
              <Search size={15} strokeWidth={2.4} />
              Search
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}

export default HeroShowcase
