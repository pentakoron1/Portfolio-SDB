import { Environment, OrbitControls } from '@react-three/drei'
import type { ReactNode } from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

type HeroSceneProps = {
  children: ReactNode
}

export function HeroScene({ children }: HeroSceneProps) {
  const reduced = usePrefersReducedMotion()

  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 3]} intensity={1.2} />
      <Environment preset="night" />
      {children}
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate={!reduced}
        autoRotateSpeed={0.6}
        maxPolarAngle={Math.PI / 1.8}
        minPolarAngle={Math.PI / 4}
      />
    </>
  )
}
