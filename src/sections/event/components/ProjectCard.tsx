interface ProjectCardProps {
  id: string
  index: number
  title: string
  categoryLabel: string
  client?: string
  year: number
  featuredImage: string
  onClick: (id: string) => void
}

export function ProjectCard({
  id,
  index,
  title,
  categoryLabel,
  client,
  year,
  featuredImage,
  onClick,
}: ProjectCardProps) {
  return (
    <button
      onClick={() => onClick(id)}
      className="group text-left w-full"
    >
      {/* Image */}
      <div className="aspect-[4/3] overflow-hidden bg-slate-200 dark:bg-slate-800 mb-6">
        <img
          src={featuredImage}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = `https://placehold.co/800x600/1e293b/ffffff?text=${encodeURIComponent(title.split(' ').map(w => w[0]).join(''))}`
          }}
        />
      </div>

      {/* Content */}
      <div className="space-y-2">
        {/* Index Number */}
        <span className="text-4xl md:text-5xl font-light text-slate-300 dark:text-slate-700">
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* Category Tag */}
        <div>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            {categoryLabel}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl md:text-2xl font-semibold text-slate-900 dark:text-white group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors leading-tight">
          {title}
        </h3>

        {/* Meta */}
        <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-500">
          {client && <span>{client}</span>}
          {client && <span className="text-slate-300 dark:text-slate-700">•</span>}
          <span>{year}</span>
        </div>
      </div>
    </button>
  )
}
