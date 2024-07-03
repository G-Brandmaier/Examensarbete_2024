/* Librarys */
import { useState, useEffect } from "react";

/* Components */

/* Context */

/* Helpers */
import texts from "../../helpers/Text-En.json";

/* Styles */
import "../../styles/index.css";
import "../media/media.css";

const SearchFilterBar = ({
  setFilteredResults,
  allResults,
  setSearchLoading,
}) => {
  const [searchFilter, setSearchFilter] = useState(texts.Global_ShowAll);

  useEffect(() => {
    handleFilter();
  }, [allResults, searchFilter]);

  function handleFilter() {
    setSearchLoading(true);
    const filterValue = searchFilter;
    let filteredList;
    switch (filterValue) {
      case texts.Global_Movie:
        filteredList = allResults.filter(
          (item) => item.media_Type === texts.Global_movie
        );
        break;
      case texts.Global_TvSeriesNoBar:
        filteredList = allResults.filter(
          (item) => item.media_Type === texts.Global_tv
        );
        break;
      case texts.Global_Actor:
        filteredList = allResults.filter(
          (item) => item.media_Type === texts.Global_person
        );
        break;
      case texts.Global_ShowAll:
        filteredList = allResults;
        break;
      default:
        break;
    }
    setFilteredResults(filteredList);
    setSearchLoading(false);
  }

  return (
    <div className="w-full h-[60px] flex flex-row gap-6">
      <div className="flex flex-row gap-2 self-center text-black">
        <label className="text-textSm md:text-textMd text-white self-center">
          {texts.Global_FilterBy}:
        </label>
        <select
          name="filter"
          id="filter-select"
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
          className="sort-bar"
        >
          <option value="Show all">{texts.Global_ShowAll}</option>
          <option value="Movie">{texts.Global_Movie}</option>
          <option value="Tv series">{texts.Global_TvSeriesNoBar}</option>
          <option value="Actor">{texts.Global_Actor}</option>
        </select>
      </div>
    </div>
  );
};

export default SearchFilterBar;
