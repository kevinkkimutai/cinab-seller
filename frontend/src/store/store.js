import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk"; 
import { apiSlice } from "../services/api";
import authReducers from "../reducers/AuthReducers";
import vendorReducer from "../reducers/VendorReducer";
import productReducer from "../reducers/ProductReducers";
import orderReducer from "../reducers/OrderReducers";
import offerReducer from "../reducers/OfferReducer";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token", "roles", "user"],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducers),
  vendor: vendorReducer,
  product: productReducer,
  order: orderReducer,
  offer: offerReducer,

  [apiSlice.reducerPath]: apiSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializableCheck
    }).concat(apiSlice.middleware, thunk),
  devTools: false, // Disable Redux DevTools
});

export const persistor = persistStore(store);