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
          {/* About Title */}
          <h1 className="mb-6">
            <span className="block text-[clamp(3rem,10vw,7rem)] font-bold leading-[0.9] tracking-[-0.06em] text-white">
              About
            </span>
          </h1>

          {/* Title */}
          <p className="text-xl md:text-2xl text-white font-medium mb-6 max-w-xl">
            {title}
          </p>

          {/* Intro */}
          <p className="text-base md:text-lg text-slate-300 leading-relaxed max-w-xl mb-10">
            {intro}
          </p>

          {/* Stats Row - Single Row */}
          <div className="flex gap-8 md:gap-12">
            <div>
              <span className="block text-3xl md:text-4xl font-light text-white">
                15+
              </span>
              <span className="text-xs text-slate-400 uppercase tracking-wider">
                Years Experience
              </span>
            </div>
            <div>
              <span className="block text-3xl md:text-4xl font-light text-white">
                50+
              </span>
              <span className="text-xs text-slate-400 uppercase tracking-wider">
                Projects Delivered
              </span>
            </div>
            <div>
              <span className="block text-3xl md:text-4xl font-light text-white">
                25+
              </span>
              <span className="text-xs text-slate-400 uppercase tracking-wider">
                Clients Served
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
