import React, { useCallback, useEffect, useState } from "react";
import { TableProducts, TableResents } from "../components";
import { useNavigate } from "react-router-dom";
import { BiSolidOffer } from "react-icons/bi";
import { FcSalesPerformance } from "react-icons/fc";
import { FaCartShopping } from "react-icons/fa6";
import { BiStoreAlt } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux"; // Import useSelector and useDispatch
import {
  setProduct,
  selectProducts,

} from "../reducers/ProductReducers";
import {
  setOrder,
  selectOrders,

} from "../reducers/OrderReducers";
import {
  useGetProductsMutation,

} from "../actions/ProductAction";
import {
  useGetOrdersMutation,

} from "../actions/OrderAction";


export default function Dashboard() {
  const dispatch = useDispatch(); // Get the dispatch function
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [getProducts] = useGetProductsMutation();
  const [stockSum, setStockSum] = useState(0);
  // Replace with your actual Redux selector
  const products =  useSelector(selectProducts);
  const fetchData = useCallback(async () => {
    setLoading(true);
    let res = null; // Declare res outside of the try block
    try {
      res = await getProducts();
      if (!res.data) {
        console.log("Failed to get Products");
      } else {
        dispatch(setProduct(res.data));
         
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [dispatch, getProducts]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // orders
   const [getOrders] = useGetOrdersMutation();
  const orders =  useSelector(selectOrders);
  const fetchOrders = useCallback(async () => {
    setLoading(true);
    let res = null; // Declare res outside of the try block
    try {
      res = await getOrders();
      if (!res.data) {
        console.log("Failed to get Orders");
      } else {
        dispatch(setOrder(res.data));
         
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [dispatch, getOrders]);
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);


  const ordersd =  useSelector(selectOrders);
  const fetchOrdersd = useCallback(async () => {
    setLoading(true);
    let res = null; // Declare res outside of the try block
    try {
      res = await getOrders();
      if (!res.data) {
        console.log("Failed to get Orders");
      } else {
        // Filter orders based on the "delivered" status
        const deliveredOrders = res.data.filter(order => order.status === 'delivered');
        dispatch(setOrder(deliveredOrders));
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [dispatch, getOrders]); 

  useEffect(() => {
    fetchOrdersd();
  }, [fetchOrdersd]);


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
              <span className="text-gray-950 text-md md:text-2xl">{products.length}</span>{" "}
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
              <span className="text-gray-950 text-md md:text-2xl">0</span>{" "}
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
              <span className="text-gray-950 text-md md:text-2xl">{orders.length}</span>{" "}
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
              <span className="text-gray-950 text-md md:text-2xl">{ordersd.length}</span>{" "}
            </div>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 full">
        <div className=" h-fu rounded ">
          <TableProducts />
        </div>

      </div>
    </div>
  );
}