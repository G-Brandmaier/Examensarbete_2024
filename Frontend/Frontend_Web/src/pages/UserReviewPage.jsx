/* Librarys */
import { useContext, useEffect, useState } from "react";
import { FaStar, FaCircle } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";

/* Components */
import SortBar from "../components/tools/SortBar";
import ReviewCard from "../components/media/cards/ReviewCard";
import Loader from "../components/tools/Loader";

/* Context */
import { UserContext } from "../contexts/UserProvider";
import { ReviewContext } from "../contexts/ReviewProvider";

/* Helpers */
import texts from "../helpers/Text-En.json";
import { scrollToTop } from "../helpers/generalHelper";

/* Styles */
import "../styles/index.css";

const UserReviewsPage = () => {
  const { userLoggedIn } = useContext(UserContext);
  const { getUserReviewsAsync } = useContext(ReviewContext);

  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [noItems, setNoItems] = useState(false);
  const [reviewChange, setReviewChange] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getAllReviews();
    scrollToTop();
  }, []);

  useEffect(() => {
    if (reviewChange) getAllReviews();
  }, [reviewChange]);

  useEffect(() => {
    if (!userLoggedIn) navigate("/");
  }, [userLoggedIn]);

  async function getAllReviews() {
    if (userLoggedIn) {
      setReviewChange(false);
      const list = await getUserReviewsAsync();
      if (list.length > 0) {
        list.sort((a, b) => {
          const dateA = a.updatedAt || a.createdAt;
          const dateB = b.updatedAt || b.createdAt;
          return new Date(dateB) - new Date(dateA);
        });
        setReviews(list);
        setNoItems(false);
      } else {
        setNoItems(true);
      }
      setReviewsLoading(false);
    } else {
      navigate("/");
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
                <div className="text-headingLg text-primaryOrange">
                  {texts.Global_Reviews}
                </div>
                <SortBar content={reviews} setContent={setReviews} />
                <ul className="list-none mt-4">
                  {reviews.map((item, index) => (
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

export default UserReviewsPage;
