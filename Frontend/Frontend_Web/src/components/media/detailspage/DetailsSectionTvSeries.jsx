/* Librarys */
import { FaCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

/* Helpers */
import texts from "../../../helpers/Text-En.json";

const DetailSectionTvSeries = (props) => {
  return (
    <div className="w-full pt-6">
      <div className="text-headingMd md:text-headingLg font-semibold text-primaryOrange mb-2">
        {texts.Global_Details}
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-row align-middle gap-2">
          <strong className="text-nowrap">{texts.Details_Status}</strong>
          <FaCircle className="w-1 h-1 self-center" />
          <span className="text-primaryOrange">{props.status}</span>
        </div>
        <div className="flex flex-row align-middle gap-2">
          <strong className="text-nowrap">{texts.Details_LastAired}</strong>
          <FaCircle className="w-1 h-1 self-center" />
          <span className="text-primaryOrange">{props.lastAirDate}</span>
        </div>
        <div className="flex flex-row align-middle gap-2">
          <strong className="text-nowrap">
            {texts.Details_NumberOfSeasons}
          </strong>
          <FaCircle className="w-1 h-1 self-center" />
          <span className="text-primaryOrange">{props.numberOfSeasons}</span>
        </div>
        <div className="flex flex-row align-middle gap-2">
          <strong className="text-nowrap">
            {texts.Details_NumberOfEpisodes}
          </strong>
          <FaCircle className="w-1 h-1 self-center" />
          <span className="text-primaryOrange">{props.numberOfEpisodes}</span>
        </div>
        {props.productionCompanies.length > 0 && (
          <div className="flex flex-row align-middle gap-2 flex-wrap">
            <strong className="text-nowrap">
              {texts.Global_ProductionCompanies}
            </strong>
            <FaCircle className="w-1 h-1 self-center" />
            {props.productionCompanies.map((item, index) => (
              <div key={index} className="text-textMd flex flex-row gap-3">
                <span className="text-primaryOrange">{item.name}</span>
                {index !== props.productionCompanies.length - 1 && (
                  <FaCircle className="w-1 h-1 self-center" />
                )}
              </div>
            ))}
          </div>
        )}
        {props.networks.length > 0 && (
          <div className="flex flex-row align-middle gap-2 flex-wrap">
            <strong className="text-nowrap">{texts.Global_Networks}</strong>
            <FaCircle className="w-1 h-1 self-center" />
            {props.networks.map((item, index) => (
              <div key={index} className="text-textMd flex flex-row gap-3">
                <span className="text-primaryOrange">{item.name}</span>
                {index !== props.networks.length - 1 && (
                  <FaCircle className="w-1 h-1 self-center" />
                )}
              </div>
            ))}
          </div>
        )}
        {props.homePage && (
          <div className="flex flex-row align-middle gap-2">
            <strong className="text-nowrap">{texts.Global_HomePage}</strong>
            <FaCircle className="w-1 h-1 self-center" />
            <Link
              to={props.homePage}
              className="text-primaryOrange default-hover truncate"
              target="_blank"
              rel="noopener noreferrer"
            >
              {props.homePage}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailSectionTvSeries;
