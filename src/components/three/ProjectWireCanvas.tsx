import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Suspense, useEffect, useRef } from 'react'
import type { Group } from 'three'
import type { WireframeShape } from '../../data/projects'
import { useNearViewport } from '../../hooks/useNearViewport'
import { WireframeModel } from './WireframeModel'

type RotatingWireframeProps = {
  modelPath?: string
  fallbackShape: WireframeShape
  rotationY: number
}

function RotatingWireframe({ modelPath, fallbackShape, rotationY }: RotatingWireframeProps) {
  const groupRef = useRef<Group>(null)
  const invalidate = useThree((state) => state.invalidate)

  useEffect(() => {
    invalidate()
  }, [rotationY, invalidate])

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = rotationY
    }
  })

  return (
    <group ref={groupRef}>
      <WireframeModel modelPath={modelPath} fallbackShape={fallbackShape} />
    </group>
  )
}

type ProjectWireCanvasProps = {
  modelPath?: string
  fallbackShape: WireframeShape
  rotationY: number
}

export function ProjectWireCanvas({
  modelPath,
  fallbackShape,
  rotationY,
}: ProjectWireCanvasProps) {
  const [mountRef, near] = useNearViewport('200px')

  return (
    <div
      ref={mountRef}
      className="hairline-border aspect-square w-full max-w-[240px] bg-bg-elevated/50"
      aria-hidden
    >
      {near ? (
        <Canvas
          frameloop="demand"
          className="h-full w-full"
          camera={{ position: [0, 0, 3.2], fov: 38 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
        >
          <color attach="background" args={['#12141c']} />
          <Suspense fallback={null}>
            <RotatingWireframe
              modelPath={modelPath}
              fallbackShape={fallbackShape}
              rotationY={rotationY}
            />
          </Suspense>
        </Canvas>
      ) : (
        <div className="h-full w-full animate-pulse bg-white/5" />
      )}
    </div>
  )
}
