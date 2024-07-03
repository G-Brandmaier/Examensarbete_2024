/* Librarys */
import { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

/* Components */

/* Context */
import { UserContext } from "../../contexts/UserProvider.jsx";

/* Helpers */
import texts from "../../helpers/Text-En.json";

/* Js */
import { validateLoginForm } from "./validation.js";

/* Styles */
import "../../styles/index.css";
import "./form.css";

const Loginform = () => {
  const { loginAsync, userLoggedIn } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  async function handleSubmitForm(e) {
    e.preventDefault();
    const loginData = {
      email: email,
      password: password,
      rememberMe: rememberMe,
    };

    if (validateLoginForm(loginData)) {
      await loginAsync(loginData);
      if (userLoggedIn) {
        document.querySelector("#passwordError").innerHTML = "";
      } else {
        document.querySelector("#passwordError").innerHTML =
          texts.Error_EmailOrPasswordAreNotValid;
      }
    } else {
      document.querySelector("#passwordError").innerHTML =
        texts.Error_NotAllFieldsAreNotFilledIn;
    }
  }

  return (
    <>
      <div className="default-container w-full">
        <div className="absolute left-0 right-0 mx-auto max-w-[500px] flex flex-col gap-4 rounded p-10 mt-20 mb-4">
          <div className="text-headingSm text-center ">
            {texts.Account_LogIn}
          </div>
          <form className="flex flex-col gap-4">
            <div className="form-input-container">
              <label>{texts.Account_Email}</label>
              <input
                type="text"
                id="email"
                name="email"
                className="form-input"
                onChange={(e) => setEmail(e.target.value)}
                onKeyUp={(e) => setEmail(e.target.value)}
              />
              <span id="emailError" className="form-error"></span>
            </div>
            <div className="form-input-container relative">
              <label>{texts.Account_Password}</label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="form-input"
                onChange={(e) => setPassword(e.target.value)}
                onKeyUp={(e) => setPassword(e.target.value)}
              />
              {showPassword ? (
                <FaEyeSlash
                  onClick={togglePasswordVisibility}
                  className="hide-password-icon"
                />
              ) : (
                <FaEye
                  onClick={togglePasswordVisibility}
                  className="hide-password-icon"
                />
              )}
              <span id="passwordError" className="form-error"></span>
            </div>
            <div className="flex flex-row align-middle gap-2">
              <input
                type="checkbox"
                id="login-checkbox"
                onChange={() => setRememberMe(!rememberMe)}
                className="appearance-none border border-gray-300 rounded w-4 h-4 self-center checked:bg-primaryOrange checked:border-transparent focus:outline-none"
              />
              <label className="text-textMd">{texts.Account_RememberMe}</label>
            </div>
            <Link
              to={"/Register"}
              className="text-center text-primaryOrange default-hover"
            >
              {texts.Account_NotRegisteredClickHere}
            </Link>
            <button
              type="button"
              onClick={handleSubmitForm}
              className={`form-btn default-hover`}
            >
              {texts.Account_LogIn}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Loginform;
