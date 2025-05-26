
import React from 'react';

interface InfluencerData {
  name: string;
  discount: string;
  code: string;
  image?: string;
}

interface InfluencerBoxProps {
  influencerData: InfluencerData | null;
}

const InfluencerBox: React.FC<InfluencerBoxProps> = ({ influencerData }) => {
  if (!influencerData) return null;

  return (
    <div className="bg-white rounded-2xl p-6 card-shadow mb-8 max-w-md mx-auto">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
          {influencerData.image ? (
            <img 
              src={influencerData.image} 
              alt={influencerData.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 bg-spanish-orange rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">
                {influencerData.name.charAt(0)}
              </span>
            </div>
          )}
        </div>
        <div className="flex-1">
          <p className="text-gray-700 mb-2 text-sm text-justify leading-relaxed">
            Welcome <span className="font-semibold text-spanish-teal">{influencerData.name}</span> visitors! Get started today and enjoy{' '}
            <span className="font-bold text-spanish-orange">{influencerData.discount}</span> your first month.
          </p>
          <p className="text-xs text-gray-600 text-justify">
            Discount code "<span className="font-mono bg-gray-100 px-2 py-1 rounded">{influencerData.code}</span>" will be automatically applied.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InfluencerBox;
