/**
 * Hero copy & Lumina brand mark — edit this file to control the hero.
 *
 * watermark.text     → brand word (e.g. "LUMINA")
 * watermark.visible  → show / hide brand mark
 */
export const heroContent = {
  watermark: {
    text: 'LUMINA',
    visible: true,
  },

  eyebrow: 'Private collection',

  title: {
    line1: 'Live the',
    line2: 'Estate',
  },

  tagline: 'Architecture as sanctuary — discreet introductions, worldwide.',
} as const

export type HeroContent = typeof heroContent
