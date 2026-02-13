import { useState, useMemo } from 'react'
import { companies, type CompanyLogo } from '../data/logowall'

type Mode = 'featured' | 'timeline'

function getTimelineColor(startYear: number): string {
  const minYear = 2006
  const maxYear = 2024
  const t = Math.min(1, Math.max(0, (startYear - minYear) / (maxYear - minYear)))

  const stops = [
    { r: 99, g: 102, b: 241 },   // #6366f1 blue-purple
    { r: 20, g: 184, b: 166 },   // #14b8a6 teal
    { r: 248, g: 168, b: 83 },   // #f8a853 amber
  ]

  let from, to, local: number
  if (t < 0.5) {
    from = stops[0]; to = stops[1]; local = t / 0.5
  } else {
    from = stops[1]; to = stops[2]; local = (t - 0.5) / 0.5
  }

  const r = Math.round(from.r + (to.r - from.r) * local)
  const g = Math.round(from.g + (to.g - from.g) * local)
  const b = Math.round(from.b + (to.b - from.b) * local)
  return `rgb(${r}, ${g}, ${b})`
}

/* ─── Featured Mode: Infinite Marquee ─── */

function LogoMarquee() {
  const [hovered, setHovered] = useState<CompanyLogo | null>(null)

  const sorted = useMemo(
    () => [...companies].sort((a, b) => a.narrativeOrder - b.narrativeOrder),
    [],
  )
  const doubled = [...sorted, ...sorted]

  return (
    <div>
      <div className="marquee-container relative overflow-hidden py-8">
        <div className="marquee-track flex items-center">
          {doubled.map((company, i) => (
            <div
              key={`${company.id}-${i}`}
              className="flex-shrink-0 px-5 md:px-8 cursor-pointer"
              onMouseEnter={() => setHovered(company)}
              onMouseLeave={() => setHovered(null)}
            >
              <div
                className={`w-20 h-20 md:w-24 md:h-24 flex items-center justify-center transition-all duration-300 ${
                  hovered
                    ? hovered.id === company.id
                      ? 'opacity-100 scale-110'
                      : 'opacity-20'
                    : 'opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={company.logoUrl}
                  alt={company.name}
                  className="max-w-full max-h-full object-contain"
                  loading="lazy"
                  draggable={false}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hover detail line */}
      <div
        className={`h-6 text-center transition-all duration-200 ${
          hovered ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {hovered && (
          <span className="text-sm">
            <span className="text-white/80 font-medium">{hovered.name}</span>
            <span className="text-white/20 mx-2.5">·</span>
            <span className="text-white/50">{hovered.period}</span>
            <span className="text-white/20 mx-2.5">·</span>
            <span className="text-white/40 inline-flex items-center gap-1">
              <svg className="w-2.5 h-2.5" viewBox="0 0 12 12" fill="currentColor">
                <path d="M6 0C3.8 0 2 1.8 2 4c0 3 4 7.5 4 7.5S10 7 10 4c0-2.2-1.8-4-4-4zm0 5.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" />
              </svg>
              {hovered.location}
            </span>
          </span>
        )}
      </div>
    </div>
  )
}

/* ─── Timeline Mode: Horizontal Journey ─── */

function TimelineJourney() {
  const sorted = useMemo(
    () => [...companies].sort((a, b) => b.startYear - a.startYear),
    [],
  )

  return (
    <div className="mt-4">
      <div className="text-[11px] text-white/25 mb-3 md:hidden flex items-center gap-1.5">
        <span>←</span> Scroll to explore <span>→</span>
      </div>

      <div className="timeline-scroll overflow-x-auto pb-3 -mx-2 px-2">
        <div className="relative flex min-w-max py-2">
          {/* Gradient line */}
          <div
            className="absolute left-6 right-6 h-px rounded-full pointer-events-none"
            style={{
              top: '76px',
              background: 'linear-gradient(to right, #f8a853, #14b8a6, #6366f1)',
              boxShadow: '0 0 8px rgba(248,168,83,0.3), 0 0 8px rgba(20,184,166,0.2), 0 0 8px rgba(99,102,241,0.3)',
            }}
          />

          {sorted.map((company) => {
            const dotColor = getTimelineColor(company.startYear)
            return (
              <div
                key={company.id}
                className="flex flex-col items-center w-[7.5rem] group"
              >
                {/* Logo */}
                <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center opacity-50 group-hover:opacity-100 transition-all duration-300">
                  <img
                    src={company.logoUrl}
                    alt={company.name}
                    className="max-w-full max-h-full object-contain"
                    loading="lazy"
                  />
                </div>

                {/* Connector line */}
                <div className="w-px h-2 bg-white/10 mt-1" />

                {/* Dot */}
                <div
                  className="w-2.5 h-2.5 rounded-full border-[1.5px] z-10 transition-all duration-200 group-hover:scale-[1.8] group-hover:shadow-lg mt-0.5"
                  style={{
                    borderColor: dotColor,
                    backgroundColor: 'rgb(2 6 23)',
                    boxShadow: `0 0 0 2px rgb(2 6 23)`,
                  }}
                />

                {/* Info */}
                <div className="mt-2.5 text-center">
                  <div className="text-[11px] text-white/50 font-medium leading-tight group-hover:text-white/80 transition-colors">
                    {company.name}
                  </div>
                  <div className="text-[10px] text-white/30 mt-0.5">{company.period}</div>
                  <div className="text-[10px] text-white/20 flex items-center justify-center gap-0.5 mt-0.5">
                    <svg className="w-2 h-2 shrink-0" viewBox="0 0 12 12" fill="currentColor">
                      <path d="M6 0C3.8 0 2 1.8 2 4c0 3 4 7.5 4 7.5S10 7 10 4c0-2.2-1.8-4-4-4zm0 5.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" />
                    </svg>
                    {company.location}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

/* ─── Main Component ─── */

export function LogoWall() {
  const [mode, setMode] = useState<Mode>('featured')

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-2">
        <div>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-white">
            Worked With
          </h3>
          <div className="flex items-center gap-2.5 mt-2">
            <span className="text-white/50 text-sm">
              <strong className="text-white/90 text-base font-semibold">15+</strong> Brands
            </span>
            <span className="text-white/15">·</span>
            <span className="text-white/50 text-sm">
              <strong className="text-white/90 text-base font-semibold">3</strong> Countries
            </span>
          </div>
        </div>

        <div className="flex gap-1 rounded-full border border-white/15 p-0.5 self-start sm:self-auto">
          <button
            onClick={() => setMode('featured')}
            className={`px-3 py-1 text-xs rounded-full transition-all duration-200 ${
              mode === 'featured'
                ? 'bg-[#f8a853] text-slate-900 font-medium'
                : 'text-white/50 hover:text-white/80'
            }`}
          >
            Featured
          </button>
          <button
            onClick={() => setMode('timeline')}
            className={`px-3 py-1 text-xs rounded-full transition-all duration-200 ${
              mode === 'timeline'
                ? 'bg-[#f8a853] text-slate-900 font-medium'
                : 'text-white/50 hover:text-white/80'
            }`}
          >
            Timeline
          </button>
        </div>
      </div>

      {/* Content with fade transition on mode switch */}
      <div key={mode} className="animate-fade-in">
        {mode === 'featured' ? <LogoMarquee /> : <TimelineJourney />}
      </div>
    </div>
  )
}
