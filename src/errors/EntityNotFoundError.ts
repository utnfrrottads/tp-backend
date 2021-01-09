import HttpError from "./HttpError";

export default class EntityNotFoundError extends HttpError {
  public status: number = 404;
  public shouldLog: boolean = false;
  constructor(innerError?: Error, message: string = "Entity not found") {
    super(innerError, message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = EntityNotFoundError.name;
  }
}
