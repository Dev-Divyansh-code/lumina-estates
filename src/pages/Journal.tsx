import { motion } from 'framer-motion'

const posts = [
  {
    title: 'The Quiet Luxury of Restraint',
    excerpt: 'Why the most powerful architectural statements often involve knowing what to leave out.',
    date: 'June 2025',
    category: 'Philosophy',
  },
  {
    title: 'Material Honesty in Contemporary Residences',
    excerpt: 'A closer look at the stone, timber, and glass that define our current collection.',
    date: 'May 2025',
    category: 'Design',
  },
  {
    title: 'Living with the Landscape',
    excerpt: 'How the best homes establish a dialogue with their environment rather than dominating it.',
    date: 'April 2025',
    category: 'Architecture',
  },
]

export default function Journal() {
  return (
    <div className="frame-section frame-section--top">
      <div className="frame-panel page-shell">
        <div className="section-padding container-luxury">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl mb-10 sm:mb-14 md:mb-16"
          >
            <p className="label-premium mb-3 sm:mb-4">Journal</p>
            <h1 className="heading-hero font-serif tracking-tighter text-cream mb-4 sm:mb-6">
              Reflections
            </h1>
            <p className="text-cream/55 text-sm sm:text-base leading-relaxed">
              Occasional notes on architecture, place, and the art of living well.
            </p>
          </motion.div>

          <div className="space-y-0 border-t border-white/5">
            {posts.map((post, i) => (
              <motion.article
                key={post.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className="py-7 sm:py-10 border-b border-white/5 group cursor-pointer"
              >
                <div className="flex flex-col md:flex-row md:items-baseline gap-2 sm:gap-3 md:gap-8">
                  <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-cream/35 shrink-0 md:w-28">
                    {post.date}
                  </span>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-silver/80 mb-1.5 sm:mb-2 block">
                      {post.category}
                    </span>
                    <h2 className="font-serif text-lg sm:text-xl md:text-2xl text-cream group-hover:text-silver transition-colors mb-2">
                      {post.title}
                    </h2>
                    <p className="text-sm text-cream/50 max-w-xl leading-relaxed">{post.excerpt}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
