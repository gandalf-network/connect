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

	constructor(publicKey: string, redirectURL: string, services: Services) {
		this.publicKey = publicKey;
		this.redirectURL = redirectURL;
		this.services = services;
	}

	generateURL() {
		const v = JSON.stringify(this.services)
	
		return `${APP_CLIP_BASE_URL}?services=${v}&redirectUrl=${this.redirectURL}&publicKey=${this.publicKey}`
	}

	outputQRCode() {
		const v = JSON.stringify(this.services)
		const url = `${APP_CLIP_BASE_URL}?services=${v}&redirectUrl=${this.redirectURL}&publicKey=${this.publicKey}`
		const qrCode = new QRCodeStyling(qrCodeStyle(url));

		return qrCode
	}

	static async create(publicKey: string, redirectURL: string, services: Services): Promise<Connect> {
        await Connect.validatePublicKey(publicKey);
        Connect.validateRedirectURL(redirectURL);
		Connect.validateInputServices(services);
        return new Connect(publicKey, redirectURL, services);
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
		for (const key in input) {
			if (!validKeys.includes(key as SupportedServices)) {
				unsupportedServices = [...unsupportedServices, key]
			}
		}

		if (unsupportedServices.length > 0) {
			throw new Error(`These services ${unsupportedServices.join(' ')} are unsupported`)
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