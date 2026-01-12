import { useState } from 'react'
import { Play } from 'lucide-react'

interface VideoCardProps {
  id: string
  index: number
  title: string
  company: string
  type: string
  thumbnailUrl: string
  videoUrl: string
}

// Extract YouTube video ID from URL
function getYouTubeId(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/)
  return match ? match[1] : null
}

export function VideoCard({
  index,
  title,
  company,
  type,
  thumbnailUrl,
  videoUrl,
}: VideoCardProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const youtubeId = getYouTubeId(videoUrl)

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
              src={thumbnailUrl}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = `https://placehold.co/640x360/1e293b/ffffff?text=${encodeURIComponent(title.split(' ').map(w => w[0]).join(''))}`
              }}
            />
            {/* Play Button Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full flex items-center justify-center bg-white/90 opacity-70 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                <Play className="w-6 h-6 text-slate-900 ml-1" fill="currentColor" />
              </div>
            </div>
            {/* Type Badge */}
            <span className="absolute top-3 left-3 px-2 py-1 text-xs font-medium bg-black/70 text-white rounded">
              {type}
            </span>
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
