import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Compass, KeyRound, Shield, Sparkles } from 'lucide-react'
import { HeroShowcase } from '../components/ui/HeroShowcase'
import { Reveal } from '../components/ui/Reveal'
import { getFeaturedProperties, properties } from '../lib/properties'
import { useStore } from '../store/useStore'
import { prefersReducedMotion } from '../lib/utils'
import { HoverMosaic } from '../components/ui/hover-mosaic'
import { ImageAccordion } from '../components/ui/image-accordion'

const PROCESS = [
  {
    step: '01',
    title: 'Private brief',
    text: 'We begin with a confidential conversation about lifestyle, architecture, and the places that matter to you.',
  },
  {
    step: '02',
    title: 'Curated shortlist',
    text: 'Only residences that meet our standard are presented — never a flood of listings, always a considered edit.',
  },
  {
    step: '03',
    title: 'Discreet viewing',
    text: 'Viewings are arranged privately, with full context on design, ownership, and long-term value.',
  },
  {
    step: '04',
    title: 'Seamless close',
    text: 'From offer to keys, we coordinate counsel, diligence, and handover with absolute discretion.',
  },
]

const SERVICES = [
  {
    icon: Compass,
    title: 'Global search',
    text: 'Access to off-market and primary residences across twelve countries, matched to your criteria.',
  },
  {
    icon: Shield,
    title: 'Discretion first',
    text: 'NDAs, private showings, and client confidentiality as standard — never public marketing of your interest.',
  },
  {
    icon: KeyRound,
    title: 'Acquisition counsel',
    text: 'Coordination with legal, tax, and family office partners for complex cross-border purchases.',
  },
  {
    icon: Sparkles,
    title: 'Aftercare',
    text: 'Ongoing advisory for stewardship, staff introductions, and future collection expansion.',
  },
]

const TESTIMONIALS = [
  {
    quote:
      'Lumina never rushed the process. They understood that the right residence is a life decision, not a transaction.',
    name: 'E. M.',
    role: 'Collector, New York & Provence',
  },
  {
    quote:
      'Every introduction felt intentional. Architecture, light, and privacy were treated with equal seriousness.',
    name: 'A. R.',
    role: 'Principal, family office',
  },
  {
    quote:
      'From first call to closing, the experience was quiet, precise, and completely private.',
    name: 'S. K.',
    role: 'Client, Pacific Coast',
  },
]

const JOURNAL_PREVIEW = [
  {
    title: 'The Quiet Luxury of Restraint',
    category: 'Philosophy',
    date: 'June 2025',
  },
  {
    title: 'Material Honesty in Contemporary Residences',
    category: 'Design',
    date: 'May 2025',
  },
  {
    title: 'Living with the Landscape',
    category: 'Architecture',
    date: 'April 2025',
  },
]

