import { motion } from 'framer-motion'
import { WifiOff, RefreshCw, Home } from 'lucide-react'
import { Link } from 'react-router-dom'

export type ConnectionErrorKind = 'offline' | 'failed'

interface ConnectionErrorProps {
  /** offline = no network; failed = load/request failed */
  kind?: ConnectionErrorKind
  /** Hide “Return home” when already covering the full app shell */
  standalone?: boolean
  onRetry?: () => void
}

/**
 * Designed connection / offline error — matches framed Lumina aesthetic.
 */
export default function ConnectionError({
  kind = 'offline',
  standalone = false,
  onRetry,
}: ConnectionErrorProps) {
  const isOffline = kind === 'offline'

  const title = isOffline ? 'Connection lost' : 'Unable to connect'
  const body = isOffline
    ? 'We cannot reach Lumina Estates right now. Check your network, then try again.'
    : 'The residence could not be reached. Please try again in a moment.'

  const retry = () => {
    if (onRetry) {
      onRetry()
      return
    }
    window.location.reload()
  }

  const content = (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full max-w-lg mx-auto text-center px-2"
    >
      <div
        className="mx-auto mb-7 flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]"
        aria-hidden
      >
        <WifiOff className="text-silver/80" size={26} strokeWidth={1.5} />
      </div>

      <p className="label-premium justify-center mb-4">
        {isOffline ? 'Offline' : 'Network'}
      </p>

      <h1 className="font-serif text-3xl sm:text-4xl md:text-[2.75rem] tracking-tight text-cream mb-4">
        {title}
      </h1>

      <p className="text-cream/55 text-sm sm:text-base leading-relaxed mb-9 max-w-md mx-auto">
        {body}
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          type="button"
          onClick={retry}
          className="btn-primary tracking-wider uppercase inline-flex items-center gap-2 min-w-[10.5rem]"
        >
          <RefreshCw size={15} strokeWidth={2.2} />
          Try again
        </button>

        {!standalone && (
          <Link
            to="/"
            className="btn-outline tracking-wider uppercase inline-flex items-center gap-2 min-w-[10.5rem]"
          >
            <Home size={15} strokeWidth={2} />
            Return home
          </Link>
        )}

        {standalone && (
          <a
            href="/"
            className="btn-outline tracking-wider uppercase inline-flex items-center gap-2 min-w-[10.5rem]"
          >
            <Home size={15} strokeWidth={2} />
            Return home
          </a>
        )}
      </div>

      <p className="mt-10 text-[10px] uppercase tracking-[0.22em] text-cream/30">
        Lumina Estates
      </p>
    </motion.div>
  )

  if (standalone) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0A0A0B] section-padding">
        <div className="absolute inset-0 pointer-events-none opacity-40" aria-hidden>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgb(61_65_73/0.55),transparent_55%)]" />
        </div>
        <div className="relative w-full max-w-xl frame-section !p-[var(--frame-pad)]">
          <div className="frame-panel section-padding py-14 sm:py-16 md:py-20">
            {content}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="frame-section frame-section--top min-h-[70vh]">
      <div className="frame-panel min-h-[calc(100svh-var(--frame-pad)*2-6rem)] flex items-center justify-center section-padding py-16 sm:py-20">
        {content}
      </div>
    </div>
  )
}
