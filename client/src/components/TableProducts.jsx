import React, { useCallback, useEffect, useState } from "react";
import { useGetProductsMutation } from "../actions/ProductAction";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts, setProduct } from "../reducers/ProductReducers";

export default function Products() {
  const [loading, setLoading] = useState(false);
  const [getProducts] = useGetProductsMutation();

  // Get Products from the store
  const productData = useSelector(selectProducts);
  const dispatch = useDispatch();

  // FUNCTION TO FETCH DATA
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getProducts();
      if (res.data) {
        // Dispatch the Products to store them in the store.
        dispatch(setProduct(res.data));
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  }, [dispatch, getProducts]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <caption className="pl-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-primary-50 dark:text-white dark:bg-gray-800">
            Recently Added Products
          </caption>
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">#</div>
              </th>
              <th scope="col" className="px-6 py-3">
                Product name
              </th>

              <th scope="col" className="px-6 py-3">
                Units-left
              </th>
              <th scope="col" className="px-6 py-3">
                Retail Price{" "}
              </th>
              <th scope="col" className="px-6 py-3">
                Status{" "}
              </th>
            </tr>
          </thead>
          <tbody>
            {productData.slice(-8).map((product) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                key={product.id}
              >
                <td className="w-4 p-4">
                  <div className="flex items-center">{product.index}.</div>
                </td>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {product.name.slice(0, 10)}
                </th>
                <td className="px-6 py-4">{product.stock}</td>
                <td className="px-6 py-4">{product.retail_price}</td>
                <td className="px-6 py-4">
                  {product.staus !== 0 ? "Unpublish" : "Published"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
