import React from "react";
import { TableProducts, TableResents } from "../components";
import { useNavigate } from "react-router-dom";
import { BiSolidOffer } from "react-icons/bi";
import { FcSalesPerformance } from "react-icons/fc";
import { FaCartShopping } from "react-icons/fa6";
import { BiStoreAlt } from "react-icons/bi";


export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="p-4 border-2 border-gray-200 rounded-lg dark:border-gray-700 h-full overflow-auto scrollbar-hidden">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="flex items-center justify-center h-24 hover:bg-white rounded bg-gray-50 dark:bg-gray-800">
          <button
            type="button"
            onClick={() => {
              navigate("/dashboard/inventory");
            }}
            className="h-full w-full rounded-lg grid grid-cols-3 gap-1 md:gap-4 items-center"
          >
            {/* Left grid (narrower) */}
            <div className="col-span-1 bg-pink-100 h-14 w-14 flex rounded-full items-center justify-center p-4 md:p-10 md:ml-10">
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
              <span className="text-gray-950 text-md md:text-2xl">1000</span>{" "}
            </div>
          </button>
        </div>

        <div className="flex items-center justify-center h-24 hover:bg-white rounded bg-gray-50 dark:bg-gray-800">
          <button
            type="button"
            onClick={() => {
              navigate("/dashboard/offers");
            }}
            className="h-full w-full rounded-lg grid grid-cols-3 gap-1 md:gap-4 items-center"
          >
            {/* Left grid (narrower) */}
            <div className="col-span-1 bg-yellow-100 h-14 w-14 flex rounded-full items-center justify-center p-4 md:p-10 md:ml-10">
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
              <span className="text-gray-950 text-md md:text-2xl">1000</span>{" "}
            </div>
          </button>
        </div>

        <div className="flex items-center justify-center h-24 hover:bg-white rounded bg-gray-50 dark:bg-gray-800">
          <button
            type="button"
            onClick={() => {
              navigate("/dashboard/orders");
            }}
            className="h-full w-full rounded-lg grid grid-cols-3 gap-1 md:gap-4 items-center"
          >
            {/* Left grid (narrower) */}
            <div className="col-span-1 bg-purple-100 h-14 w-14 flex rounded-full items-center justify-center p-4 md:p-10 md:ml-10">
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
              <span className="text-gray-950 text-md md:text-2xl">1000</span>{" "}
            </div>
          </button>
        </div>

        <div className="flex items-center justify-center h-24 hover:bg-white rounded bg-gray-50 dark:bg-gray-800">
          <button
            type="button"
            onClick={() => {
              navigate("/dashboard/sales");
            }}
            className="h-full w-full rounded-lg grid grid-cols-3 gap-1 md:gap-4 items-center"
          >
            {/* Left grid (narrower) */}
            <div className="col-span-1 bg-pink-100 h-14 w-14 flex rounded-full items-center justify-center p-4 md:p-10 md:ml-10">
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

      <div className="grid grid-cols-2 gap-4 mb-4 h-full">
        <div className=" h-full rounded bg-gray-50  overflow-auto scrollbar-hidden dark:bg-gray-800">
          <TableProducts />
        </div>
        <div className=" h-full rounded bg-gray-50  overflow-auto scrollbar-hidden dark:bg-gray-800">
          <TableResents />
        </div>
      </div>
    </div>
  );
}
