import React, { useState } from "react";
import { useCreateProductMutation } from "../../actions/ProductAction";
import { useDispatch } from "react-redux";
import { addProduct } from "../../reducers/ProductReducers";
import { toast } from "react-toastify";
export default function UploadForm() {
  const [formData, setFormData] = useState({
    userId: 1,
    category_id: 0,
    subcategory_id: 0,
    childcategory_id: 0,
    tax_id: 3,
    brand_id: 0,
    name: "",
    slug: "",
    sku: "",
    tags: "",
    video: null,
    sort_details: "",
    specification_description: [],
    is_specification: 0,
    details: "",
    photo: "",
    discount_price: 0,
    previous_price: 0,
    stock: 0,
    status: 0,
    is_type: "",
    file: null,
    link: "",
    file_type: "",
    item_type: "",
    thumbnail: "",
    image: null,
    gallery: [],
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
    if (e.target.name === "image") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        image: files[0], // assuming you only want to upload a single image
      }));
    } else if (e.target.name === "gallery") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        gallery: [...prevFormData.gallery, ...files],
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    formDataToSend.append("category_id", formData.category_id);
    formDataToSend.append("subcategory_id", formData.subcategory_id);
    formDataToSend.append("childcategory_id", formData.childcategory_id);
    formDataToSend.append("tax_id", formData.tax_id);
    formDataToSend.append("brand_id", formData.brand_id);
    formDataToSend.append("name", formData.name);
    formDataToSend.append("slug", formData.slug);
    formDataToSend.append("sku", formData.sku);
    formDataToSend.append("tags", formData.tags);
    formDataToSend.append("video", formData.video);
    formDataToSend.append("sort_details", formData.sort_details);

    formDataToSend.append(
      "specification_description",
      formData.specification_description
    );
    formDataToSend.append("is_specification", formData.is_specification);
    formDataToSend.append("details", formData.details);
    formDataToSend.append("discount_price", formData.discount_price);
    formDataToSend.append("previous_price", formData.previous_price);
    formDataToSend.append("stock", formData.stock);
    formDataToSend.append("status", formData.status);
    formDataToSend.append("is_type", formData.is_type);
    formDataToSend.append("file", formData.file);
    formDataToSend.append("link", formData.link);
    formDataToSend.append("file_type", formData.file_type);
    formDataToSend.append("item_type", formData.item_type);
    formDataToSend.append("thumbnail", formData.thumbnail);

    // Append each file separately to the FormData object
    // formData.photo.forEach((file, index) => {
    //   formDataToSend.append(`photo`, file);
    // });

    formDataToSend.append("image", formData.image);
    formData.gallery.forEach((file, index) => {
      formDataToSend.append("gallery", file);
    });

    console.log("formData before:", formData);

    try {
      const { data } = await createProduct(formDataToSend);
      if (data) {
        dispatch(addProduct(data));
        console.log("formData after:", formData);
        toast.success(`${formData.name} added to Products successfully`);
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
        <div className="relative  w-full  rounded-lg shadow-lg ">
          <div className="bg-gray-200 dark:bg-gray-500 rounded-t">
            <h2 className="mb-3 p-2 text-2xl font-bold text-gray-900 dark:text-white text-center ">
              Add Product
            </h2>
          </div>
          <div className="w-full">
            <form
              className="w-full flex gap-2"
              onSubmit={handleSubmit}
              encType="multipart/form-data"
            >
              <div className="gap-4 sm:gap-6 mb-2 md:w-4/6">
                <div className="bg-gray-200 dark:bg-gray-500 rounded-lg  p-1">
                  <div className="sm:col-span-2 mb-2">
                    <label
                      htmlFor="pname"
                      className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Product Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Type product name"
                      required
                    />
                  </div>
                  <div className="mb-2">
                    <label
                      htmlFor="brand"
                      className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Select Product Brand *
                    </label>
                    <select
                      id="brand"
                      name="brand_id"
                      value={formData.brand_id}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      required
                    >
                      <option value="">Select Brand</option>
                      <option value="TV/Monitors">TV/Monitors</option>
                      <option value="PC">PC</option>
                      <option value="Gaming/Console">Gaming/Console</option>
                      <option value="Phones">Phones</option>
                    </select>
                  </div>
                </div>

                {/* image section */}
                <div className="bg-gray-200 dark:bg-gray-500 rounded-lg mt-4 p-1">
                  <div>
                    <label
                      className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                      htmlFor="image"
                    >
                      Upload file(s)
                    </label>
                    <input
                      className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                      id="image"
                      type="file"
                      name="image"
                      onChange={handleFileChange}
                      accept=".png, .jpg, .jpeg"
                      //  multiple
                      // required
                    />

                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      PNG, JPG, or JPEG files (Max. 5MB each)
                    </p>
                  </div>
                </div>

                {/*gallery image section */}
                <div className="bg-gray-200 dark:bg-gray-500 rounded-lg mt-4 p-1">
                  <div>
                    <label
                      className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                      htmlFor="gallery"
                    >
                      Gallary{" "}
                    </label>
                    <input
                      className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                      id="gallery"
                      type="file"
                      name="gallery"
                      onChange={handleFileChange}
                      accept=".png, .jpg, .jpeg"
                      multiple
                      // required
                    />

                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      PNG, JPG, or JPEG files (Max. 5MB each)
                    </p>
                  </div>
                </div>

                {/* description section */}
                <div className="bg-gray-200 dark:bg-gray-500 rounded-lg mt-4 p-1">
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="short_description"
                      className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Short Description *
                    </label>
                    <textarea
                      id="short_description"
                      name="sort_details"
                      rows="5"
                      value={formData.sort_details}
                      onChange={handleInputChange}
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="A short description about the product"
                      required
                    ></textarea>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="detail_description"
                      className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Description *
                    </label>
                    <textarea
                      id="detail_description"
                      name="details"
                      rows="5"
                      value={formData.details}
                      onChange={handleInputChange}
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Your Product description here"
                      required
                    ></textarea>
                  </div>
                </div>

                {/* specifications section */}
                <div className="bg-gray-200 dark:bg-gray-500 rounded-lg mt-4 p-1">
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="spec_description"
                      className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Specification spec_Description *
                    </label>
                    <textarea
                      id="spec_description"
                      name="specification_description"
                      rows="5"
                      value={formData.specification_description}
                      onChange={handleInputChange}
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Your specification description here"
                      required
                    ></textarea>
                  </div>
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
              </div>
              {/* left section */}
              <div className="md:w-3/6">
                s{/* price section */}
                <div className="bg-gray-200 dark:bg-gray-500 rounded-lg p-1">
                  <div className="w-full">
                    <label
                      htmlFor="price"
                      className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Wholesale Price (Ksh) *
                    </label>
                    <input
                      type="number"
                      name="price"
                      id="price"
                      value={formData.wholesale_price}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="3000"
                      required
                    />
                  </div>
                  <div className="w-full mb-1">
                    <label
                      htmlFor="d_price"
                      className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Retail Price (Ksh) *
                    </label>
                    <input
                      type="number"
                      name="discount_price"
                      id="d_price"
                      value={formData.discount_price}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="3000"
                      required
                    />
                  </div>
                </div>
                {/* category secton */}
                <div className="bg-gray-200 dark:bg-gray-500 rounded-lg mt-5 p-1">
                  <div className="mb-2">
                    <label
                      htmlFor="category"
                      className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Select Product Category *
                    </label>
                    <select
                      id="category"
                      name="category_id"
                      value={formData.category_id}
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
                  <div className="mb-2">
                    <label
                      htmlFor="sub_category"
                      className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Select Product Sub-Category *
                    </label>
                    <select
                      id="sub_category"
                      name="subcategory_id"
                      value={formData.subcategory_id}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      required
                    >
                      <option value="">Select sub-category</option>
                      <option value="TV/Monitors">TV/Monitors</option>
                      <option value="PC">PC</option>
                      <option value="Gaming/Console">Gaming/Console</option>
                      <option value="Phones">Phones</option>
                    </select>
                  </div>
                  <div className="mb-2">
                    <label
                      htmlFor="child_category"
                      className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Select Product Child-Category *
                    </label>
                    <select
                      id="child_category"
                      name="childcategory_id"
                      value={formData.childcategory_id}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      required
                    >
                      <option value="">Select child-category</option>
                      <option value="TV/Monitors">TV/Monitors</option>
                      <option value="PC">PC</option>
                      <option value="Gaming/Console">Gaming/Console</option>
                      <option value="Phones">Phones</option>
                    </select>
                  </div>
                </div>
                {/* stock section */}
                <div className="bg-gray-200 dark:bg-gray-500 rounded-lg mt-5 p-1">
                  <div className="w-full">
                    <label
                      htmlFor="s_price"
                      className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Stock *
                    </label>
                    <input
                      type="number"
                      name="stock"
                      id="s_price"
                      value={formData.stock}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="3000"
                      required
                    />
                  </div>

                  <div className="w-full mt-2 mb-1">
                    <label
                      htmlFor="video"
                      className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Video Link
                    </label>
                    <input
                      type="text"
                      name="video"
                      id="video"
                      value={formData.video}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="3000"
                    />
                  </div>
                </div>
                {/* submit buttons */}
                <div className="bg-gray-200 dark:bg-gray-500 rounded-t grid grid-cols-2 gap-4 p-1 mt-3">
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                  >
                    Save
                  </button>
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                  >
                    Save&Edit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
