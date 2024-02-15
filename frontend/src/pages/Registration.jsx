import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useRegisterVendorMutation } from "../actions/VendorAction";

export default function Registration() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  const [formData, setFormData] = useState({
    companyEmail: "",
    companyName: "",
    location: "",
    AddressOne: "",
    username: "",
    contact: "",
    password: "",
  });
  const [createVendor] = useRegisterVendorMutation();

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await createVendor(formData);
      if (!res.data) {
        toast.error(res.error.data.error);
      } else {
        toast.success("Data Succefully Submitted");
        setFormData({
          companyEmail: "",
          companyName: "",
          location: "",
          AddressOne: "",
          username: "",
          contact: "",
          password: "",
        });
      }
    } catch (error) {
      toast.error("Internal Server Error");
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="bg-gray-100  py-2 md:py-4  w-full ">
      <div className="flex h-full items-center justify-center">
        <div className="w-full bg-white rounded-lg shadow-lg  dark:border  md:mt-0 sm:max-w-4xl xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="w-full bg-gray-400 rounded-t-lg h-11 justify-center flex items-center">
            <h1 className="text-xl font-bold leading-tight tracking-tight sm:flex-none flex justify-center items-center text-gray-50 md:text-2xl dark:text-gray-800">
              Sign up to Seller account
            </h1>{" "}
          </div>
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8 mt">
            <form className="space-y-4  md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  for="helper-text"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  name="companyEmail"
                  aria-describedby="helper-text-explanation"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="example@gmail.com"
                  value={setFormData.companyEmail}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label
                    for="helper-text"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="companyName"
                    aria-describedby="helper-text-explanation"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Cinab Company"
                    value={setFormData.companyName}
                    onChange={handleFormChange}
                    required
                  />
                </div>

                <div>
                  <label
                    for="helper-text"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    aria-describedby="helper-text-explanation"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Cinab Company"
                    value={setFormData.location}
                    onChange={handleFormChange}
                    required
                  />
                </div>

                <div>
                  <label
                    for="helper-text"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    id="AddressOne"
                    name="AddressOne"
                    aria-describedby="helper-text-explanation"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Cinab Company"
                    value={setFormData.AddressOne}
                    onChange={handleFormChange}
                    required
                  />
                </div>

                <div>
                  <label
                    for="helper-text"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Contact Sales Name
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    aria-describedby="helper-text-explanation"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Cinab Company"
                    value={setFormData.username}
                    onChange={handleFormChange}
                    required
                  />
                </div>

                <div>
                  <label
                    for="helper-text"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Contact
                  </label>
                  <input
                    type="tel"
                    id="contact"
                    name="contact"
                    aria-describedby="helper-text-explanation"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Contact"
                    value={setFormData.contact}
                    onChange={handleFormChange}
                    required
                  />
                </div>

                <div className="relative">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    aria-describedby="helper-text-explanation"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="*****************"
                    value={setFormData.password} // Assuming you want to use 'setFormData.password' as the input value
                    onChange={handleFormChange}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-2 text-gray-600 hover:text-gray-800 cursor-pointer"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 sr-only border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <p
                      id="helper-text-explanation"
                      className="mt-2 text-sm text-gray-500 dark:text-gray-400"
                    >
                      We’ll never share your details. Read our{" "}
                      <a
                        href="https://cinab.co.ke/privacy-policy"
                        target="_blank"
                        className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                      >
                        Privacy Policy
                      </a>
                      .
                    </p>
                  </div>
                </div>
                <Link
                  to="/login"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Already have An Account
                </Link>
              </div>
              <button
                type="submit"
                className="bg-blue-500  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full disabled:opacity-50"
                disabled={loading}
              >
                {loading ? (
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-white"
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
                  "Register"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
