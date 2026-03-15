import React, { useEffect, useState } from "react";
import TypingName from "./components/TypingName";
import Navbar from "./components/Navbar";

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
        <p className="text-lg">Scroll content placeholder</p>
      </section>
    </>
  );
}