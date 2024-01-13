import React, { useEffect } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import {
  Dashboard,
  GetVendors,
  Inventory,
  Offers,
  Orders,
  Login,
  Products,
  ProductsForm,
  Error,
  Sales,
} from "./pages";
import { NavBar } from "./components";
import { useStateContext } from "./contexts/ContextProvider";
import Vendor from "./pages/Vendors/Vendor";
import Layout from "./components/Layout";
import NotFound from "./components/NotFound";

export default function App() {
  const { setCurrentColor, setCurrentMode, currentMode } = useStateContext();
  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, [setCurrentColor, setCurrentMode]);

  return (
    <div className={currentMode === "Dark" ? "dark h-full" : " h-full"}>
      <div className="h-full bg-slate-100">
        <Routes>
          <Route path="/login" element={<Login />} className="md:w-12/12" />
          <Route index element={<Login />} className="md:w-12/12" />
          <Route path="/vendors/:code" element={<VendorPage />} />

          <Route path="/dashboard/" element={<Layout />}>
            <Route path="vendor" element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="offers" element={<Offers />} />
            <Route path="orders" element={<Orders />} />
            <Route path="productform" element={<ProductsForm />} />
            <Route path="sales" element={<Sales />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

function VendorPage() {
  const params = useParams();

  useEffect(() => {
    const secretCode = params.code;
    localStorage.setItem("secretCode", secretCode);
  }, [params]);

  return (
    <div className="md:ml-62">
      <Vendor />
    </div>
  );
}