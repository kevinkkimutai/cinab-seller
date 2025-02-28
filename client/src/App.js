import React, { useEffect } from "react";
import { Routes, Route,  } from "react-router-dom";
import { Dashboard, Inventory,  Offers,  Orders,  Login,  ProductsForm,  Sales,  AllVendors,  RegisteredVendors,  PendingVendors,  DeclinedVendors,  PendingProducts,  PendingOrders,  RejectedOrder,  PackagedOrders,  AdminSection,  Registration,  GetItems,  PendingItems,  AllUsers,} from "./pages";
import { useStateContext } from "./contexts/ContextProvider";
import Vendor from "./pages/Vendors/steps/Vendor";
import NotFound from "./components/NotFound";
import RequireAuth from "./actions/requireAuth";
import ForgetPassword from "./pages/Auth/ForgetPassword";
import DashboardLayout from "./components/DashboardLayOut/DashboardLayout";


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

    <div
      className={`h-screen w-full max-w-full  ${currentMode === "Dark" ? "dark" : ""
        }`}
    >
      <Routes>
        <Route index element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="login" element={<Login />} />
        <Route path="/resetpassword" element={<ForgetPassword />} />
        <Route path="/" element={<DashboardLayout   />}>
          <Route element={<RequireAuth requiredRoles={["Admin"]} />}>
          <Route path="dashboard/user" element={<AllUsers header="List of Users" />} />
            <Route path="admin/dashboard" element={<Dashboard />} />
            <Route path="dashboard/admins" element={<AdminSection header="List of Admins" />} />
            <Route path="dashboard/admin/products" element={<GetItems header="List of Products" />} />
            <Route path="dashboard/admin/pending-products" element={<  PendingItems header="Pending Products" />} />
            <Route
              path="dashboard/all-vendors"
              element={<AllVendors header="All Vendors" />}
            />
            <Route
              path="dashboard/register-vendors"
              element={
                <RegisteredVendors header="Rejected List Of Vendors" />
              }
            />
            <Route
              path="dashboard/pending-vendors"
              element={<PendingVendors header="Pending List of Vendors" />}
            />
            <Route
              path="dashboard/declined-vendors"
              element={<DeclinedVendors header="Rejected List of Vendors" />}
            />

          </Route>

          <Route element={<RequireAuth requiredRoles={["Vendor"]} />}>
            <Route path="dashboard/vendor" element={<Dashboard />} />
            <Route
              path="dashboard/create/vendor"
              element={
                <Vendor />
              }
            />
            <Route
              path="dashboard/products"
              element={<Inventory header="Products List" />}
            />

            <Route
              path="dashboard/productform"
              element={
                <ProductsForm />

              }
            />
            <Route
              path="dashboard/pending-products"
              element={<PendingProducts header="Pending List of Products" />}
            />
            <Route
              path="dashboard/inventory"
              element={<Inventory header="Inventory List" />}
            />
            <Route path="dashboard/orders" element={<Orders header="All Orders" />} />
            <Route
              path="dashboard/pending-orders"
              element={<PendingOrders header="List of Pending Orders" />}
            />
            <Route
              path="dashboard/packaged-orders"
              element={<PackagedOrders header="List of Packaged Orders" />}
            />
            <Route
              path="dashboard/rejected-orders"
              element={<RejectedOrder header="List of Rejected Orders" />}
            />
            <Route
              path="dashboard/cleared-orders"
              element={<Orders header="List of Cleared Orders" />}
            />

            <Route path="dashboard/offers" element={<Offers />} />
            <Route path="dashboard/sales" element={<Sales />} />
          </Route>

        </Route>
        <Route path="*" element={<NotFound />} />

      </Routes>

    </div>

  );
}

