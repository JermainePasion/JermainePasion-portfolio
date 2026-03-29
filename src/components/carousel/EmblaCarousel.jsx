import React, { useEffect, useState, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import CarouselModal from "./CarouselModal";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton";
import { createPortal } from "react-dom";

const EmblaCarousel = ({ slides, options }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ ...options, axis: "y" });

  const [expandedIndex, setExpandedIndex] = useState(null);
  const [modalSlide, setModalSlide] = useState(null);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);
  const [isTablet, setIsTablet] = useState(
    window.innerWidth > 640 && window.innerWidth <= 1280
  );

  const slideRefs = useRef([]);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  // ✅ Responsive detection (fixed)
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      setIsMobile(w <= 640);
      setIsTablet(w > 640 && w <= 1280);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Fade effect
  useEffect(() => {
    if (!emblaApi) return;

    const slideNodes = emblaApi.slideNodes();

    const tween = () => {
      slideNodes.forEach((slide, index) => {
        if (expandedIndex !== null && index !== expandedIndex) {
          slide.style.opacity = "0.3";
        } else {
          slide.style.opacity = "1";
        }
      });
    };

    emblaApi.on("select", tween);
    emblaApi.on("reInit", tween);

    tween();
  }, [emblaApi, expandedIndex]);

  // ✅ Wheel scroll (ONLY when not expanded)
  useEffect(() => {
    if (!emblaApi) return;

    const onWheel = (e) => {
      if (expandedIndex !== null) return;

      e.preventDefault();

      if (e.deltaY > 0) emblaApi.scrollNext();
      else emblaApi.scrollPrev();
    };

    const viewport = emblaApi.rootNode();
    viewport.addEventListener("wheel", onWheel, { passive: false });

    return () => viewport.removeEventListener("wheel", onWheel);
  }, [emblaApi, expandedIndex]);

  // ✅ Sync expanded ONLY if already expanded
  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      const index = emblaApi.selectedScrollSnap();

      setExpandedIndex((prev) => (prev === null ? null : index));
    };

    emblaApi.on("select", onSelect);
    return () => emblaApi.off("select", onSelect);
  }, [emblaApi]);

  const handleCardClick = (index, slide) => {
    if (!emblaApi) return;

    emblaApi.scrollTo(index);

    // ✅ Modal for ALL non-desktop
    if (isMobile || isTablet) {
      setModalSlide(slide);
      return;
    }

    // ✅ Desktop expand behavior
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
    }
  };

  return (
    <>
      <div className={`embla-wrapper ${expandedIndex !== null ? "expanded" : ""}`}>
        <h2 className="embla-label">
          {"Projects".split("").map((char, i) => (
            <span
              key={i}
              className="embla-label__char"
              style={{
                "--x": isMobile || isTablet ? "0em" : `${i * 0.65}em`,
              }}
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
                  <div
                    key={index}
                    ref={(el) => (slideRefs.current[index] = el)}
                    className={`embla__slide ${isExpanded ? "expanded" : ""}`}
                  >
                    <div
                      className={`embla__card ${isExpanded ? "expanded" : ""}`}
                      onClick={() => handleCardClick(index, slide)}
                    >
                      <img
                        className="card-image"
                        src={slide.image}
                        alt={slide.title}
                      />

                      <div className="card-overlay">
                        {isExpanded && (
                          <button
                            className="close-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              setExpandedIndex(null);
                            }}
                          >
                            ✕
                          </button>
                        )}

                        <h2>{slide.title}</h2>

                        {isExpanded && (
                          <div className="expanded-content">
                            <p>{slide.description}</p>

                            <a href={slide.visit} target="_blank">
                              <button className="visit-btn">VISIT</button>
                            </a>

                            <p className="role">Role: {slide.role}</p>

                            <div className="tech">
                              {slide.tech?.map((tech, i) => (
                                <img key={i} src={tech} alt="" />
                              ))}
                            </div>
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

        {/* ✅ DOTS (fixed behavior) */}
        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => {
                onDotButtonClick(index);

                // only expand if already expanded (desktop)
                setExpandedIndex((prev) =>
                  prev !== null && !(isMobile || isTablet) ? index : prev
                );
              }}
              className={`embla__dot ${
                index === selectedIndex ? "embla__dot--selected" : ""
              }`}
            />
          ))}
        </div>
      </div>

      {(isMobile || isTablet) &&
        modalSlide &&
        createPortal(
          <CarouselModal
            slide={modalSlide}
            onClose={() => setModalSlide(null)}
          />,
          document.body
        )}
    </>
  );
};

export default EmblaCarousel;