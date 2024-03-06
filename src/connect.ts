import './global';
import QRCodeStyling from "qr-code-styling";
import { verifyPublicKey } from './api/publicKey';
import { APP_CLIP_BASE_URL } from "./lib/constants";
import { qrCodeStyle } from "./lib/qrCode-style";
import { Source } from './api/__generated__/graphql';
import { getSupportedServices } from './api/supportedServices';
import { GandalfError, GandalfErrorCode } from './lib/errors';

export type Services = {
    [key: string]: boolean;
}

export type ConnectInput = {
	publicKey: string;
	redirectURL: string;
	services: Services;
}

class Connect {
	publicKey: string;
	redirectURL: string;
	services: Services;
	verificationComplete: boolean = false;

	constructor(input: ConnectInput) {
    if (input.redirectURL.endsWith('/')) {
      input.redirectURL = input.redirectURL.slice(0, -1)
    }
		this.publicKey   = input.publicKey;
		this.redirectURL = input.redirectURL;
		this.services    = input.services;
	}

	async generateURL(): Promise<string> {
		await this.allValidations(this.publicKey, this.redirectURL, this.services);
		const services = JSON.stringify(this.services)
    	return encodeURI(`${APP_CLIP_BASE_URL}?services=${services}&redirectUrl=${this.redirectURL}&publicKey=${this.publicKey}`)
	}

	async generateQRCode(): Promise<string> {
		if (typeof window == 'undefined') {
			throw new GandalfError("QrCode generation only works in browsers", GandalfErrorCode.QRCodeGenNotSupported)
		}
		await this.allValidations(this.publicKey, this.redirectURL, this.services);
		const services = JSON.stringify(this.services)
		const url = encodeURI(`${APP_CLIP_BASE_URL}?services=${services}&redirectUrl=${this.redirectURL}&publicKey=${this.publicKey}`)
		const qrCode = new QRCodeStyling(qrCodeStyle(url));
		try {
			const qrCodeBlob = await qrCode.getRawData('webp')
			if (!qrCodeBlob) {
				throw new GandalfError("QRCode Generation Error", GandalfErrorCode.QRCodeNotGenerated)
			}
			const qrCodeURL = URL.createObjectURL(qrCodeBlob);
			return qrCodeURL
		} catch (error: any) {
			throw new GandalfError(error.message, GandalfErrorCode.QRCodeNotGenerated)
		}
	}

	static async getSupportedServices(): Promise<String[]> {
		const services = await getSupportedServices();
		return services;
	}

	static getDataKeyFromURL(inputURL: string): string {
		const url = new URL(inputURL);
		const dataKey = url.searchParams.get('dataKey');

		if (!dataKey) {
			throw new GandalfError(`Datakey not found in the URL ${inputURL}`, GandalfErrorCode.DataKeyNotFound)
		}
		return dataKey
	}

	private async allValidations(publicKey: string, redirectURL: string, services: Services): Promise<void> {
		if (!this.verificationComplete) {
			await Connect.validatePublicKey(publicKey);
			await Connect.validateInputServices(services);
			Connect.validateRedirectURL(redirectURL);
		}

		this.verificationComplete = true;
	}

	private static async validatePublicKey(publicKey: string): Promise<void> {
		const isValidPublicKey = await verifyPublicKey({publicKey});
		if (!isValidPublicKey) {
			throw new GandalfError('Public key does not exist', GandalfErrorCode.InvalidPublicKey);
		}
	}

	private static async validateInputServices(input: Services): Promise<void> {
		const services = await getSupportedServices();
		let unsupportedServices:string[] = []
		let requiredServices = 0
		for (const key in input) {
			if (!services.includes(key.toLowerCase() as Source)) {
				unsupportedServices = [...unsupportedServices, key]
				continue
			}
			if (input[key as Source]) requiredServices++
		}

		if (unsupportedServices.length > 0) {
			throw new GandalfError(
				`These services ${unsupportedServices.join(' ')} are unsupported`,
				GandalfErrorCode.InvalidService
			)
		}

		if (requiredServices < 1) {
			throw new GandalfError("At least one service has to be required", GandalfErrorCode.InvalidService)
		}
	}
	
	private static validateRedirectURL(url: string): void {
		try {
			Boolean(new URL(url));
		} catch (e) {
			throw new GandalfError('Invalid redirectURL', GandalfErrorCode.InvalidRedirectURL);
		}
	}
}

export default Connect