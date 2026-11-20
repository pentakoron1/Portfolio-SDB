import {asset} from "../lib/url.ts";

export type GalleryImage = {
    src: string      // full-size image, e.g. '/images/gallery/fpv-01.webp'
    thumb?: string   // optional smaller version for the grid
    alt: string      // describes the image for screen readers
    caption: string  // subtitle shown under the picture in the carousel
    width?: number   // original pixel size, used to reserve space before the image loads
    height?: number
}

export const galleryImages: GalleryImage[] = [
    {
        src: asset('images/gallery/chess_design_1.webp') ,
        alt: '3D printable Chess design',
        caption: 'Poster for my 3D printable chess',
    },
    {
        src: asset('/images/gallery/define-freedom_1.webp'),
        alt: 'Thumbnail of the "Define Freedom shortfilm',
        caption: 'My shortfilm',
    },
    // ...add as many as you like
]