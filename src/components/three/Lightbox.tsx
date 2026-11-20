import { useEffect, useRef } from 'react'
import type { GalleryImage } from '../../data/gallery'

type Props = {
    images: GalleryImage[]
    index: number
    onIndexChange: (i: number) => void
    onClose: () => void
}

export function Lightbox({ images, index, onIndexChange, onClose }: Props) {
    const dialogRef = useRef<HTMLDialogElement>(null)
    const startX = useRef<number | null>(null)
    const count = images.length
    const img = images[index]

    const go = (step: number) => onIndexChange((index + step + count) % count) // wraps around

    // open as a modal and lock page scrolling while it's open
    useEffect(() => {
        const d = dialogRef.current
        if (d && !d.open) d.showModal()
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = ''
        }
    }, [])

    // preload the neighbors so skipping feels instant
    useEffect(() => {
        for (const step of [-1, 1]) {
            const n = images[(index + step + count) % count]
            new Image().src = n.src
        }
    }, [index, images, count])

    return (
        <dialog
            ref={dialogRef}
            onClose={onClose} // fires on Escape
            onKeyDown={(e) => {
                if (e.key === 'ArrowLeft') go(-1)
                if (e.key === 'ArrowRight') go(1)
            }}
            className="m-0 h-dvh max-h-none w-screen max-w-none bg-transparent p-0 text-text backdrop:bg-black/90"
            aria-label="Image gallery"
        >
            <div
                className="flex h-full touch-pan-y flex-col items-center justify-center gap-4 px-4 py-16"
                onClick={(e) => {
                    if (e.target === e.currentTarget) onClose() // click on the dark area closes
                }}
                onPointerDown={(e) => {
                    startX.current = e.clientX
                }}
                onPointerUp={(e) => {
                    if (startX.current === null) return
                    const dx = e.clientX - startX.current
                    startX.current = null
                    if (Math.abs(dx) > 60) go(dx > 0 ? -1 : 1) // swipe on touch screens
                }}
            >
                <figure className="flex max-w-full flex-col items-center gap-3">
                    <img
                        key={img.src}
                        src={img.src}
                        alt={img.alt}
                        draggable={false}
                        className="max-h-[70dvh] max-w-full object-contain"
                    />
                    <figcaption className="max-w-prose text-center text-sm text-muted">
                        {img.caption}
                    </figcaption>
                </figure>

                <p className="absolute left-4 top-4 font-mono text-xs text-muted">
                    {index + 1} / {count}
                </p>

                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close"
                    className="absolute right-4 top-4 px-3 py-2 font-mono text-xs uppercase tracking-wider text-muted hover:text-accent"
                >
                    Close ✕
                </button>
                <button
                    type="button"
                    onClick={() => go(-1)}
                    aria-label="Previous image"
                    className="absolute left-2 top-1/2 -translate-y-1/2 px-3 py-4 text-3xl text-muted hover:text-accent"
                >
                    ‹
                </button>
                <button
                    type="button"
                    onClick={() => go(1)}
                    aria-label="Next image"
                    className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-4 text-3xl text-muted hover:text-accent"
                >
                    ›
                </button>
            </div>
        </dialog>
    )
}