import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectBrands,
  selectCategory,
  selectChildCategory,
  selectSubcategory,
  setBrands,
  setCategory,
  setChildCategory,
  setSubCategory,
  updateProduct,
} from "../../reducers/ProductReducers";
import { toast } from "react-toastify";
import {
  useGetBrandsMutation,
  useGetCategoryMutation,
  useUpdateItemsMutation,
} from "../../actions/ProductAction";
import ReusablePath from "../../components/ReusablePath";
export default function UpdateProductsFn({
  formData,
  handleClose,
  setSelectedProduct,
}) {
  const handleInputChange = (e) => {
    setSelectedProduct((prevProduct) => ({
      ...prevProduct,
      [e.target.name]: e.target.value,
    }));
  };
  const [updateProductMutation] = useUpdateItemsMutation();
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

    console.log("formData before:", formData);

    try {
      const { data } = await updateProductMutation({
        formData,
        id: formData.id,
      });
      if (data) {
        dispatch(updateProduct(data));
        console.log("formData after:", formData);
        toast.success(`${formData.name} added to Products successfully`);
        handleClose();
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
    <>
      <ReusablePath header="Update Product" />
      <div className="h-full overflow-auto mt-2 scrollbar-hidden p-4 bg-primary-50 dark:bg-slate-800 shadow-lg rounded-lg">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4">
            <div className="mb-5">
              <label
                for="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Product Name *
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                name="price"
                id="price"
                min="0"
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
                name="discount_price"
                id="d_price"
                min="0"
                value={formData.discount_price}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="3000"
              />
            </div>

            <div className="">
              <label
                htmlFor="brand"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Select Product Brand *
              </label>

              <select
                id="brand"
                name="brand_id"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                htmlFor="s_price"
                className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
              >
                Stock *
              </label>
              <input
                type="number"
                name="stock"
                id="s_price"
                min="1"
                value={formData.stock}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="3000"
                required
              />
            </div>

            <div className="">
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

            <div className="s">
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
          <div className=" flex justify-end mt-4">
            <button
              type="submit"
              className=" px-8 py-2.5 text-sm font-medium text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
            >
              {isLoading ? <div>Updating..</div> : "Save"}
            </button>
            <button
              type="button"
              onClick={handleClose}
              className=" items-center justify-center px-8 py-2.5 text-sm font-medium text-gray-800 bg-gray-100 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
            >
              Cancel{" "}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
