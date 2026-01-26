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

const parseDate = (value: string) => {
  const [year, month, day] = value.split('/').map(Number)
  return new Date(year, month - 1, day).getTime()
}

const byDateDesc = (a: { date: string }, b: { date: string }) =>
  parseDate(b.date) - parseDate(a.date)

export function BrandContentPage() {
  const [activeTab, setActiveTab] = useState<TabId>('thought-leadership')

  const images = activeTab !== 'video-storytelling' && activeTab !== 'content-marketing'
    ? imageMap['brand-content'][activeTab as keyof typeof imageMap['brand-content']] || []
    : []

  const linkedInPosts = getAllPosts()

  const shapingHealthcarePosts = linkedInPosts
    .filter((post) => post.category === 'HEC')
    .sort(byDateDesc)
    .slice(0, 6)

  const scmKeywords = [
    'OP1 引領醫療配送',
    '領航智慧供應鏈',
    '瑞士商務',
    'SCM團隊守護健康',
    '團隊守護健康',
    '智慧物流啟動 創造物流新標竿',
  ]

  const normalize = (value: string) => value.replace(/\s/g, '')

  const scmPosts = scmKeywords
    .map((keyword) =>
      linkedInPosts.find((post) =>
        post.category === 'SCM' && normalize(post.title).includes(normalize(keyword))
      )
    )
    .filter((post): post is (typeof linkedInPosts)[number] => Boolean(post))
    .sort(byDateDesc)

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
        <div className="space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] gap-8 items-start">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">#ShapingHealthcare LinkedIn Campaign</h2>
              <p className="text-slate-300 leading-relaxed">
                Placeholder description for upcoming content strategy overview.
              </p>
              <div className="rounded-lg border border-slate-800 bg-slate-900/40 p-4">
                <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500 mb-2">
                  Placeholder
                </p>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Add campaign objectives, audience insights, and key takeaways here.
                </p>
              </div>
            </div>

            <div>
              <LinkedInPostList posts={shapingHealthcarePosts} />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] gap-8 items-start">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">#SCMRising Branding LinkedIn Campaign</h2>
              <p className="text-slate-300 leading-relaxed">
                Placeholder description for SCM brand storytelling and campaign highlights.
              </p>
              <div className="rounded-lg border border-slate-800 bg-slate-900/40 p-4">
                <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500 mb-2">
                  Placeholder
                </p>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Add campaign objectives, audience insights, and key takeaways here.
                </p>
              </div>
            </div>

            <div>
              <LinkedInPostList posts={scmPosts} />
            </div>
          </div>
        </div>
      ) : activeTab === 'video-storytelling' ? (
        <div className="space-y-12">
          {videosData.categories
            .filter((category) => category !== 'All')
            .map((category) => {
              const sectionVideos = videosData.videos.filter(
                (video) => video.category === category
              )

              if (sectionVideos.length === 0) return null

              return (
                <div key={category}>
                  <h2 className="text-xl md:text-2xl font-semibold text-white mb-6">
                    {category}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sectionVideos.map((video, index) => (
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
                </div>
              )
            })}
        </div>
      ) : activeTab === 'thought-leadership' ? (
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] gap-8 items-start">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">Thought Leadership</h2>
            <p className="text-slate-300 leading-relaxed">
              Placeholder summary for thought leadership content and key insights.
            </p>
            <div className="rounded-lg border border-slate-800 bg-slate-900/40 p-4">
              <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500 mb-2">
                Placeholder
              </p>
              <p className="text-sm text-slate-400 leading-relaxed">
                Add audience goals, themes, and content performance highlights here.
              </p>
            </div>
          </div>
          <div>
            <ImageCarousel images={images} alt={activeTab} />
          </div>
        </div>
      ) : (
        <ImageCarousel images={images} alt={activeTab} />
      )}
    </div>
  )
}
