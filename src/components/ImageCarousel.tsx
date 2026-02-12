import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'

interface ImageCarouselProps {
  images: readonly string[]
  alt?: string
  aspectClassName?: string
  containerClassName?: string
  alignClassName?: string
  wrapperClassName?: string
}

export function ImageCarousel({
  images,
  alt = 'Portfolio image',
  aspectClassName = 'aspect-[16/10]',
  containerClassName = 'rounded-xl',
  alignClassName = 'items-center',
  wrapperClassName = 'w-full max-w-4xl',
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [displayIndex, setDisplayIndex] = useState(0)

  // Reset index when images change (tab switch)
  useEffect(() => {
    setCurrentIndex(0)
    setDisplayIndex(0)
    setIsTransitioning(false)
  }, [images])

  const handleDotClick = (index: number) => {
    if (index === currentIndex || isTransitioning) return

    // Start fade out
    setIsTransitioning(true)

    // After fade out, change image and fade in
    setTimeout(() => {
      setDisplayIndex(index)
      setCurrentIndex(index)
      // Small delay then fade in
      setTimeout(() => {
        setIsTransitioning(false)
      }, 50)
    }, 200)
  }

  useEffect(() => {
    if (images.length <= 1) return

    const interval = setInterval(() => {
      if (isTransitioning) return
      const nextIndex = (currentIndex + 1) % images.length
      handleDotClick(nextIndex)
    }, 5000)

    return () => clearInterval(interval)
  }, [images, currentIndex, isTransitioning])

  if (images.length === 0) {
    return (
      <div className="flex items-center justify-center h-96 bg-slate-800/50 rounded-xl border border-slate-700">
        <p className="text-slate-500">No images available</p>
      </div>
    )
  }

  const currentImage = images[displayIndex]
  const isSvg = currentImage?.toLowerCase().endsWith('.svg')

  return (
    <div className={`flex flex-col ${alignClassName}`}>
      {/* Image Container */}
      <div className={wrapperClassName}>
        <div className={`relative ${aspectClassName} bg-slate-800/30 ${containerClassName} overflow-hidden`}>
          <img
            src={currentImage}
            alt={`${alt} ${displayIndex + 1}`}
            className={`w-full h-full object-contain transition-opacity duration-500 ease-in-out ${
              isTransitioning ? 'opacity-0' : 'opacity-100'
            }`}
          />
          {isSvg && (
            <a
              href={currentImage}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-3 right-3 inline-flex items-center justify-center w-10 h-10 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
              aria-label="View full size image"
            >
              <Search className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>

      {/* Dots Navigation */}
      {images.length > 1 && (
        <div className="flex gap-2.5 mt-5 justify-center">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? 'bg-white scale-110'
                  : 'bg-slate-600 hover:bg-slate-400 hover:scale-105'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
