import { useState, useRef } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { ImageCarousel } from '@/components/ImageCarousel'
import { ImageLightbox } from '@/components/ImageLightbox'

export interface Project {
  id: string
  title: string
  description: string
  highlights: string[]
  imageUrl: string
  imageUrls?: string[]
  supplementary?: string
  tags?: string[]
  bullets?: string[]
  exposureLinks?: Array<{ label: string; url: string }>
}

interface ProjectShowcaseProps {
  projects: Project[]
}

function hasExtraContent(project: Project): boolean {
  return (
    (project.bullets != null && project.bullets.length > 0) ||
    (project.exposureLinks != null && project.exposureLinks.length > 0) ||
    project.supplementary != null
  )
}

export function ProjectShowcase({ projects }: ProjectShowcaseProps) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set())
  const [lightboxImages, setLightboxImages] = useState<string[] | null>(null)
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const expandedContentRefs = useRef<Record<string, HTMLDivElement | null>>({})

  if (projects.length === 0) {
    return (
      <div className="flex items-center justify-center h-96 bg-slate-800/50 rounded-xl border border-slate-700">
        <p className="text-slate-500">No projects available</p>
      </div>
    )
  }

  const toggleExpanded = (id: string) => {
    const isExpanded = expandedIds.has(id)
    setExpandedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })

    if (isExpanded) {
      // Collapsing → scroll back to section top after animation
      setTimeout(() => { // wait for grid-rows transition to finish
        sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 400)
    } else {
      // Expanding → scroll to expanded content after animation
      setTimeout(() => { // wait for grid-rows transition to finish
        expandedContentRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }, 400)
    }
  }

  return (
    <div className="flex flex-col gap-16 lg:gap-24">
      {projects.map((project) => {
        const expanded = expandedIds.has(project.id)
        const showToggle = hasExtraContent(project)

        return (
          <div key={project.id} id={project.id} ref={(el) => { sectionRefs.current[project.id] = el }}>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 leading-tight break-words lg:hidden">
              {project.title}
            </h2>

            {/* Two-column grid — stays balanced */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              {/* Left: Text Content */}
              <div className="flex flex-col order-2 lg:order-1 max-w-[900px]">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight max-w-[900px] break-words hidden lg:block">
                  {project.title}
                </h2>

                {/* Description with gradient fade when collapsed (B) */}
                <div className="relative mb-6">
                  <p
                    className={`text-base md:text-lg text-slate-300 leading-relaxed${
                      !expanded && showToggle ? ' line-clamp-3' : ''
                    }`}
                  >
                    {project.description}
                  </p>
                  {!expanded && showToggle && (
                    <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />
                  )}
                </div>

                {/* Highlights — visible when expanded */}
                {expanded && project.highlights.length > 0 && (
                  <ul className="space-y-3 mb-6">
                    {project.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-3 text-white">
                        <span className="text-white mt-1.5">•</span>
                        <span className="text-sm md:text-base leading-relaxed">
                          {highlight}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* View more / View less toggle */}
                {showToggle && (
                  <button
                    onClick={() => toggleExpanded(project.id)}
                    className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-white transition-colors self-start"
                  >
                    {expanded ? (
                      <>
                        View less <ChevronUp className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        View more <ChevronDown className="w-4 h-4" />
                      </>
                    )}
                  </button>
                )}

                {/* Tags — always visible */}
                {project.tags && project.tags.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-3">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full px-4 py-1 text-sm font-medium text-black"
                        style={{ backgroundColor: '#a5dce3' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Right: Image */}
              <div className="order-1 lg:order-2">
                {project.imageUrls && project.imageUrls.length > 1 ? (
                  <ImageCarousel
                    images={project.imageUrls}
                    alt={project.title}
                    aspectClassName="aspect-[4/3]"
                    containerClassName="rounded-none"
                    wrapperClassName="w-full"
                  />
                ) : (
                  <div
                    className="relative w-full aspect-[4/3] overflow-hidden cursor-pointer"
                    onClick={() => setLightboxImages([project.imageUrl])}
                  >
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Full-width expanded section below grid (A + B animation + C visual separation) */}
            {showToggle && (
              <div
                className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                  expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                }`}
              >
                <div className="overflow-hidden">
                  <div ref={(el) => { expandedContentRefs.current[project.id] = el }} className="mt-8 rounded-lg border border-slate-800 bg-slate-900/30 p-6 lg:p-8 space-y-6">
                    {project.bullets && project.bullets.length > 0 && (
                      <ul className="space-y-3 list-disc list-outside pl-5 text-slate-300 marker:text-white">
                        {project.bullets.map((bullet, index) => (
                          <li key={index} className="text-sm md:text-base leading-relaxed">
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    )}

                    {project.exposureLinks && project.exposureLinks.length > 0 && (
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500 mb-3">
                          Media Exposure
                        </p>
                        <div className="flex flex-wrap gap-3">
                          {project.exposureLinks.map((link) => (
                            <a
                              key={link.url}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm md:text-base underline underline-offset-4"
                            >
                              {link.label}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    {project.supplementary && (
                      <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-4">
                        <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500 mb-2">
                          Supplementary info
                        </p>
                        <p className="text-sm text-slate-400 leading-relaxed">
                          {project.supplementary}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )
      })}

      {lightboxImages && (
        <ImageLightbox
          images={lightboxImages}
          alt="Project image"
          onClose={() => setLightboxImages(null)}
        />
      )}
    </div>
  )
}
