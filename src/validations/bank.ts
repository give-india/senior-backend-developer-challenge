import { body } from "express-validator";

export const bankTransferValidation = [
  body("fromAccountId", "fromAccountId is required").notEmpty(),
  body("toAccountId", "toAccountId is required").notEmpty(),
  body("amount", "toAccountId is required").notEmpty(),
];
