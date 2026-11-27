import { useEffect, useRef } from 'react'
import type { ProjectMedia } from '../../data/projects'
import { ProjectModel } from '../three/ProjectModel'

// plays only while visible, so off-screen videos cost nothing
function LoopVideo({ src, poster, alt }: { src: string; poster?: string; alt: string }) {
    const ref = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        const v = ref.current
        if (!v) return
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (reduced) return
        const io = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) void v.play().catch(() => {})
            else v.pause()
        })
        io.observe(v)
        return () => io.disconnect()
    }, [])

    return (
        <video
            ref={ref}
            src={src}
            poster={poster}
            aria-label={alt}
            muted
            loop
            playsInline
            preload="metadata"
            className="h-full w-full object-cover"
        />
    )
}

export function ProjectMediaView({ media }: { media: ProjectMedia }) {
    switch (media.type) {
        case 'model':
            return <ProjectModel path={media.path} />
        case 'video':
            return <LoopVideo src={media.src} poster={media.poster} alt={media.alt} />
        case 'image':
        case 'banner':
            return <img src={media.src} alt={media.alt} loading="lazy" className="h-full w-full object-cover" />
    }
}