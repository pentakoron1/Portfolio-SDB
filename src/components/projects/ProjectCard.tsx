import { useRef} from 'react'
import type { Project } from '../../data/projects'
import { useCardScrollRotation } from '../../hooks/useCardScrollRotation'
import { ProjectWireCanvas } from '../three/ProjectWireCanvas'

type ProjectCardProps = {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const cardRef = useRef<HTMLElement>(null)
  const rotationY = useCardScrollRotation(cardRef, { turns: 0.75 })

  return (
      <article
          ref={cardRef}
          className="relative overflow-hidden border-b border-border py-14 last:border-b-0"
      >
      {/* 3D layer: fills the card, behind the content, clicks pass through */}
      <div className="pointer-events-none absolute inset-0 z-0 md:left-1/2" aria-hidden>
        <ProjectWireCanvas
            modelPath={project.modelPath}
            fallbackShape={project.fallbackShape}
            rotationY={rotationY}
        />
      </div>

      {/* Content layer: on top */}
      <div className="relative z-10 max-w-prose space-y-4">
        <h3 className="text-xl font-semibold tracking-tight md:text-2xl">{project.title}</h3>
        <p className="max-w-prose text-muted leading-relaxed">{project.description}</p>
        <ul className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="hairline-border rounded-full px-3 py-1 font-mono text-xs text-accent"
            >
              {tag}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-4 pt-2">
          {project.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-mono text-xs uppercase tracking-wider text-text underline-offset-4 hover:text-accent hover:underline"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </article>
  )
}
