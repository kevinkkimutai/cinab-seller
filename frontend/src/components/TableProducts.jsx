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
      console.log(res);
      if (!res.data) {
        console.log("Failed to get Products");
      } else {
        // Dispatch the Products to store them in the store.
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

  return (
    <div>
      <div className="relative  shadow-md sm:rounded-lg bg-black">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-primary-50 dark:text-white dark:bg-gray-800">
            Recently Added Products
          </caption>
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Product name
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                In-Stock
              </th>
              <th scope="col" className="px-6 py-3">
                Units Left
              </th>
            </tr>
          </thead>
          <tbody>
            {productData.map((product) => (
              <tr
                key={product.id} // Assuming your product objects have a unique id
                className="bg-primary-50 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {product.pname}
                </th>
                <td className="px-6 py-4">{product.category}</td>
                <td className="px-6 py-4">{product.inStock ? "Yes" : "No"}</td>
                <td className="px-6 py-4">{product.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
