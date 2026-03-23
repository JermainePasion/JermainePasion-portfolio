import React, { useEffect, useRef } from "react";

const STYLE_ID = "scroll-reveal-styles";

function injectStyles() {
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = `.sr-wrap { will-change: transform, opacity; }`;
  document.head.appendChild(style);
}

function calcTransform(progress, enterFrom, exitTo) {
  const p = Math.max(0, Math.min(1, progress));

  let tx, ty, rot, opacity;

  if (p <= 0.5) {
    const t = p / 0.5;

    // smoother, longer ease
    const ease = 1 - Math.pow(1 - t, 2.5);

    const fromX = enterFrom === "left" ? -400 : 400;

    tx = fromX * (1 - ease);

    // 🔥 START HIGH, curve DOWN into center
    ty = -200 * (1 - ease);  

    rot = (enterFrom === "left" ? -35 : 35) * (1 - ease);

    opacity = Math.min(1, ease * 1.6);

  } else {
    const t = (p - 0.5) / 0.5;

    const ease = Math.pow(t, 2);

    const toX = exitTo === "right" ? 140 : -140;

    tx = toX * ease;

    // 🔥 KEEP GOING UP (not symmetric anymore)
    ty = -200 * ease;

    rot = (exitTo === "right" ? 20 : -20) * ease;

    opacity = Math.max(0, 1 - ease * 1.6);
  }

  return { tx, ty, rot, opacity };
}
/**
 * sectionRef — ref to the TALL outer section (200vh)
 * The animation progress is based on that section's scroll position,
 * so progress=0.5 only when the section's true center is in the viewport center.
 */
export default function ScrollReveal({ enterFrom = "left", exitTo = "right", sectionRef, children }) {
  const wrapRef = useRef(null);
  const rafRef  = useRef(null);

  useEffect(() => {
    injectStyles();
    const el = wrapRef.current;
    if (!el) return;

    const update = () => {
      // Use the passed sectionRef if available, otherwise fall back up the DOM
      const section = sectionRef?.current ?? el.parentElement?.parentElement;
      if (!section) return;

      const rect     = section.getBoundingClientRect();
      const vh       = window.innerHeight;

      // progress 0: section top == viewport bottom (just about to enter)
      // progress 0.5: section center == viewport center
      // progress 1: section bottom == viewport top (fully exited)
      const total    = rect.height + vh;
      const passed   = vh - rect.top;
      const rawProgress = passed / total;
      const progress = Math.max(0, Math.min(1, (rawProgress - 0.15) / 0.7));

      const { tx, ty, rot, opacity } = calcTransform(progress, enterFrom, exitTo);
      el.style.transform = `translateX(${tx}px) translateY(${ty}px) rotate(${rot}deg)`;
      el.style.opacity   = String(opacity);
    };

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update,   { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [enterFrom, exitTo, sectionRef]);

  return (
    <div ref={wrapRef} className="sr-wrap" style={{ width: "100%", opacity: 0 }}>
      {children}
    </div>
  );
}