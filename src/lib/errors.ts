enum GandalfErrorCode {
  InvalidPublicKey      = 'INVALID_PUBLIC_KEY',
  InvalidRedirectURL    = 'INVALID_REDIRECT_URL',
  InvalidService        = 'INVALID_SERVICE',
  DataKeyNotFound       = 'DATA_KEY_NOT_FOUND',
  QRCodeNotGenerated    = 'QR_CODE_NOT_GENERATED',
  QRCodeGenNotSupported = 'QR_CODE_GEN_NOT_SUPPORTED'
}
  
class GandalfError extends Error {
  code: GandalfErrorCode
  constructor(message: string, code: GandalfErrorCode) {
    super(message);

    Object.setPrototypeOf(this, GandalfError.prototype);
    this.name = "GandalfError";
    this.code = code;
  }
}
  
export { GandalfError, GandalfErrorCode };