import { createSlice } from "@reduxjs/toolkit";

const AdminSlice = createSlice({
  name: "Admin",
  initialState: {
    admins: [],
  },
  reducers: {
    setAdmin: (state, action) => {
      state.admins = action.payload;
    },
   
    addAdmin: (state, action) => {
      state.admins.push(action.payload);
    },

    updateAdmin: (state, action) => {
      const updatedIndex = state.admins.findIndex(
        (admin) => admin.id === action.payload.id
      );

      if (updatedIndex !== -1) {
        // Create a new array with the updated product
        const updatedAdmins = [...state.admins];
        updatedAdmins[updatedIndex] = action.payload;

        // Update the state with the new array
        state.admins = updatedAdmins;
      }
    },

    deleteAdmin: (state, action) => {
      state.admins = state.admins.filter(
        (Admin) => Admin.id !== action.payload.id
      );
    },
  },
});

export const {
  setAdmin,
  addAdmin,
//   updateAdmin,
  deleteAdmin,
} = AdminSlice.actions;

export default AdminSlice.reducer;

export const selectAdmin = (state) => state.Admins;
