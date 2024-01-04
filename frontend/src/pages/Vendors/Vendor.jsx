import React, { useState } from "react";
import ProfileComponent from "./ShopInfomation";
import ShippingInformation from "./ShippingInfoamation";
import PaymentInformation from "./PaymentInformation";
import BusinessInformation from "./BusinessInformation";

const App = () => {
  const [progress, setProgress] = useState(0); // Progress state tracker

  const nextStep = (data) => {
    setProgress((prevProgress) => prevProgress + 1); // Move to the next step
    // if (data) {
    //   localStorage.setItem(`formValues_step_${progress}`, JSON.stringify(data)); // Save form data for the current step
    // }
  };

  const prevStep = () => {
    setProgress((prevProgress) => prevProgress - 1); // Move to the previous step
    // const storedData = localStorage.getItem(`formValues_step_${progress - 1}`);
    // const previousFormValues = storedData ? JSON.parse(storedData) : null;
    // if (previousFormValues) {
    //   setFormValues(previousFormValues); // Update the formValues state with the previous data
    // }
  };

  const steps = [
    {
      title: "Shopcenter  Information",
      status: progress > 0 ? "Done" : "Pending",
    },
    {
      title: "Business Information",
      status: progress > 1 ? "Done" : "Pending",
    },
    {
      title: "Shipping Information",
      status: progress > 2 ? "Done" : "Pending",
    },
    { title: "Payment Information", status: progress > 3 ? "Done" : "Pending" },
  ];

  const renderStep = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return (
          <ProfileComponent
            onNext={nextStep}
            // data={formValues} // Pass form data to the first step
          />
        );
      case 1:
        return (
          <BusinessInformation
            onNext={nextStep}
            onPrev={prevStep}
            // data={formValues}
          />
        );
      case 2:
        return (
          <ShippingInformation
            onNext={nextStep}
            onPrev={prevStep}
            // data={formValues}
          />
        );
      case 3:
        return (
          <PaymentInformation
            onNext={nextStep}
            onPrev={prevStep}
            // data={formValues}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full bg-primary-50 dark:bg-slate-700 overflow-auto h-full rounded-lg shadow-lg">
      {/* Rendering steps tracker */}
      <div className="w-full flex justify-center md:gap-28 gap-2 px-4 mt-4">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-gray-100 rounded-lg p-4 flex items-center justify-between w-64"
          >
            <div>
              <h3>{step.title}</h3>
              <div
                className={`text-sm rounded-full ${
                  step.status === "Done" ? "bg-blue-500" : "bg-gray-500"
                } w-full h-2 mt-2`}
              ></div>
              <span
                className={`text-sm ${
                  step.status === "Done" ? "text-green-500" : "text-gray-500"
                }`}
              >
                {step.status}
              </span>
            </div>
            {index !== steps.length - 1 && (
              <div className="w-px h-6 bg-gray-300"></div>
            )}
          </div>
        ))}
      </div>
      {/* Rendering current step */}
      <div className="w-full p-4 h-full ">{renderStep(progress)}</div>
    </div>
  );
};

export default App;
