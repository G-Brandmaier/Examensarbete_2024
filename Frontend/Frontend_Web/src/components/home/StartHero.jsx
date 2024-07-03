/* Styles */
import "../../styles/index.css";

const StartHero = (props) => {
  return (
    <div className="hidden sm:block relative w-full h-[360px] xl:h-[500px] bg-overLayDark">
      <img
        src={props.img}
        alt="https://www.reddit.com/r/PlexPosters/comments/ck1rmx/poster_near_4k_collage_containing_330_movie/"
        title="https://www.reddit.com/r/PlexPosters/comments/ck1rmx/poster_near_4k_collage_containing_330_movie/"
        className="absolute top-0 left-0 object-cover w-full -z-10 h-[360px] xl:h-[500px]"
      />
      <div className="default-container px-16 pb-16 flex flex-col-reverse">
        <div className="text-headingLg">{props.title}</div>
      </div>
    </div>
  );
};

export default StartHero;
