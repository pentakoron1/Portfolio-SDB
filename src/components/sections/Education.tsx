import { Section } from '../layout/Section'
import { education} from '../../data/education.ts'
import ReactMarkdown from 'react-markdown'

export function Education() {
    return (
        <Section id="about" eyebrow="Signal" title="Education">
            <div className="grid gap-10 md:grid-cols-[1.1fr_1fr] md:gap-16">
                <ReactMarkdown>{education.description}</ReactMarkdown>
            </div>
        </Section>
    )
}