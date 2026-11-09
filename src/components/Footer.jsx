import React from "react";
import site from "../data/site";
import socials from "../data/socials";

export default function Footer() {
  return (
    <footer className="bg-[#2D2C2C] text-[#eeeeee]">
      <div className="container px-6 py-12 mx-auto">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 text-center sm:text-left place-items-center">
          <div className="flex flex-col items-center sm:items-start">
            <p className="font-semibold">Email</p>
            <a
              href={`mailto:${site.email}`}
              className="mt-4 hover:underline hover:text-[#8ab4f8] transition"
            >
              {site.email}
            </a>
          </div>

          <div className="flex flex-col items-center sm:items-start">
            <p className="font-semibold">Also on</p>
            <a
              href={site.jobs180Url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 hover:underline hover:text-[#8ab4f8] transition"
            >
              Jobs180
            </a>
          </div>
        </div>

        <hr className="my-8 border-gray-600" />

        <ul className="flex justify-center items-center gap-5">
          {socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                title={s.label}
                className="block text-[#eeeeee] hover:text-[#8ab4f8] transition"
              >
                <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true">
                  <path d={s.path} />
                </svg>
              </a>
            </li>
          ))}
        </ul>

        <p className="text-center text-sm md:text-base mt-6">{site.fullName}</p>
      </div>
    </footer>
  );
}
