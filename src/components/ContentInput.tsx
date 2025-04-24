import React from 'react';
import { Platform } from '../types/Platform';
import { platformConfig } from '../config/platformConfig';

interface ContentInputProps {
  content: string;
  setContent: (content: string) => void;
  selectedPlatform: Platform;
}

const ContentInput: React.FC<ContentInputProps> = ({ 
  content, 
  setContent,
  selectedPlatform 
}) => {
  const { characterLimit } = platformConfig[selectedPlatform];
  const characterCount = content.length;
  const isApproachingLimit = characterLimit && characterCount > characterLimit * 0.8;
  const isOverLimit = characterLimit && characterCount > characterLimit;

  return (
    <div className="mb-6">
      <label 
        htmlFor="content" 
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        What's your caption about?
      </label>
      <textarea
        id="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={`Enter topic or idea for your ${platformConfig[selectedPlatform].name} caption...`}
        className={`w-full p-3 border rounded-lg shadow-sm min-h-[120px] focus:ring-2 focus:outline-none ${
          isOverLimit 
            ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
            : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-200'
        }`}
      />
      
      <div className="mt-2 flex justify-between items-center">
        <p className="text-sm text-gray-500">
          Be specific about your content to get better results
        </p>
        
        {characterLimit ? (
          <p className={`text-sm font-medium ${
            isOverLimit 
              ? 'text-red-500' 
              : isApproachingLimit 
                ? 'text-amber-500' 
                : 'text-gray-500'
          }`}>
            {characterCount} / {characterLimit}
          </p>
        ) : (
          <p className="text-sm text-gray-500">
            {characterCount} characters
          </p>
        )}
      </div>
    </div>
  );
};

export default ContentInput;