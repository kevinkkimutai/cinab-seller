import React, { useEffect, useState } from "react";

export default function BusinessInformation({ onPrev, onNext }) {
  const [formValues, setFormValues] = useState(() => {
    const storedData = localStorage.getItem("formValues");
    return storedData
      ? JSON.parse(storedData)
      : {
          companyName: "",
          Kra: "",
          licence: "",
          AddressOne: "",
          AddressTwo: "",
          city: "",
          state: "",
          website: "",
          services: "",
        };
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(formValues);
  };

  useEffect(() => {
    localStorage.setItem("formValues", JSON.stringify(formValues));
  }, [formValues]);

  return (
    <div className="flex flex-col w-full h-full   ">
      <div className="  border  rounded-lg shadow-lg ">
        <form className="p-2" onSubmit={handleSubmit}>
          <div className="py-5">
            <h1 className="text-semibold text-gray-700 dark:text-gray-50 text-xl">
              Business Information{" "}
            </h1>
            <p
              className="mt-1 text-sm text-gray-800 dark:text-gray-50"
              id="user_avatar_help"
            >
              Please provide business information{" "}
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 gap-y-7 ">
            <div>
              <label
                for="first_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Company Name{" "}
              </label>
              <input
                type="text"
                id="name"
                name="companyName"
                value={formValues.companyName}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Cinab"
                required
              />
            </div>
            <div>
              <label
                for="Kra_Pin"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                KRA PIN
              </label>
              <input
                type="text"
                name="Kra"
                value={formValues.Kra}
                onChange={handleInputChange}
                id="Kra_Pin"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="CR07115544O7KE"
                required
              />
            </div>
            <div>
              <label
                for="licence"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Trading license No. (optional)
              </label>
              <input
                type="text"
                id="licence"
                name="licence"
                value={formValues.licence}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="KBLC254"
              />
            </div>
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
                name="AddressOne"
                value={formValues.AddressOne}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="PO BOX. 50-20245"
              />
            </div>
            <div>
              <label
                for="AddressTwo"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Address Line 2{" "}
              </label>
              <input
                type="address_line_two"
                id="AddressTwo"
                name="AddressTwo"
                value={formValues.AddressTwo}
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
                id="city"
                name="city"
                value={formValues.city}
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
                id="state"
                value={formValues.state}
                name="state"
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="state"
                required
              />
            </div>
            <div>
              <label
                for="website"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Website
              </label>
              <input
                type="url"
                id="website"
                name="website"
                value={formValues.website}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="cinab.co.ke"
                required
              />
            </div>

            <div>
              <label
                for="services"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                General details of service/Goods
              </label>
              <input
                type="textarea"
                id="services"
                name="services"
                value={formValues.services}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="E-Commerce Company"
                required
              />
            </div>
          </div>
          <div className="flex justify-between py-6">
            <button
              onClick={onPrev}
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
