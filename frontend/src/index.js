import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { store, persistor } from "./store/store";
import { Provider } from "react-redux";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PersistGate } from 'redux-persist/integration/react';
import { ContextProvider } from "./contexts/ContextProvider";
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate loading={null} persistor={persistor}>
          <ContextProvider>
            {/* Place ToastContainer outside of Routes */}
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
            />

            <Routes>
              <Route path="/*" element={<App />} />
            </Routes>
          </ContextProvider>
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
