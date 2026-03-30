import React from "react";

const scrollToSection = (id, offset = 0) => {
  const el = document.getElementById(id);

  const y =
    el.getBoundingClientRect().top +
    window.scrollY +
    offset;

  window.scrollTo({
    top: y,
    behavior: "smooth",
  });
};

export default function Navbar({ visible }) {
  return (
    <div
      className={`
        fixed top-6 left-1/2 -translate-x-1/2
        transition-all duration-500
        z-50
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5 pointer-events-none"}
      `}
    >
      <div className="
        flex items-center
        text-sm md:text-base
        font-medium
        tracking-widest
      ">
        <a
          onClick={() => scrollToSection("about", 600)}
          className="px-4 py-2 cursor-pointer"
        >
          ABOUT
        </a>

        <div className="w-px h-5 bg-black mx-2" />

        <a
          onClick={() => scrollToSection("projects", 300)}
          className="px-4 py-2 cursor-pointer"
        >
          PROJECTS
        </a>

        <div className="w-px h-5 bg-black mx-2" />

        <a href="#contact" className="px-4 py-2 hover:opacity-60 transition">
          CONTACT
        </a>
      </div>
    </div>
  );
}