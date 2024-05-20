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
import {
  Platform,
  ConnectInput,
  GandalfErrorCode,
  InputData,
  Service,
} from './types';

let QRCodeStyling: any;

if (typeof window !== 'undefined') {
  import('qr-code-styling').then((module) => {
    QRCodeStyling = module.default;
  });
}

class Connect {
  publicKey: string;
  redirectURL: string;
  data: InputData;
  platform: Platform = Platform.ios;
  verificationComplete: boolean = false;

  constructor(input: ConnectInput) {
    if (input.redirectURL.endsWith('/')) {
      input.redirectURL = input.redirectURL.slice(0, -1);
    }
    this.publicKey = input.publicKey;
    this.redirectURL = input.redirectURL;
    this.data = input.data;
    this.platform = input.platform ? input.platform : Platform.ios;
  }

  async generateURL(): Promise<string> {
    await this.allValidations(this.publicKey, this.redirectURL, this.data);
    const data = JSON.stringify(this.data);
    const appClipURL = this.encodeComponents(
      data,
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
    data: string,
    redirectUrl: string,
    publicKey: string,
  ): string {
    let BASE_URL = IOS_APP_CLIP_BASE_URL;
    switch (this.platform) {
      case Platform.android:
        BASE_URL = ANDROID_APP_CLIP_BASE_URL;
        break;
      case Platform.universal:
        BASE_URL = UNIVERSAL_APP_CLIP_BASE_URL;
        break;
    }

    const base64Data = btoa(data);
    const url = new URL(BASE_URL);
    const params: Record<string, string> = {
      publicKey,
      redirectUrl,
      data: base64Data,
    };

    Object.keys(params).forEach((key) =>
      url.searchParams.append(key, params[key]),
    );

    return url.toString();
  }

  private async allValidations(
    publicKey: string,
    redirectURL: string,
    data: InputData,
  ): Promise<void> {
    if (!this.verificationComplete) {
      await Connect.validatePublicKey(publicKey);
      Connect.validateRedirectURL(redirectURL);
      const cleanServices = await Connect.validateInputData(data);
      this.data = cleanServices;
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

  private static async validateInputData(input: InputData): Promise<InputData> {
    const services = await getSupportedServices();
    const cleanServices: InputData = {};

    let unsupportedServices: string[] = [];
    for (const key in input) {
      if (!services.includes(key.toLowerCase() as Source)) {
        unsupportedServices = [...unsupportedServices, key];
        continue;
      }

      this.validateInputService(input[key]);
      cleanServices[key.toLowerCase()] = input[key as Source];
    }

    if (unsupportedServices.length > 0) {
      throw new GandalfError(
        `These services ${unsupportedServices.join(' ')} are unsupported`,
        GandalfErrorCode.InvalidService,
      );
    }

    return cleanServices;
  }

  private static validateInputService(input: Service): void {
    if (
      (input.activities?.length ?? 0) < 1 &&
      (input.traits?.length ?? 0) < 1
    ) {
      throw new GandalfError(
        'At least one trait or activity is required',
        GandalfErrorCode.InvalidService,
      );
    }
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
