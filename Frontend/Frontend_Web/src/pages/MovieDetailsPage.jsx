/* Librarys */
import { useState, useContext, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getYear } from "date-fns";
import { FaCircle } from "react-icons/fa";

/* Components */
import Carousel from "../components/carousel/Carousel";
import CarouselActorCard from "../components/carousel/CarouselActorCard.jsx";
import DetailsHeroMovie from "../components/media/heros/DetailsHeroMovie.jsx";
import CarouselMediaCard from "../components/carousel/CarouselMediaCard";
import CarouselVideoCard from "../components/carousel/CarouselVideoCard.jsx";
import ReviewForm from "../components/media/detailspage/ReviewForm.jsx";
import ReviewCard from "../components/media/cards/ReviewCard.jsx";
import DetailSectionMovie from "../components/media/detailspage/DetailSectionMovie.jsx";
import Loader from "../components/tools/Loader.jsx";

/* Context */
import { ApiContext } from "../contexts/ApiProvider";
import { ReviewContext } from "../contexts/ReviewProvider";

/* Helpers */
import {
  formatMinutesToHoursAndMinutes,
  getCurrency,
  getLanguage,
} from "../helpers/formatHelper.js";
import texts from "../helpers/Text-En.json";
import { scrollToTop } from "../helpers/generalHelper";

/* Styles */
import "../styles/index.css";

const MovieDetailsPage = () => {
  const { id } = useParams();
  const { getMovieDetailsAsync, getSimilarMoviesAsync } =
    useContext(ApiContext);
  const { getLatestReviewByIdAndTypeAsync } = useContext(ReviewContext);

  const [movieDetails, setMovieDetails] = useState({});
  const [detailsLoading, setDetailsLoading] = useState(true);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [similarLoading, setSimilarLoading] = useState(true);
  const [latestReview, setLatestReview] = useState({});
  const [reviewLoading, setReviewLoading] = useState(true);
  const [showAddReview, setShowAddReview] = useState(false);
  const [reviewChange, setReviewChange] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (id === undefined) navigate("*");
    else {
      getMovieDetailsContent();
      getSimilarMovies(1);
      getLatestReview();
      scrollToTop();
    }
  }, [id]);

  useEffect(() => {
    if (reviewChange) {
      getMovieDetailsContent();
      getLatestReview();
    }
  }, [reviewChange]);

  async function getMovieDetailsContent() {
    let data = await getMovieDetailsAsync(id);
    if (data === null) navigate("*");
    let details = data;
    setMovieDetails(details);
    setDetailsLoading(false);
  }

  async function getSimilarMovies(page) {
    let data = await getSimilarMoviesAsync(id, page);
    let similarMovies = data.results;
    setSimilarMovies(similarMovies);
    setSimilarLoading(false);
  }

  async function getLatestReview() {
    setReviewChange(false);
    setReviewLoading(true);
    let data = await getLatestReviewByIdAndTypeAsync(id, texts.Global_movie);
    let movieReview = data;
    setLatestReview(movieReview);
    setReviewLoading(false);
  }

  return (
    <>
      {!detailsLoading ? (
        <>
          <DetailsHeroMovie
            key={movieDetails.id}
            id={movieDetails.id}
            img={movieDetails.backdrop_Path}
            title={movieDetails.title}
            overview={movieDetails.overview}
            genres={movieDetails.genres}
            releaseDate={getYear(movieDetails.release_Date)}
            runtime={formatMinutesToHoursAndMinutes(movieDetails.runtime)}
            posterPath={movieDetails.poster_Path}
            voteAverage={movieDetails.vote_Average}
            rating={movieDetails.rating}
            director={movieDetails.director}
            setShowAddReview={setShowAddReview}
            setReviewChange={setReviewChange}
            reviewChange={reviewChange}
          />
          <div className="default-container px-6 pt-6 xl:px-0">
            <div className="block lg:hidden">{movieDetails.overview}</div>
            <Carousel
              id={`movieDetailsCast-${movieDetails.id}`}
              title={`${texts.Global_Cast}`}
              content={movieDetails.credits.cast.map((actor, index) => (
                <CarouselActorCard
                  key={index}
                  id={actor.id}
                  img={actor.profile_Path}
                  name={actor.name}
                  character={actor.character}
                />
              ))}
            />
            {movieDetails.videos.results.length > 0 ? (
              <Carousel
                id={`movieDetailsVideos-${movieDetails.id}`}
                title={`${texts.Global_TrailersAndVideos}`}
                content={movieDetails.videos.results.map((item) => (
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
            <DetailSectionMovie
              originalLanguage={movieDetails.original_Language}
              originalTitle={movieDetails.original_Title}
              budget={movieDetails.budget}
              productionCompanies={movieDetails.production_Companies}
              homePage={movieDetails.homePage}
            />
            {!reviewLoading && (
              <div className="my-14">
                <div className="flex flex-row gap-6 text-primaryOrange align-bottom mb-4">
                  <div className="text-headingMd md:text-headingLg font-semibold self-center">
                    {texts.Global_LatestReview}
                  </div>
                  <FaCircle className="w-2 h-2 self-center" />
                  <Link
                    to={`/MovieDetails/Reviews/${movieDetails.id}`}
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
            {!similarLoading && similarMovies.length > 0 && (
              <Carousel
                id={`movieDetailsSimilar-${movieDetails.id}`}
                title={`${texts.Details_SimilarMovies}`}
                content={similarMovies.map((item) => (
                  <CarouselMediaCard
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    posterPath={item.poster_Path}
                    linkTo={"MovieDetails"}
                  />
                ))}
              />
            )}
          </div>
          {showAddReview && (
            <ReviewForm
              id={movieDetails.id}
              type={texts.Global_movie}
              name={movieDetails.title}
              posterPath={movieDetails.poster_Path}
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

export default MovieDetailsPage;
