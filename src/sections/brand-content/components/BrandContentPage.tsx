import { useState } from 'react'
import { ImageCarousel } from '@/components/ImageCarousel'
import { LinkedInPostList } from '@/components/LinkedInPostList'
import { VideoCard } from '@/sections/videos/components/VideoCard'
import { imageMap } from '@/data/images'
import { getAllPosts } from '@/data/linkedinPosts'
import videosData from '@/data/videos.json'

const tabs = [
  { id: 'thought-leadership', label: 'Thought Leadership' },
  { id: 'content-marketing', label: 'Content Marketing' },
  { id: 'brand-photography', label: 'Brand Photography' },
  { id: 'video-storytelling', label: 'Video & Storytelling' },
] as const

type TabId = typeof tabs[number]['id']

export function BrandContentPage() {
  const [activeTab, setActiveTab] = useState<TabId>('thought-leadership')

  const images = activeTab !== 'video-storytelling' && activeTab !== 'content-marketing'
    ? imageMap['brand-content'][activeTab as keyof typeof imageMap['brand-content']] || []
    : []
  const linkedInPosts = getAllPosts()

  return (
    <div className="py-12">
      {/* Section Title */}
      <h1 className="text-4xl font-bold text-white mb-8 tracking-tight">Brand & Content</h1>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-10 border-b border-slate-800 pb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-white text-slate-900'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === 'content-marketing' ? (
        <LinkedInPostList posts={linkedInPosts} />
      ) : activeTab === 'video-storytelling' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videosData.videos.map((video, index) => (
            <VideoCard
              key={video.id}
              id={video.id}
              index={index}
              title={video.title}
              company={video.company}
              category={video.category}
              thumbnailUrl={video.thumbnailUrl}
              videoUrl={video.videoUrl}
            />
          ))}
        </div>
      ) : (
        <ImageCarousel images={images} alt={activeTab} />
      )}
    </div>
  )
}
