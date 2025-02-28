import React from "react";
import { Sidebar, NavBar } from "..";
import { Outlet } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";

export default function DashboardLayout({ handleLogout}) {
  const { activeMenu } = useStateContext();
  return (
    <div className="relative dark:bg-gray-800 h-full  dark:bg-main-dark-bg">
      {activeMenu ? (
        <div className="w-72 fixed sidebar z-50">
          <Sidebar  handleLogout={handleLogout} />
        </div>
      ) : (
        <div className="w-0 dark:bg-secondary-dark-bg">
          <Sidebar handleLogout={handleLogout} />
        </div>
      )}

      <div
        className={`${
          activeMenu ? " md:ml-72 w-auto" : "w-full "
        }  flex-1 h-full`}
      >
        {<NavBar classNamre="h-14" />}
        <div
          className="  w-full z-0  bg-slate-100  dark:text-gray-50 dark:dark:bg-gray-900 h-full"
          style={{ zIndex: "12" }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}
