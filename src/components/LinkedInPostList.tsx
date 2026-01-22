import type { LinkedInPost } from '@/data/linkedinPosts'

interface LinkedInPostListProps {
  posts: LinkedInPost[]
}

export function LinkedInPostList({ posts }: LinkedInPostListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <a
          key={post.id}
          href={post.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group block bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700/50 hover:border-blue-500/50 hover:bg-slate-800 transition-all duration-300"
        >
          {/* Thumbnail */}
          <div className="relative aspect-[4/3] overflow-hidden bg-slate-900">
            <img
              src={post.thumbnail}
              alt={post.title}
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
            />
            {/* Category Badge Overlay */}
            <span
              className={`absolute top-3 left-3 px-2 py-1 text-xs font-medium rounded-full ${
                post.category === 'HEC'
                  ? 'bg-emerald-500/90 text-white'
                  : 'bg-blue-500/90 text-white'
              }`}
            >
              {post.category === 'HEC' ? '#ShapingHealthcare' : '#SCMRising'}
            </span>
            {/* LinkedIn Icon Overlay */}
            <div className="absolute bottom-3 right-3 w-8 h-8 bg-[#0A66C2] rounded-lg flex items-center justify-center opacity-90">
              <svg
                className="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            {/* Title */}
            <h3 className="text-white font-medium leading-snug group-hover:text-blue-400 transition-colors line-clamp-2 mb-2">
              {post.title}
            </h3>

            {/* Date */}
            <p className="text-slate-500 text-sm">{post.date}</p>
          </div>
        </a>
      ))}
    </div>
  )
}
