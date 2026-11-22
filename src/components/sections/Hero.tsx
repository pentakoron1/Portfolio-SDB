import {asset} from "../../lib/url.ts";


import { ParallaxScene } from '../three/ParallaxScene'
import { profile } from '../../data/profile'

const layers = [
    { src: asset('/images/hero/sky.webp'),        pan: 0, z: 0 },
    { src: asset('/images/hero/backmountains.webp'),  pan: 0.2, z: 1 },
    { src: asset('/images/hero/formountains.webp'),  pan: 0.5, z: 2 },
    { src: asset('/images/hero/foreground.webp'), pan: 1,   z: 3 },
]

const sections = [
    { label: 'Projects', href: '#projects' },
    { label: 'Interests', href: '#interests' },
    { label: 'Education', href: '#education' },
    { label: 'Gallery', href: '#gallery' },
]

export function Hero() {
    return (
        <ParallaxScene
            layers={layers}
            aspect={2 / 3}
            bottom={
                <nav aria-label="Jump to section" className="flex flex-wrap justify-center gap-3">
                    {sections.map((s) => (
                        <a
                            key={s.href}
                            href={s.href}
                            className="rounded-full border border-white/20 bg-white/10 px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-text backdrop-blur-md backdrop-brightness-90 transition hover:border-accent/60 hover:bg-white/20 hover:text-accent"
                        >
                            Jump to {s.label}
                        </a>
                    ))}
                </nav>
            }
        >
            <h1 className="text-5xl font-semibold tracking-[0.2em] [word-spacing:0.2em]">
                {profile.name}
            </h1>
            <p className="mt-4 text-lg text-muted">{profile.tagline}</p>
        </ParallaxScene>
    )
}