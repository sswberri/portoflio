import { VideoCard } from './VideoCard'

interface Video {
  id: string
  title: string
  company: string
  type: string
  description: string
  thumbnailUrl: string
  videoUrl: string
}

interface VideosSectionProps {
  headline: string
  subheadline: string
  videos: Video[]
}

export function VideosSection({
  headline,
  subheadline,
  videos,
}: VideosSectionProps) {
  return (
    <section className="py-12 lg:py-20">
      {/* Section Header */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          {headline}
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl">
          {subheadline}
        </p>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video, index) => (
          <VideoCard
            key={video.id}
            id={video.id}
            index={index}
            title={video.title}
            company={video.company}
            type={video.type}
            thumbnailUrl={video.thumbnailUrl}
            videoUrl={video.videoUrl}
          />
        ))}
      </div>

      {videos.length === 0 && (
        <div className="text-center py-24 text-slate-400">
          No videos found.
        </div>
      )}
    </section>
  )
}
