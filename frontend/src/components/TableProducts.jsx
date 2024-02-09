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
    <div className="">
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <caption className="pl-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-primary-50 dark:text-white dark:bg-gray-800">
          Recently Added Products
        </caption>
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="p-4">
                    <div class="flex items-center">
                      #
                    </div>
                </th>
                <th scope="col" class="px-6 py-3">
                    Product name
                </th>
                <th scope="col" class="px-6 py-3">
                In-Stock
                </th>
                <th scope="col" class="px-6 py-3">
                   Units-left
                </th>
            </tr>
        </thead>
        <tbody>
        {productData.slice(-8).map((product) => (
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" 
            key={product.id}
            >
                <td class="w-4 p-4">
                    <div class="flex items-center">
                     {product.index}.
                    </div>
                </td>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {product.name.slice(0, 10)}
                </th>
                <td class="px-6 py-4">
                {product.inStock ? "Yes" : "No"}
                </td>
                <td class="px-6 py-4">
                {product.stock}
                </td>
            </tr>
       ))}
        </tbody>
    </table>
</div>

    </div>
  );
}