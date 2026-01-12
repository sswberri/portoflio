import { Home, Share2, Calendar, Layers, Video, Mail } from 'lucide-react'

interface NavItem {
  id: string
  label: string
  href: string
  icon: React.ReactNode
}

interface SidebarProps {
  activeItemId?: string
  onNavigate?: (href: string) => void
}

const navItems: NavItem[] = [
  { id: 'home', label: 'Profile', href: '/', icon: <Home className="w-5 h-5" /> },
  { id: 'social-media', label: 'Social Media', href: '/social-media', icon: <Share2 className="w-5 h-5" /> },
  { id: 'event', label: 'Event', href: '/event', icon: <Calendar className="w-5 h-5" /> },
  { id: 'integrated', label: 'Integrated', href: '/integrated', icon: <Layers className="w-5 h-5" /> },
  { id: 'videos', label: 'Videos', href: '/videos', icon: <Video className="w-5 h-5" /> },
  { id: 'contact', label: 'Contact', href: '/contact', icon: <Mail className="w-5 h-5" /> },
]

export function Sidebar({ activeItemId = 'home', onNavigate }: SidebarProps) {
  const handleClick = (href: string) => {
    if (onNavigate) {
      onNavigate(href)
    }
  }

  return (
    <aside className="w-64 h-screen bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col">
      <div className="p-6 border-b border-slate-200 dark:border-slate-800">
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">
          Portfolio
        </h1>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = item.id === activeItemId
            return (
              <li key={item.id}>
                <button
                  onClick={() => handleClick(item.href)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    isActive
                      ? 'bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <span className={isActive ? 'text-slate-900 dark:text-white' : ''}>
                    {item.icon}
                  </span>
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-slate-200 dark:border-slate-800">
        <p className="text-xs text-slate-500 dark:text-slate-500">
          © 2024 Portfolio
        </p>
      </div>
    </aside>
  )
}

export { navItems }
