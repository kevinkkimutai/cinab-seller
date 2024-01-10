import React, { useState } from "react";
import { useCreateProductMutation } from "../../actions/ProductAction";
import { useDispatch } from "react-redux";
import { addProduct } from "../../reducers/ProductReducers";
import { toast } from "react-toastify";
export default function UploadForm() {
  const [formData, setFormData] = useState({
    userId: 1,
    pname: "",
    brand: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    image: [],
    approval: false,
  });

  const [createProduct] = useCreateProductMutation();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleFileChange = (e) => {
    const files = e.target.files;
    setFormData((prevFormData) => ({
      ...prevFormData,
      image: [...files], // Use spread operator to create a new array
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("userId", formData.userId);
    formDataToSend.append("pname", formData.pname);
    formDataToSend.append("brand", formData.brand);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("stock", formData.stock);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("approval", formData.approval);

    // Append each file separately to the FormData object
    formData.image.forEach((file, index) => {
      formDataToSend.append(`image`, file);
    });

    console.log("formData before:", formData);

    try {
      const { data } = await createProduct(formDataToSend);
      if (data) {
        dispatch(addProduct(data));
        console.log("formData after:", formData);
        toast.success(`${formData.pname} added to Products successfully`);
      } else {
        toast.error("Failed to create product");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to create product");
    }
  };

  return (
    <section className="bg-gray-100 dark:bg-gray-900 w-full h-full max-h-full overflow-y-auto">
      <div className="flex flex-col w-full  justify-center aligns-center items-center">
        <div className="relative md:max-w-2xl w-full border  rounded-lg shadow-lg ">
          <div className="bg-gray-200 dark:bg-gray-500 rounded-t">
            <h2 className="mb-3 p-2 text-2xl font-bold text-gray-900 dark:text-white text-center ">
              Add a new product
            </h2>
          </div>
          <form
            className="mx-2"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 mb-2">
              <div className="sm:col-span-2">
                <label
                  htmlFor="name"
                  className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Product Name
                </label>
                <input
                  type="text"
                  name="pname"
                  id="pname"
                  value={formData.pname}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type product name"
                  required
                />
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
                  value={formData.brand}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Product brand"
                  required
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
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required
                >
                  <option value="">Select category</option>
                  <option value="TV/Monitors">TV/Monitors</option>
                  <option value="PC">PC</option>
                  <option value="Gaming/Console">Gaming/Console</option>
                  <option value="Phones">Phones</option>
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
                  id="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="3000"
                  required
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
                  value={formData.stock}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="10"
                  required
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
                  id="description"
                  name="description"
                  rows="5"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Your description here"
                  required
                ></textarea>
              </div>
              <div>
                <label
                  className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="image"
                >
                  Upload file(s)
                </label>
                <input
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  id="multiple_files"
                  type="file"
                  name="image"
                  onChange={handleFileChange}
                  accept=".png, .jpg, .jpeg"
                  multiple
                  required
                />

                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  PNG, JPG, or JPEG files (Max. 5MB each)
                </p>
              </div>

              {/* <!-- Display selected files --> */}
              {/* {formData.image && (
  <div>
    <h3 className="text-lg font-medium text-gray-900 dark:text-white mt-4 mb-2">Selected Files:</h3>
    <ul>
      {formData.image.map((file, index) => (
        <li key={index}>{file.name}</li>
      ))}
    </ul>
  </div>
)} */}

              <div className="mt-4 sm:mt-6">
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                >
                  Add product
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
