import './global';
import QRCodeStyling from "qr-code-styling";
import { verifyPublicKey } from './api/publicKey';
import { APP_CLIP_BASE_URL } from "./lib/constants";
import { qrCodeStyle } from "./lib/qrCode-style";
import { Source } from './api/__generated__/graphql';
import { getSupportedServices } from './api/supportedServices';
import { ConnectError, ErrorCodes } from './lib/errors';

export type Services = {
    [key: string]: boolean;
}

class Connect {
	publicKey: string;
	redirectURL: string;
	services: Services;
	verificationComplete: boolean = false;

	constructor(publicKey: string, redirectURL: string, services: Services) {
    if (redirectURL.endsWith('/')) {
      redirectURL = redirectURL.slice(0, -1)
    }

		this.publicKey = publicKey;
		this.redirectURL = redirectURL;
		this.services = services;
	}

	async generateURL() {
		await this.allValidations(this.publicKey, this.redirectURL, this.services);
		const services = JSON.stringify(this.services)
    return encodeURI(`${APP_CLIP_BASE_URL}?services=${services}&redirectUrl=${this.redirectURL}&publicKey=${this.publicKey}`)
	}

	async generateQRCode() {
		await this.allValidations(this.publicKey, this.redirectURL, this.services);
		const services = JSON.stringify(this.services)
		const url = encodeURI(`${APP_CLIP_BASE_URL}?services=${services}&redirectUrl=${this.redirectURL}&publicKey=${this.publicKey}`)
		const qrCode = new QRCodeStyling(qrCodeStyle(url));

		return qrCode
	}

	static async getSupportedServices(): Promise<String[]> {
		const services = await getSupportedServices();
		return services;
	}

	static getDataKeyFromURL(inputURL: string) {
		const url = new URL(inputURL);
		const dataKey = url.searchParams.get('dataKey');

		if (!dataKey) {
			throw new ConnectError(`Datakey not found in the URL ${inputURL}`, ErrorCodes.DataKeyNotFound)
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
		const isValidPublicKey = await verifyPublicKey(publicKey);
		if (!isValidPublicKey) {
			throw new ConnectError('Public key does not exist', ErrorCodes.InvalidPublicKey);
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
			throw new ConnectError(
				`These services ${unsupportedServices.join(' ')} are unsupported`,
				ErrorCodes.InvalidService
			)
		}

		if (requiredServices < 1) {
			throw new ConnectError("At least one service has to be required", ErrorCodes.InvalidService)
		}
	}
	
	private static validateRedirectURL(url: string): void {
		try {
			Boolean(new URL(url));
		} catch (e) {
			throw new ConnectError('Invalid redirectURL', ErrorCodes.InvalidRedirectURL);
		}
	}
}

export default Connect