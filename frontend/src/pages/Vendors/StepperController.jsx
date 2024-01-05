import React from "react";

export default function StepperController({ handleClick, steps, currentStep }) {
  

  
  return (
    <div className="container flex justify-around ">
      {/* Back button */}
      <button
        onClick={() => handleClick()}
        className={`bg-slate-50 text-bg-primary uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer border-2 border-slate-300 hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out  ${
          currentStep === 1 ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        Prev
      </button>

      <button
        onClick={() => handleClick("next")}
        className="bg-blue-500 text-bg-primary uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer border-2 border-slate-300 hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out "
      >
        {currentStep === steps.length - 1 ? "Submit" : "Next"}{" "}
      </button>
    </div>
  );
}
