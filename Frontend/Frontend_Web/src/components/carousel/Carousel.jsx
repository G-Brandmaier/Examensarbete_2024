import { useEffect, React } from "react";
import { FaChevronLeft, FaChevronRight, FaCircle } from "react-icons/fa";
import { initSlider } from "./slider.js";
import "./carousel.css";
import { Link } from "react-router-dom";

const Carousel = ({ id, title, content, linkTitle, linkForTitle }) => {
  useEffect(() => {
    initSlider(id);
  }, [id]);

  return (
    <div id={id} className="carousel-container">
      <div className="carousel-header flex flex-row gap-6">
        {title}
        {linkTitle && linkForTitle && (
          <>
            <FaCircle className="w-2 h-2 self-center" />
            <Link
              to={linkForTitle}
              className="text-headingSm font-normal default-hover self-center"
            >
              {linkTitle}
            </Link>
          </>
        )}
      </div>
      <div className="slider-wrapper">
        <button id="prev-slide" className="slide-button">
          <FaChevronLeft />
        </button>
        <div className="image-list">{content}</div>
        <button id="next-slide" className="slide-button">
          <FaChevronRight />
        </button>
      </div>
      <div className="slider-scrollbar">
        <div className="scrollbar-track">
          <div className="scrollbar-thumb"></div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
