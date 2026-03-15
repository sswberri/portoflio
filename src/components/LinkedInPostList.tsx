import type { LinkedInPost } from '@/data/linkedinPosts'
import { SpotlightCard } from './SpotlightCard'
import { ScrollReveal } from './ScrollReveal'

interface LinkedInPostListProps {
  posts: LinkedInPost[]
}

export function LinkedInPostList({ posts }: LinkedInPostListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post, index) => (
        <ScrollReveal key={post.id} delay={index * 0.08}>
          <SpotlightCard
            as="a"
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block bg-slate-800/50 rounded-xl border border-slate-700/50 hover:border-blue-500/50 hover:bg-slate-800 transition-all duration-300"
          >
            {/* Thumbnail */}
            <div className="relative aspect-[4/3] overflow-hidden bg-slate-900 rounded-t-xl">
              <img
                src={post.thumbnail}
                alt={post.title}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="text-white font-medium leading-snug group-hover:text-blue-400 transition-colors line-clamp-2">
                {post.title}
              </h3>
            </div>
          </SpotlightCard>
        </ScrollReveal>
      ))}
    </div>
  )
}
