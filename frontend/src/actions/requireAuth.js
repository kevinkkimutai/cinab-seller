import React, { useState, useEffect } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentToken, logOut } from "../reducers/AuthReducers";

const RequireAuth = () => {
  const token = useSelector(selectCurrentToken);
  const location = useLocation();
  const [retryCount, setRetryCount] = useState(0);
  const dispatch = useDispatch();

  const logout = () => {
    // Dispatch the logout action
    dispatch(logOut());
  };

  useEffect(() => {
    if (!token && retryCount < 3) {
      const maxRetries = 3; // Max number of retries
      const retryDelay = 1000; // Delay in milliseconds

      const retryInterval = setInterval(() => {
        if (token) {
          clearInterval(retryInterval); // Stop retrying if the token is found
        } else {
          setRetryCount((prevCount) => prevCount + 1);

          if (retryCount >= maxRetries - 1) {
            clearInterval(retryInterval); // Stop retrying after the maximum retries
          }
        }
      }, retryDelay);

      return () => {
        clearInterval(retryInterval); // Clean up the interval when the component unmounts
      };
    }
  }, [token, retryCount, dispatch]); // Include dispatch in the dependency array to prevent potential issues

  return token ? (
    <Outlet />
  ) : (
    <>
      <Navigate to="/" state={{ from: location }} replace />
      {/* Dispatch the logout action when the user logs out */}
      {logout()}
    </>
  );
};

export default RequireAuth;
