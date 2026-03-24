import React, { useEffect, useState } from "react";

export default function TypingName() {
  const nameText = "JERMAINE PASION";
  const roleText = "Software Engineer";

  const [displayName, setDisplayName] = useState("");
  const [displayRole, setDisplayRole] = useState("");
  const [opacity, setOpacity] = useState(1);


  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      setDisplayName(nameText.slice(0, index + 1));
      index++;

      if (index === nameText.length) clearInterval(interval);
    }, 120);

    return () => clearInterval(interval);
  }, []);


  useEffect(() => {
    if (displayName !== nameText) return; 

    let index = 0;

    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayRole(roleText.slice(0, index + 1));
        index++;

        if (index === roleText.length) clearInterval(interval);
      }, 100);

      return () => clearInterval(interval);
    }, 300); 

    return () => clearTimeout(timeout);
  }, [displayName]);

  // Scroll fade
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
    <div
      style={{
        opacity,
        WebkitUserDrag: "none",
        userSelect: "none",
        pointerEvents: "none",
      }}
      className="text-center"
    >

      <h1
        className="
          font-bold tracking-widest
          transition-opacity duration-300
          text-4xl
          sm:text-5xl
          md:text-6xl
          lg:text-7xl
          xl:text-8xl
          2xl:text-9xl
        "
      >
        {displayName}
        <span className="animate-pulse">|</span>
      </h1>

      <h2
        className="
          mt-4
          font-medium tracking-wide
          text-lg
          sm:text-xl
          md:text-2xl
          lg:text-3xl
          xl:text-4xl
          text-gray-500
        "
      >
        {displayRole}
      </h2>
    </div>
  );
}