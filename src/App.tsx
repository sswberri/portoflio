import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { AppShell } from './shell/components/AppShell'
import { PasswordGate } from './components/PasswordGate'

// Section components
import { HeroSection } from './sections/hero-about/components/HeroSection'
import { AboutSection } from './sections/hero-about/components/AboutSection'
import { BrandContentPage } from './sections/brand-content/components/BrandContentPage'
import { LaunchesPage } from './sections/launches/components/LaunchesPage'
import { CorporatePage } from './sections/corporate/components/CorporatePage'
import { VideosSection } from './sections/videos/components/VideosSection'
import { ContactPage } from './sections/contact/components/ContactPage'

// Data
import heroAboutData from './data/hero-about.json'
import videosData from './data/videos.json'
import contactData from './data/contact.json'

function AboutPageWrapper() {
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

function BrandContentPageWrapper() {
  return (
    <div className="px-6 md:px-12 lg:px-16 max-w-6xl">
      <BrandContentPage />
    </div>
  )
}

function LaunchesPageWrapper() {
  return (
    <div className="px-6 md:px-12 lg:px-16 max-w-6xl">
      <LaunchesPage />
    </div>
  )
}

function CorporatePageWrapper() {
  return (
    <div className="px-6 md:px-12 lg:px-16 max-w-6xl">
      <CorporatePage />
    </div>
  )
}

function VideosPageWrapper() {
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
  '/': 'about',
  '/brand-content': 'brand-content',
  '/launches': 'launches',
  '/corporate': 'corporate',
  '/videos': 'videos',
  '/contact': 'contact',
}

function App() {
  const navigate = useNavigate()
  const location = useLocation()

  const activeItemId = routeToActiveId[location.pathname] || 'about'

  const handleNavigate = (href: string) => {
    navigate(href)
  }

  return (
    <div className="dark">
      <PasswordGate>
        <AppShell activeItemId={activeItemId} onNavigate={handleNavigate}>
          <Routes>
            <Route path="/" element={<AboutPageWrapper />} />
            <Route path="/brand-content" element={<BrandContentPageWrapper />} />
            <Route path="/launches" element={<LaunchesPageWrapper />} />
            <Route path="/corporate" element={<CorporatePageWrapper />} />
            <Route path="/videos" element={<VideosPageWrapper />} />
            <Route path="/contact" element={<ContactPageWrapper />} />
          </Routes>
        </AppShell>
      </PasswordGate>
    </div>
  )
}

export default App
