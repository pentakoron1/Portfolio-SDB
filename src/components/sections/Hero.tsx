
import { ParallaxImageLayer } from '../three/ParallaxImageLayer'
import { profile } from '../../data/profile'

export function Hero() {
    return (
        <section
            id="top"
            className="relative h-[90vh] min-h-125 overflow-hidden border-b border-border"
        >
            <ParallaxImageLayer src="/images/hero/sky.webp"        speed={0.5}  z={0} />
            <ParallaxImageLayer src="/images/hero/backmountains.webp"  speed={0.35} z={1} />
            <ParallaxImageLayer src="/images/hero/formountains.webp"      speed={0.2}  z={2} />

            {/* text sits between the mid layers and the foreground */}
            <div className="relative z-3 mx-auto max-w-5xl px-6 pt-32">
                <h1 className="text-5xl font-bold">
                    <span className="text-gradient-accent">{profile.name}</span>
                </h1>
                <p className="mt-4 text-lg">{profile.tagline}</p>
            </div>

            <ParallaxImageLayer src="/images/hero/foreground.webp" speed={0.05} z={4} />
        </section>
    )
}