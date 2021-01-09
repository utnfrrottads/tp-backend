import HttpError from "./HttpError";

export default class DatabaseError extends HttpError {
  public status: number = 500;
  public shouldLog: boolean = true;
  constructor(innerError?: Error, message: string = "Internal database error") {
    super(innerError, message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = DatabaseError.name;
  }
}
