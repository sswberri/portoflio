import { useState } from 'react'
import { Sidebar } from './Sidebar'
import { MobileNav } from './MobileNav'

interface AppShellProps {
  children: React.ReactNode
  activeItemId?: string
  onNavigate?: (href: string) => void
}

export function AppShell({ children, activeItemId = 'home', onNavigate }: AppShellProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Desktop Sidebar */}
      <div className={`hidden md:fixed md:inset-y-0 md:flex ${sidebarCollapsed ? 'md:w-20' : 'md:w-64'} transition-all duration-300`}>
        <Sidebar
          activeItemId={activeItemId}
          onNavigate={onNavigate}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </div>

      {/* Mobile Navigation */}
      <MobileNav activeItemId={activeItemId} onNavigate={onNavigate} />

      {/* Main Content Area */}
      <main className={`${sidebarCollapsed ? 'md:pl-20' : 'md:pl-64'} transition-all duration-300`}>
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
