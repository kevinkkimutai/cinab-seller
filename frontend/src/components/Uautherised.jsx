import React from "react";
import { useNavigate } from "react-router-dom";
import { logOut } from "../reducers/AuthReducers";
import { useDispatch } from "react-redux";

export default function Unauthorized() {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  const dispatch = useDispatch()
  const logout = () => {
    // Dispatch the logout action
    dispatch(logOut());
  };
  return (
    <div className="h-screen w-full  text-orange-900 bg-blue-900 flex items-center justify-center ">
      <div>
        <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl">
          401
        </h1>
        <p className="mb-4 text-3xl tracking-tight font-bold text-black md:text-4xl">
          Not allowed{" "}
        </p>{" "}
        <div className="flex gap-4">
          <button
            onClick={logout}
            className="inline-flex bg-orange-900 text-blue-900 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4"
          >
            Logout
          </button>
          <button
            onClick={handleBack}
            className="inline-flex bg-orange-900 text-blue-900 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4"
          >
            BACK
          </button>
        </div>
      </div>
    </div>
  );
}
