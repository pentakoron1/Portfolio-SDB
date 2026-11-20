import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { About } from './components/sections/About'
import { Hero } from './components/sections/Hero'
import { Projects } from './components/sections/Projects'
import { InterestsGraph } from './components/sections/InterestsGraph'
import {Education} from "./components/sections/Education.tsx";
import {Gallery} from "./components/sections/Gallery.tsx";

function App() {
    return (
        <>
            <a
                href="#about"
                className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-bg focus:px-4 focus:py-2 focus:font-mono focus:text-sm"
            >
                Skip to content
            </a>
            <Header/>
            <main>
                <Hero/>
                <About/>
                <Projects/>
                <Education/>
                <InterestsGraph/>
                <Gallery/>
            </main>
            <Footer/>
        </>
    );
}

export default App
