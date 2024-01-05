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
        // Dispatch the Products to store them in the store.
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
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-primary-50 dark:text-white dark:bg-gray-800">
            Recently Added Products
        </caption>
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
             
              </tr>
            ))}
          </tbody>
        </table>
      </div>


</div>
  )
}