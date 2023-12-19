import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {thunk} from "redux-thunk";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import { apiSlice } from "../services/api";
import AuthReducers from "../reducers/AuthReducers";


const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token", "roles", "user"],
  stateReconciler: autoMergeLevel2,
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, AuthReducers),

  // Supplier: SupplierReducer,

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
