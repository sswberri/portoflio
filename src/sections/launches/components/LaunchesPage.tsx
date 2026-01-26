import { useState } from 'react'
import { ImageCarousel } from '@/components/ImageCarousel'
import { BackToTopButton } from '@/components/BackToTopButton'
import { ProjectShowcase } from '@/components/ProjectShowcase'
import { getProjectSectionsByCategory } from '@/data/projects'
import { Search } from 'lucide-react'

const tabs = [
  { id: 'go-to-market', label: 'Go-to-market' },
  { id: 'integrated-campaigns', label: 'Integrated Marketing' },
  { id: 'digital-commerce', label: 'Digital Commerce' },
] as const

type TabId = typeof tabs[number]['id']

export function LaunchesPage() {
  const [activeTab, setActiveTab] = useState<TabId>('go-to-market')

  const sections = getProjectSectionsByCategory(activeTab)

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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16 items-center">
        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Google Store International Expansion
          </h2>
          <p className="text-slate-300 leading-relaxed">
            <a
              href="https://store.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white underline underline-offset-4 hover:text-blue-300"
            >
              Google store
            </a>{' '}
            International expansion for "Made by Google" products and services,
            including site content strategy, project management, special promo
            launches, and retail rollout across 31 countries and 24 locales.
          </p>
        </div>
        <div className="flex justify-end">
          <div className="relative w-full max-w-4xl aspect-[4/3] bg-slate-800/30 rounded-none overflow-hidden">
            <img
              src="/images/launch_GTM_google.svg"
              alt="Google Store international expansion illustration"
              width={1600}
              height={1200}
              className="w-full h-full object-contain transition-opacity duration-500 ease-in-out"
            />
            <a
              href="/images/launch_GTM_google.svg"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-3 right-3 inline-flex items-center justify-center w-10 h-10 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
              aria-label="View full size image"
            >
              <Search className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {activeTab === 'go-to-market' && (
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            #weArethefuture Brand Launch
          </h2>
          <p className="text-slate-300 leading-relaxed mb-8">
            Google store International expansion for "Made by Google" products and services,
            including site content strategy, project management, special promo launches,
            and retail rollout across 31 countries and 24 locales.
          </p>
          <div className="flex justify-end">
            <div className="w-full max-w-4xl">
              <ImageCarousel
                images={[
                  '/images/launch_IMC_weare01.svg',
                  '/images/launch_IMC_weare02.svg',
                  '/images/launch_IMC_weare03.svg',
                ]}
                alt="weArethefuture brand launch"
                aspectClassName="aspect-[4/3]"
              />
            </div>
          </div>
        </div>
      )}

      {sections.map((section) => (
        <div key={section.id} className="mb-16">
          {section.title && (
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">
              {section.title}
            </h2>
          )}
          <ProjectShowcase projects={section.projects} />
        </div>
      ))}

      <BackToTopButton />
    </div>
  )
}
