import { useState, useRef, useMemo } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { ImageCarousel } from '@/components/ImageCarousel'
import { SectionIndicator, type SectionDef } from '@/components/SectionIndicator'
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

const normalize = (value: string) => value.replace(/\s/g, '')

export function BrandContentPage() {
  const [activeTab, setActiveTab] = useState<TabId>('thought-leadership')
  const [showMoreShaping, setShowMoreShaping] = useState(false)
  const [showMoreScm, setShowMoreScm] = useState(false)
  const shapingSectionRef = useRef<HTMLDivElement>(null)
  const shapingMoreRef = useRef<HTMLDivElement>(null)
  const scmSectionRef = useRef<HTMLDivElement>(null)
  const scmMoreRef = useRef<HTMLDivElement>(null)

  const images = activeTab !== 'video-storytelling' && activeTab !== 'content-marketing'
    ? imageMap['brand-content'][activeTab as keyof typeof imageMap['brand-content']] || []
    : []

  const linkedInPosts = getAllPosts()

  const shapingHealthcareKeywords = [
    'CO啟動盛典',
    '攜手醫界',
    '台灣疤痕',
    '罕見眼疾治療迎突破',
    '賀！台灣大昌華嘉客服',
    '台灣永續行動銅獎',
  ]

  const shapingHealthcareFeatured = shapingHealthcareKeywords
    .map((keyword) =>
      linkedInPosts.find((post) =>
        post.category === 'HEC' && normalize(post.title).includes(normalize(keyword))
      )
    )
    .filter((post): post is (typeof linkedInPosts)[number] => Boolean(post))
    .sort(byDateDesc)

  const shapingHealthcareAll = linkedInPosts
    .filter((post) => post.category === 'HEC')
    .sort(byDateDesc)

  const shapingHealthcareMore = shapingHealthcareAll.filter(
    (post) => !shapingHealthcareFeatured.some((featured) => featured.id === post.id)
  )

  const scmKeywords = [
    'OP1 引領醫療配送',
    '領航智慧供應鏈',
    '瑞士商務',
    'SCM團隊守護健康',
    '智慧物流啟動 創造物流新標竿',
    '綠能驅動',
  ]

  const scmKeywordPosts = scmKeywords
    .map((keyword) =>
      linkedInPosts.find((post) =>
        post.category === 'SCM' && normalize(post.title).includes(normalize(keyword))
      )
    )
    .filter((post): post is (typeof linkedInPosts)[number] => Boolean(post))
    .sort(byDateDesc)

  const scmAll = linkedInPosts
    .filter((post) => post.category === 'SCM')
    .sort(byDateDesc)

  const scmMore = scmAll.filter(
    (post) => !scmKeywordPosts.some((featured) => featured.id === post.id)
  )

  const videoCategories = videosData.categories.filter((c) => c !== 'All')

  const indicatorSections = useMemo<SectionDef[]>(() => {
    if (activeTab === 'content-marketing') {
      return [
        { id: 'shaping-healthcare', label: '#ShapingHealthcare' },
        { id: 'scm-rising', label: '#SCMRising' },
      ]
    }
    if (activeTab === 'video-storytelling') {
      return videoCategories
        .filter((cat) => videosData.videos.some((v) => v.category === cat))
        .map((cat) => ({
          id: cat.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          label: cat,
        }))
    }
    return []
  }, [activeTab])

  return (
    <div className="py-12 lg:py-20">
      {/* Section Title */}
      <div className="mb-16 lg:mb-24">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[0.95] tracking-tight text-white mb-6">
          Brand & Content
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

      {/* Content */}
      {activeTab === 'content-marketing' ? (
        <div className="space-y-16 lg:space-y-24">
          {/* #ShapingHealthcare */}
          <div id="shaping-healthcare" ref={shapingSectionRef}>
            <h2 className="text-xl md:text-2xl font-semibold text-white mb-6">
              #ShapingHealthcare LinkedIn Campaign
            </h2>
            <LinkedInPostList posts={shapingHealthcareFeatured} />
            {shapingHealthcareMore.length > 0 && (
              <>
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                    showMoreShaping ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="mt-6" ref={shapingMoreRef}>
                      <LinkedInPostList posts={shapingHealthcareMore} />
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex justify-center">
                  <button
                    type="button"
                    onClick={() => {
                      const wasOpen = showMoreShaping
                      setShowMoreShaping(!showMoreShaping)
                      if (wasOpen) {
                        setTimeout(() => shapingSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 400)
                      } else {
                        setTimeout(() => shapingMoreRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 400)
                      }
                    }}
                    className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {showMoreShaping ? (
                      <>View less <ChevronUp className="w-4 h-4" /></>
                    ) : (
                      <>View more <ChevronDown className="w-4 h-4" /></>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>

          {/* #SCMRising */}
          <div id="scm-rising" ref={scmSectionRef}>
            <h2 className="text-xl md:text-2xl font-semibold text-white mb-6">
              #SCMRising Branding LinkedIn Campaign
            </h2>
            <LinkedInPostList posts={scmKeywordPosts} />
            {scmMore.length > 0 && (
              <>
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                    showMoreScm ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="mt-6" ref={scmMoreRef}>
                      <LinkedInPostList posts={scmMore} />
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex justify-center">
                  <button
                    type="button"
                    onClick={() => {
                      const wasOpen = showMoreScm
                      setShowMoreScm(!showMoreScm)
                      if (wasOpen) {
                        setTimeout(() => scmSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 400)
                      } else {
                        setTimeout(() => scmMoreRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 400)
                      }
                    }}
                    className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {showMoreScm ? (
                      <>View less <ChevronUp className="w-4 h-4" /></>
                    ) : (
                      <>View more <ChevronDown className="w-4 h-4" /></>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      ) : activeTab === 'brand-photography' ? (
        <ImageCarousel images={images} alt={activeTab} />
      ) : activeTab === 'video-storytelling' ? (
        <div className="space-y-12">
          {videosData.categories
            .filter((category) => category !== 'All')
            .map((category) => {
              const sectionVideos = videosData.videos.filter(
                (video) => video.category === category
              )

              if (sectionVideos.length === 0) return null

              const categoryId = category.toLowerCase().replace(/[^a-z0-9]+/g, '-')

              return (
                <div key={category} id={categoryId}>
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
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 leading-tight lg:hidden">
            DKSH Thought Leadership
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div className="flex flex-col order-2 lg:order-1 space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight hidden lg:block">
                DKSH Thought Leadership
              </h2>
              <p className="text-base md:text-lg text-slate-300 leading-relaxed">
                Bilingual expert-driven content that translates insights and success stories into credible narratives, strengthening trust, visibility, and partner confidence across priority audiences.
              </p>
              <p className="text-slate-300">View work:</p>
              <ul className="space-y-3 text-slate-300 list-disc list-outside pl-5 marker:text-white">
                <li>
                  <a
                    href="https://www.dksh.com/tw-en/home/insights/global-brands-local-impact-dksh-deepens-engagement-with-consumers"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 hover:text-white"
                  >
                    Global Brands, Local Impact: DKSH Deepens Engagement with Consumers
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.dksh.com/tw-en/home/insights/dksh-taiwan-supply-chain-management-s-transformation-to-a-growth-enabler"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 hover:text-white"
                  >
                    DKSH Taiwan Supply Chain Management's Transformation to a Growth Enabler
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.dksh.com/tw-en/home/insights/trailblazing-transitions-of-dksh-taiwan-finance"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 hover:text-white"
                  >
                    Trailblazing Transitions of DKSH Taiwan Finance
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.dksh.com/tw-en/home/insights/enriching-everyday-moments-with-smarter-healthier-snacking"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 hover:text-white"
                  >
                    Enriching Everyday Moments with Smarter, Healthier Snacking
                  </a>
                </li>
              </ul>
            </div>
            <div className="order-1 lg:order-2">
              <ImageCarousel
                images={images}
                alt={activeTab}
                aspectClassName="aspect-[4/3]"
                wrapperClassName="w-full"
              />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <ImageCarousel
            images={images}
            alt={activeTab}
            aspectClassName="aspect-[4/3]"
            wrapperClassName="w-full"
          />
        </div>
      )}

      <SectionIndicator sections={indicatorSections} />
    </div>
  )
}
