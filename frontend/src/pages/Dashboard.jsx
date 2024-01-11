import React from "react";
import { TableProducts, TableResents } from "../components";
import { useNavigate } from "react-router-dom";
import { MdOutlineInventory2 } from "react-icons/md";
import { BiSolidOffer } from "react-icons/bi";
import { FcSalesPerformance } from "react-icons/fc";
import { FaCartShopping } from "react-icons/fa6";
import { BiStoreAlt } from "react-icons/bi";
import { useSelector } from "react-redux";
import { selectProducts } from "../reducers/ProductReducers";
import { selectOffers } from "../reducers/OfferReducer";
import { selectOrders } from "../reducers/OrderReducers";



export default function Dashboard() {
  const navigate = useNavigate();
  const productData = useSelector(selectProducts);
  const offerData = useSelector(selectOffers);
  const orderData = useSelector(selectOrders);
  const totalStock = productData.reduce((sum, product) => sum + product.stock, 0);

  return (
    <div class="p-4 border-2 border-gray-200 rounded-lg dark:border-gray-700 h-full overflow-auto scrollbar-hidden">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div class="flex items-center justify-center h-24 hover:bg-white rounded bg-gray-50 dark:bg-gray-800">
          <button
            type="button"
            onClick={() => {
              navigate("/dashboard/inventory");
            }}
            className="h-full w-full rounded-lg grid grid-cols-3 gap-1 md:gap-4 items-center"
          >
            {/* Left grid (narrower) */}
            <div className="col-span-1 bg-pink-100 h-14 w-14 flex rounded-full items-center justify-center p-4 md:p-10 md:ml-4">
              <span>
                <BiStoreAlt className="text-pink-500 text-bold text-5xl" />
              </span>
            </div>

            {/* Right grid (wider) */}
            <div className="col-span-2">
              <div>
                {" "}
                <span className="text-gray-500 text-md text-xl">
                  Inventory
                </span>{" "}
              </div>
              <span className="text-gray-950 text-md md:text-xl">{totalStock}</span>{" "}
            </div>
          </button>
        </div>

        <div class="flex items-center justify-center h-24 hover:bg-white rounded bg-gray-50 dark:bg-gray-800">
          <button
            type="button"
            onClick={() => {
              navigate("/dashboard/offers");
            }}
            className="h-full w-full rounded-lg grid grid-cols-3 gap-1 md:gap-4 items-center"
          >
            {/* Left grid (narrower) */}
            <div className="col-span-1 bg-yellow-100 h-14 w-14 flex rounded-full items-center justify-center p-4 md:p-10 md:ml-4">
              <span>
                <BiSolidOffer className="text-yellow-300 text-bold text-5xl" />
              </span>
            </div>

            {/* Right grid (wider) */}
            <div className="col-span-2">
              <div>
                {" "}
                <span className="text-gray-500 text-md text-xl">
                  Offers{" "}
                </span>{" "}
              </div>
              <span className="text-gray-950 text-md md:text-xl">{totalStock}</span>{" "}
            </div>
          </button>
        </div>

        <div class="flex items-center justify-center h-24 hover:bg-white rounded bg-gray-50 dark:bg-gray-800">
          <button
            type="button"
            onClick={() => {
              navigate("/dashboard/orders");
            }}
            className="h-full w-full rounded-lg grid grid-cols-3 gap-1 md:gap-4 items-center"
          >
            {/* Left grid (narrower) */}
            <div className="col-span-1 bg-purple-100 h-14 w-14 flex rounded-full items-center justify-center p-4 md:p-10 md:ml-4">
              <span>
                <FaCartShopping className="text-pink-500 text-bold text-5xl" />
              </span>
            </div>

            {/* Right grid (wider) */}
            <div className="col-span-2">
              <div>
                {" "}
                <span className="text-gray-500 text-md text-xl">
                  Orders{" "}
                </span>{" "}
              </div>
              <span className="text-gray-950 text-md md:text-xl">{totalStock}</span>{" "}
            </div>
          </button>
        </div>

        <div class="flex items-center justify-center h-24 hover:bg-white rounded bg-gray-50 dark:bg-gray-800">
          <button
            type="button"
            onClick={() => {
              navigate("/dashboard/sales");
            }}
            className="h-full w-full rounded-lg grid grid-cols-3 gap-1 md:gap-4 items-center"
          >
            {/* Left grid (narrower) */}
            <div className="col-span-1 bg-pink-100 h-14 w-14 flex rounded-full items-center justify-center p-4 md:p-10 md:ml-4">
              <span>
                <FcSalesPerformance className="text-black text-bold text-5xl" />
              </span>
            </div>

            {/* Right grid (wider) */}
            <div className="col-span-2">
              <div>
                {" "}
                <span className="text-gray-500 text-md text-xl">
                  Sales{" "}
                </span>{" "}
              </div>
              <span className="text-gray-950 text-md md:text-2xl">1000</span>{" "}
            </div>
          </button>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4 mb-4 h-full">
        <div class=" h-full rounded bg-gray-50  overflow-auto scrollbar-hidden dark:bg-gray-800">
          <TableProducts />
        </div>
        <div class=" h-full rounded bg-gray-50  overflow-auto scrollbar-hidden dark:bg-gray-800">
          <TableResents />
        </div>
      </div>
    </div>
  );
}
