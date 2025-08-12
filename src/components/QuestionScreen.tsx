import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { Question } from '../types/questionnaire';
import ProgressBar from './ProgressBar';
import { Checkbox } from './ui/checkbox';

interface QuestionScreenProps {
  question: Question;
  currentStep: number;
  totalSteps: number;
  onAnswer: (questionId: string, answer: string | string[]) => void;
  onGoBack: () => void;
}

const QuestionScreen: React.FC<QuestionScreenProps> = ({ 
  question, 
  currentStep, 
  totalSteps, 
  onAnswer,
  onGoBack
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const isMultiSelect = question.id === 'q2c'; // Family question for multiple selection

  const handleOptionClick = (optionId: string, optionText: string) => {
    if (!isMultiSelect) {
      onAnswer(question.id, optionText);
      return;
    }

    // Handle multiple selection for family question
    const newSelected = selectedOptions.includes(optionText)
      ? selectedOptions.filter(item => item !== optionText)
      : [...selectedOptions, optionText];
    
    setSelectedOptions(newSelected);
  };

  const handleContinue = () => {
    if (isMultiSelect && selectedOptions.length > 0) {
      onAnswer(question.id, selectedOptions);
    }
  };

  return (
    <div className="min-h-screen bg-spanish-cream flex flex-col items-center justify-center p-4 relative">
      {/* Back to SpanishVIP button */}
      <a
        href="https://spanishvip.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-4 right-4 bg-white text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm border"
      >
        ← Go back to SpanishVIP
      </a>

      <div className="w-full max-w-2xl mx-auto">
        {/* Logo */}
        <div className="text-center mb-6">
          <a
            href="https://spanishvip.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <img 
              src="https://lwfiles.mycourse.app/6409eb5798e53550d7acd5f1-public/1bfa7bb23c37499f0d5908f0a004c50e.png" 
              alt="SpanishVIP Logo"
              className="h-12 mx-auto hover:opacity-80 transition-opacity"
            />
          </a>
        </div>

        {currentStep > 1 && (
          <button
            onClick={onGoBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ChevronLeft size={20} />
            Go back
          </button>
        )}
        
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
        
        <div className="animate-slide-in-right">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {question.title}
            </h2>
            {question.subtitle && (
              <p className="text-lg text-gray-600">
                {question.subtitle}
              </p>
            )}
          </div>
          
          <div className="space-y-4">
            {question.options.map((option) => (
              <div
                key={option.id}
                className={`w-full bg-white rounded-2xl p-6 card-shadow hover:shadow-xl hover:scale-[1.02] transition-all duration-200 ${
                  isMultiSelect ? 'cursor-pointer' : ''
                }`}
                onClick={isMultiSelect ? () => handleOptionClick(option.id, option.text) : undefined}
              >
                <div className="flex items-center space-x-4">
                  {isMultiSelect && (
                    <Checkbox
                      checked={selectedOptions.includes(option.text)}
                      onChange={() => handleOptionClick(option.id, option.text)}
                    />
                  )}
                  {option.icon && (
                    <span className="text-2xl">{option.icon}</span>
                  )}
                  {isMultiSelect ? (
                    <span className="text-lg font-medium text-gray-900">
                      {option.text}
                    </span>
                  ) : (
                    <button
                      onClick={() => handleOptionClick(option.id, option.text)}
                      className="text-lg font-medium text-gray-900 group-hover:text-spanish-orange transition-colors text-left w-full"
                    >
                      {option.text}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {isMultiSelect && selectedOptions.length > 0 && (
            <div className="mt-8 text-center">
              <button
                onClick={handleContinue}
                className="bg-spanish-orange text-white px-8 py-3 rounded-xl font-semibold hover:bg-opacity-90 transition-all duration-200"
              >
                Continue
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionScreen;
