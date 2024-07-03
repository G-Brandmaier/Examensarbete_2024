/* Librarys */
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

/* Components */
import EditForm from "../components/account/EditForm";
import Loader from "../components/tools/Loader";

/* Context */
import { UserContext } from "../contexts/UserProvider";

/* Styles */
import "../styles/index.css";

const EditProfilePage = () => {
  const { getUserProfileAsync, getUserAsync, userLoggedIn } =
    useContext(UserContext);
  const [userProfile, setUserProfile] = useState({});
  const [userProfileLoading, setUserProfileLoading] = useState(true);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (userLoggedIn) getUserProfile();
    else navigate("/");
  }, [userLoggedIn]);

  async function getUserProfile() {
    const user = await getUserAsync();
    const profile = await getUserProfileAsync();
    setUsername(user.userName);
    setUserProfile(profile);
    setUserProfileLoading(false);
  }
  return (
    <>
      {!userProfileLoading ? (
        <EditForm
          oldUsername={username}
          oldDescription={
            userProfile.description ? userProfile.description : ""
          }
          openProfile={userProfile.openProfile}
          oldIcon={userProfile.icon}
          oldIconColor={userProfile.iconColor}
        />
      ) : (
        <div className="mt-28">
          <Loader size={`w-10 h-10`} />
        </div>
      )}
    </>
  );
};

export default EditProfilePage;
