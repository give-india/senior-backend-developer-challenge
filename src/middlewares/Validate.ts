import * as express from "express";
import { validationResult } from "express-validator";
import { validation } from "../utils/ResponseApi";

class Validate {
  static validateRequest(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorObject: { [key: string]: string } = {};
      errors.array().map((err) => {
        errorObject[err.param] = err.msg;
      });
      return res.status(400).json(validation(errorObject));
    }
    next();
  }
}

export default Validate;