export default function Home() {
  // Cinematic GSAP scroll effects (async — not on critical path)
  useEffect(() => {
    if (prefersReducedMotion()) return

    let cancelled = false
    let revert: (() => void) | undefined
    let offScroll: (() => void) | undefined

    ;(async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ])
      if (cancelled) return

      gsap.registerPlugin(ScrollTrigger)

      const lenis = (window as unknown as { __lenis?: { on: Function; off: Function } }).__lenis
      if (lenis) {
        const onScroll = () => ScrollTrigger.update()
        lenis.on('scroll', onScroll)
        offScroll = () => lenis.off('scroll', onScroll)
      }

      const isFine = window.matchMedia('(pointer: fine) and (min-width: 768px)').matches

      const ctx = gsap.context(() => {
        /*
         * Hero exit motion — keep subtle so scroll-up never “stretches”
         * the section (no large scale / yPercent on the hero shell).
         */
        if (isFine) {
          gsap.to('.nova-hero__glow', {
            yPercent: 8,
            scale: 1.03,
            ease: 'none',
            scrollTrigger: {
              trigger: '.nova-hero',
              start: 'top top',
              end: 'bottom top',
              scrub: 0.8,
              invalidateOnRefresh: true,
            },
          })

          gsap.to('.nova-hero__inner', {
            y: 48,
            opacity: 0.25,
            ease: 'none',
            scrollTrigger: {
              trigger: '.nova-hero',
              start: 'top top',
              end: 'bottom top',
              scrub: 0.7,
              invalidateOnRefresh: true,
            },
          })

          gsap.to('.nova-search-wrap', {
            y: 32,
            opacity: 0.4,
            ease: 'none',
            scrollTrigger: {
              trigger: '.nova-hero',
              start: 'top top',
              end: 'bottom top',
              scrub: 0.7,
              invalidateOnRefresh: true,
            },
          })
        } else {
          /* Mobile: fade only — no transform stretch */
          gsap.to('.nova-hero__inner', {
            opacity: 0.35,
            ease: 'none',
            scrollTrigger: {
              trigger: '.nova-hero',
              start: 'top top',
              end: 'bottom top',
              scrub: true,
              invalidateOnRefresh: true,
            },
          })
        }

        gsap.utils.toArray<HTMLElement>('.home-frame').forEach((panel) => {
          gsap.fromTo(
            panel,
            { scale: 0.97, opacity: 0.55 },
            {
              scale: 1,
              opacity: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: panel,
                start: 'top 92%',
                end: 'top 55%',
                scrub: 1.15,
              },
            }
          )
        })

        gsap.fromTo(
          '.marquee-track',
          { xPercent: 0 },
          {
            xPercent: -28,
            ease: 'none',
            scrollTrigger: {
              trigger: '.marquee-section',
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.6,
            },
          }
        )

        gsap.fromTo(
          '.img-acc',
          { y: 40, opacity: 0.4 },
          {
            y: 0,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: '.featured-section',
              start: 'top 88%',
              end: 'top 52%',
              scrub: 1,
            },
          }
        )

        gsap.from('.story-line', {
          scrollTrigger: {
            trigger: '.story-section',
            start: 'top 80%',
            end: 'center 40%',
            scrub: 1.25,
          },
          opacity: 0.08,
          y: 56,
          filter: 'blur(8px)',
          stagger: 0.22,
        })

        gsap.utils.toArray<HTMLElement>('.stat-item').forEach((el, i) => {
          gsap.fromTo(
            el,
            { y: 36, opacity: 0.2 },
            {
              y: 0,
              opacity: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: el,
                start: 'top 90%',
                end: 'top 60%',
                scrub: 0.9 + i * 0.05,
              },
            }
          )
        })

        gsap.fromTo(
          '.hover-mosaic',
          { y: 40, opacity: 0.35, scale: 0.97 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: '.destinations-section',
              start: 'top 88%',
              end: 'top 50%',
              scrub: 1.1,
            },
          }
        )

        gsap.utils.toArray<HTMLElement>('.process-step').forEach((el, i) => {
          gsap.fromTo(
            el,
            { x: i % 2 === 0 ? -28 : 28, opacity: 0.15 },
            {
              x: 0,
              opacity: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: el,
                start: 'top 90%',
                end: 'top 55%',
                scrub: 1.05,
              },
            }
          )
        })

        gsap.utils.toArray<HTMLElement>('.service-card').forEach((el, i) => {
          gsap.fromTo(
            el,
            { y: 40, opacity: 0.2, scale: 0.97 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: el,
                start: 'top 92%',
                end: 'top 62%',
                scrub: 1 + i * 0.04,
              },
            }
          )
        })

        gsap.utils.toArray<HTMLElement>('.voice-card').forEach((el, i) => {
          gsap.fromTo(
            el,
            { y: 36, opacity: 0.15 },
            {
              y: 0,
              opacity: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: el,
                start: 'top 90%',
                end: 'top 58%',
                scrub: 1 + i * 0.08,
              },
            }
          )
        })

        gsap.fromTo(
          '.cta-band-inner',
          { y: 56, opacity: 0.35, scale: 0.96 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: '.cta-band',
              start: 'top 90%',
              end: 'top 48%',
              scrub: 1.1,
            },
          }
        )
      })

      revert = () => ctx.revert()
      ScrollTrigger.refresh()
    })()

    return () => {
      cancelled = true
      offScroll?.()
      revert?.()
    }
  }, [])

  // Prefer featured, then fill to 3 frames for the accordion
  const featured = (() => {
    const picks = getFeaturedProperties()
    if (picks.length >= 3) return picks.slice(0, 3)
    const rest = properties.filter((p) => !picks.some((f) => f.id === p.id))
    return [...picks, ...rest].slice(0, 3)
  })()

  return (
    <>
      <HeroShowcase />

      {/* Marquee */}
      <section className="frame-section marquee-section">
        <div className="frame-panel frame-panel--soft home-frame relative py-3.5 sm:py-5 overflow-hidden">
          <div className="rule-silver absolute top-0 left-0 right-0" />
          <div className="rule-silver absolute bottom-0 left-0 right-0" />
          <div className="marquee-track flex whitespace-nowrap gap-8 sm:gap-12 text-[9px] sm:text-[11px] uppercase tracking-[0.25em] sm:tracking-[0.35em] text-cream/45 will-change-transform">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className="flex items-center gap-8 sm:gap-12">
                <span>Private Collections</span>
                <span className="text-graphite-light">✦</span>
                <span className="text-silver">Architectural Masterpieces</span>
                <span className="text-silver-light">✦</span>
                <span>By Appointment</span>
                <span className="text-graphite">✦</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Featured residences — 3-frame image accordion */}
      <section className="frame-section featured-section">
        <div className="frame-panel home-frame section-padding section-y">
          <div className="container-luxury">
            <Reveal
              variant="blur"
              className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-12 md:mb-14"
            >
              <div>
                <p className="label-premium mb-2 sm:mb-3">Selected</p>
                <h2 className="heading-section tracking-tight text-cream">
                  Featured <span className="text-royal">Residences</span>
                </h2>
              </div>
              <Link
                to="/residences"
                className="group inline-flex items-center gap-2 text-sm text-cream/70 hover:text-silver transition-colors self-start sm:self-auto"
              >
                View all
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </Reveal>

            <ImageAccordion items={featured} />
          </div>
        </div>
      </section>

      {/* Collection mosaic — interactive hover grid */}
      <section className="frame-section destinations-section">
        <div className="frame-panel frame-panel--soft home-frame section-padding section-y">
          <div className="container-luxury">
            <Reveal variant="up" className="mb-8 sm:mb-12 md:mb-14 max-w-2xl mx-auto text-center">
              <p className="label-premium justify-center mb-2 sm:mb-3">Collection</p>
              <h2 className="heading-section tracking-tight text-cream mb-3 sm:mb-4">
                Architecture in <span className="text-royal">focus</span>
              </h2>
              <p className="text-cream/55 text-sm sm:text-base leading-relaxed">
                <span className="hidden md:inline">
                  Hover a frame to expand — each still is a residence from the private collection.
                </span>
                <span className="md:hidden">
                  Tap a frame to open a residence from the private collection.
                </span>
              </p>
            </Reveal>

            <HoverMosaic />
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="frame-section story-section">
        <div className="frame-panel home-frame section-padding section-y relative overflow-hidden">
          <div className="container-luxury max-w-4xl mx-auto text-center relative">
            <p className="story-line label-premium justify-center mb-5 sm:mb-8">Our Philosophy</p>
            <h2 className="story-line heading-section tracking-tight text-cream leading-snug mb-5 sm:mb-8">
              We do not sell houses.
              <br />
              <span className="italic text-royal">We present sanctuaries.</span>
            </h2>
            <p className="story-line text-cream/55 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto px-1">
              Each residence in our collection has been chosen for its architectural integrity, its relationship to place, and the quiet confidence it affords those who live within it.
            </p>
            <Reveal delay={0.1} className="mt-8 sm:mt-10">
              <Link
                to="/about"
                className="group inline-flex items-center gap-2 text-sm text-cream/70 hover:text-silver transition-colors"
              >
                About Lumina
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="frame-section process-section">
        <div className="frame-panel frame-panel--soft home-frame section-padding section-y">
          <div className="container-luxury">
            <Reveal variant="blur" className="mb-10 sm:mb-14 max-w-2xl">
              <p className="label-premium mb-2 sm:mb-3">How we work</p>
              <h2 className="heading-section tracking-tight text-cream">
                A considered <span className="text-royal">process</span>
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
              {PROCESS.map((item) => (
                <div
                  key={item.step}
                  className="process-step will-change-transform border border-white/5 bg-white/[0.02] p-5 sm:p-7 md:p-8"
                >
                  <p className="font-serif text-3xl sm:text-4xl text-cream/20 tracking-tighter mb-3 sm:mb-4">
                    {item.step}
                  </p>
                  <h3 className="font-serif text-xl sm:text-2xl text-cream tracking-tight mb-2 sm:mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-cream/55 leading-relaxed max-w-md">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="frame-section services-section">
        <div className="frame-panel home-frame section-padding section-y">
          <div className="container-luxury">
            <Reveal className="mb-8 sm:mb-12 md:mb-14 max-w-2xl">
              <p className="label-premium mb-2 sm:mb-3">Advisory</p>
              <h2 className="heading-section tracking-tight text-cream">
                What we <span className="text-royal">provide</span>
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
              {SERVICES.map(({ icon: Icon, title, text }) => (
                <div
                  key={title}
                  className="service-card will-change-transform group glass rounded-sm p-5 sm:p-6 md:p-8"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center border border-white/10 text-silver group-hover:border-silver/40 transition-colors">
                    <Icon size={18} strokeWidth={1.6} />
                  </div>
                  <h3 className="font-serif text-lg sm:text-xl text-cream mb-2">{title}</h3>
                  <p className="text-sm text-cream/55 leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="frame-section stats-section">
        <div className="frame-panel frame-panel--soft home-frame section-padding py-12 sm:py-16 md:py-20">
          <div className="container-luxury grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10">
            {[
              { value: '40+', label: 'Private residences' },
              { value: '12', label: 'Countries' },
              { value: '98%', label: 'Client retention' },
              { value: '1:1', label: 'Advisor pairing' },
            ].map((stat) => (
              <div key={stat.label} className="stat-item text-center sm:text-left will-change-transform">
                <p className="font-serif text-2xl sm:text-3xl md:text-4xl text-cream tracking-tight mb-1.5 sm:mb-2">
                  {stat.value}
                </p>
                <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.15em] sm:tracking-[0.2em] text-cream/40">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="frame-section voices-section">
        <div className="frame-panel home-frame section-padding section-y">
          <div className="container-luxury">
            <Reveal variant="clip" className="mb-8 sm:mb-12 md:mb-14 max-w-2xl">
              <p className="label-premium mb-2 sm:mb-3">Client voices</p>
              <h2 className="heading-section tracking-tight text-cream">
                Quiet <span className="text-royal">confidence</span>
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
              {TESTIMONIALS.map((t) => (
                <blockquote
                  key={t.name}
                  className="voice-card will-change-transform flex flex-col border border-white/5 bg-white/[0.02] p-5 sm:p-6 md:p-8"
                >
                  <p className="text-cream/70 text-sm sm:text-base leading-relaxed flex-1">
                    “{t.quote}”
                  </p>
                  <footer className="mt-6 pt-4 border-t border-white/5">
                    <p className="text-sm text-cream font-medium">{t.name}</p>
                    <p className="text-[11px] uppercase tracking-wider text-cream/40 mt-1">{t.role}</p>
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Journal preview */}
      <section className="frame-section journal-section">
        <div className="frame-panel frame-panel--soft home-frame section-padding section-y">
          <div className="container-luxury">
            <Reveal
              className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-12"
            >
              <div>
                <p className="label-premium mb-2 sm:mb-3">Journal</p>
                <h2 className="heading-section tracking-tight text-cream">
                  Recent <span className="text-royal">reflections</span>
                </h2>
              </div>
              <Link
                to="/journal"
                className="group inline-flex items-center gap-2 text-sm text-cream/70 hover:text-silver transition-colors self-start sm:self-auto"
              >
                View journal
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </Reveal>

            <div className="border-t border-white/5">
              {JOURNAL_PREVIEW.map((post, i) => (
                <Reveal key={post.title} delay={i * 0.06}>
                  <Link
                    to="/journal"
                    className="group flex flex-col md:flex-row md:items-baseline gap-2 sm:gap-3 md:gap-8 py-6 sm:py-8 border-b border-white/5"
                  >
                    <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-cream/35 shrink-0 md:w-28">
                      {post.date}
                    </span>
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] uppercase tracking-wider text-silver/80 mb-1.5 block">
                        {post.category}
                      </span>
                      <h3 className="font-serif text-lg sm:text-xl md:text-2xl text-cream group-hover:text-silver transition-colors">
                        {post.title}
                      </h3>
                    </div>
                    <ArrowRight
                      size={16}
                      className="hidden md:block shrink-0 text-cream/30 transition-transform group-hover:translate-x-1 group-hover:text-silver"
                    />
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="frame-section cta-band">
        <div className="frame-panel home-frame section-padding section-y">
          <div className="container-luxury">
            <div className="cta-band-inner relative glass rounded-sm overflow-hidden shadow-royal-glow will-change-transform">
              <div className="absolute inset-0 bg-gradient-to-br from-graphite/30 via-transparent to-silver/15" />
              <div className="absolute top-0 left-0 right-0 rule-silver opacity-80" />
              <div className="relative px-5 py-10 sm:px-8 sm:py-14 md:px-16 md:py-20 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6 sm:gap-8 md:gap-10">
                <div className="max-w-lg text-center md:text-left">
                  <h2 className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight text-cream mb-3 sm:mb-4">
                    Begin your <span className="text-royal">private journey</span>
                  </h2>
                  <p className="text-cream/55 text-sm md:text-base leading-relaxed">
                    Our advisors provide discreet, tailored introductions to residences that match your vision of home.
                  </p>
                </div>
                <button
                  onClick={() => useStore.getState().openContact()}
                  className="btn-primary tracking-wider uppercase btn-stack md:whitespace-nowrap shrink-0"
                >
                  Request Private Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
