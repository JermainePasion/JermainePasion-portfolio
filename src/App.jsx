import React, { useEffect, useState } from "react";
import TypingName from "./components/TypingName";
import Navbar from "./components/Navbar";
import EmblaCarousel from "./components/carousel/EmblaCarousel";
import AboutSection from "./components/AboutSection";
import ScrollReveal from "./components/ScrollReveal";

import "./components/css/base.css";
import "./components/css/sandbox.css";
import "./components/css/CarouselModal.css";
import "./components/css/EmblaCarousel.css";

import slides from "./components/carousel/slide";
import Footer from "./components/Footer";
import Skills from "./components/carousel/Skills";

const OPTIONS = {
  align: "center",
  loop: false,
  containScroll: false,
  axis: "y",
};

export default function App() {
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowNavbar(window.scrollY > 150);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Clamp minHeight so the carousel section isn't impossibly tall
  // on short-viewport devices like Nest Hub (600px tall).
  // 170vh on a 600px screen = 1020px of scroll just for this section.
  // We cap it so the sticky element is reachable without excessive scrolling.
  const carouselSectionStyle = {
    minHeight: "clamp(900px, 170vh, 170vh)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  };

  return (
    <>
      <Navbar visible={showNavbar} />

      <section className="h-screen flex items-center justify-center">
        <TypingName />
      </section>

      <section
        className="overflow-x-hidden"
        style={{
          minHeight: "250vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <div style={{ position: "sticky", top: "50%", transform: "translateY(-50%)", width: "100%" }}>
          <ScrollReveal enterFrom="left" exitTo="right">
            <AboutSection />
          </ScrollReveal>
        </div>
      </section>

      <section>
        <div>
          <Skills />
        </div>
      </section>

      {/*
        minHeight clamped to avoid Nest Hub (1024×600) needing to scroll
        excessively before the sticky carousel becomes visible.
        On tall screens 170vh still applies; on short screens it floors at 900px.
      */}
      <section
        className="overflow-x-hidden"
        style={carouselSectionStyle}
      >
        <div
          style={{
            position: "sticky",
            top: "50%",
            transform: "translateY(-50%)",
            width: "100%",
            padding: "5rem 0",
          }}
        >
          <ScrollReveal enterFrom="right" exitTo="left">
            <EmblaCarousel slides={slides} options={OPTIONS} />
          </ScrollReveal>
        </div>
      </section>

      <footer>
        <Footer />
      </footer>
    </>
  );
}