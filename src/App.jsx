import React, { useEffect, useState } from "react";
import TypingName from "./components/TypingName";
import Navbar from "./components/Navbar";
import EmblaCarousel from "./components/carousel/EmblaCarousel";
import AboutSection from "./components/AboutSection";
import Experience from "./components/Experience";
import ScrollReveal from "./components/ScrollReveal";
import Skills from "./components/Skills";
import ContactMe from "./components/ContactMe";
import Footer from "./components/Footer";
import projects from "./data/projects";

import "./components/css/CarouselModal.css";
import "./components/css/EmblaCarousel.css";

const OPTIONS = {
  align: "center",
  loop: false,
  containScroll: false,
  axis: "y",
};

export default function App() {
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowNavbar(window.scrollY > 150);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Navbar visible={showNavbar} />

      <main>
        <section className="h-screen flex items-center justify-center">
          <TypingName />
        </section>

        {/* Tall sections with a sticky inner box: the content animates in and out as you scroll (ScrollReveal). */}
        <section
          id="about"
          data-reveal
          className="relative flex items-center justify-center overflow-x-clip min-h-[200vh] md:min-h-[250vh]"
        >
          <div className="sticky top-1/2 -translate-y-1/2 w-full">
            <ScrollReveal enterFrom="left" exitTo="right">
              <AboutSection />
            </ScrollReveal>
          </div>
        </section>

        <section id="experience" className="scroll-mt-20">
          <Experience />
        </section>

        <section id="skills" className="scroll-mt-20">
          <Skills />
        </section>

        <section
          id="projects"
          data-reveal
          className="relative flex items-center justify-center overflow-x-clip min-h-[max(900px,170vh)]"
        >
          <div className="sticky top-1/2 -translate-y-1/2 w-full py-20">
            <ScrollReveal enterFrom="right" exitTo="left">
              <EmblaCarousel slides={projects} options={OPTIONS} />
            </ScrollReveal>
          </div>
        </section>

        <section id="contact" className="min-h-screen flex items-center justify-center scroll-mt-20">
          <ContactMe />
        </section>
      </main>

      <Footer />
    </>
  );
}
