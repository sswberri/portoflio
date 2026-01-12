import { ArrowLeft } from 'lucide-react'

interface ProjectDetailProps {
  title: string
  categoryLabel: string
  description: string
  featuredImage: string
  gallery: string[]
  client?: string
  year: number
  onBack: () => void
}

export function ProjectDetail({
  title,
  categoryLabel,
  description,
  featuredImage,
  gallery,
  client,
  year,
  onBack,
}: ProjectDetailProps) {
  const allImages = [featuredImage, ...gallery]

  return (
    <section className="py-12 lg:py-20">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="group inline-flex items-center gap-3 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors mb-12"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm uppercase tracking-wider">Back to projects</span>
      </button>

      {/* Header */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-16 lg:mb-24">
        {/* Left: Title & Meta */}
        <div>
          <span className="inline-block text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">
            {categoryLabel}
          </span>
          <h1 className="text-[clamp(2rem,5vw,4rem)] font-bold leading-[0.95] tracking-tight text-slate-900 dark:text-white mb-8">
            {title}
          </h1>
          <div className="flex flex-wrap gap-x-8 gap-y-4">
            {client && (
              <div>
                <span className="block text-sm text-slate-500 dark:text-slate-500 uppercase tracking-wider mb-1">
                  Client
                </span>
                <span className="text-lg font-medium text-slate-900 dark:text-white">
                  {client}
                </span>
              </div>
            )}
            <div>
              <span className="block text-sm text-slate-500 dark:text-slate-500 uppercase tracking-wider mb-1">
                Year
              </span>
              <span className="text-lg font-medium text-slate-900 dark:text-white">
                {year}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Description */}
        <div className="flex items-end">
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {/* Gallery */}
      <div className="space-y-6">
        {allImages.map((image, index) => (
          <div
            key={index}
            className="overflow-hidden bg-slate-200 dark:bg-slate-800"
          >
            <img
              src={image}
              alt={`${title} - Image ${index + 1}`}
              className="w-full h-auto object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = `https://placehold.co/1200x800/1e293b/ffffff?text=Image+${index + 1}`
              }}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
