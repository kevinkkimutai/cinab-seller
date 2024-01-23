import React, { useEffect } from "react";
import { Routes, Route, useParams, useNavigate } from "react-router-dom";
import {
  Dashboard,
  GetVendors,
  Inventory,
  Offers,
  Orders,
  Login,
  ProductsForm,
  Sales,
  AllVendors,
  RegisteredVendors,
  PendingVendors,
  DeclinedVendors,
  PendingProducts,
} from "./pages";
import { useStateContext } from "./contexts/ContextProvider";
import Vendor from "./pages/Vendors/steps/Vendor";
import Layout from "./components/Layout";
import NotFound from "./components/NotFound";
import { useDispatch } from "react-redux";
import { logOut } from "./reducers/AuthReducers";
import RequireAuth from "./actions/requireAuth";

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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async (e) => {
    dispatch(logOut());
    navigate("/");
  };

  return (
    <div className={currentMode === "Dark" ? "dark h-full" : " h-full"}>
      <div className="h-full bg-slate-100">
        <Routes>
          <Route path="/login" element={<Login />} className="md:w-12/12" />
          <Route index element={<Login />} className="md:w-12/12" />
          <Route path="/vendors/:code" element={<VendorPage />} />
          <Route element={<RequireAuth />}>
            <Route
              path="/dashboard/"
              element={<Layout handleLogout={handleLogout} />}
            >
              <Route path="vendor" element={<Dashboard />} />
              <Route
                path="all-vendors"
                element={<AllVendors header="All Vendors" />}
              />
              <Route
                path="registered-vendors"
                element={
                  <RegisteredVendors header="Rejected List Of Vendorss" />
                }
              />
              <Route
                path="pending-vendors"
                element={<PendingVendors header="Pending List of Vendors" />}
              />
              <Route
                path="declined-vendors"
                element={<DeclinedVendors header="Rejected List of Vendors" />}
              />

              <Route
                path="products"
                element={<Inventory header="Products List" />}
              />
              <Route path="productform" element={<ProductsForm />} />
              <Route
                path="pending-products"
                element={<PendingProducts header="Pending List of Products" />}
              />
              <Route
                path="inventory"
                element={<Inventory header="Inventory List" />}
              />


            <Route path="orders" element={<Orders header="All Orders"/>} />
            <Route path="pending-orders" element={<Orders header="List of Pending Orders"/>} />
            <Route path="processed-orders" element={<Orders header="List of Processed Orders"/>} />
            <Route path="rejected-orders" element={<Orders header="List of Rejected Orders"/>} />
            <Route path="cleared-orders" element={<Orders header="List of Cleared Orders"/>} />


              <Route path="offers" element={<Offers />} />
              <Route path="sales" element={<Sales />} />
            </Route>
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
