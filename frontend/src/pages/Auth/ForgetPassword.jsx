import React, { useState } from "react";
import { useForgetPasswordMutation } from "../../actions/authActions";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import OTPVerification from "./OtpVerifcation";

export default function ForgetPassword() {
  const [loading, setLoading] = useState(false);
  const [showOtpForm, setShowOtpForm] = useState(false);

  const [forgetPassword] = useForgetPasswordMutation();
  const [formData, setFormData] = useState({
    email: "",
  });

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
      const res = await forgetPassword(formData);
      if (!res.data) {
        toast.error(res.error.data.error);
      } else {
        setShowOtpForm(true);
        toast.success("We Have Sent OTP Code to Your Email");
      }
    } catch (error) {
      toast.error("Internal Server Error");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {showOtpForm ? (
        <div>
          <OTPVerification email={formData} />
        </div>
      ) : (
        <section className="bg-gray-100 h-full overflow-auto scrollbar-hidden  w-full max-h-full overflow-y-auto">
          <div className="flex h-full items-center justify-center">
            <div className="w-full bg-primary-50 rounded-lg shadow-lg  dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight sm:flex-none flex justify-center items-center text-gray-500 md:text-2xl dark:text-gray-800">
                  Reset Password{" "}
                </h1>{" "}
                <form
                  className="space-y-4  md:space-y-6"
                  onSubmit={handleSubmit}
                >
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
                      name="email"
                      aria-describedby="helper-text-explanation"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="example@gmail.com"
                      value={setFormData.email}
                      onChange={handleFormChange}
                      required
                    />
                  </div>

                  <div className="mt-4 flex justify-end">
                    <Link
                      to="/login"
                      className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Rertun to login{" "}
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
                      "Reset"
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
