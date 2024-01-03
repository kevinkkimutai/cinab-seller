import React, { useEffect } from "react";
import { Routes, Route,  } from "react-router-dom";
import {
  Dashboard,
  GetVendors,
  Inventory,
  Offers,
  Orders,
  Login,
  Products,
  ProductsForm,
  VendorDetails,
  Sales
} from "./pages";
import { NavBar } from "./components";
import { useStateContext } from "./contexts/ContextProvider";



export default function App() {
  const { setCurrentColor, setCurrentMode, currentMode, } =
  useStateContext();
useEffect(() => {
  const currentThemeColor = localStorage.getItem("colorMode");
  const currentThemeMode = localStorage.getItem("themeMode");
  if (currentThemeColor && currentThemeMode) {
    setCurrentColor(currentThemeColor);
    setCurrentMode(currentThemeMode);
  }
}, [setCurrentColor, setCurrentMode]);
  return (

    <div className={currentMode === "Light" ? "dark" : ""}>
<NavBar />
      <div className="md:w-10/12 md:ml-56 p-2 pt-16 dark:bg-gray-900 w-full max-h-screen h-screen main">
      <Routes >
          <Route index element={<Dashboard />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/products" element={<Products />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/productform" element={<ProductsForm />} />
          <Route path="/vendor" element={<VendorDetails />} />
          <Route path="/login" element={<Login />} className="md:w-12/12"/>
          <Route path="/vendors" element={<GetVendors />} />
          <Route path="/sales" element={<Sales />} />
        </Routes>
      </div>
    </div>
   
  );
}
