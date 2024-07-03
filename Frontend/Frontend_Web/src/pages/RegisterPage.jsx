/* Librarys */
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/* Components */
import RegisterForm from "../components/account/RegisterForm";

/* Contexts */
import { UserContext } from "../contexts/UserProvider";

/* Helpers */
import texts from "../helpers/Text-En.json";

/* Styles */
import "../styles/index.css";

const RegisterPage = () => {
  const { userLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (userLoggedIn) navigate("/UserProfile");
  }, [userLoggedIn]);

  return (
    <>
      <RegisterForm />
    </>
  );
};

export default RegisterPage;
