import { useState } from 'react'
import { galleryImages } from '../../data/gallery'
import { Section } from '../layout/Section'
import { Lightbox } from '../three/Lightbox'

export function Gallery() {
    const [index, setIndex] = useState<number | null>(null)

    return (
        <Section id="gallery" eyebrow="Archive" title="Gallery">
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {galleryImages.map((img, i) => (
                    <li key={img.src}>
                        <button
                            type="button"
                            onClick={() => setIndex(i)}
                            aria-label={`Open: ${img.caption}`}
                            className="hairline-border group block aspect-square w-full overflow-hidden"
                        >
                            <img
                                src={img.thumb ?? img.src}
                                alt={img.alt}
                                loading="lazy"
                                decoding="async"
                                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                            />
                        </button>
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