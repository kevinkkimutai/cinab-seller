import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Alert, Button } from "react-bootstrap";
import { setCredentials, setCurrentUser } from "../reducers/AuthReducers";
import Spinner from "react-bootstrap/Spinner";

// Add icon imports
import { FiEye, FiEyeOff } from "react-icons/fi";
// import Cookies from "js-cookie";
import axios from "axios";
import { useLoginMutation } from "../actions/authActions";
import { toast } from "react-toastify";
const Login = () => {
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
      if (emailData.error) {
        toast.error("Internal Server Error");
      } else {
        setEmail("");
        setPassword("");
        dispatch(setCredentials(emailData));
        dispatch(setCurrentUser(emailData.user));
        navigate("/dashboard");
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

  return (
    <>
      {showResetPassword ? (
        <section className=" dark:bg-gray-900 w-full py-4 ">
          <div className="flex flex-col items-center w-full justify-center px-6 py-8 mx-auto lg:py-0">
            <div className="w-full bg-blue-980 text-yellow-500 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-yellow-500 md:text-2xl dark:text-white">
                  Sign in to your account
                </h1>
                <form
                  className="space-y-4 md:space-y-6"
                  onSubmit={handleSubmit}
                >
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium  dark:text-white"
                    >
                      Your email
                    </label>
                 
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium  dark:text-white"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <ContactInputBox
                        type={showPassword ? "text" : "password"}
                        name="password"
                        ref={passwordRef}
                        placeholder="*****************"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      {/* Add a button to toggle password visibility */}
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-2 text-gray-600 hover:text-gray-800 cursor-pointer"
                      >
                        {showPassword ? <FiEyeOff /> : <FiEye />}
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-start">
                      <div className="flex items-center h-5"></div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor="remember"
                          className=" dark:text-gray-300"
                        ></label>
                      </div>
                    </div>
                    <Button
                      onClick={handleResetPassword}
                      type="button"
                      className="text-sm font-medium  text-yellow-500 border-none dark:text-primary-500"
                    >
                      {isReseting ? (
                        <span>Checking Email...</span>
                      ) : (
                        "Forgot password?"
                      )}
                    </Button>
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
                          className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
                  <p className="text-sm font-light  dark:text-gray-400">
                    Don’t have an account yet?{" "}
                    <Button
                      className="border-none text-blue-500"
                      onClick={() => {
                        navigate("/register");
                      }}
                    >
                      Sign Up
                    </Button>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      ) : (
        // <VerificationComponent email={email} />
        <div>hello</div>
      )}
    </>
  );
};

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
          className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>
    );
  }
);

export default Login;


{/* offer modal */}
<div id="offer-modal" tabIndex="-1" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <div className="flex items-center justify-between p-2 md:p-3 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Offer "Offer name"
                </h3>
                <button data-modal-hide="offer-modal" type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
            </div>
            <div className="p-4 md:p-5 text-center">
            <div className="p-2 md:p-1 text-start mb-3">
                <form className="space-y-4">
                <div>
                        <label htmlFor="offer-p" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Offer price :</label>
                        <input type="digit" name="offer-p" id="offer-p" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="3000" required />
                    </div>


                   <div className="grid grid-cols-2 gap-2">
                   <div>
                        <label htmlFor="from" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Start date :</label>
                        <input type="date" name="from" id="from" placeholder="01/12/2024" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                    </div>
                    <div>
                        <label htmlFor="to" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">End date :</label>
                        <input type="date" name="to" id="to" placeholder="12/12/2024" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                    </div>
                   </div>
                
                  
                </form>
            </div>
                <button data-modal-hide="offer-modal" type="button" className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-700 dark:focus:ring-blue-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-1.5 text-center me-2">
                   Submit
                </button>
                <button data-modal-hide="offer-modal" type="button" className="text-gray-500 bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-1.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancel</button>
            </div>
        </div>
    </div>
</div>