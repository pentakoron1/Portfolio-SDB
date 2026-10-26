export type SkillGroup = {
  title: string
  items: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'Languages',
    items: ['TypeScript', 'Rust', 'C / C++', 'Python'],
  },
  {
    title: 'Tools',
    items: ['Git', 'Docker', 'Linux', 'CI/CD', 'CAD'],
  },
  {
    title: 'Domains',
    items: ['Embedded systems', 'Web platforms', 'Signal processing', 'Rapid prototyping'],
  },
]
