import { Center, useGLTF } from '@react-three/drei'
import { useMemo } from 'react'
import { MeshBasicMaterial, type Group, type Mesh } from 'three'
import type { WireframeShape } from '../../data/projects'
import { ProceduralWireframe } from './ProceduralWireframe'

const ACCENT = '#5eead4'

function applyWireframeMaterials(root: Group) {
  root.traverse((child) => {
    if ((child as Mesh).isMesh) {
      const mesh = child as Mesh
      mesh.material = new MeshBasicMaterial({
        color: ACCENT,
        wireframe: true,
        transparent: true,
        opacity: 0.9,
      })
    }
  })
}

type GltfWireframeProps = {
  path: string
}

function GltfWireframe({ path }: GltfWireframeProps) {
  const { scene } = useGLTF(path)
  const cloned = useMemo(() => {
    const copy = scene.clone(true) as Group
    applyWireframeMaterials(copy)
    return copy
  }, [scene])

  return (
    <Center>
      <primitive object={cloned} />
    </Center>
  )
}

type WireframeModelProps = {
  modelPath?: string
  fallbackShape: WireframeShape
}

export function WireframeModel({ modelPath, fallbackShape }: WireframeModelProps) {
  if (modelPath) {
    return <GltfWireframe path={modelPath} />
  }
  return (
    <Center>
      <ProceduralWireframe shape={fallbackShape} />
    </Center>
  )
}
