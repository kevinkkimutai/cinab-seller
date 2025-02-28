import { createSlice } from "@reduxjs/toolkit";

const OrderSlice = createSlice({
  name: "Order",
  initialState: {
    orders: [],
  },
  reducers: {
    setOrder: (state, action) => {
      state.orders = action.payload;
    },

    addOrder: (state, action) => {
      state.orders.push(action.payload);
    },

    updateOrder: (state, action) => {
      const updatedIndex = state.orders.findIndex(
        (order) => order.id === action.payload.id
      );
    
      if (updatedIndex !== -1) {
        // Create a new array with the updated order
        const updatedOrders = [...state.orders];
        updatedOrders[updatedIndex] = action.payload;
    
        // Update the state with the new array
        state.orders = updatedOrders;
      }
    },
    

    deleteOrder: (state, action) => {
      state.orders = state.orders.filter(
        (order) => order.id !== action.payload.id
      );
    },
  },
});

export const { setOrder, addOrder, updateOrder, deleteOrder } =
  OrderSlice.actions;

export default OrderSlice.reducer;

export const selectOrders = (state) => state.Order.orders;



