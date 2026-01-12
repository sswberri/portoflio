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
    <section className="py-20 lg:py-32">
      {/* Section Title - Editorial Style */}
      <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[0.95] tracking-tight text-slate-900 dark:text-white mb-16">
        My Experience
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        {/* Bio */}
        <div className="space-y-6">
          {paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Skills */}
        <div>
          <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-500 uppercase tracking-wider mb-8">
            Areas of Expertise
          </h3>
          <div className="space-y-6">
            {skills.map((skill, index) => (
              <div
                key={skill.id}
                className="group"
              >
                <div className="flex items-baseline gap-4 mb-2">
                  <span className="text-3xl md:text-4xl font-light text-slate-300 dark:text-slate-700">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h4 className="text-xl md:text-2xl font-semibold text-slate-900 dark:text-white">
                    {skill.name}
                  </h4>
                </div>
                <p className="text-slate-500 dark:text-slate-500 pl-12 md:pl-16">
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
