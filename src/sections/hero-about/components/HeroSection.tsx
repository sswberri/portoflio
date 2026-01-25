interface HeroSectionProps {
  name: string
  title: string
  intro: string
  photoUrl?: string
}

export function HeroSection({ name, title, intro, photoUrl }: HeroSectionProps) {
  return (
    <section className="min-h-[85vh] flex items-center">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 w-full">
        {/* Left: Text Content */}
        <div className="flex flex-col justify-center order-2 lg:order-1 py-8 lg:py-16">
          {/* Name Title - h3 style */}
          <h1 className="mb-4">
            <span className="block text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-white">
              {name}
            </span>
          </h1>

          {/* Title */}
          <p className="text-xl md:text-2xl text-white font-medium mb-6 max-w-xl">
            {title}
          </p>

          {/* Intro - Multi-paragraph */}
          <div className="space-y-4 max-w-xl mb-10">
            {intro.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-base md:text-lg text-slate-300 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Stats Row - 4 in one line */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <div>
              <span className="block text-2xl md:text-3xl font-light text-white">
                15+
              </span>
              <span className="text-xs text-slate-400 uppercase tracking-wider">
                Years Experience
              </span>
            </div>
            <div>
              <span className="block text-2xl md:text-3xl font-light text-white">
                4
              </span>
              <span className="text-xs text-slate-400 uppercase tracking-wider">
                Marketing Lead Roles
              </span>
            </div>
            <div>
              <span className="block text-2xl md:text-3xl font-light text-white">
                4
              </span>
              <span className="text-xs text-slate-400 uppercase tracking-wider">
                0→1 Marketing Functions
              </span>
            </div>
            <div>
              <span className="block text-2xl md:text-3xl font-light text-white">
                7
              </span>
              <span className="text-xs text-slate-400 uppercase tracking-wider">
                Awards Won
              </span>
            </div>
          </div>
        </div>

        {/* Right: Photo - Reduced Size */}
        <div className="order-1 lg:order-2 flex items-center justify-center lg:justify-end">
          <div className="relative w-full max-w-sm lg:max-w-md overflow-hidden group">
            {photoUrl ? (
              <img
                src={photoUrl}
                alt={name}
                className="w-full h-auto object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = `https://placehold.co/600x800/1e293b/ffffff?text=${encodeURIComponent(name.split(' ').map(n => n[0]).join(''))}`
                }}
              />
            ) : (
              <div className="w-full aspect-[3/4] bg-slate-800 flex items-center justify-center ">
                <span className="text-6xl font-bold text-slate-600">
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
