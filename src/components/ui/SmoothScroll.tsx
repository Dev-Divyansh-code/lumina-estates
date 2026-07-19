import { useEffect, type ReactNode } from 'react'
import Lenis from 'lenis'
import { prefersReducedMotion } from '../../lib/utils'

export type LenisInstance = Lenis

/**
 * Cinematic smooth scroll — silk inertia (not linear/default browser scroll).
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (prefersReducedMotion()) return

    const lenis = new Lenis({
      // Longer glide for a premium “weight” feel
      duration: 1.35,
      // Soft ease-out-expo: starts quick, settles smoothly
      easing: (t) => {
        const x = Math.min(1, Math.max(0, t))
        return 1 - Math.pow(1 - x, 4)
      },
      smoothWheel: true,
      wheelMultiplier: 0.92,
      touchMultiplier: 1.15,
      // Avoid fighting mobile native scroll
      syncTouch: false,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
    })

    let rafId = 0
    const raf = (time: number) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    ;(window as unknown as { __lenis?: Lenis }).__lenis = lenis

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      delete (window as unknown as { __lenis?: Lenis }).__lenis
    }
  }, [])

  return <>{children}</>
}
