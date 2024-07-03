/* Librarys */
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/* Components */
import LoginForm from "../components/account/LoginForm";

/* Context */
import { UserContext } from "../contexts/UserProvider";

/* Styles */
import "../styles/index.css";

const LoginPage = () => {
  const { userLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (userLoggedIn) navigate(-1);
  }, [userLoggedIn]);

  return (
    <>
      <LoginForm />
    </>
  );
};

export default LoginPage;
