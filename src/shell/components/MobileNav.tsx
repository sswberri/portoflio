import { useState, lazy, Suspense } from 'react'
import { Menu, X, User, Megaphone, Rocket, Building2, Mail, Linkedin, FileText } from 'lucide-react'

const ResumeViewer = lazy(() => import('@/components/ResumeViewer').then(m => ({ default: m.ResumeViewer })))

interface NavItem {
  id: string
  label: string
  href: string
  icon: React.ReactNode
}

interface MobileNavProps {
  activeItemId?: string
  onNavigate?: (href: string) => void
}

const navItems: NavItem[] = [
  { id: 'about', label: 'About', href: '/', icon: <User className="w-5 h-5" /> },
  { id: 'brand-content', label: 'Brand & Content', href: '/brand-content', icon: <Megaphone className="w-5 h-5" /> },
  { id: 'campaigns', label: 'Growth Campaigns', href: '/campaigns', icon: <Rocket className="w-5 h-5" /> },
  { id: 'corporate', label: 'Corporate Communications', href: '/corporate', icon: <Building2 className="w-5 h-5" /> },
]

export function MobileNav({ activeItemId = 'about', onNavigate }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [resumeOpen, setResumeOpen] = useState(false)

  const handleClick = (href: string) => {
    if (onNavigate) {
      onNavigate(href)
    }
    setIsOpen(false)
  }

  return (
    <>
      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-40 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between px-4 py-3">
          <h1 className="text-lg font-bold text-slate-900 dark:text-white">
            Portfolio
          </h1>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-30 bg-white dark:bg-slate-900 pt-16">
          <nav className="p-4">
            <ul className="space-y-2">
              {navItems.map((item) => {
                const isActive = item.id === activeItemId
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => handleClick(item.href)}
                      className={`w-full flex items-center gap-3 px-4 py-4 rounded-lg text-left transition-colors ${
                        isActive
                          ? 'bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                      }`}
                    >
                      <span className={isActive ? 'text-slate-900 dark:text-white' : ''}>
                        {item.icon}
                      </span>
                      <span className="text-lg font-medium">{item.label}</span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Contact Icons */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-center gap-6 mb-3">
              <a
                href="mailto:sswei@live.com"
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                title="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/weisharon/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <button
                onClick={() => {
                  setResumeOpen(true)
                  setIsOpen(false)
                }}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                title="Resume"
              >
                <FileText className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-500 text-center">
              © 2026 Portfolio
            </p>
          </div>
        </div>
      )}

      {resumeOpen && (
        <Suspense fallback={null}>
          <ResumeViewer open={resumeOpen} onClose={() => setResumeOpen(false)} />
        </Suspense>
      )}
    </>
  )
}
