import React from "react";
import { RiDashboardFill, RiPassPendingLine, RiProductHuntLine } from "react-icons/ri";
import {
  AiOutlineUser,
  AiOutlineFileAdd,
  AiOutlineDeliveredProcedure,
} from "react-icons/ai";
import { TiVendorAndroid } from "react-icons/ti";
import { GrOrderedList } from "react-icons/gr";
import { MdPendingActions } from "react-icons/md";


const menuItems = {
  Admin: [
    {
      title: "Dashboard",
      to: "/admin/dashboard",
      icon: <RiDashboardFill />,
    },

    {
      title: "Manage Products",
      icon: <AiOutlineFileAdd />,
      to: "dashboard/admin/products",
      // submenuItems: [
      //   {
      //     title: "All Products",
      //     to: "dashboard/admin/products",
      //     icon: <AiOutlineFileAdd />,
      //   },
      //   {
      //     title: "Pending",
      //     to: "/dashboard/admin/pending-products",
      //     icon: <AiOutlineFileAdd />,
      //   },


      // ],
    },
    {
      title: "Pending Products",
      to: "/dashboard/admin/pending-products",
      icon: <MdPendingActions/>,
    },
    
    {
      title: "Manage Vendors",
      icon: <AiOutlineFileAdd />,
      submenu: true,
      submenuItems: [
        {
          title: "All Vendors",
          to: "dashboard/all-vendors",
          icon: <AiOutlineFileAdd />,
        },
        {
          title: "New Vendor",
          to: "/dashboard/register-vendors",
          icon: <AiOutlineFileAdd />,
        },
        {
          title: "Pending",
          to: "/dashboard/pending-vendors",
          icon: <AiOutlineFileAdd />,
        },
        {
          title: "Rejected",
          to: "/dashboard/declined-vendors",
          icon: <AiOutlineFileAdd />,
        },
      ],
    },
  
    {
      title: "Administrators",
      to: "/dashboard/admins",
      icon: <GrOrderedList />
    },
    {
      title: "User Managemnet",
      to: "/dashboard/user",
      icon: <AiOutlineUser />
    },


  ],




  Vendor: [
    {
      title: "Dashboard",
      to: "/dashboard/vendor",
      icon: <RiDashboardFill />,
    },
    {
      title: "Verification",
      to: "/dashboard/create/vendor",
      icon: <TiVendorAndroid />
    },
    {
      title: "Manage Products",
      to: "dashboard/products",
      icon: <RiProductHuntLine />
    },
    {
      title: "Add Products",
      to: "/dashboard/productform",
      icon: <AiOutlineDeliveredProcedure />
    },
    {
      title: "Pending Products",
      to: "/dashboard/pending-products",
      icon: <RiPassPendingLine />,
    },
 
    {
      title: "Manage Orders",
      icon: <AiOutlineFileAdd />,
      submenu: true,
      submenuItems: [
        {
          title: "All Oders",
          to: "/dashboard/orders",
          icon: <AiOutlineFileAdd />,
        },
        {
          title: "Pending",
          to: "/dashboard/pending-orders",
          icon: <AiOutlineFileAdd />,
        },
        {
          title: "Packaged",
          to: "/dashboard/packaged-orders",
          icon: <AiOutlineFileAdd />,
        },
        {
          title: "Cleared Orders",
          to: "/dashboard/cleared-orders",
          icon: <AiOutlineFileAdd />
        }
      ],
    },


  ],



};

export default menuItems;
