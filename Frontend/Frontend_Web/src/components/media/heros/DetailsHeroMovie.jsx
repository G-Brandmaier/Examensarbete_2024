/* Librarys */
import { FaBookmark, FaPencilAlt } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { PiFilmSlate } from "react-icons/pi";

/* Components */
import EditReviewForm from "../detailspage/EditReviewForm";

/* Context */
import { UserContext } from "../../../contexts/UserProvider";
import { ReviewContext } from "../../../contexts/ReviewProvider";

/* Helpers */
import texts from "../../../helpers/Text-En.json";

/* Styles */
import "../../../styles/index.css";
import "../media.css";

/* Images */
import tmdbLogo from "../../../assets/images/tmdb-logo.svg";

const DetailsHero = ({
  id,
  title,
  img,
  overview,
  genres,
  releaseDate,
  runtime,
  posterPath,
  voteAverage,
  rating,
  director,
  setShowAddReview,
  setReviewChange,
  reviewChange,
}) => {
  const {
    addToUserWatchListAsync,
    userLoggedIn,
    checkAddedToUserWatchList,
    removeFromUserWatchListAsync,
  } = useContext(UserContext);
  const { getUserReviewByIdAndTypeAsync } = useContext(ReviewContext);

  const brokenImgPath = import.meta.env.VITE_IMG_PATH_BROKEN;

  const [onUserWatchlist, setOnUserWatchlist] = useState(false);
  const [userReviewExists, setUserReviewExists] = useState(false);
  const [showEditReview, setShowEditReview] = useState(false);
  const [userReview, setUserReview] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUserSettings();
  }, [userLoggedIn, reviewChange]);

  async function checkUserSettings() {
    if (userLoggedIn) {
      const resultWatchlist = await checkAddedToUserWatchList(
        id,
        texts.Global_movie
      );

      const resultReview = await getUserReviewByIdAndTypeAsync(
        id,
        texts.Global_movie
      );

      resultReview && setUserReview(resultReview);
      resultReview ? setUserReviewExists(true) : setUserReviewExists(false);
      resultWatchlist ? setOnUserWatchlist(true) : setOnUserWatchlist(false);
    }
    setLoading(false);
  }

  function handleReview() {
    if (userLoggedIn) {
      if (!userReviewExists) {
        setShowAddReview(true);
      } else if (userReviewExists) {
        setShowEditReview(true);
      }
    }
  }

  async function handleWatchlist() {
    if (userLoggedIn) {
      if (onUserWatchlist) {
        const result = await removeFromUserWatchListAsync(
          id,
          texts.Global_movie
        );
        result ? setOnUserWatchlist(false) : setOnUserWatchlist(true);
      } else {
        const dataToAdd = {
          mediaId: id,
          mediaType: texts.Global_movie,
          name: title,
          imagePath: posterPath,
        };
        const result = await addToUserWatchListAsync(dataToAdd);
        result ? setOnUserWatchlist(true) : setOnUserWatchlist(false);
      }
    }
  }

  return (
    <>
      {!loading && (
        <div className="relative w-full h-[400px] bg-overLayLightDark lg:h-[700px]">
          <img
            src={img}
            alt={`Backdrop for ${title}`}
            className="absolute top-0 left-0 object-cover opacity-15 w-full -z-10 h-[400px] lg:h-[700px]"
          />
          <div className="default-container flex flex-row text-primaryLightGrey p-4 justify-center lg:py-8 xl:px-0">
            {posterPath !== brokenImgPath ? (
              <img
                src={posterPath}
                alt={`Poster path for ${title}`}
                className="hidden sm:block sm:h-auto sm:w-[246px] sm:min-w-[246px] sm:align-middle sm:mr-0 lg:mr-16 lg:w-[424px] lg:min-w-[424px]"
              />
            ) : (
              <div className="hidden sm:flex sm:justify-center sm:h-auto sm:w-[246px] sm:min-w-[246px] sm:align-middle sm:mr-0 lg:mr-16 lg:w-[424px] lg:min-w-[424px] border-2 border-primaryLightGrey">
                <PiFilmSlate className="h-[110px] w-[110px] self-center my-[155px] text-primaryLightGrey" />
              </div>
            )}
            <div className="flex flex-col w-full gap-3 py-4 pl-4 lg:pt-4 lg:pl-0">
              <div>
                <div className="text-headingLg">{title}</div>
                <div className="text-textMd">
                  {texts.Global_DirectedBy} {director}
                </div>
              </div>
              <div className="flex flex-row gap-4">
                <div className="text-headingSm">{runtime}</div>
                <div className="text-headingSm">{releaseDate}</div>
              </div>
              <div className="flex flex-row gap-2 flex-wrap">
                {genres.length > 0 &&
                  genres.map((genre, index) => (
                    <div key={index} className="text-headingSm">
                      {index !== genres.length - 1
                        ? `${genre.name},`
                        : genre.name}
                    </div>
                  ))}
              </div>
              <div className="flex flex-col">
                <div className="flex flex-row gap-4 py-2">
                  <div className="tooltip-container">
                    <FaBookmark
                      onClick={handleWatchlist}
                      className={`text-headingMd default-hover ${
                        onUserWatchlist ? "text-primaryOrange" : ""
                      }`}
                    />
                    <span className="tooltip default-box-shadow">
                      {userLoggedIn
                        ? onUserWatchlist
                          ? texts.Details_RemoveFromWatchlist
                          : texts.Details_AddToWatchlist
                        : texts.Details_LogInToAddThisToWatchlist}
                    </span>
                  </div>
                  <div className="tooltip-container">
                    <FaPencilAlt
                      onClick={handleReview}
                      className={`text-headingMd default-hover ${
                        userReviewExists ? "text-primaryOrange" : ""
                      }`}
                    />
                    <span className="tooltip default-box-shadow">
                      {userLoggedIn
                        ? userReviewExists
                          ? texts.Details_EditReview
                          : texts.Details_AddReview
                        : texts.Details_LogInToAddReview}
                    </span>
                  </div>
                </div>
                <div className="flex flex-row gap-4">
                  <div className="flex flex-row gap-2">
                    <p className="font-headerFont text-headingMd text-primaryOrange">
                      {texts.Global_PageShort}
                    </p>
                    {rating ? (
                      <p className="text-headingMd self-center">{rating}</p>
                    ) : (
                      <p className="text-textMd self-center">
                        {texts.Details_NoRatingYet}
                      </p>
                    )}
                  </div>
                  <div className="text-headingMd flex flex-row">
                    <svg width="38" height="38" className="">
                      <image xlinkHref={tmdbLogo} width="30" height="38" />
                    </svg>
                    {voteAverage}
                  </div>
                </div>
              </div>
              <div className="hidden lg:block lg:text-headingSm lg:w-full">
                {overview}
              </div>
            </div>
          </div>
          {showEditReview && (
            <EditReviewForm
              id={userReview.id}
              oldTitle={userReview.title}
              oldDescription={userReview.description}
              oldRating={userReview.rating}
              openEditReveiw={setShowEditReview}
              reviewChanged={setReviewChange}
            />
          )}
        </div>
      )}
    </>
  );
};

export default DetailsHero;
