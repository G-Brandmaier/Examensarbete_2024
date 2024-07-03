/* Librarys */
import { Link } from "react-router-dom";

/* Helpers */
import texts from "../helpers/Text-En.json";

/* Images */
import robot from "../assets/images/robot404.png";

const NotFoundPage = () => {
  return (
    <div className="default-container">
      <div className="flex flex-col mt-32">
        <div className="mx-auto text-center">
          <p className="mx-auto text-headingMd md:text-headingLg">
            {texts.Global_Oops}!
          </p>
          <p className="mx-auto text-headingSm md:text-headingMd">
            {texts.Global_ThereIsNoContentHere}...
          </p>
        </div>
        <Link to={"/"} className="mx-auto text-primaryOrange text-center">
          <p className="text-headingSx default-hover ">
            {texts.Global_ClickMeToGetBackToTheMainPage}!
          </p>
          <img
            src={robot}
            alt="404"
            className="w-[400px] h-auto mt-6 mx-auto hover:scale-110"
          />
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
