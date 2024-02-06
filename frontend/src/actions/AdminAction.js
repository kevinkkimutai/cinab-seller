import { apiSlice } from "../services/api";

export const AdminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdmins: builder.mutation({
      query: () => ({
        url: "/admins",
        method: "GET",
      }),
    }),

    
    deleteAdmin: builder.mutation({
        query: (id) => ({
          url: `/admin/${id}`,  // Add a slash before the id
          method: "DELETE",
        }),
      }),
      
      updateAdmin: builder.mutation({
        query: ({ id, formData }) => ({
          url: `/admin/${id}`,  // Use dynamic parameter for the Admin ID
          method: "PUT",
          body: formData,
        }),
      }),      
      
      createAdmin: builder.mutation({
        query: (formData) => ({
          url: `/admin`,
          method: "POST",
          body: formData,
        }),
      }),
  }),
});

export const {
  useCreateAdminMutation,
  useDeleteAdminMutation,
  useGetAdminsMutation,
  useGetCategoryMutation,
  useGetBrandsMutation,
  useUpdateAdminMutation,
} = AdminApiSlice;
