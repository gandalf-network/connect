export type InputData = {
  [key: string]: Service;
};

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
  data: InputData;
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
