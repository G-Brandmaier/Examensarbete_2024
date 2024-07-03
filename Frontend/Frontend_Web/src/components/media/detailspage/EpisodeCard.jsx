/* Styles */
import "../../../styles/index.css";

/* Helpers */
import texts from "../../../helpers/Text-En.json";

const EpisodeCard = ({ img, name, episodeNumber, overview, airDate }) => {
  return (
    <div className="flex flex-col py-6 md:flex-row md:p-6 w-full border-b-2 border-primaryOrange">
      <img
        className="mb-6 min-w-[320px] max-w-[320px] h-auto max-h-[160px] md:mb-0 mr-6 object-cover"
        src={img}
        alt={`Image for ${name}`}
      />
      <div className="flex flex-col gap-2">
        <div className="text-headingSm">
          {episodeNumber}. {name}
        </div>
        <div className="text-textMd">{overview}</div>
        <div className="text-textXs">
          {texts.Details_AirDate} {airDate}
        </div>
      </div>
    </div>
  );
};

export default EpisodeCard;
