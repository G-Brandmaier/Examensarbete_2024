/* Librarys */
import { useContext, useEffect, useState } from "react";
import { FaStar, FaPencilAlt } from "react-icons/fa";
import { format } from "date-fns";

/* Components */
import EditReviewForm from "../detailspage/EditReviewForm";

/* Context */
import { UserContext } from "../../../contexts/UserProvider";
import { ReviewContext } from "../../../contexts/ReviewProvider";

/* Helpers */
import texts from "../../../helpers/Text-En.json";

/* Styles */
import "../../../styles/index.css";
import { Link } from "react-router-dom";

const ReviewCard = (props) => {
  const { userLoggedIn } = useContext(UserContext);
  const { getUserReviewByIdAndTypeAsync } = useContext(ReviewContext);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [editReviewOpen, setEditReviewOpen] = useState(false);
  const [userReveiw, setUserReview] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkLoggedInUserMatchReview();
  }, [userLoggedIn]);

  async function checkLoggedInUserMatchReview() {
    if (userLoggedIn) {
      const result = await getUserReviewByIdAndTypeAsync(
        props.mediaId,
        props.mediaType
      );
      if (result !== null) {
        result.identityUserId === props.userId
          ? setUserReview(true)
          : setUserReview(false);
      } else {
        setUserReview(false);
      }
    }
    setLoading(false);
  }

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <>
      {!loading && (
        <div className="max-w-[768px] p-6 rounded default-box-shadow">
          <div className="flex flex-row gap-2 mb-2 py-2">
            <div className="flex flex-col gap-2 w-full">
              {props.name && (
                <Link
                  to={`/${
                    props.mediaType === texts.Global_movie
                      ? "MovieDetails"
                      : "TvSeriesDetails"
                  }/${props.mediaId}`}
                  className="text-headingSm md:text-headingMd text-primaryOrange default-hover"
                >
                  {props.name}
                </Link>
              )}
              <div className="flex flex-row justify-between">
                <div className="flex flex-row gap-2">
                  <FaStar className="text-textMd text-primaryOrange" />
                  <div className="text-textSm">{props.rating}/10</div>
                </div>
                {userReveiw && props.setReviewChange && (
                  <div className="tooltip-container">
                    <FaPencilAlt
                      onClick={() => {
                        setEditReviewOpen(true);
                      }}
                      className={`text-headingMd default-hover`}
                    />
                    <span className="tooltip default-box-shadow w-[100px]">
                      {texts.Details_EditReview}
                    </span>
                  </div>
                )}
              </div>
              <div className="text-headingSm">{props.title}</div>
              <div className="flex flex-row gap-2">
                <div className="text-primaryOrange self-center">
                  {props.author}
                </div>
                <div className="text-textXs self-center">
                  {format(props.createdAt, "dd MMMM yyyy")}
                </div>
                {props.updatedAt !== "" && (
                  <div className="text-textXs self-center">
                    ({texts.Global_updated}{" "}
                    {format(props.updatedAt, "dd MMMM yyyy")})
                  </div>
                )}
              </div>
              <div className="text-textMd text-wrap">
                {showFullDescription
                  ? props.description
                  : props.description.length < 500
                  ? props.description
                  : `${props.description.slice(0, 500)}...`}
              </div>
              {props.description.length > 500 && (
                <button
                  onClick={toggleDescription}
                  className="text-primaryOrange underline default-hover"
                >
                  {showFullDescription
                    ? texts.Global_ViewLess
                    : texts.Global_ViewMore}
                </button>
              )}
            </div>
          </div>
          {editReviewOpen && (
            <EditReviewForm
              id={props.id}
              oldTitle={props.title}
              oldDescription={props.description}
              oldRating={props.rating}
              openEditReveiw={setEditReviewOpen}
              reviewChanged={props.setReviewChange}
            />
          )}
        </div>
      )}
    </>
  );
};

export default ReviewCard;
