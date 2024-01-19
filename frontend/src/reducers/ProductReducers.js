import { createSlice } from "@reduxjs/toolkit";

const ProductSlice = createSlice({
  name: "Product",
  initialState: {
    products: [],
    category: [],
    brands: [],
    childcategories: [],
    subcategories: [],
  },
  reducers: {
    setProduct: (state, action) => {
      state.products = action.payload;
    },
    setBrands: (state, action) => {
      state.brands = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },

    setChildCategory: (state, action) => {
      state.childcategories = action.payload;
    },

    setSubCategory: (state, action) => {
      state.subcategories = action.payload;
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
      const productIdToDelete = action.payload.id;
      // Filter out the product based on its id
      state.products = state.products.filter(
        (product) => product.id !== productIdToDelete
      );

      // Alternatively, you can use findIndex and splice to remove the product
      // const productIndex = state.products.findIndex(product => product.id === productIdToDelete);
      // if (productIndex !== -1) {
      //   state.products.splice(productIndex, 1);
      // }
    },
  },
});

export const {
  setProduct,
  setBrands,
  setCategory,
  setChildCategory,
  setSubCategory,
  addProduct,
  updateProduct,
  deleteProduct,
} = ProductSlice.actions;

export default ProductSlice.reducer;

export const selectProducts = (state) => state.product.products;
export const selectBrands = (state) => state.product.brands;
export const selectCategory = (state) => state.product.category;
export const selectSubcategory = (state) => state.product.subcategories;
export const selectChildCategory = (state) => state.product.childcategories;
