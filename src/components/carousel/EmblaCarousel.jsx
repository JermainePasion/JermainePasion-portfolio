import React, { useEffect, useState, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import CarouselModal from "./CarouselModal";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton";

const EmblaCarousel = ({ slides, options }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ ...options, axis: "y" });

  const [expandedIndex, setExpandedIndex] = useState(null);
  const [expandedOffset, setExpandedOffset] = useState(null);
  const [modalSlide, setModalSlide] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);

  const slideRefs = useRef([]);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);
    

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Scaling effect
  useEffect(() => {
    if (!emblaApi) return;

    const slideNodes = emblaApi.slideNodes();

    const tweenScale = () => {
      if (expandedIndex !== null) {
        slideNodes.forEach((slide, index) => {
          if (index === expandedIndex) {
            slide.style.transform = "scale(1)";
            slide.style.opacity = "1";
          } else {
            slide.style.transform = "scale(1)";
            slide.style.opacity = "0.3";
          }
        });
        return;
      }

      slideNodes.forEach((slide) => {
        slide.style.transform = "scale(1)";
        slide.style.opacity = "1";
      });
    };

    emblaApi.on("select", tweenScale);
    emblaApi.on("reInit", tweenScale);

    tweenScale();
  }, [emblaApi, expandedIndex]);

  // Wheel scroll
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

  useEffect(() => {
    if (!emblaApi) return;

    if (expandedIndex !== null) {
      emblaApi.internalEngine().options.watchDrag = false;
    } else {
      emblaApi.internalEngine().options.watchDrag = true;
    }
  }, [expandedIndex, emblaApi]);

  const handleCardClick = (index, slide) => {
    if (expandedIndex !== null && expandedIndex !== index) return;

    if (isMobile) {
      setModalSlide(slide);
    } else {
      if (index === expandedIndex) {
        // Collapse
        setExpandedIndex(null);
        setExpandedOffset(null);
      } else {
        // Capture the slide's current top offset relative to the container
        const el = slideRefs.current[index];
        if (el) {
          const container = el.closest(".embla__container");
          const top = el.offsetTop - (container ? container.scrollTop : 0);
          setExpandedOffset(top);
        }
        setExpandedIndex(index);
      }
    }
  };
  

  

  return (
    <>
      <div className={`embla-wrapper ${expandedIndex !== null ? "expanded" : ""}`}>
        <h2 className="embla-label" style={{ WebkitUserDrag: "none", userSelect: "none", pointerEvents: "none" }}>
          {"Projects".split("").map((char, i) => (
            <span
              key={i}
              className="embla-label__char"
              style={{
                "--x": `${i * 0.65}em`, // 👈 where it came from
                animationDelay: `${i * 60}ms`,
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
                    style={
                      isExpanded && expandedOffset !== null
                        ? { position: "absolute", top: expandedOffset, left: 0 }
                        : {}
                    }
                  >
                    <div
                      className={`embla__card ${isExpanded ? "expanded" : ""}`}
                      onClick={() => handleCardClick(index, slide)} 
                    >
                      <img className="card-image" src={slide.image} alt={slide.title} style={{ WebkitUserDrag: "none", userSelect: "none", pointerEvents: "none" }}/>

                      <div className="card-overlay" >
                        {isExpanded && (
                          <button
                            className="close-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              setExpandedIndex(null);
                              setExpandedOffset(null);
                            }}
                          >
                            ✕
                          </button>
                        )}
                        <h2>{slide.title}</h2>

                        {isExpanded && (
                          <div className="expanded-content" >
                            <p style={{ WebkitUserDrag: "none", userSelect: "none", pointerEvents: "none" }}>{slide.description}</p>

                            <a
                              href={slide.visit}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
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

        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => {
                if (expandedIndex !== null) return;
                onDotButtonClick(index);
              }}
              className={`embla__dot ${
                index === selectedIndex ? "embla__dot--selected" : ""
              } ${expandedIndex !== null ? "disabled" : ""}`}
            />
          ))}
        </div>
      </div>

      {/* MOBILE ONLY MODAL */}
      {isMobile && (
        <CarouselModal
          slide={modalSlide}
          onClose={() => setModalSlide(null)}
        />
      )}
    </>
  );
};

export default EmblaCarousel;