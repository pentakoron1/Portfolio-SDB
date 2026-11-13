import { useParallax } from './UseParallax'

type LayerProps = {
    src: string
    speed: number
    z: number
    focus?: string // where the crop is centered, e.g. '50% 50%' (center), '50% 30%' (a bit higher)
    zoom?: number  // extra zoom on top of the cover fit, 1 = none
}

export function ParallaxImageLayer({ src, speed, z, focus = '50% 50%', zoom = 1 }: LayerProps) {
    const ref = useParallax<HTMLDivElement>(speed)

    return (
        <div
            ref={ref}
            className="pointer-events-none absolute inset-x-0"
            style={{
                zIndex: z,
                top: `-${speed * 100}%`,
                height: `${100 + speed * 100}%`,
            }}
            aria-hidden
        >
            <img
                src={src}
                alt=""
                className="h-full w-full object-cover"
                style={{
                    objectPosition: focus,
                    transform: `scale(${zoom})`,
                    transformOrigin: focus,
                }}
            />
        </div>
    )
}