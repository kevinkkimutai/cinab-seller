import React, { useCallback, useEffect, useState } from "react";
import { ReusableTable } from "../../components";
import {
  useGetOrdersMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} from "../../actions/OrderAction";
import { useDispatch, useSelector } from "react-redux";
import {
  selectOrders,
  setOrder,
  updateOrder as updateOrderAction,
} from "../../reducers/OrderReducers";
import { Spinner } from "react-bootstrap";


export default function Orders() {
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [getOrders] = useGetOrdersMutation();
  const [updateOrder] = useUpdateOrderMutation();
  const [deleteOrder] = useDeleteOrderMutation();
  const [selectedImage, setSelectedImage] = useState(null);

  // Get Orders from the store
  const orderData = useSelector(selectOrders);
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
    setLoading(true)
    try {
      if (selectedOrder) {
        const formData = new FormData();

        formData.append("id", selectedOrder.id);
        formData.append("name", selectedOrder.productName);
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
    } finally {
      setLoading(false)
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
  const filteredOrders = orderData.filter((order) =>
    order.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (row) => {
    console.log(row.id);
    setSelectedOrder(row)
    // // Find the selected Order for editing
    // const OrderToEdit = row.find(
    //   (Order) => Order.id === OrderId
    // );
    // setSelectedOrder(OrderToEdit);

    // // Open the modal
    document.getElementById("crud-modal").classList.remove("hidden");
  };

  const handleDeleteClick = async (rowIndex, id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete products?"
    );
    if (confirmDelete) {
      const orderId = rowIndex.id; // Renamed to avoid naming conflicts
      try {
        await deleteOrder(orderId);

        // dispatch(deleteproduct(res.data));
        fetchData();
      } catch (error) {
        console.error(error);
      }
    }
  };
  const heading = (

    <div className="bg-blue h-10">
      <h1 className="font-bold text-xl ml-3 ">Your Orders</h1>
    </div>

  )

  return (
    <>



      <ReusableTable

        columns={[
          "id",
          "productName",
          "stock",
          "price",
          "brand",
          "category",
          "description",

        ]}
        data={orderData}
        header={heading}
        itemsPerPage={10}
        isLoading={loading}
        actions={[
          {
            label: "Edit",
            onClick: handleEdit,
          },
          {
            label: "Delete",
            onClick: handleDeleteClick
            ,
          },

        ]}
        // isError={errMsg}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
        columnMapping={{
          id: "ID",
          name: "Company Name",
          status: "Status",
          Image: "Company Logo",
          email: "Company Email",
          KRA: "KRA Pin",
          contact: "Phone No.",
          location: "Address",
        }}
      />

      {/* <!-- Main modal --> */}
      <div
        id="crud-modal"
        tabIndex="-1"
        aria-hidden="true"
        className="hidden md:pt-12 justify-center flex mx-auto overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          {/* <!-- Modal content --> */}
          <div className="relative bg-primary-50 rounded-lg shadow dark:bg-gray-700">
            {/* <!-- Modal header --> */}
            <div className="flex items-center justify-between p-4 md:p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-bold  text-gray-900 dark:text-white">
                Update <span className="font-bold  text-green-600 dark:text-green-400 uppercase">{selectedOrder?.name || ""}</span>
              </h3>
              <button
                type="button"
                className="text-red-600 bg-transparent hover:bg-red-200 hover:text-red-600 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-red-800"
                onClick={() =>
                  document.getElementById("crud-modal").classList.add("hidden")
                }
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* <!-- Modal body --> */}
            <form onSubmit={handleUpdateOrder}>
              <div className="grid gap-2 sm:grid-cols-2 sm:gap-6 p-4">
                {/* <!-- Display selected files --> */}
                {selectedImage ? (
                  <img
                    className="rounded-lg"
                    src={URL.createObjectURL(selectedImage)}
                    alt="Selected Img"
                  />
                ) : selectedOrder?.image && typeof selectedOrder.image === 'string' ? (
                  <img
                    className="rounded-lg"
                    src={selectedOrder.image}
                    alt={selectedOrder.name}
                  />
                ) : selectedOrder?.image instanceof File ? (
                  <img
                    className="rounded-lg"
                    src={URL.createObjectURL(selectedOrder.image)}
                    alt={selectedOrder.name}
                  />
                ) : null}

                <div className="md:pt-5">
                  <label
                    className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                    htmlFor="multiple_files"
                  >
                    Upload image(s)
                  </label>
                  <input
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    id="multiple_files"
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    multiple
                    onChange={handleImageChange}
                  />

                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    PNG, JPG, or JPEG files (Max. 5MB each)
                  </p>
                  <div className="md:pt-6">
                    <label
                      htmlFor="name"
                      className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Order Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={selectedOrder?.name || ""}
                      onChange={handleModalInputChange}
                      className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 md:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Type Order name"
                      required=""
                    />
                  </div>
                </div>



                <div className="w-full">
                  <label
                    htmlFor="brand"
                    className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Brand
                  </label>
                  <input
                    type="text"
                    name="brand"
                    id="brand"
                    value={selectedOrder?.brand || ""}
                    onChange={handleModalInputChange}
                    className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Order brand"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="category"
                    className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    value={selectedOrder?.category || ""}
                    onChange={(e) => handleModalInputChange(e)}
                    className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option>Select category</option>
                    <option value="TV">TV/Monitors</option>
                    <option value="PC">PC</option>
                    <option value="GA">Gaming/Console</option>
                    <option value="PH">Phones</option>
                  </select>
                </div>
                <div className="w-full">
                  <label
                    htmlFor="price"
                    className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Price (Ksh)
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={selectedOrder?.price || ""}
                    onChange={handleModalInputChange}
                    id="price"
                    className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="3000"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="stock"
                    className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Stock/Quantity
                  </label>
                  <input
                    type="number"
                    name="stock"
                    id="stock"
                    value={selectedOrder?.stock || ""}
                    onChange={handleModalInputChange}
                    className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="10"
                    required=""
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="description"
                    className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Description
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    rows="4"
                    value={selectedOrder?.description || ""}
                    onChange={handleModalInputChange}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Your description here"
                  ></textarea>
                </div>


                <div className="mt- sm:mt- sm:col-span-2">
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                  >
                    {loading ? (<div role="status">

                      <span className="">updating...</span>
                    </div>) : (

                      "Update Order"

                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
