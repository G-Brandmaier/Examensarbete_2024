import { createContext, React } from "react";
export const ApiContext = createContext();

const ApiProvider = (props) => {
  const apiKey = import.meta.env.VITE_API_KEY;

  /* Movies*/
  const getNowPlayingMoviesAsync = async (page) => {
    const response = await fetch(
      `https://localhost:44391/api/Movie/GetNowPlayingMovies/${page}?key=${apiKey}`
    );
    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      return null;
    }
  };

  const getUpcomingMoviesAsync = async (page) => {
    const response = await fetch(
      `https://localhost:44391/api/Movie/GetUpcomingMovies/${page}?key=${apiKey}`
    );
    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      return null;
    }
  };

  const getPopularMoviesAsync = async (page) => {
    const response = await fetch(
      `https://localhost:44391/api/Movie/GetPopularMovies/${page}?key=${apiKey}`
    );
    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      return null;
    }
  };

  const getMovieDetailsAsync = async (id) => {
    const response = await fetch(
      `https://localhost:44391/api/Movie/GetMovieDetails/${id}?key=${apiKey}`
    );
    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      return null;
    }
  };

  const getSimilarMoviesAsync = async (id, page) => {
    const response = await fetch(
      `https://localhost:44391/api/Movie/GetSimilarMovies/${id}/${page}?key=${apiKey}`
    );
    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      return null;
    }
  };

  /* Tv-series*/
  const getTvSeriesDetailsAsync = async (id) => {
    const response = await fetch(
      `https://localhost:44391/api/TvSeries/GetTvSeriesDetails/${id}?key=${apiKey}`
    );
    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      return null;
    }
  };

  const getSimilarTvSeriesAsync = async (id, page) => {
    const response = await fetch(
      `https://localhost:44391/api/TvSeries/GetSimilarTvSeries/${id}/${page}?key=${apiKey}`
    );
    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      return null;
    }
  };

  const GetTvSeriesSeasonDetailsAsync = async (id, season) => {
    const response = await fetch(
      `https://localhost:44391/api/TvSeries/GetTvSeriesSeasonDetails/${id}/${season}?key=${apiKey}`
    );
    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      return null;
    }
  };

  const getMediaTeaserAsync = async (id, type) => {
    const response = await fetch(
      `https://localhost:44391/api/Media/GetMediaTeaser/${id}/${type}?key=${apiKey}`
    );
    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      return null;
    }
  };

  const getTvSeriesOnTheAirAsync = async (page) => {
    const response = await fetch(
      `https://localhost:44391/api/TvSeries/GetTvSeriesOnTheAir/${page}?key=${apiKey}`
    );
    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      return null;
    }
  };

  const getTopRatedTvSeriesAsync = async (page) => {
    const response = await fetch(
      `https://localhost:44391/api/TvSeries/GetTopRatedTvSeries/${page}?key=${apiKey}`
    );
    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      return null;
    }
  };

  const getPopularTvSeriesAsync = async (page) => {
    const response = await fetch(
      `https://localhost:44391/api/TvSeries/GetPopularTvSeries/${page}?key=${apiKey}`
    );
    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      return null;
    }
  };

  /* Search */

  const searchAllAsync = async (searchValue) => {
    const response = await fetch(
      `https://localhost:44391/api/Media/SearchAll/${searchValue}?key=${apiKey}`
    );
    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      return null;
    }
  };

  /* Actors */

  const getActorDetailsAsync = async (id) => {
    const response = await fetch(
      `https://localhost:44391/api/Media/GetActorDetails/${id}?key=${apiKey}`
    );
    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      return null;
    }
  };

  /* Reviews */
  const getReviewsByIdAndTypeAsync = async (id, type) => {
    const response = await fetch(
      `https://localhost:44391/api/Review/GetReviewsByIdAndType/${id}/${type}?key=${apiKey}`
    );
    const data = await response.json();
    if (response.status === 200) return data;
    else if (response.status === 404) return [];
    else return "error";
  };

  return (
    <>
      <ApiContext.Provider
        value={{
          getNowPlayingMoviesAsync,
          getUpcomingMoviesAsync,
          getPopularMoviesAsync,
          getMovieDetailsAsync,
          searchAllAsync,
          getSimilarMoviesAsync,
          getReviewsByIdAndTypeAsync,
          getTvSeriesDetailsAsync,
          getSimilarTvSeriesAsync,
          GetTvSeriesSeasonDetailsAsync,
          getMediaTeaserAsync,
          getTvSeriesOnTheAirAsync,
          getTopRatedTvSeriesAsync,
          getPopularTvSeriesAsync,
          getActorDetailsAsync,
        }}
      >
        {props.children}
      </ApiContext.Provider>
    </>
  );
};

export default ApiProvider;
