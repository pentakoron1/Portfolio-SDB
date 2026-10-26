import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

type SectionProps = {
  id: string
  title?: string
  eyebrow?: string
  children: ReactNode
  className?: string
}

export function Section({ id, title, eyebrow, children, className = '' }: SectionProps) {
  const reduced = useReducedMotion()

  return (
    <motion.section
      id={id}
      className={`scroll-mt-24 py-20 md:py-28 ${className}`}
      aria-labelledby={title ? `${id}-heading` : undefined}
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto max-w-5xl px-6">
        {(eyebrow || title) && (
          <header className="mb-12 md:mb-16">
            {eyebrow && (
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
            )}
            {title && (
              <h2
                id={`${id}-heading`}
                className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl"
              >
                {title}
              </h2>
            )}
          </header>
        )}
        {children}
      </div>
    </motion.section>
  )
}
