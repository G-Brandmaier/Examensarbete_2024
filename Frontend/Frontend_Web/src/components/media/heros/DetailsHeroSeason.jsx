/* Librarys */
import { FaCircle } from "react-icons/fa";
import { PiFilmSlate } from "react-icons/pi";

/* Helpers */
import texts from "../../../helpers/Text-En.json";

/* Styles */
import "../../../styles/index.css";

const DetailsHeroSeason = (props) => {
  const brokenImgPath = import.meta.env.VITE_IMG_PATH_BROKEN;

  return (
    <div className="relative w-full h-[400px] bg-overLayLightDark lg:h-[700px]">
      <img
        src={props.img}
        alt={`Backdrop for ${props.tvSeriesName}`}
        className="absolute top-0 left-0 object-cover opacity-15 w-full -z-10 h-[400px] lg:h-[700px]"
      />
      <div className="default-container flex flex-row text-primaryLightGrey p-4 justify-center lg:py-8 xl:px-0">
        {props.posterPath !== brokenImgPath ? (
          <img
            src={props.posterPath}
            alt={`Poster path for ${props.tvSeriesName}`}
            className="hidden sm:block sm:h-auto sm:w-[246px] sm:min-w-[246px] sm:align-middle sm:mr-0 lg:mr-16 lg:w-[424px] lg:min-w-[424px]"
          />
        ) : (
          <div className="hidden sm:flex sm:justify-center sm:h-auto sm:w-[246px] sm:min-w-[246px] sm:align-middle sm:mr-0 lg:mr-16 lg:w-[424px] lg:min-w-[424px] border-2 border-primaryLightGrey">
            <PiFilmSlate className="h-[110px] w-[110px] self-center my-[155px] text-primaryLightGrey" />
          </div>
        )}
        <div className="flex flex-col w-full gap-3 py-4 pl-4 lg:pt-4 lg:pl-0">
          <div>
            <div className="text-headingLg">{props.tvSeriesName}</div>
            <div className="flex flex-row gap-2 text-textSm">
              {props.name}
              <FaCircle className="w-1 h-1 self-center" />
              <div>
                {props.episodeCount} {texts.Details_episodes}
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-4">
            <div className="text-headingSm">{props.airDate}</div>
            {props.episodeRuntime && (
              <div className="text-headingSm">
                {props.episodeRuntime} {texts.Global_min}
              </div>
            )}
          </div>
          <div className="flex flex-row gap-2 flex-wrap">
            {props.genres.length > 0 &&
              props.genres.map((genre, index) => (
                <div key={index} className="text-headingSm">
                  {index !== props.genres.length - 1
                    ? `${genre.name},`
                    : genre.name}
                </div>
              ))}
          </div>
          <div className="hidden lg:block lg:text-headingSm lg:w-full">
            {props.overview}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsHeroSeason;
