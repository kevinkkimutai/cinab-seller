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
        url: `/orders/${id}`, // Add a slash before the id
        method: "DELETE",
      }),
    }),

    packageOrder: builder.mutation({
      query: (id) => ({
        url: `/orders/package/${id}`, // Add a slash before the id
        method: "PUT",
      }),
    }),
    rejectOrder: builder.mutation({
      query: (id) => ({
        url: `/orders/reject/${id}`, // Add a slash before the id
        method: "PUT",
      }),
    }),

    transitOrder: builder.mutation({
      query: (id) => ({
        url: `/orders/transit/${id}`, // Add a slash before the id
        method: "PUT",
      }),
    }),
    updateOrder: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/orders/${id}`, // Use dynamic parameter for the product ID
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
  usePackageOrderMutation,
  useRejectOrderMutation,
  useTransitOrderMutation,
  useGetOrdersMutation,
  useUpdateOrderMutation,
} = OrderApiSlice;
