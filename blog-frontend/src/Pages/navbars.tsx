import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface NavbarProps {
  showSearch?: boolean;
  onSearch: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ showSearch = true, onSearch }) => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const locationData = useLocation();
  const navigate = useNavigate()

 
  const {email,username} = locationData.state.userDetails || {}
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    onSearch(event.target.value);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token")
    sessionStorage.removeItem("token")
    navigate("/")
  };

  const path = location?.pathname;
  const PathMap = {
    "/blogs": "Blogs",
    "/home": "Home",
  };

  return (
    <nav className="bg-[#130F40] border-black dark:bg-gray-900 shadow-lg border-b-2 sticky top-0">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a
          href="https://swayamprabha.gov.in/"
          target="_blank"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="https://swayamprabha.gov.in/asset/new/new_homepage/img/logo.png"
            className="h-8"
            alt="Swayam Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white text-sky-200">
            SWAYAM
          </span>
        </a>

        <div className="items-center justify-between md:flex md:w-auto md:order-1">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-[#130F40] md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:border-gray-700">
            <text className="block py-2 px-3 rounded-sm md:bg-transparent text-sky-400">
              {PathMap[path]}
            </text>
          </ul>

          <div className="relative">
            <img
              onClick={toggleDropdown}
              className="w-10 h-10 rounded-full cursor-pointer"
              src="https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-male-user-profile-vector-illustration-isolated-background-man-profile-sign-business-concept_157943-38764.jpg?w=740"
              alt="User Avatar"
            />

            {isDropdownOpen && (
              <div className="absolute border mt-2  bg-[#7a71d8] divide-y divide-gray-100 rounded-lg shadow-lg dark:bg-gray-700 dark:divide-gray-600 ">
                <div className="px-4 py-3 text-sm text-gray-900 dark:text-white hover:bg-[#130F40]">
                  <div className=" text-white">{username}</div>
                  <div className="font-medium text-white">{email}</div>
                </div>
              
                <div className="py-1">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-100 hover:bg-[#130F40] dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Search Bar */}
        {showSearch && (
          <div className="w-[40%] mx-auto rounded-lg border-sky-900 border-2">
            <div className="relative flex items-center w-full h-8 rounded-lg focus-within:shadow-lg bg-[#130F40] overflow-hidden">
              <div className="grid place-items-center h-full w-12 text-gray-300 justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                className="peer h-full w-full outline-none text-sm bg-[#130F40] text-gray-100 pr-2 px-3"
                type="text"
                id="search"
                placeholder="Search something..."
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
