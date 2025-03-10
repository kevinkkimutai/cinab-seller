import { createSlice } from "@reduxjs/toolkit";

const ProductSlice = createSlice({
  name: "Product",
  initialState: {
    products: [],
    items: [],
    category: [],
    brands: [],
    childcategories: [],
    subcategories: [],
  },
  reducers: {
    setProduct: (state, action) => {
      state.products = action.payload;
    },
    setItems: (state, action) => {
      state.items = action.payload;
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
      state.products = state.products.filter(
        (Product) => Product.id !== action.payload.id
      );
    },
  },
});

export const {
  setProduct,
  setBrands,
  setItems,
  setCategory,
  setChildCategory,
  setSubCategory,
  addProduct,
  updateProduct,
  deleteProduct,

} = ProductSlice.actions;

export default ProductSlice.reducer;

export const selectProducts = (state) => state.Product.products;
export const selectItems = (state) => state.Product.items
export const selectBrands = (state) => state.Product.brands;
export const selectCategory = (state) => state.Product.category;
export const selectSubcategory = (state) => state.Product.subcategories;
export const selectChildCategory = (state) => state.Product.childcategories;
