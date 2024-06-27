import { verifyPublicKey } from './api/publicKey';
import {
  ANDROID_APP_CLIP_BASE_URL,
  IOS_APP_CLIP_BASE_URL,
  UNIVERSAL_APP_CLIP_BASE_URL,
} from './lib/constants';
import qrCodeStyle from './lib/qrCode-style';

import { Source } from './api/__generated__/graphql';
import {
  getSupportedServicesAndTraits,
  SupportedServicesAndTraits,
} from './api/supportedServices';
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
  platform: Platform = Platform.IOS;
  verificationComplete: boolean = false;
  useAlphaVersionParams: boolean = false;

  constructor(input: ConnectInput) {
    if (input.redirectURL.endsWith('/')) {
      input.redirectURL = input.redirectURL.slice(0, -1);
    }
    this.publicKey = input.publicKey;
    this.redirectURL = input.redirectURL;
    this.data = input.services;
    this.platform = input.platform ? input.platform : Platform.IOS;
    this.useAlphaVersionParams = !!input.useAlphaVersionParams;
  }

  async generateURL(): Promise<string> {
    // Check and add the required property for each service
    const updatedData: InputData = {};
    for (const service in this.data) {
      const serviceData = this.data[service];
      if (typeof serviceData === 'boolean') {
        updatedData[service] = serviceData;
      } else {
        updatedData[service] = {
          ...serviceData,
          required:
            serviceData.required === undefined ? true : serviceData.required,
        };
      }
    }

    this.data = updatedData;
    await this.allValidations(this.publicKey, this.redirectURL, this.data);
    const data = JSON.stringify(this.data);
    let appClipURL = '';

    if (this.useAlphaVersionParams) {
      appClipURL = this.encodeLegacyComponents(
        data,
        this.redirectURL,
        this.publicKey,
      );
    } else {
      appClipURL = this.encodeComponents(
        data,
        this.redirectURL,
        this.publicKey,
      );
    }

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

  static async getSupportedServicesAndTraits() {
    return await getSupportedServicesAndTraits();
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
      case Platform.ANDROID:
        BASE_URL = ANDROID_APP_CLIP_BASE_URL;
        break;
      case Platform.UNIVERSAL:
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

  private encodeLegacyComponents(
    services: string,
    redirectUrl: string,
    publicKey: string,
  ): string {
    let BASE_URL = IOS_APP_CLIP_BASE_URL;
    switch (this.platform) {
      case Platform.ANDROID:
        BASE_URL = ANDROID_APP_CLIP_BASE_URL;
        break;
      case Platform.UNIVERSAL:
        BASE_URL = UNIVERSAL_APP_CLIP_BASE_URL;
        break;
    }

    const url = new URL(BASE_URL);
    const params: Record<string, string> = {
      publicKey,
      redirectUrl,
      services,
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
      const cleanServices = await Connect.validateInputData(
        data,
        this.useAlphaVersionParams,
      );
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

  private static async validateInputData(
    input: InputData,
    useAlphaVersionParams: boolean = false,
  ): Promise<InputData> {
    const supportedServicesAndTraits = await getSupportedServicesAndTraits();
    const cleanServices: InputData = {};

    let unsupportedServices: string[] = [];
    let atLeastOneServiceRequired = false;

    const keys = Object.keys(input);

    for (const key of keys) {
      if (
        !supportedServicesAndTraits.services.includes(
          key.toLocaleLowerCase() as Source,
        )
      ) {
        unsupportedServices = [...unsupportedServices, key];
        continue;
      }

      const service = input[key];
      if (typeof service === 'boolean' || useAlphaVersionParams) {
        if (!service)
          throw new GandalfError(
            'At least one service must be required',
            GandalfErrorCode.InvalidService,
          );
        cleanServices[key.toLowerCase()] = true;
        atLeastOneServiceRequired = true;
      } else {
        this.validateInputService(service, supportedServicesAndTraits);
        cleanServices[key.toLowerCase()] = input[key as Source];
        if (service.required) {
          atLeastOneServiceRequired = true;
        }
      }
    }

    if (unsupportedServices.length > 0) {
      throw new GandalfError(
        `These services [ ${unsupportedServices.join(', ')} ] are unsupported`,
        GandalfErrorCode.InvalidService,
      );
    }

    if (!atLeastOneServiceRequired) {
      throw new GandalfError(
        'At least one service must be required',
        GandalfErrorCode.InvalidService,
      );
    }

    return cleanServices;
  }

  private static validateInputService(
    input: Service,
    supportedServicesAndTraits: SupportedServicesAndTraits,
  ): void {
    if (
      (input.activities?.length ?? 0) < 1 &&
      (input.traits?.length ?? 0) < 1
    ) {
      throw new GandalfError(
        'At least one trait or activity is required',
        GandalfErrorCode.InvalidService,
      );
    }

    let unsupportedActivities: string[] = [];
    let unsupportedTraits: string[] = [];

    if (input.activities) {
      for (const key of input.activities) {
        if (
          !supportedServicesAndTraits.activities.includes(key.toLowerCase())
        ) {
          unsupportedActivities = [...unsupportedActivities, key];
          continue;
        }
      }
    }

    if (input.traits) {
      for (const key of input.traits) {
        if (!supportedServicesAndTraits.traits.includes(key.toLowerCase())) {
          unsupportedTraits = [...unsupportedTraits, key];
          continue;
        }
      }
    }

    if (unsupportedActivities.length > 0) {
      throw new GandalfError(
        `These activities [ ${unsupportedActivities.join(', ')} ] are unsupported`,
        GandalfErrorCode.InvalidService,
      );
    }

    if (unsupportedTraits.length > 0) {
      throw new GandalfError(
        `These traits [ ${unsupportedTraits.join(', ')} ] are unsupported`,
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
