import HttpError from "./HttpError";

export default class EntityValidationError extends HttpError {
  public status: number = 422;
  public shouldLog: boolean = false;
  constructor(
    innerError: Error,
    message: string = "Entity validation error"
  ) {
    super(innerError, message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = EntityValidationError.name;
    this.detail = innerError;
  }
}
