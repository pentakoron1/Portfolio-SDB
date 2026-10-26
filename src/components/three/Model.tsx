import { Center, useGLTF } from '@react-three/drei'
import { useMemo } from 'react'
import type { Group } from 'three'

type ModelProps = {
  path: string
}

export function Model({ path }: ModelProps) {
  const { scene } = useGLTF(path)
  const cloned = useMemo(() => scene.clone(true) as Group, [scene])

  return (
    <Center>
      <primitive object={cloned} scale={1} />
    </Center>
  )
}
