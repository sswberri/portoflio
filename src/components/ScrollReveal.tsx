import { motion } from 'motion/react'

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  /** Delay in seconds — use for staggering multiple items */
  delay?: number
  /** Vertical offset in pixels (default 24) */
  y?: number
}

/**
 * Wraps children in a scroll-triggered fade-up reveal animation.
 * Uses `whileInView` so no IntersectionObserver wiring needed.
 */
export function ScrollReveal({
  children,
  className,
  delay = 0,
  y = 24,
}: ScrollRevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  )
}
