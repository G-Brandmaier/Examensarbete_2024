/* Librarys */
import { useState, useContext, useEffect } from "react";
import { ApiContext } from "../contexts/ApiProvider";
import { useParams, Link, useNavigate } from "react-router-dom";
import { GoPerson } from "react-icons/go";
import { PiFilmSlate } from "react-icons/pi";

/* Components */
import Carousel from "../components/carousel/Carousel.jsx";
import CarouselMediaCard from "../components/carousel/CarouselMediaCard.jsx";
import Loader from "../components/tools/Loader.jsx";

/* Helpers */
import texts from "../helpers/Text-En.json";
import { scrollToTop } from "../helpers/generalHelper.js";
import { getAgeFromDate } from "../helpers/formatHelper.js";

/* Styles */
import "../styles/index.css";
import "../components/media/media.css";

const ActorDetailsPage = () => {
  const brokenImgPath = import.meta.env.VITE_IMG_PATH_BROKEN;
  const { id } = useParams();
  const { getActorDetailsAsync } = useContext(ApiContext);
  const [actorDetails, setActorDetails] = useState();
  const [latestCastedIn, setLatestCastedIn] = useState();
  const [detailsLoading, setDetailsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (id === undefined) navigate("*");
    else {
      getDetails();
      scrollToTop();
    }
  }, [id]);

  async function getDetails() {
    const details = await getActorDetailsAsync(id);
    if (details !== null) {
      if (details.combined_Credits.cast.length > 0) {
        let list = details.combined_Credits.cast;
        if (list.length > 0) {
          let filteredList = list.filter(
            (item) => item.media_Type === texts.Global_movie
          );
          filteredList.sort((a, b) => {
            const dateA = a.release_Date;
            const dateB = b.release_Date;
            return new Date(dateB) - new Date(dateA);
          });
          setLatestCastedIn(filteredList[0]);
        }
      }
      setActorDetails(details);
    }
    setDetailsLoading(false);
  }

  return (
    <>
      {!detailsLoading ? (
        <>
          <div className="default-container px-6 pt-6 xl:px-0">
            <div className="actor-details-grid-container">
              <div className="side-panel">
                {actorDetails.profile_Path !== brokenImgPath ? (
                  <img
                    src={actorDetails.profile_Path}
                    alt={`Poster path for ${actorDetails.name}`}
                    className="w-[180px] h-auto object-cover mb-8 mx-auto sm:mx-0 sm:mb-0 md:mb-8 lg:w-[224px]"
                  />
                ) : (
                  <div className="flex justify-center w-[180px] h-[240px] border-2 border-primaryLightGrey mb-8 mx-auto sm:mx-0 sm:mb-0 md:mb-8 lg:h-[336px] lg:w-[224px]">
                    <GoPerson className="h-[80px] w-[80px] self-center mx-auto my-20 text-primaryLightGrey" />
                  </div>
                )}
                <div className="flex flex-row gap-x-4 mx-auto sm:self-end sm:ml-10 md:self-start md:ml-0 md:flex-col">
                  <div className="">
                    <p className="text-headingSx md:text-headingSm text-primaryOrange">
                      {texts.Details_Born}
                    </p>
                    {actorDetails.birthDay ? (
                      <p className="text-textSm pb-4 md:text-textMd">
                        {actorDetails.birthDay} (
                        {getAgeFromDate(actorDetails.birthDay)})
                      </p>
                    ) : (
                      <p className="text-textSm pb-4 md:text-textMd">
                        {texts.Global_NoInformation}
                      </p>
                    )}

                    <p className="text-headingSx md:text-headingSm text-primaryOrange">
                      {texts.Details_BirthPlace}
                    </p>
                    <p className="text-textSm pb-4 md:text-textMd">
                      {actorDetails.place_Of_Birth
                        ? actorDetails.place_Of_Birth
                        : texts.Global_NoInformation}
                    </p>
                    {actorDetails.deathday && (
                      <>
                        <p className="text-headingSx md:text-headingSm text-primaryOrange">
                          {texts.Details_Deceased}
                        </p>
                        <p className="text-textSm pb-4 md:text-textMd">
                          {actorDetails.deathDay}
                        </p>
                      </>
                    )}
                  </div>
                  {actorDetails.also_Known_As.length > 0 && (
                    <div className="">
                      <div className="text-headingSx md:text-headingSm text-primaryOrange">
                        {texts.Details_AlsoKnownAs}:
                      </div>
                      <ul className="">
                        {actorDetails.also_Known_As.map((item, index) => (
                          <li
                            key={index}
                            className="text-textSm md:text-textMd pb-1"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              <div className="top-content">
                <div className="text-headingMd mb-4 font-semibold md:text-headingLg md:mb-6 text-primaryOrange">
                  {actorDetails.name}
                </div>
                <div className="text-textSm md:text-textMd">
                  {actorDetails.biography
                    ? actorDetails.biography
                    : texts.Global_NoInformation}
                </div>
              </div>
              <div className="bottom-content">
                {latestCastedIn && (
                  <>
                    <div className="text-headingMd font-semibold mb-4 md:text-headingLg text-primaryOrange">
                      {texts.Global_Latest}
                    </div>
                    <Link
                      to={`/${
                        latestCastedIn.media_Type === texts.Global_movie
                          ? "MovieDetails"
                          : "TvSeriesDetails"
                      }/${latestCastedIn.id}`}
                      className="flex flex-col sm:flex-row gap-x-6"
                    >
                      {latestCastedIn.poster_Path !== brokenImgPath ? (
                        <img
                          src={latestCastedIn.poster_Path}
                          alt={`Poster path for ${
                            latestCastedIn.title
                              ? latestCastedIn.title
                              : latestCastedIn.name
                          }`}
                          className="mb-4 h-[240px] min-w-[160px] w-[160px] object-cover"
                        />
                      ) : (
                        <div className="flex justify-center mb-4 min-w-[160px] w-[160px] h-[240px] border-2 border-primaryLightGrey">
                          <PiFilmSlate className="h-[80px] w-[80px] self-center mx-auto my-20 text-primaryLightGrey" />
                        </div>
                      )}

                      <div>
                        <div className="text-headingSm md:text-headingMd default-hover">
                          {latestCastedIn.title
                            ? latestCastedIn.title
                            : latestCastedIn.name}
                        </div>
                        <div className="text-textm md:text-textMd">
                          {latestCastedIn.overview}
                        </div>
                      </div>
                    </Link>
                  </>
                )}
              </div>
            </div>
            {actorDetails.combined_Credits.cast.length > 0 && (
              <Carousel
                id={`actorDetailsKnownfor-${actorDetails.id}`}
                title={`${texts.Details_KnownFor}`}
                content={actorDetails.combined_Credits.cast.map(
                  (item, index) => (
                    <CarouselMediaCard
                      key={index}
                      id={item.id}
                      posterPath={item.poster_Path}
                      title={item.name ? item.name : item.title}
                      linkTo={
                        item.media_Type === texts.Global_movie
                          ? "MovieDetails"
                          : "TvSeriesDetails"
                      }
                    />
                  )
                )}
              />
            )}
          </div>
        </>
      ) : (
        <div className="mt-28">
          <Loader size={`w-10 h-10`} />
        </div>
      )}
    </>
  );
};

export default ActorDetailsPage;
