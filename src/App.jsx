import React, { useEffect, useState } from "react";
import TypingName from "./components/TypingName";
import Navbar from "./components/Navbar";
import EmblaCarousel from "./components/carousel/EmblaCarousel";
import "./components/css/base.css"
import "./components/css/embla.css"
import "./components/css/sandbox.css"



const SLIDES = [0, 1, 2, 3, 4];
const OPTIONS = {
  align: "center",
  loop: false,
  containScroll: "trimSnaps"
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
      
      <section className="h-[120vh] flex items-center justify-center">
        <EmblaCarousel slides={SLIDES} options={OPTIONS} />
      </section>
    </>
  );
}