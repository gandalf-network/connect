enum GandalfErrorCode {
  InvalidPublicKey   = 'INVALID_PUBLIC_KEY',
  InvalidRedirectURL = 'INVALID_REDIRECT_URL',
  InvalidService     = 'INVALID_SERVICE',
  DataKeyNotFound    = 'DATA_KEY_NOT_FOUND'
}
  
class GandalfError extends Error {
  code: GandalfErrorCode
  constructor(message: string, code: GandalfErrorCode) {
    super(message);

    Object.setPrototypeOf(this, GandalfError.prototype);
    this.name = this.constructor.name;
    this.code = code;
  }
}
  
export { GandalfError, GandalfErrorCode };