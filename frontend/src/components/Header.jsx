import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { CiSearch } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { useAppContext } from "../context/AppContext";

const Header = ({search,setSearch}) => {
  const {cart} = useAppContext()
  const navigate = useNavigate();
  return (
    <nav className="fixed top-0 left-0 w-full flex items-center justify-between shadow-sm px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white  transition-all">
      {/* Logo */}
      <Link to="/">
        <img src={logo} alt="logo" className={`h-10`} />
      </Link>
      <div className="flex items-center gap-8">
        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
          <input
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
            placeholder="Search products"
          />

          <CiSearch size={20} />
        </div>

        <div
          onClick={() => navigate("/cart")}
          className="relative cursor-pointer"
        >
          <IoCartOutline size={20} />
          <button className="absolute -top-2 -right-3 text-xs text-white bg-indigo-500 w-[18px] h-[18px] rounded-full">
            {cart?.items?.length}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
