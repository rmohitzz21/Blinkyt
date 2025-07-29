import React from "react";
import logo from "../assets/logo.png";
import { FaRegCircleUser } from "react-icons/fa6";

import { Link, useLocation, useNavigate } from "react-router-dom";
import Search from "./Search";
import useMobile from "../hooks/useMobile";
import { TiShoppingCart } from "react-icons/ti"
import { useSelector } from "react-redux";




const Header = () => {
  const [isMobile] = useMobile();
  const location = useLocation();
  const navigate = useNavigate();
  

  const redirectToLogin = () => {
    navigate("/login");
  };

  
  const user = useSelector((state) => state.user);
  // console.log(`User: ${user}`);
  
  // console.log(`Is mobile: ${isMobile}`);
  const isSearchPage = location.pathname === "/search";

  return (
    <header className="h-24 lg:h-20 lg:shadow-md sticky top-0 z-40 flex flex-col justify-center gap-1 bg-white">
      {!(isSearchPage && isMobile) && (
        <div className="container mx-auto flex items-center px-2 justify-between">
          <div className="h-full">
            <Link to={"/"} className="h-full flex justify-center items-center">
              <img
                src={logo}
                width={170}
                height={60}
                alt="logo"
                className="hidden lg:block"
              />

              <img
                src={logo}
                width={120}
                height={60}
                alt="logo"
                className="lg:hidden"
              />
            </Link>
          </div>

          {/* Search */}
          <div className="hidden lg:block">
            <Search />
          </div>

          {/* login */}
          <div>
            <button className="text-neutral-600 lg:hidden">
              <FaRegCircleUser size={30} className="text-primary-200" />
            </button>

            {/**Desktop**/}
            <div className="hidden lg:flex items-center gap-8">
              <button className="text-neutral-600 text-lg " onClick={redirectToLogin}>Login</button>

              <button className="flex items-center gap-2  px-3 py-3 rounded text-white bg-green-700 hover:bg-green-900" >
                {/* {Add To Cart Icon} */}
                <div className="animate-bounce">
                  <TiShoppingCart size={35} className="text-white" />
                </div>
                <div className="font-semibold">
              
                  <p>My Cart</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-2 lg:hidden">
        <Search />
      </div>
    </header>
  );
};

export default Header;
