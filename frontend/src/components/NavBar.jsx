import React, { useState, useEffect } from "react";
import Image from "../assets/cinablogo.png";
import { Link } from "react-router-dom";
import { selectCurrentUser, selectUserRoles } from "../reducers/AuthReducers";
import { useStateContext } from "../contexts/ContextProvider";
import { HiLogout, HiViewGrid } from "react-icons/hi";
import { MdAdminPanelSettings } from "react-icons/md";
import { Dropdown, Sidebar } from "flowbite-react";

import { BiSun, BiMoon } from "react-icons/bi"; // Import the icons you need from react-icons
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { HiArrowSmRight, HiChartPie, HiShoppingBag } from "react-icons/hi";

export default function NavBar({ handleLogout }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const [companyName, setCompanyName] = useState("Company Name");
  const [companyEmail, setCompanyEmail] = useState("companyEmail@gmail.com");
  const userRole = useSelector(selectUserRoles);
  const currentUser = useSelector(selectCurrentUser);

  const {
    currentMode,
    setMode, // Function to toggle mode
  } = useStateContext();

  useEffect(() => {
    if (currentUser) {
      setCompanyEmail(currentUser.email);
      setCompanyName(currentUser.name);
    }
  }, [currentUser]);

  const handleDashboard = () => {
    navigate("/dashboard/vendor");
  };

  return (
    <>
      <nav className="fixed top-0 z-50 w-full max-w-full bg-primary-50 border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
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

              <Link
                to="https://sellercenter.cinab.co.ke/"
                className="flex ms-2 md:me-24"
              >
                <img src={Image} className="h-8  me-3  " alt="FlowBite Logo" />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                  Cinab-Seller
                </span>
              </Link>
            </div>

            <div className="flex items-center">
              <div className="flex items-center ms-3">
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
                        src="https://flowbite.com//docs/images/carousel/carousel-1.svg"
                        alt="userphoto"
                      />
                    </button>
                  )}
                >
                  <Dropdown.Header>
                    <span className="block text-sm">{companyName}</span>
                    <span className="block truncate text-sm font-medium">
                      {companyEmail}{" "}
                    </span>
                  </Dropdown.Header>
                  <Dropdown.Item icon={HiViewGrid} onClick={handleDashboard}>
                    Dashboard
                  </Dropdown.Item>
                  {/* <Dropdown.Item icon={HiCog}>Settings</Dropdown.Item> */}
                  <Dropdown.Divider />
                  <Dropdown.Item icon={HiLogout} onClick={handleLogout}>
                    Sign out
                  </Dropdown.Item>
                </Dropdown>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <Sidebar
        aria-label="Sidebar with multi-level dropdown example"
        className="fixed top-0 overflow-auto scrollbar-hidden left-0 z-40 w-56  h-screen pt-20 transition-transform -translate-x-full bg-primary-50 border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <Sidebar.Items className="overflow-auto scrollbar-hidden">
          <Sidebar.ItemGroup>
            <Sidebar.Item icon={HiChartPie}>
              <Link to="/dashboard/vendor"> Dashboard</Link>
            </Sidebar.Item>

            {userRole === "Admin" && (
              <Sidebar.Item icon={MdAdminPanelSettings}>
                <Link to="/dashboard/admins"> Admins</Link>
              </Sidebar.Item>
            )}
            <Sidebar.Collapse icon={HiShoppingBag} label="Manage Products">
              <Sidebar.Item>
                <Link to="/dashboard/products">All Products</Link>
              </Sidebar.Item>
              <Sidebar.Item>
                <Link to="/dashboard/productform">Add Product</Link>
              </Sidebar.Item>
              <Sidebar.Item>
                <Link to="/dashboard/pending-products">Pending Products</Link>
              </Sidebar.Item>
            </Sidebar.Collapse>

            <Sidebar.Collapse icon={HiShoppingBag} label="Manage Orders">
              <Sidebar.Item>
                <Link to="/dashboard/orders">All Orders</Link>{" "}
              </Sidebar.Item>
              <Sidebar.Item>
                <Link to="/dashboard/pending-orders">
                  Pending Orders
                  {/* <sup className="w-4 h-4 bg-blue-100 p-3 inline-flex justify-center items-center rounded-full">
                    3
                  </sup> */}
                </Link>{" "}
              </Sidebar.Item>
              <Sidebar.Item>
                <Link to="/dashboard/packaged-orders">
                  Packaged Orders
                  {/* <sup className="w-4 h-4 bg-blue-100 p-3 inline-flex justify-center items-center rounded-full">
                    3
                  </sup> */}
                </Link>{" "}
              </Sidebar.Item>
              <Sidebar.Item>
                <Link to="/dashboard/rejected-orders">
                  Rejected Orders
                  {/* <sup className="w-4 h-4 bg-blue-100 p-3 inline-flex justify-center items-center rounded-full">
                    3
                  </sup> */}
                </Link>{" "}
              </Sidebar.Item>
              <Sidebar.Item>
                <Link to="/dashboard/cleared-orders">Cleared Orders</Link>{" "}
              </Sidebar.Item>
            </Sidebar.Collapse>

            {userRole === "Admin" && (
              <Sidebar.Collapse icon={HiShoppingBag} label="Manage Vendors">
                <Sidebar.Item>
                  <Link to="/dashboard/all-vendors">All Vendors</Link>{" "}
                </Sidebar.Item>
                <Sidebar.Item>
                  <Link to="/dashboard/registered-vendors">
                    Registered Vendors
                  </Link>
                </Sidebar.Item>
                <Sidebar.Item>
                  <Link to="/dashboard/pending-vendors">
                    Pending Vendors{" "}
                    {/* <sup className="w-4 h-4 bg-blue-100 p-3 inline-flex justify-center items-center rounded-full">
                      3
                    </sup>{" "} */}
                  </Link>{" "}
                </Sidebar.Item>{" "}
                <Sidebar.Item>
                  <Link to="/dashboard/declined-vendors">Rejected Vendors</Link>{" "}
                </Sidebar.Item>
              </Sidebar.Collapse>
            )}

            <Sidebar.Item href="#" icon={HiArrowSmRight}>
              <Link to="/login">Login</Link>{" "}
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </>
  );
}
