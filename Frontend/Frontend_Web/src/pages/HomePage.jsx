/* Librarys */
import { useEffect, useState, useContext } from "react";

/* Components */
import CarouselMediaCard from "../components/carousel/CarouselMediaCard";
import StartHero from "../components/home/StartHero";
import Carousel from "../components/carousel/Carousel";
import Tab from "../components/tabs/Tab";
import Loader from "../components/tools/Loader";

/* Context */
import { ApiContext } from "../contexts/ApiProvider";

/* Helpers */
import texts from "../helpers/Text-En.json";

const HomePage = () => {
  const tabs = [texts.Global_Movies, texts.Global_TvSeries];
  const {
    getNowPlayingMoviesAsync,
    getUpcomingMoviesAsync,
    getPopularMoviesAsync,
    getTvSeriesOnTheAirAsync,
    getTopRatedTvSeriesAsync,
    getPopularTvSeriesAsync,
  } = useContext(ApiContext);

  /* UseState */

  const [heroImage, setHeroImage] = useState(
    "src/assets/images/movie_collage.jpg"
  );
  const [heroImageAlt, setHeroImageAlt] = useState(
    "https://www.reddit.com/r/PlexPosters/comments/ck1rmx/poster_near_4k_collage_containing_330_movie/"
  );
  const [heroTitle, setHeroTitle] = useState("");
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [onTheAirTvSeries, setOnTheAirTvSeries] = useState([]);
  const [topRatedTvSeries, setTopRatedTvSeries] = useState([]);
  const [popularTvSeries, setPopularTvSeries] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);

  /* UseEffect */
  useEffect(() => {
    getHomePageContent();
  }, []);

  /* Functions */
  async function getHomePageContent() {
    let dataNowPlaying = await getNowPlayingMoviesAsync(1);
    let listNowPlaying = dataNowPlaying.results;
    setNowPlayingMovies(listNowPlaying);

    let dataUpcoming = await getUpcomingMoviesAsync(1);
    let listUpcoming = dataUpcoming.results;
    setUpcomingMovies(listUpcoming);

    let dataPopular = await getPopularMoviesAsync(1);
    let listPopular = dataPopular.results;
    setPopularMovies(listPopular);

    let dataOnTheAir = await getTvSeriesOnTheAirAsync(1);
    let listOnTheAir = dataOnTheAir.results;
    setOnTheAirTvSeries(listOnTheAir);

    let dataTopRated = await getTopRatedTvSeriesAsync(1);
    let listTopRated = dataTopRated.results;
    setTopRatedTvSeries(listTopRated);

    let dataPopularTv = await getPopularTvSeriesAsync(1);
    let listPopularTv = dataPopularTv.results;
    setPopularTvSeries(listPopularTv);
    setLoading(false);
  }

  return (
    <>
      <StartHero img={heroImage} title={heroTitle} alt={heroImageAlt} />
      <div className="min-h-screen default-container px-4 pt-5 xl:px-0">
        <Tab setActiveTab={setActiveTab} activeTab={activeTab} tabs={tabs} />
        {!loading && activeTab === 0 && (
          <>
            <Carousel
              id={`homePageNowPlayingMovies`}
              title={texts.Movies_NowPlaying}
              linkTitle={texts.Global_ViewAll}
              linkForTitle={`/List/${texts.Movies_NowPlaying}/${texts.Global_movie}/1`}
              content={nowPlayingMovies.map((item, index) => (
                <CarouselMediaCard
                  key={index}
                  id={item.id}
                  title={item.title}
                  posterPath={item.poster_Path}
                  linkTo={"MovieDetails"}
                />
              ))}
            />
            <Carousel
              id={`homePageUpcomingMovies`}
              title={texts.Global_Upcoming}
              linkTitle={texts.Global_ViewAll}
              linkForTitle={`/List/${texts.Global_Upcoming}/${texts.Global_movie}/1`}
              content={upcomingMovies.map((item, index) => (
                <CarouselMediaCard
                  key={index}
                  id={item.id}
                  title={item.title}
                  posterPath={item.poster_Path}
                  linkTo={"MovieDetails"}
                />
              ))}
            />
            <Carousel
              id={`homePagePopularMovies`}
              title={texts.Global_Popular}
              linkTitle={texts.Global_ViewAll}
              linkForTitle={`/List/${texts.Global_Popular}/${texts.Global_movie}/1`}
              content={popularMovies.map((item, index) => (
                <CarouselMediaCard
                  key={index}
                  id={item.id}
                  title={item.title}
                  posterPath={item.poster_Path}
                  linkTo={"MovieDetails"}
                />
              ))}
            />
          </>
        )}
        {!loading && activeTab === 1 && (
          <>
            <Carousel
              id={`homePageOnTheAirTv`}
              title={texts.Global_OnTheAir}
              linkTitle={texts.Global_ViewAll}
              linkForTitle={`/List/${texts.Global_OnTheAir}/${texts.Global_tv}/1`}
              content={onTheAirTvSeries.map((item, index) => (
                <CarouselMediaCard
                  key={index}
                  id={item.id}
                  title={item.name}
                  posterPath={item.poster_Path}
                  linkTo={"TvSeriesDetails"}
                />
              ))}
            />
            <Carousel
              id={`homePageTopRatedTv`}
              title={texts.Global_TopRated}
              linkTitle={texts.Global_ViewAll}
              linkForTitle={`/List/${texts.Global_TopRated}/${texts.Global_tv}/1`}
              content={topRatedTvSeries.map((item, index) => (
                <CarouselMediaCard
                  key={index}
                  id={item.id}
                  title={item.name}
                  posterPath={item.poster_Path}
                  linkTo={"TvSeriesDetails"}
                />
              ))}
            />
            <Carousel
              id={`homePagePopularTv`}
              title={texts.Global_Popular}
              linkTitle={texts.Global_ViewAll}
              linkForTitle={`/List/${texts.Global_Popular}/${texts.Global_tv}/1`}
              content={popularTvSeries.map((item, index) => (
                <CarouselMediaCard
                  key={index}
                  id={item.id}
                  title={item.name}
                  posterPath={item.poster_Path}
                  linkTo={"TvSeriesDetails"}
                />
              ))}
            />
          </>
        )}
        {loading && (
          <div className="mt-28">
            <Loader size={`w-10 h-10`} />
          </div>
        )}
      </div>
    </>
  );
};

export default HomePage;
