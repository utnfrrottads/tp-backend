import express from "express";
import expressAsyncHandler from "express-async-handler";
import UserService from "../services/UserService";

export class UserController {
  public router = express.Router();

  private userService = new UserService();

  constructor() {
    this.router.post(
      "/",
      expressAsyncHandler(async (req, res, next) => {
        const user = await this.userService.createOne({
          ...req.body,
        });
        res.send(user);
      })
    );
  }
}
