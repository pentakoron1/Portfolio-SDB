import { useEffect, useRef } from 'react'

export function useParallax<T extends HTMLElement>(speed: number) {
    const ref = useRef<T>(null)

    useEffect(() => {
        const el = ref.current
        if (!el) return
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

        let frame = 0
        const update = () => {
            el.style.transform = `translate3d(0, ${window.scrollY * speed}px, 0)`
            frame = 0
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
    }, [speed])

    return ref
}