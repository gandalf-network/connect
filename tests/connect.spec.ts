import { verifyPublicKey } from "../src/api/publicKey";
import { getSupportedServices } from "../src/api/supportedServices";
import Connect from "../src/index";
import { ANDROID_APP_CLIP_BASE_URL, IOS_APP_CLIP_BASE_URL, UNIVERSAL_APP_CLIP_BASE_URL } from "../src/lib/constants";
import { InputData, Platform } from "../src/types";

jest.mock("../src/api/publicKey", () => ({
  verifyPublicKey: jest.fn(),
}));

jest.mock("../src/api/supportedServices", () => ({
  getSupportedServices: jest.fn(),
}));

jest.mock("qr-code-styling", () =>
  jest.fn().mockImplementation(() => ({
    getRawData: jest.fn().mockReturnValue(new Blob()),
  })),
);

describe("Connect SDK", () => {
  const publicKey = "examplePublicKey";
  const redirectURL = "https://example.com";
  const data: InputData = {
    uber: {
      traits: ["rating"],
      activities: ["trip"],
    },
  }
  const stringData = JSON.stringify(data);

  beforeEach(() => {
    (verifyPublicKey as jest.Mock).mockResolvedValue(true);
    (getSupportedServices as jest.Mock).mockResolvedValue(["netflix", "uber", "instacart"]);
    global.URL.createObjectURL = jest.fn(() => "mocked-object-url");
  });

  afterEach(() => {
    (getSupportedServices as jest.Mock).mockClear();
  });

  describe("Constructor", () => {
    it("should initialize publicKey and redirectURL properly", async () => {
      const connect = new Connect({ publicKey, redirectURL, data });

      expect(connect.publicKey).toEqual(publicKey);
      expect(connect.redirectURL).toEqual(redirectURL);
      expect(connect.platform).toEqual(Platform.ios);
    });

    it("should strip the redirect url of trailing slashes", async () => {
      const redirectURL = "https://example.com/";
      const connect = new Connect({ publicKey, redirectURL, data });

      expect(connect.redirectURL).toEqual("https://example.com");
    });

    it("should set the platform", async () => {
      const redirectURL = "https://example.com/";
      const connect = new Connect({ publicKey, redirectURL, data, platform: Platform.universal });

      expect(connect.platform).toEqual(Platform.universal);
    });
  });

  describe("allValidations", () => {
    it("should pass all validations and call verifyPublicKey only once", async () => {
      const connect = new Connect({ publicKey, redirectURL, data });
      await connect.generateURL();

      expect(connect.verificationComplete).toEqual(true);
      expect(verifyPublicKey as jest.Mock).toHaveBeenCalledTimes(1);
    });

    it("should throw error if publicKey is invalid", async () => {
      const publicKey = "invalidPublicKey";
      const connect = new Connect({ publicKey, redirectURL, data });
      (verifyPublicKey as jest.Mock).mockResolvedValue(false);

      await expect(connect.generateURL()).rejects.toThrow(
        "Public key does not exist",
      );
      expect(connect.verificationComplete).toEqual(false);
    });

    it("should throw error if redirectURL is invalid", async () => {
      const invalidRedirectURL = "not a valid URL";
      const connect = new Connect({
        publicKey,
        redirectURL: invalidRedirectURL,
        data,
      });

      await expect(connect.generateURL()).rejects.toThrow(
        "Invalid redirectURL",
      );
      expect(connect.verificationComplete).toEqual(false);
    });

    it("should throw error if invalid service is passed", async () => {
      const invalidDataServices = {
        facebook: {
          traits: ["plan"],
          activities: ["watch"]
        },
      } as InputData;

      const connect = new Connect({
        publicKey,
        redirectURL,
        data: invalidDataServices,
      });

      await expect(connect.generateURL()).rejects.toThrow(
        `These services ${Object.keys(invalidDataServices).join(" ")} are unsupported`,
      );
      expect(connect.verificationComplete).toEqual(false);
    });

    it("should throw error if no required trait or activity is passed", async () => {
      const invalidDataServices = {
        netflix: {
          traits: [],
          activities: []
        },
      } as InputData;
      
      const connect = new Connect({
        publicKey,
        redirectURL,
        data: invalidDataServices,
      });

      await expect(connect.generateURL()).rejects.toThrow(
        "At least one trait or activity is required",
      );
      expect(connect.verificationComplete).toEqual(false);
    });

    it("should throw an error if more than one service is passsed", async () => {
      const invalidDataServices: InputData = {
        uber: {
          traits: ["rating"],
          activities: ["trip"],
        },
        netflix: {
            traits: ["plan"],
            activities: ["watch"]
        },
        instacart: {
            activities: ["shop"]
        }
      } as InputData;
      
      const connect = new Connect({
        publicKey,
        redirectURL,
        data: invalidDataServices,
      });

      await expect(connect.generateURL()).rejects.toThrow(
        "Only one service is supported per Connect URL",
      );
      expect(connect.verificationComplete).toEqual(false);
    });
  });

  describe("generateURL", () => {
    const encodedData = encodeURIComponent(btoa(stringData));
    const encodedRedirectURL = encodeURIComponent(redirectURL);
    const encodedPublicKey = encodeURIComponent(publicKey);

    it("should generate an IOS connect URL", async () => {
      const connect = new Connect({ publicKey, redirectURL, data });
      const generatedURL = await connect.generateURL();
      expect(generatedURL).toEqual(
        `${IOS_APP_CLIP_BASE_URL}&publicKey=${encodedPublicKey}&redirectUrl=${encodedRedirectURL}&data=${encodedData}`,
      );
    });

    it("should generate a universal connect URL", async () => {
      const connect = new Connect({ publicKey, redirectURL, data, platform: Platform.universal });
      const generatedURL = await connect.generateURL();
      expect(generatedURL).toEqual(
        `${UNIVERSAL_APP_CLIP_BASE_URL}/?publicKey=${encodedPublicKey}&redirectUrl=${encodedRedirectURL}&data=${encodedData}`,
      );
    });

    it("should generate an android connect URL", async () => {
      const connect = new Connect({ publicKey, redirectURL, data, platform: Platform.android });
      const generatedURL = await connect.generateURL();
      expect(generatedURL).toEqual(
        `${ANDROID_APP_CLIP_BASE_URL}/?publicKey=${encodedPublicKey}&redirectUrl=${encodedRedirectURL}&data=${encodedData}`,
      );
    });
  });

  describe("generateQRCode", () => {
    it("should create QR code with correct options", async () => {
      const connect = new Connect({ publicKey, redirectURL, data });
      const qrCodeUrl = await connect.generateQRCode();
      expect(qrCodeUrl).toBeTruthy();
    });
  });

  describe("getDataKeyFromURL", () => {
    it("should get the data key from the url", () => {
      const url =
        "https://dashboard.doppler.com/connect=success?dataKey=11221122";
      const dataKey = Connect.getDataKeyFromURL(url);
      expect(dataKey).toEqual("11221122");
    });

    it("should throw data key not found error", () => {
      const url =
        "https://dashboard.doppler.com/connect=success?noDataKey=11221122";
      expect(() => Connect.getDataKeyFromURL(url)).toThrow(
        `Datakey not found in the URL ${url}`,
      );
    });

    it("should throw Invalid redirect url error", () => {
      const url =
        "https://dashboard.doppler.com/connect=success?noDataKey=11221122";
      expect(() => Connect.getDataKeyFromURL(url)).toThrow(
        `Datakey not found in the URL ${url}`,
      );
    });
  });

  describe("getSupportedServices", () => {
    it("should get the supported services", async () => {
      await Connect.getSupportedServices();
      expect(getSupportedServices as jest.Mock).toHaveBeenCalledTimes(1);
    });
  });
});
