import { Platform } from '../types/Platform';
import { WritingStyle } from '../types/WritingStyle';
import { Caption } from '../types/Caption';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export const generateCaptions = async (
  platform: Platform,
  topic: string,
  style: WritingStyle,
  customContext?: string
): Promise<Caption[]> => {
  if (!platform) {
    throw new Error('Please select a platform.');
  }

  const prompt = `Write 3 different, engaging, emoji-rich social media captions in a ${style} style for the platform ${platform}.
Each caption should be a separate paragraph, ready to post as-is. 
${customContext ? `Context: ${customContext}` : `Topic: ${topic}`} 
Make them punchy and full of excitement like real posts.`

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await response.json();
    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

    const captionTexts = rawText
      .split(/\n\s*\n/) 
      .filter((text: string) => text.trim().length > 0)
      .slice(0, 3); 

    if (captionTexts.length === 0) {
      return [{
        platform,
        style,
        topic,
        text: 'No captions found.',
      }];
    }

    return captionTexts.map((text: string) => ({
      platform,
      style,
      topic,
      text: text.trim(),
    }));
    
  } catch (error) {
    console.error('Error generating captions:', error);
    return [{
      platform,
      style,
      topic,
      text: 'Error generating captions.',
    }];
  }
};
