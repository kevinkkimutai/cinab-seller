import React, { useState, useEffect } from "react";
import { logOut, selectCurrentUser } from "../../reducers/AuthReducers";
import { useStateContext } from "../../contexts/ContextProvider";
import { HiLogout, HiViewGrid } from "react-icons/hi";
import { Dropdown } from "flowbite-react";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { AiOutlineMenu } from "react-icons/ai";
import { BiSun, BiMoon } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [companyName, setCompanyName] = useState("Company Name");
  const [companyEmail, setCompanyEmail] = useState("companyEmail@gmail.com");
  const currentUser = useSelector(selectCurrentUser);

  const {
    currentColor,
    currentMode,
    setMode,
    setActiveMenu,
    activeMenu,
    setScreenSize,
    screenSize,
  } = useStateContext();

  useEffect(() => {
    if (currentUser) {
      setCompanyEmail(currentUser.email || "companyEmail@gmail.com");
      setCompanyName(currentUser.name || "Company Name");
    }
  }, [currentUser]);

  useEffect(() => {
    const handleResize = () => {
      if (setScreenSize) setScreenSize(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [setScreenSize]);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
    <TooltipComponent content={title} position="BottomCenter">
      <button
        type="button"
        onClick={customFunc}
        style={{ color }}
        className="relative text-xl rounded-full p-3 hover:bg-light-gray"
      >
        <span
          style={{ background: dotColor }}
          className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
        />
        {icon}
      </button>
    </TooltipComponent>
  );

  const handleDashboard = () => navigate("/dashboard/vendor");

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/");
  };

  return (
    <nav className="flex justify-between relative h-14 shadow-sm-light bg-primary-50 border-b border-gray-100 dark:bg-gray-500">
      <NavButton
        title="Menu"
        customFunc={handleActiveMenu}
        color={currentColor}
        icon={<AiOutlineMenu />}
      />
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center">
          <button
            className="text-gray-800 dark:text-yellow-300 text-3xl mr-4 mt-2"
            onClick={() => setMode(currentMode === "Light" ? "Dark" : "Light")}
          >
            {currentMode === "Dark" ? <BiSun /> : <BiMoon />}
          </button>

          <Dropdown
            label=""
            dismissOnClick={false}
            renderTrigger={() => (
              <button
                type="button"
                className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              >
                <img
                  className="w-8 h-8 rounded-full"
                  src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
                  alt="User"
                />
              </button>
            )}
          >
            <Dropdown.Header>
              <span className="block text-sm">{companyName}</span>
              <span className="block truncate text-sm font-medium">
                {companyEmail}
              </span>
              <span
                className={`${
                  currentUser?.isVerified ? "bg-green-500" : "bg-red-500"
                } text-white flex m-2 rounded-full truncate text-sm font-medium w-full justify-center items-center`}
              >
                {currentUser?.isVerified ? "Approved" : "Pending"}
              </span>
            </Dropdown.Header>
            <Dropdown.Item icon={HiViewGrid} onClick={handleDashboard}>
              Dashboard
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item icon={HiLogout} onClick={handleLogout}>
              Sign out
            </Dropdown.Item>
          </Dropdown>
        </div>
      </div>
    </nav>
  );
}
