import { profile } from '../../data/profile'
import { Section } from '../layout/Section'

export function Contact() {
  return (
    <Section id="contact" eyebrow="Open channel" title="Contact">
      <div className="hairline-border max-w-xl bg-bg-elevated/30 p-8 md:p-10">
        <p className="text-muted leading-relaxed">
          For collaborations, consulting, or full-time roles — send a brief note with context and
          constraints. I reply to most messages within a few Earth days.
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-6">
          <a
            href={`mailto:${profile.email}`}
            className="font-mono text-sm text-accent underline-offset-4 hover:underline"
          >
            {profile.email}
          </a>
          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm text-muted underline-offset-4 hover:text-accent hover:underline"
          >
            GitHub
          </a>
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm text-muted underline-offset-4 hover:text-accent hover:underline"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </Section>
  )
}
