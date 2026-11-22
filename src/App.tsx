import { Footer } from './components/layout/Footer'
import { Hero } from './components/sections/Hero'
import { Projects } from './components/sections/Projects'
import { InterestsGraph } from './components/sections/InterestsGraph'
import {Education} from "./components/sections/Education.tsx";
import {Gallery} from "./components/sections/Gallery.tsx";

function App() {
    return (
        <>

            <main>
                <Hero/>
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
