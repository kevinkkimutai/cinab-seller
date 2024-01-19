import { apiSlice } from "../services/api";

export const VendorApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVendors: builder.mutation({
      query: () => ({
        url: "/vendors",
        method: "GET",
      }),
    }),

    selfRegister: builder.mutation({
      query: (formData) => ({
        url: "/self-register",
        method: "POST",
        body: formData,
      }),
    }),

    deleteVendor: builder.mutation({
      query: (id) => ({
        url: `/vendors/${id}`,
        method: "DELETE",
      }),
    }),

    updateVendor: builder.mutation({
      query: (formData) => ({
        url: `/vendors`,
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
  useSelfRegisterMutation,
  useCreateVendorMutation,
  useDeleteVendorMutation,
  useGetVendorsMutation,
  useUpdateVendorMutation,
} = VendorApiSlice;
