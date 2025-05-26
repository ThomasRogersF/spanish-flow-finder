
import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { Question } from '../types/questionnaire';
import ProgressBar from './ProgressBar';

interface QuestionScreenProps {
  question: Question;
  currentStep: number;
  totalSteps: number;
  onAnswer: (questionId: string, answer: string) => void;
  onGoBack: () => void;
}

const QuestionScreen: React.FC<QuestionScreenProps> = ({ 
  question, 
  currentStep, 
  totalSteps, 
  onAnswer,
  onGoBack
}) => {
  const handleOptionClick = (optionId: string, optionText: string) => {
    onAnswer(question.id, optionText);
  };

  return (
    <div className="min-h-screen bg-spanish-cream flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl mx-auto">
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
              <button
                key={option.id}
                onClick={() => handleOptionClick(option.id, option.text)}
                className="w-full bg-white rounded-2xl p-6 card-shadow hover:shadow-xl hover:scale-[1.02] transition-all duration-200 text-left group"
              >
                <div className="flex items-center space-x-4">
                  {option.icon && (
                    <span className="text-2xl">{option.icon}</span>
                  )}
                  <span className="text-lg font-medium text-gray-900 group-hover:text-spanish-orange transition-colors">
                    {option.text}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionScreen;
