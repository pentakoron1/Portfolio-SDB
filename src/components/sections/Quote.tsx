import {Section} from "../layout/Section.tsx";
import {quote} from "../../data/quote.ts";
import ReactMarkdown from "react-markdown";

export function Quote() {
    return (
        <Section id="fes" eyebrow="sef" title="sefefss">
            <h1 className="text-xl font-bold">  <ReactMarkdown>{quote.text}</ReactMarkdown>
            </h1>
        </Section>
    )
}