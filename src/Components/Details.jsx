import { BiLeftArrowAlt } from "react-icons/bi";
import { HiHeart, HiOutlineHeart, HiStar } from "react-icons/hi";
import { Link } from "react-router-dom";

function Details({
  movie,
  onClose,
  addToFavorites,
  favorites,
  removeFromFavorites,
}) {
  const isFavorite = favorites.some((m) => m.id === movie.id);
  return (
    <div className=" mt-3 border border-blue-200 rounded-2xl bg-blue-50 w-fit p-5 mx-auto flex flex-col items-center">
      <div className="flex mb-5 ">
        <div>
          <button
            onClick={onClose}
            className="font-extrabold mr-28 pr-4 cursor-pointer text-3xl"
          >
            <BiLeftArrowAlt />
          </button>
        </div>
        <div>
          <h3 className=" text-center mr-48 text-3xl font-bold">
            About the movie
          </h3>
        </div>
        <div>
          <button
            className="text-3xl mt-4"
            onClick={() =>
              isFavorite ? removeFromFavorites(movie.id) : addToFavorites(movie)
            }
          >
            {isFavorite ? (
              <HiHeart className="text-red-600" />
            ) : (
              <HiOutlineHeart className="text-red-600" />
            )}
          </button>
        </div>
      </div>
      <div className=" flex  mt-3 justify-center  ">
        <div className=" p-3 flex overflow-hidden ">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            className="w-72 rounded-xl "
          />
        </div>
        <div className="  p-5 w-72">
          <p className="text-2xl font-semibold pb-4">{movie.title}</p>
          <hr />

          <div className="flex justify-between pl-0 pb-3 px-3 py-2">
            <div className="font-medium">
              <p className="text-xl ">{movie.release_date}</p>
            </div>

            <div className="flex flex-row font-medium text-xl items-center">
              {movie.vote_average.toString().slice(0, 3)}
              <HiStar className="text-yellow-500 text-2xl ml-1" />
            </div>
          </div>
          <hr />
          <p className="mt-3">
            {movie.overview}
            <Link
              className="text-blue-900 underline hover:text-blue-800 transition-transform duration-300 "
              to="#"
            >
              click here to watch
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Details;
