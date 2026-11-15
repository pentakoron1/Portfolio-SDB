import { Suspense, useRef, type RefObject } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import type { Group } from 'three'
import type { Project } from '../../data/projects'
import { Model } from './Model'
import { PlaceholderMesh } from './PlaceholderMesh'
import { ModelErrorBoundary } from './ModelErrorBoundary'

function Spinner({ project, dragYaw }: { project: Project; dragYaw: RefObject<number> }) {
    const ref = useRef<Group>(null)

    useFrame(() => {
        if (ref.current) ref.current.rotation.y = window.scrollY * 0.003 + dragYaw.current
    })

    return (
        <group ref={ref} position={[0, 0, 0]}>
            {project.modelPath ? (
                <ModelErrorBoundary key={project.id} fallback={<PlaceholderMesh />}>
                    <Suspense fallback={null}>
                        <Model path={project.modelPath} />
                    </Suspense>
                </ModelErrorBoundary>
            ) : (
                <PlaceholderMesh />
            )}
        </group>
    )
}

export function ProjectViewer({
                                      project,
                                      dragYaw,
                                  }: {
    project: Project | null
    dragYaw: RefObject<number>
}) {
    const lastX = useRef<number | null>(null)

    return (
        <div
            className={`fixed inset-y-0 right-0 z-20 w-full touch-pan-y transition-opacity duration-500 md:w-1/2 ${
                project
                    ? 'pointer-events-none opacity-100 md:pointer-events-auto md:cursor-grab md:active:cursor-grabbing'
                    : 'pointer-events-none opacity-0'
            }`}
            onPointerDown={(e) => {
                lastX.current = e.clientX
                e.currentTarget.setPointerCapture(e.pointerId)
            }}
            onPointerMove={(e) => {
                if (lastX.current === null) return
                dragYaw.current += (e.clientX - lastX.current) * 0.01
                lastX.current = e.clientX
            }}
            onPointerUp={() => { lastX.current = null }}
            onPointerCancel={() => { lastX.current = null }}
            aria-hidden
        >
            <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 6], fov: 45 }}>
                <ambientLight intensity={0.8} />
                <directionalLight position={[3, 3, 5]} />
                {project && <Spinner project={project} dragYaw={dragYaw} />}
            </Canvas>
        </div>
    )
}