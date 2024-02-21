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

  beforeEach(() => {
    (verifyPublicKey as jest.Mock).mockResolvedValue(true);
  })

  describe('Constructor', () => {  
    it('should initialize publicKey and redirectURL properly', async () => {
      const connect = await Connect.create(publicKey, redirectURL, services);
      
      expect(connect.publicKey).toEqual(publicKey);
      expect(connect.redirectURL).toEqual(redirectURL);
    });

    it('should throw error if publicKey is invalid', async () => {
      const publicKey = 'invalidPublicKey';

      (verifyPublicKey as jest.Mock).mockResolvedValue(false);

      await expect(Connect.create(publicKey, 'https://example.com', services)).rejects.toThrow('Public key does not exist');
    });

    it('should throw error if redirectURL is invalid', async () => {
      const invalidRedirectURL = 'not a valid URL';

      await expect(() => Connect.create('examplePublicKey', invalidRedirectURL, services)).rejects.toThrow('Invalid redirectURL');
    });

    it('should throw error if invalid service is passed', async () => {
      const services = {"twitter": true, "showmax": false} as Services

      await expect(() => Connect.create('examplePublicKey', redirectURL, services)).rejects.toThrow(
        `These services ${Object.keys(services).join(' ')} are unsupported`
      );
    });
  });

  describe('generateURL', () => {
    it('should generate the correct URL', async () => {
      const connect = await Connect.create(publicKey, redirectURL, services);
      const generatedURL = connect.generateURL();
      expect(generatedURL).toEqual(`${APP_CLIP_BASE_URL}?services=${services}&redirectUrl=${redirectURL}&publicKey=${publicKey}`);
    });
  });

  describe('outputQRCode', () => {
    it('should create QR code with correct options', async () => {
      const connect = await Connect.create(publicKey, redirectURL, services);
      const qrCode = connect.outputQRCode();

      await expect(qrCode._options.image).resolves.toEqual(`${APP_CLIP_BASE_URL}?services=${services}&redirectUrl=${redirectURL}&publicKey=${publicKey}`)
    });
  });
});
