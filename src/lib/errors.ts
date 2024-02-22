enum ErrorCode {
  InvalidPublicKey   = 'INVALID_PUBLIC_KEY',
  InvalidRedirectURL = 'INVALID_REDIRECT_URL',
  InvalidService     = 'INVALID_SERVICE',
  DataKeyNotFound    = 'DATA_KEY_NOT_FOUND'
}
  
class ConnectError extends Error {
  code: ErrorCode
  constructor(message: string, code: ErrorCode) {
    super(message);

    Object.setPrototypeOf(this, ConnectError.prototype);
    this.name = this.constructor.name;
    this.code = code;
  }
}
  
export { ConnectError, ErrorCode };