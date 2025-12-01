import React from 'react';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Skills from '../components/sections/Skills';
import Projects from '../components/sections/Projects';
import Contact from '../components/sections/Contact';
import Experience from '../components/sections/Experience';
import Certifications from '../components/sections/Certifications';
import Education from '../components/sections/Education';

const HomePage = () => {
    return (
        <div>
            <Hero />
            <About />
            <Skills />
            <Experience />
            <Certifications />
            <Education/>
            
            <Projects />

            <Contact />

        </div>
    );
};

export default HomePage;