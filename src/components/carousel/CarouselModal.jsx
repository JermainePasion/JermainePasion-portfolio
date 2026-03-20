import React from "react";
const CarouselModal = ({ slide, onClose }) => {
  if (!slide) return null;

  return (
    <div className="carousel-modal-backdrop" onClick={onClose}>
      <div className="carousel-modal" onClick={(e) => e.stopPropagation()}>

        <div className="modal-image">
          <img src={slide.image} />
        </div>

        <div className="modal-content">

          <div className="modal-title">{slide.title}</div>

          <div className="modal-description">{slide.description}</div>

          <a href={slide.visit} target="_blank" rel="noopener noreferrer">
            <button className="modal-button group relative overflow-hidden px-6 py-2 border border-zinc-900 tracking-widest text-sm font-medium text-zinc-900 transition-colors duration-300 hover:text-white">
              <span className="relative z-10">VISIT</span>
              <span className="absolute inset-0 bg-zinc-900 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
            </button>
          </a>

          <div className="modal-role">
            Role: {slide.role}
          </div>

          <div className="modal-tech">
            {slide.tech?.map((tech, i) => (
              <img key={i} src={tech} />
            ))}
          </div>

        </div>

      </div>
    </div>
  );
};

export default CarouselModal