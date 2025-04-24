import { Platform } from '../types/Platform';

interface PlatformConfig {
  name: string;
  color: string;
  description: string;
  characterLimit?: number;
  prompt: string;
}

export const platformConfig: Record<Platform, PlatformConfig> = {
  instagram: {
    name: 'Instagram',
    color: '#E1306C',
    description: 'Vibrant, visual captions with emojis and hashtags',
    characterLimit: 2200,
    prompt: 'Generate an engaging Instagram caption that is vibrant, emoji-friendly, and optimized with hashtags for'
  },
  twitter: {
    name: 'Twitter',
    color: '#1DA1F2',
    description: 'Concise, punchy tweets optimized for engagement',
    characterLimit: 280,
    prompt: 'Create a concise, punchy Twitter tweet within the character limit that will drive engagement about'
  },
  linkedin: {
    name: 'LinkedIn',
    color: '#0077B5',
    description: 'Professional content with industry insights',
    characterLimit: 3000,
    prompt: 'Write a professional LinkedIn post with industry-relevant insights about'
  },
  facebook: {
    name: 'Facebook',
    color: '#1877F2',
    description: 'Conversational posts that foster community',
    characterLimit: 63206,
    prompt: 'Generate a conversational Facebook post that fosters community engagement about'
  }
};