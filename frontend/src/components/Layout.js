import React from "react";
import Navbar from "./NavBar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <Navbar />
      <div className="md:w-10/12  max-xl:w-full md:ml-56 p-2 pt-20  dark:bg-gray-900 w-full max-h-screen h-screen bg-slate-200">
        <Outlet />
      </div>
    </div>
  );
}
