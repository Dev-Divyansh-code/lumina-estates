import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { X, Check } from 'lucide-react'
import { useStore } from '../../store/useStore'
import { cn } from '../../lib/utils'
import { useState } from 'react'

const schema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().optional(),
  interest: z.string().min(1, 'Please select an interest'),
  message: z.string().optional(),
})

type FormData = z.infer<typeof schema>

export function ContactModal() {
  const { isContactOpen, closeContact } = useStore()
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { interest: '' },
  })

  useEffect(() => {
    if (isContactOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      setSubmitted(false)
      reset()
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isContactOpen, reset])

  const onSubmit = async (data: FormData) => {
    // Simulate API call
    await new Promise((r) => setTimeout(r, 900))
    console.log('Viewing request:', data)
    setSubmitted(true)
  }

  return (
    <AnimatePresence>
      {isContactOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6"
          style={{
            paddingTop: 'var(--safe-top)',
            paddingBottom: 'var(--safe-bottom)',
          }}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={closeContact}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg max-h-[min(92dvh,900px)] glass-strong rounded-t-sm sm:rounded-sm overflow-hidden flex flex-col"
          >
            <button
              onClick={closeContact}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 flex h-10 w-10 items-center justify-center text-cream/50 hover:text-cream transition-colors z-10"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            <div className="p-5 sm:p-8 md:p-10 overflow-y-auto overscroll-contain">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-8"
                >
                  <div className="w-14 h-14 mx-auto mb-6 rounded-full bg-graphite/20 border border-silver/30 flex items-center justify-center">
                    <Check className="text-silver" size={28} />
                  </div>
                  <h3 className="font-serif text-2xl text-cream mb-3">Request Received</h3>
                  <p className="text-cream/60 text-sm leading-relaxed max-w-xs mx-auto">
                    A private client advisor will be in touch within 24 hours to arrange your viewing.
                  </p>
                  <button onClick={closeContact} className="mt-8 btn-outline text-xs tracking-wider uppercase">
                    Close
                  </button>
                </motion.div>
              ) : (
                <>
                  <h2 className="font-serif text-2xl md:text-3xl text-cream mb-2">Private Viewing</h2>
                  <p className="text-cream/50 text-sm mb-8">
                    Share a few details and we will arrange a discreet, personal introduction.
                  </p>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-cream/40 mb-1.5">
                        Full Name
                      </label>
                      <input
                        {...register('name')}
                        className={cn(
                          'w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-cream',
                          'placeholder:text-cream/30 focus:outline-none focus:border-silver/60 focus:ring-1 focus:ring-graphite/30 transition-colors',
                          errors.name && 'border-red-400/50'
                        )}
                        placeholder="Your name"
                      />
                      {errors.name && (
                        <p className="mt-1 text-xs text-red-400/80">{errors.name.message}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-cream/40 mb-1.5">
                          Email
                        </label>
                        <input
                          {...register('email')}
                          type="email"
                          className={cn(
                            'w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-cream',
                            'placeholder:text-cream/30 focus:outline-none focus:border-silver/60 focus:ring-1 focus:ring-graphite/30 transition-colors',
                            errors.email && 'border-red-400/50'
                          )}
                          placeholder="you@example.com"
                        />
                        {errors.email && (
                          <p className="mt-1 text-xs text-red-400/80">{errors.email.message}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-cream/40 mb-1.5">
                          Phone <span className="text-cream/25">(optional)</span>
                        </label>
                        <input
                          {...register('phone')}
                          type="tel"
                          className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-cream placeholder:text-cream/30 focus:outline-none focus:border-silver/60 focus:ring-1 focus:ring-graphite/30 transition-colors"
                          placeholder="+1 ..."
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-cream/40 mb-1.5">
                        Interest
                      </label>
                      <select
                        {...register('interest')}
                        className={cn(
                          'w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-cream',
                          'focus:outline-none focus:border-silver/60 focus:ring-1 focus:ring-graphite/30 transition-colors appearance-none',
                          errors.interest && 'border-red-400/50'
                        )}
                      >
                        <option value="" className="bg-charcoal">Select…</option>
                        <option value="casa-aurora" className="bg-charcoal">Casa Aurora</option>
                        <option value="villa-solara" className="bg-charcoal">Villa Solara</option>
                        <option value="the-obsidian" className="bg-charcoal">The Obsidian</option>
                        <option value="general" className="bg-charcoal">General Inquiry</option>
                      </select>
                      {errors.interest && (
                        <p className="mt-1 text-xs text-red-400/80">{errors.interest.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-cream/40 mb-1.5">
                        Message <span className="text-cream/25">(optional)</span>
                      </label>
                      <textarea
                        {...register('message')}
                        rows={3}
                        className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-cream placeholder:text-cream/30 focus:outline-none focus:border-silver/60 focus:ring-1 focus:ring-graphite/30 transition-colors resize-none"
                        placeholder="Preferred dates, specific questions…"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full btn-primary text-sm tracking-wider uppercase mt-2 disabled:opacity-60"
                    >
                      {isSubmitting ? 'Sending…' : 'Request Viewing'}
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
