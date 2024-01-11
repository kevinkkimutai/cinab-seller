import React, { useCallback, useEffect, useState } from "react";
import {
 useGetProductsMutation,
 useUpdateProductMutation,
 useDeleteProductMutation,
} from "../../actions/ProductAction";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts, setProduct } from "../../reducers/ProductReducers";
import { toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";
import { Button, Spinner } from "flowbite-react";

export default function Products() {
 const [loading, setLoading] = useState(false);
 const [isUpdating, setIsUpdating] = useState(false);
 const [searchQuery, setSearchQuery] = useState("");
 const [selectedProduct, setSelectedProduct] = useState(null);
 const [getProducts] = useGetProductsMutation();
 const [updateProduct] = useUpdateProductMutation();
 const [deleteProduct] = useDeleteProductMutation();
 const [selectedImage, setSelectedImage] = useState(null);
 const [isDeleting, setIsDeleting] = useState(false);

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
 setIsUpdating(true);
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
 } else if (typeof selectedProduct.image === "string") {
 // Assuming selectedProduct.image is a string representing the image path
 // If it's something else, adjust this part accordingly
 formData.append("image", selectedProduct.image);
 }

 const res = await updateProduct({
 id: selectedProduct.id,
 formData,
 });
 console.log(res);
 if (res.data) {
 // dispatch(updateProduct(res.data));
 fetchData();
 setSelectedImage(null);
 document.getElementById("crud-modal").classList.add("hidden");
 toast.success(`${res.data.pname} updated successfully`);
 } else {
 toast.error("Failed to update product");
 }
 }
 } catch (error) {
 console.error("Error updating product:", error);
 } finally {
 setIsUpdating(false);
 }
 };

 // function to handle product deletion
 const handleDeleteProduct = async (productId) => {
 setIsDeleting(true);
 try {
 // Call the deleteProduct mutation with the correct id parameter
 const { data } = await deleteProduct(productId);
 if (data) {
 toast.success(`Product deleted successfully`);
 } else {
 toast.error("Failed to update product");
 }
 // Fetch the latest products and update the Redux store
 fetchData();
 } catch (error) {
 console.error("Error deleting product:", error);
 } finally {
 setIsDeleting(false);
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

 const handleDelete = (productId) => {
 // Find the selected product for editing
 const productToDelete = productData.find(
 (product) => product.id === productId
 );
 setSelectedProduct(productToDelete);

 // Open the modal
 document.getElementById("popup-modal").classList.remove("hidden");
 };

 return (
 <div className="h-full ">
 <h1 className="dark:text-gray-50 text-gray-800 md:text-4xl font-serif">
 List of all products
 </h1>{" "}
 <div class="px-2 border-2 border-gray-200 bg-primary-50 dark:bg-slate-700 rounded-lg dark:border-gray-700 h-full max-h-full">
 <div className="flex justify-end m-4">
 <form className="flex items-center">
 <label htmlFor="simple-search" className="sr-only">
 Search
 </label>
 <div className="relative mb- mt-">
 <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
 <svg
 className="w-4 h-4 text-gray-500 dark:text-gray-400"
 aria-hidden="true"
 xmlns="http://www.w3.org/2000/svg"
 fill="none"
 viewBox="0 0 18 20"
 >
 <path
 stroke="currentColor"
 strokeLinecap="round"
 strokeLinejoin="round"
 strokeWidth="2"
 d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0-4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"
 />
 </svg>
 </div>
 <input
 type="text"
 id="simple-search"
 value={searchQuery}
 onChange={(e) => setSearchQuery(e.target.value)}
 className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
 placeholder="Search..."
 required
 />
 </div>
 </form>
 </div>
 <div class="h-full max-h-full overflow-auto scrollbar-hidden">
 {loading ? ( // Render spinner while loading
 <div className="flex justify-center items-center h-[80%]">
 <div className="loader">
 <ThreeDots className="bg-red-500" />
 </div>
 </div>
 ) : (
 <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-4 ">
 {filteredProducts.map((product) => (
 <div
 key={product.id}
 className="max-w-sm h-64 transition duration-300 ease-in-out mt-4 transform hover:scale-105 bg-gray-50 border border-gray-400 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 overflow-hidden"
 >
 {product.image ? ( // Check if product has an image
 <a href="/">
 <img
 className="w-full h-32 object-cover border-b-2 bg-white rounded-t-lg"
 src={product.image}
 alt=""
 />
 </a>
 ) : (
 // Show loading spinner when image is not available
 <div className="loader w-full h-32 object-cover flex justify-center items-center border-b-2 bg-white rounded-t-lg">
 <ThreeDots className="bg-red-500" />
 </div>
 )}
 <div class=" h-32 overflow-hidden">
 <a href="/">
 <h5 class="mb-2 text-sm md:text-xl font-bold tracking-tight text-gray-900 dark:text-white">
 {product.pname}(
 <span className="text-md font-light">
 {product.category}
 </span>
 )
 </h5>
 </a>
 <div className="w-full justify-center items-center">
 <span className="text-sm text-black dark:text-white ms-1 font-semibold">
 <span>Ksh:</span> {product.price}
 </span>
 </div>
 <div className="w-full flex justify-center ">
 <span className="text-sm font-medium border-b-4 border-gray-500 border-rounded-lg ">
 {product.stock} remaining
 </span>
 </div>

 <div className="grid justify-center grid-cols-2 gap-2 mx-2 md:mx-0 pt-2 md:pt-1">
 <button
 onClick={() => handleEdit(product.id)}
 className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-3 py-1 text-xs text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
 >
 Edit
 </button>
 <button
 onClick={() => handleDelete(product.id)}
 className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg px- py-1 text-xs text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
 >
 Delete
 </button>
 </div>

 {/* start delete modal */}
 <div
 id="popup-modal"
 tabindex="-1"
 class="hidden justify-center bg-gray-900/80 h-full flex mx-auto overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
 >
 <div class="relative p-4 w-full max-w-lg max-h-full">
 <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 ">
 <button
 type="button"
 onClick={() =>
 document
 .getElementById("popup-modal")
 .classList.add("hidden")
 }
 class="absolute top-3 end-2.5 text-gray-800 bg-red-200 dark:bg-red-400 hover:bg-red-300 hover:text-red-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-red-600 dark:hover:text-white"
 >
 <svg
 class="w-3 h-3"
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
 <span class="sr-only">Close modal</span>
 </button>
 <div class="p-4 md:p-5 text-center">
 <svg
 class="mx-auto mb-4 text-red-700 w-12 h-12 dark:text-red-400"
 aria-hidden="true"
 xmlns="http://www.w3.org/2000/svg"
 fill="none"
 viewBox="0 0 20 20"
 >
 <path
 stroke="currentColor"
 stroke-linecap="round"
 stroke-linejoin="round"
 stroke-width="2"
 d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
 />
 </svg>
 <h3 class="mb-5 text-lg font-normal text-gray-700 dark:text-gray-400">
 Are you sure you want to delete{" "}
 <span className="underline text-red-700 dark:text-red-500 font-bold uppercase">
 {" "}
 {selectedProduct?.pname || ""}
 </span>{" "}
 ?
 </h3>
 
 <Button
 type="button"
 onClick={() => handleDeleteProduct(product.id)}
 class="text-white bg-red-600 py-1 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-3 text-center me-2"
 >
 {isDeleting ? (
 <div className="flex flex-row gap-3">
 <Spinner
 aria-label="Spinner button example"
 size="sm"
 />
 <span className="pl-3">Deleting...</span>
 </div>
 ) : (
 "Yes!"
 )}
 </Button>
 <button
 onClick={() =>
 document
 .getElementById("popup-modal")
 .classList.add("hidden")
 }
 type="button"
 class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
 >
 No?
 </button>
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>
 ))}
 </div>
 )}
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
 <h3 className="text-lg font-bold text-gray-900 dark:text-white">
 Update{" "}
 <span className="font-bold text-green-600 dark:text-green-400 uppercase">
 {selectedProduct?.pname || ""}
 </span>
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
 ) : selectedProduct?.image &&
 typeof selectedProduct.image === "string" ? (
 <img
 className="rounded-lg"
 src={selectedProduct.image}
 alt={selectedProduct.pname}
 />
 ) : selectedProduct?.image instanceof File ? (
 <img
 className="rounded-lg"
 src={URL.createObjectURL(selectedProduct.image)}
 alt={selectedProduct.pname}
 />
 ) : (
 selectProducts.image
 )}

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
 <Button type="submit">
 {isUpdating ? (
 <div className="flex flex-row gap-3">
 <Spinner
 aria-label="Spinner button example"
 size="sm"
 />
 <span className="pl-3">updating...</span>
 </div>
 ) : (
 " Update Product"
 )}
 </Button>
 </div>
 </div>
 </form>
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>
 );
}
