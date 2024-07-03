/* Librarys */
import { Link } from "react-router-dom";
import { PiFilmSlate } from "react-icons/pi";

/* Styles */
import "../../styles/index.css";
import "./carousel.css";

const CarouselSeasonCard = (props) => {
  const brokenImgPath = import.meta.env.VITE_IMG_PATH_BROKEN;

  return (
    <Link
      to={`/${props.linkTo}/${props.id}`}
      state={{ data: props.seasonData }}
      key={props.id}
      className="carousel-card"
    >
      {props.posterPath !== brokenImgPath ? (
        <img className="image-item" src={props.posterPath} alt={props.title} />
      ) : (
        <div className="image-item">
          <div className="flex justify-center w-[260px] h-[375px] border-2 border-primaryLightGrey">
            <PiFilmSlate className="h-[110px] w-[110px] self-center my-[155px] text-primaryLightGrey" />
          </div>
        </div>
      )}
      <div className="pt-4 w-full text-white default-hover">{props.title}</div>
    </Link>
  );
};

export default CarouselSeasonCard;
