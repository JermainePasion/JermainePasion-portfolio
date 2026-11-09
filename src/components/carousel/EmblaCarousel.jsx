import React, { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { createPortal } from "react-dom";
import CarouselModal from "./CarouselModal";
import ProjectLinks from "./ProjectLinks";
import { DotButton } from "./EmblaCarouselDotButton";
import { useDotButton } from "./useDotButton";

const WHEEL_COOLDOWN_MS = 450;
const WHEEL_THRESHOLD = 30;

const isCompact = () => window.innerWidth <= 1280;

const EmblaCarousel = ({ slides, options }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ ...options, axis: "y" });

  const [expandedIndex, setExpandedIndex] = useState(null);
  const [modalSlide, setModalSlide] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);
  const [compact, setCompact] = useState(isCompact);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);

  // Phone and tablet open a modal; desktop expands the card in place.
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
      setCompact(isCompact());
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Dim the other slides while one is expanded.
  useEffect(() => {
    if (!emblaApi) return;
    const tween = () => {
      emblaApi.slideNodes().forEach((slide, index) => {
        slide.style.opacity = expandedIndex !== null && index !== expandedIndex ? "0.3" : "1";
      });
    };
    emblaApi.on("select", tween).on("reInit", tween);
    tween();
    return () => {
      emblaApi.off("select", tween).off("reInit", tween);
    };
  }, [emblaApi, expandedIndex]);

  // Mouse wheel moves one slide at a time, but only while there is a slide to move to.
  // At the first/last slide the wheel event is left alone so the page keeps scrolling.
  useEffect(() => {
    if (!emblaApi) return;
    let lockedUntil = 0;
    let accumulated = 0;

    const onWheel = (e) => {
      if (expandedIndex !== null) return;
      if (Math.abs(e.deltaY) < Math.abs(e.deltaX)) return;

      const goingDown = e.deltaY > 0;
      const canMove = goingDown ? emblaApi.canScrollNext() : emblaApi.canScrollPrev();
      if (!canMove) {
        accumulated = 0;
        return;
      }

      e.preventDefault();
      const now = performance.now();
      if (now < lockedUntil) return;

      accumulated += e.deltaY;
      if (Math.abs(accumulated) < WHEEL_THRESHOLD) return;

      accumulated = 0;
      lockedUntil = now + WHEEL_COOLDOWN_MS;
      if (goingDown) emblaApi.scrollNext();
      else emblaApi.scrollPrev();
    };

    const viewport = emblaApi.rootNode();
    viewport.addEventListener("wheel", onWheel, { passive: false });
    return () => viewport.removeEventListener("wheel", onWheel);
  }, [emblaApi, expandedIndex]);

  // Keep the expanded card in sync when the carousel moves.
  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      const index = emblaApi.selectedScrollSnap();
      setExpandedIndex((prev) => (prev === null ? null : index));
    };
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const openCard = (index, slide) => {
    if (!emblaApi) return;
    emblaApi.scrollTo(index);

    if (compact) {
      setModalSlide(slide);
      return;
    }
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  const onCardClick = (index, slide) => (e) => {
    if (e.target.closest("a, button")) return;
    openCard(index, slide);
  };

  const onCardKeyDown = (index, slide) => (e) => {
    if (e.target !== e.currentTarget) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openCard(index, slide);
    }
  };

  return (
    <>
      <div className={`embla-wrapper ${expandedIndex !== null ? "expanded" : ""}`}>
        <h2 className="embla-label select-none" aria-label="Projects">
          {"Projects".split("").map((char, i) => (
            <span
              key={i}
              aria-hidden="true"
              className="embla-label__char"
              style={{ "--x": isMobile || compact ? "0em" : `${i * 0.65}em` }}
            >
              {char}
            </span>
          ))}
        </h2>

        <div className={`embla ${expandedIndex !== null ? "dimmed expanded" : ""}`}>
          <div className="embla__viewport" ref={emblaRef}>
            <div className="embla__container">
              {slides.map((slide, index) => {
                const isExpanded = expandedIndex === index;

                return (
                  <div key={slide.title} className={`embla__slide ${isExpanded ? "expanded" : ""}`}>
                    <div
                      className={`embla__card ${isExpanded ? "expanded" : ""}`}
                      onClick={onCardClick(index, slide)}
                      onKeyDown={isExpanded ? undefined : onCardKeyDown(index, slide)}
                      role={isExpanded ? undefined : "button"}
                      tabIndex={isExpanded ? undefined : 0}
                      aria-label={isExpanded ? undefined : `${slide.title}: show details`}
                    >
                      <img
                        className="card-image"
                        src={slide.image}
                        alt={isExpanded ? `Screenshot of ${slide.title}` : ""}
                        loading={index === 0 ? "eager" : "lazy"}
                        decoding="async"
                        draggable="false"
                      />

                      <div className="card-overlay">
                        {isExpanded && (
                          <button
                            type="button"
                            className="close-btn"
                            aria-label="Close details"
                            onClick={() => setExpandedIndex(null)}
                          >
                            ✕
                          </button>
                        )}

                        <h3 className="card-title select-none">{slide.title}</h3>

                        {isExpanded && (
                          <div className="expanded-content">
                            <p>{slide.description}</p>
                            <ProjectLinks slide={slide} />
                            <p className="role">Role: {slide.role}</p>
                            <ul className="tech" aria-label="Built with">
                              {slide.tech?.map((t) => (
                                <li key={t.name}>
                                  <img src={t.icon} alt={t.name} title={t.name} loading="lazy" />
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="embla__dots" role="group" aria-label="Choose project">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              aria-label={`Go to ${slides[index]?.title ?? `project ${index + 1}`}`}
              aria-current={index === selectedIndex ? "true" : undefined}
              onClick={() => {
                onDotButtonClick(index);
                // only expand if already expanded (desktop)
                setExpandedIndex((prev) => (prev !== null && !compact ? index : prev));
              }}
              className={`embla__dot ${index === selectedIndex ? "embla__dot--selected" : ""}`}
            />
          ))}
        </div>
      </div>

      {compact &&
        modalSlide &&
        createPortal(
          <CarouselModal slide={modalSlide} onClose={() => setModalSlide(null)} />,
          document.body
        )}
    </>
  );
};

export default EmblaCarousel;
