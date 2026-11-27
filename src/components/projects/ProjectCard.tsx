import type { Project } from '../../data/projects'
import ReactMarkdown from 'react-markdown'
import {ProjectMediaView} from "./ProjectMediaView.tsx";



export function ProjectCard({ project }: { project: Project }) {
    const m = project.media
    const hasSide = m !== undefined && m.type !== 'banner'

    return (
        <article className="border-b border-border py-14 last:border-b-0">
            {m?.type === 'banner' && (
                <div className="mb-8 aspect-[3/1] overflow-hidden">
                    <ProjectMediaView media={m} />
                </div>
            )}

            <div className="relative md:min-h-105">
                {hasSide && (
                    <div
                        className={`mb-8 h-72 overflow-hidden md:absolute md:inset-y-0 md:right-0 md:mb-0 md:h-auto md:w-1/2 ${
                            m.type === 'model' ? 'cursor-grab active:cursor-grabbing' : ''
                        }`}
                    >
                        <ProjectMediaView media={m} />
                    </div>
                )}

                <div className={`relative z-10 max-w-prose space-y-4 ${hasSide ? 'md:max-w-[45%]' : ''}`}>
                    <h3 className="text-xl font-semibold tracking-tight md:text-2xl">{project.title}</h3>
                    <div className="max-w-prose space-y-3 leading-relaxed text-muted">
                        <ReactMarkdown>{project.description}</ReactMarkdown>
                    </div>
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
            </div>

            {/* expandable panel: unchanged */}
        </article>
    )
}