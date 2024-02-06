import React, { useState, useEffect } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentToken,  selectUserRoles } from "../reducers/AuthReducers";

const RequireAuth = ({ requiredRoles = [] }) => {
  const token = useSelector(selectCurrentToken);
  const location = useLocation();
  const userRoles = useSelector(selectUserRoles);
  const [retryCount, setRetryCount] = useState(0);
  const dispatch = useDispatch();



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
  }, [token, retryCount, dispatch]);

  // Check if userRoles is not null before using includes method
  const hasRequiredRole =
    userRoles && (requiredRoles.length === 0 || requiredRoles.some((role) => userRoles.includes(role)));

  return token && hasRequiredRole ? (
    <Outlet />
  ) : (
    <>
      <Navigate to="/unautherized" state={{ from: location }} replace />
    </>
  );
};

export default RequireAuth;
