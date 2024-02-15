import { apiSlice } from "../services/api";

export const VendorApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVendors: builder.mutation({
      query: () => ({
        url: "/vendors",
        method: "GET",
      }),
    }),

    rejectVendors: builder.mutation({
      query: (id) => ({
        url: `/reject/${id}`,
        method: "PUT",
      }),
    }),
    acceptVendors: builder.mutation({
      query: (id) => ({
        url: `/approve/${id}`,
        method: "PUT",
      }),
    }),
    selfRegister: builder.mutation({
      query: (formData) => ({
        url: "/self-register",
        method: "POST",
        body: formData,
      }),
    }),

    registerVendor: builder.mutation({
      query: (formData) => ({
        url: "/register/vendors",
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
      query: ({ formData, id }) => ({
        url: `/vendors/${id}`,
        method: "PUT",
        body: { formData },
      }),
    }),

    updateVendorDetails: builder.mutation({
      query: (formData) => ({
        url: `/vendors`,
        method: "PUT",
        body: formData ,
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
  useRejectVendorsMutation,
  useAcceptVendorsMutation,
  useCreateVendorMutation,
  useRegisterVendorMutation,
  useDeleteVendorMutation,
  useGetVendorsMutation,
  useUpdateVendorDetailsMutation,
  useUpdateVendorMutation,
} = VendorApiSlice;
