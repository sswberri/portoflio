import { Sidebar } from './Sidebar'
import { MobileNav } from './MobileNav'

interface AppShellProps {
  children: React.ReactNode
  activeItemId?: string
  onNavigate?: (href: string) => void
}

export function AppShell({ children, activeItemId = 'home', onNavigate }: AppShellProps) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Desktop Sidebar */}
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64">
        <Sidebar activeItemId={activeItemId} onNavigate={onNavigate} />
      </div>

      {/* Mobile Navigation */}
      <MobileNav activeItemId={activeItemId} onNavigate={onNavigate} />

      {/* Main Content Area */}
      <main className="md:pl-64">
        {/* Mobile header spacing */}
        <div className="h-14 md:h-0" />

        {/* Content */}
        <div className="min-h-screen">
          {children}
        </div>
      </main>
    </div>
  )
}
