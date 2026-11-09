import React, { useEffect, useState } from "react";
import site from "../data/site";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";
import { scrollToSection } from "../utils/scrollToSection";

const NAME = site.name.toUpperCase();
const ROLE = site.title;

// Set at build time in vite.config.js: true when the resume PDF is in /public.
// The typeof check keeps the page working if the dev server was started before
// vite.config.js defined it (restart `npm run dev` to pick it up).
const HAS_RESUME = typeof __HAS_RESUME__ !== "undefined" && __HAS_RESUME__; // eslint-disable-line no-undef

export default function TypingName() {
  const reducedMotion = usePrefersReducedMotion();
  const [nameLen, setNameLen] = useState(0);
  const [roleLen, setRoleLen] = useState(0);
  const [opacity, setOpacity] = useState(1);

  const nameDone = reducedMotion || nameLen >= NAME.length;
  const roleDone = reducedMotion || roleLen >= ROLE.length;

  // Type the name, then the role.
  useEffect(() => {
    if (reducedMotion) return;
    let interval;
    let timeout;

    if (nameLen < NAME.length) {
      interval = setInterval(() => {
        setNameLen((n) => {
          if (n + 1 >= NAME.length) clearInterval(interval);
          return n + 1;
        });
      }, 120);
    } else {
      timeout = setTimeout(() => {
        interval = setInterval(() => {
          setRoleLen((n) => {
            if (n + 1 >= ROLE.length) clearInterval(interval);
            return n + 1;
          });
        }, 100);
      }, 300);
    }

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [reducedMotion, nameLen >= NAME.length]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const handleScroll = () => {
      setOpacity(Math.max(1 - window.scrollY / 200, 0));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const displayName = reducedMotion ? NAME : NAME.slice(0, nameLen);
  const displayRole = reducedMotion ? ROLE : ROLE.slice(0, roleLen);

  const goTo = (id) => (e) => {
    e.preventDefault();
    scrollToSection(id);
  };

  return (
    <div
      style={{ opacity, visibility: opacity === 0 ? "hidden" : "visible" }}
      className="text-center px-4"
    >
      <h1
        aria-label={`${site.name}, ${ROLE}`}
        className="font-bold tracking-widest select-none text-[1.4rem] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
      >
        <span aria-hidden="true">
          {displayName}
          {!nameDone && <span className="animate-pulse">|</span>}
        </span>
      </h1>

      <p
        aria-hidden="true"
        className="mt-4 min-h-[1.5em] font-medium tracking-wide text-lg sm:text-xl md:text-2xl lg:text-3xl text-[#5f5f5f] select-none"
      >
        {displayRole}
      </p>

      <div
        className={`mt-10 flex flex-wrap items-center justify-center gap-3 transition-opacity duration-700 ${
          roleDone ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <a
          href="#projects"
          onClick={goTo("projects")}
          className="px-6 py-2.5 bg-[#111] text-white text-sm font-medium tracking-widest border border-[#111] hover:bg-transparent hover:text-[#111] transition-colors"
        >
          VIEW PROJECTS
        </a>
        {HAS_RESUME && (
          <a
            href={site.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 text-sm font-medium tracking-widest border border-[#111] text-[#111] hover:bg-[#111] hover:text-white transition-colors"
          >
            RESUME
          </a>
        )}
        <a
          href="#contact"
          onClick={goTo("contact")}
          className="px-6 py-2.5 text-sm font-medium tracking-widest border border-[#111] text-[#111] hover:bg-[#111] hover:text-white transition-colors"
        >
          CONTACT
        </a>
      </div>
    </div>
  );
}
