import { createSlice } from "@reduxjs/toolkit";

const ProductSlice = createSlice({
  name: "Product",
  initialState: {
    products: [],
  },
  reducers: {
    setProduct: (state, action) => {
      state.products = action.payload;
    },

    addProduct: (state, action) => {
      state.products.push(action.payload);
    },

    updateProduct: (state, action) => {
      const updatedIndex = state.products.findIndex(
        (product) => product.id === action.payload.id
      );
    
      if (updatedIndex !== -1) {
        // Create a new array with the updated product
        const updatedProducts = [...state.products];
        updatedProducts[updatedIndex] = action.payload;
    
        // Update the state with the new array
        state.products = updatedProducts;
      }
    },
    

    deleteProduct: (state, action) => {
      state.products = state.products.filter(
        (Product) => Product.id !== action.payload.id
      );
    },
  },
});

export const { setProduct, addProduct, updateProduct, deleteProduct } =
  ProductSlice.actions;

export default ProductSlice.reducer;

export const selectProducts = (state) => state.Product.products;

