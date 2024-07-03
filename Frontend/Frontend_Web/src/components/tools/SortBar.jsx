/* Librarys */
import { useState } from "react";

/* Components */

/* Context */

/* Helpers */
import texts from "../../helpers/Text-En.json";

/* Styles */
import "../../styles/index.css";
import "../media/media.css";

const SortBar = ({ content, setContent }) => {
  const [sortFilter, setSortFilter] = useState("");

  function handleSort(e) {
    setSortFilter(e.target.value);
    const sortValue = e.target.value;
    const sortedContent = [...content];
    switch (sortValue) {
      case texts.Global_Latest:
        sortedContent.sort((a, b) => {
          const dateA = a.updatedAt || a.createdAt;
          const dateB = b.updatedAt || b.createdAt;
          return new Date(dateB) - new Date(dateA);
        });
        break;
      case texts.Global_Oldest:
        sortedContent.sort((a, b) => {
          const dateA = a.updatedAt || a.createdAt;
          const dateB = b.updatedAt || b.createdAt;
          return new Date(dateA) - new Date(dateB);
        });
        break;
      case texts.Global_HighestRating:
        sortedContent.sort((a, b) => b.rating - a.rating);
        break;
      case texts.Global_LowestRating:
        sortedContent.sort((a, b) => a.rating - b.rating);
        break;
      default:
        break;
    }
    setContent(sortedContent);
  }

  return (
    <div className="w-full h-[100px] flex flex-row gap-6">
      <div className="flex flex-row gap-2 self-center text-black">
        <label className="text-white self-center">{texts.Global_SortBy}:</label>
        <select
          name="Sort"
          id="sort-select"
          value={sortFilter}
          onChange={handleSort}
          className="sort-bar"
        >
          <option value="Latest">{texts.Global_Latest}</option>
          <option value="Oldest">{texts.Global_Oldest}</option>
          <option value="Highest rating">{texts.Global_HighestRating}</option>
          <option value="Lowest rating">{texts.Global_LowestRating}</option>
        </select>
      </div>
    </div>
  );
};

export default SortBar;
