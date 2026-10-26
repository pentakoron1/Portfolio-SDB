import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

export function PlaceholderMesh() {
  const meshRef = useRef<import('three').Mesh>(null)
  const reduced = usePrefersReducedMotion()

  useFrame((_, delta) => {
    if (reduced || !meshRef.current) return
    meshRef.current.rotation.y += delta * 0.25
    meshRef.current.rotation.x = Math.sin(meshRef.current.rotation.y * 0.5) * 0.15
  })

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.1, 1]} />
      <meshStandardMaterial
        color="#12141c"
        emissive="#5eead4"
        emissiveIntensity={0.35}
        wireframe
        transparent
        opacity={0.85}
      />
    </mesh>
  )
}
