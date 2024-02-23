import { verifyPublicKey } from "../api/publicKey";
import { getSupportedServices } from "../api/supportedServices";
import { Services } from "../connect";
import Connect from "../index";
import { APP_CLIP_BASE_URL } from "../lib/constants";

jest.mock('../api/publicKey', () => ({
  verifyPublicKey: jest.fn()
}));

jest.mock('../api/supportedServices', () => ({
  getSupportedServices: jest.fn()
}));

describe('Connect SDK', () => {
  const publicKey = 'examplePublicKey';
  const redirectURL = 'https://example.com';
  const services = {"NETFLIX": true}
  const stringServices = JSON.stringify(services)
  
  beforeEach(() => {
    (verifyPublicKey as jest.Mock).mockResolvedValue(true);
    (getSupportedServices as jest.Mock).mockResolvedValue(["netflix"]);
  })

  afterEach(() => {
    (getSupportedServices as jest.Mock).mockClear();
  });

  describe('Constructor', () => {  
    it('should initialize publicKey and redirectURL properly', async () => {
      const connect = new Connect(publicKey, redirectURL, services);
      
      expect(connect.publicKey).toEqual(publicKey);
      expect(connect.redirectURL).toEqual(redirectURL);
    });

    it('should strip the redirect url of trailing slashes', async () => {
      const redirectURL = 'https://example.com/';
      const connect = new Connect(publicKey, redirectURL, services);

      expect(connect.redirectURL).toEqual('https://example.com')
    });
  });

  describe('allValidations', () => {
    it('should pass all validations and call verifyPublicKey only once', async () => {

      const connect = new Connect(publicKey, redirectURL, services);
      await connect.generateURL();
      await connect.generateQRCode();

      expect(connect.verificationComplete).toEqual(true)
      expect(verifyPublicKey as jest.Mock).toHaveBeenCalledTimes(1)
    });

    it('should throw error if publicKey is invalid', async () => {
      const publicKey = 'invalidPublicKey';
      const connect = new Connect(publicKey, redirectURL, services);
      (verifyPublicKey as jest.Mock).mockResolvedValue(false);

      await expect(connect.generateURL()).rejects.toThrow('Public key does not exist');
      expect(connect.verificationComplete).toEqual(false);
    });

    it('should throw error if redirectURL is invalid', async () => {
      const invalidRedirectURL = 'not a valid URL';
      const connect = new Connect(publicKey, invalidRedirectURL, services);

      await expect(connect.generateURL()).rejects.toThrow('Invalid redirectURL');
      expect(connect.verificationComplete).toEqual(false);
    });

    it('should throw error if invalid service is passed', async () => {
      const invalidServices = {"twitter": true, "showmax": false} as Services
      const connect = new Connect(publicKey, redirectURL, invalidServices);

      await expect(connect.generateURL()).rejects.toThrow(
        `These services ${Object.keys(invalidServices).join(' ')} are unsupported`
      );
      expect(connect.verificationComplete).toEqual(false);
    });

    it('should throw error if no required service is passed', async () => {
      const invalidServices = {"NETFLIX": false}
      const connect = new Connect(publicKey, redirectURL, invalidServices);

      await expect(connect.generateURL()).rejects.toThrow('At least one service has to be required');
      expect(connect.verificationComplete).toEqual(false);
    });
  });

  describe('generateURL', () => {
    it('should generate the correct URL', async () => {
      const connect = new Connect(publicKey, redirectURL, services);
      const generatedURL = await connect.generateURL();
      expect(generatedURL).toEqual(encodeURI(`${APP_CLIP_BASE_URL}?services=${stringServices}&redirectUrl=${redirectURL}&publicKey=${publicKey}`));
    });
  });

  describe('generateQRCode', () => {
    it('should create QR code with correct options', async () => {
      const connect = new Connect(publicKey, redirectURL, services);
      const qrCode = await connect.generateQRCode();
      expect(qrCode._options.data).toEqual(encodeURI(`${APP_CLIP_BASE_URL}?services=${stringServices}&redirectUrl=${redirectURL}&publicKey=${publicKey}`))
    });
  });

  describe('getDataKeyFromURL', () => {
    it('should get the data key from the url', () => {
      const url = 'https://dashboard.doppler.com/connect=success?dataKey=11221122'
      const dataKey = Connect.getDataKeyFromURL(url);
      expect(dataKey).toEqual('11221122')
    });

    it('should throw data key not found error', () => {
      const url = 'https://dashboard.doppler.com/connect=success?noDataKey=11221122'
      expect(() => Connect.getDataKeyFromURL(url)).toThrow(`Datakey not found in the URL ${url}`);
    });
  });

  describe('getSupportedServices', () => {
    it('should get the supported services', async () => {
      await Connect.getSupportedServices();
      expect(getSupportedServices as jest.Mock).toHaveBeenCalledTimes(1)
    });
  });
});