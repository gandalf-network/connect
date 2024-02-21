import './global';
import QRCodeStyling from "qr-code-styling";
import { verifyPublicKey } from './api/publicKey';
import { APP_CLIP_BASE_URL } from "./lib/constants";
import { qrCodeStyle } from "./lib/qrCode-style";

export enum SupportedServices {
    Netflix = "netflix",
    Amazon  = "amazon",
}

export type Services = Partial<Record<SupportedServices, boolean>>;

class Connect {
	publicKey: string;
	redirectURL: string;
	services: Services;
	verificationComplete: boolean = false;

	constructor(publicKey: string, redirectURL: string, services: Services) {
		this.publicKey = publicKey;
		this.redirectURL = redirectURL;
		this.services = services;
	}

	async generateURL() {
		await this.allValidations(this.publicKey, this.redirectURL, this.services);
		const services = JSON.stringify(this.services)
		return `${APP_CLIP_BASE_URL}?services=${services}&redirectUrl=${this.redirectURL}&publicKey=${this.publicKey}`
	}

	async generateQRCode() {
		await this.allValidations(this.publicKey, this.redirectURL, this.services);
		const services = JSON.stringify(this.services)
		const url = `${APP_CLIP_BASE_URL}?services=${services}&redirectUrl=${this.redirectURL}&publicKey=${this.publicKey}`
		const qrCode = new QRCodeStyling(qrCodeStyle(url));

		return qrCode
	}

	static getDataKeyFromURL(inputURL: string) {
		const url = new URL(inputURL);
		const dataKey = url.searchParams.get('dataKey');

		if (!dataKey) {
			throw new Error(`Datakey not found in the URL ${inputURL}`)
		}
		return dataKey
	}

	private async allValidations(publicKey: string, redirectURL: string, services: Services): Promise<void> {
		if (!this.verificationComplete) {
			await Connect.validatePublicKey(publicKey);
			Connect.validateRedirectURL(redirectURL);
			Connect.validateInputServices(services);
		}

		this.verificationComplete = true;
	}

	private static async validatePublicKey(publicKey: string): Promise<void> {
		const publicKeyExists = await verifyPublicKey(publicKey);
		if (!publicKeyExists) {
			throw new Error('Public key does not exist');
		}
	}

	private static validateInputServices(input: Services): void {
		const validKeys = Object.values(SupportedServices);
		type stringArray = string[];
		let unsupportedServices:stringArray = []
    let requiredServices = 0
		for (const key in input) {
			if (!validKeys.includes(key as SupportedServices)) {
				unsupportedServices = [...unsupportedServices, key]
        continue
			}
      if (input[key as SupportedServices]) requiredServices++
		}

		if (unsupportedServices.length > 0) {
			throw new Error(`These services ${unsupportedServices.join(' ')} are unsupported`)
		}

    if (requiredServices < 1) {
      throw new Error("At least one service has to be required")
    }
	}
	
	private static validateRedirectURL(url: string): void {
		try {
			Boolean(new URL(url));
		} catch (e) {
			throw new Error('Invalid redirectURL');
		}
	}
}

export default Connect