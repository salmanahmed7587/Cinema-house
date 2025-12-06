import { useState } from "react";
import n1 from "../assets/navimg/n1.jpg";

import { useNavigate } from "react-router-dom";
import { HiOutlineSearch } from "react-icons/hi";

function Navbar({ setActivepage }) {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    if (!searchText.trim()) return;

    navigate(`/search?query=${searchText}`);
    setActivepage("search");
    setSearchText("");
  };

  return (
    <>
      <nav
        className="
        flex flex-col sm:flex-row 
        gap-4 sm:gap-0
        p-5 items-center bg-blue-700 justify-around rounded-t-2xl pb-3
      "
      >
        <div>
          <img
            src={n1}
            alt="movies"
            className="h-16 w-16 sm:h-20 sm:w-20 rounded-full"
          />
        </div>

        <form
          onSubmit={handleSearch}
          className="flex items-center border border-white rounded-full overflow-hidden bg-white"
        >
          <input
            type="text"
            placeholder="Search movies..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="
            bg-white outline-none p-3
            w-40 sm:w-56 md:w-72 lg:w-96
          "
          />

          <div className="flex items-center px-3">
            <HiOutlineSearch className="text-gray-600 text-xl" />
          </div>

          <button
            type="submit"
            className="bg-blue-700 hover:bg-blue-500 transition-colors duration-500 p-3 hover:cursor-pointer
          text-white font-semibold rounded-r-full"
          >
            Search
          </button>
        </form>

        <div className="font-semibold text-white p-2 rounded-xl text-2xl">
          <p>Cinema House</p>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
