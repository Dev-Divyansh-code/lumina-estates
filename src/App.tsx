import { lazy, Suspense, useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { SmoothScroll } from './components/ui/SmoothScroll'
import { OfflineGate } from './components/ui/OfflineGate'
import { useStore } from './store/useStore'

// Landing page is eager — avoid extra round-trip on first paint
import Home from './pages/Home'
// Offline overlay + /offline routes (also used by OfflineGate)
import ConnectionError from './pages/ConnectionError'

// Secondary routes stay code-split
const Residences = lazy(() => import('./pages/Residences'))
const PropertyDetail = lazy(() => import('./pages/PropertyDetail'))
const About = lazy(() => import('./pages/About'))
const Journal = lazy(() => import('./pages/Journal'))
const NotFound = lazy(() => import('./pages/NotFound'))
const ContactModal = lazy(() =>
  import('./components/forms/ContactModal').then((m) => ({ default: m.ContactModal }))
)
const CustomCursor = lazy(() =>
  import('./components/ui/CustomCursor').then((m) => ({ default: m.CustomCursor }))
)

function PageLoader() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center" aria-hidden>
      <div className="w-6 h-6 border border-graphite/30 border-t-silver rounded-full animate-spin" />
    </div>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: { scrollTo: (y: number, opts?: object) => void } })
      .__lenis
    if (lenis) {
      lenis.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname])

  return null
}

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative"
      >
        <Suspense fallback={<PageLoader />}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/residences" element={<Residences />} />
            <Route path="/residences/:slug" element={<PropertyDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/offline" element={<ConnectionError kind="offline" />} />
            <Route path="/connection-error" element={<ConnectionError kind="failed" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  )
}

function DeferredChrome() {
  const isContactOpen = useStore((s) => s.isContactOpen)
  const [showCursor, setShowCursor] = useState(false)
  const [contactReady, setContactReady] = useState(false)

  // Cursor after first paint / idle — not on critical path
  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    if (!fine) return

    const enable = () => setShowCursor(true)
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number
      cancelIdleCallback?: (id: number) => void
    }
    if (typeof w.requestIdleCallback === 'function') {
      const id = w.requestIdleCallback(enable, { timeout: 1200 })
      return () => w.cancelIdleCallback?.(id)
    }
    const t = setTimeout(enable, 400)
    return () => clearTimeout(t)
  }, [])

  // Prefetch contact modal chunk once opened (or after idle)
  useEffect(() => {
    if (isContactOpen) {
      setContactReady(true)
      return
    }
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number
      cancelIdleCallback?: (id: number) => void
    }
    if (typeof w.requestIdleCallback === 'function') {
      const id = w.requestIdleCallback(() => setContactReady(true), { timeout: 2500 })
      return () => w.cancelIdleCallback?.(id)
    }
    const t = setTimeout(() => setContactReady(true), 1500)
    return () => clearTimeout(t)
  }, [isContactOpen])

  return (
    <>
      {showCursor && (
        <Suspense fallback={null}>
          <CustomCursor />
        </Suspense>
      )}
      {(contactReady || isContactOpen) && (
        <Suspense fallback={null}>
          <ContactModal />
        </Suspense>
      )}
    </>
  )
}

function ThemeSync() {
  const theme = useStore((s) => s.theme)

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('dark', 'light')
    root.classList.add(theme)
    root.style.colorScheme = theme
    // Browser chrome (mobile address bar)
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) {
      meta.setAttribute('content', theme === 'dark' ? '#0A0A0B' : '#E8EAEE')
    }
  }, [theme])

  return null
}

function AppShell() {
  return (
    <SmoothScroll>
      <ThemeSync />
      <ScrollToTop />
      <Navbar />
      <main className="relative min-h-screen">
        <AnimatedRoutes />
      </main>
      <Footer />
      <DeferredChrome />
    </SmoothScroll>
  )
}

export default function App() {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <OfflineGate>
        <AppShell />
      </OfflineGate>
    </BrowserRouter>
  )
}
