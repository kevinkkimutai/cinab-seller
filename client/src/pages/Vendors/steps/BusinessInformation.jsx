import React, { useCallback, useContext, useEffect } from "react";
import { StepperContext } from "../../../contexts/StepperContext";
import { useGetCategoryMutation } from "../../../actions/ProductAction";
import { useDispatch, useSelector } from "react-redux";
import { selectCategory, setCategory } from "../../../reducers/ProductReducers";

export default function BusinessInformation({ handleClick }) {
  const { userData, setUserData } = useContext(StepperContext);
  const [getCategory] = useGetCategoryMutation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleClick("next");
  };
  const dispatch = useDispatch();
  const fetchData = useCallback(async () => {
    try {
      const res = await getCategory();
      if (res.data) {
   
        dispatch(setCategory(res.data));
      }
    } catch (err) {
    }
  }, [getCategory, dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
          <div className="grid grid-cols-1 gap-4 gap-y-7 ">
            <div>
              <label
                htmlFor="licence"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Trading license No. (optional)
              </label>
              <input
                type="text"
                id="licence"
                name="licence"
                value={userData["licence"] || ""}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Type here..."
              />
            </div>

            <div>
              <label
                htmlFor="AddressTwo"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Address Line{" "}
              </label>
              <input
                type="address_line_two"
                id="AddressTwo"
                name="AddressTwo"
                value={userData["AddressTwo"] || ""}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Your Address"
                required
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                City/Town{" "}
              </label>
              <input
                type="city"
                id="city"
                name="city"
                value={userData["city"] || ""}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter City/Town"
                required
              />
            </div>
            <div className="hidden">
              <label
                htmlFor="state"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                State/Region{" "}
              </label>
              <input
                type="state"
                id="state"
                value={userData["Somali land"] || "Somali land"}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="state"
                required
              />
            </div>         
          </div>

          <div className="flex justify-end py-6">
            <button
              type="submit"
              className=" px-6 py-2 bg-blue-600 text-white rounded-md"
            >
              Next{" "}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
