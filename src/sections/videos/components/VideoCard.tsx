import { useState } from 'react'
import { Play } from 'lucide-react'

interface VideoCardProps {
  id: string
  index: number
  title: string
  company: string
  category: string
  thumbnailUrl: string
  videoUrl: string
}

// Extract YouTube video ID from URL
function getYouTubeId(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/)
  return match ? match[1] : null
}

export function VideoCard({
  title,
  company,
  category,
  thumbnailUrl,
  videoUrl,
}: VideoCardProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [imgSrc, setImgSrc] = useState(thumbnailUrl)
  const [fallbackAttempted, setFallbackAttempted] = useState(false)
  const youtubeId = getYouTubeId(videoUrl)

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget
    // YouTube returns a 120x90 gray placeholder when maxresdefault doesn't exist
    if (img.naturalWidth === 120 && img.naturalHeight === 90 && !fallbackAttempted && youtubeId) {
      setImgSrc(`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`)
      setFallbackAttempted(true)
    }
  }

  const handleImageError = () => {
    if (!fallbackAttempted && youtubeId) {
      // Try hqdefault as fallback
      setImgSrc(`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`)
      setFallbackAttempted(true)
    } else {
      // Final fallback to placeholder
      setImgSrc(`https://placehold.co/640x360/1e293b/ffffff?text=${encodeURIComponent(title.split(' ').map(w => w[0]).join(''))}`)
    }
  }

  return (
    <div className="group">
      {/* Video Container */}
      <div className="aspect-video overflow-hidden bg-slate-800 relative mb-4 rounded-lg">
        {isPlaying && youtubeId ? (
          // YouTube Embed Player
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
            title={title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          // Thumbnail with Play Button
          <button
            onClick={() => setIsPlaying(true)}
            className="w-full h-full relative"
          >
            <img
              src={imgSrc}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
            {/* Play Button Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full flex items-center justify-center bg-white/90 opacity-70 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                <Play className="w-6 h-6 text-slate-900 ml-1" fill="currentColor" />
              </div>
            </div>
          </button>
        )}
      </div>

      {/* Content */}
      <div className="space-y-1">
        {/* Company */}
        <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
          {company}
        </span>

        {/* Title */}
        <h3 className="text-lg font-semibold text-white leading-tight">
          {title}
        </h3>
      </div>
    </div>
  )
}
