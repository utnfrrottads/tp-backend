import Koa from "koa";
import { Server } from "http";
import "reflect-metadata";
import { Connection, ConnectionOptions, createConnection } from "typeorm";
import { ErrorHandler } from "./middleware/ErrorHandler";
import { createKoaServer } from "routing-controllers";
import { CardController } from "./controllers/CardController";
import { ClientController } from "./controllers/ClientController";
import { PrizeController } from "./controllers/PrizeController";
import { RedeemedPrizeController } from "./controllers/RedeemedPrizeController";

export default class AppInitializer {
  public app: Koa;
  public server?: Server;
  public connection?: Connection;

  constructor() {
    this.app = createKoaServer({
      routePrefix: "/v1",
      classTransformer: true,
      controllers: [CardController, ClientController, PrizeController, RedeemedPrizeController],
      middlewares:[ErrorHandler],
      defaultErrorHandler:false,
      cors:true,
    });
  }

  public async init(connectionOptions?: ConnectionOptions) {
    const options: ConnectionOptions = connectionOptions || {
      type: 'postgres',
      host: process.env['DB_HOST'],
      port: parseInt(process.env['DB_PORT']!),
      username: process.env['DB_USERNAME'],
      password: process.env['DB_PASSWORD'],
      database: process.env['DB_DATABASE'],
      synchronize: true,
      entities: [
        __dirname + "/entities/*." + (process.env["IS_TS"] ? "ts" : "js"),
      ],
    };
    try {
      this.connection = await createConnection(options);
      const port = parseInt(process.env["APP_PORT"]!) || 4444;
      this.server = this.app.listen(port, () =>
        console.log('Listening on port ' + port)
      );
    } catch (error) {
      console.error(error);
    }
  }
}
