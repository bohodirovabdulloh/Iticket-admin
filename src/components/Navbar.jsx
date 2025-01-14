import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa'; 
import Logout from "./Logout";
import Create from './Create';

const Navbar = ({ toggleTheme, theme }) => {
  return (
    <div className={`navbar ${theme === 'dark' ? 'bg-gradient-to-r from-gray-900 via-gray-800 to-black' : 'bg-gradient-to-r from-white via-gray-100 to-gray-200'} text-${theme === 'dark' ? 'white' : 'black'} shadow-lg px-6 py-4 flex items-center justify-between`}>      
      {/* Logo Section */}
      <div className="flex items-center text-lg font-bold">
        <span className="px-3 py-1 rounded-md ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'}">
     
        </span>
      </div>

      {/* Create, Logout, and Theme Toggle Section */}
      <div className="flex items-center gap-5">
        <Create />
        <Logout />
        <div 
          onClick={toggleTheme} 
          className="cursor-pointer p-2 rounded-full hover:bg-opacity-20 ${theme === 'dark' ? 'hover:bg-gray-500' : 'hover:bg-gray-300'} transition duration-300"
        >
          {theme === 'light' ? <FaMoon size={24} /> : <FaSun size={24} />} 
        </div>
      </div>
    </div>
  );
};

export default Navbar;
