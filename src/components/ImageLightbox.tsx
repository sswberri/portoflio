import { useState, useEffect, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

interface ImageLightboxProps {
  images: readonly string[]
  initialIndex?: number
  alt?: string
  onClose: () => void
}

export function ImageLightbox({ images, initialIndex = 0, alt = '', onClose }: ImageLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [displayIndex, setDisplayIndex] = useState(initialIndex)
  const [phase, setPhase] = useState<'visible' | 'out'>('visible')
  const [direction, setDirection] = useState<'left' | 'right'>('right')
  const [entered, setEntered] = useState(false)
  const [closing, setClosing] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined)

  const hasMultiple = images.length > 1

  // Entry animation
  useEffect(() => {
    requestAnimationFrame(() => requestAnimationFrame(() => setEntered(true)))
  }, [])

  // Animated close
  const handleClose = useCallback(() => {
    setClosing(true)
    setTimeout(onClose, 200)
  }, [onClose])

  const switchTo = useCallback((next: number, dir: 'left' | 'right') => {
    if (phase === 'out') return
    setDirection(dir)
    setPhase('out')
    timeoutRef.current = setTimeout(() => {
      setDisplayIndex(next)
      setCurrentIndex(next)
      setPhase('visible')
    }, 150)
  }, [phase])

  const goPrev = useCallback(() => {
    switchTo((currentIndex - 1 + images.length) % images.length, 'left')
  }, [currentIndex, images.length, switchTo])

  const goNext = useCallback(() => {
    switchTo((currentIndex + 1) % images.length, 'right')
  }, [currentIndex, images.length, switchTo])

  useEffect(() => {
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current) }
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
      if (hasMultiple && e.key === 'ArrowLeft') goPrev()
      if (hasMultiple && e.key === 'ArrowRight') goNext()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleClose, hasMultiple, goPrev, goNext])

  // Derive visual state
  const show = entered && !closing

  const translateX = phase === 'out'
    ? direction === 'right' ? '-12px' : '12px'
    : '0px'

  const imgScale = show ? 1 : 0.95
  const imgOpacity = !show ? 0 : phase === 'out' ? 0 : 1

  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{
        zIndex: 99999,
        backgroundColor: show ? 'rgba(0,0,0,0.9)' : 'rgba(0,0,0,0)',
        backdropFilter: show ? 'blur(4px)' : 'blur(0px)',
        transition: 'background-color 250ms ease, backdrop-filter 250ms ease',
      }}
      onClick={handleClose}
    >
      {/* Close */}
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        style={{ zIndex: 100000, opacity: show ? 1 : 0, transition: 'opacity 200ms ease' }}
        aria-label="Close"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev arrow */}
      {hasMultiple && (
        <button
          onClick={(e) => { e.stopPropagation(); goPrev() }}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white/70 hover:text-white hover:bg-black/70 transition-colors"
          style={{ zIndex: 100000, opacity: show ? 1 : 0, transition: 'opacity 200ms ease' }}
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Image */}
      <img
        src={images[displayIndex]}
        alt={alt}
        className="max-h-[85vh] max-w-[85vw] object-contain"
        style={{
          opacity: imgOpacity,
          transform: `translateX(${translateX}) scale(${imgScale})`,
          transition: show
            ? 'opacity 150ms ease, transform 150ms ease'
            : 'opacity 250ms ease, transform 250ms ease',
        }}
        onClick={(e) => e.stopPropagation()}
      />

      {/* Next arrow */}
      {hasMultiple && (
        <button
          onClick={(e) => { e.stopPropagation(); goNext() }}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white/70 hover:text-white hover:bg-black/70 transition-colors"
          style={{ zIndex: 100000, opacity: show ? 1 : 0, transition: 'opacity 200ms ease' }}
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Counter */}
      {hasMultiple && (
        <div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm text-slate-400"
          style={{ opacity: show ? 1 : 0, transition: 'opacity 200ms ease' }}
        >
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>,
    document.body
  )
}
