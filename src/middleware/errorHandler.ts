import HttpError from "../errors/HttpError";
import Koa from "koa";

export default function errorHandler(err: HttpError, ctx: Koa.Context) {
  if (err.shouldLog && err.innerError) console.error(err.innerError);
  ctx.throw(err, {
    message: err.message,
    status: err.status || 500,
    ...(err.detail && { detail: err.detail }),
  });
}
