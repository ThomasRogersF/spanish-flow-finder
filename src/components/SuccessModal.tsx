
import React, { useEffect, useState } from 'react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose }) => {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (!isOpen) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = 'https://spanishvip.com';
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center animate-fade-in">
        {/* Confetti Animation */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 20 }, (_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 bg-spanish-orange animate-confetti`}
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
          {Array.from({ length: 20 }, (_, i) => (
            <div
              key={i + 20}
              className={`absolute w-2 h-2 bg-spanish-teal animate-confetti`}
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        <div className="relative z-10">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            **¡Gracias!**
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            **Thanks! Check your email for next steps to begin your Spanish learning journey.**
          </p>
          <p className="text-sm text-gray-500 mb-4">
            **Redirecting to SpanishVIP.com in {countdown} seconds...**
          </p>
          <button 
            onClick={onClose}
            className="text-spanish-orange hover:text-spanish-orange/80 font-medium"
          >
            **Continue browsing here**
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
