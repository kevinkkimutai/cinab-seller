import React, { useCallback, useEffect, useState } from "react";
import {
  useGetProductsMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} from "../actions/ProductAction";
import { useDispatch, useSelector } from "react-redux";
import {
  selectProducts,
  setProduct,
  updateProduct as updateProductAction,
} from "../reducers/ProductReducers";


export default function Products() {
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [getProducts] = useGetProductsMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const [selectedImage, setSelectedImage] = useState(null);

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
        // Dispatch the Products to store them in the store
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

  // update product
  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      if (selectedProduct) {
        const formData = new FormData();
  
        formData.append("id", selectedProduct.id);
        formData.append("pname", selectedProduct.pname);
        formData.append("stock", selectedProduct.stock);
        formData.append("price", selectedProduct.price || 0);
        formData.append("brand", selectedProduct.brand || "");
        formData.append("category", selectedProduct.category || "");
        formData.append("description", selectedProduct.description || "");
        formData.append("approval", selectedProduct.approval || "");
  
        // Handle the image based on its type
        if (selectedImage instanceof File) {
          formData.append("image", selectedImage);
        } else if (typeof selectedProduct.image === 'string') {
          // Assuming selectedProduct.image is a string representing the image path
          // If it's something else, adjust this part accordingly
          formData.append("image", selectedProduct.image);
        }
  
        const { data } = await updateProduct({
          id: selectedProduct.id,
          formData,
        });
  
        console.log('Product updated successfully:');
        console.log("Updated Product Data:", data);
  
        dispatch(updateProductAction(data));
  
        setSelectedImage(null);
        document.getElementById("crud-modal").classList.add("hidden");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };
  
  

    // function to handle product deletion
  const handleDeleteProduct = async (productId) => {
  try {
    // Call the deleteProduct mutation with the correct id parameter
    await deleteProduct(productId);

    // Fetch the latest products and update the Redux store
    fetchData();
  } catch (error) {
    console.error("Error deleting product:", error);
  }
};

const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    setSelectedImage(file);

    // Log the selected image
    console.log("Selected Image:", file);

    // Update selectedProduct with the new image
    setSelectedProduct({
      ...selectedProduct,
      image: file,
    });
  } else {
    setSelectedImage(null); // Reset the state when no file is selected
  }
};



    const handleModalInputChange = (e) => {
      setSelectedProduct({
        ...selectedProduct,
        [e.target.name]: e.target.value,
      });
    };
    
  

  // Filter products based on search query
  const filteredProducts = productData.filter((product) =>
    product.pname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (productId) => {
    // Find the selected product for editing
    const productToEdit = productData.find(
      (product) => product.id === productId
    );
    setSelectedProduct(productToEdit);

    // Open the modal
    document.getElementById("crud-modal").classList.remove("hidden");
  };

 
  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5 justify-center">
        <div className="bg-purple h-10">
          <h1 className="font-bold text-xl ml-3 ">Stock Inventory</h1>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
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
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
          {filteredProducts.map((product) => (
              <tr
                key={product.id} // Assuming your product objects have a unique id
                className="bg-primary-50 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {product.pname}
                </th>
                <td className="px-6 py-4">{product.category}</td>
                <td className="px-6 py-4">{product.inStock ? 'Yes' : 'No'}</td>
                <td className="px-6 py-4">{product.stock}</td>
                <td className="flex items-center px-6 py-4">
                  <a href="#"    onClick={() => handleEdit(product.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                    Edit
                  </a>
                  <a href="#"     onClick={() => handleDeleteProduct(product.id)}   className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3">
                    Remove
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


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
                Update <span className="font-bold  text-green-600 dark:text-green-400 uppercase">{selectedProduct?.pname || ""}</span>
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
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* <!-- Modal body --> */}
            <form onSubmit={handleUpdateProduct}>
              <div className="grid gap-2 sm:grid-cols-2 sm:gap-6 p-4">
                 {/* <!-- Display selected files --> */}
                 {selectedImage ? (
  <img
    className="rounded-lg"
    src={URL.createObjectURL(selectedImage)}
    alt="Selected Img"
  />
) : selectedProduct?.image && typeof selectedProduct.image === 'string' ? (
  <img
    className="rounded-lg"
    src={`${selectedProduct.image.split(',')[0]}`}
    alt={selectedProduct.pname}
  />
) : selectedProduct?.image instanceof File ? (
  <img
    className="rounded-lg"
    src={URL.createObjectURL(selectedProduct.image)}
    alt={selectedProduct.pname}
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
                    htmlFor="pname"
                    className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="pname"
                    id="pname"
                    value={selectedProduct?.pname || ""}
                    onChange={handleModalInputChange}
                    className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 md:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Type product name"
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
                    value={selectedProduct?.brand || ""}
                    onChange={handleModalInputChange}
                    className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Product brand"
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
                    value={selectedProduct?.category || ""}
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
                    value={selectedProduct?.price || ""}
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
                    value={selectedProduct?.stock || ""}
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
                    value={selectedProduct?.description || ""}
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
                    Update Product
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