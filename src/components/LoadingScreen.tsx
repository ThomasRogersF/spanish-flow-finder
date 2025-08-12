
import React from 'react';

const LoadingScreen: React.FC = () => {
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

      {/* Logo */}
      <div className="text-center mb-8">
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

      <div className="text-center animate-fade-in">
        <div className="mb-8">
          {/* Loading Spinner */}
          <div className="inline-flex items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-spanish-cream border-t-spanish-orange"></div>
          </div>
        </div>
        
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Analyzing your results...
        </h2>
        <p className="text-lg text-gray-600 max-w-md mx-auto">
          We're finding the perfect Spanish learning plan based on your answers
        </p>
        
        {/* Progress dots */}
        <div className="flex justify-center space-x-2 mt-8">
          <div className="w-2 h-2 bg-spanish-orange rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-spanish-orange rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-spanish-orange rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
