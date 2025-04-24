import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import { Caption } from '../types/Caption';

interface CaptionCardProps {
  caption: Caption;
  isDark: boolean;
}

const CaptionCard: React.FC<CaptionCardProps> = ({ caption, isDark }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(caption.text);
    setCopied(true);
    toast.success('Caption copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      className={`rounded-2xl p-6 shadow-lg backdrop-blur-sm group relative transition-colors duration-300 ${
        isDark 
          ? 'bg-gray-800/50 border border-gray-700' 
          : 'bg-white/80 border border-gray-100'
      }`}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex gap-2 mb-4">
        <span className={`px-3 py-1 rounded-full text-sm ${
          isDark 
            ? 'bg-indigo-900/50 text-indigo-300' 
            : 'bg-indigo-100 text-indigo-700'
        }`}>
          {caption.platform}
        </span>
        <span className={`px-3 py-1 rounded-full text-sm ${
          isDark 
            ? 'bg-emerald-900/50 text-emerald-300' 
            : 'bg-emerald-100 text-emerald-700'
        }`}>
          {caption.style}
        </span>
      </div>
      
      <div className="space-y-2">
        <div className="flex gap-2">
          <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Topic:
          </span>
          <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
            {caption.topic}
          </span>
        </div>
        <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>
          {caption.text}
        </p>
      </div>

      <motion.button
        onClick={handleCopy}
        className={`absolute top-4 right-4 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-200 ${
          isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-50'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {copied ? (
          <Check size={18} className="text-green-500" />
        ) : (
          <Copy size={18} className={isDark ? 'text-gray-400' : 'text-gray-500'} />
        )}
      </motion.button>
    </motion.div>
  );
};

export default CaptionCard;