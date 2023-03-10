import { Connection, ConnectionOptions } from "mysql2";
import { createConnection } from "mysql2/promise";

class Database {
  public connection: any;

  async init() {
    try {
      const dbConfig = {
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
      };

      this.connection = await createConnection(dbConfig);
    } catch (e) {
      const err = e as Error;
      console.log(err.message);
    }
  }
}
export default new Database();
