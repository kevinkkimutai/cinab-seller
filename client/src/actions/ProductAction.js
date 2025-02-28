import { apiSlice } from "../services/api";

export const ProductApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.mutation({
      query: () => ({
        url: "/products",
        method: "GET",
      }),
    }),
    getItems: builder.mutation({
      query: () => ({
        url: "/items",
        method: "GET",
      }),
    }),

    getCategory: builder.mutation({
      query: () => ({
        url: "/category",
        method: "GET",
      }),
    }),
    getVendorCategory: builder.mutation({
      query: () => ({
        url: "/categories",
        method: "GET",
      }),
    }),
    getBrands: builder.mutation({
      query: () => ({
        url: "/brands",
        method: "GET",
      }),
    }),
    deleteProduct: builder.mutation({
        query: (id) => ({
          url: `/items/${id}`,  // Add a slash before the id
          method: "DELETE",
        }),
      }),
      
      updateItems: builder.mutation({
        query: ({ id, formData }) => ({
          url: `/items/${id}`,  // Use dynamic parameter for the product ID
          method: "PUT",
          body: formData,
        }),
      }),      
      
      createProduct: builder.mutation({
        query: (formData) => ({
          url: `/items`,
          method: "POST",
          body: formData,
        }),
      }),
  }),
});

export const {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductsMutation,
  useGetVendorCategoryMutation,
  useGetCategoryMutation,
  useGetBrandsMutation,
  useUpdateItemsMutation,
  useGetItemsMutation,
} = ProductApiSlice;
