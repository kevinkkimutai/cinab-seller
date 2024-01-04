import React, { useEffect, useState } from "react";

export default function PaymentInformation({ onPrev, onNext }) {
  const [formValues, setFormValues] = useState(() => {
    const storedData = localStorage.getItem("formValues");
    return storedData
      ? JSON.parse(storedData)
      : {
          BankName: "",
          AccountNumber: "",
          MpesaNumber: "",
          MpesaName: "",
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
    console.log(formValues);
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
              Preferred payment option:
            </h1>
            <p
              className="mt-1 text-sm text-gray-800 dark:text-gray-50"
              id="user_avatar_help"
            >
              Select the payment method, if applicable, of your choice,and
              ensure to provide all required details. We'll review the validity
              of your documents upon submission.
            </p>
          </div>

          <div className="mt-4">
            <div className="border-b border-gray-300 mb-4">
              <h2 className="text-gray-500 font-medium dark:text-gray-50">
                Bank Account
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2  gap-4 gap-y-7 ">
              <div>
                <label
                  for="addressOne"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Bank Account Number{" "}
                </label>
                <input
                  type="text"
                  id="AccountNumber"
                  min="0"
                  name="AccountNumber"
                  value={formValues.AccountNumber}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="02275656597565"
                  required
                />
              </div>
              <div>
                <label
                  for="addressOne"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Bank Name{" "}
                </label>
                <input
                  type="text"
                  id="BankName"
                  name="BankName"
                  value={formValues.BankName}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Equity"
                  required
                />
              </div>
            </div>

            <div className="border-b border-gray-300 mb-4 mt-4 md:mt-11">
              <h2 className="text-gray-500 font-medium dark:text-gray-50">
                Mpesa{" "}
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2  gap-4 gap-y-7 ">
              <div>
                <label
                  for="addressOne"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  MPesa Number{" "}
                </label>
                <input
                  type="number"
                  min="0"
                  max="9999999999999"
                  id="MpesaNumber"
                  name="MpesaNumber"
                  value={formValues.MpesaNumber}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="+2547825888565"
                  required
                />
              </div>
              <div>
                <label
                  for="MpesaName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Full Mpesa Name{" "}
                </label>
                <input
                  type="text"
                  id="MpesaName"
                  name="MpesaName"
                  value={formValues.MpesaName}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="John Doe"
                  required
                />
              </div>
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
              Submit{" "}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
