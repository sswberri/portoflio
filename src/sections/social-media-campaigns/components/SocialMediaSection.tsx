import { useState, useMemo } from 'react'
import { ProjectCard } from './ProjectCard'
import { ProjectDetail } from './ProjectDetail'

interface Project {
  id: string
  title: string
  description: string
  featuredImage: string
  gallery: string[]
  client?: string
  year: number
  platform: string
}

interface SocialMediaSectionProps {
  projects: Project[]
}

export function SocialMediaSection({ projects }: SocialMediaSectionProps) {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)

  const selectedProject = useMemo(() => {
    if (!selectedProjectId) return null
    return projects.find((p) => p.id === selectedProjectId) || null
  }, [projects, selectedProjectId])

  if (selectedProject) {
    return (
      <ProjectDetail
        title={selectedProject.title}
        description={selectedProject.description}
        featuredImage={selectedProject.featuredImage}
        gallery={selectedProject.gallery}
        client={selectedProject.client}
        year={selectedProject.year}
        platform={selectedProject.platform}
        onBack={() => setSelectedProjectId(null)}
      />
    )
  }

  return (
    <section className="py-12 lg:py-20">
      {/* Section Title - Editorial Style */}
      <div className="mb-16 lg:mb-24">
        <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[0.95] tracking-tight text-slate-900 dark:text-white mb-6">
          Social Media
        </h1>
        <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl">
          LinkedIn marketing campaigns and content strategy that drive engagement and generate qualified leads.
        </p>
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            id={project.id}
            index={index}
            title={project.title}
            client={project.client}
            year={project.year}
            featuredImage={project.featuredImage}
            onClick={setSelectedProjectId}
          />
        ))}
      </div>

      {projects.length === 0 && (
        <div className="text-center py-24 text-slate-500 dark:text-slate-400">
          No projects found.
        </div>
      )}
    </section>
  )
}
