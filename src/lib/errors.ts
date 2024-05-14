import { GandalfErrorCode } from '../types';

class GandalfError extends Error {
  code: GandalfErrorCode;

  constructor(message: string, code: GandalfErrorCode) {
    super(message);

    Object.setPrototypeOf(this, GandalfError.prototype);
    this.name = 'GandalfError';
    this.code = code;
  }
}

export default GandalfError;
