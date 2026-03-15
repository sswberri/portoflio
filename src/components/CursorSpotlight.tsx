import { useEffect, useRef, useCallback } from 'react'

/**
 * Global cursor spotlight — a soft radial glow that follows the mouse.
 * Uses plain DOM manipulation for maximum performance (no re-renders).
 * Invisible on touch devices.
 */
export function CursorSpotlight() {
  const ref = useRef<HTMLDivElement>(null)

  const handleMove = useCallback((e: MouseEvent) => {
    if (!ref.current) return
    ref.current.style.opacity = '1'
    ref.current.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, rgba(248, 168, 83, 0.06), transparent 40%)`
  }, [])

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)')
    if (!mq.matches) return

    window.addEventListener('mousemove', handleMove)
    document.addEventListener('mouseleave', () => {
      if (ref.current) ref.current.style.opacity = '0'
    })
    document.addEventListener('mouseenter', () => {
      if (ref.current) ref.current.style.opacity = '1'
    })

    return () => {
      window.removeEventListener('mousemove', handleMove)
    }
  }, [handleMove])

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed inset-0 z-50"
      style={{ opacity: 0, transition: 'opacity 0.3s' }}
      aria-hidden
    />
  )
}
