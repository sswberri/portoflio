import { useState, useMemo } from 'react'
import { useScrollSpy } from '../hooks/useScrollSpy'

export interface SectionDef {
  id: string
  label: string
}

interface SectionIndicatorProps {
  sections: SectionDef[]
}

export function SectionIndicator({ sections }: SectionIndicatorProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const sectionIds = useMemo(() => sections.map((s) => s.id), [sections])
  const activeId = useScrollSpy(sectionIds)

  if (sections.length === 0) return null

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col items-end gap-3">
      {sections.map((section) => {
        const isActive = activeId === section.id
        const isHovered = hoveredId === section.id

        return (
          <button
            key={section.id}
            onClick={() => {
              document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' })
            }}
            onMouseEnter={() => setHoveredId(section.id)}
            onMouseLeave={() => setHoveredId(null)}
            className="group flex items-center gap-2 cursor-pointer"
            aria-label={`Scroll to ${section.label}`}
          >
            {/* Tooltip label */}
            <span
              className={`text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
              } ${isActive ? 'text-[#f8a853]' : 'text-white/60'}`}
            >
              {section.label}
            </span>

            {/* Indicator line */}
            <span
              className={`block h-[2px] rounded-full transition-all duration-300 ${
                isActive
                  ? 'w-8 bg-[#f8a853]'
                  : 'w-5 bg-white/20 group-hover:bg-white/40'
              }`}
            />
          </button>
        )
      })}
    </div>
  )
}
