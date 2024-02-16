import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useResetPasswordMutation } from "../../actions/authActions";

export default function ResetPasswordForm({ otp }) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isReseting, setIsReseting] = useState(false);
  const [resetpasswordMutation] = useResetPasswordMutation();
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    setIsReseting(true);
    e.preventDefault();
    if (newPassword === confirmPassword) {
      if (newPassword.length >= 8 && newPassword.length <= 24) {
        try {
          const formData = {
            otp: otp,
            newPassword: newPassword,
          };
        const res =   await resetpasswordMutation(formData);
        if (res.data) {
           toast.success(res.data.message);
           navigate("/login")
        }
        } catch (err) {
          setIsReseting(false);
          toast.error("Password reset failed. Please try again.");
        } finally {
          setIsReseting(false);
        }
      } else {
        toast.error("Password must be between 8 and 24 characters.");
        setIsReseting(false);
      }
    } else {
      toast.error("Passwords do not match. Please try again.");
      setIsReseting(false);
    }
  };

  return (
    <section className="bg-gray-100 h-screen overflow-auto scrollbar-hidden w-full max-h-full overflow-y-auto">
      <div className="flex h-full w-full items-center justify-center">
        <div className="w-full bg-primary-50 rounded-lg shadow-lg dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight sm:flex-none flex justify-center items-center text-gray-500 md:text-2xl dark:text-gray-800">
              Reset Password
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="new-password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  New Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="new-password"
                  name="new-password"
                  aria-describedby="helper-text-explanation"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={handlePasswordChange}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="confirm-password"
                  name="confirm-password"
                  aria-describedby="helper-text-explanation"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  required
                />
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="show-password"
                    type="checkbox"
                    onChange={toggleShowPassword}
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="show-password"
                    className="font-light text-gray-500 dark:text-gray-300"
                  >
                    Show Password
                  </label>
                </div>
              </div>
              <div className="flex justify-center items-center w-full mb-2">
                <button
                  type="submit"
                  className="bg-blue-500 text-center hover:bg-blue-700 text-white font-bold px-12 rounded-full py-2"
                >
                  {isReseting ? <span>Sending...</span> : "Reset Password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
