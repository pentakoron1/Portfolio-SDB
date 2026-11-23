import { useCallback, useEffect, useMemo, useRef, type PointerEvent } from 'react'
import { motion, useReducedMotion, type Variants } from 'framer-motion' // same import as Section.tsx
import { Section } from '../layout/Section'
import { quote } from '../../data/quote'

const RADIUS = 110   // how far from the cursor letters get pushed (px)
const STRENGTH = 20  // maximum push distance (px)

// deterministic "random" so every letter always falls from the same place
const rand = (i: number, k: number) => {
    const x = Math.sin(i * 127.1 + k * 311.7) * 43758.5453
    return x - Math.floor(x)
}

const letterVariants: Variants = {
    hidden: (i: number) => ({
        opacity: 0,
        y: -80 - rand(i, 1) * 140,
        x: (rand(i, 2) - 0.5) * 80,
        rotate: (rand(i, 3) - 0.5) * 120,
    }),
    show: (i: number) => ({
        opacity: 1,
        y: 0,
        x: 0,
        rotate: 0,
        transition: { type: 'spring', stiffness: 110, damping: 12, mass: 0.8, delay: i * 0.03 },
    }),
}

export function Quote() {
    const boxRef = useRef<HTMLDivElement>(null)
    const letterEls = useRef<(HTMLSpanElement | null)[]>([])
    const centers = useRef<({ x: number; y: number } | null)[]>([])
    const offsets = useRef<{ x: number; y: number }[]>([])
    const pointer = useRef({ x: 0, y: 0, active: false })
    const raf = useRef(0)
    const reduced = useReducedMotion()

    // split into words (so lines wrap between words) and number every letter
    const { words, total } = useMemo(() => {
        let n = 0
        const words = quote.text.split(' ').map((w) => [...w].map((ch) => ({ ch, i: n++ })))
        return { words, total: n }
    }, [])

    // remember where each letter rests, relative to the box
    const measure = useCallback(() => {
        const box = boxRef.current
        if (!box) return
        const b = box.getBoundingClientRect()
        letterEls.current.forEach((el, i) => {
            if (!el) return
            const r = el.getBoundingClientRect()
            const o = offsets.current[i] ?? { x: 0, y: 0 }
            // subtract the current push so the result is the resting position
            centers.current[i] = {
                x: r.left - b.left + r.width / 2 - o.x,
                y: r.top - b.top + r.height / 2 - o.y,
            }
        })
    }, [])

    const tick = useCallback(() => {
        let moving = false
        const p = pointer.current
        for (let i = 0; i < total; i++) {
            const el = letterEls.current[i]
            const c = centers.current[i]
            if (!el || !c) continue
            const o = (offsets.current[i] ??= { x: 0, y: 0 })

            let tx = 0
            let ty = 0
            if (p.active) {
                const dx = c.x - p.x
                const dy = c.y - p.y
                const d = Math.hypot(dx, dy)
                if (d < RADIUS && d > 0.01) {
                    const f = (1 - d / RADIUS) ** 2 * STRENGTH
                    tx = (dx / d) * f
                    ty = (dy / d) * f
                }
            }
            o.x += (tx - o.x) * 0.14
            o.y += (ty - o.y) * 0.14
            if (Math.abs(o.x - tx) > 0.05 || Math.abs(o.y - ty) > 0.05) moving = true
            el.style.transform = `translate3d(${o.x}px, ${o.y}px, 0)`
        }
        raf.current = p.active || moving ? requestAnimationFrame(tick) : 0
    }, [total])

    const start = () => {
        if (!raf.current) raf.current = requestAnimationFrame(tick)
    }

    const onMove = (e: PointerEvent<HTMLDivElement>) => {
        const box = boxRef.current
        if (!box || e.pointerType !== 'mouse') return
        const r = box.getBoundingClientRect()
        const x = e.clientX - r.left
        const y = e.clientY - r.top
        box.style.setProperty('--mx', `${x}px`)
        box.style.setProperty('--my', `${y}px`)
        if (reduced) return
        pointer.current = { x, y, active: true }
        start()
    }

    const onLeave = () => {
        pointer.current.active = false
        start() // lets the letters glide back, then the loop stops itself
    }

    useEffect(() => {
        const box = boxRef.current
        if (!box) return
        const ro = new ResizeObserver(measure)
        ro.observe(box)
        if (reduced) measure()
        return () => {
            ro.disconnect()
            cancelAnimationFrame(raf.current)
        }
    }, [measure, reduced])

    return (
        <Section id="quote">
            <div
                ref={boxRef}
                onPointerMove={onMove}
                onPointerLeave={onLeave}
                className="group relative overflow-hidden py-32 md:py-48 text-center md:py-24"
            >
                {/* spotlight that follows the cursor */}
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                        background:
                            'radial-gradient(250px circle at var(--mx, 50%) var(--my, 50%), color-mix(in srgb, var(--color-accent) 22%, transparent), transparent 70%)',
                    }}
                />

                <motion.blockquote
                    aria-label={quote.text}
                    className="relative mx-auto max-w-4xl text-3xl font-bold italic leading-wide tracking-wide md:text-5xl lg:text-6xl"
                    initial={reduced ? false : 'hidden'}
                    whileInView="show"
                    viewport={{ once: false, margin: '-100px' }}
                >
                    {words.map((word, wi) => (
                        <span key={wi} aria-hidden className="mr-[0.3em] inline-block whitespace-nowrap last:mr-0">
              {word.map(({ ch, i }) => (
                  // outer span: entrance (framer-motion), inner span: repel (our loop)
                  <motion.span
                      key={i}
                      custom={i}
                      variants={letterVariants}
                      className="inline-block"
                      onAnimationComplete={i === total - 1 ? measure : undefined}
                  >
                  <span
                      ref={(el) => {
                          letterEls.current[i] = el
                      }}
                      className="inline-block transition-colors duration-200 hover:text-accent"
                  >
                    {ch}
                  </span>
                  </motion.span>
              ))}
                            {wi < words.length - 1 && ' '}
            </span>
                    ))}
                </motion.blockquote>

                {quote.author && (
                    <p className="relative mt-8 font-mono text-xs uppercase tracking-[0.2em] text-accent">
                        {quote.author}
                    </p>
                )}
            </div>
        </Section>
    )
}