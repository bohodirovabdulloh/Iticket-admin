import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaBullhorn,
  FaClipboardList,
  FaNewspaper,
  FaHome,
  FaBoxOpen,
  FaLayerGroup,
  FaTags,
} from "react-icons/fa";
import { FaChartColumn } from "react-icons/fa6";

const Sidebar = () => {
  const location = useLocation();

  return (
    <div
      className={`drawer lg:drawer-open overflow-y-hidden bg-base-100 shadow-lg w-full lg:w-2/12`}
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
              to="/dashboard"
              className={`flex items-center gap-4 py-3 px-6 rounded-lg outline-none transition-all duration-300`}
            >
              <FaHome
                size={24}
                className="transition-transform duration-300 group-hover:scale-110"
              />{" "}
              Главная страница
            </Link>
          </li>
          <li>
            <Link
              to="/advertising"
              className={`flex items-center gap-4 py-3 px-6 rounded-lg outline-none transition-all duration-300`}
            >
              <FaBullhorn
                size={24}
                className="transition-transform duration-300 group-hover:scale-110"
              />{" "}
              Баннеры и Реклама
            </Link>
          </li>
          <li>
            <Link
              to="/analyze"
              className={`flex items-center gap-4 py-3 px-6 rounded-lg   outline-none transition-all duration-300`}
            >
              <FaChartColumn
                size={24}
                className="transition-transform duration-300 group-hover:scale-110"
              />{" "}
              Анализы
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
