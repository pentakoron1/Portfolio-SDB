import type { WireframeShape } from '../../data/projects'

const ACCENT = '#5eead4'

type ProceduralWireframeProps = {
  shape: WireframeShape
}

export function ProceduralWireframe({ shape }: ProceduralWireframeProps) {
  const material = (
    <meshBasicMaterial color={ACCENT} wireframe transparent opacity={0.9} />
  )

  switch (shape) {
    case 'torus':
      return (
        <mesh>
          <torusGeometry args={[0.85, 0.28, 16, 32]} />
          {material}
        </mesh>
      )
    case 'octahedron':
      return (
        <mesh>
          <octahedronGeometry args={[1.05, 0]} />
          {material}
        </mesh>
      )
    case 'dodecahedron':
      return (
        <mesh>
          <dodecahedronGeometry args={[0.95, 0]} />
          {material}
        </mesh>
      )
    case 'icosahedron':
    default:
      return (
        <mesh>
          <icosahedronGeometry args={[1, 1]} />
          {material}
        </mesh>
      )
  }
}
