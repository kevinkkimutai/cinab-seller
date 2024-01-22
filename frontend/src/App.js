import React, { useEffect } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import {
  Dashboard,
  GetVendors,
  Inventory,
  Offers,
  Orders,
  Login,
  ProductsForm,
  Error,
  Sales,
  Settings,
  AllVendors,
  RegisteredVendors,
  PendingVendors,
  DeclinedVendors,
  PendingProducts,
  PendingOrders,
  ClearedOrders,

} from "./pages";
import { NavBar } from "./components";
import { useStateContext } from "./contexts/ContextProvider";
import Vendor from "./pages/Vendors/steps/Vendor";
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
          <Route path="/sales" element={<Sales />} />
          <Route path="/settings" element={<Settings />} />


          <Route path="/dashboard/" element={<Layout />}>
            <Route path="vendor" element={<Dashboard />} />
            <Route path="all-vendors" element={<AllVendors header="All Vendors" />} />
            <Route path="registered-vendors" element={<RegisteredVendors header="Rejected List Of Vendorss"/>} />
            <Route path="pending-vendors" element={<PendingVendors header="Pending List of Vendors"/>} />
            <Route path="declined-vendors" element={<DeclinedVendors header="Rejected List of Vendors"/>} />

            <Route path="products" element={<Inventory header="Products List"/>} />
            <Route path="productform" element={<ProductsForm />} />
            <Route path="pending-products" element={<PendingProducts header="Pending List of Products" />} />
            <Route path="inventory" element={<Inventory header="Inventory List"/>} />

            <Route path="orders" element={<Orders />} />
            <Route path="pending-orders" element={<PendingOrders />} />
            <Route path="cleared-orders" element={<ClearedOrders />} />

            <Route path="offers" element={<Offers />} />
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