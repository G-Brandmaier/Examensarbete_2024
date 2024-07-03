/* Librarys */
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

/* Components */
import SortBar from "../components/tools/SortBar";
import ReviewCard from "../components/media/cards/ReviewCard";
import Loader from "../components/tools/Loader";

/* Context */
import { ReviewContext } from "../contexts/ReviewProvider";
import { ApiContext } from "../contexts/ApiProvider";

/* Helpers */
import texts from "../helpers/Text-En.json";
import { scrollToTop } from "../helpers/generalHelper";

/* Styles */
import "../styles/index.css";

const ReviewPage = () => {
  const { id } = useParams();
  const { getReviewsByIdAndTypeAsync } = useContext(ReviewContext);
  const { getMediaTeaserAsync } = useContext(ApiContext);

  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [noItems, setNoItems] = useState(false);
  const [reviewChange, setReviewChange] = useState(false);
  const [media, setMedia] = useState({});
  const navigate = useNavigate();

  const currentURL = window.location.href;

  useEffect(() => {
    scrollToTop();
  }, []);

  useEffect(() => {
    getAllReviews();
  }, [reviewChange]);

  async function getAllReviews() {
    let type;
    if (currentURL.includes("MovieDetails")) {
      type = texts.Global_movie;
    } else {
      type = texts.Global_tv;
    }
    const list = await getReviewsByIdAndTypeAsync(id, type);
    if (list !== null) {
      list.sort((a, b) => {
        const dateA = a.updatedAt || a.createdAt;
        const dateB = b.updatedAt || b.createdAt;
        return new Date(dateB) - new Date(dateA);
      });
      const media = await getMediaTeaserAsync(id, type);
      setMedia(media);
      setReviews(list);
      setNoItems(false);
      setReviewsLoading(false);
    } else {
      setReviewsLoading(false);
      setNoItems(true);
    }
  }

  function handleGotoDetails() {
    if (currentURL.includes("MovieDetails")) {
      navigate(`/MovieDetails/${id}`);
    } else {
      navigate(`/TvSeriesDetails/${id}`);
    }
  }

  return (
    <>
      <div className="default-container px-4 pt-8 xl:px-0">
        <div className="max-w-[768px] mx-auto">
          {!reviewsLoading ? (
            noItems ? (
              <>
                <div className="text-headingLg text-primaryOrange py-6">
                  {texts.Global_Reviews}
                </div>
                <div className="flex flex-row justify-center max-w-[768px] p-6 rounded default-box-shadow">
                  <div className="text-headingSx">
                    {texts.Global_NoReviewsYet}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-row gap-8">
                  <img
                    src={media.poster_Path}
                    alt={media.title ? media.title : media.name}
                    className="w-[80px] h-[120px] object-cover"
                  />
                  <div className="">
                    <div className="text-headingLg text-primaryOrange">
                      {texts.Global_Reviews}
                    </div>
                    <div
                      onClick={handleGotoDetails}
                      className="text-headingMd text-primaryOrange default-hover"
                    >
                      {media.title ? media.title : media.name}
                    </div>
                  </div>
                </div>
                <SortBar content={reviews} setContent={setReviews} />
                <ul className="list-none mt-4">
                  {reviews.map((item, index) => (
                    <li className="mb-10" key={index}>
                      <ReviewCard
                        id={item.id}
                        title={item.title}
                        rating={item.rating}
                        createdAt={item.createdAt}
                        updatedAt={item.updatedAt != null ? item.updatedAt : ""}
                        description={item.description}
                        userId={item.identityUserId}
                        author={item.author}
                        mediaId={item.mediaId}
                        mediaType={item.mediaType}
                        setReviewChange={setReviewChange}
                      />
                    </li>
                  ))}
                </ul>
              </>
            )
          ) : (
            <div className="mt-28">
              <Loader size={`w-10 h-10`} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ReviewPage;
