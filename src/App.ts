import express, { Express } from "express";
import cors from "cors";
import { createServer, Server } from "http";
import { routes } from "./routes";
import database from "./utils/Database";
import ExceptionHandler from "./middlewares/ExceptionHandler";

class App {
  app: Express;
  port: string;
  server: Server;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "3005";
  }

  private cors() {
    const options: cors.CorsOptions = {
      origin: "*",
    };
    this.app.use(cors(options));
  }

  private middlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private routes() {
    this.app.use(routes);
  }

  private database() {
    database.init();
  }

  private exceptionHandler() {
    ExceptionHandler.processHandler();
    ExceptionHandler.httpErrors(this.app);
  }

  loadServer = () => {
    this.server = createServer(this.app);
    this.cors();
    this.middlewares();
    this.routes();
    this.database();
    this.exceptionHandler();

    this.server.listen(this.port, () => {
      console.log(`⚡️[server]: Server is running at ${this.port}`);
    });
  };
}
export default new App();
