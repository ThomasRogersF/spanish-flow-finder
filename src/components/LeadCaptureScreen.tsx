import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import ProgressBar from './ProgressBar';
import { validateEmail } from '../lib/utils';

interface LeadCaptureScreenProps {
  currentStep: number;
  totalSteps: number;
  onSubmit: (userData: {
    name: string;
    email: string;
    phone: string;
    agreedToTerms: boolean;
  }) => void;
  onGoBack: () => void;
}

const LeadCaptureScreen: React.FC<LeadCaptureScreenProps> = ({
  currentStep,
  totalSteps,
  onSubmit,
  onGoBack
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    agreedToTerms: false
  });

  const [validationErrors, setValidationErrors] = useState({
    email: ''
  });

  const validateEmailField = (email: string) => {
    const validation = validateEmail(email);
    setValidationErrors(prev => ({
      ...prev,
      email: validation.errorMessage
    }));
    return validation.isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    const isEmailValid = validateEmailField(formData.email);
    
    if (formData.name && isEmailValid && formData.agreedToTerms) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear email error when user starts typing again
    if (field === 'email' && validationErrors.email) {
      setValidationErrors(prev => ({
        ...prev,
        email: ''
      }));
    }
  };

  const handleEmailBlur = () => {
    if (formData.email) {
      validateEmailField(formData.email);
    }
  };

  return (
    <div className="min-h-screen bg-spanish-cream flex flex-col items-center justify-center p-4 relative">
      {/* Back to SpanishVIP button */}
      <button
        onClick={() => window.parent.postMessage({ action: 'redirect', url: 'https://spanishvip.com/' }, '*')}
        className="absolute top-4 right-4 bg-white text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm border"
      >
        ← Go back to SpanishVIP
      </button>

      <div className="w-full max-w-2xl mx-auto">
        {/* Logo */}
        <div className="text-center mb-6">
          <button
            onClick={() => window.parent.postMessage({ action: 'redirect', url: 'https://spanishvip.com/' }, '*')}
            className="inline-block"
          >
            <img 
              src="https://lwfiles.mycourse.app/6409eb5798e53550d7acd5f1-public/1bfa7bb23c37499f0d5908f0a004c50e.png" 
              alt="SpanishVIP Logo"
              className="h-12 mx-auto hover:opacity-80 transition-opacity cursor-pointer"
            />
          </button>
        </div>

        <button
          onClick={onGoBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
        >
          <ChevronLeft size={20} />
          Go back
        </button>
        
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
        
        <div className="animate-fade-in">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              🎉 You've completed the questionnaire!
            </h2>
            <p className="text-lg text-gray-600">
              Just a few details to see your personalized Spanish learning plan
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 card-shadow">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First name (or nickname)
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-300 input-focus transition-all"
                  placeholder="Enter your first name"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  For added privacy you can provide a nickname instead of your first name
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  onBlur={handleEmailBlur}
                  className={`w-full px-4 py-3 rounded-2xl border transition-all ${
                    validationErrors.email
                      ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                      : 'border-gray-300 input-focus'
                  }`}
                  placeholder="your.email@example.com"
                  required
                />
                {validationErrors.email && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <span className="mr-1">⚠️</span>
                    {validationErrors.email}
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone (optional)
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-300 input-focus transition-all"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="terms"
                  checked={formData.agreedToTerms}
                  onChange={(e) => handleInputChange('agreedToTerms', e.target.checked)}
                  className="mt-1 w-4 h-4 text-spanish-orange border-gray-300 rounded focus:ring-spanish-orange"
                  required
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to the <a href="#" className="text-spanish-orange hover:underline">terms and conditions</a> and <a href="#" className="text-spanish-orange hover:underline">privacy policy</a>
                </label>
              </div>
              
              <button 
                type="submit"
                disabled={!formData.name || !formData.email || !formData.agreedToTerms}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                See My Personalized Plan →
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadCaptureScreen;
