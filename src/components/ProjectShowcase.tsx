import { Search } from 'lucide-react'

export interface Project {
  id: string
  title: string
  description: string
  highlights: string[]
  imageUrl: string
  supplementary?: string
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
        <div
          key={project.id}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"
        >
          {/* Left: Text Content */}
          <div className="flex flex-col justify-center order-2 lg:order-1">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
              {project.title}
            </h2>

            <p className="text-base md:text-lg text-slate-300 leading-relaxed mb-6">
              {project.description}
            </p>

            {project.highlights.length > 0 && (
              <ul className="space-y-3">
                {project.highlights.map((highlight, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-white"
                  >
                    <span className="text-white mt-1.5">•</span>
                    <span className="text-sm md:text-base leading-relaxed">
                      {highlight}
                    </span>
                  </li>
                ))}
              </ul>
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
          <div className="order-1 lg:order-2 flex items-center justify-end">
            <div className="relative w-full aspect-[4/3] bg-slate-800/30 rounded-none overflow-hidden">
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
          </div>
        </div>
      ))}
    </div>
  )
}
