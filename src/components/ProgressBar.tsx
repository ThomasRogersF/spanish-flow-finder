
import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <div className="flex justify-between items-center">
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber <= currentStep;
          const isCompleted = stepNumber < currentStep;
          
          return (
            <React.Fragment key={stepNumber}>
              <div 
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  isActive 
                    ? 'bg-spanish-orange scale-110' 
                    : 'bg-gray-300'
                } ${isCompleted ? 'bg-spanish-teal' : ''}`}
              />
              {stepNumber < totalSteps && (
                <div 
                  className={`flex-1 h-1 mx-2 transition-all duration-500 ${
                    stepNumber < currentStep 
                      ? 'bg-spanish-teal' 
                      : 'bg-gray-300'
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressBar;
