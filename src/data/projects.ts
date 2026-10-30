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
    id: 'orbital-link',
    title: 'Orbital Link',
    description:
      'Low-latency ground segment tooling for telemetry ingest, visualization, and anomaly triage across distributed ground stations.',
    tags: ['Rust', 'gRPC', 'Timeseries'],
    links: [{ label: 'Case study', href: '#' }],
    //modelPath: '/models/double_helical_antennas_for_fpv_video_system.glb',
    fallbackShape: 'icosahedron',
  },
  {
    id: 'reaction-wheel',
    title: 'Reaction Wheel Controller',
    description:
      'Embedded attitude control firmware with sensor fusion, fault detection, and hardware-in-the-loop validation on a custom rig.',
    tags: ['C', 'FreeRTOS', 'Control'],
    links: [{ label: 'GitHub', href: '#' }],
    fallbackShape: 'torus',
  },
  {
    id: 'habitat-monitor',
    title: 'Habitat Monitor',
    description:
      'Environmental sensing mesh for sealed test chambers: calibration pipelines, edge aggregation, and operator dashboards.',
    tags: ['Python', 'React', 'MQTT'],
    links: [{ label: 'Demo', href: '#' }],
    fallbackShape: 'octahedron',
  },
  {
    id: 'spectral-pipeline',
    title: 'Spectral Pipeline',
    description:
      'Batch and streaming processing for instrument captures, including denoising, feature extraction, and reproducible notebooks.',
    tags: ['Python', 'NumPy', 'Parquet'],
    links: [{ label: 'Paper', href: '#' }],
    fallbackShape: 'dodecahedron',
  },
]

export const projectModelPaths = projects
  .map((p) => p.modelPath)
  .filter((path): path is string => Boolean(path))
