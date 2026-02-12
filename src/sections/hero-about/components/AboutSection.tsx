import { Link } from 'react-router-dom'
import { useScrollReveal } from '../../../hooks/useScrollReveal'

interface AboutSectionProps {
  bio: string
  skills: Array<{
    id: string
    name: string
    description: string
  }>
}

const expertiseAreas = [
  {
    title: 'Brand Strategy and Messaging',
    description: 'Define brand direction, core messaging frameworks, and thought leadership to clarify positioning and guide consistent storytelling across regions, industries, and channels.',
    link: '/brand-content',
    linkText: 'View Brand & Content'
  },
  {
    title: 'Integrated Marketing Campaigns',
    description: 'Plan and deliver multi-channel go-to-market and integrated campaigns, combining launches, co-marketing, events, and partner programs to support growth and commercial priorities.',
    link: '/campaigns',
    linkText: 'View Growth Campaigns'
  },
  {
    title: 'Strategic Communications',
    description: 'Lead media relations, executive communications, sustainability storytelling, and reputation programs that build trust, credibility, and long-term brand value in complex markets.',
    link: '/corporate',
    linkText: 'View Communications'
  },
  {
    title: 'Digital Marketing and E-Commerce',
    description: 'Design and optimize digital platforms, websites, and e-commerce experiences that support scalable execution, regional localization, and measurable engagement.',
    link: '/campaigns',
    linkText: 'View Digital Works'
  }
]

export function AboutSection({ }: AboutSectionProps) {
  const expertiseSection = useScrollReveal(0.1)
  const workedWith = useScrollReveal()

  return (
    <section className="pt-8 lg:pt-10 pb-6 lg:pb-10">
      {/* Expertise - animate as one block */}
      <div ref={expertiseSection.ref} className={`scroll-reveal ${expertiseSection.isVisible ? 'visible' : ''}`}>
        {/* Section Title - h3 style */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-white mb-8 lg:mb-10">
          Areas of Expertise
        </h2>

        {/* 4-Column Expertise Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12 lg:mb-16">
          {expertiseAreas.map((area) => (
            <div key={area.title} className="group flex flex-col">
              <h3 className="text-2xl font-semibold text-white mb-4 md:min-h-[4rem] lg:min-h-[6rem]">
                {area.title}
              </h3>
              <p className="text-white text-sm leading-relaxed mb-4">
                {area.description}
              </p>
              <Link
                to={area.link}
                className="mt-auto inline-flex items-center px-4 py-2 text-sm text-white border border-white/50 rounded hover:bg-white hover:text-slate-900 transition-all duration-200"
              >
                <span className="mr-2">→</span>
                {area.linkText}
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Worked With - animate as one block */}
      <div ref={workedWith.ref} className={`scroll-reveal ${workedWith.isVisible ? 'visible' : ''}`}>
        <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-white mb-0">
          Worked With
        </h3>
        <div className="overflow-hidden group cursor-pointer">
          <img
            src="/images/logo.svg"
            alt="Companies worked with"
            className="w-full h-auto max-w-4xl -mt-[6%] -mb-[10%] transition-transform duration-500 ease-out group-hover:scale-105"
            style={{ imageRendering: 'auto' }}
          />
        </div>
      </div>
    </section>
  )
}
