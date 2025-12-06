import { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import Popular from "./pages/Popular";
import Trending from "./pages/Trending";
import TopRated from "./pages/TopRated";
import Upcoming from "./pages/Upcoming";
import Search from "./pages/Search";
import Movies from "./Movies";
import Details from "./Components/Details";
import Favorites from "./pages/Favorites";

function App() {
  const [activepage, setActivepage] = useState("popular");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (movie) => {
    const exists = favorites.find((m) => m.id === movie.id);
    if (!exists) {
      setFavorites([...favorites, movie]);
    }
  };
  const removeFromFavorites = (movieID) => {
    const updated = favorites.filter((m) => m.id !== movieID);
    setFavorites(updated);
  };

  const onRender = () => {
    switch (activepage) {
      case "popular":
        return <Popular setSelectedMovie={setSelectedMovie} />;
      case "trending":
        return <Trending setSelectedMovie={setSelectedMovie} />;
      case "toprated":
        return <TopRated setSelectedMovie={setSelectedMovie} />;
      case "upcoming":
        return <Upcoming setSelectedMovie={setSelectedMovie} />;
      case "search":
        return <Search setSelectedMovie={setSelectedMovie} />;
      case "favorites":
        return (
          <Favorites
            favorites={favorites}
            onClose={() => setActivepage("popular")}
            removeFromFavorites={removeFromFavorites}
          />
        );
    }
  };

  return (
    <>
      <div className="w-[100%vh] grid grid-cols-4 gap-6">
        <div className="col-span-4 backdrop-blur-md bg-white/10 p-5 rounded-xl h-fit">
          <Navbar setActivepage={setActivepage} />

          {selectedMovie ? (
            <Details
              movie={selectedMovie}
              onClose={() => setSelectedMovie(null)}
              addToFavorites={addToFavorites}
              favorites={favorites}
              removeFromFavorites={removeFromFavorites}
            />
          ) : (
            <Movies
              onRender={onRender}
              activepage={activepage}
              setActivepage={setActivepage}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default App;
