
import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

const EmbedCode: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [height, setHeight] = useState('600');
  const [width, setWidth] = useState('100%');

  const baseUrl = window.location.origin;
  
  const embedCode = `<iframe 
  src="${baseUrl}" 
  width="${width}" 
  height="${height}px" 
  frameborder="0"
  style="border: none; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.08);"
  allow="fullscreen">
</iframe>`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl p-6 card-shadow">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Embed Code</h3>
      
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Width</label>
          <input
            type="text"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-spanish-teal"
            placeholder="100%"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Height (px)</label>
          <input
            type="text"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-spanish-teal"
            placeholder="600"
          />
        </div>
      </div>

      <div className="relative">
        <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto border">
          <code>{embedCode}</code>
        </pre>
        <button
          onClick={copyToClipboard}
          className="absolute top-2 right-2 p-2 bg-spanish-orange text-white rounded-lg hover:bg-opacity-90 transition-colors"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </button>
      </div>

      <div className="mt-4 p-4 bg-spanish-cream rounded-lg">
        <h4 className="font-semibold text-gray-900 mb-2">URL Parameters for Influencer Box:</h4>
        <ul className="text-sm text-gray-700 space-y-1">
          <li><code className="bg-white px-2 py-1 rounded">?influencer=InfluencerName</code> - Name to display</li>
          <li><code className="bg-white px-2 py-1 rounded">&discount=10% off</code> - Discount text</li>
          <li><code className="bg-white px-2 py-1 rounded">&code=SAVE10</code> - Discount code</li>
          <li><code className="bg-white px-2 py-1 rounded">&image=URL</code> - Optional profile image URL</li>
        </ul>
        <p className="text-xs text-gray-600 mt-2">
          Example: <code className="bg-white px-1 rounded">{baseUrl}?influencer=FutureCanoe&discount=10%25%20off&code=futurecanoe</code>
        </p>
      </div>
    </div>
  );
};

export default EmbedCode;
