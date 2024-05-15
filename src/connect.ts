import { verifyPublicKey } from './api/publicKey';
import {
  ANDROID_APP_CLIP_BASE_URL,
  IOS_APP_CLIP_BASE_URL,
  UNIVERSAL_APP_CLIP_BASE_URL,
} from './lib/constants';
import qrCodeStyle from './lib/qrCode-style';

import { Source } from './api/__generated__/graphql';
import { getSupportedServices } from './api/supportedServices';
import GandalfError from './lib/errors';
import { Services, Platform, ConnectInput, GandalfErrorCode } from './types';

let QRCodeStyling: any;

if (typeof window !== 'undefined') {
  import('qr-code-styling').then((module) => {
    QRCodeStyling = module.default;
  });
}

class Connect {
  publicKey: string;
  redirectURL: string;
  services: Services;
  platform: Platform = Platform.ios;
  verificationComplete: boolean = false;

  constructor(input: ConnectInput) {
    if (input.redirectURL.endsWith('/')) {
      input.redirectURL = input.redirectURL.slice(0, -1);
    }
    this.publicKey = input.publicKey;
    this.redirectURL = input.redirectURL;
    this.services = input.services;
    this.platform = input.platform ? input.platform : Platform.ios;
  }

  async generateURL(): Promise<string> {
    await this.allValidations(this.publicKey, this.redirectURL, this.services);
    const services = JSON.stringify(this.services);
    const appClipURL = this.encodeComponents(
      services,
      this.redirectURL,
      this.publicKey,
    );
    return appClipURL;
  }

  async generateQRCode(): Promise<string> {
    if (typeof window === 'undefined') {
      throw new GandalfError(
        'QrCode generation only works in browsers',
        GandalfErrorCode.QRCodeGenNotSupported,
      );
    }

    const appClipURL = await this.generateURL();
    const qrCode = new QRCodeStyling(qrCodeStyle(appClipURL));
    try {
      const qrCodeBlob = await qrCode.getRawData('webp');
      if (!qrCodeBlob) {
        throw new GandalfError(
          'QRCode Generation Error',
          GandalfErrorCode.QRCodeNotGenerated,
        );
      }
      const qrCodeURL = URL.createObjectURL(qrCodeBlob);
      return qrCodeURL;
    } catch (error: any) {
      throw new GandalfError(
        error.message,
        GandalfErrorCode.QRCodeNotGenerated,
      );
    }
  }

  static async getSupportedServices(): Promise<string[]> {
    const services = await getSupportedServices();
    return services;
  }

  static getDataKeyFromURL(redirectURL: string): string {
    Connect.validateRedirectURL(redirectURL);
    const url = new URL(redirectURL);
    const dataKey = url.searchParams.get('dataKey');

    if (!dataKey) {
      throw new GandalfError(
        `Datakey not found in the URL ${redirectURL}`,
        GandalfErrorCode.DataKeyNotFound,
      );
    }
    return dataKey;
  }

  private encodeComponents(
    services: string,
    redirectURL: string,
    publicKey: string,
  ): string {
    const encodedServices = encodeURIComponent(services);
    const encodedRedirectURL = encodeURIComponent(redirectURL);
    const encodedPublicKey = encodeURIComponent(publicKey);

    let BASE_URL = IOS_APP_CLIP_BASE_URL;
    switch (this.platform) {
      case Platform.android:
        BASE_URL = ANDROID_APP_CLIP_BASE_URL;
        break;
      case Platform.universal:
        BASE_URL = UNIVERSAL_APP_CLIP_BASE_URL;
        break;
    }
    return `${BASE_URL}&services=${encodedServices}&redirectUrl=${encodedRedirectURL}&publicKey=${encodedPublicKey}`;
  }

  private async allValidations(
    publicKey: string,
    redirectURL: string,
    services: Services,
  ): Promise<void> {
    if (!this.verificationComplete) {
      await Connect.validatePublicKey(publicKey);
      Connect.validateRedirectURL(redirectURL);
      const cleanServices = await Connect.validateInputServices(services);
      this.services = cleanServices;
    }

    this.verificationComplete = true;
  }

  private static async validatePublicKey(publicKey: string): Promise<void> {
    const isValidPublicKey = await verifyPublicKey({ publicKey });
    if (!isValidPublicKey) {
      throw new GandalfError(
        'Public key does not exist',
        GandalfErrorCode.InvalidPublicKey,
      );
    }
  }

  private static async validateInputServices(
    input: Services,
  ): Promise<Services> {
    const services = await getSupportedServices();
    const cleanServices: Services = {};

    let unsupportedServices: string[] = [];
    let requiredServices = 0;
    for (const key in input) {
      if (!services.includes(key.toLowerCase() as Source)) {
        unsupportedServices = [...unsupportedServices, key];
        continue;
      }
      if (input[key as Source]) requiredServices++;
      cleanServices[key.toLocaleLowerCase()] = input[key as Source];
    }

    if (unsupportedServices.length > 0) {
      throw new GandalfError(
        `These services ${unsupportedServices.join(' ')} are unsupported`,
        GandalfErrorCode.InvalidService,
      );
    }

    if (requiredServices < 1) {
      throw new GandalfError(
        'At least one service has to be required',
        GandalfErrorCode.InvalidService,
      );
    }
    return cleanServices;
  }

  private static validateRedirectURL(url: string): void {
    try {
      Boolean(new URL(url));
    } catch (e) {
      throw new GandalfError(
        'Invalid redirectURL',
        GandalfErrorCode.InvalidRedirectURL,
      );
    }
  }
}

export default Connect;
