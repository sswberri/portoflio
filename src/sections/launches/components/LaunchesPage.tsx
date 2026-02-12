import { useState } from 'react'
import { ImageCarousel } from '@/components/ImageCarousel'
import { BackToTopButton } from '@/components/BackToTopButton'
import { ProjectShowcase } from '@/components/ProjectShowcase'
import { getProjectSectionsByCategory } from '@/data/projects'
import { Search } from 'lucide-react'

const tabs = [
  { id: 'go-to-market', label: 'Go-to-Market' },
  { id: 'integrated-campaigns', label: 'Integrated Marketing' },
  { id: 'digital-commerce', label: 'Digital Commerce' },
] as const

type TabId = typeof tabs[number]['id']

export function LaunchesPage() {
  const [activeTab, setActiveTab] = useState<TabId>('go-to-market')

  const sections = getProjectSectionsByCategory(activeTab)

  return (
    <div className="py-12 lg:py-20">
      {/* Section Title */}
      <div className="mb-16 lg:mb-24">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[0.95] tracking-tight text-white mb-6">
          Growth Campaigns
        </h1>
      </div>

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

      {activeTab === 'go-to-market' && (
        <div className="mb-16 lg:mb-24">
          <h2 className="text-2xl md:text-3xl font-bold text-white break-words mb-6 lg:hidden">
            Google Store International Expansion
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-8 lg:gap-[200px] items-start">
            <div className="space-y-4 order-1">
              <h2 className="text-2xl md:text-3xl font-bold text-white break-words hidden lg:block">
                Google Store International Expansion
              </h2>
            <p className="text-slate-300 leading-relaxed">
              Managed{' '}
              <a
                href="https://store.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4"
              >
                Google Store
              </a>{' '}
              site international expansion by orchestrating tiered site rollouts, PDPs,
              modular updates and applications, and special campaign pages across 31
              countries and 24 locales, including co-marketing launches such as Nest
              Mini × Disney Frozen 2 and 11.11 shopping campaigns.
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                'digital marketing',
                'program management',
                'stakeholder communications',
                'content management',
                'cross-functional collaborations',
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full px-4 py-1 text-sm font-medium text-black"
                  style={{ backgroundColor: '#a5dce3' }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          </div>
          <div className="flex justify-start order-2 lg:origin-top-left lg:translate-x-[40px] lg:translate-y-[20px]">
            <div className="relative w-full lg:w-[1075px] lg:h-[806px] aspect-[1075/806] bg-slate-800/30 rounded-none overflow-hidden">
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
      )}

      {activeTab === 'go-to-market' && (
        <div className="mb-16 lg:mb-24">
          <h2 className="text-2xl md:text-3xl font-bold text-white break-words mb-6 lg:hidden">
            #weArethefuture Brand Launch
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-8 lg:gap-[200px] items-start">
            <div className="space-y-4 order-1">
              <h2 className="text-2xl md:text-3xl font-bold text-white break-words hidden lg:block">
                #weArethefuture Brand Launch
              </h2>
            <p className="text-slate-300 leading-relaxed">
            Defined and led end-to-end launch marketing strategies for weArethefuture, a footwear brand for 21st century modern females, owning brand positioning and integrated campaigns while partnering with brand, creative, design, and content teams to drive awareness and influencer engagement across China and global markets.
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              'brand marketing',
              'go-to-market',
              '0→1 startup marketing',
              'digital & e-commerce',
            ].map((item) => (
              <span
                key={item}
                className="rounded-full px-4 py-1 text-sm font-medium text-black"
                style={{ backgroundColor: '#a5dce3' }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
        </div>
        <div className="flex justify-start order-2 lg:origin-top-left lg:translate-x-[40px] lg:translate-y-[20px]">
          <div className="w-full">
            <ImageCarousel
              images={[
                '/images/growth_GTM_weAre01.svg',
                '/images/growth_GTM_weAre02.svg',
                '/images/launch_IMC_weare03.svg',
              ]}
              alt="weArethefuture brand launch"
              aspectClassName="aspect-[1075/806]"
              containerClassName="rounded-none"
              wrapperClassName="w-full lg:w-[1075px] lg:h-[806px]"
            />
          </div>
        </div>
      </div>
      )}

      {sections.map((section) => (
        <div key={section.id} className="mb-16 lg:mb-24">
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
