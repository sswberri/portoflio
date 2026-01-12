interface Skill {
  id: string
  name: string
  description: string
}

interface AboutSectionProps {
  bio: string
  skills: Skill[]
}

export function AboutSection({ bio, skills }: AboutSectionProps) {
  const paragraphs = bio.split('\n\n')

  return (
    <section className="pt-0 lg:pt-10 pb-20 lg:pb-32">
      {/* Section Title */}
      <h2 className="text-[clamp(3rem,10vw,7rem)] font-bold leading-[0.9] tracking-[-0.06em] text-white mb-6">
        Experiences
      </h2>

      {/* Companies Logo Wall */}
      <div className="mb-4 overflow-hidden group cursor-pointer">
        <img
          src="/images/logo.svg"
          alt="Companies worked with"
          className="w-full max-w-4xl -my-16 transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>

      {/* Bio + Skills Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        {/* Bio */}
        <div className="space-y-6">
          {paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="text-base md:text-lg text-slate-300 leading-relaxed"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Skills */}
        <div>
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-8">
            Areas of Expertise
          </h3>
          <div className="space-y-6">
            {skills.map((skill, index) => (
              <div
                key={skill.id}
                className="group"
              >
                <div className="flex items-baseline gap-4 mb-2">
                  <span className="text-3xl md:text-4xl font-light text-slate-700">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h4 className="text-xl md:text-2xl font-semibold text-white">
                    {skill.name}
                  </h4>
                </div>
                <p className="text-slate-500 pl-12 md:pl-16">
                  {skill.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
