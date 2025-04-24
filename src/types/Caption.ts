import { Platform } from './Platform';
import { WritingStyle } from './WritingStyle';

export interface Caption {
  platform: Platform;
  style: WritingStyle;
  topic: string;
  text: string;
}