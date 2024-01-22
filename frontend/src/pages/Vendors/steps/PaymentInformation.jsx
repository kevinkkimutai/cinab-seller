import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { StepperContext } from "../../../contexts/StepperContext";
import { useDispatch } from "react-redux";
import { useUpdateVendorMutation } from "../../../actions/VendorAction";
import { createVendor } from "../../../reducers/VendorReducer";

export default function PaymentInformation({ currentStep, handleClick }) {
  const dispatch = useDispatch();
  const [loading, setIsLoading] = useState(false);
  const { userData, setUserData } = useContext(StepperContext);
  const [createVendorRequest] = useUpdateVendorMutation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const secretCodeValue = localStorage.getItem("secretCode");
    setUserData({ ...userData, secretCode: secretCodeValue });
    try {
      const formData = new FormData();

      for (const key in userData) {
        if (userData[key] instanceof File) {
          formData.append(key, userData[key]);
        } else {
          formData.append(key, userData[key]);
        }
      }
      const res = await createVendorRequest(formData).unwrap();
      dispatch(createVendor(res.data)); // Dispatch action to set vendor in Redux store
      toast.success("Vendor created successfully");
      console.log(res);
      handleClick("next");
    } catch (error) {
      if (error.status === 404) {
        toast.error("Vendor Not Found");
      } else if (error.status === 500) {
        toast.error("Failed To create Vendor try again");
      } else {
        toast.error("Internal Server Error");
      }
      console.log(error.status);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full h-full   ">
      <div className="  border  rounded-lg shadow-lg ">
        <form
          className="p-2"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
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
                  value={userData["AccountNumber"] || ""}
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
                  value={userData["BankName"] || ""}
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
                  value={userData["MpesaNumber"] || ""}
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
                  value={userData["MpesaName"] || ""}
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
              {loading ? (
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                "submit"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
