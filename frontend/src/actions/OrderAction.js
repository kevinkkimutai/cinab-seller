import { apiSlice } from "../services/api";

export const OrderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.mutation({
      query: () => ({
        url: "/orders",
        method: "GET",
      }),
    }),
    deleteOrder: builder.mutation({
        query: (id) => ({
          url: `/orders/${id}`,  // Add a slash before the id
          method: "DELETE",
        }),
      }),
      
      updateOrder: builder.mutation({
        query: ({ id, formData }) => ({
          url: `/orders/${id}`,  // Use dynamic parameter for the product ID
          method: "PUT",
          body: formData,
        }),
      }),      
      
      createOrder: builder.mutation({
        query: (formData) => ({
          url: `/orders`,
          method: "POST",
          body: formData,
        }),
      }),
  }),
});

export const {
  useCreateOrderMutation,
  useDeleteOrderMutation,
  useGetOrdersMutation,
  useUpdateOrderMutation,
} = OrderApiSlice;