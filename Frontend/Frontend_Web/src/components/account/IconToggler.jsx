/* Librarys */
import { useEffect, useState, useRef } from "react";

/* Components */
import Icon from "../tools/Icon.jsx";

/* Helpers */
import texts from "../../helpers/Text-En.json";
import { getAllIconNames } from "../../helpers/iconHelper.js";
import { handleClickOutside } from "../../helpers/generalHelper.js";

/* Styles */
import "../../styles/index.css";
import "./form.css";

const IconToggler = ({ setSelectedIcon }) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [icons, setIcons] = useState([]);
  const toggleBtnRef = useRef(null);

  useEffect(() => {
    setIcons(getAllIconNames());
  }, []);

  useEffect(() => {
    handleClickOutside(toggleBtnRef, setShowOverlay);
  }, []);

  const toggleOverlay = () => {
    setShowOverlay(!showOverlay);
  };

  return (
    <>
      <div className="relative">
        <div
          onClick={toggleOverlay}
          className="text-primaryOrange font-bold py-2 px-4 rounded text-center default-hover"
        >
          {texts.UserProfile_ChangeIcon}
        </div>
        {showOverlay && (
          <div className="absolute left-0 right-0 z-20 w-auto h-auto max-w-[400px] flex justify-center items-center">
            <div
              ref={toggleBtnRef}
              className="bg-white rounded-lg p-2 max-w-[200px]"
            >
              <ul className="flex flex-row overflow-auto default-scrollbar">
                {icons &&
                  icons.map((item, index) => (
                    <li
                      key={index}
                      onClick={() => setSelectedIcon(item)}
                      className="p-2"
                    >
                      <Icon name={item} style="text-black default-hover" />
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default IconToggler;
