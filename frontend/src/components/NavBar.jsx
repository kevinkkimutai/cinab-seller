import React, { useState } from "react";
import Image from "../assets/cinablogo.png";

import { BiSun, BiMoon } from "react-icons/bi";
import { useStateContext } from "../contexts/ContextProvider";
import { Dashboard } from "../pages";
import { RxDashboard } from "react-icons/rx";

import { BiStore, BiShoppingBag, BiPlus, BiLogIn } from 'react-icons/bi'; // Import the icons you need from react-icons


export default function NavBar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const {
    currentMode,
    setMode, // Function to toggle mode
  } = useStateContext();


  const MenuItem = ({ href, icon, label }) => (
    <li className="mt-4 px-2 ">
      <a
        href={href}
        className="flex items-center p-2 text-base text-gray-900 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700"
      >
        {icon && React.cloneElement(icon, { className: "flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400  group-hover:text-gray-900 dark:group-hover:text-white" })}
        <span className="flex-1 ms-3 whitespace-nowrap text-gray-900 font-medium text-lg dark:text-primary-50">{label}</span>
      </a>
    </li>
  );
  

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-primary-50 border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                onClick={toggleSidebar}
                aria-expanded={isSidebarOpen}
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>

              <a href="https://flowbite.com" className="flex ms-2 md:me-24">
                <img src={Image} className="h-8  me-3  " alt="FlowBite Logo" />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                  Cinab-Seller
                </span>
              </a>
            </div>
            <div class="flex items-center">
              <div class="flex items-center ms-3">
                {/* Moon and Sun for dark and balck mode */}

                <div>
                  <button
                    className="text-gray-800 dark:text-yellow-300 text-3xl mr-4 mt-2"
                    onClick={() => {
                      setMode({
                        target: {
                          value: currentMode === "Light" ? "Dark" : "Light",
                        },
                      });
                    }}
                  >
                    {currentMode === "Dark" ? <BiSun /> : <BiMoon />}
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    class="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    aria-expanded="false"
                    data-dropdown-toggle="dropdown-user"
                  >
                    <span class="sr-only">Open user menu</span>
                    <img
                      class="w-8 h-8 rounded-full"
                      src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                      alt="userphoto"
                    />
                  </button>
                </div>
                <div
                  class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
                  id="dropdown-user"
                >
                  <div class="px-4 py-3" role="none">
                    <p
                      class="text-sm text-gray-900 dark:text-white"
                      role="none"
                    >
                      Company Name
                    </p>
                    <p
                      class="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                      role="none"
                    >
                      company@cinab.com
                    </p>
                  </div>
                  <ul class="py-1" role="none">
                    <li>
                      <a
                        href="#"
                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Settings
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Sign out
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-56 h-screen pt-20 transition-transform -translate-x-full bg-primary-50 border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar"
      >
        <div className="flex-1 px-3 space-y-1 bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
      <ul className="pb-2 space-y-2">
        <MenuItem href="/dashboard" icon={<RxDashboard/>} label="Dashboard" />
        <MenuItem href="/dashboard/vendors" icon={<BiStore />} label="Vendors" />
        <MenuItem href="/products" icon={<BiShoppingBag />} label="Products" />
        <MenuItem href="/dashboard/productform" icon={<BiPlus />} label="Add Product" />
        <MenuItem href="/login" icon={<BiLogIn />} label="Sign In" />
      </ul>
    </div>
      </aside>
      {/* dashhbord */}
      <div className="md:w-10/12 md:ml-56 p-2 pt-20 overflow-auto scrollbar-hidden dark:bg-gray-900 w-full max-h-screen h-screen bg-slate-100">
        <Dashboard />
      </div>
    </>
  );
}
