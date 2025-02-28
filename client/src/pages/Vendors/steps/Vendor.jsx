import React, { useState } from "react";
import { StepperController, Stepper } from "../..";
import { StepperContext } from "../../../contexts/StepperContext";
import BusinessInformation from "./BusinessInformation";
// import ShopInformation from "./ShopInfomation";
import ProfileComponent from "./ShopInfomation";
import Complete from "./Complete";
import PaymentInformation from "./PaymentInformation";
// import { toast } from "react-toastify";

export default function Vendor() {
  // STEPS DESCRIPTION
  const steps = [
    "Business Information",
    "Shopcenter  Information",
    "Payment Information",
    "Complete",
  ];

  const [currentStep, setCurrentStep] = useState(1);

  const [userData, setUserData] = useState("");
  const [finalData, setFinalData] = useState([]);

  const handleClick = (direction) => {
    let newStep = currentStep;
    direction === "next" ? newStep++ : newStep--;
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  };
  //   Dertemines the omponent to display on the current step
  const displayStep = (step) => {
    switch (step) {
      case 1:
        return <BusinessInformation handleClick={handleClick}  />;
      case 2:
        return <ProfileComponent handleClick={handleClick} />;
      case 3:
        return <PaymentInformation handleClick={handleClick} />;
      case 4:
        return <Complete handleClick={handleClick} />;
      case 5:
        return <Complete handleClick={handleClick} />;

      default:
    }
  };

  return (
    <div className="p-4 bg-slate-100 h-full">
      <div className="p-4 border-2  border-gray-200 bg-white  rounded-lg shadow-lg dark:border-gray-700 ">
        <p className="font-medium text-green-500 p-3 rounded-md justify-center flex dark:bg-gray-800 w-full bg-red-200 ">Kindly fill out the form below to be allowed to upload products.</p>
        <div className="mb-4 mx-auto max-w-screen">
          <Stepper steps={steps} currentStep={currentStep} />
        </div>
        <div className="md:my-10 ">
          <StepperContext.Provider
            value={{
              userData,
              setUserData,
              finalData,
              setFinalData,
            }}
          >
            {displayStep(currentStep)}
          </StepperContext.Provider>
        </div>
      </div>
    </div>
  );
}
