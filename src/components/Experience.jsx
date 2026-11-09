import React from "react";
import experience from "../data/experience";

export default function Experience() {
  return (
    <section className="w-full max-w-[1100px] mx-auto px-6 md:px-12 py-20 md:py-24">
      <div className="text-center mb-12 md:mb-16">
        <p className="text-xs font-bold tracking-[0.18em] uppercase text-[#767676] mb-2.5">
          Where I've been
        </p>
        <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-extrabold text-[#111] leading-none m-0">
          Experience
        </h2>
      </div>

      <ol className="border-t border-[#e0e0e0]">
        {experience.map((item) => (
          <li
            key={`${item.org}-${item.role}`}
            className="grid md:grid-cols-[220px_1fr] gap-2 md:gap-10 py-8 border-b border-[#e0e0e0]"
          >
            <p className="text-sm font-semibold tracking-wide text-[#767676] m-0 md:pt-1">
              {item.period}
            </p>
            <div>
              <h3 className="text-xl font-bold text-[#111] m-0">{item.role}</h3>
              <p className="text-base text-[#2D2C2C] mt-1 mb-0">
                {item.org}
                {item.place && <span className="text-[#767676]"> · {item.place}</span>}
              </p>
              {item.summary && (
                <p className="text-[15px] leading-relaxed text-[#555] mt-3 mb-0 max-w-[60ch]">
                  {item.summary}
                </p>
              )}
              {item.tags?.length > 0 && (
                <ul className="flex flex-wrap gap-2 mt-4" aria-label="Main tools">
                  {item.tags.map((tag) => (
                    <li
                      key={tag}
                      className="text-xs font-medium tracking-wide px-3 py-1 rounded-full border border-[#cfcfcf] text-[#2D2C2C]"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
