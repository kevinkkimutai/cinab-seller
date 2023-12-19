import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  Dashboard,
  Inventory,
  Offers,
  Orders,
  Products,
  UploadForm,
  VendorDetails,
} from "./pages";
import { NavBar } from "./components";

export default function App() {
  return (
    <div>
      <NavBar />
      <div className="md:w-10/12 md:ml-56 p-2 pt-20">
      <Routes >
          <Route index element={<Dashboard />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/products" element={<Products />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/productform" element={<UploadForm />} />
          <Route path="/vendor" element={<VendorDetails />} />
        </Routes>
      </div>
    
    </div>
  );
}
