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

const OPTIONS = {
  align: "center",
  loop: false,
  containScroll: "trimSnaps",
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

  return (
    <>
      <Navbar visible={showNavbar} />

      <section className="h-screen flex items-center justify-center">
        <TypingName />
      </section>

      {/* About — tall section, enters from left, exits right */}
      <section
        className="overflow-x-hidden"
        style={{
          minHeight: "190vh",
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

      {/* Carousel — tall section, enters from right, exits left */}
      <section
        className="overflow-x-hidden"
        style={{
          minHeight: "170vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <div style={{ position: "sticky", top: "50%", transform: "translateY(-50%)", width: "100%", padding: "5rem 0" }}>
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