/* Librarys */
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaMinus } from "react-icons/fa";
import { PiFilmSlate } from "react-icons/pi";

/* Components */
import Loader from "../components/tools/Loader";

/* Context */
import { UserContext } from "../contexts/UserProvider";

/* Helpers */
import texts from "../helpers/Text-En.json";
import { scrollToTop } from "../helpers/generalHelper.js";

const WatchlistPage = () => {
  const { getUserWatchListAsync, removeFromUserWatchListAsync, userLoggedIn } =
    useContext(UserContext);
  const [watchlistItems, setWatchlistItems] = useState([]);
  const [watchlistItemsLoading, setWatchlistItemsLoading] = useState(true);
  const [noItems, setNoItems] = useState(false);
  const brokenImgPath = import.meta.env.VITE_IMG_PATH_BROKEN;
  const navigate = useNavigate();

  useEffect(() => {
    getWatchlist();
    scrollToTop();
  }, []);

  useEffect(() => {
    if (!userLoggedIn) navigate("/");
  }, [userLoggedIn]);

  async function getWatchlist() {
    setWatchlistItemsLoading(true);
    const list = await getUserWatchListAsync();
    if (list !== null) {
      setWatchlistItems(list);
      setWatchlistItemsLoading(false);
      setNoItems(false);
    } else {
      setNoItems(true);
      setWatchlistItemsLoading(false);
    }
  }

  function loadDetails(mediaId, mediaType) {
    let url;
    switch (mediaType) {
      case "tv":
        url = navigate(`/TvSeriesDetails/${mediaId}`);
        break;
      case "movie":
        url = navigate(`/MovieDetails/${mediaId}`);
        break;
      default:
        return "";
    }
  }

  async function handleWatchlist(id, type) {
    if (userLoggedIn) {
      setWatchlistItemsLoading(true);
      const result = await removeFromUserWatchListAsync(id, type);
      if (result) getWatchlist();
    }
  }

  return (
    <div className="default-container px-4 pt-8 xl:px-0">
      <div className="max-w-[768px] mx-auto">
        <div className="text-headingLg text-primaryOrange">
          {texts.UserProfile_Watchlist}
        </div>
        {!watchlistItemsLoading ? (
          noItems ? (
            <div className="flex flex-row gap-2 mb-2 border-gray-100 border-b-2 py-2">
              {texts.UserProfile_NoItmesAddedYet}
            </div>
          ) : (
            <ul className="list-none gap-2 mt-4">
              {watchlistItems.map((item, index) => (
                <li
                  key={index}
                  className="flex flex-row gap-2 mb-2 border-gray-100 border-b-2 py-2 justify-between"
                >
                  <div
                    onClick={() => loadDetails(item.mediaId, item.mediaType)}
                    className="flex flex-row gap-2 cursor-pointer"
                  >
                    {item.imagePath !== brokenImgPath ? (
                      <img
                        src={item.imagePath}
                        className="w-[80px] h-[124px] object-cover"
                      />
                    ) : (
                      <div className="flex justify-center w-[80px] max-w-[80px] h-[124px] max-h-[124px] border-2 border-primaryLightGrey">
                        <PiFilmSlate className="h-[60px] w-[60px] self-center my-[40px] text-primaryLightGrey" />
                      </div>
                    )}
                    <div className="flex flex-col gap-2">
                      <div className="text-headingSx default-hover">
                        {item.name}
                      </div>
                      <div className="text-textSm flex flex-row gap-1">
                        {item.mediaType}
                      </div>
                    </div>
                  </div>
                  <div className="tooltip-container self-center">
                    <FaMinus
                      onClick={() =>
                        handleWatchlist(item.mediaId, item.mediaType)
                      }
                      className="h-6 w-6 m-2 default-hover text-primaryOrange"
                    />
                    <span className="tooltip text-textXs default-box-shadow">
                      {texts.Global_Remove}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )
        ) : (
          <div className="mt-28">
            <Loader size={`w-10 h-10`} />
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchlistPage;
