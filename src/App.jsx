import React, { useEffect, useState } from "react";
import TypingName from "./components/TypingName";
import Navbar from "./components/Navbar";
import EmblaCarousel from "./components/carousel/EmblaCarousel";

import AboutSection from "./components/AboutSection";

import "./components/css/base.css";
import "./components/css/sandbox.css";
import "./components/css/CarouselModal.css";
import "./components/css/EmblaCarousel.css";

import slides from "./components/carousel/slide"
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

       <section className="flex items-center justify-center overflow-x-hidden">
        <AboutSection/>
      </section>

      <section className="flex items-center justify-center py-20">
        <EmblaCarousel slides={slides} options={OPTIONS} />
      </section>

      <footer>
        <Footer/>
      </footer>
    </>
  );
}