import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import useMobile from "../hooks/useMobile";
import { Link } from "react-router-dom"; // Import Link for navigation

const Search = () => {
  const navigate = useNavigate(); // used to navigate to the search page
  const location = useLocation(); // used to get the current location
  const [isSearchPage, setIsSearchPage] = useState(false); // state to check if the current page is the search page
  // console.log(location);
  const [isMobile] = useMobile(); // custom hook to check if the device is mobile

  useEffect(() => {
    const isSearch = location.pathname === "/search";
    setIsSearchPage(isSearch);
  }, [location]); // [] is used to run the effect only once when the component mounts

  const redirectToSearchPage = () => {
    navigate("/search"); // navigate to the search page
  };

  // console.log(`Is Search Page: ${isSearchPage}`); // log the current page

  return (
    <div className="w-full  min-w-[300px] lg:min-w-[420px] h-11 lg:h-12 rounded-lg border overflow-hidden flex items-center text-neutral-500 bg-slate-50 group focus-within:border-primary-200  ">
      {/* <button className="flex justify-center items-center h-full p-3 group-focus-within:text-primary-200">
        <IoSearch size={22} />
      </button> */}

      <div>
        {isMobile && isSearchPage ? (
          <Link
            to={"/"}
            className="flex justify-center items-center h-full p-2 m-1 group-focus-within:text-primary-200 bg-white rounded-full shadow-md"
          >
            <FaArrowLeft size={20} />
          </Link>
        ) : (
          <button className="flex justify-center items-center h-full p-3 group-focus-within:text-primary-200">
            <IoSearch size={22} />
          </button>
        )}
      </div>

      <div className="w-full h-full">
        {
          !isSearchPage ? (
            // not In search page
            <div
              onClick={redirectToSearchPage}
              className="w-full h-full px-3 text-sm outline-none bg-transparent cursor-pointer"
            >
            <TypeAnimation // This component will animate the text
              sequence={[
                'Search "milk"',
                1000, // Waits 1 second before starting the next animation
                'Search "bread"',
                1000, // Waits 1 second before starting the next animation
                'Search "eggs"',
                1000, // Waits 1 second before starting the next animation
                'Search "cheese"',
                1000, // Waits 1 second before starting the next animation
                'Search "vegetables"',
                1000, // Waits 1 second before starting the next animation
                'Search "fruits"',
                1000, // Waits 1 second before starting the next animation
              ]}
              wrapper="span"
              speed={50} // Speed of the typing animation
              repeat={Infinity} // Repeat the animation indefinitely
            />
          </div>
        ) : (
          // In search page
          <div className="w-full h-full">
            <input
              type="text"
              placeholder="Search..."
              className="w-full h-full px-3 text-sm outline-none bg-transparent"
              autoFocus
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
