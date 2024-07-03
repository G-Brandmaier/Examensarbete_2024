/* Librarys */
import { useState, useContext, useEffect } from "react";
import { ApiContext } from "../contexts/ApiProvider";
import { useParams, useLocation } from "react-router-dom";
import { getYear } from "date-fns";

/* Components */
import Carousel from "../components/carousel/Carousel";
import CarouselActorCard from "../components/carousel/CarouselActorCard.jsx";
import DetailsHeroSeason from "../components/media/heros/DetailsHeroSeason.jsx";
import CarouselVideoCard from "../components/carousel/CarouselVideoCard.jsx";
import EpisodeCard from "../components/media/detailspage/EpisodeCard.jsx";
import Loader from "../components/tools/Loader.jsx";

/* Helpers */
import texts from "../helpers/Text-En.json";

/* Styles */
import "../styles/index.css";

const SeasonDetailsPage = () => {
  const { id } = useParams();
  const { GetTvSeriesSeasonDetailsAsync } = useContext(ApiContext);

  const { state } = useLocation();

  const [season, setSeason] = useState();
  const [detailsLoading, setDetailsLoading] = useState(true);
  const [seasonDetails, setSeasonDetails] = useState();
  const [seasonLoading, setSeasonLoading] = useState(true);
  const [visibleCards, setVisibleCards] = useState(5);

  const handleSeeMoreOrLess = () => {
    visibleCards > 5
      ? setVisibleCards(5)
      : setVisibleCards(season.episodeCount);
  };

  useEffect(() => {
    getDetailsContent();
    scrollToTop();
  }, [id]);

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function getDetailsContent() {
    let data = await GetTvSeriesSeasonDetailsAsync(
      state.data.tvSeriesId,
      state.data.seasonNumber
    );
    if (data === null) navigate("*");
    setSeasonDetails(data);
    setSeason(state.data);
    setDetailsLoading(false);
    setSeasonLoading(false);
  }

  return (
    <>
      {!seasonLoading ? (
        <>
          <DetailsHeroSeason
            key={seasonDetails.id}
            img={season.backdropPath}
            name={seasonDetails.name}
            overview={seasonDetails.overview}
            airDate={getYear(seasonDetails.air_Date)}
            episodeCount={season.episodeCount}
            posterPath={seasonDetails.poster_Path}
            seasonNumber={seasonDetails.season_Number}
            genres={season.genres}
            voteAverage={seasonDetails.vote_Average}
            tvSeriesName={season.tvSeriesName}
          />
          <div className="default-container px-6 pt-6 xl:px-0">
            <div className="block lg:hidden">{seasonDetails.overview}</div>
            {!detailsLoading && (
              <>
                <Carousel
                  id={`seasonDetailsCast-${seasonDetails.id}`}
                  title={`${texts.Global_Cast}`}
                  content={seasonDetails.aggregate_Credits.cast.map(
                    (actor, index) => (
                      <CarouselActorCard
                        key={index}
                        id={actor.id}
                        img={actor.profile_Path}
                        name={actor.name}
                        roles={actor.roles}
                      />
                    )
                  )}
                />
                {seasonDetails.videos.results.length > 0 && (
                  <Carousel
                    id={`seasonDetailsVideos-${seasonDetails.id}`}
                    title={`${texts.Global_TrailersAndVideos}`}
                    content={seasonDetails.videos.results.map((item) => (
                      <CarouselVideoCard
                        key={item.key}
                        name={item.name}
                        site={item.site}
                        siteKey={item.key}
                      />
                    ))}
                  />
                )}
                <div className="pb-8">
                  <div className="text-headingMd md:text-headingLg font-semibold text-primaryOrange mb-2">
                    {texts.Details_Episodes}
                  </div>
                  {seasonDetails.episodes.slice(0, visibleCards).map((item) => (
                    <EpisodeCard
                      key={item.id}
                      name={item.name}
                      img={item.still_Path}
                      airDate={item.air_Date}
                      overview={item.overview}
                      episodeNumber={item.episode_Number}
                    />
                  ))}
                  <div className="flex flex-row w-full justify-center py-6">
                    <button
                      className="text-primaryOrange font-semibold default-hover"
                      onClick={handleSeeMoreOrLess}
                    >
                      {visibleCards < season.episodeCount
                        ? texts.Global_ViewMore
                        : texts.Global_ViewLess}
                    </button>
                  </div>
                </div>
              </>
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

export default SeasonDetailsPage;
