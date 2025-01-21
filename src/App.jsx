import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="flex-grow max-h-[100vh] overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
