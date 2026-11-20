import { useState } from 'react'
import { galleryImages } from '../../data/gallery'
import { Section } from '../layout/Section'
import { Lightbox } from '../three/Lightbox'
import {TiltCard} from "../three/TiltCard.tsx";

export function Gallery() {
    const [index, setIndex] = useState<number | null>(null)

    return (
        <Section id="gallery" eyebrow="Archive" title="Gallery">
            <ul className="columns-2 gap-3 sm:columns-3 lg:columns-4">
                {galleryImages.map((img, i) => (
                    <li key={img.src} className="mb-3 break-inside-avoid">
                        <TiltCard onClick={() => setIndex(i)} label={`Open: ${img.caption}`}>
                            <img
                                src={img.thumb ?? img.src}
                                alt={img.alt}
                                width={img.width}
                                height={img.height}
                                loading="lazy"
                                decoding="async"
                                className="block h-auto w-full"
                            />
                        </TiltCard>
                    </li>
                ))}
            </ul>

            {index !== null && (
                <Lightbox
                    images={galleryImages}
                    index={index}
                    onIndexChange={setIndex}
                    onClose={() => setIndex(null)}
                />
            )}
        </Section>
    )
}