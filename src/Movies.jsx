import { HiHeart } from "react-icons/hi";

function Movies({ onRender, setActivepage, activepage }) {
  const buttonStyle = (name) =>
    `px-2 py-1 text-base sm:text-lg md:text-xl ${
      activepage === name ? "underline font-bold text-blue-900" : ""
    }`;

  return (
    <div className="w-full">
      <div
        className="border-b border-gray-300 font-mono text-blue-700 
                      flex flex-col sm:flex-row justify-between items-center 
                      gap-3 mt-2 p-4"
      >
        <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
          <button
            onClick={() => setActivepage("popular")}
            className={buttonStyle("popular")}
          >
            Popular
          </button>
          <button
            onClick={() => setActivepage("trending")}
            className={buttonStyle("trending")}
          >
            Trending
          </button>
          <button
            onClick={() => setActivepage("toprated")}
            className={buttonStyle("toprated")}
          >
            TopRated
          </button>
          <button
            onClick={() => setActivepage("upcoming")}
            className={buttonStyle("upcoming")}
          >
            Upcoming
          </button>
          <button
            onClick={() => setActivepage("search")}
            className={buttonStyle("search")}
          >
            Search
          </button>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setActivepage("favorites")}
            className={buttonStyle("favorites")}
          >
            Favorites
          </button>
          <HiHeart className="text-red-500 text-2xl sm:text-3xl" />
        </div>
      </div>

      <div className="p-2">{onRender()}</div>
    </div>
  );
}

export default Movies;
