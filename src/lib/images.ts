/**
 * Unsplash-friendly image helpers for smaller, faster assets.
 */
export function unsplash(
  id: string,
  opts: { w?: number; q?: number; h?: number } = {}
): string {
  const w = opts.w ?? 900
  const q = opts.q ?? 68
  const h = opts.h
  const base = `https://images.unsplash.com/${id}`
  const params = new URLSearchParams({
    auto: 'format',
    fit: 'crop',
    w: String(w),
    q: String(q),
  })
  if (h) params.set('h', String(h))
  return `${base}?${params.toString()}`
}

/** Common photo IDs used across the site */
export const PHOTOS = {
  villaMain: 'photo-1600596542815-ffad4c1539a9',
  villaAccent: 'photo-1613490493576-7fde63acd811',
  villaDetail: 'photo-1600585154340-be6161a56a0c',
  interior: 'photo-1600607687939-ce8a6c25118c',
} as const
