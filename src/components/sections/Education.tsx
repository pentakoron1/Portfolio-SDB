import { Section } from '../layout/Section'
import { education, college} from '../../data/education.ts'
import ReactMarkdown from 'react-markdown'

export function Education() {
    return (
        <Section id="education" eyebrow="Signal" title="Education">
            <h1 className="text-xl font-bold"> {education.title} </h1>
            <div className="max-w-prose space-y-3 leading-relaxed text-muted">
                <ReactMarkdown>{education.description}</ReactMarkdown>
            </div>
            <h1 className="text-xl font-bold mt-12"> {college.title} </h1>
            <div className="max-w-prose space-y-3 leading-relaxed text-muted">
                <ReactMarkdown>{college.description}</ReactMarkdown>
            </div>
        </Section>
    )
}