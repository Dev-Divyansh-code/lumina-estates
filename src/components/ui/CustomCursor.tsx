import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { prefersReducedMotion } from '../../lib/utils'

/**
 * Luxury dual-ring custom cursor.
 * Hidden on touch devices and when reduced motion is preferred.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [visible, setVisible] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [clicking, setClicking] = useState(false)

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  const springConfig = { damping: 28, stiffness: 320, mass: 0.4 }
  const ringX = useSpring(mouseX, springConfig)
  const ringY = useSpring(mouseY, springConfig)
  const dotX = useSpring(mouseX, { damping: 40, stiffness: 600, mass: 0.2 })
  const dotY = useSpring(mouseY, { damping: 40, stiffness: 600, mass: 0.2 })

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches
    const reduce = prefersReducedMotion()
    if (!finePointer || reduce) {
      setEnabled(false)
      return
    }
    setEnabled(true)

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      setVisible(true)
    }

    const onLeave = () => setVisible(false)
    const onDown = () => setClicking(true)
    const onUp = () => setClicking(false)

    const interactiveSelector =
      'a, button, [role="button"], input, textarea, select, label, [data-cursor="hover"]'

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (target?.closest(interactiveSelector)) setHovering(true)
    }
    const onOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (target?.closest(interactiveSelector)) setHovering(false)
    }

    // Keep hover state accurate as pointer moves between elements
    const onMoveHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      setHovering(!!target?.closest(interactiveSelector))
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousemove', onMoveHover)
    document.addEventListener('mouseleave', onLeave)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousemove', onMoveHover)
      document.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
    }
  }, [mouseX, mouseY])

  if (!enabled) return null

  return (
    <>
      {/* Outer ring */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9999] mix-blend-difference"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="rounded-full"
          animate={{
            width: hovering ? 54 : clicking ? 18 : 36,
            height: hovering ? 54 : clicking ? 18 : 36,
            opacity: visible ? 0.95 : 0,
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: hovering ? '#E8EAEE' : '#C5CAD3',
            boxShadow: hovering
              ? '0 0 18px rgba(197,202,211,0.35), inset 0 0 0 1px rgba(61,65,73,0.4)'
              : '0 0 0 0 transparent',
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 24 }}
        />
      </motion.div>

      {/* Center oxblood → gold dot */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="rounded-full"
          animate={{
            width: hovering ? 7 : 4,
            height: hovering ? 7 : 4,
            opacity: visible ? 1 : 0,
            scale: clicking ? 0.6 : 1,
            backgroundColor: hovering ? '#E8EAEE' : '#6B7280',
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 22 }}
        />
      </motion.div>
    </>
  )
}
