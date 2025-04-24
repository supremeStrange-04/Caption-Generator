  import React, { useState } from 'react';
  import { motion } from 'framer-motion';
  import { Wand2 } from 'lucide-react';
  import { Platform } from '../types/Platform';
  import { WritingStyle } from '../types/WritingStyle';
  import { Caption } from '../types/Caption';
  import { generateCaptions } from '../services/captionService';

  interface CaptionGeneratorProps {
    onGenerate: (captions: Caption[]) => void;
    isDark: boolean;
  }

  const CaptionGenerator: React.FC<CaptionGeneratorProps> = ({ onGenerate, isDark }) => {
    const [platform, setPlatform] = useState<Platform>('linkedin');
    const [topic, setTopic] = useState('');
    const [writingStyle, setWritingStyle] = useState<WritingStyle>('professional');
    const [isLoading, setIsLoading] = useState(false);

    const handleGenerate = async () => {
      setIsLoading(true);
      try {
        const newCaptions = await generateCaptions(platform, topic, writingStyle);
        onGenerate(newCaptions);
      } catch (error) {
        console.error('Error generating captions:', error);
      }
      setIsLoading(false);
    };

    const inputClasses = `w-full px-4 py-2.5 rounded-lg transition-all duration-200 ${
      isDark
        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-indigo-400 focus:border-indigo-400'
        : 'bg-white border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
    }`;

    const labelClasses = `block text-sm font-medium mb-2 ${
      isDark ? 'text-gray-300' : 'text-gray-700'
    }`;

    return (
      <div className="space-y-6">
        <motion.h1 
          className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Caption Generator
        </motion.h1>
        
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <label className={labelClasses}>
              Select a Platform..
            </label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value as Platform)}
              className={inputClasses}
            >
              <option value="linkedin">LinkedIn</option>
              <option value="twitter">Twitter</option>
              <option value="instagram">Instagram</option>
              <option value="facebook">Facebook</option>
            </select>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <label className={labelClasses}>
              Tell us the Topic / Details of the Post ...
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Summer Sale, Akshay Tritiya Sale, etc..."
              className={inputClasses}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <label className={labelClasses}>
              Writing Style
            </label>
            <select
              value={writingStyle}
              onChange={(e) => setWritingStyle(e.target.value as WritingStyle)}
              className={inputClasses}
            >
              <option value="professional">Professional</option>
              <option value="casual">Casual</option>
              <option value="formal">Formal</option>
            </select>
          </motion.div>

          <motion.button
            onClick={handleGenerate}
            disabled={isLoading || !topic.trim()}
            className={`w-full font-medium py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${
              isLoading ? 'opacity-75 cursor-not-allowed' : ''
            } ${
              isDark 
                ? 'bg-indigo-500 hover:bg-indigo-400 text-white' 
                : 'bg-primary hover:bg-primary-dark text-white'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Wand2 className={`${isLoading ? 'animate-spin' : ''}`} size={20} />
            {isLoading ? 'Generating...' : 'Inspire Me'}
          </motion.button>
        </div>
      </div>
    );
  }

  export default CaptionGenerator;