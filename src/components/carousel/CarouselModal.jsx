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

          <button className="modal-button">VISIT</button>

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