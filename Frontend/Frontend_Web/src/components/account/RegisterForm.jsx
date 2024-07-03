/* Librarys */
import { useContext, useEffect, useState } from "react";
import { FaEye, FaEyeSlash, FaRegQuestionCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

/* Components */

/* Context */
import { UserContext } from "../../contexts/UserProvider.jsx";

/* Helpers */
import texts from "../../helpers/Text-En.json";

/* Js */
import {
  validateEmail,
  validateUsername,
  validatePassword,
  validateRegistrationForm,
} from "./validation.js";

/* Styles */
import "../../styles/index.css";
import "./form.css";

const RegisterForm = () => {
  const { registerAsync } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [usernameBlur, setUsernameBlur] = useState(false);
  const [email, setEmail] = useState("");
  const [emailBlur, setEmailBlur] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordBlur, setPasswordBlur] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [validUsername, setValidUsername] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    checkForm();
  }, [validUsername, validEmail, validPassword]);

  useEffect(() => {
    validateInputs();
  }, [username, email, password, usernameBlur, emailBlur, passwordBlur]);

  function validateInputs() {
    usernameBlur && setValidUsername(validateUsername(username));
    emailBlur && setValidEmail(validateEmail(email));
    passwordBlur && setValidPassword(validatePassword(password));
  }

  function checkForm() {
    if (validEmail && validPassword && validUsername) setFormValid(true);
    else setFormValid(false);
  }

  async function handleSubmitForm(e) {
    e.preventDefault();

    const registerData = {
      username: username,
      email: email,
      password: password,
    };
    if (validateRegistrationForm(registerData)) {
      if (await registerAsync(registerData)) {
        navigate("/Login");
      } else {
        document.querySelector("#passwordError").innerHTML =
          texts.Error_RegistrationNotCompleted;
      }
    }
  }
  return (
    <div className="default-container w-full">
      <div className="absolute left-0 right-0 mx-auto max-w-[500px] flex flex-col gap-4 rounded p-10 mt-20 mb-4">
        <div className="text-headingSm text-center">
          {texts.Account_Register}
        </div>
        <form className="flex flex-col gap-4">
          <div className="form-input-container">
            <label>{texts.Account_Username}</label>
            <input
              type="text"
              id="username"
              name="username"
              className="form-input"
              onChange={(e) => setUsername(e.target.value)}
              onKeyUp={(e) => setUsername(e.target.value)}
              onBlur={() => setUsernameBlur(true)}
            />
            <span id="usernameError" className="form-error"></span>
          </div>
          <div className="form-input-container">
            <label>{texts.Account_Email}</label>
            <input
              type="text"
              id="email"
              name="email"
              className="form-input"
              onChange={(e) => setEmail(e.target.value)}
              onKeyUp={(e) => setEmail(e.target.value)}
              onBlur={() => setEmailBlur(true)}
            />
            <span id="emailError" className="form-error"></span>
          </div>
          <div className="form-input-container relative">
            <div className="flex flex-row gap-2">
              <label>{texts.Account_Password}</label>
              <div className="tooltip-container self-center">
                <FaRegQuestionCircle className="text-textMd" />
                <span className="tooltip default-box-shadow w-[200px]">
                  {texts.Account_PasswordMustContain}
                </span>
              </div>
            </div>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className="form-input"
              onChange={(e) => setPassword(e.target.value)}
              onKeyUp={(e) => setPassword(e.target.value)}
              onBlur={() => setPasswordBlur(true)}
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
          <button
            type="button"
            disabled={!formValid ? true : false}
            className={`form-btn default-hover`}
            onClick={handleSubmitForm}
          >
            {texts.Account_Register}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
