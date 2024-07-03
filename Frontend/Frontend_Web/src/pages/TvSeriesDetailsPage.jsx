/* Librarys */
import { useState, useContext, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getYear } from "date-fns";
import { FaCircle } from "react-icons/fa";

/* Components */
import Carousel from "../components/carousel/Carousel";
import CarouselActorCard from "../components/carousel/CarouselActorCard.jsx";
import DetailsHeroTv from "../components/media/heros/DetailsHeroTv.jsx";
import CarouselMediaCard from "../components/carousel/CarouselMediaCard";
import CarouselVideoCard from "../components/carousel/CarouselVideoCard.jsx";
import CarouselSeasonCard from "../components/carousel/CarouselSeasonCard.jsx";
import ReviewForm from "../components/media/detailspage/ReviewForm.jsx";
import ReviewCard from "../components/media/cards/ReviewCard.jsx";
import DetailSectionTvSeries from "../components/media/detailspage/DetailsSectionTvSeries.jsx";
import Loader from "../components/tools/Loader.jsx";

/* Context */
import { ApiContext } from "../contexts/ApiProvider";
import { ReviewContext } from "../contexts/ReviewProvider";

/* Helpers */
import texts from "../helpers/Text-En.json";
import { scrollToTop } from "../helpers/generalHelper";

/* Styles */
import "../styles/index.css";

