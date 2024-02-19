import React, { useState } from "react";


export default function TableResents({ordersd}) {
  const [loading, setLoading] = useState(false);


  return (
    <div className="">
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <caption className="pl-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-primary-50 dark:text-white dark:bg-gray-800">
          Recent Sales
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
                Quantity
                </th>
                <th scope="col" class="px-6 py-3">
                  price
                </th>
            </tr>
        </thead>
        <tbody>
    
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" 
            key={ordersd.id}
            >
                <td class="w-4 p-4">
                    <div class="flex items-center">
                   
                    </div>
                </td>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {ordersd.name}
                </th>
                <td class="px-6 py-4">
                {ordersd.qty}
                </td>
                <td class="px-6 py-4">
                {ordersd.Price}
                </td>
            </tr>
   
        </tbody>
    </table>
</div>

    </div>
  );
}