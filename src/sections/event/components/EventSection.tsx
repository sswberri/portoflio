import { useState, useMemo } from 'react'
import { CategoryFilter } from './CategoryFilter'
import { ProjectCard } from './ProjectCard'
import { ProjectDetail } from './ProjectDetail'

interface Category {
  id: string
  label: string
}

interface Project {
  id: string
  title: string
  category: string
  categoryLabel: string
  description: string
  featuredImage: string
  gallery: string[]
  client?: string
  year: number
}

interface EventSectionProps {
  categories: Category[]
  projects: Project[]
}

export function EventSection({ categories, projects }: EventSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)

  const filteredProjects = useMemo(() => {
    if (!activeCategory) return projects
    return projects.filter((project) => project.category === activeCategory)
  }, [projects, activeCategory])

  const selectedProject = useMemo(() => {
    if (!selectedProjectId) return null
    return projects.find((p) => p.id === selectedProjectId) || null
  }, [projects, selectedProjectId])

  if (selectedProject) {
    return (
      <ProjectDetail
        title={selectedProject.title}
        categoryLabel={selectedProject.categoryLabel}
        description={selectedProject.description}
        featuredImage={selectedProject.featuredImage}
        gallery={selectedProject.gallery}
        client={selectedProject.client}
        year={selectedProject.year}
        onBack={() => setSelectedProjectId(null)}
      />
    )
  }

  return (
    <section className="py-12 lg:py-20">
      {/* Section Title - Editorial Style */}
      <div className="mb-12 lg:mb-16">
        <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[0.95] tracking-tight text-slate-900 dark:text-white mb-6">
          Event Marketing
        </h1>
        <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl">
          Tradeshow, media gathering, and sustainability event projects that create memorable brand experiences.
        </p>
      </div>

      {/* Category Filter */}
      <div className="mb-12 lg:mb-16">
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
        {filteredProjects.map((project, index) => (
          <ProjectCard
            key={project.id}
            id={project.id}
            index={index}
            title={project.title}
            categoryLabel={project.categoryLabel}
            client={project.client}
            year={project.year}
            featuredImage={project.featuredImage}
            onClick={setSelectedProjectId}
          />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-24 text-slate-500 dark:text-slate-400">
          No projects found in this category.
        </div>
      )}
    </section>
  )
}