const TvSeriesDetailsPage = () => {
  const { id } = useParams();
  const { getTvSeriesDetailsAsync, getSimilarTvSeriesAsync } =
    useContext(ApiContext);
  const { getLatestReviewByIdAndTypeAsync } = useContext(ReviewContext);

  const [tvSeriesDetails, setTvSeriesDetails] = useState({});
  const [detailsLoading, setDetailsLoading] = useState(true);
  const [similarTvSeries, setSimilarTvSeries] = useState([]);
  const [similarLoading, setSimilarLoading] = useState(true);
  const [latestReview, setLatestReview] = useState({});
  const [reviewLoading, setReviewLoading] = useState(true);
  const [showAddReview, setShowAddReview] = useState(false);
  const [reviewChange, setReviewChange] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getTvSeriesDetailsContent();
    getSimilarTvSeries(1);
    getLatestReview();
    scrollToTop();
  }, [id]);

  useEffect(() => {
    if (reviewChange) {
      getTvSeriesDetailsContent();
      getLatestReview();
    }
  }, [reviewChange]);

  async function getTvSeriesDetailsContent() {
    let data = await getTvSeriesDetailsAsync(id);
    if (data === null) navigate("*");
    let details = data;
    setTvSeriesDetails(details);
    setDetailsLoading(false);
  }

  async function getSimilarTvSeries(page) {
    let data = await getSimilarTvSeriesAsync(id, page);
    let similarTvSeries = data.results;
    setSimilarTvSeries(similarTvSeries);
    setSimilarLoading(false);
  }

  async function getLatestReview() {
    setReviewChange(false);
    let data = await getLatestReviewByIdAndTypeAsync(id, texts.Global_tv);
    let tvSeriesReview = data;
    setLatestReview(tvSeriesReview);
    setReviewLoading(false);
  }

  function generateSeasonData(season) {
    let seasonData = {
      id: season.id,
      tvSeriesId: tvSeriesDetails.id,
      backdropPath: tvSeriesDetails.backdrop_Path,
      genres: tvSeriesDetails.genres,
      tvSeriesName: tvSeriesDetails.name,
      episodeCount: season.episode_Count,
      seasonNumber: season.season_Number,
    };
    return seasonData;
  }

  return (
    <>
      {!detailsLoading ? (
        <>
          <DetailsHeroTv
            key={tvSeriesDetails.id}
            id={tvSeriesDetails.id}
            img={tvSeriesDetails.backdrop_Path}
            name={tvSeriesDetails.name}
            overview={tvSeriesDetails.overview}
            genres={tvSeriesDetails.genres}
            firstAirDate={getYear(tvSeriesDetails.first_Air_Date)}
            episodeRuntime={tvSeriesDetails.episode_RunTime}
            posterPath={tvSeriesDetails.poster_Path}
            numberOfSeasons={tvSeriesDetails.number_Of_Seasons}
            createdBy={tvSeriesDetails.created_By}
            voteAverage={tvSeriesDetails.vote_Average}
            rating={tvSeriesDetails.rating}
            setShowAddReview={setShowAddReview}
            setReviewChange={setReviewChange}
            reviewChange={reviewChange}
          />
          <div className="default-container px-6 pt-6 xl:px-0">
            <div className="block lg:hidden">{tvSeriesDetails.overview}</div>
            <Carousel
              id={`tvSeriesDetails${texts.Details_Seasons}-${tvSeriesDetails.id}`}
              title={`${texts.Details_Seasons}`}
              content={tvSeriesDetails.seasons
                .filter((item) => item.name !== "Specials")
                .map((item) => (
                  <CarouselSeasonCard
                    key={item.id}
                    id={item.id}
                    title={item.name}
                    posterPath={item.poster_Path}
                    linkTo={"SeasonDetails"}
                    seasonData={generateSeasonData(item)}
                  />
                ))}
            />
            <Carousel
              id={`tvSeriesDetailsCast-${tvSeriesDetails.id}`}
              title={`${texts.Global_Cast}`}
              content={tvSeriesDetails.aggregate_Credits.cast.map(
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
            {tvSeriesDetails.videos.results.length > 0 ? (
              <Carousel
                id={`tvSeriesDetailsVideos-${tvSeriesDetails.id}`}
                title={`${texts.Global_TrailersAndVideos}`}
                content={tvSeriesDetails.videos.results.map((item) => (
                  <CarouselVideoCard
                    key={item.key}
                    name={item.name}
                    site={item.site}
                    siteKey={item.key}
                  />
                ))}
              />
            ) : (
              <div>
                <div className="text-headingMd md:text-headingLg font-semibold text-primaryOrange mb-2">
                  {texts.Global_TrailersAndVideos}
                </div>
                <div className="text-headingSm md:text-headingMd">
                  {texts.Global_NoTrailersOrVideos}
                </div>
              </div>
            )}
            <DetailSectionTvSeries
              status={tvSeriesDetails.status}
              lastAirDate={tvSeriesDetails.last_Air_Date}
              numberOfSeasons={tvSeriesDetails.number_Of_Seasons}
              numberOfEpisodes={tvSeriesDetails.number_Of_Episodes}
              productionCompanies={tvSeriesDetails.production_Companies}
              networks={tvSeriesDetails.networks}
              homePage={tvSeriesDetails.homePage}
            />
            {!reviewLoading && (
              <div className="my-14">
                <div className="flex flex-row gap-6 text-primaryOrange align-bottom mb-4">
                  <div className="text-headingMd md:text-headingLg font-semibold self-center">
                    {texts.Global_LatestReview}
                  </div>
                  <FaCircle className="w-2 h-2 self-center" />
                  <Link
                    to={`/TvSeriesDetails/Reviews/${tvSeriesDetails.id}`}
                    className="text-headingSm default-hover py-2 self-end"
                  >
                    {texts.Global_ViewAllReviews}
                  </Link>
                </div>
                {latestReview ? (
                  <ReviewCard
                    id={latestReview.id}
                    title={latestReview.title}
                    rating={latestReview.rating}
                    createdAt={latestReview.createdAt}
                    updatedAt={
                      latestReview.updatedAt != null
                        ? latestReview.updatedAt
                        : ""
                    }
                    description={latestReview.description}
                    userId={latestReview.identityUserId}
                    author={latestReview.author}
                    mediaId={latestReview.mediaId}
                    mediaType={latestReview.mediaType}
                  />
                ) : (
                  <div className="text-headingSm md:text-headingMd">
                    {texts.Global_NoReviewsYet}
                  </div>
                )}
              </div>
            )}
            {!similarLoading && similarTvSeries.length > 0 && (
              <Carousel
                id={`tvSeriesDetailsSimilar-${tvSeriesDetails.id}`}
                title={`${texts.Details_SimilarTvSeries}`}
                content={similarTvSeries.map((item) => (
                  <CarouselMediaCard
                    key={item.id}
                    id={item.id}
                    title={item.name}
                    posterPath={item.poster_Path}
                    linkTo={"TvSeriesDetails"}
                  />
                ))}
              />
            )}
          </div>
          {showAddReview && (
            <ReviewForm
              id={tvSeriesDetails.id}
              type={texts.Global_tv}
              name={tvSeriesDetails.name}
              posterPath={tvSeriesDetails.poster_Path}
              setShowAddReview={setShowAddReview}
              setReviewAdded={setReviewChange}
            />
          )}
        </>
      ) : (
        <div className="mt-28">
          <Loader size={`w-10 h-10`} />
        </div>
      )}
    </>
  );
};

export default TvSeriesDetailsPage;
