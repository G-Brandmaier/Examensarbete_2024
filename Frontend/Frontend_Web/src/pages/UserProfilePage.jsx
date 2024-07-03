/* Librarys */
import { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaCircle } from "react-icons/fa";
import { format } from "date-fns";

/* Components */
import Carousel from "../components/carousel/Carousel";
import CarouselMediaCard from "../components/carousel/CarouselMediaCard";
import ReviewCard from "../components/media/cards/ReviewCard";
import Icon from "../components/tools/Icon";
import Loader from "../components/tools/Loader.jsx";

/* Context */
import { UserContext } from "../contexts/UserProvider";
import { ReviewContext } from "../contexts/ReviewProvider";

/* Helpers */
import texts from "../helpers/Text-En.json";
import {
  greetingGenerator,
  getMemberMedal,
  getReviewMedal,
  getMemberDays,
  scrollToTop,
} from "../helpers/generalHelper.js";

/* Images */
import memberMedalDescription from "../assets/images/medals/medalDescription.png";
import reviewMedalDescription from "../assets/images/coins/coinDescription.png";

const UserProfilePage = () => {
  const {
    userLoggedIn,
    getUserProfileAsync,
    getUserAsync,
    getUserWatchListAsync,
  } = useContext(UserContext);
  const { getLatestUserReviewsAsync, getUserReviewCountAsync } =
    useContext(ReviewContext);
  const navigate = useNavigate();

  const [userProfile, setUserProfile] = useState({});
  const [userProfileLoading, setUserProfileLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [userReviews, setUserReviews] = useState([]);
  const [userTopRated, setUserTopRated] = useState([]);
  const [watchlistItems, setWatchlistItems] = useState([]);
  const [greeting, setGreeting] = useState("Hello");
  const [memberMedal, setMemberMedal] = useState("");
  const [reviewMedal, setReviewMedal] = useState("");
  const [reviewCount, setReviewCount] = useState(0);

  useEffect(() => {
    if (userLoggedIn) {
      getUserProfile();
      scrollToTop();
    } else navigate("/");
  }, [userLoggedIn]);

  async function getUserProfile() {
    const user = await getUserAsync();
    const profile = await getUserProfileAsync();
    const latestReviews = await getLatestUserReviewsAsync(3);
    const watchlist = await getUserWatchListAsync();
    const reviews = await getUserReviewCountAsync();

    if (latestReviews !== null) {
      setUserReviews(latestReviews);
    }
    if (watchlist !== null) {
      setWatchlistItems(watchlist);
    }
    setUsername(user.userName);
    setUserProfile(profile);
    setGreeting(greetingGenerator());
    setMemberMedal(getMemberMedal(profile.memberSince));
    setReviewMedal(getReviewMedal(reviews));
    setReviewCount(reviews);
    setUserProfileLoading(false);
  }

  return (
    <div className="default-container">
      {!userProfileLoading ? (
        <div className="w-full mt-20 mb-20">
          <div className="flex flex-col gap-4 py-6 px-4 bg-overLayLightDark default-box-shadow rounded-md md:flex-row md:gap-10 lg:px-40">
            <div className="flex flex-col">
              <div className="w-[160px] h-[160px] rounded-full p-2 border-2 border-primaryDarkGrey mx-auto md:w-[160px] md:h-[160px] md:p-4">
                <Icon
                  name={userProfile.icon ? userProfile.icon : "User"}
                  style={`w-full h-full p-2`}
                  color={
                    userProfile.iconColor ? userProfile.iconColor : "#ec6001"
                  }
                />
              </div>
              <div className="text-textXs p-2 text-center text-nowrap md:self-end">
                {texts.UserProfile_MemberSince}{" "}
                {format(userProfile.memberSince, "dd MMMM yyyy")}
              </div>
            </div>
            <div className="flex flex-col w-full">
              <div
                style={{
                  color: userProfile.iconColor
                    ? userProfile.iconColor
                    : "#ec6001",
                }}
                className="text-center text-nowrap text-headingSm pb-2 md:pb-0 md:text-headingLg md:text-left"
              >
                {greeting}, {username}!
              </div>
              <div className="max-w-[630px] w-full max-h-80 break-all break-words hyphens-auto">
                {userProfile.description !== null
                  ? userProfile.description
                  : ""}
              </div>
            </div>
            <div className="flex flex-row gap-4 justify-center md:flex-col md:justify-self-end">
              <div className="tooltip-container">
                <img
                  src={memberMedal}
                  alt=""
                  className="h-auto w-12 min-w-12 mx-auto"
                />
                <p className="text-center text-textXs text-primaryLightGrey mt-1">
                  {getMemberDays(userProfile.memberSince)} {texts.Global_days}
                </p>
                <span className="tooltip default-box-shadow w-[240px] h-auto left-1 md:w-[360px] md:left-auto md:right-2">
                  <img src={memberMedalDescription} />
                </span>
              </div>
              <div className="tooltip-container">
                <img
                  src={reviewMedal}
                  alt=""
                  className="h-auto w-16 min-w-16 mt-3 md:mt-0"
                />
                <p className="text-center text-textXs text-primaryLightGrey mt-1">
                  {reviewCount} {texts.Global_reviews}
                </p>
                <span className="tooltip default-box-shadow w-[240px] h-auto right-0 md:w-[360px] md:right-2">
                  <img src={reviewMedalDescription} />
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-28">
          <Loader size={`w-10 h-10`} />
        </div>
      )}
      {watchlistItems.length > 0 ? (
        <Carousel
          id={`userProfilePageWatchlist`}
          title={`${texts.UserProfile_Watchlist}`}
          linkTitle={texts.Global_ViewAll}
          linkForTitle="/UserProfile/Watchlist"
          content={watchlistItems.map((item, index) => (
            <CarouselMediaCard
              key={index}
              id={item.mediaId}
              title={item.name}
              posterPath={item.imagePath}
              linkTo={
                item.mediaType === "movie" ? "MovieDetails" : "TvSeriesDetails"
              }
            />
          ))}
        />
      ) : (
        <div className="mb-8">
          <div className="text-headingLg font-semibold text-primaryOrange">
            {texts.UserProfile_Watchlist}
          </div>
          <div className="text-headingMd">
            {texts.UserProfile_NoItmesAddedYet}
          </div>
        </div>
      )}
      {userReviews.length > 0 ? (
        <div className="pt-6">
          <div className="flex flex-row gap-6 text-primaryOrange align-middle">
            <div className="text-headingLg self-center">
              {texts.UserProfile_LatestReview}
            </div>
            <FaCircle className="w-2 h-2 self-center" />
            <Link
              className="text-headingSm font-normal default-hover self-center"
              to={"/UserProfile/Reviews"}
            >
              {texts.Global_ViewAllReviews}
            </Link>
          </div>
          <ul className="list-none mt-4">
            {userReviews.map((item, index) => (
              <li className="mb-10" key={index}>
                <ReviewCard
                  id={item.id}
                  name={item.mediaName}
                  posterPath={item.mediaPosterPath}
                  title={item.title}
                  rating={item.rating}
                  createdAt={item.createdAt}
                  updatedAt={item.updatedAt != null ? item.updatedAt : ""}
                  description={item.description}
                  userId={item.identityUserId}
                  author={item.author}
                  mediaId={item.mediaId}
                  mediaType={item.mediaType}
                />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="mb-8">
          <div className="text-headingLg font-semibold text-primaryOrange">
            {texts.Global_LatestReview}
          </div>
          <div className="text-headingMd">{texts.Global_NoReviewsYet}</div>
        </div>
      )}
      {userTopRated.length > 0 && (
        <Carousel
          id={`userProfilePageTopRated`}
          title={texts.UserProfile_YourTopRated}
          // content={upcomingMovies.map((item, index) => (
          //   <CarouselMediaCard
          //     key={index}
          //     id={item.id}
          //     title={item.title}
          //     posterPath={item.poster_Path}
          //     linkTo={"MovieDetails"}
          //   />
          // ))}
        />
      )}
    </div>
  );
};

export default UserProfilePage;
