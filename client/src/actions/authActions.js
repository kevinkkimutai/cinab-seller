//src/actions/authActions.js

import { apiSlice } from "../services/api";
export const authApiSlice = apiSlice.injectEndpoints({
  
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: "/register",
        method: "POST",
        body: { ...userData },
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "delete",
      }),
    }),
    unblockUser: builder.mutation({
      query: ({ id, ...updateUser }) => ({
        url: `/unblock${id}`,
        method: "put",
        body: updateUser,
      }),
    }),

    updateUser: builder.mutation({
      query: ({ id, ...updateUser }) => ({
        url: `/users/${id}`,
        method: "put",
        body: updateUser,
      }),
    }),
    updateUserProfile: builder.mutation({
      query: (editedUserProfile) => ({
        url: `/profile`,
        method: "put",
        body: editedUserProfile,
      }),
    }),

    getUser: builder.mutation({
      query: () => ({
        url: "/users",
        method: "get",
      }),
    }),
    getRefreshToken: builder.mutation({
      query: () => ({
        url: "/refresh",
        method: "get",
      }),
    }),


    forgetPassword: builder.mutation({
      query: (email) => ({
        url: "/forget",
        method: "POST",
        body: email,

      }),
    }),
    
    resetPassword: builder.mutation({
      query: (resetData) => ({
        url: "/forget-password",
        method: "PUT",
        body: resetData,
      }),
    }),

    verifyOtp: builder.mutation({
      query: (otp) => ({
        url: "/verify-otp",
        method: "POST",
        body: otp
      })
    }),


    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "DELETE",
      }),
    }),

    getUserProfile: builder.mutation({
      query: () => ({
        url: "/profile",
        method: "get",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useGetUserMutation,
  useRegisterMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useLogoutMutation,
  useUpdateUserMutation,
  useUnblockUserMutation,
  useDeleteUserMutation,
  useGetRefreshTokenMutation,
  useUpdateUserProfileMutation,
  useGetUserProfileMutation,
  useVerifyOtpMutation,

} = authApiSlice;
