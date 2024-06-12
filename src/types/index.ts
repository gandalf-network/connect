import { ActivityType, Source, TraitLabel } from '../api/__generated__/graphql';

export type InputData = {
  [key: string]: boolean | Service;
};

export { Source, TraitLabel, ActivityType };

export type Service = {
  traits?: string[];
  activities?: string[];
};

export enum Platform {
  universal = 'UNIVERSAL',
  ios = 'IOS',
  android = 'ANDROID',
}

export type ConnectInput = {
  publicKey: string;
  redirectURL: string;
  services: InputData;
  platform?: Platform;
};

export enum GandalfErrorCode {
  InvalidPublicKey = 'INVALID_PUBLIC_KEY',
  InvalidRedirectURL = 'INVALID_REDIRECT_URL',
  InvalidService = 'INVALID_SERVICE',
  DataKeyNotFound = 'DATA_KEY_NOT_FOUND',
  QRCodeNotGenerated = 'QR_CODE_NOT_GENERATED',
  QRCodeGenNotSupported = 'QR_CODE_GEN_NOT_SUPPORTED',
}
