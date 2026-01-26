export function BackToTopButton() {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="mt-16 flex justify-center">
      <button
        type="button"
        onClick={handleClick}
        className="inline-flex items-center justify-center px-6 py-2 border border-slate-500 text-slate-200 rounded-md hover:border-white hover:text-white transition-colors"
      >
        Back to Top
      </button>
    </div>
  )
}
