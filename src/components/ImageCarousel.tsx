import { useState, useEffect } from 'react'

interface ImageCarouselProps {
  images: readonly string[]
  alt?: string
}

export function ImageCarousel({ images, alt = 'Portfolio image' }: ImageCarouselProps) {
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

  return (
    <div className="flex flex-col items-center">
      {/* Image Container */}
      <div className="w-full max-w-4xl">
        <div className="relative aspect-[16/10] bg-slate-800/30 rounded-xl overflow-hidden">
          <img
            src={images[displayIndex]}
            alt={`${alt} ${displayIndex + 1}`}
            className={`w-full h-full object-contain transition-opacity duration-200 ease-in-out ${
              isTransitioning ? 'opacity-0' : 'opacity-100'
            }`}
          />
        </div>
      </div>

      {/* Dots Navigation */}
      {images.length > 1 && (
        <div className="flex gap-3 mt-6">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? 'bg-white scale-125'
                  : 'bg-slate-600 hover:bg-slate-400 hover:scale-110'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
