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
        "https://e-procurement.onrender.com/v1/forget",
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
    <section className="bg-gray-100 dark:bg-gray-900 w-full max-h-full overflow-y-auto">
      <div className="flex flex-col items-center justify-between px-6 py-20">
        <div className="w-full bg-primary-50 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
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
      </div>
    </section>
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
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
    );
  }
);

export default Login;
