/* Librarys */
import { useContext, useEffect, useState } from "react";
import { FaEye, FaEyeSlash, FaRegQuestionCircle } from "react-icons/fa";

/* Components */
import Icon from "../tools/Icon.jsx";
import IconColorToggler from "./IconColorToggler.jsx";
import IconToggler from "./IconToggler.jsx";

/* Context */
import { UserContext } from "../../contexts/UserProvider.jsx";

/* Helpers */
import texts from "../../helpers/Text-En.json";

/* Js */
import { validateUsername, validatePassword } from "./validation.js";

/* Styles */
import "../../styles/index.css";
import "./form.css";
import { useNavigate } from "react-router-dom";

const EditForm = ({
  oldUsername,
  oldDescription,
  openProfile,
  oldIcon,
  oldIconColor,
}) => {
  const {
    updateUserProfileAsync,
    updateUsernameAsync,
    changeUserPasswordAsync,
    deleteAccountAsync,
  } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const [profileIcon, setProfileIcon] = useState("");
  const [profileIconColor, setProfileIconColor] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [validUsername, setValidUsername] = useState(true);
  const [validPassword, setValidPassword] = useState(false);
  const [profileDataLoading, setProfileDataLoading] = useState(true);
  const [removeApproval, setRemoveApproval] = useState(false);
  const [removeApprovalMessage, setRemoveApprovalMessage] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = (password) => {
    if (password === "new") setShowNewPassword(!showNewPassword);
    else if (password === "old") setShowOldPassword(!showOldPassword);
  };

  useEffect(() => {
    setUsername(oldUsername);
    setDescription(oldDescription);
    setProfileOpen(openProfile);
    setProfileIcon(oldIcon ? oldIcon : "User");
    setProfileIconColor(oldIconColor ? oldIconColor : "#ec6001");
    setProfileDataLoading(false);
  }, []);

  useEffect(() => {
    handleDeleteAccount();
  }, [removeApproval]);

  async function handleProfileChange(e) {
    e.preventDefault();
    const updatedProfile = {
      Description: description,
      OpenProfile: profileOpen,
      Icon: profileIcon,
      IconColor: profileIconColor,
    };

    let messageField = document.querySelector("#edit-profile-message");
    clearMessage(messageField);

    const update = await updateUserProfileAsync(updatedProfile);
    if (update !== null) {
      setDescription(update.description);
      setProfileOpen(update.openProfile);
      setProfileIcon(update.icon);
      setMessage(messageField, false, texts.SuccessMessage_EditComplete);
      setTimeout(function () {
        clearMessage(messageField);
      }, 5000);
    } else {
      setMessage(messageField, true, texts.Error_SomethingWentWrong);
    }
  }

  async function handleUsernameChange(e) {
    e.preventDefault();
    let messageField = document.querySelector("#edit-username-message");
    clearMessage(messageField);

    if (validUsername) {
      const updatedUsername = await updateUsernameAsync(username);
      if (updatedUsername !== null) {
        setUsername(updatedUsername);
        setMessage(messageField, false, texts.SuccessMessage_UsernameChanged);
        setTimeout(function () {
          clearMessage(messageField);
        }, 5000);
      } else {
        setMessage(messageField, true, texts.Error_SomethingWentWrong);
      }
    }
  }

  async function handlePasswordChange(e) {
    e.preventDefault();
    let messageField = document.querySelector("#edit-password-message");
    clearMessage(messageField);
    if (validPassword) {
      const result = await changeUserPasswordAsync(password, newPassword);
      if (result) {
        setPassword("");
        setNewPassword("");
        setMessage(messageField, false, texts.SuccessMessage_PasswordChanged);
        setTimeout(function () {
          clearMessage(messageField);
        }, 5000);
      } else {
        setMessage(messageField, true, texts.Error_SomethingWentWrong);
      }
    }
  }

  async function handleDeleteAccount() {
    setRemoveApprovalMessage(false);
    if (removeApproval) {
      const result = await deleteAccountAsync();
      if (result) {
        setTimeout(function () {
          navigate("/");
        }, 1000);
      } else {
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
    <div className="default-container w-full">
      {!profileDataLoading && (
        <div className="mx-auto max-w-[500px] flex flex-col gap-4 rounded p-10 mb-4">
          <div className="text-headingLg text-primaryOrange font-semibold text-center border-b-2 border-primaryOrange">
            {texts.UserProfile_EditProfile}
          </div>
          <div className="flex flex-col gap-4 border-b-2 border-primaryOrange">
            <div className="form-input-container mb-4">
              <div className="text-headingMd text-center text-primaryOrange mb-4">
                {texts.UserProfile_ChangeProfileIcon}
              </div>
              <div className="w-[120px] h-[120px] rounded-full p-2 border-2 border-primaryDarkGrey mx-auto overflow-hidden md:w-[160px] md:h-[160px] md:p-4">
                <Icon
                  name={profileIcon}
                  style={`w-full h-full p-2`}
                  color={profileIconColor}
                />
              </div>
              <div className="flex flex-row gap-2 self-center">
                <IconToggler setSelectedIcon={setProfileIcon} />
                <IconColorToggler
                  setSelectedColor={setProfileIconColor}
                  selectedColor={profileIconColor}
                />
              </div>
            </div>
            <div className="form-input-container">
              <div className="text-textMd text-primaryOrange">
                {texts.UserProfile_ChangeDescription}
              </div>
              <textarea
                id="description"
                name="description"
                rows="5"
                maxLength={250}
                className="h-[150px] rounded p-2 text-white bg-secondaryGrey"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <span id="descriptionError" className="form-error"></span>
            </div>
            <div className="flex flex-row gap-2 align-middle py-1">
              <input
                type="checkbox"
                id="edit-profile-checkbox"
                checked={profileOpen}
                onChange={() => setProfileOpen(!profileOpen)}
                className="appearance-none border border-gray-300 rounded w-4 h-4 self-center checked:bg-primaryOrange checked:border-transparent focus:outline-none"
              />
              <label className="text-textMd text-primaryOrange">
                {texts.UserProfile_SetUserProfileOpen}
              </label>
            </div>
            <div className="flex flex-row gap-2 justify-between align-middle py-1">
              <span id="edit-profile-message"></span>
              <button
                type="button"
                className="default-hover pb-4 text-primaryOrange font-semibold"
                onClick={handleProfileChange}
              >
                {texts.Global_Save}
              </button>
            </div>
          </div>
          <div className="form-input-container border-b-2 border-primaryOrange">
            <div className="text-textMd text-primaryOrange">
              {texts.UserProfile_ChangeUsername}
            </div>
            <input
              type="text"
              id="username"
              name="username"
              className="form-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyUp={(e) =>
                setValidUsername(validateUsername(e.target.value))
              }
            />
            <span id="usernameError" className="form-error"></span>
            <div className="flex flex-row gap-2 justify-between align-middle py-1">
              <span id="edit-username-message"></span>
              <button
                type="button"
                onClick={handleUsernameChange}
                disabled={!validUsername ? true : false}
                className={`default-hover self-end py-4 text-primaryOrange font-semibold ${
                  validUsername ? "" : "opacity-5"
                }`}
              >
                {texts.Global_Save}
              </button>
            </div>
          </div>
          <div className="form-input-container relative">
            <div className="flex flex-row gap-2">
              <div className="text-textMd text-primaryOrange">
                {texts.UserProfile_ChangePassword}
              </div>
              <div className="tooltip-container self-center">
                <FaRegQuestionCircle className="text-textMd" />
                <span className="tooltip default-box-shadow w-[200px]">
                  {texts.Account_PasswordMustContain}
                </span>
              </div>
            </div>
            <input
              type={showOldPassword ? "text" : "password"}
              id="oldPassword"
              name="oldPassword"
              placeholder={texts.UserProfile_OldPassword}
              className="form-input"
              onChange={(e) => setPassword(e.target.value)}
            />
            {showOldPassword ? (
              <FaEyeSlash
                onClick={() => togglePasswordVisibility("old")}
                className="hide-password-icon"
              />
            ) : (
              <FaEye
                onClick={() => togglePasswordVisibility("old")}
                className="hide-password-icon"
              />
            )}
            <span className="form-error"></span>
          </div>
          <div className="form-input-container relative">
            <input
              type={showNewPassword ? "text" : "password"}
              id="newPassword"
              name="newPassword"
              placeholder={texts.UserProfile_NewPassword}
              className="form-input"
              onChange={(e) => setNewPassword(e.target.value)}
              onKeyUp={(e) =>
                setValidPassword(validatePassword(e.target.value))
              }
            />
            {showNewPassword ? (
              <FaEyeSlash
                onClick={() => togglePasswordVisibility("new")}
                className="hide-password-icon"
              />
            ) : (
              <FaEye
                onClick={() => togglePasswordVisibility("new")}
                className="hide-password-icon"
              />
            )}
            <span id="passwordError" className="form-error"></span>
          </div>
          <div className="flex flex-row gap-2 justify-between align-middle py-1">
            <span id="edit-password-message"></span>
            <button
              type="button"
              disabled={!validPassword ? true : false}
              onClick={handlePasswordChange}
              className={`default-hover self-end pb-4 text-primaryOrange font-semibold ${
                validPassword ? "" : "opacity-5"
              }`}
            >
              {texts.Global_Save}
            </button>
          </div>
          <div className="form-input-container">
            <div className="text-textMd text-primaryOrange">
              <div>{texts.UserProfile_DeleteAccount}</div>
            </div>
            <p className="text-textSm font-semibold text-error">
              {texts.UserProfile_Attention.toUpperCase()}!
            </p>
            <span className="text-textSm text-white">
              {texts.UserProfile_ThisActionCanNotBeReversed}
            </span>
            <button
              type="button"
              onClick={() => setRemoveApprovalMessage(true)}
              className={`default-hover self-start bg-error rounded p-2 mt-4 font-bold`}
            >
              {texts.UserProfile_Delete}
            </button>
          </div>
        </div>
      )}
      {removeApprovalMessage && (
        <div className="absolute top-0 bottom-0 left-0 right-0 bg-primaryBlack rounded p-10 m-auto w-[300px] h-[300px] default-box-shadow md:w-[600px] md:h-[300px]">
          <div className="text-headingSm md:text-headingMd text-center my-3 md:my-6">
            <p className=" text-primaryOrange">
              {texts.UserProfile_RemoveAccountApprovalMessage}
            </p>
            <p className="text-white">
              {texts.UserProfile_ThisActionCanNotBeReversed}
            </p>
          </div>
          <div className="flex flex-row gap-x-12 justify-center">
            <button
              onClick={() => setRemoveApproval(true)}
              className="text-headingSm md:text-headingMd font-bold form-btn w-16 default-hover"
            >
              {texts.Global_Yes}
            </button>
            <button
              onClick={() => {
                setRemoveApproval(false), setRemoveApprovalMessage(false);
              }}
              className="text-headingSm md:text-headingMd font-bold form-btn w-16 default-hover"
            >
              {texts.Global_No}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditForm;
