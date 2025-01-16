import React from "react";
import Logout from "../Logout/Logout";
import CreateUser from "../CreateUserButton/CreateUser";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-lg px-6 py-4 flex items-center justify-between">
      <div className="flex items-center text-lg font-bold">
        <p className="btn btn-ghost text-base-content text-xl">LOGO</p>
      </div>

      <div className="flex items-center gap-5">
        <CreateUser />
        <Logout />

        <ThemeToggle />
      </div>
    </div>
  );
};

export default Navbar;
