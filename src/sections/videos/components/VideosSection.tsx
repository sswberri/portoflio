import { useState } from 'react'
import { VideoCard } from './VideoCard'

interface Video {
  id: string
  title: string
  company: string
  category: string
  description: string
  thumbnailUrl: string
  videoUrl: string
}

interface VideosSectionProps {
  headline: string
  subheadline: string
  categories: string[]
  videos: Video[]
}

export function VideosSection({
  headline,
  subheadline,
  categories,
  videos,
}: VideosSectionProps) {
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredVideos = activeCategory === 'All'
    ? videos
    : videos.filter(video => video.category === activeCategory)

  return (
    <section className="py-12 lg:py-20">
      {/* Section Header */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          {headline}
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl">
          {subheadline}
        </p>
      </div>

      {/* Category Tabs */}
      <div className="mb-10 flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeCategory === category
                ? 'bg-white text-slate-900'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            {category}
            <span className={`ml-2 text-xs ${
              activeCategory === category ? 'text-slate-500' : 'text-slate-500'
            }`}>
              {category === 'All'
                ? videos.length
                : videos.filter(v => v.category === category).length}
            </span>
          </button>
        ))}
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((video, index) => (
          <VideoCard
            key={video.id}
            id={video.id}
            index={index}
            title={video.title}
            company={video.company}
            thumbnailUrl={video.thumbnailUrl}
            videoUrl={video.videoUrl}
          />
        ))}
      </div>

      {filteredVideos.length === 0 && (
        <div className="text-center py-24 text-slate-400">
          No videos found in this category.
        </div>
      )}
    </section>
  )
}
