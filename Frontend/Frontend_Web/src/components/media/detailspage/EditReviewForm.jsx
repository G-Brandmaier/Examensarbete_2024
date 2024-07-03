/* Librarys */
import { useState, useContext, useEffect, useRef } from "react";
import { FaStar, FaTimes } from "react-icons/fa";

/* Context */
import { ReviewContext } from "../../../contexts/ReviewProvider.jsx";

/* Styles */
import "../../../styles/index.css";

/* Helpers */
import texts from "../../../helpers/Text-En.json";
import { handleClickOutside } from "../../../helpers/generalHelper.js";

const EditReviewForm = ({
  id,
  oldTitle,
  oldRating,
  oldDescription,
  openEditReveiw,
  reviewChanged,
}) => {
  const { updateReviewAsync, removeReviewAsync } = useContext(ReviewContext);
  const [starsChecked, setStarsChecked] = useState(0);
  const [starsHovered, setStarsHovered] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [formError, setFormError] = useState(false);
  const [removeApproval, setRemoveApproval] = useState(false);
  const [removeApprovalMessage, setRemoveApprovalMessage] = useState(false);
  const formRef = useRef();

  useEffect(() => {
    handleClickOutside(formRef, openEditReveiw);
    generateDefaultValues();
  }, []);

  useEffect(() => {
    handleRemoveReview();
  }, [removeApproval]);

  const handleStarHover = (index) => {
    setStarsHovered(index + 1);
  };

  const handleStarClick = (index) => {
    setStarsChecked(index + 1);
  };

  function generateDefaultValues() {
    setStarsChecked(oldRating);
    setTitle(oldTitle);
    setDescription(oldDescription);
  }

  function checkFormValid() {
    if (title.length < 2 || title.trim() === "") return false;
    else if (description.length < 5 || description.trim() === "") return false;
    else if (starsChecked === 0) return false;
    else return true;
  }

  async function handleSubmitReview(e) {
    let messageField = document.querySelector("#edit-review-message");
    clearMessage(messageField);

    if (checkFormValid()) {
      const review = {
        id: id,
        title: title,
        rating: starsChecked,
        description: description,
      };
      const result = await updateReviewAsync(review);
      if (result) {
        setMessage(messageField, false, texts.SuccessMessage_EditComplete);
        reviewChanged(true);
        setTimeout(function () {
          openEditReveiw(false);
        }, 1000);
      } else {
        setMessage(messageField, true, texts.Error_SomethingWentWrong);
      }
    } else {
      setMessage(messageField, true, texts.Error_NotAllFieldsAreNotFilledIn);
    }
  }

  async function handleRemoveReview() {
    setFormError(false);
    setRemoveApprovalMessage(false);
    setFormMessage("");
    if (removeApproval) {
      const result = await removeReviewAsync(id);
      if (result) {
        setFormMessage(texts.SuccessMessage_RemoveComplete);
        reviewChanged(true);
        setTimeout(function () {
          openEditReveiw(false);
        }, 1000);
      } else {
        setFormError(true);
        setFormMessage(texts.Error_AllFieldsAreNotFilledIn);
      }
    }
  }

  function clearMessage(field) {
    field.innerHTML = "";
    field.className = "";
  }

  function setMessage(field, isError, message) {
    if (!isError) {
      field.innerHTML = message;
      field.className = "form-success";
    } else {
      field.innerHTML = message;
      field.className = "form-error";
    }
  }

  return (
    <div className="review-overlay">
      <div
        ref={formRef}
        className="absolute left-0 right-0 top-1/4 p-4 min-w-[350px] h-[500px] mx-auto bg-overLayDarker rounded default-box-shadow md:h-[500px] md:w-[700px] lg:w-[900px]"
      >
        <FaTimes
          onClick={() => openEditReveiw(false)}
          className="absolute right-10 top-10 text-headingMd default-hover"
        />
        <div className="max-w-[450px] mx-auto mt-6">
          <div className="text-headingMd text-primaryOrange text-center">
            {texts.Details_EditReview}
          </div>
          <div className="form-input-container">
            <div className="text-headingSm text-primaryOrange mb-2">
              {texts.Details_Title}
            </div>
            <input
              type="text"
              id="title"
              name="title"
              className="form-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <span id="usernameError" className="form-error"></span>
          </div>
          <div className="form-input-container">
            <div className="text-headingSm text-primaryOrange mb-2">
              {texts.Details_Review}
            </div>
            <textarea
              id="description"
              name="description"
              rows="5"
              maxLength={2000}
              className="h-[150px] rounded p-2 text-white bg-secondaryGrey resize-none default-scrollbar"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <span id="descriptionError" className="form-error"></span>
          </div>
          <div className="flex flex-row text-headingMd gap-4 py-4">
            {[...Array(10)].map((_, index) => (
              <FaStar
                key={index}
                className={`${
                  index < (starsChecked || starsHovered)
                    ? "text-primaryOrange"
                    : ""
                }`}
                onMouseEnter={() => handleStarHover(index)}
                onMouseLeave={() => setStarsHovered(0)}
                onClick={() => handleStarClick(index)}
              />
            ))}
          </div>
          <div className="flex flex-row justify-between">
            <button
              onClick={handleSubmitReview}
              className="form-btn default-hover"
            >
              {texts.Global_Save}
            </button>
            <div className={`text-headingSx font-bold mt-4 self-center`}>
              <span id="edit-review-message"></span>
            </div>
            <button
              onClick={() => setRemoveApprovalMessage(true)}
              className="bg-error rounded p-2 mt-4 font-bold self-end"
            >
              {texts.Details_RemovewReview}
            </button>
          </div>
        </div>
        {removeApprovalMessage && (
          <div className="absolute top-0 bottom-0 left-0 right-0 bg-primaryBlack rounded p-10 m-auto w-[300px] h-[300px] default-box-shadow md:w-[600px] md:h-[260px]">
            <div className="text-headingSm md:text-headingMd text-center text-primaryOrange my-8">
              {texts.Details_RemoveReviewApprovalMessage}
            </div>
            <div className="flex flex-row gap-x-12 justify-center">
              <button
                onClick={() => setRemoveApproval(true)}
                className="text-headingSx md:text-headingSm font-bold form-btn w-16 default-hover"
              >
                {texts.Global_Yes}
              </button>
              <button
                onClick={() => {
                  setRemoveApproval(false), setRemoveApprovalMessage(false);
                }}
                className="text-headingSx md:text-headingSm font-bold form-btn w-16 default-hover"
              >
                {texts.Global_No}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditReviewForm;
