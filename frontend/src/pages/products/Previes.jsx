import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  selectBrands,
  selectCategory,
  selectChildCategory,
  selectSubcategory,
  setBrands,
  setCategory,
  setChildCategory,
  setSubCategory,
} from "../../reducers/ProductReducers";
import { toast } from "react-toastify";
import {
  useCreateProductMutation,
  useGetBrandsMutation,
  useGetCategoryMutation,
} from "../../actions/ProductAction";
export default function UploadForm() {
  const [formData, setFormData] = useState({
    userId: 1,
    category_id: null,
    subcategory_id: null,
    childcategory_id: null,
    tax_id: 3,
    brand_id: null,
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
    file: null,
    link: "",
    image: null,
    gallery: [],
  });

  const [createProduct] = useCreateProductMutation();
  const [getCategory] = useGetCategoryMutation();
  const [getBrands] = useGetBrandsMutation();
  const dispatch = useDispatch();
  const categoryData = useSelector(selectCategory);
  const subCategory = useSelector(selectSubcategory);
  const brandsData = useSelector(selectBrands);
  const childCategories = useSelector(selectChildCategory);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const res = await getCategory();
      if (!res.data) {
        console.log("Failed to get Products");
      } else {
        dispatch(setCategory(res.data));
      }
    } catch (err) {
      console.error(err);
    }
  }, [getCategory, dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const fetchBrands = useCallback(async () => {
    try {
      const res = await getBrands();
      console.log(res);
      if (!res.data) {
        console.log("Failed to get Products");
      } else {
        dispatch(setBrands(res.data));
      }
    } catch (err) {
      console.error(err);
    }
  }, [getBrands, dispatch]);

  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);

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
        image: files[0], 
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
    setIsLoading(true);

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
    formDataToSend.append("file", formData.file);
    formDataToSend.append("link", formData.link);

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
    } finally {
      setIsLoading(false);
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
                      htmlFor="name"
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
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      value={formData.brand_id}
                      onChange={(e) => {
                        handleInputChange(e);
                      }}
                    >
                      <option value="">Select brand</option>
                      {brandsData.map((brand) => (
                        <option key={brand.id} value={brand.id}>
                          {brand.name}
                        </option>
                      ))}
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

        
              </div>
              {/* left section */}
              <div className="md:w-3/6">
                {/* price section */}
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
                    {/* Category dropdown */}
                    <select
                      id="category"
                      name="category_id"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      value={formData.category_id}
                      onChange={(e) => {
                        handleInputChange(e);
                        // Fetch subcategories based on the selected category
                        const selectedCategory = categoryData.find(
                          (category) => category.id === parseInt(e.target.value)
                        );
                        dispatch(
                          setSubCategory(
                            selectedCategory
                              ? selectedCategory.subcategories
                              : []
                          )
                        );
                        // Reset child categories
                        dispatch(setChildCategory([]));
                      }}
                    >
                      <option value="">Select category</option>
                      {categoryData.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-2">
                    <label
                      htmlFor="sub_category"
                      className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Select Product Sub-Category *
                    </label>
                    {/* Sub-category dropdown */}
                    <select
                      id="sub_category"
                      name="subcategory_id"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      value={formData.subcategory_id}
                      onChange={(e) => {
                        handleInputChange(e);
                        // Fetch child categories based on the selected sub-category
                        const selectedSubCategory = subCategory.find(
                          (subCategory) =>
                            subCategory.id === parseInt(e.target.value)
                        );
                        dispatch(
                          setChildCategory(
                            selectedSubCategory
                              ? selectedSubCategory.childcategories
                              : []
                          )
                        );
                      }}
                    >
                      <option value="">Select sub-category</option>
                      {subCategory.map((subCategory) => (
                        <option key={subCategory.id} value={subCategory.id}>
                          {subCategory.name}
                        </option>
                      ))}
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
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      value={formData.childcategory_id}
                      onChange={handleInputChange}
                    >
                      <option value="">Select child-category</option>
                      {childCategories.map((childCategory) => (
                        <option key={childCategory.id} value={childCategory.id}>
                          {childCategory.name}
                        </option>
                      ))}
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
                    {isLoading ? <div>Uploading..</div> : "Save"}
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
