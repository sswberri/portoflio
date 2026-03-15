import { useState, useRef, useMemo } from 'react'
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react'
import { ImageCarousel } from '@/components/ImageCarousel'
import { LinkedInPostList } from '@/components/LinkedInPostList'
import { SectionIndicator, type SectionDef } from '@/components/SectionIndicator'
import { imageMap } from '@/data/images'
import { getCSRPosts } from '@/data/linkedinPosts'

const tabs = [
  { id: 'media-pr', label: 'Media & PR' },
  { id: 'sustainability-csr', label: 'Sustainability & CSR' },
  { id: 'reputation-issues', label: 'Awards' },
] as const

type TabId = typeof tabs[number]['id']

const impactHighlights = [
  { number: '3,000+', text: 'boxes of food and daily necessities donated to vulnerable communities' },
  { number: '6,000+', text: 'Christmas care packages delivered through the 1919 children support program' },
  { number: '12,000+', text: 'medical institutions supported through nationwide vaccine logistics' },
  { number: '6,800+', text: 'beneficiaries reached through rare disease support and health education' },
  { number: '12+', text: 'education initiatives reaching 300+ disadvantaged and elderly participants' },
  { number: '450+', text: 'blood donations collected to support Taiwan\u2019s healthcare system' },
]

const csrTags = [
  'ESG strategy', 'SDG alignment', 'positive local impact',
  'stakeholder engagement', 'NGO partnerships', 'corporate volunteering',
]

const awardsTags = [
  'corporate communications', 'award strategy', 'reputation management',
  'media outreach', 'stakeholder coordination', 'brand credibility',
]

const awardsList = [
  {
    category: 'Business Excellence',
    items: [
      { year: '2024', name: 'Golden Merchant Award, Outstanding Foreign Firms', url: 'https://www.dksh.com/tw-en/home/media/news/dksh-taiwan-wins-the-78th-annual-golden-merchant-awards-2024-for-outstanding-foreign-firms' },
      { year: '2023', name: 'Golden Peak Award, Outstanding Enterprises of the Year', url: 'https://www.linkedin.com/posts/dksh_dkshtaiwan-enrichingpeopleslives-goldenpeakaward-activity-7111137155002888193-JSRZ' },
    ],
  },
  {
    category: 'Sustainability',
    items: [
      { year: '2025', name: 'TSAA Taiwan Sustainability Action Award, Bronze \u2013 SDG 3', url: 'https://www.dksh.com/tw-en/home/media/news/dksh-taiwan-wins-bronze-at-the-taiwan-sustainability-action-awards-2025' },
      { year: '2024', name: 'ESG Sustainability and Logistics Award, Gold Excellence', url: 'https://www.dksh.com/tw-en/home/media/news/dksh-taiwan-wins-gold-at-the-esg-sustainability-and-logistics-award-2024' },
    ],
  },
  {
    category: 'Employer Branding',
    items: [
      { year: '2025', name: 'Certified as Great Place to Work\u00ae', url: 'https://www.dksh.com/tw-en/home/investors/investor-news/dksh-certified-as-great-place-to-work-in-15-key-markets' },
      { year: '2025', name: 'HR Asia Best Company to Work for in Asia Taiwan', url: 'https://www.dksh.com/tw-en/home/media/news/dksh-taiwan-wins-hr-asia-best-companies-to-work-for-in-asia-taiwan-2025-for-two-consecutive-years' },
      { year: '2024', name: 'HR Asia Best Company to Work for in Asia Taiwan', url: 'https://www.dksh.com/tw-en/home/media/news/dksh-taiwan-is-honored-with-hr-asia-best-companies-to-work-for-in-asia-taiwan-2024' },
      { year: '2024', name: 'Best Employer Branding Award from 104 Job Bank', url: 'https://www.linkedin.com/posts/dksh_dkshtaiwan-hxmkhpiwvjiumzbihd-bestemployerbranding-activity-7207298263123664896-vHGB' },
    ],
  },
]

