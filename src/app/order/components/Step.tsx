"use client";


import React, { useState } from "react";

interface StepProps {
  steps: string[];
}

const Step: React.FC<StepProps> = ({ steps }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);

  const goToNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="w-full max-w-screen-lg mx-auto">
      <div className="flex items-center justify-center space-x-4">
        <button
          onClick={goToPreviousStep}
          disabled={currentStep === 0}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
        >
          Previous
        </button>
        <div className="flex items-center space-x-2">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`${
                currentStep === index
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              } px-4 py-2 rounded-lg`}
            >
              {step}
            </div>
          ))}
        </div>
        <button
          onClick={goToNextStep}
          disabled={currentStep === steps.length - 1}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Step;
