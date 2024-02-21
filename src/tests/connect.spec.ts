import { verifyPublicKey } from "../api/publicKey";
import { Services } from "../connect";
import Connect from "../index";
import { APP_CLIP_BASE_URL } from "../lib/constants";

jest.mock('../api/publicKey', () => ({
  verifyPublicKey: jest.fn()
}));

jest.setTimeout(10000)

describe('Connect SDK', () => {
  const publicKey = 'examplePublicKey';
  const redirectURL = 'https://example.com';
  const services = {"amazon": true, "netflix": false}
  const stringServices = JSON.stringify(services)

  beforeEach(() => {
    (verifyPublicKey as jest.Mock).mockResolvedValue(true);
  })

  describe('Constructor', () => {  
    it('should initialize publicKey and redirectURL properly', async () => {
      const connect = new Connect(publicKey, redirectURL, services);
      
      expect(connect.publicKey).toEqual(publicKey);
      expect(connect.redirectURL).toEqual(redirectURL);
    });

    it('should throw error if redirectURL is invalid', async () => {
      const invalidRedirectURL = 'not a valid URL';

      expect(() => new Connect('examplePublicKey', invalidRedirectURL, services)).toThrow('Invalid redirectURL');
    });

    it('should throw error if invalid service is passed', async () => {
      const services = {"twitter": true, "showmax": false} as Services

      expect(() => new Connect('examplePublicKey', redirectURL, services)).toThrow(
        `These services ${Object.keys(services).join(' ')} are unsupported`
      );
    });
  });

  describe('generateURL', () => {
    it('should generate the correct URL', async () => {
      const connect = new Connect(publicKey, redirectURL, services);
      const generatedURL = await connect.generateURL();
      expect(generatedURL).toEqual(`${APP_CLIP_BASE_URL}?services=${stringServices}&redirectUrl=${redirectURL}&publicKey=${publicKey}`);
    });

    it('should throw error if publicKey is invalid', async () => {
      const publicKey = 'invalidPublicKey';
      const connect = new Connect(publicKey, redirectURL, services);
      (verifyPublicKey as jest.Mock).mockResolvedValue(false);

      await expect(connect.generateURL()).rejects.toThrow('Public key does not exist');
    });
  });

  describe('outputQRCode', () => {
    it('should create QR code with correct options', async () => {
      const connect = new Connect(publicKey, redirectURL, services);
      const qrCode = await connect.outputQRCode();
      expect(qrCode._options.data).toEqual(`${APP_CLIP_BASE_URL}?services=${stringServices}&redirectUrl=${redirectURL}&publicKey=${publicKey}`)
    });
  });
});
