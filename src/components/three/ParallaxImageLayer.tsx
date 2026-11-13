import { useParallax } from './UseParallax.tsx'

type LayerProps = {
    src: string
    speed: number // 0 = moves with the page, higher = drifts down more (feels farther away)
    z: number
}

export function ParallaxImageLayer({ src, speed, z }: LayerProps) {
    const ref = useParallax<HTMLDivElement>(speed)

    return (
        <div
            ref={ref}
            className="pointer-events-none absolute inset-x-0"
            style={{
                zIndex: z,
                // extend the layer upward so no gap appears as it drifts down
                top: `-${speed * 100}%`,
                height: `${100 + speed * 100}%`,
            }}
            aria-hidden
        >
            <img src={src} alt="" className="h-full w-full object-cover object-bottom" />
        </div>
    )
}