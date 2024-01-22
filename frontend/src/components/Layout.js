import React from "react";
import Navbar from "./NavBar";
import { Outlet } from "react-router-dom";

export default function Layout({handleLogout}) {
  return (
    <div>
      <Navbar handleLogout={handleLogout}/>
      <div className="md:w-10/12 overflow-auto scrollbar-hidden max-xl:w-full md:ml-56 p-2 pt-20  dark:bg-gray-900 w-full max-h-screen h-screen bg-slate-100">
        <Outlet />
      </div>
    </div>
  );
}
