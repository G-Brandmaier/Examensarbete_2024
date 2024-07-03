/* Helpers */
import texts from "../../helpers/Text-En.json";

export function validateEmail(email) {
  const regEx = new RegExp(
    "^([a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.(com|net|org|edu|gov|se))$"
  );
  if (!regEx.test(email)) {
    setErrorMessageEmail(true);
    return false;
  } else {
    setErrorMessageEmail(false);
    return true;
  }
}

export function validateUsername(username) {
  const containsBlank = username.includes(" ");
  if (username.length < 4 || containsBlank || username.length > 16) {
    setErrorMessageUsername(true);
    return false;
  } else {
    setErrorMessageUsername(false);
    return true;
  }
}

export function validatePassword(password) {
  const regEx = new RegExp(
    "^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$"
  );
  if (!regEx.test(password)) {
    setErrorMessagePassword(true);
    return false;
  } else {
    setErrorMessagePassword(false);
    return true;
  }
}

export function validateRegistrationForm(data) {
  const regExEmail = new RegExp(
    "^([a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.(com|net|org|edu|gov|se))$"
  );
  const regExPassword = new RegExp(
    "^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$"
  );
  const containsBlank = data.username.includes(" ");

  if (!regExEmail.test(data.email)) return false;
  if (!regExPassword.test(data.password)) return false;
  if (username.length < 4 || containsBlank || username.length > 16)
    return false;
  else return true;
}

export function validateLoginForm(data) {
  if (data.email.trim() === "") return false;
  if (data.password.trim() === "") return false;
  else return true;
}

function setErrorMessageEmail(setError) {
  if (setError) {
    return (document.querySelector("#emailError").innerHTML =
      texts.Error_NotAValidEmail);
  } else document.querySelector("#emailError").innerHTML = "";
}

function setErrorMessageUsername(setError) {
  if (setError) {
    return (document.querySelector("#usernameError").innerHTML =
      texts.Error_NotAValidUsername);
  } else document.querySelector("#usernameError").innerHTML = "";
}

function setErrorMessagePassword(setError) {
  if (setError) {
    return (document.querySelector("#passwordError").innerHTML =
      texts.Error_NotAValidPassword);
  } else document.querySelector("#passwordError").innerHTML = "";
}
