import React, { useState } from 'react';
import { Check, Copy, Instagram, Twitter, Linkedin, Facebook } from 'lucide-react';
import { Platform } from '../types/Platform';
import { platformConfig } from '../config/platformConfig';

interface ResultsSectionProps {
  caption: string;
  platform: Platform;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({ caption, platform }) => {
  const [copied, setCopied] = useState(false);
  const { color, name } = platformConfig[platform];
  
  const handleCopy = () => {
    navigator.clipboard.writeText(caption);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const PlatformIcon = () => {
    switch (platform) {
      case 'instagram':
        return <Instagram size={24} className="text-pink-500" />;
      case 'twitter':
        return <Twitter size={24} className="text-blue-400" />;
      case 'linkedin':
        return <Linkedin size={24} className="text-blue-700" />;
      case 'facebook':
        return <Facebook size={24} className="text-blue-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="border-t border-gray-200 bg-gray-50 p-6 rounded-b-xl">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <PlatformIcon />
          <h3 className="ml-2 text-lg font-medium" style={{ color }}>
            {name} Caption
          </h3>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center justify-center py-1 px-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
        >
          {copied ? (
            <>
              <Check size={16} className="mr-1 text-green-500" />
              Copied!
            </>
          ) : (
            <>
              <Copy size={16} className="mr-1 text-gray-500" />
              Copy
            </>
          )}
        </button>
      </div>
      <div className="bg-white border border-gray-200 rounded-lg p-4 whitespace-pre-line">
        {caption}
      </div>
      <p className="mt-3 text-xs text-gray-500">
        Character count: {caption.length}
        {platformConfig[platform].characterLimit && 
          ` / ${platformConfig[platform].characterLimit}`
        }
      </p>
    </div>
  );
};

export default ResultsSection;