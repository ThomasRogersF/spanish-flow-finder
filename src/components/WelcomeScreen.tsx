import React, { useEffect, useState } from 'react';
import InfluencerBox from './InfluencerBox';

interface WelcomeScreenProps {
  onStart: () => void;
}

interface InfluencerData {
  name: string;
  discount: string;
  code: string;
  image?: string;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  const [influencerData, setInfluencerData] = useState<InfluencerData | null>(null);

  useEffect(() => {
    // Parse URL parameters for influencer data
    const urlParams = new URLSearchParams(window.location.search);
    const influencerName = urlParams.get('influencer');
    const discount = urlParams.get('discount');
    const code = urlParams.get('code');
    const image = urlParams.get('image');

    if (influencerName && discount && code) {
      setInfluencerData({
        name: influencerName,
        discount: discount,
        code: code,
        image: image || undefined
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-spanish-cream flex items-center justify-center p-4 relative">
      {/* Back to SpanishVIP button */}
      <button
        onClick={() => window.parent.postMessage({ action: 'redirect', url: 'https://spanishvip.com/' }, '*')}
        className="absolute top-4 right-4 bg-white text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm border"
      >
        ← Go back to SpanishVIP
      </button>

      <div className="max-w-2xl mx-auto text-center animate-fade-in">
        {/* Logo */}
        <div className="mb-8">
          <button
            onClick={() => window.parent.postMessage({ action: 'redirect', url: 'https://spanishvip.com/' }, '*')}
            className="inline-block"
          >
            <img 
              src="https://lwfiles.mycourse.app/6409eb5798e53550d7acd5f1-public/1bfa7bb23c37499f0d5908f0a004c50e.png" 
              alt="SpanishVIP Logo"
              className="h-16 mx-auto mb-6 hover:opacity-80 transition-opacity cursor-pointer"
            />
          </button>
        </div>

        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Let's find your perfect Spanish plan!
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Answer a few quick questions and we'll recommend the ideal SpanishVIP learning path for your goals, schedule, and learning style.
          </p>
        </div>

        <InfluencerBox influencerData={influencerData} />
        
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
