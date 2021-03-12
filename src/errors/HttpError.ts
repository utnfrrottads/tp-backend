export default abstract class HttpError extends Error {
  public abstract status: number;
  public abstract shouldLog: boolean;
  public detail?: any;
  public innerError?: Error;
  constructor(innerError?: Error, message?: string) {
    super(message);
    this.innerError = innerError;
  }
}
