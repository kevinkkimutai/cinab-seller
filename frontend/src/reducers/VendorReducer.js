import { createSlice } from "@reduxjs/toolkit";

const VendorSlice = createSlice({
  name: "Vendor",
  initialState: {
    vendors: [],
  },
  reducers: {
    setVendor: (state, action) => {
      state.vendors = action.payload;
    },

    addVendor: (state, action) => {
      state.vendors.push(action.payload);
    },
    updateVendors: (state, action) => {
      const updatedIndex = state.vendors.findIndex(
        (Vendor) => Vendor.id === action.payload.id
      );
      if (updatedIndex !== -1) {
        state.vendors[updatedIndex] = action.payload;
      }
    },
    deleteVendor: (state, action) => {
      state.vendors = state.vendors.filter(
        (Vendor) => Vendor.id !== action.payload.id
      );
    },
  },
});

export const { setVendor, addVendor, updateVendors, deleteVendor } =
  VendorSlice.actions;

export default VendorSlice.reducer;

export const selectVendors = (state) => state.Vendor.vendors;
