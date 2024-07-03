/* Styles */
import "../../styles/index.css";
import "./carousel.css";

const CarouselVideoCard = ({ name, site, siteKey }) => {
  return (
    <div className="video-item">
      <iframe
        width="350"
        height="260"
        src={site === "YouTube" && `https://www.youtube.com/embed/${siteKey}`}
        title={name}
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default CarouselVideoCard;
