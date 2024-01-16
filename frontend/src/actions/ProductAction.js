import { apiSlice } from "../services/api";

export const ProductApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.mutation({
      query: () => ({
        url: "/products",
        method: "GET",
      }),
    }),
    deleteProduct: builder.mutation({
        query: (id) => ({
          url: `/products/${id}`,  // Add a slash before the id
          method: "DELETE",
        }),
      }),
      
      updateProduct: builder.mutation({
        query: ({ id, formData }) => ({
          url: `/products/${id}`,  // Use dynamic parameter for the product ID
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
  useUpdateProductMutation,
} = ProductApiSlice;
