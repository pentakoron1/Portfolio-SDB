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
    {
        src: asset('/images/gallery/design_process.webp'),
        alt: 'Design Process of a 3D logo',
        caption: 'Design process of a 3D logo using Inkscape and Blender',
    },
    {
        src: asset('/images/gallery/cansat_astoria_wallpaper.webp'),
        alt: 'Exploded View of the Astoria CanSat',
        caption: '3D render for the CanSat project, showing an exploded view of all our components',
    },
    {
        src: asset('/images/gallery/astoria_electric_diagram.webp'),
        alt: 'Electric diagram of Astoria CanSat',
        caption: 'Electric diagram I made for Astoria, showing all components and their connections',
    },
    {
        src: asset('/images/gallery/jetpack_man.webp'),
        alt: 'Fisheye render of "Jetpack Man" asset for Unity',
        caption: 'Low-Poly Jetpack character I made for Unity Asset Store. It includes fire particles and animations.',
    },
    {
        src: asset('/images/gallery/fpv_props_guard.webp'),
        alt: '3D printed Propeller Guards on FPV drone',
        caption: '3D printed Propeller Guards I designed for my FPV drone',
    },


]