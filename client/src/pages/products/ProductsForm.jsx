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
import imageCompression from "browser-image-compression";

import {
  useCreateProductMutation,
  useGetBrandsMutation,
  useGetCategoryMutation,
} from "../../actions/ProductAction";
import ReusablePath from "../../components/ReusablePath";
export default function ProductsForm() {
  const [formData, setFormData] = useState({
    userId: 1,
    category_id: 0,
    subcategory_id: 0,
    childcategory_id: 0,
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
    retail_price: "",
    wholesale_price: "",
    stock: "",
    status: 0,
    file: null,
    link: "",
    image: null,
    gallery: [],
  });
  console.log(formData);

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
      if (res.data) {

        dispatch(setCategory(res.data));
      }
    } catch (err) {
    }
  }, [getCategory, dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const fetchBrands = useCallback(async () => {
    try {
      const res = await getBrands();
      if (!res.data) {
 
        dispatch(setBrands(res.data));
      }
    } catch (err) {
    }
  }, [getBrands, dispatch]);

  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileChange = async (e) => {
    const files = e.target.files;
    if (e.target.name === "image" && files.length > 0) {
      const compressedImage = await compressImage(files[0]);
      setFormData((prevFormData) => ({
        ...prevFormData,
        image: compressedImage,
        gallery: prevFormData.gallery,
      }));
    } else if (e.target.name === "gallery" && files.length > 0) {
      const compressedGallery = await Promise.all(
        Array.from(files).map((file) => compressGalleries(file))
      );
      setFormData((prevFormData) => ({
        ...prevFormData,
        gallery: [...prevFormData.gallery, ...compressedGallery],
        image: prevFormData.image, 
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
    formDataToSend.append("retail_price", formData.retail_price);
    formDataToSend.append("wholesale_price", formData.wholesale_price);
    formDataToSend.append("stock", formData.stock);
    formDataToSend.append("status", formData.status);
    formDataToSend.append("file", formData.file);
    formDataToSend.append("link", formData.link);

    formDataToSend.append("image", formData.image);
    formData.gallery.forEach((file, index) => {
      formDataToSend.append("gallery", file);
    });
    try {
      const { data } = await createProduct(formDataToSend);
      if (data) {
        dispatch(addProduct(data));
  
        toast.success(`Products added successfully`);
        setFormData({
          userId: 1,
          category_id: 0,
          subcategory_id: 0,
          childcategory_id: 0,
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
          retail_price: "",
          wholesale_price: "",
          stock: "",
          status: 0,
          file: null,
          link: "",
          image: null,
          gallery: [],
        });
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

  const compressImage = async (file) => {
    const options = {
      maxSizeMB: 0.1, // Set the maximum file size to 10KB
      maxWidthOrHeight: 230,
      useWebWorker: true,
      quality: 0.8,
    };

    try {
      const compressedBlob = await imageCompression(file, options);

      // Create a File object with the same data, name, and type
      const compressedFile = new File([compressedBlob], file.name, {
        type: compressedBlob.type,
      });

      return compressedFile;
    } catch (error) {
      console.error("Error compressing image:", error);
      return file; // Return the original file if compression fails
    }
  };

  const compressGalleries = async (file) => {
    const options = {
      maxSizeMB: 0.1, // Set the maximumy file size to 10KB
      maxWidthOrHeight: 400,
      useWebWorker: true,
      quality: 0.8,
    };

    try {
      const compressedBlob = await imageCompression(file, options);

      // Create a File object with the same data, name, and type
      const compressedFile = new File([compressedBlob], file.name, {
        type: compressedBlob.type,
      });

      return compressedFile;
    } catch (error) {
      console.error("Error compressing image:", error);
      return file; // Return the original file if compression fails
    }
  };

  return (
    <>
      <ReusablePath header="Add Products" />

      <div className="w-full h-full max-h-full bg-primary-50 dark:bg-gray-800 overflow-auto scrollbar-hidden shadow-lg rounded-lg">
        <form
          className=""
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div className="grid grid-cols-1 p-4 md:grid-cols-3 gap-4 ">
            <div className="">
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

            <div className="">
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

            <div className="">
              <label
                htmlFor="s_price"
                className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
              >
                Stock *
              </label>
              <input
                type="number"
                min="2"
                name="stock"
                id="s_price"
                value={formData.stock}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="3000"
                required
              />
            </div>

            <div className="">
              <label
                htmlFor="price"
                className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
              >
                Wholesale Price (Ksh) *
              </label>
              <input
                type="number"
                min="0"
                name="wholesale_price"
                id="wholesale_price"
                value={formData.wholesale_price}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="3000"
                required
              />
            </div>

            <div className="">
              <label
                htmlFor="d_price"
                className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
              >
                Retail Price (Ksh) *
              </label>
              <input
                type="number"
                min="0"
                name="retail_price"
                id="d_price"
                value={formData.retail_price}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="3000"
                required
              />
            </div>

            <div className="">
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
                      selectedCategory ? selectedCategory.subcategories : []
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

            <div className="">
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
                    (subCategory) => subCategory.id === parseInt(e.target.value)
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

            <div className="">
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
            <div className="">
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
                required
              />

              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                PNG, JPG, or JPEG files (Max. 5MB each)
              </p>
            </div>

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
                required
              />

              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                PNG, JPG, or JPEG files (Max. 5MB each)
              </p>
            </div>
          </div>

          {/* image section */}
          <div className="grid grid-cols-1 mb-6 p-4 md:grid-cols-3 gap-4 ">
            <div className="">
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

            <div className="">
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

            <div className="">
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

          <div className="bg-primary-50 mb-4 dark:bg-gray-500  shadow-lg flex justify-end  mt-2">
            <button
              type="submit"
              className="px-7 py-2.5 text-sm font-medium text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
            >
              {isLoading ? <div>Uploading..</div> : "Save"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
