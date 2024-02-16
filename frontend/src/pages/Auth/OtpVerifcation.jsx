import React, { useState, useRef, useEffect } from "react";
import { Alert, Button } from "react-bootstrap";
import axios from "axios";
import { useVerifyOtpMutation } from "../../actions/authActions";
import { toast } from "react-toastify";
import ResetPasswordForm from "./ResetPassword";
import { useNavigate } from "react-router-dom";

function OTPVerification({ email }) {
  // State variables
  const [otp, setOTP] = useState(["", "", "", ""]);
  const [newOtp, setNewOtp] = useState("");
  const [verificationOtp] = useVerifyOtpMutation();
  const [isverifying, setIsverifying] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false); // Initialize as false
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  // Handle OTP input change
  const handleOTPChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]*$/.test(value) && value.length <= 1) {
      const newOTP = [...otp];
      newOTP[index] = value;
      setOTP(newOTP);

      // Auto-focus the next input field or the previous one if backspace is pressed
      if (value === "" && index > 0) {
        inputRefs[index - 1].current.focus();
      } else if (index < 3 && value.length === 1) {
        inputRefs[index + 1].current.focus();
      }
    }
  };
  const navigate = useNavigate();
  const handleVerificationSubmit = async (e) => {
    e.preventDefault();
    setIsverifying(true);
    const otpCode = otp.join("");
    setNewOtp(otpCode);
    try {
      const res = await verificationOtp({
        otp: otpCode,
      });

      if (res.error) {
        if (res.error.status === 200) {
          toast.success("OTP verified successfully.");
        } else if (res.error.status === 500 || res.error.status === 404) {
          toast.error(res.error.data.error);
        } else {
          toast.error("Failed To Verify");
        }
      } else {
        // Handle other cases where res.error is not present
        toast.success("OTP verified successfully.");
        setShowNewPassword(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsverifying(false);
    }
  };

  return (
    <>
      {showNewPassword ? (
        <ResetPasswordForm otp={newOtp} /> 
      ) : (
        <div className="relative flex h-screen  w-full justify-center items-center overflow-hidden bg-gray-200 py-12">
          <div className="relative bg-primary-50 px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <div className="font-semibold text-3xl text-yellow-500">
                <p>Email Verification</p>
              </div>
              <div className="flex flex-row text-sm font-medium text-gray-400">
                <p>
                  We have sent a code to your email{" "}
                  <span className="text-yellow-500">
                    {email.email || "N/A"}
                  </span>
                </p>
              </div>
            </div>
            <div className="flex mt-4 justify-center">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  className="w-16 h-10 px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mr-2"
                  value={digit}
                  onChange={(e) => handleOTPChange(e, index)}
                  maxLength="1"
                  ref={inputRefs[index]}
                  required
                />
              ))}
            </div>

            <div className="text-center items-center">
              <Button
                onClick={handleVerificationSubmit}
                type="button"
                className="bg-blue-500 items-center text-center hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded"
              >
                {isverifying ? <span>Verifying...</span> : "Verify OTP"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default OTPVerification;
