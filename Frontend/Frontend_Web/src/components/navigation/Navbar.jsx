/* Librarys */
import { useState, useEffect, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserProvider";
import { FaTimes, FaBookmark, FaStar, FaSearch } from "react-icons/fa";
import { PiUserListLight } from "react-icons/pi";
import { FaUserPen } from "react-icons/fa6";
import { GoSearch } from "react-icons/go";

/* Styles */
import "../../styles/index.css";
import "./navbar.css";

/* Components */
import SearchBar from "./SearchBar";

/* Helpers */
import texts from "../../helpers/Text-En.json";
import { handleClickOutside } from "../../helpers/generalHelper";

/* Images */
import robot from "../../assets/images/robot.png";

const NavBar = () => {
  const { userLoggedIn, logOutAsync } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const menuContainerRef = useRef(null);
  const userMenuContainerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    handleClickOutside(userMenuContainerRef, setUserMenuOpen);
    handleClickOutside(menuContainerRef, setMenuOpen);
  }, []);

  async function handleLogOut() {
    const result = await logOutAsync();
    setUserMenuOpen(false);
  }

  return (
    <div className="w-full h-20 bg-primaryDarkGrey default-box-shadow">
      <div className="default-container px-4 flex flex-row justify-between xl:px-0">
        <Link
          to="/"
          className="text-primaryOrange font-bold text-header font-headerFont my-auto"
        >
          {texts.Global_PageName}
        </Link>
        <SearchBar inMenu={false} setMenuOpen={setMenuOpen} />
        <div className="text-primaryOrange my-[10px] p-1 text-2xl flex gap-4 min-w-[130px] flex-row-reverse">
          <img
            src={robot}
            alt="robot"
            className="hidden sm:block w-14 h-auto"
          />
          <PiUserListLight
            className="w-12 h-12 default-hover self-end"
            onClick={() => {
              userLoggedIn
                ? setUserMenuOpen(!userMenuOpen)
                : navigate("/Login");
            }}
          />
          {userMenuOpen && (
            <div ref={userMenuContainerRef} className="menu-overlay">
              <div className="menu-overlay-color">
                <div className="menu">
                  <FaTimes
                    className="default-hover self-end text-white"
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                  />
                  <ul className="list-none text-primaryOrange text-headingSm border-l-2 pl-4 border-primaryOrange justify-self-end">
                    <li>
                      <Link
                        to="/UserProfile"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex flex-row py-4 deafult-hover align-middle gap-2"
                      >
                        <FaUserPen className="text-textMd self-center" />
                        {texts.UserProfile_UserProfile}
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/UserProfile/EditProfile"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex flex-row py-4 deafult-hover align-middle gap-2"
                      >
                        <FaUserPen className="text-textMd self-center" />
                        {texts.UserProfile_EditProfile}
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/UserProfile/Watchlist"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex flex-row py-4 deafult-hover align-middle gap-2"
                      >
                        <FaBookmark className="text-textMd self-center" />
                        {texts.UserProfile_Watchlist}
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/UserProfile/Reviews"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex flex-row py-4 deafult-hover align-middle gap-2"
                      >
                        <FaStar className="text-textMd self-center" />
                        {texts.UserProfile_YourReviews}
                      </Link>
                    </li>
                    <li
                      onClick={handleLogOut}
                      className="flex flex-row py-4 default-hover align-middle gap-2"
                    >
                      <FaStar className="text-textMd self-center" />
                      {texts.UserProfile_LogOut}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
          <div className="block pt-1 self-center md:hidden">
            <GoSearch
              className="default-hover w-8 h-8"
              onClick={() => setMenuOpen(!menuOpen)}
            />
            {menuOpen && (
              <div ref={menuContainerRef} className="menu-overlay">
                <div className="menu">
                  <FaTimes
                    className="text-white default-hover self-end"
                    onClick={() => setMenuOpen(!menuOpen)}
                  />
                  <SearchBar inMenu={true} setMenuOpen={setMenuOpen} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
