import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { AppShell } from './shell/components/AppShell'

// Section components
import { HeroSection } from './sections/hero-about/components/HeroSection'
import { AboutSection } from './sections/hero-about/components/AboutSection'
import { SocialMediaSection } from './sections/social-media-campaigns/components/SocialMediaSection'
import { EventSection } from './sections/event/components/EventSection'
import { IntegratedCampaignSection } from './sections/integrated-marketing-campaign/components/IntegratedCampaignSection'
import { VideosSection } from './sections/videos/components/VideosSection'
import { ContactPage } from './sections/contact/components/ContactPage'

// Data
import heroAboutData from './data/hero-about.json'
import socialMediaData from './data/social-media.json'
import eventData from './data/event.json'
import integratedCampaignData from './data/integrated-campaign.json'
import videosData from './data/videos.json'
import contactData from './data/contact.json'

function HomePage() {
  return (
    <div className="px-6 md:px-12 lg:px-16 max-w-6xl">
      <HeroSection
        name={heroAboutData.name}
        title={heroAboutData.title}
        intro={heroAboutData.intro}
        photoUrl={heroAboutData.photoUrl}
      />
      <AboutSection
        bio={heroAboutData.bio}
        skills={heroAboutData.skills}
      />
    </div>
  )
}

function SocialMediaPage() {
  return (
    <div className="px-6 md:px-12 lg:px-16 max-w-6xl">
      <SocialMediaSection projects={socialMediaData.projects} />
    </div>
  )
}

function EventPage() {
  return (
    <div className="px-6 md:px-12 lg:px-16 max-w-6xl">
      <EventSection
        categories={eventData.categories}
        projects={eventData.projects}
      />
    </div>
  )
}

function IntegratedPage() {
  return (
    <div className="px-6 md:px-12 lg:px-16 max-w-6xl">
      <IntegratedCampaignSection
        projects={integratedCampaignData.projects}
      />
    </div>
  )
}

function VideosPage() {
  return (
    <div className="px-6 md:px-12 lg:px-16 max-w-6xl">
      <VideosSection
        headline={videosData.headline}
        subheadline={videosData.subheadline}
        categories={videosData.categories}
        videos={videosData.videos}
      />
    </div>
  )
}

function ContactPageWrapper() {
  return (
    <div className="px-6 md:px-12 lg:px-16 max-w-6xl">
      <ContactPage
        headline={contactData.headline}
        subheadline={contactData.subheadline}
        email={contactData.email}
        linkedInUrl={contactData.linkedInUrl}
        linkedInHandle={contactData.linkedInHandle}
        resumeUrl={contactData.resumeUrl}
      />
    </div>
  )
}

// Map routes to activeItemId
const routeToActiveId: Record<string, string> = {
  '/': 'home',
  '/social-media': 'social-media',
  '/event': 'event',
  '/integrated': 'integrated',
  '/videos': 'videos',
  '/contact': 'contact',
}

function App() {
  const navigate = useNavigate()
  const location = useLocation()

  const activeItemId = routeToActiveId[location.pathname] || 'home'

  const handleNavigate = (href: string) => {
    navigate(href)
  }

  return (
    <div className="dark">
      <AppShell activeItemId={activeItemId} onNavigate={handleNavigate}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/social-media" element={<SocialMediaPage />} />
          <Route path="/event" element={<EventPage />} />
          <Route path="/integrated" element={<IntegratedPage />} />
          <Route path="/videos" element={<VideosPage />} />
          <Route path="/contact" element={<ContactPageWrapper />} />
        </Routes>
      </AppShell>
    </div>
  )
}

export default App
