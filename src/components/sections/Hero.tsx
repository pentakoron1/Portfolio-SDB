import { useParallax } from '../three/UseParallax'
import { profile } from '../../data/profile'

export function Hero() {
    const nameRef = useParallax<HTMLDivElement>(0.15)
    const textRef = useParallax<HTMLDivElement>(0.3)

    return (
        <section
            id="top"
            className="relative scroll-mt-24 overflow-hidden border-b border-border py-16 md:py-24"
        >
            {/* 3D layer stays as it was */}

            <div className="relative z-10 mx-auto max-w-5xl px-6">
                <div ref={nameRef}>
                    <h1 className="text-4xl font-bold md:text-6xl">
                        <span className="text-gradient-accent">{profile.name}</span>
                    </h1>
                </div>
                <div ref={textRef} className="mt-6 space-y-6">
                    <p className="font-mono text-sm text-muted">{profile.role}</p>
                    <p className="max-w-md text-lg text-text/90">{profile.tagline}</p>
                    {/* buttons */}
                </div>
            </div>
        </section>
    )
}