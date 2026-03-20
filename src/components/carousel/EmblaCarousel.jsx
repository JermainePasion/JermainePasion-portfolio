import React, { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import CarouselModal from "./CarouselModal";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";


const EmblaCarousel = ({ slides, options }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ ...options, axis: "y" });
  const [activeSlide, setActiveSlide] = useState(null);
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);
  

  useEffect(() => {
    if (!emblaApi) return;

    const engine = emblaApi.internalEngine();
    const slideNodes = emblaApi.slideNodes();
    const snaps = emblaApi.scrollSnapList();

    const tweenScale = () => {
      if (activeSlide !== null) {
        slideNodes.forEach((slide, index) => {
          slide.style.transform = `scale(${index === activeSlide ? 1 : 0.9})`;
          slide.style.opacity = index === activeSlide ? "1" : "0.4";
        });
        return;
      }

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

        const scale = Math.max(0.8, 1 - Math.abs(diff) * 1.5);
        const opacity = Math.max(0.4, 1 - Math.abs(diff) * 2);

        slide.style.transform = `scale(${scale})`;
        slide.style.opacity = String(opacity);
      });
    };

    emblaApi.on("scroll", tweenScale);
    emblaApi.on("reInit", tweenScale);
    emblaApi.on("select", tweenScale);
    tweenScale();
    requestAnimationFrame(tweenScale);
  }, [emblaApi, activeSlide]);

  useEffect(() => {
  if (!emblaApi) return;

  const onWheel = (e) => {
    e.preventDefault();
    if (e.deltaY > 0) {
      emblaApi.scrollNext();
    } else {
      emblaApi.scrollPrev();
    }
  };

  const viewport = emblaApi.rootNode();
  viewport.addEventListener("wheel", onWheel, { passive: false });

  return () => {
    viewport.removeEventListener("wheel", onWheel);
  };
}, [emblaApi]);

  return (
    <>
      <div className="embla-wrapper">

        <h2 className="embla-label">Projects</h2>

        <div className={`embla ${activeSlide !== null ? "dimmed" : ""}`}>
          <div className="embla__viewport" ref={emblaRef}>
            <div className="embla__container">
              {slides.map((slide, index) => (
                <div className="embla__slide" key={index}>
                  <div
                    className={`embla__card ${activeSlide === index ? "selected" : ""}`}
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

        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={`embla__dot ${index === selectedIndex ? "embla__dot--selected" : ""}`}
            />
          ))}
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