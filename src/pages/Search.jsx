import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loader from "./Loader";
import { useState } from "react";
import { HiStar } from "react-icons/hi";

function Search({ setSelectedMovie }) {
  const [params] = useSearchParams();
  const query = params.get("query") || "";
  const [showAll, setShowAll] = useState(false);

  const { isLoading, error, data } = useQuery({
    queryKey: ["search", query],
    queryFn: () =>
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&query=${query}`,
      ).then((res) => res.json()),
    enabled: query.length > 0,
  });

  const movies = data?.results || [];
  const visibleMovies = showAll ? movies : movies.slice(0, 12);

  if (isLoading) return <Loader />;
  if (error) return <Error message={error} />;

  return (
    <div>
      <h2 className="text-2xl pt-10 pb-0 pl-5 font-semibold">Result</h2>

      <div
        className="
          grid 
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          gap-5 p-5
        "
      >
        {visibleMovies.map((movie) => (
          <div
            key={movie.id}
            onClick={() => setSelectedMovie(movie)}
            className="rounded-2xl border-gray-300 border-2 cursor-pointer"
          >
            <div className="shadow-[0_0_10px_rgba(0,0,0,0.25)] rounded-xl rounded-b-none overflow-hidden transition-transform duration-500 ease-in-out">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="object-contain rounded-lg transition-transform duration-500 ease-in-out hover:scale-110"
              />
            </div>
            <div className="flex justify-between text-center py-2 px-3">
              <div className="font-medium">
                {movie.title.length > 20
                  ? movie.title.slice(0, 20) + "..."
                  : movie.title}
              </div>
              <div className="flex items-center">
                {movie.vote_average.toFixed(1)}
                <HiStar className="text-yellow-500 text-2xl ml-1" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {movies.length > 12 && (
        <div className="text-center pb-10">
          <button
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Show less" : "Show more"}
          </button>
        </div>
      )}
    </div>
  );
}

export default Search;
