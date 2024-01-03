import { createSlice } from "@reduxjs/toolkit";
import { persistor } from "../store/store";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    refreshToken: null,
    isEditing: false,
    isLoading: false,
    roles: null,
    error: null,
    users: [],
    userProfile: [],
    editingId: null,
    editedUsers: {},
    searchSecretCode: "",
    isLoadingFetch: false,
    fetchError: null,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { user, token, refreshToken, roles, account } = action.payload;
      state.user = user;
      state.account = user.account;
      state.token = token;
      state.roles = user.role;
      state.refreshToken = refreshToken;
    },
    setIsEditing: (state, action) => {
      state.isEditing = action.payload;
    },
    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setCurrentUser: (state, action) => {
      state.user = action.payload;
    },
    setFetchError: (state, action) => {
      state.fetchError = action.payload;
    },
    logOut: (state) => {
      state.token = null;
      state.user = null;
      state.roles = null;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    resetForgetPassword: (state, action) => {
      state.user = null;
      state.message = action.payload.message;
    },
    register: (state, action) => {
      state.user = action.payload.user;
      state.token = null;
    },

    updateUser: (state, action) => {
      const updatedIndex = state.users.findIndex(
        (user) => user.id === action.payload.id
      );
      if (updatedIndex !== -1) {
        state.users[updatedIndex] = action.payload;
      }
    },

    setUpdateUserProfile: (state, action) => {
      const updatedIndex = state.userProfile.findIndex(
        (user) => user.id === action.payload.id
      );
      if (updatedIndex !== -1) {
        state.userProfile[updatedIndex] = action.payload;
      }
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload.id);
    },
    resendPassword: (state, action) => {
      state.user = null;
      state.message = action.payload.message;
    },
    setEditingId: (state, action) => {
      state.editingId = action.payload;
    },
    setEditedUsers: (state, action) => {
      state.editedUsers = action.payload;
    },
  },
});

export const {
  setUpdateUserProfile,
  setUserProfile,
  setCredentials,
  logOut,
  setIsEditing,
  resetForgetPassword,
  register,
  updateUser,
  deleteUser,
  setIsLoading,
  resendPassword,
  setUsers,
  setCurrentUser,
  setEditedUsers,
} = authSlice.actions;

export default authSlice.reducer;

export const selectEditedUsers = (state) => state.auth.editedUsers;



export const selectUserProfile = (state) => state.auth.userProfile;
export const selectIsEditing = (state) => state.auth.isEditing;
export const selectCurrentUser = (state) => state.auth.user;
export const selectUsers = (state) => state.auth.users;
export const selectCurrentToken = (state) => state.auth.token;
export const selectUserRoles = (state) => state.auth.roles;
export const selectCurrentRefreshToken = (state) => state.auth.refreshToken;
export const selectSearchSecretCode = (state) => state.auth.searchSecretCode;
