import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdOutlineCancel } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import  menuItems  from './Menu';
import { HiMiniChevronRight } from "react-icons/hi2";
import { useStateContext } from "../../contexts/ContextProvider";
import { IoChevronDownSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import { selectCurrentUser, selectUserRoles } from "../../reducers/AuthReducers";

const Sidebar = () => {
  const { activeMenu, setActiveMenu, screenSize } = useStateContext();
  const userRoles = [useSelector(selectUserRoles)];

  const currentUser = useSelector(selectCurrentUser)


  const isUserVerified = () => currentUser?.isVerified ?? false;

  const location = useLocation();
  const filteredMenus = userRoles?.reduce((acc, role) => {
    const roleMenus = menuItems[role];
    if (roleMenus) {
      const filteredRoleMenus = roleMenus.filter((menuItem) => {
        // Additional condition for "butVerification" to display only if user is not verified
        if (menuItem.title === "Verification") {
          return !isUserVerified(); // Replace with your verification check logic
        }
        return true;
      });
      return acc.concat(filteredRoleMenus);
    }
    return acc;
  }, []);



  const [isDropdownOpen, setDropdownOpen] = useState(
    Array(filteredMenus?.length).fill(false)
  );

  const toggleDropdown = (index) => {
    const newDropdownOpen = [...isDropdownOpen];
    newDropdownOpen[index] = !newDropdownOpen[index];

    // Close other open submenus if the current submenu is opening
    if (newDropdownOpen[index]) {
      for (let i = 0; i < newDropdownOpen.length; i++) {
        if (i !== index) {
          newDropdownOpen[i] = false;
        }
      }
    }

    setDropdownOpen(newDropdownOpen);
  };

const handleCloseSideBar = (e) => {
  if (e) e.preventDefault(); // Prevent default behavior
  if (activeMenu !== undefined && screenSize <= 900) {
    setTimeout(() => setActiveMenu(false), 200); // Slight delay to prevent unwanted navigation
  }
};


  const activeLink = "text-yellow-500";
  const normalLink = "m-";
  const submenuLink =
    "no-underline submenu-link hover:no-underline hover:bg-blue-500";

  return (
    <div className="ml-0  bg-primary-50 dark:bg-slate-800 shadow-inner z-50 ">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center h-14 bg-primary-50 boder-b-2 border-gray-400 dark:border-gray-400 shadow-lg shadow-purple-50 dark:bg-slate-700">
            <Link
              onClick={handleCloseSideBar}
              className="items-center gap-3 ml-3 mb-4 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
            >
              <img
                src="/logo.png"
                alt=""
                className="flex items-center justify-center rounded-full h-14 w-14"
              />

              <span className="text- uppercase"> Cinab-Seller</span>
            </Link>
            <TooltipComponent content="Menu" position="BottomCenter">
              <button
                type="button"
                onClick={() => setActiveMenu(!activeMenu)}
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden text-yellow-500-900"
              >
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
          </div>
          <div className="mt-4 overflow-y-auto h-[96vh]">
            {" "}
            <div className={`sidebar pb-10`}>
              {filteredMenus?.map((menuItem, index) => {
                const isActive = location.pathname.startsWith(menuItem.to);
                const hasSubmenu =
                  menuItem.submenuItems && menuItem.submenuItems.length > 0;

                return (
                  <div
                    key={index}
                    onClick={handleCloseSideBar}
                    className={`menu-item py-2 relative ${
                      isActive ? activeLink : normalLink
                    }`}
                  >
                    <Link
                      to={menuItem.to}
                      className=" focus:text-blue-500 text-bold py-2 items-center w-full px-4 rounded-lg text-md text-gray-900 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray flex duration-300"
                      onClick={() => toggleDropdown(index)}
                    >
                      <span
                        className={`mr-4 text-gray-800 dark:bg-gray-50 text-lg menu-icon }`}
                      >
                        {menuItem.icon}
                      </span>
                      <span
                        className={`text-xl font-medium hover:text-blue-400 `}
                      >
                        {menuItem.title}
                      </span>
                      {hasSubmenu && (
                        <IoChevronDownSharp
                          className={`${
                            isDropdownOpen[index]
                              ? "transform rotate-180 duration-300 text-1xl"
                              : ""
                          } ml-auto`}
                        />
                      )}
                    </Link>
                    {isDropdownOpen[index] &&
                      hasSubmenu &&
                      menuItem.submenuItems && (
                        <div
                          className={`submenu px-10 py-2${
                            isDropdownOpen[index] ? "open" : "closed"
                          }`}
                        >
                          {menuItem.submenuItems.map(
                            (subMenuItem, subIndex) => (
                              <Link
                                key={subIndex}
                                to={subMenuItem.to}
                                className={`${
                                  isActive ? `${activeLink}` : `${submenuLink}`
                                } hover:bg-yellow-500`}
                              >
                                <div className="submenu-item flex items-center pt-2">
                                  <span className="submenu-icon mr-2">
                                    <HiMiniChevronRight
                                      strokeWidth={3}
                                      className="h-3 w-5"
                                    />{" "}
                                  </span>
                                  <span
                                    className=" focus:text-gray-500  text-lg opacity-90 rounded-full hover:text-gray-700 block text-gray-900 dark:text-white "
                                    fw={500}
                                  >
                                    {subMenuItem.title}
                                  </span>
                                </div>
                              </Link>
                            )
                          )}
                        </div>
                      )}
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
