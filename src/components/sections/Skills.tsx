import { skillGroups } from '../../data/skills'
import { Section } from '../layout/Section'

export function Skills() {
  return (
    <Section id="skills" eyebrow="Loadout" title="Skills">
      <div className="grid gap-8 md:grid-cols-3">
        {skillGroups.map((group) => (
          <div key={group.title} className="hairline-border bg-bg-elevated/30 p-6">
            <h3 className="font-mono text-xs uppercase tracking-wider text-accent">{group.title}</h3>
            <ul className="mt-4 space-y-2">
              {group.items.map((item) => (
                <li key={item} className="text-sm text-muted">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}
