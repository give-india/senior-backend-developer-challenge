import { Router } from "express";
import BankController from "../controllers/api/BankController";
import Validate from "../middlewares/Validate";
import { bankTransferValidation } from "../validations/bank";

export class BankRoutes {
  public router: Router;
  public bankController: BankController = new BankController();

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.post("/addAccount", this.bankController.addAccount);

    this.router.post(
      "/getAccountsByUserId",
      this.bankController.getAccountsByUserId
    );

    this.router.post(
      "/transfer",
      bankTransferValidation,
      Validate.validateRequest,
      this.bankController.transfer
    );
  }
}
