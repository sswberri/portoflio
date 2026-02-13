import { useEffect, useState } from 'react'

export function useScrollSpy(sectionIds: string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    if (sectionIds.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )

    const elements: Element[] = []
    for (const id of sectionIds) {
      const el = document.getElementById(id)
      if (el) {
        observer.observe(el)
        elements.push(el)
      }
    }

    return () => observer.disconnect()
  }, [sectionIds.join(',')])

  return activeId
}
