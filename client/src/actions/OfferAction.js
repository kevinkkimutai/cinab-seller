import { apiSlice } from "../services/api";

export const OfferApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOffers: builder.mutation({
      query: () => ({
        url: "/offers",
        method: "GET",
      }),
    }),
    deleteOffer: builder.mutation({
        query: (id) => ({
          url: `/offers/${id}`,  // Add a slash before the id
          method: "DELETE",
        }),
      }),
      
      updateOffer: builder.mutation({
        query: ({ id, formData }) => ({
          url: `/offers/${id}`,  // Use dynamic parameter for the Offer ID
          method: "PUT",
          body: formData,
        }),
      }),      
      
      createOffer: builder.mutation({
        query: (formData) => ({
          url: `/offers`,
          method: "POST",
          body: formData,
        }),
      }),
  }),
});

export const {
  useCreateOfferMutation,
  useDeleteOfferMutation,
  useGetOffersMutation,
  useUpdateOfferMutation,
} = OfferApiSlice;
