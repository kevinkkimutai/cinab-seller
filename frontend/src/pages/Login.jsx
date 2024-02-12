import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setCredentials, setCurrentUser } from "../reducers/AuthReducers";
import Spinner from "react-bootstrap/Spinner";
import Reusablepath from "../components/ReusablePath";
import { Button, Modal, Label, TextInput } from "flowbite-react";
import {
  useCreateVendorMutation,
  useSelfRegisterMutation,
} from "../actions/VendorAction";

// Add icon imports
import { FiEye, FiEyeOff } from "react-icons/fi";
// import Cookies from "js-cookie";
import axios from "axios";
import { useLoginMutation } from "../actions/authActions";
import { toast } from "react-toastify";
import { createVendor } from "../reducers/VendorReducer";
export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isReseting, setIsReseting] = useState(false);
  const [showResetPassword, setResetPassword] = useState(true); // State for password visibility
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const Email_REGEX = /^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$/;
  // const Password_REGEX = /^\d{6,24}$/;

  const isValidEmail = (email) => Email_REGEX.test(email);
  // const isValidPassword = (password) => Password_REGEX.test(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!email || !password) {
        toast.error("Please enter both email and password.");
        return;
      }

      if (!isValidEmail(email)) {
        toast.error("Invalid email format.");
        return;
      }

      const emailData = await login({ email, password }).unwrap();
      console.log(emailData);
      if (emailData.error) {
        toast.error("Internal Server Error");
      } else {
        setEmail("");
        setPassword("");
        dispatch(setCredentials(emailData));
        dispatch(setCurrentUser(emailData.user));
        navigate("/dashboard/vendor");
      }
    } catch (err) {
      console.log(err);
      if (!err?.status) {
        toast.error("No Server Response");
      } else if (err.status === 404) {
        toast.error(err.data?.error || "User Not Found");
      } else if (err.status === 403) {
        toast.error(err.data.error);
      } else if (err.status === 401) {
        toast.error(err.data.error);
      } else {
        toast.error("Login Failed");
      }
      emailRef.current.focus();
    }
  };

  const handleResetPassword = async () => {
    setIsReseting(true);

    if (!email) {
      // Check if the email is empty
      toast.error("Please enter an email");
      setIsReseting(false);
      return;
    }

    try {
      const response = await axios.post(
        "https://server.cinab.co.ke/v2/forget",
        {
          email,
        }
      );
      console.log(response);
      setResetPassword(false);
    } catch (err) {
      console.log(err);
      if (!err.response) {
        toast.error("No Server Response");
      } else if (err.response.status === 404) {
        toast.error(err.response.data.error || "User Not Found");
      } else if (err.response.status === 403) {
        toast.error(err.response.data.error);
      } else if (err.response.status === 401) {
        toast.error(err.response.data.error);
      } else {
        toast.error("Failed to send Otp Code");
      }
      emailRef.current.focus();
    } finally {
      setIsReseting(false);
    }
  };

  const [vendorData, setVendorData] = useState({
    companyEmail: "",
    companyName: "",
    location: "",
    AddressOne: "",
    username: "",
    contact: "",
  });
  const [modalData, setModalData] = useState({
    companyEmail: "",
  });
  const [openModal, setOpenModal] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [creatVendorMutation] = useCreateVendorMutation();
  const [selfRegistrationMutation] = useSelfRegisterMutation();
  const dispatcher = useDispatch();
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setVendorData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleMdalChange = (e) => {
    const { name, value } = e.target;
    setModalData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const res = await selfRegistrationMutation(modalData);
    if (res.data) {
      toast.success("Vendor created successfull");
      dispatcher(createVendor(res.data));
      setOpenModal(false);
      setOpenModal({
        companyEmail: "",
      });
    } else {
      if (res.error.status === 409) {
        toast.error(res.error.data.error);
      } else if (res.error.status === 500) {
        toast.error("Internal server Error");
        setOpenModal(true);
      } else {
        toast.error("Failed to create vendor try again");
        setOpenModal(true);
      }
    }

    try {
    } catch (error) {
      toast.error("Failed to create vendor");
      setOpenModal(true);

      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const res = await creatVendorMutation(vendorData);
    if (res.data) {
      toast.success("Vendor created successfull");
      dispatcher(createVendor(res.data));
      setVendorData({
        companyEmail: "",
        companyName: "",
        location: "",
        AddressOne: "",
        username: "",
        contact: "",
      });
    } else {
      if (res.error.status === 409) {
        toast.error(res.error.data.error);
      } else if (res.error.status === 500) {
        toast.error("Internal server Error");
      } else {
        toast.error("Failed to create vendor try again");
      }
    }

    try {
    } catch (error) {
      toast.error("Failed to create vendor");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section className="bg-gray-100 h-full overflow-auto scrollbar-hidden  w-full max-h-full overflow-y-auto">
    <div className="flex h-full items-center justify-center">
      <div className="w-full mx-2 bg-primary-50 rounded-lg shadow-lg  dark:border md:mt-0 sm:max-w-lg xl:p-0 dark:bg-gray-800 dark:border-gray-700">

<div class="mb- border-b border-gray-200 dark:border-gray-700">
    <ul class="w-full flex -mb-px text-sm font-medium text-center" id="default-tab" data-tabs-toggle="#default-tab-content" role="tablist">
        <li class=" w-1/2" role="presentation">
            <button class="inline-block text-bold text-xl p-2 border-b-2 rounded-t-lg" id="profile-tab" data-tabs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Login</button>
        </li>
        <li class="w-1/2" role="presentation">
            <button class="inline-block text-bold text-xl p-2 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="dashboard-tab" data-tabs-target="#dashboard" type="button" role="tab" aria-controls="dashboard" aria-selected="false">Register</button>
        </li>
    </ul>
</div>
<div id="default-tab-content">
    <div class="hidden rounded-lg bg-gray-50 dark:bg-gray-800" id="profile" role="tabpanel" aria-labelledby="profile-tab">
    <div className="p-2 space-y-4 md:space-y- sm:p-8">
            <h1 className="text-xl font-bold leading-tight text-center tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to Seller account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  for="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>

                <ContactInputBox
                  type="email"
                  name="email"
                  ref={emailRef}
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
             
              <div className="relative">
              <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your password
                </label>
               <div>
               <ContactInputBox
                  type={showPassword ? "text" : "password"}
                  name="password"w
                  ref={passwordRef}
                  placeholder="*****************"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-10 text-gray-600 hover:text-gray-800 cursor-pointer"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
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
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      for="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="/forget"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? (
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
                  "Login"
                )}
              </button>
            </form>
          </div>
    </div>

    {/* register */}
    <div class="hidden p-2 rounded-lg bg-gray-50 dark:bg-gray-800" id="dashboard" role="tabpanel" aria-labelledby="dashboard-tab">
    <div>
    <h1 className="text-xl font-bold leading-tight mb-6 text-center tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign up to Seller account
            </h1>
          <form className="space-y-4 md:space-y-4" onSubmit={handleFormSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-1">
              <div className="mb-4">
                <label
                  for="email"
                  className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
                >
                  Company Email{" "}
                </label>
                <input
                  type="email"
                  name="companyEmail"
                  id="email"
                  value={vendorData.companyEmail}
                  onChange={handleFormChange}
                  className="bg-blue-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required=""
                />
              </div>

              <div>
                <label
                  for="name"
                  className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
                >
                  Company Name{" "}
                </label>
                <input
                  type="text"
                  name="companyName"
                  id="name"
                  className="bg-blue-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="company name"
                  required=""
                  value={vendorData.companyName}
                  onChange={handleFormChange}
                />
              </div>

              <div className="mb-4">
                <label
                  for="name"
                  className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
                >
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  id="location"
                  value={vendorData.location}
                  onChange={handleFormChange}
                  className="bg-blue-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="company location"
                  required=""
                />
              </div>

              <div>
                <label
                  for="address"
                  className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
                >
                  Address{" "}
                </label>
                <input
                  type="text"
                  name="AddressOne"
                  value={vendorData.AddressOne}
                  onChange={handleFormChange}
                  id="address"
                  className="bg-blue-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="company Address"
                  required=""
                />
              </div>

              <div className="mb-4">
                <label
                  for="name"
                  className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
                >
                  Sales Agent{" "}
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={vendorData.username}
                  onChange={handleFormChange}
                  className="bg-blue-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Sales Agent"
                  required=""
                />
              </div>

              <div>
                <label
                  for="contact"
                  className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
                >
                  Contact{" "}
                </label>
                <input
                  type="text"
                  name="contact"
                  value={vendorData.contact}
                  onChange={handleFormChange}
                  id="contact"
                  className="bg-blue-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="+25471295568"
                  required=""
                />
              </div>
            </div>

            <div className="flex justify-end mb-2">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full disabled:opacity-50"
              >
                {loading ? <div>Craeting...</div> : "Register"}{" "}
              </button>
            </div>
          </form>
        </div>
      </div>
    
   
</div>

   </div>
    </div>
    </section>
    
  )
}

const ContactInputBox = React.forwardRef(
  ({ type, placeholder, name, value, onChange }, ref) => {
    return (
      <div className="mb-4">
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          ref={ref}
          required
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
    );
  }
);

