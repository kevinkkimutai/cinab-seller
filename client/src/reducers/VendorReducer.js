import { createSlice } from "@reduxjs/toolkit";

const VendorSlice = createSlice({
  name: "Vendor",
  initialState: {
    vendors: [],
    pendingvendors: "0"
  },
  reducers: {
    setVendor: (state, action) => {
      state.vendors = action.payload;
    },
     setPendingVendor: (state, action) => {
      state.pendingvendors = action.payload;
    },

    createVendor: (state, action) => {
      state.vendors.push(action.payload);
    },
    updateVendors: (state, action) => {
      const updatedIndex = state.vendors.findIndex(
        (vendor) => vendor.id === action.payload.id
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

export const { setVendor, setPendingVendor, createVendor, updateVendors, deleteVendor } =
  VendorSlice.actions;

export default VendorSlice.reducer;

export const selectVendors = (state) => state.Vendor.vendors;
export const selectPendingVendors = (state) => state.Vendor.pendingvendors;
