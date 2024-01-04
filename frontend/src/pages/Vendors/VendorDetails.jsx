import React from "react";

const CompanyDetailsComponent = ({ onPrev }) => {
  return (
    <div className="max-w-md p-6 bg-gray-100 rounded-lg shadow-md">
      <h2>Step 3 : Company Details</h2>
      <div className="flex justify-between">
        <button
          onClick={onPrev}
          type="button"
          className="mt-4 px-4 py-2 bg-gray-400 text-white rounded-md"
        >
          Previous
        </button>
        {/* <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md">
          Submit
        </button> */}
      </div>
    </div>
  );
};

export default CompanyDetailsComponent;
