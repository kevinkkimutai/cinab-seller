import React, { useState, useEffect, useContext } from "react";
import { StepperContext } from "../../../contexts/StepperContext";

const ProfileComponent = ({ handleClick }) => {
  const [showPassword, setShowPassword] = useState(false); // State to track password visibility

  const { userData, setUserData } = useContext(StepperContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const secretCodeValue = localStorage.getItem("secretCode");
    setUserData({ ...userData, secretCode: secretCodeValue });
    handleClick("next");
  };

  const handleUPloadImage = (e) => {
    const { name, files } = e.target;
    setUserData({ ...userData, [name]: files[0] });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle password visibility state
  };

  console.log(userData);


  return (
    <div className="w-full me-4 pshadow-lg rounded-lg mt-2 bg-gray-50 dark:bg-gray-500">
      <form onSubmit={handleSubmit}>
        <div className="py-5">
          <h1 className="text-semibold text-gray-700 dark:text-gray-50 text-xl">
            Shop Information
          </h1>
          <p
            className="mt-1 text-sm text-gray-800 dark:text-gray-50"
            id="user_avatar_help"
          >
            Setup your shop by completing the following details
          </p>
        </div>
        <div className="grid gap-6 mb-6 md:grid-cols-2 ">
          <div>
            <label
             htmlFor="business_type"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Business Type
            </label>
            <select
              id="business_type"
              className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={handleInputChange}
              name="businessType"
              value={userData["businessType"] || ""}
              required
            >
              <option className="text-gray-400">Choose Business</option>
              <option value="Individual">Individual</option>
              <option value="Business">Business</option>
            </select>
          </div>
          <div>
            <label
             htmlFor="shop_name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Shop Name
            </label>
            <input
              type="text"
              id="shop_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Cinab"
              onChange={handleInputChange}
              name="shoname"
              value={userData["shoname"] || ""}
              required
            />
          </div>
          <div>
            <label
             htmlFor="country"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Country
            </label>
            <select
              id="country"
              className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={handleInputChange}
              name="country"
              value={userData["country"] || ""}
            >
              {/* <option value="">Choose a country</option> */}
              <option selected value="Somali land">
                Somali land
              </option>
            </select>
          </div>
          <div>
            <label
             htmlFor="shop_zone"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Shop Zone
            </label>
            <input
              type="text"
              id="shop_zone"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Somali land"
              onChange={handleInputChange}
              name="shopZone"
              value={userData["shopZone"] || ""}
              required
            />
          </div>
        </div>


        <div className="flex justify-between py-6">
          <button
            type="button"
            onClick={() => handleClick()}
            className=" px-6 py-2 bg-gray-600 text-white rounded-md"
          >
            Previous{" "}
          </button>
          <button
            type="submit"
            className=" px-6 py-2 bg-blue-600 text-white rounded-md"
          >
            Next{" "}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileComponent;
