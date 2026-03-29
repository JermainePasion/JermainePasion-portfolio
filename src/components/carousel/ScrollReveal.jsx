import React, { useEffect, useRef, useState } from "react";

const ScrollReveal = ({ children, enterFrom = "left", exitTo = "right" }) => {
  const ref = useRef(null);
  const [state, setState] = useState("hidden"); // hidden | visible | exiting

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const getTranslate = (direction) => {
      switch (direction) {
        case "left":  return "translateX(-60px)";
        case "right": return "translateX(60px)";
        case "up":    return "translateY(-60px)";
        case "down":  return "translateY(60px)";
        default:      return "translateX(-60px)";
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("visible");
        } else {
          setState("hidden");
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const getStyle = () => {
    const base = {
      transition: "opacity 0.6s ease, transform 0.6s ease",
    };
    if (state === "visible") {
      return { ...base, opacity: 1, transform: "translate(0, 0)" };
    }
    if (state === "hidden") {
      return { ...base, opacity: 0, transform: `translateX(-60px)` };
    }
    return base;
  };

  return (
    <div ref={ref} style={getStyle()}>
      {children}
    </div>
  );
};

export default ScrollReveal;