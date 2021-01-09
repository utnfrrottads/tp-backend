import { ConnectionOptions, createConnection, Connection } from "typeorm";
import "reflect-metadata";
import express from "express";
import bodyParser from "body-parser";
import { ContactController } from "./controllers/ContactController";
import errorHandler from "./middleware/errorHandler";
import { User } from "./entities/User";
import { Contact } from "./entities/Contact";
import { Server } from "http";
import { UserController } from "./controllers/UserController";

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
      entities: [User, Contact],
    };
    try {
      this.connection = await createConnection(options);
      const port = parseInt(process.env["APP_PORT"]!) || 4444;

      this.app.use(bodyParser.json({ limit: "500kb" }));

      const contactController = new ContactController();
      const userController = new UserController();
      this.app.use("/v1/contacts", contactController.router);
      this.app.use("/v1/users", userController.router);

      this.app.use(errorHandler);

      this.server = this.app.listen(port, () =>
        console.log("Listening on port " + port)
      );
    } catch (error) {
      console.error(error);
    }
  }
}
