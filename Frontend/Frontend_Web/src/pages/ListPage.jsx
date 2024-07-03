/* Librarys */
import { useEffect, useState, useContext } from "react";
import { FaChevronLeft, FaChevronRight, FaBookmark } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { PiFilmSlate } from "react-icons/pi";
import { getYear } from "date-fns";

/* Components */
import Loader from "../components/tools/Loader";

/* Context */
import { ApiContext } from "../contexts/ApiProvider";
import { UserContext } from "../contexts/UserProvider";

/* Helpers */
import texts from "../helpers/Text-En.json";
import { scrollToTop } from "../helpers/generalHelper";

const ListPage = () => {
  const {
    getNowPlayingMoviesAsync,
    getUpcomingMoviesAsync,
    getPopularMoviesAsync,
    getTvSeriesOnTheAirAsync,
    getTopRatedTvSeriesAsync,
    getPopularTvSeriesAsync,
  } = useContext(ApiContext);
  const {
    addToUserWatchListAsync,
    userLoggedIn,
    getUserWatchListAsync,
    removeFromUserWatchListAsync,
  } = useContext(UserContext);

  const { listType, mediaType, page } = useParams();

  const [currentPage, setCurrentPage] = useState(page);
  const [content, setContent] = useState();
  const [loading, setLoading] = useState(true);
  const [userWatchlistLoading, setUserWatchlistLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [userWatchlist, setUserWatchlist] = useState([]);
  const brokenImgPath = import.meta.env.VITE_IMG_PATH_BROKEN;
  const navigate = useNavigate();

  useEffect(() => {
    getUserWatchList();
  }, []);

  useEffect(() => {
    getListContent();
    scrollToTop();
  }, [currentPage]);

  async function getListContent() {
    setLoading(true);
    let listContent;
    let page;
    let pages;

    if (mediaType === texts.Global_movie) {
      switch (listType) {
        case texts.Movies_NowPlaying:
          let dataNowPlaying = await getNowPlayingMoviesAsync(currentPage);
          listContent = dataNowPlaying.results;
          pages = dataNowPlaying.total_Pages;
          page = dataNowPlaying.page;
          break;
        case texts.Global_Upcoming:
          let dataUpcoming = await getUpcomingMoviesAsync(currentPage);
          listContent = dataUpcoming.results;
          pages = dataUpcoming.total_Pages;
          page = dataUpcoming.page;
          break;
        case texts.Global_Popular:
          let dataPopular = await getPopularMoviesAsync(currentPage);
          listContent = dataPopular.results;
          pages = dataPopular.total_Pages;
          page = dataPopular.page;
          break;
        default:
          break;
      }
    } else if (mediaType === texts.Global_tv) {
      switch (listType) {
        case texts.Global_OnTheAir:
          let dataOnTheAir = await getTvSeriesOnTheAirAsync(currentPage);
          listContent = dataOnTheAir.results;
          pages = dataOnTheAir.total_Pages;
          page = dataOnTheAir.page;
          break;
        case texts.Global_TopRated:
          let dataTopRated = await getTopRatedTvSeriesAsync(currentPage);
          listContent = dataTopRated.results;
          pages = dataTopRated.total_Pages;
          page = dataTopRated.page;
          break;
        case texts.Global_Popular:
          let dataPopularTv = await getPopularTvSeriesAsync(currentPage);
          listContent = dataPopularTv.results;
          pages = dataPopularTv.total_Pages;
          page = dataPopularTv.page;
          break;
        default:
          break;
      }
    }

    setCurrentPage(page);
    setTotalPages(pages);
    setContent(listContent);
    setLoading(false);
  }

  function loadDetails(mediaId) {
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

  function handleClickNext() {
    let nextPage = currentPage + 1;
    if (nextPage < totalPages) {
      setCurrentPage(nextPage);
      navigate(`/List/${listType}/${mediaType}/${nextPage}`);
    }
  }

  function handleClickPrevious() {
    let previousPage = currentPage - 1;
    if (previousPage > 0) {
      setCurrentPage(previousPage);
      navigate(`/List/${listType}/${mediaType}/${previousPage}`);
    }
  }

  async function handleWatchlist(id, title, posterPath) {
    if (userLoggedIn) {
      if (checkOnUserWatchlist(id)) {
        const result = await removeFromUserWatchListAsync(id, mediaType);
      } else {
        const dataToAdd = {
          mediaId: id,
          mediaType: mediaType,
          name: title,
          imagePath: posterPath,
        };
        const result = await addToUserWatchListAsync(dataToAdd);
      }
      setUserWatchlistLoading(true);
      getUserWatchList();
    }
  }

  async function getUserWatchList() {
    if (userLoggedIn) {
      const result = await getUserWatchListAsync();
      if (result.length > 0) {
        setUserWatchlist(result);
      }
      setUserWatchlistLoading(false);
    }
    setUserWatchlistLoading(false);
  }

  function checkOnUserWatchlist(id) {
    if (userLoggedIn) {
      if (userWatchlist.length > 0) {
        const result = userWatchlist.filter(
          (item) => item.mediaId === id && item.mediaType === mediaType
        );
        if (result.length > 0) return true;
        else return false;
      }
    }
    return false;
  }

  return (
    <div className="default-container px-4 pt-8 xl:px-0">
      <div className="max-w-[768px] mx-auto">
        <div
          onClick={() => {
            setCurrentPage(1), navigate(`/List/${listType}/${mediaType}/${1}`);
          }}
          className="text-headingMd md:text-headingLg text-primaryOrange default-hover"
        >
          {listType}
        </div>
        {!loading && !userWatchlistLoading ? (
          <ul className="list-none gap-2 my-4">
            {content.map((item, index) => (
              <li
                key={index}
                className="flex flex-row gap-2 mb-2 border-gray-100 border-b-2 py-2 justify-between"
              >
                <div
                  onClick={() => loadDetails(item.id)}
                  className="flex flex-row gap-2 cursor-pointer"
                >
                  {item.poster_Path !== brokenImgPath ? (
                    <img
                      src={item.poster_Path}
                      className="w-[80px] h-[124px] object-cover"
                    />
                  ) : (
                    <div className="flex justify-center w-[80px] max-w-[80px] h-[124px] max-h-[124px] border-2 border-primaryLightGrey">
                      <PiFilmSlate className="h-[60px] w-[60px] self-center my-[40px] text-primaryLightGrey" />
                    </div>
                  )}
                  <div className="flex flex-col gap-2">
                    <div className="text-headingSx default-hover">
                      {item.name ? item.name : item.title}
                    </div>
                    <div className="text-textSm flex flex-row gap-1">
                      {item.release_Date && getYear(item.release_Date)}
                    </div>
                  </div>
                </div>
                <div className="tooltip-container self-center">
                  <FaBookmark
                    onClick={() =>
                      handleWatchlist(
                        item.id,
                        item.name ? item.name : item.title,
                        item.poster_Path
                      )
                    }
                    className={`h-6 w-6 m-2 default-hover ${
                      checkOnUserWatchlist(item.id)
                        ? "text-primaryOrange"
                        : "text-primaryDarkGrey"
                    } `}
                  />
                  <span className="tooltip text-textXs default-box-shadow">
                    {!userLoggedIn
                      ? texts.Details_LogInToAddThisToWatchlist
                      : checkOnUserWatchlist(item.id)
                      ? texts.Details_RemoveFromWatchlist
                      : texts.Details_AddToWatchlist}
                  </span>
                </div>
              </li>
            ))}
            <li className="flex flex-row align-middle justify-evenly my-8">
              <FaChevronLeft
                onClick={handleClickPrevious}
                className={`${
                  currentPage === 1 && "text-primaryDarkGrey"
                } default-hover text-primaryOrange text-headingMd`}
              />
              <div className="flex flex-row justify-evenly text-headingSx text-primaryOrange">
                <p className="mx-1">{page}</p>
                <p>/</p>
                <p className="mx-1">{totalPages}</p>
              </div>
              <FaChevronRight
                onClick={handleClickNext}
                className={`${
                  currentPage === totalPages && "text-primaryDarkGrey"
                } default-hover text-primaryOrange text-headingMd`}
              />
            </li>
          </ul>
        ) : (
          <div className="mt-28">
            <Loader size={`w-10 h-10`} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ListPage;
