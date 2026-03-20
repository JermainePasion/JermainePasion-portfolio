import React from "react";
export default function Navbar({ visible }) {
  return (
    <div
      className={`
        fixed top-6 left-1/2 -translate-x-1/2
        transition-all duration-500
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
          href="#projects"
          className="px-4 py-2 hover:opacity-60 transition"
        >
          ABOUT
        </a>

        <div className="w-px h-5 bg-black mx-2"></div>

        <a
          href="#about"
          className="px-4 py-2 hover:opacity-60 transition"
        >
          PROJECTS
        </a>
      </div>
    </div>
  );
}