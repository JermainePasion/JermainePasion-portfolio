import { prefersReducedMotion } from "../hooks/usePrefersReducedMotion";

const NAV_OFFSET = 88; // height of the floating navbar plus some breathing room

// Scrolls to a section by id. Sections with a scroll-driven reveal (data-reveal)
// scroll to the point where their content is fully in view, which is halfway
// through the section's scroll range (see ScrollReveal.jsx).
export function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;

  const rect = el.getBoundingClientRect();
  const top = rect.top + window.scrollY;
  const vh = window.innerHeight;

  const y = el.hasAttribute("data-reveal")
    ? top + 0.5 * (rect.height + vh) - vh
    : top - NAV_OFFSET;

  window.scrollTo({ top: Math.max(0, y), behavior: prefersReducedMotion() ? "auto" : "smooth" });
  history.replaceState(null, "", `#${id}`);
}
