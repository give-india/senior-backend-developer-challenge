import { Express, Request, Response } from "express";
import { error } from "../utils/ResponseApi";
class ExceptionHandler {
  static processHandler = (): void => {
    process
      .on("uncaughtException", (exception) => console.error(exception.stack))

      .on("unhandledRejection", (reason, p) => {
        console.error(reason, "Unhandled Rejection at Promise", p);
      })

      .on("warning", (warning) => console.warn(warning.stack));
  };

  static httpErrors = (_apps: Express) => {
    _apps.use("*", (req: Request, res: Response) => {
      return res.status(404).json(error("Api not found"));
    });
  };
}
export default ExceptionHandler;
