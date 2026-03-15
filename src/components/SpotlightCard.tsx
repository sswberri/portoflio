import { useRef, useState } from 'react'
import { motion } from 'motion/react'

interface SpotlightCardProps {
  children: React.ReactNode
  className?: string
  as?: 'div' | 'a'
  /** Pass-through props for anchor elements */
  href?: string
  target?: string
  rel?: string
}

/**
 * A card wrapper that shows a subtle border-glow spotlight following the cursor.
 * Works on dark backgrounds — the glow sits behind the card content.
 */
export function SpotlightCard({
  children,
  className = '',
  as = 'div',
  ...rest
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [hovering, setHovering] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  const Component = as === 'a' ? motion.a : motion.div

  return (
    <Component
      ref={ref as any}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className={`relative overflow-hidden ${className}`}
      {...rest}
    >
      {/* Spotlight gradient overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
        style={{
          opacity: hovering ? 1 : 0,
          background: `radial-gradient(300px circle at ${position.x}px ${position.y}px, rgba(248, 168, 83, 0.08), transparent 50%)`,
        }}
      />
      {children}
    </Component>
  )
}
