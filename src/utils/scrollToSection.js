import { prefersReducedMotion } from "../hooks/usePrefersReducedMotion";

const NAV_OFFSET = 88; // height of the floating navbar plus some breathing room

// Scrolls to a section by id. Sections with a scroll-driven reveal (data-reveal)
// scroll to the point where their content is fully in view, which is halfway
// through the section's scroll range (see ScrollReveal.jsx). On phones About isn't
// pinned, so it falls back to a normal scroll.
export function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;

  const rect = el.getBoundingClientRect();
  const top = rect.top + window.scrollY;
  const vh = window.innerHeight;

  const pinned = el.hasAttribute("data-reveal") && rect.height > vh * 1.5;
  const y = pinned
    ? top + 0.5 * (rect.height + vh) - vh
    : top - NAV_OFFSET;

  window.scrollTo({ top: Math.max(0, y), behavior: prefersReducedMotion() ? "auto" : "smooth" });
  history.replaceState(null, "", `#${id}`);
}
