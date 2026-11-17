import { useEffect, useRef, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { projectModelPaths, projects } from '../../data/projects'
import { ProjectCard } from '../projects/ProjectCard'
import { ProjectModel } from '../three/ProjectModel.tsx'
import { Section } from '../layout/Section'

export function Projects() {
    const [activeId, setActiveId] = useState<string | null>(null)
    const dragYaw = useRef(0) // extra rotation (radians) added by dragging
    const active = projects.find((p) => p.id === activeId) ?? null

    // preload the models
    useEffect(() => {
        for (const path of projectModelPaths) {
            useGLTF.preload(path)
        }
    }, [])

    // start each project at its own angle instead of inheriting the previous drag
    useEffect(() => {
        dragYaw.current = 0
    }, [activeId])

    return (
        <Section id="projects" eyebrow="Manifest" title="Projects">
            <ProjectModel project={active} dragYaw={dragYaw} />

            <div className="relative z-10 space-y-14">
                {projects.map((project) => (
                    <ProjectCard key={project.id} project={project} onActive={setActiveId} />
                ))}
            </div>
        </Section>
    )
}