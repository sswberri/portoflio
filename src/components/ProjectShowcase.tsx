import { Search } from 'lucide-react'
import { ImageCarousel } from '@/components/ImageCarousel'

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

export function ProjectShowcase({ projects }: ProjectShowcaseProps) {
  if (projects.length === 0) {
    return (
      <div className="flex items-center justify-center h-96 bg-slate-800/50 rounded-xl border border-slate-700">
        <p className="text-slate-500">No projects available</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-12">
      {projects.map((project) => (
        <div key={project.id}>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 leading-tight break-words lg:hidden">
            {project.title}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-8 lg:gap-[200px]">
            {/* Left: Text Content */}
            <div className="flex flex-col justify-center order-1 max-w-[900px]">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight max-w-[900px] break-words hidden lg:block">
                {project.title}
              </h2>

              <p className="text-base md:text-lg text-slate-300 leading-relaxed mb-6">
                {project.description}
              </p>

              {project.highlights.length > 0 && (
                <ul className="space-y-3">
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

              {project.bullets && project.bullets.length > 0 && (
                <ul className="mt-6 space-y-3 list-disc list-outside pl-5 text-slate-300 marker:text-white">
                  {project.bullets.map((bullet, index) => (
                    <li key={index} className="text-sm md:text-base leading-relaxed">
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}

              {project.exposureLinks && project.exposureLinks.length > 0 && (
                <ul className="mt-6 space-y-2 list-disc list-outside pl-5 text-slate-300 marker:text-white">
                  {project.exposureLinks.map((link) => (
                    <li key={link.url} className="text-sm md:text-base">
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-4"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}

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

              {project.supplementary && (
                <div className="mt-6 rounded-lg border border-slate-800 bg-slate-900/40 p-4">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500 mb-2">
                    Supplementary info
                  </p>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {project.supplementary}
                  </p>
                </div>
              )}
            </div>

            {/* Right: Image */}
            <div className="order-2 flex items-start justify-start pt-6 lg:scale-[0.6] lg:origin-top-left lg:translate-x-[40px] lg:translate-y-[20px]">
              {project.imageUrls && project.imageUrls.length > 1 ? (
                <div className="w-full">
                  <ImageCarousel
                    images={project.imageUrls}
                    alt={project.title}
                    aspectClassName="aspect-[1075/806]"
                    containerClassName="rounded-none"
                    alignClassName="items-center lg:items-end"
                    wrapperClassName="w-full lg:w-[1075px]"
                  />
                </div>
              ) : (
                <div className="relative w-full lg:w-[1075px] lg:h-[806px] aspect-[4/3] bg-slate-800/30 rounded-none overflow-hidden">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    width={1600}
                    height={1200}
                    className="w-full h-full object-contain"
                  />
                  {project.imageUrl.toLowerCase().endsWith('.svg') && (
                    <a
                      href={project.imageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute bottom-3 right-3 inline-flex items-center justify-center w-10 h-10 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
                      aria-label="View full size image"
                    >
                      <Search className="w-5 h-5" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
