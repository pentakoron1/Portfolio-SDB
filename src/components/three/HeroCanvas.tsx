import { Canvas } from '@react-three/fiber'
import type { ReactNode } from 'react'
import { HeroScene } from './HeroScene'

type HeroCanvasProps = {
  children: ReactNode
}

export default function HeroCanvas({ children }: HeroCanvasProps) {
  return (
    <Canvas
      className="h-full w-full"
      camera={{ position: [0, 0, 4], fov: 42 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <HeroScene>{children}</HeroScene>
    </Canvas>
  )
}
