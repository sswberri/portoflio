import { useState, useEffect } from 'react'

export interface Project {
  id: string
  title: string
  description: string
  highlights: string[]
  imageUrl: string
}

interface ProjectShowcaseProps {
  projects: Project[]
}

export function ProjectShowcase({ projects }: ProjectShowcaseProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [displayIndex, setDisplayIndex] = useState(0)

  // Reset index when projects change
  useEffect(() => {
    setCurrentIndex(0)
    setDisplayIndex(0)
    setIsTransitioning(false)
  }, [projects])

  const handleDotClick = (index: number) => {
    if (index === currentIndex || isTransitioning) return

    // Start fade out
    setIsTransitioning(true)

    // After fade out, change content and fade in
    setTimeout(() => {
      setDisplayIndex(index)
      setCurrentIndex(index)
      setTimeout(() => {
        setIsTransitioning(false)
      }, 50)
    }, 200)
  }

  if (projects.length === 0) {
    return (
      <div className="flex items-center justify-center h-96 bg-slate-800/50 rounded-xl border border-slate-700">
        <p className="text-slate-500">No projects available</p>
      </div>
    )
  }

  const currentProject = projects[displayIndex]

  return (
    <div className="flex flex-col">
      {/* Main Content: Left Text + Right Image */}
      <div
        className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 transition-opacity duration-200 ease-in-out ${
          isTransitioning ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {/* Left: Text Content */}
        <div className="flex flex-col justify-center order-2 lg:order-1">
          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
            {currentProject.title}
          </h2>

          {/* Description */}
          <p className="text-base md:text-lg text-slate-300 leading-relaxed mb-6">
            {currentProject.description}
          </p>

          {/* Highlights */}
          {currentProject.highlights.length > 0 && (
            <ul className="space-y-3">
              {currentProject.highlights.map((highlight, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-slate-400"
                >
                  <span className="text-white mt-1.5">•</span>
                  <span className="text-sm md:text-base leading-relaxed">
                    {highlight}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Right: Image */}
        <div className="order-1 lg:order-2 flex items-center justify-center">
          <div className="w-full aspect-[4/3] bg-slate-800/30 rounded-xl overflow-hidden">
            <img
              src={currentProject.imageUrl}
              alt={currentProject.title}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>

      {/* Dots Navigation */}
      {projects.length > 1 && (
        <div className="flex justify-center gap-3 mt-8">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? 'bg-white scale-125'
                  : 'bg-slate-600 hover:bg-slate-400 hover:scale-110'
              }`}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
