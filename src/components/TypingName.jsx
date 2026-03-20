import React from "react";
import { useEffect, useState } from "react";

export default function TypingName() {
  const text = "JERMAINE PASION";
  const [displayText, setDisplayText] = useState("");
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      setDisplayText(text.slice(0, index + 1));
      index++;

      if (index === text.length) clearInterval(interval);
    }, 120);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const fadePoint = 200;
      const newOpacity = Math.max(1 - window.scrollY / fadePoint, 0);
      setOpacity(newOpacity);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <h1
      style={{ opacity, WebkitUserDrag: "none", userSelect: "none", pointerEvents: "none" }}
      className="
        font-bold tracking-widest text-center
        transition-opacity duration-300
        text-4xl
        sm:text-5xl
        md:text-6xl
        lg:text-7xl
        xl:text-8xl
        2xl:text-9xl
        
      "
    >
      {displayText}
      <span className="animate-pulse">|</span>
    </h1>
  );
}