export function CorporatePage() {
  const [activeTab, setActiveTab] = useState<TabId>('media-pr')
  const [showMoreCsr, setShowMoreCsr] = useState(false)
  const csrSectionRef = useRef<HTMLDivElement>(null)
  const csrMoreRef = useRef<HTMLDivElement>(null)

  const images = imageMap['corporate'][activeTab] || []

  const csrPosts = getCSRPosts()
  const csrFeatured = csrPosts.slice(0, 6)
  const csrMore = csrPosts.slice(6)

  const indicatorSections = useMemo<SectionDef[]>(() => {
    if (activeTab === 'sustainability-csr') {
      return [
        { id: 'csr-overview', label: 'Overview' },
        { id: 'csr-impact', label: 'Impact Highlights' },
        { id: 'csr-posts', label: 'LinkedIn Posts' },
      ]
    }
    if (activeTab === 'reputation-issues') {
      return [
        { id: 'awards-overview', label: 'Overview' },
        { id: 'awards-list', label: 'Awards Won' },
      ]
    }
    return []
  }, [activeTab])

  return (
    <div className="py-12 lg:py-20">
      {/* Section Title */}
      <div className="mb-16 lg:mb-24">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[0.95] tracking-tight text-white mb-6">
          Corporate Communications
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
      {activeTab === 'media-pr' ? (
        <ImageCarousel images={images} alt={activeTab} />
      ) : activeTab === 'sustainability-csr' ? (
        <div className="space-y-12 lg:space-y-16" ref={csrSectionRef}>
          {/* Hero: 2-column layout — text left, photo right */}
          <div id="csr-overview" className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div className="flex flex-col order-2 lg:order-1 space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
                Empowering Positive Local Impact
              </h2>
              <p className="text-base md:text-lg text-slate-300 leading-relaxed">
                Strategized and led DKSH Taiwan&rsquo;s Positive Local Impact initiatives, aligning with the Group&rsquo;s sustainability priorities and advancing programs connected to SDGs 2, 3, 4, and 10. Mobilized corporate volunteers and cross-business capabilities in logistics and healthcare to deliver 18 social inclusion initiatives (2022–2024), collaborating with 16+ nonprofit and community organizations to address hunger relief, public health, education access, and social inclusion across Taiwan.
              </p>
              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {csrTags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-sm rounded-full bg-slate-800 text-slate-300 border border-slate-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <ImageCarousel
                images={images}
                alt="sustainability-csr"
                aspectClassName="aspect-[4/3]"
                wrapperClassName="w-full"
              />
            </div>
          </div>

          {/* Impact Highlights — number cards grid */}
          <div id="csr-impact">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-6">Impact Highlights</h3>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {impactHighlights.map((item) => (
                <div
                  key={item.number}
                  className="rounded-xl bg-slate-800/50 border border-slate-700/50 p-5"
                >
                  <p className="text-2xl md:text-3xl font-bold text-white mb-2">{item.number}</p>
                  <p className="text-sm text-slate-400 leading-snug">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* LinkedIn Cards */}
          <div id="csr-posts">
            <LinkedInPostList posts={csrFeatured} />
            {csrMore.length > 0 && (
              <>
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                    showMoreCsr ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="mt-6" ref={csrMoreRef}>
                      <LinkedInPostList posts={csrMore} />
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex justify-center">
                  <button
                    type="button"
                    onClick={() => {
                      const wasOpen = showMoreCsr
                      setShowMoreCsr(!showMoreCsr)
                      if (wasOpen) {
                        setTimeout(() => csrSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 400)
                      } else {
                        setTimeout(() => csrMoreRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 400)
                      }
                    }}
                    className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {showMoreCsr ? (
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
      ) : activeTab === 'reputation-issues' ? (
        <div className="space-y-12">
          {/* Awards Header - 2 column layout */}
          <div id="awards-overview" className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div className="flex flex-col order-2 lg:order-1 space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
                Leadership in Excellence: Industry Recognition Program
              </h2>
              <p className="text-base md:text-lg text-slate-300 leading-relaxed">
                Drove strategic award participation to strengthen DKSH&rsquo;s external reputation and visibility, positioning the company as an outstanding foreign enterprise and responsible employer recognized for growth, people development, operational excellence, and sustainability leadership.
              </p>
              <p className="text-base text-slate-300 leading-relaxed">
                <span className="font-bold text-white">Scope of work:</span>{' '}
                Managed the full award lifecycle, including award scouting and evaluation, pitch strategy, submission development, association liaison, leadership alignment on award representation, media pitching, securing coverage, and post-award media release.
              </p>
              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {awardsTags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-sm rounded-full bg-slate-800 text-slate-300 border border-slate-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <ImageCarousel
                images={images}
                alt="awards"
                aspectClassName="aspect-[4/3]"
                wrapperClassName="w-full"
              />
            </div>
          </div>

          {/* Awards List */}
          <div id="awards-list">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-6">
              Awards Won, 2023–2025
            </h3>
            <div className="space-y-8">
              {awardsList.map((group) => (
                <div key={group.category}>
                  <h4 className="text-lg font-semibold text-white mb-3">{group.category}</h4>
                  <ul className="space-y-2 text-slate-300">
                    {group.items.map((award) => (
                      <li key={`${award.year}-${award.name}`} className="flex items-start gap-2">
                        <span className="text-slate-500 mt-0.5">•</span>
                        <a
                          href={award.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-start gap-1.5 hover:text-white transition-colors"
                        >
                          <span>
                            <span className="font-bold text-white">{award.year}</span>{' '}
                            {award.name}
                          </span>
                          <ExternalLink className="w-3.5 h-3.5 mt-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <ImageCarousel images={images} alt={activeTab} />
      )}

      <SectionIndicator sections={indicatorSections} />
    </div>
  )
}
