import React from 'react';
import { Instagram, Twitter, Linkedin, Facebook } from 'lucide-react';
import { Platform } from '../types/Platform';
import { platformConfig } from '../config/platformConfig';

interface PlatformSelectorProps {
  selectedPlatform: Platform;
  onSelectPlatform: (platform: Platform) => void;
}

const PlatformSelector: React.FC<PlatformSelectorProps> = ({ 
  selectedPlatform, 
  onSelectPlatform 
}) => {
  return (
    <div className="mb-6">
      <label htmlFor="platform" className="block text-sm font-medium text-gray-700 mb-2">
        Select Platform
      </label>
      <div className="relative">
        <select
          id="platform"
          value={selectedPlatform}
          onChange={(e) => onSelectPlatform(e.target.value as Platform)}
          className="block w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-lg shadow-sm"
        >
          {Object.entries(platformConfig).map(([platform, config]) => (
            <option key={platform} value={platform}>
              {config.name}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          {selectedPlatform === 'instagram' && <Instagram size={20} className="text-pink-500" />}
          {selectedPlatform === 'twitter' && <Twitter size={20} className="text-blue-400" />}
          {selectedPlatform === 'linkedin' && <Linkedin size={20} className="text-blue-700" />}
          {selectedPlatform === 'facebook' && <Facebook size={20} className="text-blue-600" />}
        </div>
      </div>
      <p className="mt-2 text-sm text-gray-500">
        {platformConfig[selectedPlatform].description}
      </p>
    </div>
  );
};

export default PlatformSelector;