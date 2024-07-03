/* Librarys */
import { useState } from "react";
import { GoPerson } from "react-icons/go";
import { Link } from "react-router-dom";

/* Helpers */
import texts from "../../helpers/Text-En.json";

/* Styles */
import "../../styles/index.css";
import "./carousel.css";

const CarouselActorCard = ({ id, img, name, character, roles }) => {
  const brokenImgPath = import.meta.env.VITE_IMG_PATH_BROKEN;
  const [showRolesOverlay, setShowRolesOverlay] = useState(false);

  return (
    <Link to={`/ActorDetails/${id}`} className="image-item max-w-[160px]">
      {img !== brokenImgPath ? (
        <img src={img} alt={name} className="w-[160px]" />
      ) : (
        <div className="image-item">
          <div className="flex justify-center w-[160px] h-auto border-2 border-primaryLightGrey">
            <GoPerson className="h-[80px] w-[80px] self-center mx-auto my-20 text-primaryLightGrey" />
          </div>
        </div>
      )}
      <div className="text-white py-2 max-w-[160px]">
        <div className="text-textMd">{name}</div>
        {character !== undefined ? (
          <div className="text-textXs">{character}</div>
        ) : (
          <>
            {roles.slice(0, 1).map((role, index) => (
              <div key={index} className="text-textXs">
                {role.character}
              </div>
            ))}
            {roles.length > 1 && (
              <button
                className="text-textXs text-primaryOrange font-semibold default-hover"
                onClick={() => setShowRolesOverlay(true)}
              >
                {texts.Global_ViewMore}
              </button>
            )}
            {showRolesOverlay && (
              <div
                className={`fixed inset-0 z-20 bg-overLayLightDark flex justify-center items-center${
                  showRolesOverlay ? "" : "hidden"
                }`}
              >
                <div className="bg-overLayDark rounded-lg p-8 max-w-md overflow-auto h-1/2 default-scrollbar">
                  {roles.slice(1, roles.length).map((role, index) => (
                    <div key={index} className="text-textXs py-1">
                      {role.character}
                    </div>
                  ))}
                  <button
                    className="text-textXs text-primaryOrange font-semibold default-hover"
                    onClick={() => setShowRolesOverlay(false)}
                  >
                    {texts.Global_ViewLess}
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </Link>
  );
};

export default CarouselActorCard;
