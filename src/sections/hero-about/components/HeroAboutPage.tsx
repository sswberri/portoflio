import { HeroSection } from './HeroSection'
import { AboutSection } from './AboutSection'

interface Skill {
  id: string
  name: string
  description: string
}

interface HeroAboutPageProps {
  name: string
  title: string
  intro: string
  bio: string
  photoUrl?: string
  skills: Skill[]
}

export function HeroAboutPage({
  name,
  title,
  intro,
  bio,
  photoUrl,
  skills,
}: HeroAboutPageProps) {
  return (
    <div>
      <HeroSection
        name={name}
        title={title}
        intro={intro}
        photoUrl={photoUrl}
      />
      <AboutSection bio={bio} skills={skills} />
    </div>
  )
}
