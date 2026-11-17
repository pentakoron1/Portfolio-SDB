import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Bounds, Center, OrbitControls } from '@react-three/drei'
import type { Group } from 'three'
import { Model } from './Model'
import { PlaceholderMesh } from './PlaceholderMesh'
import { ModelErrorBoundary } from './ModelErrorBoundary'

// spins around the vertical axis as the page scrolls
function ScrollSpin({ path }: { path: string }) {
    const ref = useRef<Group>(null)

    useFrame(() => {
        if (ref.current) ref.current.rotation.y = window.scrollY * 0.003
    })

    return (
        <group ref={ref}>
            <ModelErrorBoundary fallback={<PlaceholderMesh />}>
                <Suspense fallback={null}>
                    <Bounds fit margin={1.3}>
                        <Center>
                            <Model path={path} />
                        </Center>
                    </Bounds>
                </Suspense>
            </ModelErrorBoundary>
        </group>
    )
}

export function ProjectModel({ path }: { path: string }) {
    return (
        <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 6], fov: 45 }}>
            <ambientLight intensity={0.8} />
            <directionalLight position={[3, 3, 5]} />
            <ScrollSpin path={path} />
            <OrbitControls makeDefault enableZoom={false} enablePan={false} />
        </Canvas>
    )
}