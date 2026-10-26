import { useGLTF } from '@react-three/drei'
import { useEffect } from 'react'
import { projectModelPaths, projects } from '../../data/projects'
import { ProjectCard } from '../projects/ProjectCard'
import { Section } from '../layout/Section'

export function Projects() {
  useEffect(() => {
    for (const path of projectModelPaths) {
      useGLTF.preload(path)
    }
  }, [])

  return (
    <Section id="projects" eyebrow="Manifest" title="Projects">
      <div className="space-y-14">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </Section>
  )
}
