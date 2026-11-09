import React from "react";
import { scrollToSection } from "../utils/scrollToSection";

const LINKS = [
  { id: "about", label: "ABOUT" },
  { id: "experience", label: "EXPERIENCE" },
  { id: "skills", label: "SKILLS" },
  { id: "projects", label: "PROJECTS" },
  { id: "contact", label: "CONTACT" },
];

export default function Navbar({ visible }) {
  const onClick = (id) => (e) => {
    e.preventDefault();
    scrollToSection(id);
  };

  return (
    <nav
      aria-label="Main"
      className={`
        fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50
        max-w-[calc(100vw-1rem)]
        transition-all duration-500
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5 pointer-events-none"}
      `}
      inert={!visible}
    >
      <ul
        className="
          flex items-center
          px-2 md:px-3 py-1
          rounded-full
          bg-[#EEEEEE]/80 backdrop-blur-md
          border border-black/10
          shadow-[0_4px_20px_rgba(0,0,0,0.06)]
          text-[10px] sm:text-xs md:text-sm
          font-medium tracking-wider sm:tracking-widest
          whitespace-nowrap
        "
      >
        {LINKS.map((link, i) => (
          <li key={link.id} className="flex items-center">
            {i > 0 && <span className="w-px h-4 bg-black/30 mx-0.5 sm:mx-1" aria-hidden="true" />}
            <a
              href={`#${link.id}`}
              onClick={onClick(link.id)}
              className="block px-2 sm:px-3 md:px-4 py-2 text-[#111] hover:opacity-60 transition-opacity"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
