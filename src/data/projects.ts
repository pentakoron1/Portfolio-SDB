export type WireframeShape = 'icosahedron' | 'torus' | 'octahedron' | 'dodecahedron'

export type Project = {
  id: string
  title: string
  description: string
  tags: string[]
  links: { label: string; href: string }[]
  /** GLB/GLTF under /public; omit to use procedural wireframe shape */
  modelPath?: string
  fallbackShape: WireframeShape
}

export const projects: Project[] = [
  {
    id: 'cansat',
    title: 'Astoria CanSat',
    description:
        '*The winning Can-sized satellite project.*' +
        '\n\nI was part of the  **Team Astoria** from Institut Notre‑Dame d’Arlon, which won the national winner title at **CanSat Belgium**, rewarded by the opportunity to represent the country at the ESA European event (2 days trip to ESTEC) and another 5 days trip to Toulouse to explore aerospace engineering.\n',
    tags: ['Aerospace', '3D design', 'Engineering'],
    links: [{ label: 'Astoria website', href: 'https://astoria-cansat1.odoo.com' }],
    modelPath: '/models/double_helical_antennas_for_fpv_video_system.glb',
    fallbackShape: 'icosahedron',
  },
  {
    id: 'kolibrium',
    title: 'Kolibrium ',
    description:
        '*Creating the tiniest **bluetooth gaming controller** with joystick ever.*\n\n Together with 2 of my classmates, we started this project in 2025 and it is still ongoing right now. ' +
        'With a custom PCB, we managed to create (probably) the smallest controller of its kind, with integrated joystick, gyroscope, screen and 12 different buttons. ' +
        '\n\nIn the kolibrium team, I\'m responsible of all **coding**, that means managing the bluetooth connection, HID profiles, on-display graphics, etc. ' +
        'I\'m therefore trying to make the software compatible with as many operating systems as possible, with a real time interface on the display that helps the user seeing which inputs are used, as well as having battery and bluetooth information. ' +
        '\n\nI see the **user experience**  as something that should have the least amount of friction possible, without limiting the full potential of the hardware.  Our first prototype already works with windows and android, so you can already play games with it, or even control slides of a PowerPoint presentation! ',
    tags: ['electronics', 'microcontrollers', 'coding'],
    links: [{ label: 'GitHub', href: '#' }],
    modelPath: '/models/kolibrium_V1-0.glb',
    fallbackShape: 'torus',
  },
  {
    id: 'brazier-app',
    title: 'Brazier',
    description:
      '*Fully opensource personal finance app*' +
      '\n\nBrazier is an app I\'m devlopping with the **flutter** stack, that will be available cross platform. ' +
      'The core concept of Brazier is that it lets you track the use of items you bought, showing how much they costs you per month. ' +
      'You can thus also easily compare the long term rentability of a single purchase VS a subscription. ' +
      '\n\nMy goal is too make the app as user friendly as possible, while exploring concepts that no other app have used. ' +
      'The app is on the process being available for everyone on **PlayStore**, and should be available on Fdroid by the end of 2026 (the #1 open-source apps platform).',
    tags: ['Flutter', 'Mobile App', 'Open-source'],
    links: [{ label: 'Github', href: 'https://github.com/pentakoron1/brazier' }],
    fallbackShape: 'octahedron',
  },
]

export const projectModelPaths = projects
  .map((p) => p.modelPath)
  .filter((path): path is string => Boolean(path))
