import { useState } from 'react'
import { ImageCarousel } from '@/components/ImageCarousel'
import { BackToTopButton } from '@/components/BackToTopButton'
import { imageMap } from '@/data/images'

const tabs = [
  { id: 'media-pr', label: 'Media & PR' },
  { id: 'sustainability-csr', label: 'Sustainability & CSR' },
  { id: 'reputation-issues', label: 'Reputation & Issues' },
] as const

type TabId = typeof tabs[number]['id']

export function CorporatePage() {
  const [activeTab, setActiveTab] = useState<TabId>('media-pr')

  const images = imageMap['corporate'][activeTab] || []

  return (
    <div className="py-12">
      {/* Section Title */}
      <h1 className="text-4xl font-bold text-white mb-8 tracking-tight">Corporate Communications</h1>

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

      {/* Image Carousel */}
      <ImageCarousel images={images} alt={activeTab} />

      <BackToTopButton />
    </div>
  )
}
