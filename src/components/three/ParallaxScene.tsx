import { useEffect, useRef, useState, type ReactNode } from 'react'

export type SceneLayer = {
    src: string
    pan: number // 1 = moves with the page (near), lower = slower (far)
    z: number
}

type Props = {
    layers: SceneLayer[]
    aspect: number
    start?: number
    minCover?: number
    textZ?: number // stacking position of the text; between two layer z values to sit between them
    children?: ReactNode
}

export function ParallaxScene({ layers, aspect, start = 0.5, minCover = 1.5, textZ = 1.5, children }: Props) {
    const textRef = useRef<HTMLDivElement>(null)
    const outerRef = useRef<HTMLElement>(null)
    const layerRefs = useRef<(HTMLDivElement | null)[]>([])
    const [vp, setVp] = useState({ w: 0, h: 0 })

    useEffect(() => {
        const measure = () => setVp({ w: window.innerWidth, h: window.innerHeight })
        measure()
        window.addEventListener('resize', measure)
        return () => window.removeEventListener('resize', measure)
    }, [])

    const imgH = Math.max(vp.w / aspect, vp.h * minCover)
    const imgW = imgH * aspect
    const travel = imgH - vp.h              // hidden image height
    const scrollDist = travel * (1 - start) // only the part below the start point is revealed
    const textPan = 0.3

    useEffect(() => {
        const outer = outerRef.current
        if (!outer) return

        const apply = (progress: number, exit: number) => {
            layers.forEach((layer, i) => {
                const el = layerRefs.current[i]
                if (!el) return
                const offset = travel * (start + (1 - start) * progress * layer.pan)
                // exit phase: lagging layers get pushed back down so they keep moving slower than the page
                const extra = Math.min(exit * (1 - layer.pan), offset) // clamp so no gap opens at the top
                el.style.transform = `translate3d(0, ${-offset + extra}px, 0)`
            })
            const t = textRef.current
            if (t) {
                // pinned phase: text drifts up slowly with progress; exit phase: lags behind the page
                const move = progress * scrollDist * textPan
                const lag = exit * (1 - textPan)
                t.style.transform = `translate3d(0, ${-move + lag}px, 0)`
            }
        }

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            apply(0, 0)
            return
        }

        let frame = 0
        const update = () => {
            frame = 0
            const scrolled = -outer.getBoundingClientRect().top
            const p = scrollDist > 0 ? scrolled / scrollDist : 0
            const exit = Math.min(Math.max(scrolled - scrollDist, 0), vp.h) // 0 -> screen height
            apply(Math.min(Math.max(p, 0), 1), exit)
        }
        const onScroll = () => {
            if (!frame) frame = requestAnimationFrame(update)
        }

        update()
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => {
            window.removeEventListener('scroll', onScroll)
            cancelAnimationFrame(frame)
        }
    }, [layers, travel, scrollDist, start, vp.h, textPan])

    return (
        <section ref={outerRef} id="top" className="relative" style={{ height: vp.h + scrollDist }}>
            <div className="sticky top-0 overflow-hidden" style={{ height: vp.h }}>
                {layers.map((layer, i) => (
                    <div
                        key={layer.src}
                        ref={(el) => {
                            layerRefs.current[i] = el
                        }}
                        className="pointer-events-none absolute top-0 will-change-transform"
                        style={{ zIndex: layer.z, width: imgW, height: imgH, left: (vp.w - imgW) / 2 }}
                        aria-hidden
                    >
                        <img src={layer.src} alt="" className="h-full w-full" />
                    </div>
                ))}
                <div
                    ref={textRef}
                    className="pointer-events-none relative mx-auto max-w-5xl px-6 pt-32"
                    style={{ zIndex: textZ }}
                >
                    <div className="pointer-events-auto">{children}</div>
                </div>
            </div>
        </section>
    )
}