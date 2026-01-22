import { useState } from 'react'
import { ImageCarousel } from '@/components/ImageCarousel'
import { LinkedInPostList } from '@/components/LinkedInPostList'
import { imageMap } from '@/data/images'
import { getAllPosts } from '@/data/linkedinPosts'

const tabs = [
  { id: 'thought-leadership', label: 'Thought Leadership' },
  { id: 'content-marketing', label: 'Content Marketing' },
  { id: 'brand-photography', label: 'Brand Photography' },
] as const

type TabId = typeof tabs[number]['id']

export function BrandContentPage() {
  const [activeTab, setActiveTab] = useState<TabId>('thought-leadership')

  const images = imageMap['brand-content'][activeTab] || []
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
      ) : (
        <ImageCarousel images={images} alt={activeTab} />
      )}
    </div>
  )
}
