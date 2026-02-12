import { useState, useEffect, useCallback } from 'react'
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

  const hasMultiple = images.length > 1

  const goPrev = useCallback(() => {
    setCurrentIndex((i) => (i - 1 + images.length) % images.length)
  }, [images.length])

  const goNext = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % images.length)
  }, [images.length])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (hasMultiple && e.key === 'ArrowLeft') goPrev()
      if (hasMultiple && e.key === 'ArrowRight') goNext()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose, hasMultiple, goPrev, goNext])

  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      style={{ zIndex: 99999 }}
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        style={{ zIndex: 100000 }}
        aria-label="Close"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev arrow */}
      {hasMultiple && (
        <button
          onClick={(e) => { e.stopPropagation(); goPrev() }}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white/70 hover:text-white hover:bg-black/70 transition-colors"
          style={{ zIndex: 100000 }}
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Image */}
      <img
        src={images[currentIndex]}
        alt={alt}
        className="max-h-[85vh] max-w-[85vw] object-contain"
        onClick={(e) => e.stopPropagation()}
      />

      {/* Next arrow */}
      {hasMultiple && (
        <button
          onClick={(e) => { e.stopPropagation(); goNext() }}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white/70 hover:text-white hover:bg-black/70 transition-colors"
          style={{ zIndex: 100000 }}
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Counter */}
      {hasMultiple && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm text-slate-400">
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>,
    document.body
  )
}
