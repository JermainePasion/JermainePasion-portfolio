import React, { useState, useRef, useEffect, useCallback } from "react";
import techStack from "../data/techStack";
import { prefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import "./css/About.css";

const COUNT = techStack.length;
const STEP = (2 * Math.PI) / COUNT;
const R = 175;
const SIZE = R * 2 + 100;
const CX = SIZE / 2;
const CY = SIZE / 2;

const TechIcon = ({ tech, size = 28 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
    {tech.paths.map((d, i) => (
      <path key={i} d={d} />
    ))}
  </svg>
);

// Index of the item closest to the top of the ring for a given rotation.
const getActiveIndex = (a) => {
  let best = 0;
  let bestDist = Infinity;
  for (let i = 0; i < COUNT; i++) {
    const theta = a + i * STEP;
    const dist = Math.abs(Math.atan2(Math.sin(theta), Math.cos(theta)));
    if (dist < bestDist) {
      bestDist = dist;
      best = i;
    }
  }
  return best;
};

// Rotation that puts item `index` at the top, using the turn nearest to `current`.
const angleFor = (index, current) => {
  const ideal = -index * STEP;
  const turns = Math.round((current - ideal) / (2 * Math.PI));
  return ideal + turns * 2 * Math.PI;
};

export default function AboutSection() {
  const [angle, setAngle] = useState(0);
  const dragging = useRef(false);
  const lastX = useRef(0);
  const lastY = useRef(0);
  const velocityRef = useRef(0);
  const angleRef = useRef(0);
  const rafRef = useRef(null);
  const containerRef = useRef(null);

  const setAngleBoth = useCallback((a) => {
    angleRef.current = a;
    setAngle(a);
  }, []);

  const snapToNearest = useCallback(
    (current) => setAngleBoth(angleFor(getActiveIndex(current), current)),
    [setAngleBoth]
  );

  const startInertia = useCallback(
    (vel) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (prefersReducedMotion()) {
        snapToNearest(angleRef.current);
        return;
      }
      let v = vel;
      const tick = () => {
        v *= 0.91;
        setAngleBoth(angleRef.current + v);
        if (Math.abs(v) > 0.003) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          snapToNearest(angleRef.current);
        }
      };
      rafRef.current = requestAnimationFrame(tick);
    },
    [snapToNearest, setAngleBoth]
  );

  const onMouseDown = useCallback((e) => {
    if (e.button !== 0) return;
    dragging.current = true;
    lastX.current = e.clientX;
    lastY.current = e.clientY;
    velocityRef.current = 0;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    e.preventDefault();
  }, []);

  const onMouseMove = useCallback(
    (e) => {
      if (!dragging.current) return;
      const dx = e.clientX - lastX.current;
      const dy = e.clientY - lastY.current;
      const delta = (dx - dy) * 0.013;
      velocityRef.current = delta;
      setAngleBoth(angleRef.current + delta);
      lastX.current = e.clientX;
      lastY.current = e.clientY;
    },
    [setAngleBoth]
  );

  const onMouseUp = useCallback(() => {
    if (!dragging.current) return;
    dragging.current = false;
    startInertia(velocityRef.current);
  }, [startInertia]);

  // Touch: horizontal swipes turn the ring; vertical swipes scroll the page (touch-action: pan-y).
  const onTouchStart = useCallback((e) => {
    lastX.current = e.touches[0].clientX;
    velocityRef.current = 0;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  }, []);

  const onTouchMove = useCallback(
    (e) => {
      const x = e.touches[0].clientX;
      const delta = (x - lastX.current) * 0.013;
      velocityRef.current = delta;
      setAngleBoth(angleRef.current + delta);
      lastX.current = x;
    },
    [setAngleBoth]
  );

  const onTouchEnd = useCallback(() => {
    startInertia(velocityRef.current);
  }, [startInertia]);

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [onMouseMove, onMouseUp]);

  useEffect(
    () => () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    },
    []
  );

  const selectItem = (i) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setAngleBoth(angleFor(i, angleRef.current));
  };

  const onRingKeyDown = (e) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    const dir = e.key === "ArrowRight" ? 1 : -1;
    selectItem((getActiveIndex(angleRef.current) + dir + COUNT) % COUNT);
  };

  const activeIndex = getActiveIndex(angle);
  const active = techStack[activeIndex];

  return (
    <section className="w-full max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 flex flex-col md:flex-row items-center gap-12 md:gap-20">
      <div className="flex-shrink-0 flex flex-col items-center w-full md:w-auto select-none">
        <div className="ring-outer-wrap">
          <div
            ref={containerRef}
            className="ring-outer"
            style={{ width: SIZE, height: SIZE }}
            onMouseDown={onMouseDown}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onKeyDown={onRingKeyDown}
            role="group"
            aria-label="Tech stack"
          >
            <svg
              className="absolute inset-0 pointer-events-none"
              width={SIZE}
              height={SIZE}
              viewBox={`0 0 ${SIZE} ${SIZE}`}
              aria-hidden="true"
            >
              <circle
                cx={CX}
                cy={CY}
                r={R}
                fill="none"
                stroke="rgba(0,0,0,0.14)"
                strokeWidth="1"
                strokeDasharray="3 8"
              />
            </svg>

            <div className="ring-center" aria-live="polite">
              <span style={{ color: active.color }} className="flex items-center transition-colors">
                <TechIcon tech={active} />
              </span>
              <span className="ring-center-label">{active.label}</span>
            </div>

            {techStack.map((tech, i) => {
              const theta = angle + i * STEP - Math.PI / 2;
              const x = CX + R * Math.cos(theta);
              const y = CY + R * Math.sin(theta);
              const isActive = i === activeIndex;

              return (
                <button
                  type="button"
                  key={tech.label}
                  onClick={() => selectItem(i)}
                  title={tech.label}
                  aria-label={tech.label}
                  aria-pressed={isActive}
                  className={`ring-item ${isActive ? "is-active" : ""}`}
                  style={{ left: x, top: y, "--c": tech.color }}
                >
                  <TechIcon tech={tech} size={isActive ? 30 : 24} />
                </button>
              );
            })}
          </div>
        </div>
        <p className="mt-2 text-[10px] tracking-[0.15em] uppercase text-black/40">
          drag · tap
        </p>
      </div>

      <div className="flex flex-col items-center md:items-start gap-6 flex-1 min-w-0 text-center md:text-left w-full">
        <div className="w-[200px] h-[200px] rounded-full overflow-hidden border border-black/15 bg-[#ddd] shrink-0">
          <img
            src="/Jermaine.webp"
            alt="Jermaine Pasion"
            width="400"
            height="400"
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <h2 className="text-[26px] font-semibold text-[#2D2C2C] mb-2.5 tracking-[-0.015em]">
            Who I Am
          </h2>
          <p className="text-[15px] leading-[1.85] text-[#2D2C2C] max-w-[400px] m-0">
            I'm a full-stack developer at Clean Edge Manpower Solutions, building the company's HR
            system on web and mobile. I graduated in Computer Engineering from Holy Angel University
            in 2026, and I work mainly with React, React Native, TypeScript and Supabase.
          </p>
        </div>
      </div>
    </section>
  );
}
