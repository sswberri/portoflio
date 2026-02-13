import { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'

export function BackToTopButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed right-4 bottom-8 z-30 hidden md:flex items-center justify-center w-10 h-10 rounded-full border border-white/20 bg-slate-900/80 backdrop-blur text-white/60 hover:text-white hover:border-white/40 transition-all duration-200"
      aria-label="Back to top"
    >
      <ArrowUp className="w-4 h-4" />
    </button>
  )
}
