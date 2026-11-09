import React, { useEffect, useRef } from "react";
import ProjectLinks from "./ProjectLinks";

const CarouselModal = ({ slide, onClose }) => {
  const closeRef = useRef(null);
  const dialogRef = useRef(null);

  // Escape closes, focus moves into the dialog, page scroll is locked while open.
  useEffect(() => {
    const previouslyFocused = document.activeElement;
    closeRef.current?.focus();

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      // keep Tab inside the dialog
      const focusables = dialogRef.current.querySelectorAll("a[href], button");
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
      previouslyFocused?.focus?.({ preventScroll: true });
    };
  }, [onClose]);

  if (!slide) return null;

  return (
    <div className="carousel-modal-backdrop" onClick={onClose}>
      <div
        ref={dialogRef}
        className="carousel-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="carousel-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          className="modal-close"
          aria-label="Close"
          onClick={onClose}
        >
          ✕
        </button>

        <div className="modal-image">
          <img src={slide.image} alt={`Screenshot of ${slide.title}`} />
        </div>

        <div className="modal-content">
          <h3 id="carousel-modal-title" className="modal-title">
            {slide.title}
          </h3>

          <p className="modal-description">{slide.description}</p>

          <ProjectLinks slide={slide} className="modal-links" />

          <p className="modal-role">Role: {slide.role}</p>

          <ul className="modal-tech" aria-label="Built with">
            {slide.tech?.map((t) => (
              <li key={t.name}>
                <img src={t.icon} alt={t.name} title={t.name} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CarouselModal;
