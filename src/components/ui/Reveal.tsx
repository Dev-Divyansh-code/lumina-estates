import { type ReactNode } from 'react'
import { motion, type Variants } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1] as const

type RevealVariant = 'up' | 'fade' | 'scale' | 'blur' | 'clip'

const variantMap: Record<RevealVariant, Variants> = {
  up: {
    hidden: { opacity: 0, y: 40 },
    visible: (delay: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, delay, ease },
    }),
  },
  fade: {
    hidden: { opacity: 0 },
    visible: (delay: number = 0) => ({
      opacity: 1,
      transition: { duration: 0.85, delay, ease },
    }),
  },
  scale: {
    hidden: { opacity: 0, scale: 0.94, y: 24 },
    visible: (delay: number = 0) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.95, delay, ease },
    }),
  },
  blur: {
    hidden: { opacity: 0, y: 28, filter: 'blur(10px)' },
    visible: (delay: number = 0) => ({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 1, delay, ease },
    }),
  },
  clip: {
    hidden: { opacity: 0, clipPath: 'inset(12% 0 12% 0)', y: 20 },
    visible: (delay: number = 0) => ({
      opacity: 1,
      clipPath: 'inset(0% 0 0% 0)',
      y: 0,
      transition: { duration: 1.05, delay, ease },
    }),
  },
}

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  as?: 'div' | 'section' | 'header'
  /** Scroll entrance style */
  variant?: RevealVariant
}

/** Scroll-triggered reveal used across page sections */
export function Reveal({
  children,
  className,
  delay = 0,
  as = 'div',
  variant = 'up',
}: RevealProps) {
  const MotionTag = motion[as]

  return (
    <MotionTag
      className={className}
      variants={variantMap[variant]}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-12% 0px -8% 0px', amount: 0.2 }}
      custom={delay}
    >
      {children}
    </MotionTag>
  )
}
