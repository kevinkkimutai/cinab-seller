import { createSlice } from "@reduxjs/toolkit";

const OfferSlice = createSlice({
  name: "offer",
  initialState: {
    offers: [],
  },
  reducers: {
    setOffer: (state, action) => {
      state.offers = action.payload;
    },

    addOffer: (state, action) => {
      state.offers.push(action.payload);
    },

    updateOffer: (state, action) => {
      const updatedIndex = state.offers.findIndex(
        (offer) => offer.id === action.payload.id
      );
    
      if (updatedIndex !== -1) {
        // Create a new array with the updated Offer
        const updatedOffers = [...state.offers];
        updatedOffers[updatedIndex] = action.payload;
    
        // Update the state with the new array
        state.offers = updatedOffers;
      }
    },
    

    deleteOffer: (state, action) => {
      state.offers = state.offers.filter(
        (Offer) => Offer.id !== action.payload.id
      );
    },
  },
});

export const { setOffer, addOffer, updateOffer, deleteOffer } =
  OfferSlice.actions;

export default OfferSlice.reducer;

export const selectOffers = (state) => state.Offer.offers;

