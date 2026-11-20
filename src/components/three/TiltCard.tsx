import { useRef, type PointerEvent, type ReactNode } from 'react'

type Props = {
    onClick: () => void
    label: string
    max?: number    // max tilt in degrees
    scale?: number  // zoom on hover
    children: ReactNode
}

export function TiltCard({ onClick, label, max = 10, scale = 1.06, children }: Props) {
    const ref = useRef<HTMLButtonElement>(null)
    const frame = useRef(0)

    const move = (e: PointerEvent<HTMLButtonElement>) => {
        // mouse only, and respect the reduced-motion setting
        if (e.pointerType !== 'mouse') return
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
        const el = ref.current
        if (!el) return

        const r = el.getBoundingClientRect()
        const x = (e.clientX - r.left) / r.width   // 0 to 1
        const y = (e.clientY - r.top) / r.height

        cancelAnimationFrame(frame.current)
        frame.current = requestAnimationFrame(() => {
            el.style.transform =
                `perspective(800px) rotateX(${(0.5 - y) * max * 2}deg) ` +
                `rotateY(${(x - 0.5) * max * 2}deg) scale(${scale})`
            el.style.setProperty('--gx', `${x * 100}%`)
            el.style.setProperty('--gy', `${y * 100}%`)
        })
    }

    const reset = () => {
        cancelAnimationFrame(frame.current)
        if (ref.current) ref.current.style.transform = ''
    }

    return (
        <button
            ref={ref}
            type="button"
            onClick={onClick}
            onPointerMove={move}
            onPointerLeave={reset}
            aria-label={label}
            className="hairline-border group relative block w-full overflow-hidden transition-[transform,box-shadow] duration-150 ease-out will-change-transform hover:z-10 hover:shadow-2xl hover:shadow-black/50"
        >
            {children}
            {/* light spot that follows the cursor */}
            <span
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                style={{
                    background:
                        'radial-gradient(circle at var(--gx, 50%) var(--gy, 50%), rgba(255,255,255,0.18), transparent 55%)',
                }}
            />
        </button>
    )
}