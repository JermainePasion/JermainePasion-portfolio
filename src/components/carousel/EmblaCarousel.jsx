import React, { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import CarouselModal from "./CarouselModal";

const EmblaCarousel = ({ slides, options }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [activeSlide, setActiveSlide] = useState(null);

  useEffect(() => {
    if (!emblaApi) return;

    const engine = emblaApi.internalEngine();
    const slideNodes = emblaApi.slideNodes();
    const snaps = emblaApi.scrollSnapList();

    const tweenScale = () => {
      const scrollProgress = emblaApi.scrollProgress();

      slideNodes.forEach((slide, index) => {
        let diff = snaps[index] - scrollProgress;

        if (engine.options.loop) {
          engine.slideLooper.loopPoints.forEach((loopItem) => {
            const target = loopItem.target();
            if (index === loopItem.index && target !== 0) {
              diff = snaps[index] + (target > 0 ? 1 : -1) - scrollProgress;
            }
          });
        }

        let scale = Math.max(0.8, 1 - Math.abs(diff) * 1.5);

        /* when modal is open */
        if (activeSlide !== null) {
          if (index === activeSlide) {
            scale = 1.08; /* selected card bigger */
          } else {
            scale = 0.9; /* others smaller */
          }
        }

        slide.style.transform = `scale(${scale})`;
      });
    };

    emblaApi.on("scroll", tweenScale);
    emblaApi.on("reInit", tweenScale);
    emblaApi.on("select", tweenScale);

    tweenScale();
  }, [emblaApi, activeSlide]);

  return (
    <>
      <div className={`embla ${activeSlide !== null ? "dimmed" : ""}`}>
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {slides.map((slide, index) => (
              <div className="embla__slide" key={index}>
                <div
                  className={`embla__card ${
                    activeSlide === index ? "selected" : ""
                  }`}
                  onClick={() => setActiveSlide(index)}
                >
                  <img className="card-image" src={slide.image} />

                  <div className="card-overlay">
                    <h2>{slide.title}</h2>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <CarouselModal
        slide={activeSlide !== null ? slides[activeSlide] : null}
        onClose={() => setActiveSlide(null)}
      />
    </>
  );
};

export default EmblaCarousel;