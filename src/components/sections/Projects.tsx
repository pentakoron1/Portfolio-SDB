import { projects } from '../../data/projects'
import { ProjectCard } from '../projects/ProjectCard'
import { Section } from '../layout/Section'

export function Projects() {
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