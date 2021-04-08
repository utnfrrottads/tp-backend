import HttpError from '../errors/HttpError';
import Koa from 'koa';
import { Middleware, KoaMiddlewareInterface } from 'routing-controllers';

@Middleware({ type: 'before' })
export class ErrorHandler implements KoaMiddlewareInterface {
  async use(ctx: Koa.Context, next: Koa.Next) {
    try {
      return await next();
    } catch (err) {
      if (err.shouldLog && err.innerError) console.error(err.innerError);
      const errObject = {
        message: err.message,
        status: err.status || 500,
        ...(err.detail && { detail: err.detail }),
      };
      ctx.status = errObject.status;
      ctx.body = errObject;
    }
  }
}
