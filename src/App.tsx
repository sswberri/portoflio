import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { AppShell } from './shell/components/AppShell'
import { BackToTopButton } from './components/BackToTopButton'
import { PasswordGate } from './components/PasswordGate'

// Section components
import { HeroSection } from './sections/hero-about/components/HeroSection'
import { AboutSection } from './sections/hero-about/components/AboutSection'
import { BrandContentPage } from './sections/brand-content/components/BrandContentPage'
import { LaunchesPage } from './sections/launches/components/LaunchesPage'
import { CorporatePage } from './sections/corporate/components/CorporatePage'
// Data
import heroAboutData from './data/hero-about.json'

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
      <BackToTopButton />
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

// Map routes to activeItemId
const routeToActiveId: Record<string, string> = {
  '/': 'about',
  '/brand-content': 'brand-content',
  '/campaigns': 'campaigns',
  '/corporate': 'corporate',
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
          <div key={location.pathname} className="page-enter">
            <Routes location={location}>
              <Route path="/" element={<AboutPageWrapper />} />
              <Route path="/brand-content" element={<BrandContentPageWrapper />} />
              <Route path="/campaigns" element={<LaunchesPageWrapper />} />
              <Route path="/corporate" element={<CorporatePageWrapper />} />
            </Routes>
          </div>
        </AppShell>
      </PasswordGate>
    </div>
  )
}

export default App
