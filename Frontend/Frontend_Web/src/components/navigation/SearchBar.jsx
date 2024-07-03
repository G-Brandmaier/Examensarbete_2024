/* Librarys */
import { useState, useContext, useEffect, useRef } from "react";
import { FaSearch, FaCircle } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { getYear } from "date-fns";
import { GoPerson } from "react-icons/go";
import { PiFilmSlate } from "react-icons/pi";

/* Components */
import SearchFilterBar from "./SearchFilterBar.jsx";

/* Contexts */
import { ApiContext } from "../../contexts/ApiProvider";

/* Styles */
import "../../styles/index.css";
import "./navbar.css";

/* Helpers */
import texts from "../../helpers/Text-En.json";
import { handleClickOutside } from "../../helpers/generalHelper.js";
import Loader from "../tools/Loader.jsx";

const SearchBar = (props) => {
  const brokenImgPath = import.meta.env.VITE_IMG_PATH_BROKEN;
  const { searchAllAsync } = useContext(ApiContext);
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchFieldActive, setSearchFieldActive] = useState(false);
  const [searchLoading, setSearchLoading] = useState(true);
  const searchContainerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    handleClickOutside(searchContainerRef, setSearchFieldActive);
  }, []);

  useEffect(() => {
    handleSearch(searchValue);
  }, [searchValue]);

  async function handleSearch(value) {
    if (value.trim() !== "") {
      setSearchLoading(true);
      setSearchFieldActive(true);
      var results = await searchAllAsync(value);
      if (results.results.length > 0) {
        setSearchResults(results.results);
        setFilteredResults(results.results);
      } else {
        setFilteredResults([]);
        setSearchResults([]);
      }
    } else {
      setFilteredResults([]);
      setSearchResults([]);
    }
    setSearchLoading(false);
  }

  function getTypeText(type) {
    switch (type) {
      case "tv":
        return texts.Global_TvSeries;
      case "movie":
        return texts.Global_Movie;
      case "person":
        return texts.Global_Actor;
      default:
        return "";
    }
  }

  function loadSearchDetails(result) {
    let url;
    setSearchFieldActive(false);
    setSearchValue("");
    props.setMenuOpen(false);
    switch (result.media_Type) {
      case "tv":
        url = navigate(`/TvSeriesDetails/${result.id}`);
        break;
      case "movie":
        url = navigate(`/MovieDetails/${result.id}`);
        break;
      case "person":
        url = navigate(`/ActorDetails/${result.id}`);
        break;
      default:
        return "";
    }
  }

  return (
    <>
      <div
        className={`${
          props.inMenu ? "block" : "hidden"
        } md:block input-container`}
      >
        <div className="icon-container">
          <FaSearch className="icon" />
        </div>
        <input
          id="navbar-search-input"
          type="text"
          placeholder={texts.Global_Search}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onFocus={(e) => {
            setSearchFieldActive(true);
            setSearchValue(e.target.value);
          }}
        />
        <span className="focus-border"></span>
      </div>
      <div
        ref={searchContainerRef}
        className={`${
          searchFieldActive ? "block" : "hidden"
        } search-container default-scrollbar`}
      >
        <SearchFilterBar
          setFilteredResults={setFilteredResults}
          allResults={searchResults}
          setSearchLoading={setSearchLoading}
        />
        <ul className="">
          {searchLoading ? (
            <div className="">
              <Loader size={`w-4 h-6`} />
            </div>
          ) : filteredResults.length > 0 ? (
            filteredResults.map((result, index) => (
              <li
                key={index}
                className="flex flex-row gap-2 mb-2 border-gray-100 border-b-2 p-2 cursor-pointer"
                onClick={() => loadSearchDetails(result)}
              >
                {(result.poster_Path && result.poster_Path !== brokenImgPath) ||
                (result.profile_Path &&
                  result.profile_Path !== brokenImgPath) ? (
                  <img
                    src={
                      result.poster_Path
                        ? result.poster_Path
                        : result.profile_Path
                    }
                    className="w-[40px] h-[64px] object-cover"
                  />
                ) : (
                  <div className="flex justify-center w-[40px] h-[64px] min-w-[40px] border-2 border-primaryLightGrey">
                    {result.profile_Path ? (
                      <GoPerson className="h-[28px] w-[20px] self-center mx-auto my-20 text-primaryLightGrey" />
                    ) : (
                      <PiFilmSlate className="h-[28px] w-[20px] self-center my-[155px] text-primaryLightGrey" />
                    )}
                  </div>
                )}
                <div className="flex flex-col gap-2">
                  <div className="text-textMd md:text-headingSx">
                    {result.title ? result.title : result.name}
                  </div>
                  {result.media_Type !== "person" && (
                    <div className="text-textXs flex flex-row gap-1 md:text-textSm">
                      {getTypeText(result.media_Type)}
                      <FaCircle className="w-1 h-1 self-center" />
                      {result.release_Date
                        ? getYear(result.release_Date)
                        : result.first_Air_Date
                        ? getYear(result.first_Air_Date)
                        : ""}
                    </div>
                  )}
                </div>
              </li>
            ))
          ) : (
            <li className="flex flex-row gap-2 mb-2 border-gray-100 border-b-2 p-2 cursor-pointer">
              {texts.Global_NoSearchResultsFound}
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

export default SearchBar;
