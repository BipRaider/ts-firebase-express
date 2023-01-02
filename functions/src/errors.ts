export interface ErrorData {
  message?: string;
  code?: number;
  status?: number;
}

export class ErrorEx extends Error implements ErrorData {
  public status: number;
  public code: number;

  constructor(data: string | ErrorData) {
    super();
    if (typeof data === 'string') {
      this.message = data || 'Error';
      this.code = 500;
      this.status = 500;
    } else {
      this.message = data.message || 'Error';
      this.code = data.code || 400;
      this.status = data.status || 400;
    }

    Error.captureStackTrace(this, this.constructor);
  }
}
