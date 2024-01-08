import React, { useContext } from "react";
import { StepperContext } from "../../../contexts/StepperContext";

export default function ShippingInformation({ handleClick }) {
  const { userData, setUserData } = useContext(StepperContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleClick("next");
  };

  return (
    <div className="flex flex-col w-full h-full   ">
      <div className="  border  rounded-lg shadow-lg ">
        <form className="p-2" onSubmit={handleSubmit}>
          <div className="py-5">
            <h1 className="text-semibold text-gray-700 dark:text-gray-50 text-xl">
              Shipping Address{" "}
            </h1>
            <p
              className="mt-1 text-sm text-gray-800 dark:text-gray-50"
              id="user_avatar_help"
            >
              Please provide the address from where you prefer to ship your
              products{" "}
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 gap-y-7 ">
            <div>
              <label
                for="addressOne"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Address Line 1{" "}
              </label>
              <input
                type="address_line_one"
                id="addressOne"
                name="SAddressOne"
                value={userData["SAddressOne"] || ""}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="PO BOX. 50-20245"
                required
              />
            </div>
            <div>
              <label
                for="SAddressTwo"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Address Line 2{" "}
              </label>
              <input
                type="address_line_two"
                id="AddressTwo"
                name="SAddressTwo"
                value={userData["SAddressTwo"] || ""}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Eastleigh Ibgaro Plaza 1 Building"
                required
              />
            </div>
            <div>
              <label
                for="phone"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                City/Town{" "}
              </label>
              <input
                type="city"
                id="Scity"
                name="Scity"
                value={userData["Scity"] || ""}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Nairobi"
                required
              />
            </div>
            <div>
              <label
                for="state"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                State/Region{" "}
              </label>
              <input
                type="state"
                id="Sstate"
                value={userData["Sstate"] || ""}
                name="Sstate"
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="state"
                required
              />
            </div>
            <div>
              <label
                for="country"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                country
              </label>
              <input
                type="text"
                id="country"
                name="country"
                value={userData["country"] || ""}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="cinab.co.ke"
                required
              />
            </div>

            <div>
              <label
                for="Postal_Address"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Postal Address{" "}
              </label>
              <input
                type="textarea"
                id="Postal_Address"
                name="Postal_Address"
                value={userData["Postal_Address"] || ""}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="E-Commerce Company"
                required
              />
            </div>
          </div>
          <div className="flex justify-between py-6">
            <button
              onClick={() => {
                handleClick();
              }}
              type="button"
              className="mt-4 px-4 py-2 bg-gray-400 text-white rounded-md"
            >
              Previous
            </button>
            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Next{" "}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
