interface HeroSectionProps {
  name: string
  title: string
  intro: string
  photoUrl?: string
}

export function HeroSection({ name, title, intro, photoUrl }: HeroSectionProps) {
  return (
    <section className="min-h-[85vh] flex items-center">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0 w-full">
        {/* Left: Text Content */}
        <div className="flex flex-col justify-center order-2 lg:order-1 py-8 lg:py-16 lg:pr-12">
          {/* Profile Title */}
          <h1 className="mb-6">
            <span className="block text-[clamp(3rem,10vw,7rem)] font-bold leading-[0.9] tracking-tight text-slate-900 dark:text-white">
              Profile
            </span>
          </h1>

          {/* Title */}
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 font-medium mb-8 max-w-xl">
            {title}
          </p>

          {/* Intro */}
          <p className="text-base md:text-lg text-slate-500 dark:text-slate-500 leading-relaxed max-w-xl mb-12">
            {intro}
          </p>

          {/* Stats Row */}
          <div className="flex flex-wrap gap-x-12 gap-y-6">
            <div>
              <span className="block text-4xl md:text-5xl font-light text-slate-900 dark:text-white">
                10+
              </span>
              <span className="text-sm text-slate-500 dark:text-slate-500 uppercase tracking-wider">
                Years Experience
              </span>
            </div>
            <div>
              <span className="block text-4xl md:text-5xl font-light text-slate-900 dark:text-white">
                50+
              </span>
              <span className="text-sm text-slate-500 dark:text-slate-500 uppercase tracking-wider">
                Projects Delivered
              </span>
            </div>
            <div>
              <span className="block text-4xl md:text-5xl font-light text-slate-900 dark:text-white">
                25+
              </span>
              <span className="text-sm text-slate-500 dark:text-slate-500 uppercase tracking-wider">
                Clients Served
              </span>
            </div>
          </div>
        </div>

        {/* Right: Photo */}
        <div className="order-1 lg:order-2 flex items-center justify-center lg:justify-end">
          <div className="relative w-full max-w-md lg:max-w-none lg:h-[80vh]">
            {photoUrl ? (
              <img
                src={photoUrl}
                alt={name}
                className="w-full h-full object-cover lg:absolute lg:inset-0"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = `https://placehold.co/600x800/1e293b/ffffff?text=${encodeURIComponent(name.split(' ').map(n => n[0]).join(''))}`
                }}
              />
            ) : (
              <div className="w-full aspect-[3/4] lg:aspect-auto lg:h-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                <span className="text-6xl font-bold text-slate-400 dark:text-slate-600">
                  {name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
