import dotenv from 'dotenv';
dotenv.config();

export const WATSON_URL = process.env.WATSON_URL as string;
export const UNIVERSAL_APP_CLIP_BASE_URL = process.env
  .UNIVERSAL_APP_CLIP_BASE_URL as string;
export const IOS_APP_CLIP_BASE_URL = process.env
  .IOS_APP_CLIP_BASE_URL as string;
export const ANDROID_APP_CLIP_BASE_URL = process.env
  .ANDROID_APP_CLIP_BASE_URL as string;
