
import React from 'react';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-spanish-cream flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center animate-fade-in">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Let's find your perfect Spanish plan!
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Answer a few quick questions and we'll recommend the ideal SpanishVIP learning path for your goals, schedule, and learning style.
          </p>
        </div>
        
        <div className="bg-white rounded-2xl p-8 card-shadow mb-8">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl mb-2">🎯</div>
              <h3 className="font-semibold text-gray-900">Personalized</h3>
              <p className="text-sm text-gray-600">Tailored to your needs</p>
            </div>
            <div>
              <div className="text-3xl mb-2">⚡</div>
              <h3 className="font-semibold text-gray-900">Quick</h3>
              <p className="text-sm text-gray-600">Just 2 minutes</p>
            </div>
            <div>
              <div className="text-3xl mb-2">🎉</div>
              <h3 className="font-semibold text-gray-900">Free Trial</h3>
              <p className="text-sm text-gray-600">Start immediately</p>
            </div>
          </div>
        </div>
        
        <button 
          onClick={onStart}
          className="btn-primary text-lg"
        >
          Start Assessment →
        </button>
        
        <p className="text-sm text-gray-500 mt-4">
          No credit card required • Trusted by 50,000+ students
        </p>
      </div>
    </div>
  );
};

export default WelcomeScreen;
