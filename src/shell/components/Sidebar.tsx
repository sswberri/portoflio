import { useState, lazy, Suspense } from 'react'
import { User, Megaphone, Rocket, Building2, Mail, Linkedin, FileText, ChevronLeft, ChevronRight } from 'lucide-react'

const ResumeViewer = lazy(() => import('@/components/ResumeViewer').then(m => ({ default: m.ResumeViewer })))

interface NavItem {
  id: string
  label: string
  href: string
  icon: React.ReactNode
}

interface SidebarProps {
  activeItemId?: string
  onNavigate?: (href: string) => void
  collapsed?: boolean
  onToggleCollapse?: () => void
}

const navItems: NavItem[] = [
  { id: 'about', label: 'About', href: '/', icon: <User className="w-5 h-5" /> },
  { id: 'brand-content', label: 'Brand & Content', href: '/brand-content', icon: <Megaphone className="w-5 h-5" /> },
  { id: 'campaigns', label: 'Growth Campaigns', href: '/campaigns', icon: <Rocket className="w-5 h-5" /> },
  { id: 'corporate', label: 'Corporate Communications', href: '/corporate', icon: <Building2 className="w-5 h-5" /> },
]

export function Sidebar({ activeItemId = 'about', onNavigate, collapsed = false, onToggleCollapse }: SidebarProps) {
  const [resumeOpen, setResumeOpen] = useState(false)

  const handleClick = (href: string) => {
    if (onNavigate) {
      onNavigate(href)
    }
  }

  return (
    <>
      <aside className={`${collapsed ? 'w-20' : 'w-64'} h-screen bg-slate-900 border-r border-slate-800 flex flex-col transition-all duration-300`}>
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          {!collapsed && (
            <h1 className="text-xl font-bold text-white">
              Portfolio
            </h1>
          )}
          <button
            onClick={onToggleCollapse}
            className={`p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ${collapsed ? 'mx-auto' : ''}`}
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = item.id === activeItemId
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleClick(item.href)}
                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-colors ${
                      isActive
                        ? 'bg-slate-800 text-white'
                        : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                    } ${collapsed ? 'justify-center' : ''}`}
                    title={collapsed ? item.label : undefined}
                  >
                    <span className={isActive ? 'text-white' : ''}>
                      {item.icon}
                    </span>
                    {!collapsed && <span className="font-medium">{item.label}</span>}
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Contact Icons + Footer */}
        <div className="p-4 border-t border-slate-800">
          <div className={`flex items-center ${collapsed ? 'flex-col gap-3' : 'gap-3'} mb-3`}>
            <a
              href="mailto:sswei@live.com"
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/weisharon/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <button
              onClick={() => setResumeOpen(true)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Resume"
            >
              <FileText className="w-4 h-4" />
            </button>
          </div>
          {!collapsed && (
            <p className="text-xs text-slate-500">
              © 2026 Sharon Wei. All rights reserved.
            </p>
          )}
        </div>
      </aside>

      {resumeOpen && (
        <Suspense fallback={null}>
          <ResumeViewer open={resumeOpen} onClose={() => setResumeOpen(false)} />
        </Suspense>
      )}
    </>
  )
}

export { navItems }
