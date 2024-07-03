/* Librarys */
import { useEffect, useRef, useState } from "react";

/* Helpers */
import texts from "../../helpers/Text-En.json";
import { getAllIconColors } from "../../helpers/iconHelper.js";
import { handleClickOutside } from "../../helpers/generalHelper.js";

/* Styles */
import "../../styles/index.css";
import "./form.css";

const IconColorToggler = ({ setSelectedColor, selectedColor }) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [colors, setColors] = useState([]);
  const [loading, setLoading] = useState(true);
  const toggleBtnRef = useRef(null);

  useEffect(() => {
    getAllColors();
  }, []);

  useEffect(() => {
    handleClickOutside(toggleBtnRef, setShowOverlay);
  }, []);

  const toggleOverlay = () => {
    setShowOverlay(!showOverlay);
  };

  function getAllColors() {
    const list = getAllIconColors();
    setColors(list);
    setLoading(false);
  }

  return (
    <>
      {!loading && (
        <div className="relative">
          <div
            onClick={toggleOverlay}
            className="text-primaryOrange font-bold py-2 px-4 rounded text-center default-hover"
          >
            {texts.UserProfile_ChangeColor}
          </div>
          {showOverlay && (
            <div className="absolute left-0 right-0 z-20 w-auto h-auto max-w-[400px] flex justify-center items-center">
              <div
                ref={toggleBtnRef}
                className="bg-white rounded-lg p-2 max-w-[200px]"
              >
                <ul className="flex flex-row overflow-auto default-scrollbar">
                  {colors &&
                    colors.map((item, index) => (
                      <li
                        key={index}
                        onClick={() => setSelectedColor(item)}
                        style={{ backgroundColor: item }}
                        className={`border default-hover p-2 rounded-full h-4 w-4 mx-1 my-2 ${
                          selectedColor === item
                            ? "border-primaryDarkGrey border-1"
                            : "border-primaryLightGrey"
                        }`}
                      ></li>
                    ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default IconColorToggler;
