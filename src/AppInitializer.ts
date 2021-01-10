import bodyParser from "body-parser";
import express from "express";
import { Server } from "http";
import "reflect-metadata";
import { Connection, ConnectionOptions, createConnection } from "typeorm";
//import { ContactController } from "./controllers/ContactController";
//import { UserController } from "./controllers/UserController";
import { Card } from "./entities/Card";
import { Client } from "./entities/Client";
import errorHandler from "./middleware/errorHandler";

export default class AppInitializer {
  public app: express.Application;
  public server?: Server;
  public connection?: Connection;

  constructor() {
    this.app = express();
  }

  public async init(connectionOptions?: ConnectionOptions) {
    const options: ConnectionOptions = connectionOptions || {
      type: "postgres",
      host: process.env["DB_HOST"],
      port: parseInt(process.env["DB_PORT"]!),
      username: process.env["DB_USERNAME"],
      password: process.env["DB_PASSWORD"],
      database: process.env["DB_DATABASE"],
      synchronize: true,
      entities: [Client, Card],
    };
    try {
      this.connection = await createConnection(options);
      const port = parseInt(process.env["APP_PORT"]!) || 4444;

      this.app.use(bodyParser.json({ limit: "500kb" }));

      const contactController = new ContactController();
      const userController = new UserController();
      //this.app.use("/v1/contacts", contactController.router);
      //this.app.use("/v1/users", userController.router);

      this.app.use(errorHandler);

      this.server = this.app.listen(port, () =>
        console.log("Listening on port " + port)
      );
    } catch (error) {
      console.error(error);
    }
  }
}
