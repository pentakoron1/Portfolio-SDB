import {asset} from "../../lib/url.ts";


import { ParallaxScene } from '../three/ParallaxScene'
import { profile } from '../../data/profile'

const layers = [
    { src: asset('/images/hero/sky.webp'),        pan: 0, z: 0 },
    { src: asset('/images/hero/backmountains.webp'),  pan: 0.2, z: 1 },
    { src: asset('/images/hero/formountains.webp'),  pan: 0.5, z: 2 },
    { src: asset('/images/hero/foreground.webp'), pan: 1,   z: 3 },
]

export function Hero() {
    return (
        <ParallaxScene layers={layers} aspect={2 / 3} textZ={1.5}>
            <h1 className="text-5xl font-bold">
                <span className="text-gradient-accent">{profile.name}</span>
            </h1>
            <p className="mt-4 text-lg">{profile.tagline}</p>
        </ParallaxScene>
    )
}