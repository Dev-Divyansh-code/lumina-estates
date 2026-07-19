import { motion } from 'framer-motion'

export default function About() {
  return (
    <div className="frame-section frame-section--top">
      <div className="frame-panel page-shell">
        <div className="section-padding container-luxury">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl"
          >
            <p className="label-premium mb-3 sm:mb-4">About</p>
            <h1 className="heading-hero font-serif tracking-tighter text-cream mb-6 sm:mb-8">
              Quiet excellence
            </h1>
            <div className="space-y-4 sm:space-y-6 text-cream/60 text-sm sm:text-base md:text-lg leading-relaxed">
              <p>
                Lumina Estates was founded on a simple conviction: the finest residences deserve to be presented with the same care and discretion that went into their creation.
              </p>
              <p>
                We work with a select group of architects, developers, and private owners who share our belief that architecture is not merely shelter, but a profound expression of how one chooses to live.
              </p>
              <p>
                Our role is not to sell. It is to introduce — with precision, privacy, and an unwavering commitment to quality.
              </p>
            </div>
          </motion.div>

          <div className="mt-14 sm:mt-20 md:mt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
            {[
              {
                title: 'Discretion',
                text: 'Every introduction is private. We never publish off-market listings or share client information.',
              },
              {
                title: 'Curation',
                text: 'We accept only a fraction of the properties presented to us. Architecture must meet our exacting standard.',
              },
              {
                title: 'Longevity',
                text: 'We think in decades, not seasons. The relationships we build are intended to last a lifetime.',
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <h3 className="font-serif text-xl text-cream mb-3">{item.title}</h3>
                <p className="text-sm text-cream/50 leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
