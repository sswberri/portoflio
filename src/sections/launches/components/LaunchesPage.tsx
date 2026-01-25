import { useState } from 'react'
import { ImageCarousel } from '@/components/ImageCarousel'
import { ProjectShowcase } from '@/components/ProjectShowcase'
import { imageMap } from '@/data/images'
import { getProjectsByCategory } from '@/data/projects'

const tabs = [
  { id: 'go-to-market', label: 'Go-To-Market' },
  { id: 'integrated-campaigns', label: 'Integrated Marketing' },
  { id: 'digital-commerce', label: 'Digital Commerce' },
] as const

type TabId = typeof tabs[number]['id']

export function LaunchesPage() {
  const [activeTab, setActiveTab] = useState<TabId>('go-to-market')

  const images = imageMap['launches'][activeTab] || []
  const projects = getProjectsByCategory(activeTab)

  return (
    <div className="py-12">
      {/* Section Title */}
      <h1 className="text-4xl font-bold text-white mb-8 tracking-tight">Growth Campaigns</h1>

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

      {/* Project Showcase (if projects exist) */}
      {projects.length > 0 && (
        <div className="mb-16">
          <ProjectShowcase projects={projects} />
        </div>
      )}

      {/* Image Carousel (for additional images) */}
      {images.length > 0 && (
        <ImageCarousel images={images} alt={activeTab} />
      )}
    </div>
  )
}
