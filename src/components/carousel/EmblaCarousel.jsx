import React, { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";

const EmblaCarousel = ({ slides, options }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  useEffect(() => {
    if (!emblaApi) return;

    const engine = emblaApi.internalEngine();
    const slides = emblaApi.slideNodes();
    const snaps = emblaApi.scrollSnapList();

    const tweenScale = () => {
      const scrollProgress = emblaApi.scrollProgress();

      slides.forEach((slide, index) => {
        let diff = snaps[index] - scrollProgress;

        // loop-aware distance
        if (engine.options.loop) {
          engine.slideLooper.loopPoints.forEach((loopItem) => {
            const target = loopItem.target();
            if (index === loopItem.index && target !== 0) {
              diff = snaps[index] + (target > 0 ? 1 : -1) - scrollProgress;
            }
          });
        }

        const scale = Math.max(0.8, 1 - Math.abs(diff) * 1.5);
        slide.style.transform = `scale(${scale})`;
      });
    };

    emblaApi.on("scroll", tweenScale);
    emblaApi.on("reInit", tweenScale);
    emblaApi.on("select", tweenScale);

    tweenScale();
  }, [emblaApi]);

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((_, index) => (
            <div className="embla__slide" key={index}>
              <div className="embla__card">{index + 1}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;