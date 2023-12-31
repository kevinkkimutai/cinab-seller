import React, { useCallback, useEffect, useState } from "react";
import {
  useGetOrdersMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} from "../actions/OrderAction";
import { useDispatch, useSelector } from "react-redux";
import {
  selectOrders,
  setOrder,
  updateOrder as updateOrderAction,
} from "../reducers/OrderReducers";


export default function Orders() {
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [getOrders] = useGetOrdersMutation();
  const [updateOrder] = useUpdateOrderMutation();
  const [deleteOrder] = useDeleteOrderMutation();
  const [selectedImage, setSelectedImage] = useState(null);

  // Get Orders from the store
  const OrderData = useSelector(selectOrders);
  const dispatch = useDispatch();

  // FUNCTION TO FETCH DATA
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getOrders();
      console.log(res);
      if (!res.data) {
        console.log("Failed to get Orders");
      } else {
        // Dispatch the Orders to store them in the store.
        dispatch(setOrder(res.data));
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [dispatch, getOrders]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // update Order
  const handleUpdateOrder = async (e) => {
    e.preventDefault();
    try {
      if (selectedOrder) {
        const formData = new FormData();
  
        formData.append("id", selectedOrder.id);
        formData.append("pname", selectedOrder.pname);
        formData.append("stock", selectedOrder.stock);
        formData.append("price", selectedOrder.price || 0);
        formData.append("brand", selectedOrder.brand || "");
        formData.append("category", selectedOrder.category || "");
        formData.append("description", selectedOrder.description || "");
        formData.append("approval", selectedOrder.approval || "");
  
        // Handle the image based on its type
        if (selectedImage instanceof File) {
          formData.append("image", selectedImage);
        } else if (typeof selectedOrder.image === 'string') {
          // Assuming selectedOrder.image is a string representing the image path
          // If it's something else, adjust this part accordingly
          formData.append("image", selectedOrder.image);
        }
  
        const { data } = await updateOrder({
          id: selectedOrder.id,
          formData,
        });
  
        console.log('Order updated successfully:');
        console.log("Updated Order Data:", data);
  
        dispatch(updateOrderAction(data));
  
        setSelectedImage(null);
        document.getElementById("crud-modal").classList.add("hidden");
      }
    } catch (error) {
      console.error("Error updating Order:", error);
    }
  };
  
  

    // function to handle Order deletion
  const handleDeleteOrder = async (OrderId) => {
  try {
    // Call the deleteOrder mutation with the correct id parameter
    await deleteOrder(OrderId);

    // Fetch the latest Orders and update the Redux store
    fetchData();
  } catch (error) {
    console.error("Error deleting Order:", error);
  }
};

const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    setSelectedImage(file);

    // Log the selected image
    console.log("Selected Image:", file);

    // Update selectedOrder with the new image
    setSelectedOrder({
      ...selectedOrder,
      image: file,
    });
  } else {
    setSelectedImage(null); // Reset the state when no file is selected
  }
};



    const handleModalInputChange = (e) => {
      setSelectedOrder({
        ...selectedOrder,
        [e.target.name]: e.target.value,
      });
    };
    
  

  // Filter Orders based on search query
  const filteredOrders = OrderData.filter((Order) =>
    Order.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (OrderId) => {
    // Find the selected Order for editing
    const OrderToEdit = OrderData.find(
      (Order) => Order.id === OrderId
    );
    setSelectedOrder(OrderToEdit);

    // Open the modal
    document.getElementById("crud-modal").classList.remove("hidden");
  };
  return (
    <div>




    <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-5 justify-center">
    <div class="bg-blue h-10">
    <h1 class="font-bold text-xl ml-3 ">Your Current Orders</h1>

</div>
<table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">

<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
            
            <th scope="col" className="px-6 py-3">
                Product name
            </th>

            <th scope="col" className="px-6 py-3">
                Description
            </th>
           
            <th scope="col" className="px-6 py-3">
                Category
            </th>
            
            <th scope="col" className="px-6 py-3">
                In-Stock
            </th>
            <th scope="col" className="px-6 py-3">
                Price
            </th>
            <th scope="col" className="px-6 py-3">
                Units Bought
            </th>
            <th scope="col" className="px-6 py-3">
                Purchase Date
            </th>
            <th scope="col" className="px-6 py-3">
                Status
            </th>
            <th scope="col" className="px-6 py-3">
                Action
            </th>
        </tr>
    </thead>



{filteredOrders.map((order) => (
              <tr
                key={order.id} // Assuming your order objects have a unique id
                className="bg-primary-50 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {order.productName}
                </th>

                <td className="px-6 py-4">{order.description}</td>
                <td className="px-6 py-4">{order.category}</td>
                <td className="px-6 py-4">{order.inStock ? 'Yes' : 'No'}</td>
                <td className="px-6 py-4">{order.price}</td>
                <td className="px-6 py-4">{order.unitsBought}</td>
                <td className="px-6 py-4">{order.purchaseDate}</td>
                <td className="px-6 py-4">{order.status}</td>
                <td className="flex items-center px-6 py-4">
                  <a href="#"    onClick={() => handleEdit(order.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                    View
                  </a>
                
                </td>
              </tr>
            ))}
</table>
</div>

<div id="crud-modal" tabindex="-1" aria-hidden="true" className="hidden md:pt-12 md:ml-24 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
<div className="relative p-4 w-full max-w-2xl max-h-full">
    {/* <!-- Modal content --> */}
    <div className="relative bg-primary-50 rounded-lg shadow dark:bg-gray-700">
        {/* <!-- Modal header -->- */}
        <div className="flex items-center justify-between p-4 md:p-4 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-bold  text-gray-900 dark:text-white">
               Update Order
            </h3>
            <button type="button" className="text-red-600 bg-transparent hover:bg-red-200 hover:text-red-600 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-red-800" data-modal-toggle="crud-modal">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span className="sr-only">Close modal</span>
            </button>
        </div>
        {/* <!-- Modal body --> */}
        <form >
    <div className="grid gap-2 sm:grid-cols-2 sm:gap-6 p-4">
      <div className="sm:col-span-2">
        <label for="name" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Order Name</label>
        <input type="text" name="name" id="name" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 md:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Type Order name" required=""/>
      </div>
     
      <div>
        <label for="category" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Category</label>
        <select id="category" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option >Select category</option>
          <option value="TV">TV/Monitors</option>
          <option value="PC">PC</option>
          <option value="GA">Gaming/Console</option>
          <option value="PH">Phones</option>
        </select>
      </div>
      <div>
        <label for="category" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">In-Stock</label>
        <select id="category" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option >Select</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
          
        </select>
      </div>
      <div>
        <label for="item-stock" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Stock/Quantity</label>
        <input type="number" name="item-weight" id="item-weight" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="10" required=""/>
      </div>
      <div className="sm:col-span-1">
        <label for="description" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Description</label>
        <textarea id="description" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Your description here"></textarea>
      </div>
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white" for="multiple_files">Upload file(s)</label>
        <input
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          id="multiple_files"
          type="file"
          accept=".png, .jpg, .jpeg"
          multiple
        
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">PNG, JPG, or JPEG files (Max. 5MB each)</p>
      </div>
      {/* <!-- Display selected files --> */}
      <div v-if="selectedFiles.length > 0">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mt-4 mb-1">Selected Files:</h3>
        <ul>
          <li v-for="(file, index) in selectedFiles" >file</li>
        </ul>
      </div>
      <div className="mt-4 sm:mt- sm:col-span-2">
        <button
          type="submit"
          className="w-full inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
        >
          Update Order
        </button>
      </div>
    </div>
  </form>
    </div>
</div>
</div> 

</div>
  )
}
