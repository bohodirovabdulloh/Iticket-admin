import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaBullhorn,
  FaHome,
 FaUserFriends 
} from "react-icons/fa";

const Sidebar = ({ theme }) => {
  const location = useLocation();

  return (
    <div
      className={`drawer lg:drawer-open overflow-y-hidden ${
        theme === "dark" ? "bg-gradient-to-b from-gray-800 to-gray-900" : "bg-gradient-to-b from-white to-gray-100"
      } text-${theme === "dark" ? "white" : "black"} w-full lg:w-2/12 shadow-2xl border-r border-gray-300`}
    >
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden shadow-md hover:shadow-lg transition-all duration-300"
        >
          Open drawer
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu min-h-full w-full p-4 gap-5">
          <li>
            <Link
              to="/app/home"
              className={`flex items-center gap-4 py-3 px-6 rounded-lg transition-all duration-300 ${
                location.pathname === "/app/home"
                  ? "bg-blue-700 text-white shadow-md"
                  : "hover:bg-blue-600 hover:text-white"
              }`}
            >
              <FaHome size={24} className="transition-transform duration-300 group-hover:scale-110" /> Главная страница
            </Link>
          </li>

          <li>
            <Link
              to="/app/advertising"
              className={`flex items-center gap-4 py-3 px-6 rounded-lg transition-all duration-300 ${
                location.pathname === "/app/advertising"
                  ? "bg-blue-700 text-white shadow-md"
                  : "hover:bg-blue-600 hover:text-white"
              }`}
            >
              <FaBullhorn size={24} className="transition-transform duration-300 group-hover:scale-110" /> Баннер и Реклама
            </Link>
          </li>
          <li>
            <Link
              to="/app/all-users"
              className={`flex items-center gap-4 py-3 px-6 rounded-lg transition-all duration-300 ${
                location.pathname === "/app/all-users"
                  ? "bg-blue-700 text-white shadow-md"
                  : "hover:bg-blue-600 hover:text-white"
              }`}
            >
              <FaUserFriends size={24} className="transition-transform duration-300 group-hover:scale-110" /> Все пользователи
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
