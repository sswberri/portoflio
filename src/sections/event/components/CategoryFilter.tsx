interface Category {
  id: string
  label: string
}

interface CategoryFilterProps {
  categories: Category[]
  activeCategory: string | null
  onCategoryChange: (categoryId: string | null) => void
}

export function CategoryFilter({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={() => onCategoryChange(null)}
        className={`px-5 py-2.5 text-sm font-medium uppercase tracking-wider transition-colors ${
          activeCategory === null
            ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
            : 'bg-transparent text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white border border-slate-300 dark:border-slate-700'
        }`}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`px-5 py-2.5 text-sm font-medium uppercase tracking-wider transition-colors ${
            activeCategory === category.id
              ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
              : 'bg-transparent text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white border border-slate-300 dark:border-slate-700'
          }`}
        >
          {category.label}
        </button>
      ))}
    </div>
  )
}
