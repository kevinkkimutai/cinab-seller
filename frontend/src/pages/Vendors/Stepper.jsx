import React, { useEffect, useRef, useState } from "react";

export default function Stepper({ steps, currentStep }) {
  const [newStep, setNewStep] = useState([]);
  const stepRef = useRef();

  const updatedStep = (stepNumber, steps) => {
    const newSteps = [...steps];
    let count = 0;

    while (count < newSteps.length) {
      if (count === stepNumber) {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: true,
          selected: true,
          complete: true,
        };
      } else if (count < stepNumber) {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: false,
          selected: true,
          complete: true,
        };
      } else {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: false,
          selected: false,
          complete: false,
        };
      }
      count++;
    }

    return newSteps; // Return the modified steps array
  };

  useEffect(() => {
    const stepsState = steps.map((step, index) => ({
      description: step,
      completed: false,
      highlighted: index === 0,
      selected: index === 0,
    }));
    stepRef.current = stepsState;
    const current = updatedStep(currentStep - 1, stepRef.current);
    setNewStep(current);
  }, [steps, currentStep]);

  const displaySteps = newStep.map((step, index) => (
    <div
      key={index}
      className={
        index !== newStep.length - 1
          ? "w-full flex items-center"
          : "flex items-center"
      }
    >
      <div className=" relative  flex flex-col items-center text-teal-600">
        <div
          className={`rounded-full transition ease-in-out border-2 border-gray-300 h-12 w-12 flex items-center justify-center py-3 ${
            step.selected
              ? "bg-green-500 text-white font-bold border border-green-600"
              : ""
          }`}
        >
          {step.completed || step.selected ? (
            <span className="text-white font-bold text-xl ">&#10003;</span>
          ) : (
            <span className="bg-red"> {index + 1}</span>
          )}{" "}
        </div>
        <div
          className={`absolute top-0 text-center mt-16 w-32 text-xs font-medium uppercase ${
            step.highlighted ? "text-gray-900" : "text-gray-400"
          }`}
        >
          {step.description}{" "}
        </div>
      </div>
      <div className={`flex-auto border-t-2  transition duration-500 ease-in-out ${step.completed || step.selected  ? "border-green-600" : "border-gray-300"}`}>
        {/* Display line */}
      </div>{" "}
    </div>
  ));

  return (
    <div className="mx-4 p-4 flex justify-between items-center">
      {displaySteps}
    </div>
  );
}
