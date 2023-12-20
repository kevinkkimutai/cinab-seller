import { apiSlice } from "../services/api";

export const VendorApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVendors: builder.mutation({
      query: () => ({
        url: "/vendors",
        method: "GET",
      }),
    }),

    deleteVendor: builder.mutation({
      query: (id) => ({
        url: `/vendors${id}`,
        method: "DELETE",
      }),
    }),

    updateVendor: builder.mutation({
      query: (id, formData) => ({
        url: `/vendors${id}`,
        method: "PUT",
        body: formData,
      }),
    }),
    createVendor: builder.mutation({
      query: (formData) => ({
        url: `/vendors`,
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const {
  useCreateVendorMutation,
  useDeleteVendorMutation,
  useGetVendorsMutation,
  useUpdateVendorMutation,
} = VendorApiSlice;
