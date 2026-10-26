import { Section } from '../layout/Section'

const focusAreas = [
  {
    title: 'Systems',
    body: 'End-to-end architecture from requirements through deployment, with observability built in from day one.',
  },
  {
    title: 'Embedded',
    body: 'Firmware, drivers, and hardware bring-up on resource-constrained targets with rigorous test coverage.',
  },
  {
    title: 'Interface',
    body: 'Operator tools and APIs that stay fast under load and readable under stress.',
  },
]

export function About() {
  return (
    <Section id="about" eyebrow="Signal" title="About">
      <div className="grid gap-10 md:grid-cols-[1.1fr_1fr] md:gap-16">
        <p className="text-lg leading-relaxed text-muted">
          I am an engineer focused on dependable systems — where software meets hardware and margins for
          error are thin. I prefer small, sharp teams, explicit interfaces, and instruments that tell the
          truth when something drifts off-nominal.
        </p>
        <ul className="space-y-6">
          {focusAreas.map((area) => (
            <li key={area.title} className="hairline-border border-l-2 border-l-accent/50 pl-5">
              <h3 className="font-mono text-xs uppercase tracking-wider text-accent">{area.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{area.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
