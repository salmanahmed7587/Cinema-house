import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Loader from "./Loader";
import { HiStar } from "react-icons/hi";
import Error from "./Error";

function TopRated({ setSelectedMovie }) {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("date_desc");
  const range = 1;

  const { isLoading, error, data } = useQuery({
    queryKey: ["topRated", page],
    queryFn: () =>
      fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=a6aebbe96bd7c6b2d9c134582a712e90&page=${page}`
      ).then((res) => res.json()),
  });

  if (isLoading) return <Loader />;
  if (error) return <Error message={error} />;

  let movies = data?.results || [];
  const totalPages = data?.total_pages || 1;

  if (sortBy === "date_desc") {
    movies = movies.sort(
      (a, b) => new Date(b.release_date) - new Date(a.release_date)
    );
  } else if (sortBy === "date_asc") {
    movies = movies.sort(
      (a, b) => new Date(a.release_date) - new Date(b.release_date)
    );
  } else if (sortBy === "popularity") {
    movies = movies.sort((a, b) => b.popularity - a.popularity);
  } else if (sortBy === "rating") {
    movies = movies.sort((a, b) => b.vote_average - a.vote_average);
  } else if (sortBy === "title_asc") {
    movies = movies.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortBy === "title_desc") {
    movies = movies.sort((a, b) => b.title.localeCompare(a.title));
  }

  const createPagination = () => {
    const pages = [];
    pages.push(1);
    if (page - range > 2) pages.push("...");
    for (let i = page - range; i <= page + range; i++)
      if (i > 1 && i < totalPages) pages.push(i);
    if (page + range < totalPages - 1) pages.push("...");
    if (totalPages > 1) pages.push(totalPages);
    return pages;
  };
  const pagination = createPagination();

  return (
    <div className="pb-10">
      <h2 className="text-2xl md:text-3xl pt-10 pb-0 pl-5 font-semibold">
        Top Rated Movies
      </h2>

      <div className="flex justify-end pr-5 mt-4">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full sm:w-64 px-4 py-2 border rounded-lg bg-white shadow-sm hover:shadow-md transition cursor-pointer"
        >
          <option value="date_desc">Release Date (Newest)</option>
          <option value="date_asc">Release Date (Oldest)</option>
          <option value="popularity">Popularity</option>
          <option value="rating">Rating</option>
          <option value="title_asc">Title (A–Z)</option>
          <option value="title_desc">Title (Z–A)</option>
        </select>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4 sm:p-5">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="rounded-2xl border-gray-300 border-2 cursor-pointer bg-white"
            onClick={() => setSelectedMovie(movie)}
          >
            <div className="shadow-[0_0_10px_rgba(0,0,0,0.25)] rounded-xl rounded-b-none overflow-hidden transition-transform duration-500 ease-in-out">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="object-cover w-full h-64 sm:h-72 md:h-80 hover:scale-110 duration-500"
              />
            </div>
            <div className="flex justify-between px-3 py-2 text-sm sm:text-base">
              <div className="font-medium w-[70%]">
                {movie.title.length > 20
                  ? movie.title.slice(0, 20) + "..."
                  : movie.title}
              </div>
              <div className="flex items-center font-semibold">
                {movie.vote_average.toFixed(1)}
                <HiStar className="text-yellow-500 text-lg ml-1" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-3 mt-5 px-4 pb-10">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className={`px-4 py-2 rounded-lg ${
            page === 1
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          Prev
        </button>

        {pagination.map((p, index) =>
          p === "..." ? (
            <span key={index} className="px-3 text-gray-500">
              ...
            </span>
          ) : (
            <button
              key={index}
              onClick={() => setPage(p)}
              className={`px-3 py-2 rounded-lg border ${
                page === p
                  ? "bg-blue-600 text-white"
                  : "bg-white text-black hover:bg-gray-200"
              }`}
            >
              {p}
            </button>
          )
        )}

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className={`px-4 py-2 rounded-lg ${
            page === totalPages
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default TopRated;
