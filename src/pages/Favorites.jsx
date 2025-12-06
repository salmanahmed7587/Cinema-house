import { AiOutlineClose } from "react-icons/ai";
import { BiLeftArrowAlt } from "react-icons/bi";
import { HiHeart, HiStar } from "react-icons/hi";

function Favorites({ onClose, favorites, removeFromFavorites }) {
  return (
    <div className="mt-3 border  border-blue-200 rounded-2xl bg-blue-50 p-5 mx-auto flex flex-col items-center w-full max-w-xl">
      <div className="flex items-center text-2xl font-bold justify-between w-full mb-5">
        <button onClick={onClose}>
          <BiLeftArrowAlt className="cursor-pointer" />
        </button>

        <div className="text-center flex-1">List of Favorites</div>

        <HiHeart className="text-red-500 cursor-pointer" />
      </div>

      {favorites.length === 0 && (
        <p className="text-gray-600 text-lg mt-10">No favorites Available</p>
      )}
      {favorites.length > 0 && (
        <ul className="px-6 mt-5 w-full">
          {favorites.map((movie) => (
            <li
              key={movie.id}
              className="bg-blue-200 grid grid-cols-2 rounded-2xl border border-blue-300 my-3 p-2 px-6 hover:scale-105 transition-transform duration-500"
            >
              <div>
                <img
                  className="w-20 rounded-xl"
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
              </div>

              <div className="mt-3 text-center ml-2">
                <p className="font-semibold text-xl">{movie.title}</p>

                <div className="flex gap-5 mt-4 text-xl justify-between items-center">
                  <p className="">
                    {movie.vote_average.toString().slice(0, 3)}
                  </p>
                  <HiStar className="  text-yellow-500 text-3xl" />
                  <p>{new Date(movie.release_date).getFullYear()}</p>

                  <button
                    onClick={() => removeFromFavorites(movie.id)}
                    className="bg-red-600 p-1 rounded-full"
                  >
                    <AiOutlineClose className="text-white" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Favorites;
