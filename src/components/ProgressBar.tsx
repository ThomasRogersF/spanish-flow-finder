
import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <div className="flex items-center gap-2">
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber <= currentStep;
          
          return (
            <div 
              key={stepNumber}
              className={`flex-1 h-2 rounded-full transition-all duration-300 ${
                isCompleted 
                  ? 'bg-spanish-teal' 
                  : 'bg-gray-200'
              }`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProgressBar;
