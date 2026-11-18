import { Section } from '../layout/Section'
import { highschool, college} from '../../data/highschool.ts'
import ReactMarkdown from 'react-markdown'

export function Education() {
    return (
        <Section id="about" eyebrow="Signal" title="Education">
            <h1 className="text-xl font-bold"> {highschool.title} </h1>
            <div className="max-w-prose space-y-3 leading-relaxed text-muted">
                <ReactMarkdown>{highschool.description}</ReactMarkdown>
            </div>
            <h1 className="text-xl font-bold"> {college.title} </h1>
            <div className="max-w-prose space-y-3 leading-relaxed text-muted">
                <ReactMarkdown>{college.description}</ReactMarkdown>
            </div>
        </Section>
    )
}