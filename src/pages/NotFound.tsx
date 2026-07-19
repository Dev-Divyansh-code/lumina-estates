import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="frame-section frame-section--top min-h-screen">
      <div className="frame-panel min-h-[calc(100svh-var(--frame-pad)*2)] flex items-center justify-center section-padding py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-lg mx-auto"
        >
          <p className="font-serif text-7xl md:text-8xl text-cream/15 mb-3 tracking-tighter">
            404
          </p>
          <p className="label-premium justify-center mb-4">Not found</p>
          <h1 className="font-serif text-2xl md:text-3xl text-cream mb-4 tracking-tight">
            This residence does not exist
          </h1>
          <p className="text-cream/50 text-sm leading-relaxed mb-9 max-w-sm mx-auto">
            The page you requested is not in our collection. It may have been moved or never
            presented.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/"
              className="btn-primary tracking-wider uppercase inline-flex items-center gap-2"
            >
              <Home size={15} />
              Return home
            </Link>
            <Link
              to="/residences"
              className="btn-outline tracking-wider uppercase inline-flex items-center gap-2"
            >
              <ArrowLeft size={15} />
              View residences
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
